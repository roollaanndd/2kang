const STORAGE_PREFIX = 'omdc:';

export function secureSet(key: string, value: string): void {
  try {
    const encoded = btoa(encodeURIComponent(value));
    localStorage.setItem(STORAGE_PREFIX + key, encoded);
  } catch {
    // Storage full or unavailable
  }
}

export function secureGet(key: string): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    return decodeURIComponent(atob(raw));
  } catch {
    return null;
  }
}

export function secureRemove(key: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    // no-op
  }
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function sanitizePlainText(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

export function isValidPhone(phone: string): boolean {
  return /^(\+62|62|0)8[1-9]\d{7,10}$/.test(phone.replace(/[\s-]/g, ''));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export function maskPhone(phone: string): string {
  if (phone.length < 6) return phone;
  return phone.slice(0, 4) + '****' + phone.slice(-2);
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const masked = local.length <= 2
    ? '*'.repeat(local.length)
    : local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
  return masked + '@' + domain;
}

let sessionTimeout: ReturnType<typeof setTimeout> | null = null;
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export function resetSessionTimer(onExpire: () => void): void {
  if (sessionTimeout) clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(onExpire, SESSION_DURATION);
}

export function clearSessionTimer(): void {
  if (sessionTimeout) {
    clearTimeout(sessionTimeout);
    sessionTimeout = null;
  }
}
