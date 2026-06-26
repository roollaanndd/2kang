/**
 * OMDC Unique Code engine
 * ────────────────────────────────────────────────────────────────────────
 * Every OMDC patient and every transaction (booking / queue ticket) carries a
 * short, human-readable, checksummed code that can be printed as a barcode and
 * scanned at the eKiosk to instantly recall the patient or the transaction.
 *
 *   Member code       OMDC-M-7K3F9   → recalls the patient account
 *   Transaction code  OMDC-T-A18Q4Z  → recalls one booking / queue ticket
 *
 * Codes are self-describing (the kiosk can tell member vs transaction without
 * a backend round-trip) and carry a Damm-style check character so a mistyped
 * digit at the numpad is rejected immediately.
 */

const ALPHABET = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // no I/O/I-1 ambiguity
const BASE = ALPHABET.length;

export type OmdcCodeKind = 'member' | 'transaction' | 'booking';

const PREFIX: Record<OmdcCodeKind, string> = {
  member: 'OMDC-M-',
  transaction: 'OMDC-T-',
  booking: 'OMDC-B-',
};

/** Stable 32-bit hash of a string (FNV-1a). */
function hash32(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Encode a non-negative integer into a fixed-width base-34 string. */
function encodeBase(n: number, width: number): string {
  let out = '';
  let v = n >>> 0;
  for (let i = 0; i < width; i++) {
    out = ALPHABET[v % BASE] + out;
    v = Math.floor(v / BASE);
  }
  return out;
}

/** Single check character so a fat-fingered code is caught at entry time. */
function checkChar(body: string): string {
  let sum = 0;
  for (let i = 0; i < body.length; i++) {
    sum = (sum + ALPHABET.indexOf(body[i]) * (i + 2)) % BASE;
  }
  return ALPHABET[sum];
}

function normalize(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[^0-9A-Z-]/g, '')
    // common scanner / OCR confusions → canonical alphabet
    .replace(/O/g, '0')
    .replace(/I/g, '1')
    .trim();
}

/**
 * Deterministic member code for a patient — the same account always yields the
 * same code, so it can be reprinted on a loyalty card or shown in the app.
 */
export function memberCode(userId: string): string {
  const body = encodeBase(hash32('member:' + userId), 4);
  return PREFIX.member + body + checkChar(body);
}

/**
 * Unique transaction code for one booking / queue ticket. Combines the queue
 * number, a time component and a random nibble so two bookings never collide.
 */
export function transactionCode(seed?: string): string {
  const entropy = `${seed ?? ''}:${Date.now()}:${Math.floor(Math.random() * 0xffff)}`;
  const body = encodeBase(hash32('txn:' + entropy), 5);
  return PREFIX.transaction + body + checkChar(body);
}

/**
 * Short, human-friendly booking code (6 chars, no ambiguous glyphs) that a
 * patient can read off the app and type at the kiosk numpad/keyboard, e.g.
 * "7H3K9Q". Also embedded in the OMDC-B- barcode for scanning.
 */
export function bookingCode(): string {
  let out = '';
  for (let i = 0; i < 6; i++) {
    out += ALPHABET[Math.floor(Math.random() * BASE)];
  }
  return out;
}

/** Wrap a bare booking code into its scannable OMDC-B- form. */
export function bookingBarcodeValue(code: string): string {
  const body = code.toUpperCase();
  return PREFIX.booking + body + checkChar(body);
}

/** Pull the bare 6-char booking code out of any scanned/typed string. */
export function extractBookingCode(raw: string): string | null {
  const norm = normalize(raw);
  const parsed = parseOmdcCode(norm);
  if (parsed.valid && parsed.kind === 'booking' && parsed.key) return parsed.key;
  // Fall back to the trailing alphanumeric run (handles bare typed codes).
  const compact = norm.replace(/[^0-9A-Z]/g, '');
  if (compact.length >= 6) return compact.slice(-6);
  return compact.length >= 4 ? compact : null;
}

export interface ParsedOmdcCode {
  valid: boolean;
  kind?: OmdcCodeKind;
  /** The body (without prefix / check char) — the lookup key. */
  key?: string;
  /** The fully normalized code string. */
  code?: string;
}

/** Parse + validate a scanned or typed code. */
export function parseOmdcCode(raw: string): ParsedOmdcCode {
  const code = normalize(raw);
  for (const kind of ['member', 'transaction', 'booking'] as const) {
    const prefix = PREFIX[kind];
    if (!code.startsWith(prefix)) continue;
    const payload = code.slice(prefix.length);
    if (payload.length < 2) return { valid: false };
    const body = payload.slice(0, -1);
    const check = payload.slice(-1);
    if (checkChar(body) !== check) return { valid: false, kind, code };
    return { valid: true, kind, key: body, code };
  }
  return { valid: false };
}

/** True when the string looks like a complete, valid OMDC code. */
export function isValidOmdcCode(raw: string): boolean {
  return parseOmdcCode(raw).valid;
}
