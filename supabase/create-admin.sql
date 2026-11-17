-- After running schema.sql and creating an Auth user for the admin:
-- 1) Supabase Dashboard → Authentication → Users → Add user
--    Email:    08011111111@riders.kakveraglobal.auth
--    Password: (choose a strong password)
--    Auto Confirm: ON
--    User Metadata (JSON):
--      { "phone": "08011111111", "full_name": "Kakvera Ops Admin", "role": "admin" }
--
-- 2) If the profile was created as rider, promote with:

update public.profiles
set
  role = 'admin',
  full_name = coalesce(full_name, 'Kakvera Ops Admin'),
  phone = coalesce(nullif(phone, ''), '08011111111'),
  verification_status = 'approved'
where id = (
  select id from auth.users
  where email = '08011111111@riders.kakveraglobal.auth'
  limit 1
);

-- Auth setting required for phone-style login:
-- Authentication → Providers → Email → disable "Confirm email"
