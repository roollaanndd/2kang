/**
 * OMDC transaction registry
 * ────────────────────────────────────────────────────────────────────────
 * A shared, localStorage-backed registry of patient transactions (bookings &
 * queue tickets). The mobile app registers a transaction when a patient books;
 * the eKiosk looks it up by OMDC code to recall the patient + their booking
 * without re-entering anything.
 *
 * In production this would be a backend lookup; here a localStorage bus lets the
 * mobile app, kiosk and admin (same browser, separate route trees) share state,
 * and a seeded demo record means kiosk recall works out of the box.
 */

import { memberCode, transactionCode, bookingCode, parseOmdcCode } from './omdcCode';

/** Lifecycle of a booking as it moves through app → kiosk → clinic. */
export type OmdcStatus = 'booked' | 'checked-in' | 'paid' | 'done' | 'cancelled';

export interface OmdcTransaction {
  /** Transaction code body (lookup key, without prefix/check char). */
  key: string;
  /** Full transaction code, e.g. OMDC-T-A18Q4Z. */
  code: string;
  /** Short, human-friendly booking code typed/scanned at the kiosk. */
  bookingCode: string;
  patientName: string;
  /** The patient's permanent member code (links txn → account). */
  memberCode: string;
  memberKey: string;
  medicalRecordNo?: string;
  phone?: string;
  serviceId?: string;
  serviceName?: string;
  doctorName?: string;
  date?: string;
  time?: string;
  queueNumber?: string;
  /** Booking lifecycle status. */
  status: OmdcStatus;
  /** Whether payment has been settled. */
  paid: boolean;
  /** Estimated / charged amount in IDR. */
  amount?: number;
  /** Where it originated. */
  source: 'app' | 'kiosk';
  ts: number;
}

const KEY = 'omdc:transactions';
const EVT = 'omdc:transactions:update';
const MAX = 100;

function safeRead(): OmdcTransaction[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as OmdcTransaction[]) : [];
  } catch {
    return [];
  }
}

