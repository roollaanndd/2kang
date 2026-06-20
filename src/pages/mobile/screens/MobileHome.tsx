/* eslint-disable */
import { motion } from 'motion/react';
import {
  Bell, ChevronRight, Star, Clock, Calendar, Phone,
} from 'lucide-react';
import { DOCTORS, SERVICES, PROMOTIONS, SAMPLE_APPOINTMENTS } from '../../../data/mockData';
import type { MobileState, Service } from '../../../types/index';

interface MobileHomeProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const GRADIENTS = [
  'linear-gradient(135deg,#E91E8C,#FF6BB5)',
  'linear-gradient(135deg,#4FC3F7,#0288D1)',
  'linear-gradient(135deg,#A78BFA,#7C3AED)',
  'linear-gradient(135deg,#10B981,#059669)',
  'linear-gradient(135deg,#F59E0B,#D97706)',
  'linear-gradient(135deg,#EF4444,#DC2626)',
  'linear-gradient(135deg,#EC4899,#DB2777)',
  'linear-gradient(135deg,#14B8A6,#0D9488)',
];

function DentalIcon({ id }: { id: string }) {
  const paths: Record<string, string> = {
    's1': 'M12 3c-3.5 0-6 2.7-6 6 0 2.3.9 4 1.8 5.8.9 1.8 1.7 3.3 1.7 5.2 0 .6.4 1 1 1h3c.6 0 1-.4 1-1 0-1.9.8-3.4 1.7-5.2.9-1.8 1.8-3.5 1.8-5.8 0-3.3-2.5-6-6-6z',
    's2': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    's3': 'M12 2a7 7 0 0 0-7 7c0 5.25 3.5 9.74 8.08 10.98.2.05.42.05.84 0A11 11 0 0 0 19 9a7 7 0 0 0-7-7z',
    's4': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    's5': 'M14.828 14.828a4 4 0 0 1-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    's6': 'M12 22V12m0 0c0-5-6-5-6 0m6 0c0-5 6-5 6 0M6 12v5a6 6 0 0 0 12 0v-5',
    's7': 'M9 3H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2M9 3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 3h6m-3 5v8m-3-4h6',
    's8': 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d={paths[id] ?? paths['s8']} />
    </svg>
  );
}

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Selamat Pagi';
  if (h < 17) return 'Selamat Siang';
  return 'Selamat Malam';
};

