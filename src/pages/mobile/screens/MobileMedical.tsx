import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, ClipboardList } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { SAMPLE_APPOINTMENTS, DOCTORS, SERVICES } from '../../../data/mockData';
import type { MobileState, Appointment } from '../../../types';

interface MobileMedicalProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

// Mock history with more entries
const MOCK_HISTORY: Appointment[] = [
  ...SAMPLE_APPOINTMENTS,
  {
    id: 'a2',
    patientName: 'Andi Pratama',
    service: SERVICES[0],
    doctor: DOCTORS[1],
    date: 'Senin, 10 Mar 2024',
    time: '10:00',
    queue: 'B012',
    status: 'done',
    payment: 'card',
    branch: 'OMDC Dental Jakarta',
  },
  {
    id: 'a3',
    patientName: 'Andi Pratama',
    service: SERVICES[2],
    doctor: DOCTORS[3],
    date: 'Rabu, 14 Feb 2024',
    time: '14:00',
    queue: 'A025',
    status: 'done',
    payment: 'ewallet',
    branch: 'OMDC Dental Jakarta',
  },
  {
    id: 'a4',
    patientName: 'Andi Pratama',
    service: SERVICES[1],
    doctor: DOCTORS[0],
    date: 'Sabtu, 6 Jan 2024',
    time: '09:00',
    queue: 'A009',
    status: 'cancelled',
    branch: 'OMDC Dental Jakarta',
  },
];

const STATUS_CONFIG = {
  waiting: { label: 'Menunggu', bg: '#FEF3C7', color: '#92400E' },
  serving: { label: 'Dilayani', bg: '#DBEAFE', color: '#1E40AF' },
  done: { label: 'Selesai', bg: '#D1FAE5', color: '#065F46' },
  cancelled: { label: 'Dibatalkan', bg: '#FEE2E2', color: '#991B1B' },
};

const SERVICE_EMOJIS: Record<string, string> = {
  s1: '🦷', s2: '✨', s3: '🔧', s4: '❌', s5: '😁', s6: '🔩', s7: '💊', s8: '➕',
};

export function MobileMedical({ state, setState }: MobileMedicalProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const back = () => setState({ screen: 'profile' });

  const toggle = (id: string) => setExpanded(e => e === id ? null : id);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
      style={{ background: '#F8F9FA' }}
    >
      <MobileHeader title="Riwayat Medis" showBack onBack={back} />

      {/* Summary bar */}
      <div className="mx-5 mt-4 bg-white rounded-2xl px-4 py-3 flex items-center divide-x divide-gray-100 mb-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {[
          { value: MOCK_HISTORY.filter(a => a.status === 'done').length, label: 'Selesai', color: '#10B981' },
          { value: MOCK_HISTORY.filter(a => a.status === 'waiting').length, label: 'Menunggu', color: '#F59E0B' },
          { value: MOCK_HISTORY.filter(a => a.status === 'cancelled').length, label: 'Batal', color: '#EF4444' },
        ].map(stat => (
          <div key={stat.label} className="flex-1 text-center px-2">
            <p className="text-lg font-black" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 flex flex-col gap-3">
        {MOCK_HISTORY.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <ClipboardList size={64} style={{ color: '#E5E7EB' }} />
            <p className="text-base font-bold mt-4" style={{ color: '#9CA3AF' }}>Belum ada riwayat</p>
            <p className="text-sm mt-1" style={{ color: '#D1D5DB' }}>Kunjungan pertama Anda akan muncul di sini</p>
          </div>
        ) : (
          MOCK_HISTORY.map((appt, i) => {
            const status = STATUS_CONFIG[appt.status];
            const isExpanded = expanded === appt.id;

            return (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
              >
                <button
                  onClick={() => toggle(appt.id)}
                  className="w-full flex items-center gap-4 px-4 py-4 text-left"
                >
                  {/* Service icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: appt.service.color + '18' }}
                  >
                    {SERVICE_EMOJIS[appt.service.id] ?? '🦷'}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-bold text-sm" style={{ color: '#1A1A2E' }}>
                        {appt.service.name}
                      </p>
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ml-2 flex-shrink-0"
                        style={{ background: status.bg, color: status.color }}
                      >
                        {appt.status === 'done' && <CheckCircle size={9} />}
                        {appt.status === 'cancelled' && <XCircle size={9} />}
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: '#6B7280' }}>{appt.date} • {appt.time}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{appt.doctor.name}</p>
                  </div>

                  <div className="flex-shrink-0 ml-1">
                    {isExpanded
                      ? <ChevronUp size={16} style={{ color: '#9CA3AF' }} />
                      : <ChevronDown size={16} style={{ color: '#9CA3AF' }} />
                    }
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4" style={{ borderTop: '1px solid #F3F4F6' }}>
                        <div className="pt-3 flex flex-col gap-2">
                          {[
                            { label: 'No. Antrian', value: appt.queue },
                            { label: 'Spesialisasi', value: appt.doctor.specialty },
                            { label: 'Durasi', value: `${appt.service.duration} menit` },
                            { label: 'Klinik', value: appt.branch ?? '-' },
                            { label: 'Pembayaran', value: appt.payment ? appt.payment.toUpperCase() : '-' },
                          ].map(row => (
                            <div key={row.label} className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: '#9CA3AF' }}>{row.label}</span>
                              <span className="text-xs font-semibold" style={{ color: '#374151' }}>{row.value}</span>
                            </div>
                          ))}
                        </div>

                        {appt.status === 'done' && (
                          <button
                            className="mt-3 w-full py-2.5 rounded-xl text-sm font-bold border-2 transition-all active:scale-95"
                            style={{ borderColor: '#E91E8C', color: '#E91E8C', background: '#FFF5F9' }}
                          >
                            ⭐ Beri Ulasan
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