function safeWrite(list: OmdcTransaction[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {
    /* storage unavailable — degrade silently */
  }
}

/** Register a new transaction and return the stored record (with its codes). */
export function registerTransaction(input: {
  patientName: string;
  userId: string;
  medicalRecordNo?: string;
  phone?: string;
  serviceId?: string;
  serviceName?: string;
  doctorName?: string;
  date?: string;
  time?: string;
  queueNumber?: string;
  amount?: number;
  paid?: boolean;
  status?: OmdcStatus;
  /** Pre-generated booking code to use (otherwise one is created). */
  bookingCode?: string;
  source?: 'app' | 'kiosk';
}): OmdcTransaction {
  const code = transactionCode(input.queueNumber ?? input.patientName);
  const parsed = parseOmdcCode(code);
  const mCode = memberCode(input.userId);
  const mParsed = parseOmdcCode(mCode);

  const txn: OmdcTransaction = {
    key: parsed.key ?? code,
    code,
    bookingCode: input.bookingCode ?? bookingCode(),
    patientName: input.patientName,
    memberCode: mCode,
    memberKey: mParsed.key ?? mCode,
    medicalRecordNo: input.medicalRecordNo,
    phone: input.phone,
    serviceId: input.serviceId,
    serviceName: input.serviceName,
    doctorName: input.doctorName,
    date: input.date,
    time: input.time,
    queueNumber: input.queueNumber,
    status: input.status ?? 'booked',
    paid: input.paid ?? false,
    amount: input.amount,
    source: input.source ?? 'app',
    ts: Date.now(),
  };

  const next = [txn, ...safeRead().filter(t => t.key !== txn.key)];
  safeWrite(next);
  return txn;
}

/** Patch an existing transaction (by key) and broadcast the change. */
export function updateTransaction(key: string, patch: Partial<OmdcTransaction>): OmdcTransaction | null {
  const list = safeRead();
  const idx = list.findIndex(t => t.key === key);
  if (idx < 0) return null;
  const updated = { ...list[idx], ...patch };
  list[idx] = updated;
  safeWrite(list);
  return updated;
}

export function getTransactions(): OmdcTransaction[] {
  return safeRead();
}

/** Look up the most recent transaction for a member (by member key). */
export function findByMemberKey(memberKey: string): OmdcTransaction | null {
  const list = safeRead().filter(t => t.memberKey === memberKey);
  return list.length ? list[0] : null;
}

export interface OmdcLookupResult {
  found: boolean;
  kind?: 'member' | 'transaction' | 'booking';
  transaction?: OmdcTransaction;
}

/** Find a transaction by its short, human-friendly booking code. */
export function findByBookingCode(code: string): OmdcTransaction | null {
  const norm = code.toUpperCase().replace(/[^0-9A-Z]/g, '');
  return safeRead().find(t => t.bookingCode === norm) ?? null;
}

/**
 * Resolve a scanned/typed code to a transaction. Accepts, in order:
 *  - booking barcode (OMDC-B-…) or a bare 6-char booking code
 *  - transaction code (OMDC-T-…) → that exact booking
 *  - member code (OMDC-M-…)      → that patient's most recent booking
 */
export function lookupOmdcCode(raw: string): OmdcLookupResult {
  const parsed = parseOmdcCode(raw);

  if (parsed.valid && parsed.kind === 'transaction' && parsed.key) {
    const txn = safeRead().find(t => t.key === parsed.key);
    return txn ? { found: true, kind: 'transaction', transaction: txn } : { found: false, kind: 'transaction' };
  }

  if (parsed.valid && parsed.kind === 'member' && parsed.key) {
    const txn = findByMemberKey(parsed.key);
    return txn ? { found: true, kind: 'member', transaction: txn } : { found: false, kind: 'member' };
  }

  // Booking barcode (OMDC-B-) or a bare booking code typed at the kiosk.
  const bareCode = parsed.valid && parsed.kind === 'booking' && parsed.key
    ? parsed.key
    : raw.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(-6);
  if (bareCode.length >= 4) {
    const txn = findByBookingCode(bareCode);
    if (txn) return { found: true, kind: 'booking', transaction: txn };
  }
  return { found: false, kind: 'booking' };
}

// ─── Queue number assignment ─────────────────────────────────────────────────
const QUEUE_KEY = 'omdc:queueCounter';

/**
 * Assign the next sequential queue number (e.g. "A018"), persisted across the
 * kiosk so walk-ins and recalled bookings draw from one shared counter.
 */
export function assignQueueNumber(prefix = 'A'): string {
  let n = 18;
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    n = raw ? parseInt(raw, 10) + 1 : 18;
    window.localStorage.setItem(QUEUE_KEY, String(n));
  } catch {
    n = 18 + Math.floor(Math.random() * 80);
  }
  return `${prefix}${String(n).padStart(3, '0')}`;
}

/** Check a booking in: assign a queue number and advance its status. */
export function checkInTransaction(key: string, queuePrefix = 'A'): OmdcTransaction | null {
  const existing = safeRead().find(t => t.key === key);
  if (!existing) return null;
  const queueNumber = existing.queueNumber ?? assignQueueNumber(queuePrefix);
  return updateTransaction(key, {
    queueNumber,
    status: existing.paid ? 'paid' : 'checked-in',
  });
}

/** Settle payment for a booking. */
export function markPaid(key: string, method?: string): OmdcTransaction | null {
  void method;
  return updateTransaction(key, { paid: true, status: 'paid' });
}

export function subscribeTransactions(cb: (list: OmdcTransaction[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => cb(safeRead());
  const storageHandler = (e: StorageEvent) => {
    if (e.key === KEY) cb(safeRead());
  };
  window.addEventListener(EVT, handler);
  window.addEventListener('storage', storageHandler);
  return () => {
    window.removeEventListener(EVT, handler);
    window.removeEventListener('storage', storageHandler);
  };
}

/**
 * Seed one demo transaction (idempotent) so the kiosk's "recall by OMDC code"
 * works even before the user makes a booking in the app this session. Returns
 * the demo transaction so screens can display its code as the example.
 */
const DEMO_USER_ID = 'u1';
export function seedDemoTransaction(): OmdcTransaction {
  const existing = findByMemberKey(parseOmdcCode(memberCode(DEMO_USER_ID)).key ?? '');
  if (existing) return existing;
  return registerTransaction({
    patientName: 'Andi Pratama',
    userId: DEMO_USER_ID,
    medicalRecordNo: 'RM-2024-001',
    phone: '0812-3456-7890',
    serviceId: 's1',
    serviceName: 'Pemeriksaan Gigi',
    doctorName: 'drg. Sarah Wijaya',
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
    amount: 350000,
    paid: false,
    status: 'booked',
    source: 'app',
  });
}