export function MobileHome({ state, setState }: MobileHomeProps) {
  const firstName = state.user?.name?.split(' ')[0] ?? 'Pengguna';
  const appointment = SAMPLE_APPOINTMENTS[0];

  const handleServiceClick = (svc: Service) => {
    setState({ screen: 'booking', selectedService: svc });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="flex flex-col h-full no-overscroll"
      style={{ background: '#F1F3F6', overflowY: 'auto', scrollbarWidth: 'none' }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{
          background: 'linear-gradient(155deg, #9D174D 0%, #BE185D 25%, #E91E8C 60%, #FF6BB5 100%)',
          paddingBottom: 28,
        }}
      >
        {/* Animated bokeh blobs */}
        {[
          { x: 80, y: 5,  s: 90,  delay: 0,   op: 0.07 },
          { x: 5,  y: 45, s: 60,  delay: 1.2, op: 0.09 },
          { x: 60, y: 65, s: 100, delay: 0.7, op: 0.06 },
          { x: 90, y: 50, s: 50,  delay: 1.8, op: 0.08 },
        ].map((b, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.s,
              height: b.s,
              borderRadius: '50%',
              background: `rgba(255,255,255,${b.op})`,
              pointerEvents: 'none',
            }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4 + b.delay, repeat: Infinity, delay: b.delay }}
          />
        ))}

        {/* Status-bar safe area + top bar */}
        <div className="relative flex items-center justify-between px-5 pt-14 pb-3">
          <div>
            <p className="text-white/70 text-sm font-medium">{getGreeting()},</p>
            <h1 className="text-white text-2xl font-black tracking-tight leading-tight">
              {firstName}! 👋
            </h1>
          </div>
          <div className="flex gap-2.5">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setState({ screen: 'notifications' })}
              className="relative w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Bell size={18} color="white" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setState({ screen: 'profile' })}
              className="w-11 h-11 rounded-full flex items-center justify-center font-black text-base text-white"
              style={{ background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.55)' }}
            >
              {firstName[0]}
            </motion.button>
          </div>
        </div>

        {/* Next appointment — glass card */}
        {appointment && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-5 rounded-2xl p-4"
            style={{
              background: 'rgba(255,255,255,0.16)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.28)',
            }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                Janji Temu Berikutnya
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                Terkonfirmasi
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ background: 'rgba(255,255,255,0.22)' }}
              >
                🦷
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight truncate">
                  {appointment.service.name}
                </p>
                <p className="text-white/75 text-xs mt-0.5">{appointment.doctor.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-white/65 text-[11px]">
                    <Clock size={10} /> {appointment.time}
                  </span>
                  <span className="flex items-center gap-1 text-white/65 text-[11px]">
                    <Calendar size={10} /> {appointment.date}
                  </span>
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-xs"
                style={{ background: 'rgba(255,255,255,0.28)' }}
              >
                {appointment.queue}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick actions */}
        <div className="flex gap-2.5 px-5 mt-3.5">
          {[
            { label: 'Booking',  emoji: '📅', screen: 'booking' as const },
            { label: 'Antrian',  emoji: '🎫', screen: 'queue'   as const },
            { label: 'Darurat',  emoji: '📞', screen: 'notifications' as const },
          ].map((a, i) => (
            <motion.button
              key={a.label}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              onClick={() => setState({ screen: a.screen })}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white"
              style={{
                background: i === 2 ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.28)',
              }}
            >
              <span className="text-sm leading-none">{a.emoji}</span>
              {a.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── SCROLLABLE CONTENT ───────────────────────────────────────── */}
      <div className="flex flex-col gap-6 px-4 pt-5 pb-28">

        {/* Services Grid */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="font-black text-[15px] text-gray-900">Layanan Kami</h2>
            <button
              onClick={() => setState({ screen: 'booking' })}
              className="flex items-center gap-0.5 text-xs font-semibold"
              style={{ color: PINK }}
            >
              Lihat semua <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {SERVICES.map((svc, i) => (
              <motion.button
                key={svc.id}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.88 }}
                onClick={() => handleServiceClick(svc)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-14 h-14 rounded-[18px] flex items-center justify-center shadow-md"
                  style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                >
                  <DentalIcon id={svc.id} />
                </div>
                <span className="text-[10px] font-semibold text-center leading-tight text-gray-700 w-full">
                  {svc.name.length > 11 ? svc.name.slice(0, 10) + '…' : svc.name}
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Doctors */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="font-black text-[15px] text-gray-900">Dokter Rekomendasi</h2>
            <button
              onClick={() => setState({ screen: 'doctors' })}
              className="flex items-center gap-0.5 text-xs font-semibold"
              style={{ color: PINK }}
            >
              Semua <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {DOCTORS.map((doc, i) => {
              const initials = doc.name.replace('drg. ', '').slice(0, 2).toUpperCase();
              return (
                <motion.button
                  key={doc.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setState({ screen: 'booking-doctor', selectedDoctor: doc })}
                  className="flex-shrink-0 w-44 rounded-2xl p-3.5 text-left"
                  style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl mb-2.5 flex items-center justify-center overflow-hidden"
                    style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                  >
                    {doc.photo ? (
                      <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-black text-xl">{initials}</span>
                    )}
                  </div>
                  <p className="text-xs font-bold leading-tight text-gray-800 line-clamp-2">{doc.name}</p>
                  <p className="text-[10px] mt-0.5 mb-2.5 leading-snug text-gray-400">{doc.specialty}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={10} fill="#F59E0B" color="#F59E0B" />
                      <span className="text-[10px] font-bold text-gray-700">{doc.rating}</span>
                    </div>
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                      style={doc.available
                        ? { background: '#D1FAE5', color: '#065F46' }
                        : { background: '#FEE2E2', color: '#991B1B' }
                      }
                    >
                      {doc.available ? 'Tersedia' : 'Libur'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Promotions */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="font-black text-[15px] text-gray-900">Promo Terkini</h2>
            <button
              onClick={() => setState({ screen: 'promos' })}
              className="flex items-center gap-0.5 text-xs font-semibold"
              style={{ color: PINK }}
            >
              Semua <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {PROMOTIONS.map((promo, i) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex-shrink-0 w-60 rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              >
                {/* Gradient header */}
                <div className="px-4 pt-4 pb-3 relative overflow-hidden" style={{ background: promo.color }}>
                  <div style={{
                    position: 'absolute', top: -20, right: -20,
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                  }} />
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-white font-black text-sm leading-tight">{promo.title}</span>
                    <span
                      className="text-xs font-black rounded-full px-2.5 py-1 flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.28)', color: 'white' }}
                    >
                      -{promo.discount}%
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="px-4 py-3.5" style={{ background: promo.bgColor || '#FFF5F9' }}>
                  <p className="text-xs text-gray-600 leading-snug line-clamp-2">{promo.description}</p>
                  <p className="text-[10px] text-gray-400 mt-1.5">Berlaku s/d {promo.validUntil}</p>
                  <button
                    onClick={() => setState({ screen: 'booking' })}
                    className="mt-2.5 flex items-center gap-1 text-xs font-bold"
                    style={{ color: promo.color }}
                  >
                    Klaim Sekarang <ChevronRight size={11} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Emergency card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
            border: '1px solid #FCD34D',
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: 'rgba(245,158,11,0.2)' }}>
            🚨
          </div>
          <div className="flex-1">
            <p className="font-black text-sm text-amber-900">Layanan Darurat 24/7</p>
            <p className="text-xs text-amber-700 mt-0.5">Hubungi kami kapan saja untuk keadaan darurat</p>
          </div>
          <button
            onClick={() => setState({ screen: 'notifications' })}
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(245,158,11,0.3)' }}
          >
            <Phone size={16} color="#92400E" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
