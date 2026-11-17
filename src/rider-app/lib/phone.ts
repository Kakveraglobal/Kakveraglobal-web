/** Normalize Nigerian phone to 11-digit local form starting with 0. */
export function normalizeNgPhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('234') && digits.length === 13) {
    return `0${digits.slice(3)}`;
  }
  if (digits.startsWith('0') && digits.length === 11) {
    return digits;
  }
  if (digits.length === 10) {
    return `0${digits}`;
  }
  return digits;
}

export function isValidNgPhone(input: string): boolean {
  const phone = normalizeNgPhone(input);
  return /^0[789][01]\d{8}$/.test(phone);
}

export function formatNgPhoneDisplay(input: string): string {
  const phone = normalizeNgPhone(input);
  if (phone.length !== 11) return input;
  return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;
}
