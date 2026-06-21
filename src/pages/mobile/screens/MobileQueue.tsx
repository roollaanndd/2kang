import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Clock, Share2, Bell, Users, Sparkles } from 'lucide-react';
import { CURRENT_QUEUE, CLINIC_NAME } from '../../../data/mockData';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { Skeleton, SkeletonText, SkeletonCircle } from '../../../components/ui/Skeleton';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileQueueProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

// Average minutes per patient — used to derive the live wait estimate.
const MIN_PER_PATIENT = 4;

export function MobileQueue({ state, setState }: MobileQueueProps) {
  const queueNo = state.currentQueue ?? 'A018';

  // Numeric parts of the queue ids (e.g. "A018" -> 18).
  const queuePrefix = queueNo.replace(/\d+$/, '');
  const queueNum = parseInt(queueNo.replace(/\D/g, ''), 10);
  const startNum = parseInt(CURRENT_QUEUE.replace(/\D/g, ''), 10);

  // Loading skeleton on mount (~800ms) to mimic fetching live queue data.
  const [loading, setLoading] = useState(true);

  // Live "now serving" number — advances automatically over time.
  const [servingNum, setServingNum] = useState(startNum);

  // Live remaining wait in seconds — visibly ticks down.
  const initialAhead = Math.max(0, queueNum - startNum);
  const [secondsLeft, setSecondsLeft] = useState(initialAhead * MIN_PER_PATIENT * 60);

  const ahead = Math.max(0, queueNum - servingNum);
  const isTurn = servingNum >= queueNum;

  // Guard so the success haptic only fires once on arrival.
  const celebratedRef = useRef(false);

  // ── Skeleton timer ──────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // ── Wait countdown — ticks every second ─────────────────────────
  useEffect(() => {
    if (loading || isTurn) return;
    const id = setInterval(() => {
      setSecondsLeft(s => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [loading, isTurn]);

  // ── Queue advances automatically every ~7s ──────────────────────
  useEffect(() => {
    if (loading || isTurn) return;
    const id = setInterval(() => {
      setServingNum(n => {
        const next = Math.min(queueNum, n + 1);
        // Re-sync the estimate to the new position so the two stay coherent.
        setSecondsLeft(Math.max(0, (queueNum - next) * MIN_PER_PATIENT * 60));
        return next;
      });
      haptic('selection');
    }, 7000);
    return () => clearInterval(id);
  }, [loading, isTurn, queueNum]);

  // ── Celebrate when it's the user's turn ─────────────────────────
  useEffect(() => {
    if (!loading && isTurn && !celebratedRef.current) {
      celebratedRef.current = true;
      haptic('success');
    }
  }, [loading, isTurn]);

  // Format remaining wait as a friendly "~N menit" / "<1 menit".
  const mins = Math.ceil(secondsLeft / 60);
  const waitLabel = secondsLeft <= 0 ? '<1 menit' : `~${mins} menit`;

  // Progress 0..1 of how far the queue has reached the user.
  const totalSpan = Math.max(1, queueNum - startNum);
  const progress = isTurn ? 1 : Math.min(1, (servingNum - startNum) / totalSpan);

  const servingLabel = `${queuePrefix}${String(servingNum).padStart(3, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#F8F9FA' }}
    >
      {/* signature 3px brand strip */}
      <div style={{
        height: 3, flexShrink: 0,
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
      }} />

      <MobileHeader
        title="Antrian Saya"
        rightAction={
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => haptic('light')}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: '#FFF5F9' }}
          >
            <Share2 size={16} style={{ color: '#E91E8C' }} />
          </motion.button>
        }
      />

      {loading ? (
        <QueueSkeleton />
      ) : (
        <div className="flex-1 px-5 py-5 pb-28 flex flex-col gap-4">
          {/* Status badge — confirmed OR your-turn */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isTurn ? 'turn' : 'confirmed'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220 }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full self-center"
              style={{ background: isTurn ? '#FCE7F3' : '#D1FAE5' }}
            >
              {isTurn ? (
                <Sparkles size={16} color="#E91E8C" fill="#E91E8C" />
              ) : (
                <CheckCircle size={16} fill="#10B981" color="#10B981" />
              )}
              <span className="text-xs font-bold" style={{ color: isTurn ? '#9D174D' : '#065F46' }}>
                {isTurn ? 'Giliran Anda telah tiba!' : 'Janji temu berhasil dibuat!'}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* ── LIVE HERO — big now-serving number ───────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160 }}
            className="rounded-3xl overflow-hidden bg-white"
            style={{ boxShadow: '0 12px 40px rgba(233,30,140,0.16)' }}
          >
            <div
              className="px-6 pt-7 pb-6 flex flex-col items-center"
              style={{
                background: isTurn
                  ? 'linear-gradient(160deg, #E91E8C 0%, #FF6BB5 100%)'
                  : 'linear-gradient(160deg, #FFFFFF 0%, #FFF5F9 100%)',
              }}
            >
              {/* live indicator */}
              <div className="flex items-center gap-2 mb-3">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: isTurn ? '#FFFFFF' : '#10B981' }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: isTurn ? 'rgba(255,255,255,0.9)' : '#10B981' }}
                >
                  {isTurn ? 'Silakan masuk' : 'Sedang dilayani · Live'}
                </span>
              </div>

              <p
                className="text-[11px] font-semibold uppercase tracking-widest mb-1"
                style={{ color: isTurn ? 'rgba(255,255,255,0.85)' : '#9CA3AF' }}
              >
                {isTurn ? 'Nomor Anda Dipanggil' : 'Nomor Dipanggil Saat Ini'}
              </p>

              <div style={{ height: 80 }} className="flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={isTurn ? queueNo : servingLabel}
                    initial={{ y: 28, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -28, opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="font-black tracking-widest"
                    style={{
                      fontSize: 72,
                      lineHeight: 1,
                      color: isTurn ? '#FFFFFF' : '#E91E8C',
                    }}
                  >
                    {isTurn ? queueNo : servingLabel}
                  </motion.p>
                </AnimatePresence>
              </div>

              {isTurn && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-bold text-white/90 mt-2 text-center"
                >
                  Silakan menuju ruang perawatan 🦷
                </motion.p>
              )}
            </div>

            {!isTurn && (
              <div className="px-6 py-5">
                {/* Your-number + position summary */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                    >
                      <span className="text-[8px] font-bold text-white/80 uppercase tracking-wide">Anda</span>
                      <span className="text-lg font-black text-white leading-none">{queueNo}</span>
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: '#1A1A2E' }}>
                        Anda #{ahead + 1} dalam antrean
                      </p>
                      <p className="text-xs font-semibold flex items-center gap-1" style={{ color: '#6B7280' }}>
                        <Users size={12} style={{ color: '#9CA3AF' }} />
                        {ahead === 0 ? 'Anda berikutnya' : `${ahead} orang di depan Anda`}
                      </p>
                    </div>
                  </div>

                  {/* Live ticking estimate */}
                  <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9CA3AF' }}>
                      Estimasi
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      <Clock size={13} style={{ color: '#E91E8C' }} />
                      <motion.span
                        key={mins}
                        initial={{ opacity: 0.4 }}
                        animate={{ opacity: 1 }}
                        className="text-base font-black"
                        style={{ color: '#E91E8C' }}
                      >
                        {waitLabel}
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Segmented progress indicator */}
                <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }}
                    initial={false}
                    animate={{ width: `${Math.max(6, progress * 100)}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] font-semibold" style={{ color: '#9CA3AF' }}>{servingLabel}</span>
                  <span className="text-[10px] font-semibold" style={{ color: '#E91E8C' }}>{queueNo}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Appointment ticket details ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl overflow-hidden bg-white"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <div className="bg-white px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#9CA3AF' }}>
                Detail Janji Temu
              </p>
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

            <div
              className="px-6 py-3 flex items-center justify-between"
              style={{ background: '#FFF5F9', borderTop: '1.5px dashed #FECDD3' }}
            >
              <p className="text-xs" style={{ color: '#9CA3AF' }}>{CLINIC_NAME}</p>
              <p className="text-xs font-bold" style={{ color: '#E91E8C' }}>OMDC Dental</p>
            </div>
          </motion.div>

          {/* Notify me */}
          {!isTurn && (
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => haptic('light')}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 font-bold text-sm transition-all"
              style={{ borderColor: '#E91E8C', color: '#E91E8C', background: '#FFF5F9' }}
            >
              <Bell size={16} />
              Aktifkan Notifikasi Antrian
            </motion.button>
          )}

          {/* Done / CTA */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { haptic('light'); setState({ screen: 'home' }); }}
            className="py-4 rounded-2xl font-bold text-base text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              boxShadow: '0 8px 24px rgba(233,30,140,0.3)',
            }}
          >
            Kembali ke Beranda
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

// ── Skeleton placeholder roughly matching the live layout ─────────
function QueueSkeleton() {
  return (
    <div className="flex-1 px-5 py-5 pb-28 flex flex-col gap-4">
      <Skeleton width={200} height={34} radius={999} style={{ alignSelf: 'center' }} />

      {/* Hero card skeleton */}
      <div className="rounded-3xl bg-white p-6 flex flex-col items-center gap-4" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
        <SkeletonText width={140} height={10} />
        <Skeleton width={170} height={64} radius={16} />
        <div className="w-full flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <Skeleton width={56} height={56} radius={16} />
            <div className="flex flex-col gap-2">
              <SkeletonText width={120} height={12} />
              <SkeletonText width={90} height={10} />
            </div>
          </div>
          <SkeletonText width={56} height={20} />
        </div>
        <Skeleton width="100%" height={10} radius={999} />
      </div>

      {/* Detail card skeleton */}
      <div className="rounded-3xl bg-white p-6 flex flex-col gap-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <SkeletonText width={120} height={10} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2"><SkeletonText width={60} height={9} /><SkeletonText width={100} height={12} /></div>
          <div className="flex flex-col gap-2 items-end"><SkeletonText width={50} height={9} /><SkeletonText width={80} height={12} /></div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2"><SkeletonText width={50} height={9} /><SkeletonText width={110} height={12} /></div>
          <div className="flex flex-col gap-2 items-end"><SkeletonText width={50} height={9} /><SkeletonText width={60} height={12} /></div>
        </div>
      </div>

      <Skeleton width="100%" height={50} radius={16} />
      <div className="flex items-center gap-3">
        <SkeletonCircle size={20} />
        <SkeletonText width={120} height={12} />
      </div>
    </div>
  );
}
