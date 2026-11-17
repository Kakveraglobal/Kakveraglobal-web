export function createId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  const time = Date.now().toString(36).toUpperCase();
  return `${prefix}-${time}-${rand}`;
}

export function createOrderReference(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `KGS-RD-${y}${m}-${n}`;
}
