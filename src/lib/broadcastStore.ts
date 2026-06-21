/**
 * Cross-app broadcast bus (admin → patient apps).
 *
 * The admin dashboard, mobile app, and kiosk all run as separate route trees
 * (often in separate tabs/windows). This module gives them a shared channel
 * backed by `localStorage`, so a notification an admin sends appears live in
 * the mobile app's notification center — across tabs via the `storage` event,
 * and within the same tab via a custom event.
 */

export type BroadcastType = 'reminder' | 'queue' | 'promo' | 'system';

export interface BroadcastNotif {
  id: string;
  type: BroadcastType;
  title: string;
  body: string;
  /** epoch ms — ordering + dedupe */
  ts: number;
}

const KEY = 'omdc:broadcasts';
const EVT = 'omdc:broadcasts:update';
const MAX = 50;

function safeRead(): BroadcastNotif[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BroadcastNotif[]) : [];
  } catch {
    return [];
  }
}

function safeWrite(list: BroadcastNotif[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
    // Same-tab listeners (storage event only fires in *other* tabs).
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {
    /* storage may be unavailable (private mode / quota) — degrade silently */
  }
}

export function getBroadcasts(): BroadcastNotif[] {
  return safeRead();
}

export function pushBroadcast(input: { type: BroadcastType; title: string; body: string }): BroadcastNotif {
  const notif: BroadcastNotif = {
    id: `bc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: input.type,
    title: input.title,
    body: input.body,
    ts: Date.now(),
  };
  const next = [notif, ...safeRead()];
  safeWrite(next);
  return notif;
}

export function clearBroadcasts() {
  safeWrite([]);
}

/**
 * Subscribe to broadcast changes. Fires on same-tab pushes (custom event) and
 * cross-tab pushes (storage event). Returns an unsubscribe function.
 */
export function subscribeBroadcasts(cb: (list: BroadcastNotif[]) => void): () => void {
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
