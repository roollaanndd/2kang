import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2, XCircle, Clock, ChevronRight,
  Stethoscope, Calendar, Star,
} from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileHistoryProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

type HistoryStatus = 'done' | 'cancelled' | 'waiting';
type FilterTab = 'all' | 'done' | 'cancelled';

interface HistoryItem {
  id: string;
  date: string;
  dateLabel: string;
  time: string;
  doctor: string;
  doctorSpecialty: string;
  service: string;
  status: HistoryStatus;
  queue: string;
  notes?: string;
  price?: string;
  branch: string;
}

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: 'h1', date: '2026-06-18', dateLabel: '18 Jun 2026', time: '09:00',
    doctor: 'drg. Sarah Sella', doctorSpecialty: 'Orthodonsi',
    service: 'Kontrol Kawat Gigi', status: 'done',
    queue: 'A012', price: 'Rp150.000', branch: 'Cabang Utama',
    notes: 'Kawat gigi berjalan baik, kontrol 1 bulan lagi',
  },
  {
    id: 'h2', date: '2026-05-15', dateLabel: '15 Mei 2026', time: '10:30',
    doctor: 'drg. Reza Rizki', doctorSpecialty: 'Konservasi Gigi',
    service: 'Tambal Gigi (Komposit)', status: 'done',
    queue: 'B007', price: 'Rp350.000', branch: 'Cabang Utama',
    notes: 'Gigi 36 ditambal komposit, pasien dianjurkan hindari makanan keras 24 jam',
  },
  {
    id: 'h3', date: '2026-04-20', dateLabel: '20 Apr 2026', time: '14:00',
    doctor: 'drg. Ivan Kontralizan', doctorSpecialty: 'Periodonti',
    service: 'Scaling & Polishing', status: 'cancelled',
    queue: 'C003', branch: 'Cabang Utama',
    notes: 'Pasien membatalkan via telepon 2 jam sebelum jadwal',
  },
  {
    id: 'h4', date: '2026-03-10', dateLabel: '10 Mar 2026', time: '08:00',
    doctor: 'drg. Sarah Sella', doctorSpecialty: 'Orthodonsi',
    service: 'Pemasangan Kawat Gigi', status: 'done',
    queue: 'A001', price: 'Rp6.500.000', branch: 'Cabang Utama',
    notes: 'Pemasangan kawat gigi metal standar, kontrol pertama 1 bulan',
  },
  {
    id: 'h5', date: '2026-02-05', dateLabel: '5 Feb 2026', time: '11:00',
    doctor: 'drg. Andika Andilisa', doctorSpecialty: 'Bedah Mulut',
    service: 'Pencabutan Gigi Bungsu', status: 'done',
    queue: 'D009', price: 'Rp500.000', branch: 'Cabang Utama',
    notes: 'Pencabutan gigi bungsu kanan bawah, pasien diberi antibiotik dan pereda nyeri',
  },
  {
    id: 'h6', date: '2025-12-12', dateLabel: '12 Des 2025', time: '13:00',
    doctor: 'drg. Reza Rizki', doctorSpecialty: 'Konservasi Gigi',
    service: 'Pemeriksaan Umum', status: 'done',
    queue: 'B002', price: 'Rp100.000', branch: 'Cabang Utama',
  },
];

const STATUS_CONFIG: Record<HistoryStatus, { label: string; color: string; bg: string; Icon: typeof CheckCircle2 }> = {
  done: { label: 'Selesai', color: '#10B981', bg: '#ECFDF5', Icon: CheckCircle2 },
  cancelled: { label: 'Dibatalkan', color: '#EF4444', bg: '#FEF2F2', Icon: XCircle },
  waiting: { label: 'Menunggu', color: '#F59E0B', bg: '#FFFBEB', Icon: Clock },
};

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'done', label: 'Selesai' },
  { key: 'cancelled', label: 'Dibatalkan' },
];

