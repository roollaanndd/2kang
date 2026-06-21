/* eslint-disable */
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  BellRing,
  CalendarClock,
  ListOrdered,
  Tag,
  Settings2,
  CheckCircle2,
} from 'lucide-react';
import {
  pushBroadcast,
  getBroadcasts,
  subscribeBroadcasts,
  type BroadcastNotif,
  type BroadcastType,
} from '../../lib/broadcastStore';

// ─── BRAND ───────────────────────────────────────────────────────────────────
const PINK = '#E91E8C';

// ─── TYPE META ───────────────────────────────────────────────────────────────
const TYPE_META: Record<
  BroadcastType,
  { label: string; icon: any; color: string; bg: string }
> = {
  reminder: { label: 'Pengingat', icon: CalendarClock, color: '#06B6D4', bg: '#ECFEFF' },
  queue: { label: 'Antrian', icon: ListOrdered, color: PINK, bg: '#FFF0F8' },
  promo: { label: 'Promo', icon: Tag, color: '#F59E0B', bg: '#FFFBEB' },
  system: { label: 'Sistem', icon: Settings2, color: '#10B981', bg: '#F0FDF4' },
};

const TYPE_ORDER: BroadcastType[] = ['reminder', 'queue', 'promo', 'system'];

// ─── RELATIVE TIME ───────────────────────────────────────────────────────────
function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const sec = Math.round(diff / 1000);
  if (sec < 60) return 'Baru saja';
  const min = Math.round(sec / 60);
  if (min < 60) return `${min} mnt lalu`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} jam lalu`;
  const day = Math.round(hr / 24);
  return `${day} hr lalu`;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function AdminBroadcast() {
  const [type, setType] = useState<BroadcastType>('reminder');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);
  const [history, setHistory] = useState<BroadcastNotif[]>([]);

  // Keep the recent-sent list live (same-tab + cross-tab).
  useEffect(() => {
    setHistory(getBroadcasts());
    const unsub = subscribeBroadcasts(setHistory);
    return unsub;
  }, []);

  const canSend = useMemo(
    () => title.trim().length > 0 && body.trim().length > 0,
    [title, body]
  );

  function handleSend() {
    if (!canSend) return;
    pushBroadcast({ type, title: title.trim(), body: body.trim() });
    setTitle('');
    setBody('');
    setSent(true);
    setTimeout(() => setSent(false), 2600);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:col-span-3 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BellRing size={18} style={{ color: PINK }} />
          <h2 className="font-semibold text-gray-800 text-sm">Kirim Notifikasi ke Aplikasi Pasien</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── COMPOSER ── */}
        <div className="space-y-4">
          {/* Type selector */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Jenis Notifikasi</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TYPE_ORDER.map((t) => {
                const meta = TYPE_META[t];
                const Icon = meta.icon;
                const active = type === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-xs font-medium transition-all"
                    style={{
                      borderColor: active ? meta.color : '#E5E7EB',
                      background: active ? meta.bg : '#fff',
                      color: active ? meta.color : '#6B7280',
                      boxShadow: active ? `0 0 0 1px ${meta.color}` : 'none',
                    }}
                  >
                    <Icon size={18} style={{ color: active ? meta.color : '#9CA3AF' }} />
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="cth. Antrian Anda akan segera dipanggil"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ ['--tw-ring-color' as any]: PINK }}
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Isi Pesan</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              placeholder="Tulis pesan yang akan dikirim ke pasien..."
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ ['--tw-ring-color' as any]: PINK }}
            />
          </div>

          {/* Send + confirmation */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
            >
              <Send size={15} />
              Kirim ke Aplikasi Pasien
            </button>
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: '#10B981' }}
                >
                  <CheckCircle2 size={15} />
                  Terkirim ke aplikasi pasien
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs text-gray-400">
            Notifikasi akan langsung muncul di pusat notifikasi aplikasi pasien.
          </p>
        </div>

        {/* ── HISTORY ── */}
        <div className="lg:border-l lg:border-gray-100 lg:pl-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-3">Riwayat Terkirim</h3>
          {history.length === 0 ? (
            <div className="text-xs text-gray-400 py-8 text-center">
              Belum ada notifikasi yang dikirim.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {history.slice(0, 12).map((n) => {
                  const meta = TYPE_META[n.type] ?? TYPE_META.system;
                  const Icon = meta.icon;
                  return (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: meta.bg }}
                      >
                        <Icon size={15} style={{ color: meta.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ background: meta.bg, color: meta.color }}
                          >
                            {meta.label}
                          </span>
                          <span className="text-[10px] text-gray-400">{relativeTime(n.ts)}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-800 truncate">{n.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-2">{n.body}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
