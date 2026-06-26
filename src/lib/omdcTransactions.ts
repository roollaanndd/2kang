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

import { memberCode, transactionCode, parseOmdcCode } from './omdcCode';

export interface OmdcTransaction {
  /** Transaction code body (lookup key, without prefix/check char). */
  key: string;
  /** Full transaction code, e.g. OMDC-T-A18Q4Z. */
  code: string;
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
  source?: 'app' | 'kiosk';
}): OmdcTransaction {
  const code = transactionCode(input.queueNumber ?? input.patientName);
  const parsed = parseOmdcCode(code);
  const mCode = memberCode(input.userId);
  const mParsed = parseOmdcCode(mCode);

  const txn: OmdcTransaction = {
    key: parsed.key ?? code,
    code,
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
    source: input.source ?? 'app',
    ts: Date.now(),
  };

  const next = [txn, ...safeRead().filter(t => t.key !== txn.key)];
  safeWrite(next);
  return txn;
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
  kind?: 'member' | 'transaction';
  transaction?: OmdcTransaction;
}

/**
 * Resolve a scanned/typed OMDC code to a transaction.
 *  - transaction code → that exact booking
 *  - member code      → that patient's most recent booking
 */
export function lookupOmdcCode(raw: string): OmdcLookupResult {
  const parsed = parseOmdcCode(raw);
  if (!parsed.valid || !parsed.key) return { found: false };

  if (parsed.kind === 'transaction') {
    const txn = safeRead().find(t => t.key === parsed.key);
    return txn ? { found: true, kind: 'transaction', transaction: txn } : { found: false, kind: 'transaction' };
  }

  // member code
  const txn = findByMemberKey(parsed.key);
  return txn ? { found: true, kind: 'member', transaction: txn } : { found: false, kind: 'member' };
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
    queueNumber: 'A018',
    source: 'app',
  });
}
