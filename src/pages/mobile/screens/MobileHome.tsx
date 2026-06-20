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
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#FAFAF8',
        overflow: 'hidden',
      }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          flexShrink: 0,
          background: '#FFFFFF',
          paddingBottom: 44,
          overflow: 'hidden',
        }}
      >
        {/* Thin pink gradient accent strip at very top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
          zIndex: 2,
        }} />

        {/* Subtle gradient mesh blobs */}
        <div style={{
          position: 'absolute',
          top: -60,
          right: -40,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,30,140,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: 40,
          left: -60,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 60,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />

        {/* Animated bokeh blobs */}
        {[
          { x: 80, y: 5,  s: 90,  delay: 0,   op: 0.03 },
          { x: 5,  y: 45, s: 60,  delay: 1.2, op: 0.04 },
          { x: 60, y: 65, s: 100, delay: 0.7, op: 0.03 },
          { x: 90, y: 50, s: 50,  delay: 1.8, op: 0.03 },
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
              background: `rgba(233,30,140,${b.op})`,
              pointerEvents: 'none',
            }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4 + b.delay, repeat: Infinity, delay: b.delay }}
          />
        ))}

        {/* Status-bar safe area + top bar */}
        <div className="relative flex items-center justify-between px-5 pt-14 pb-3">
          <div>
            <p style={{ color: '#6B7280', fontSize: 13, fontWeight: 500 }}>{getGreeting()},</p>
            <h1 style={{ color: '#0D1421', fontSize: 24, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.15 }}>
              {firstName}! 👋
            </h1>
          </div>
          <div className="flex gap-2.5">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setState({ screen: 'notifications' })}
              style={{
                position: 'relative',
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFFFF',
                border: '1.5px solid rgba(233,30,140,0.25)',
                boxShadow: '0 2px 8px rgba(233,30,140,0.10)',
                cursor: 'pointer',
              }}
            >
              <Bell size={18} color={PINK} />
              <span style={{
                position: 'absolute',
                top: 9,
                right: 9,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#FBBF24',
                border: '2px solid #FFFFFF',
              }} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setState({ screen: 'profile' })}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 16,
                color: PINK,
                background: '#FFFFFF',
                border: '1.5px solid rgba(233,30,140,0.35)',
                boxShadow: '0 2px 8px rgba(233,30,140,0.12)',
                cursor: 'pointer',
              }}
            >
              {firstName[0]}
            </motion.button>
          </div>
        </div>

        {/* Next appointment — white card with pink accent */}
        {appointment && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              margin: '0 20px',
              borderRadius: 20,
              padding: 16,
              background: '#FFFFFF',
              boxShadow: '0 4px 24px rgba(233,30,140,0.10), 0 1px 4px rgba(0,0,0,0.06)',
              border: '1px solid rgba(233,30,140,0.12)',
              borderLeft: `3px solid ${PINK}`,
            }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span style={{ color: '#6B7280', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Janji Temu Berikutnya
              </span>
              <span style={{
                padding: '2px 10px',
                borderRadius: 20,
                fontSize: 10,
                fontWeight: 700,
                background: '#10B981',
                color: 'white',
              }}>
                Terkonfirmasi
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 24,
                  background: 'rgba(233,30,140,0.08)',
                }}
              >
                🦷
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#0D1421', fontWeight: 700, fontSize: 14, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {appointment.service.name}
                </p>
                <p style={{ color: '#6B7280', fontSize: 12, marginTop: 2 }}>{appointment.doctor.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9CA3AF', fontSize: 11 }}>
                    <Clock size={10} /> {appointment.time}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9CA3AF', fontSize: 11 }}>
                    <Calendar size={10} /> {appointment.date}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: PINK,
                  fontWeight: 900,
                  fontSize: 12,
                  background: 'rgba(233,30,140,0.10)',
                  border: '1px solid rgba(233,30,140,0.20)',
                }}
              >
                {appointment.queue}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick actions */}
        <div className="flex gap-2.5 px-5 mt-3.5">
          {[
            { label: 'Booking',  emoji: '📅', screen: 'booking' as const,        bg: 'rgba(233,30,140,0.10)',  color: '#E91E8C',  border: 'rgba(233,30,140,0.22)' },
            { label: 'Antrian',  emoji: '🎫', screen: 'queue'   as const,        bg: 'rgba(6,182,212,0.10)',   color: '#0891B2',  border: 'rgba(6,182,212,0.22)'  },
            { label: 'Darurat',  emoji: '📞', screen: 'notifications' as const,  bg: 'rgba(239,68,68,0.10)',  color: '#DC2626',  border: 'rgba(239,68,68,0.22)'  },
          ].map((a, i) => (
            <motion.button
              key={a.label}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              onClick={() => setState({ screen: a.screen })}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 14,
                fontSize: 12,
                fontWeight: 700,
                color: a.color,
                background: a.bg,
                border: `1px solid ${a.border}`,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 14, lineHeight: 1 }}>{a.emoji}</span>
              {a.label}
            </motion.button>
          ))}
        </div>

        {/* Wave blend — content card rises up over the hero */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 32,
          background: '#FAFAF8',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── SCROLLABLE CONTENT ───────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          marginTop: -8,
          scrollbarWidth: 'none',
          background: '#FAFAF8',
        }}
      >
        <div className="flex flex-col gap-6 px-4 pt-3 pb-6">

          {/* Services Grid */}
          <section>
            <div className="flex items-center justify-between mb-3.5">
              <h2 style={{ fontWeight: 900, fontSize: 15, color: '#0D1421' }}>Layanan Kami</h2>
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
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: GRADIENTS[i % GRADIENTS.length],
                      boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                    }}
                  >
                    <DentalIcon id={svc.id} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, textAlign: 'center', lineHeight: 1.3, color: '#374151', width: '100%' }}>
                    {svc.name.length > 11 ? svc.name.slice(0, 10) + '…' : svc.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Doctors */}
          <section>
            <div className="flex items-center justify-between mb-3.5">
              <h2 style={{ fontWeight: 900, fontSize: 15, color: '#0D1421' }}>Dokter Rekomendasi</h2>
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
                    style={{
                      flexShrink: 0,
                      width: 176,
                      borderRadius: 20,
                      padding: 14,
                      textAlign: 'left',
                      background: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        background: GRADIENTS[i % GRADIENTS.length],
                      }}
                    >
                      {doc.photo ? (
                        <img src={doc.photo} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ color: 'white', fontWeight: 900, fontSize: 20 }}>{initials}</span>
                      )}
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, color: '#1F2937', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{doc.name}</p>
                    <p style={{ fontSize: 10, marginTop: 2, marginBottom: 10, lineHeight: 1.4, color: '#9CA3AF' }}>{doc.specialty}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={10} fill="#F59E0B" color="#F59E0B" />
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#374151' }}>{doc.rating}</span>
                      </div>
                      <span
                        style={doc.available
                          ? { background: '#D1FAE5', color: '#065F46', padding: '2px 6px', borderRadius: 20, fontSize: 9, fontWeight: 700 }
                          : { background: '#FEE2E2', color: '#991B1B', padding: '2px 6px', borderRadius: 20, fontSize: 9, fontWeight: 700 }
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
              <h2 style={{ fontWeight: 900, fontSize: 15, color: '#0D1421' }}>Promo Terkini</h2>
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
                  style={{
                    flexShrink: 0,
                    width: 240,
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* Gradient header */}
                  <div style={{ padding: '16px', position: 'relative', overflow: 'hidden', background: promo.color }}>
                    <div style={{
                      position: 'absolute', top: -20, right: -20,
                      width: 80, height: 80, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.12)',
                    }} />
                    <div className="flex items-start justify-between gap-2">
                      <span style={{ color: 'white', fontWeight: 900, fontSize: 14, lineHeight: 1.3 }}>{promo.title}</span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 900,
                          borderRadius: 20,
                          padding: '4px 10px',
                          flexShrink: 0,
                          background: 'rgba(255,255,255,0.28)',
                          color: 'white',
                        }}
                      >
                        -{promo.discount}%
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div style={{ padding: '14px 16px', background: promo.bgColor || '#FFF5F9' }}>
                    <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{promo.description}</p>
                    <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 6 }}>Berlaku s/d {promo.validUntil}</p>
                    <button
                      onClick={() => setState({ screen: 'booking' })}
                      className="flex items-center gap-1 text-xs font-bold"
                      style={{ color: promo.color, marginTop: 10, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
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
            style={{
              borderRadius: 20,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
              border: '1px solid #FCD34D',
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0,
              background: 'rgba(245,158,11,0.2)',
            }}>
              🚨
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 900, fontSize: 14, color: '#78350F' }}>Layanan Darurat 24/7</p>
              <p style={{ fontSize: 12, color: '#92400E', marginTop: 2 }}>Hubungi kami kapan saja untuk keadaan darurat</p>
            </div>
            <button
              onClick={() => setState({ screen: 'notifications' })}
              style={{
                width: 40,
                height: 40,
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: 'rgba(245,158,11,0.3)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Phone size={16} color="#92400E" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
