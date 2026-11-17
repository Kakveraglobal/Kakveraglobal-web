-- Kakvera Rider app — run this once in Supabase SQL Editor
-- Project: Authentication + profiles + orders + verification storage

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  phone text not null unique,
  full_name text not null,
  role text not null check (role in ('rider', 'admin')),
  verification_status text not null default 'unsubmitted'
    check (verification_status in ('unsubmitted', 'pending', 'approved', 'rejected')),
  verification_note text,
  id_doc_path text,
  selfie_path text,
  bank_name text,
  account_name text,
  account_number text,
  created_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_verification_idx on public.profiles (verification_status);

-- ---------------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  pickup_address text not null,
  dropoff_address text not null,
  customer_name text not null,
  customer_phone text not null,
  item_description text not null,
  notes text,
  status text not null default 'unassigned'
    check (status in ('unassigned', 'assigned', 'picked_up', 'delivered', 'cancelled')),
  rider_id uuid references public.profiles (id) on delete set null,
  created_by_admin_id uuid not null references public.profiles (id),
  payout_amount_ngn numeric(12, 2),
  payout_marked_paid boolean not null default false,
  payout_paid_at timestamptz,
  picked_up_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_rider_idx on public.orders (rider_id);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_updated_idx on public.orders (updated_at desc);

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

create or replace function public.set_orders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_orders_updated_at();

-- Auto-create profile from auth signup metadata
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta_role text := coalesce(new.raw_user_meta_data->>'role', 'rider');
  meta_phone text := coalesce(new.raw_user_meta_data->>'phone', '');
  meta_name text := coalesce(new.raw_user_meta_data->>'full_name', 'Rider');
begin
  if meta_role not in ('rider', 'admin') then
    meta_role := 'rider';
  end if;

  insert into public.profiles (id, phone, full_name, role, verification_status)
  values (
    new.id,
    meta_phone,
    meta_name,
    meta_role,
    case when meta_role = 'admin' then 'approved' else 'unsubmitted' end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.orders enable row level security;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
for select to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles
for insert to authenticated
with check (id = auth.uid() and role = 'rider');

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
for update to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

-- Riders may only move verification to "pending"; admins can approve/reject
create or replace function public.protect_profile_updates()
returns trigger
language plpgsql
as $$
begin
  if public.is_admin() then
    return new;
  end if;

  if new.role is distinct from old.role then
    raise exception 'You cannot change account role.';
  end if;

  if new.verification_status is distinct from old.verification_status then
    if not (
      old.verification_status in ('unsubmitted', 'rejected')
      and new.verification_status = 'pending'
    ) then
      raise exception 'Only admins can approve or reject riders.';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists protect_profile_updates on public.profiles;
create trigger protect_profile_updates
before update on public.profiles
for each row execute function public.protect_profile_updates();

drop policy if exists orders_select on public.orders;
create policy orders_select on public.orders
for select to authenticated
using (public.is_admin() or rider_id = auth.uid());

drop policy if exists orders_insert_admin on public.orders;
create policy orders_insert_admin on public.orders
for insert to authenticated
with check (public.is_admin() and created_by_admin_id = auth.uid());

drop policy if exists orders_update on public.orders;
create policy orders_update on public.orders
for update to authenticated
using (public.is_admin() or rider_id = auth.uid())
with check (public.is_admin() or rider_id = auth.uid());

-- Riders may only advance status on their assigned jobs; admins may edit freely
create or replace function public.protect_order_updates()
returns trigger
language plpgsql
as $$
begin
  if public.is_admin() then
    return new;
  end if;

  if new.rider_id is distinct from old.rider_id
    or new.created_by_admin_id is distinct from old.created_by_admin_id
    or new.reference is distinct from old.reference
    or new.payout_amount_ngn is distinct from old.payout_amount_ngn
    or new.payout_marked_paid is distinct from old.payout_marked_paid
    or new.payout_paid_at is distinct from old.payout_paid_at
    or new.pickup_address is distinct from old.pickup_address
    or new.dropoff_address is distinct from old.dropoff_address
  then
    raise exception 'Riders cannot change order assignment or payout fields.';
  end if;

  if old.status = 'assigned' and new.status = 'picked_up' then
    return new;
  end if;
  if old.status = 'picked_up' and new.status = 'delivered' then
    return new;
  end if;
  if new.status is not distinct from old.status then
    return new;
  end if;

  raise exception 'Invalid status transition for rider.';
end;
$$;

drop trigger if exists protect_order_updates on public.orders;
create trigger protect_order_updates
before update on public.orders
for each row execute function public.protect_order_updates();

-- ---------------------------------------------------------------------------
-- Storage: verification docs
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('verification-docs', 'verification-docs', false)
on conflict (id) do nothing;

drop policy if exists verification_docs_insert on storage.objects;
create policy verification_docs_insert on storage.objects
for insert to authenticated
with check (
  bucket_id = 'verification-docs'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists verification_docs_select on storage.objects;
create policy verification_docs_select on storage.objects
for select to authenticated
using (
  bucket_id = 'verification-docs'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or public.is_admin()
  )
);

drop policy if exists verification_docs_update on storage.objects;
create policy verification_docs_update on storage.objects
for update to authenticated
using (
  bucket_id = 'verification-docs'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'verification-docs'
  and (storage.foldername(name))[1] = auth.uid()::text
);