export function MobileHistory({ state, setState }: MobileHistoryProps) {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === 'all' ? MOCK_HISTORY : MOCK_HISTORY.filter(h => h.status === filter);

  const PINK = '#E91E8C';

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
      style={{ background: '#F8F9FA' }}
    >
      <MobileHeader
        title="Riwayat Kunjungan"
        showBack
        onBack={() => setState({ screen: 'profile' })}
      />

      {/* Stats strip */}
      <div
        className="mx-5 mt-4 rounded-2xl px-4 py-3 grid grid-cols-3 divide-x divide-pink-100"
        style={{ background: '#FFF5F9', border: '1px solid #FECDD3' }}
      >
        {[
          { value: MOCK_HISTORY.filter(h => h.status === 'done').length, label: 'Selesai' },
          { value: MOCK_HISTORY.filter(h => h.status === 'cancelled').length, label: 'Dibatalkan' },
          { value: MOCK_HISTORY.length, label: 'Total' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className="text-xl font-black" style={{ color: PINK }}>{s.value}</div>
            <div className="text-[10px]" style={{ color: '#9CA3AF' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-5 mt-4">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => { haptic('selection'); setFilter(tab.key); }}
            className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
            style={
              filter === tab.key
                ? { background: PINK, color: 'white' }
                : { background: 'white', color: '#9CA3AF', border: '1px solid #F3F4F6' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Calendar size={56} style={{ color: '#E5E7EB' }} />
            <p className="text-base font-bold mt-4" style={{ color: '#9CA3AF' }}>Belum ada riwayat</p>
            <p className="text-sm mt-1 text-center" style={{ color: '#D1D5DB' }}>Kunjungan Anda akan muncul di sini</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute top-4 bottom-4 w-0.5 left-[19px]"
              style={{ background: 'linear-gradient(to bottom, #FECDD3, #E5E7EB)' }}
            />

            <div className="flex flex-col gap-4">
              {filtered.map((item, i) => {
                const { label, color, bg, Icon } = STATUS_CONFIG[item.status];
                const isOpen = expanded === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="relative pl-10"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 top-4 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: bg, border: `2px solid ${color}` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>

                    {/* Card */}
                    <div
                      className="bg-white rounded-2xl overflow-hidden"
                      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                    >
                      <button
                        onClick={() => { haptic('light'); setExpanded(isOpen ? null : item.id); }}
                        className="w-full text-left px-4 py-4 transition-all active:bg-gray-50"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                style={{ background: bg, color }}
                              >
                                {label}
                              </span>
                              <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                                {item.dateLabel} · {item.time}
                              </span>
                            </div>
                            <p className="font-bold text-sm" style={{ color: '#1A1A2E' }}>{item.service}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{item.doctor}</p>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight size={16} style={{ color: '#D1D5DB' }} />
                          </motion.div>
                        </div>
                      </button>

                      {/* Expanded detail */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div
                              className="px-4 pb-4 pt-1"
                              style={{ borderTop: '1px solid #F3F4F6' }}
                            >
                              <div className="grid grid-cols-2 gap-3 mb-3">
                                {[
                                  { Icon: Stethoscope, label: 'Spesialis', value: item.doctorSpecialty },
                                  { Icon: Calendar, label: 'No. Antrian', value: item.queue },
                                  ...(item.price ? [{ Icon: Star, label: 'Biaya', value: item.price }] : []),
                                  { Icon: Clock, label: 'Cabang', value: item.branch },
                                ].map(detail => (
                                  <div key={detail.label} className="flex items-start gap-2">
                                    <div
                                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                      style={{ background: '#FFF5F9' }}
                                    >
                                      <detail.Icon size={13} style={{ color: PINK }} />
                                    </div>
                                    <div>
                                      <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{detail.label}</p>
                                      <p className="text-xs font-bold" style={{ color: '#1A1A2E' }}>{detail.value}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {item.notes && (
                                <div
                                  className="rounded-xl px-3 py-2"
                                  style={{ background: '#F8F9FA' }}
                                >
                                  <p className="text-[10px] font-bold mb-0.5" style={{ color: '#9CA3AF' }}>CATATAN DOKTER</p>
                                  <p className="text-xs leading-relaxed" style={{ color: '#4B5563' }}>{item.notes}</p>
                                </div>
                              )}

                              {item.status === 'done' && (
                                <button
                                  onClick={() => { haptic('light'); setState({ screen: 'booking' }); }}
                                  className="mt-3 w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.97]"
                                  style={{ background: `${PINK}15`, color: PINK }}
                                >
                                  Booking Ulang
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
