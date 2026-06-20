import { motion } from 'motion/react';
import { CheckCircle, Clock, Share2, Bell } from 'lucide-react';
import { CURRENT_QUEUE, CLINIC_NAME } from '../../../data/mockData';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import type { MobileState } from '../../../types';

interface MobileQueueProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

export function MobileQueue({ state, setState }: MobileQueueProps) {
  const queueNo = state.currentQueue ?? 'A018';
  const currentNo = CURRENT_QUEUE;

  // Estimate position
  const queueNum = parseInt(queueNo.replace(/\D/g, ''), 10);
  const currentNum = parseInt(currentNo.replace(/\D/g, ''), 10);
  const ahead = Math.max(0, queueNum - currentNum);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#F8F9FA' }}
    >
      <MobileHeader
        title="Antrian Saya"
        rightAction={
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: '#FFF5F9' }}
          >
            <Share2 size={16} style={{ color: '#E91E8C' }} />
          </button>
        }
      />

      <div className="flex-1 px-5 py-5 pb-28 flex flex-col gap-4">
        {/* Success badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full self-center"
          style={{ background: '#D1FAE5' }}
        >
          <CheckCircle size={16} fill="#10B981" color="#10B981" />
          <span className="text-xs font-bold" style={{ color: '#065F46' }}>
            Janji temu berhasil dibuat!
          </span>
        </motion.div>

        {/* Main ticket card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 160 }}
          className="rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 12px 40px rgba(233,30,140,0.2)' }}
        >
          {/* Ticket header */}
          <div
            className="px-6 py-8 flex flex-col items-center"
            style={{ background: 'linear-gradient(160deg, #E91E8C 0%, #FF6BB5 100%)' }}
          >
            <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">
              Nomor Antrian Anda
            </p>
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="text-white font-black tracking-widest"
              style={{ fontSize: 72, lineHeight: 1 }}
            >
              {queueNo}
            </motion.p>
          </div>

          {/* Dashed separator */}
          <div className="bg-white relative">
            <div
              className="absolute left-0 right-0 h-0"
              style={{ borderTop: '2px dashed #E5E7EB', top: 0 }}
            />
            {/* Notches */}
            <div
              className="absolute -left-3 -top-3 w-6 h-6 rounded-full"
              style={{ background: '#F8F9FA' }}
            />
            <div
              className="absolute -right-3 -top-3 w-6 h-6 rounded-full"
              style={{ background: '#F8F9FA' }}
            />
          </div>

          {/* Ticket body */}
          <div className="bg-white px-6 py-5">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#9CA3AF' }}>
                  Layanan
                </p>
                <p className="text-sm font-bold" style={{ color: '#1A1A2E' }}>
                  {state.selectedService?.name ?? 'Scaling & Polishing'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#9CA3AF' }}>
                  Dokter
                </p>
                <p className="text-sm font-bold" style={{ color: '#1A1A2E' }}>
                  {state.selectedDoctor?.name?.split(' ').slice(0, 2).join(' ') ?? 'drg. Sarah'}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#9CA3AF' }}>
                  Tanggal
                </p>
                <p className="text-xs font-bold" style={{ color: '#374151' }}>
                  {state.selectedDate ?? 'Sabtu, 18 Mei 2024'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#9CA3AF' }}>
                  Waktu
                </p>
                <p className="text-sm font-bold" style={{ color: '#374151' }}>
                  {state.selectedTime ?? '09:00'}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-3 flex items-center justify-between"
            style={{ background: '#FFF5F9', borderTop: '1.5px dashed #FECDD3' }}
          >
            <p className="text-xs" style={{ color: '#9CA3AF' }}>{CLINIC_NAME}</p>
            <p className="text-xs font-bold" style={{ color: '#E91E8C' }}>OMDC Dental</p>
          </div>
        </motion.div>

        {/* Current queue status */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl px-5 py-4"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#9CA3AF' }}>
            Status Antrian
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <p className="text-[10px] font-semibold mb-1" style={{ color: '#9CA3AF' }}>Saat Ini</p>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: '#FFF5F9' }}
              >
                <span className="text-xl font-black" style={{ color: '#E91E8C' }}>{currentNo}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex-1 mx-4 flex flex-col items-center gap-1">
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)',
                    width: ahead <= 1 ? '90%' : ahead <= 3 ? '60%' : '30%',
                  }}
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={11} style={{ color: '#9CA3AF' }} />
                <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                  ~{ahead * 15} menit lagi
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[10px] font-semibold mb-1" style={{ color: '#9CA3AF' }}>Antrian Anda</p>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
              >
                <span className="text-xl font-black text-white">{queueNo}</span>
              </div>
            </div>
          </div>

          {/* Ahead indicator */}
          <div
            className="py-2.5 rounded-xl flex items-center justify-center gap-2"
            style={{ background: ahead <= 1 ? '#D1FAE5' : '#FFF5F9' }}
          >
            <span className="text-sm">
              {ahead <= 1 ? '🎉' : '⏳'}
            </span>
            <p className="text-xs font-bold" style={{ color: ahead <= 1 ? '#065F46' : '#E91E8C' }}>
              {ahead <= 0
                ? 'Giliran Anda sekarang!'
                : ahead === 1
                ? 'Segera dipanggil!'
                : `${ahead} antrian di depan Anda`}
            </p>
          </div>
        </motion.div>

        {/* Notify me */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 font-bold text-sm transition-all active:scale-95"
          style={{ borderColor: '#E91E8C', color: '#E91E8C', background: '#FFF5F9' }}
        >
          <Bell size={16} />
          Aktifkan Notifikasi Antrian
        </motion.button>

        {/* Done button */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          onClick={() => setState({ screen: 'home' })}
          className="py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            boxShadow: '0 8px 24px rgba(233,30,140,0.3)',
          }}
        >
          Kembali ke Beranda
        </motion.button>
      </div>
    </motion.div>
  );
}
