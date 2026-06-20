/* eslint-disable */
import React from 'react';
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
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';

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

const SHADOW_COLORS = [
  '#E91E8C',
  '#0288D1',
  '#7C3AED',
  '#059669',
  '#D97706',
  '#DC2626',
  '#DB2777',
  '#0D9488',
];

// ── DENTAL SERVICE ICONS ──────────────────────────────────────────────────────
function DentalServiceIcon({ id }: { id: string }) {
  const size = 22;
  const strokeProps = {
    fill: 'none' as const,
    stroke: 'white' as const,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (id) {
    // s1 — Pemeriksaan: tooth outline with checkmark
    case 's1':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Tooth silhouette */}
          <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
          {/* Checkmark inside tooth */}
          <path d="M9.5 9.5l2 2 3-3.5" />
        </svg>
      );

    // s2 — Scaling: water drops / sparkles
    case 's2':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Central drop */}
          <path d="M12 4c0 0-4 4.5-4 7.5a4 4 0 0 0 8 0C16 8.5 12 4 12 4z" />
          {/* Sparkle left */}
          <path d="M5 6l1 1M6 5l-1 1M5.5 5.5h1" />
          {/* Sparkle right */}
          <path d="M18 8l1 1M19 7l-1 1M18.5 7.5h1" />
          {/* Sparkle top-right */}
          <path d="M17 3l.5.5M17.5 3l-.5.5M17 3.5h1" />
        </svg>
      );

    // s3 — Tambal: tooth with filling square
    case 's3':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Tooth body */}
          <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
          {/* Filling square */}
          <rect x="9.5" y="7.5" width="5" height="4" rx="1" strokeWidth="1.8" />
        </svg>
      );

    // s4 — Cabut: tooth with extraction arrow pointing up
    case 's4':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Tooth body — slightly smaller, shifted down */}
          <path d="M8.5 8C6.6 8 5 9.5 5 11.3c0 1.4.6 2.6 1.3 3.8.7 1.3 1.2 2.5 1.2 4.3 0 .4.5.6 1.2.6h6.6c.7 0 1.2-.2 1.2-.6 0-1.8.5-3 1.2-4.3.7-1.2 1.3-2.4 1.3-3.8C19 9.5 17.4 8 15.5 8c-.9 0-1.8.3-2.4.9-.3.3-.7.4-1.1.4-.4 0-.8-.1-1.1-.4C10.3 8.3 9.4 8 8.5 8z" />
          {/* Up arrow — extraction */}
          <path d="M12 7V2M9.5 4.5L12 2l2.5 2.5" />
        </svg>
      );

    // s5 — Behel: teeth row with wire/bracket
    case 's5':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Three teeth bumps */}
          <path d="M4 14 Q4 8 7 8 Q10 8 10 12 Q10 8 12 8 Q14 8 14 12 Q14 8 17 8 Q20 8 20 14" />
          {/* Bottom base */}
          <path d="M4 14 Q12 17 20 14" />
          {/* Wire / braces wire */}
          <path d="M5.5 11 H18.5" strokeWidth="1.2" />
          {/* Brackets */}
          <rect x="8.5" y="9.8" width="2.2" height="2.2" rx="0.4" strokeWidth="1.4" />
          <rect x="13.3" y="9.8" width="2.2" height="2.2" rx="0.4" strokeWidth="1.4" />
        </svg>
      );

    // s6 — Implan: screw/implant in bone
    case 's6':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Crown on top */}
          <path d="M9.5 4h5l.5 2h-6l.5-2z" />
          <path d="M9.5 4C9 3 8 2 8 2h8s-1 1-1.5 2" />
          {/* Abutment connector */}
          <rect x="10.5" y="6" width="3" height="2" rx="0.5" />
          {/* Implant screw body */}
          <path d="M12 8v10" strokeWidth="2.4" />
          {/* Screw threads */}
          <path d="M10.5 10 H13.5 M10 12 H14 M10.5 14 H13.5 M11 16 H13" strokeWidth="1" />
          {/* Bone line */}
          <path d="M7 15 Q12 13 17 15" strokeWidth="1.4" />
        </svg>
      );

    // s7 — Saluran Akar: tooth with root canal lines
    case 's7':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Tooth crown */}
          <path d="M9 3C7.3 3 6 4.5 6 6.2c0 1.3.5 2.4 1 3.5.6 1.2 1 2.4 1 4.3v.5c0 .8.4 1.5 1 1.5h6c.6 0 1-.7 1-1.5v-.5c0-1.9.4-3.1 1-4.3.5-1.1 1-2.2 1-3.5C18 4.5 16.7 3 15 3c-.8 0-1.6.4-2.1.9-.3.3-.5.4-.9.4s-.6-.1-.9-.4C10.6 3.4 9.8 3 9 3z" />
          {/* Root canal — left root */}
          <path d="M10 15 Q9.5 18 9 21" />
          {/* Root canal — right root */}
          <path d="M14 15 Q14.5 18 15 21" />
          {/* Center root */}
          <path d="M12 15 V20" />
          {/* Pulp chamber indicator */}
          <path d="M10 9 Q12 7.5 14 9" strokeWidth="1.2" />
        </svg>
      );

    // s8 — Veneer: tooth with shine stars
    case 's8':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Tooth body */}
          <path d="M8.5 4C6.8 4 5.5 5.5 5.5 7.2c0 1.5.5 2.7 1.1 4 .7 1.4 1.1 2.8 1.1 4.8 0 .6.4 1 1 1h5.6c.6 0 1-.4 1-1 0-2 .4-3.4 1.1-4.8.6-1.3 1.1-2.5 1.1-4C17.5 5.5 16.2 4 14.5 4c-.8 0-1.6.3-2.1.9-.2.2-.4.3-.4.3s-.2-.1-.4-.3C11.1 4.3 10.3 4 9.3 4" />
          {/* Veneer shine — three stars */}
          <path d="M18 4 l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4z" />
          <path d="M16 8 l.3.7.7.3-.7.3-.3.7-.3-.7-.7-.3.7-.3z" />
          <path d="M19 9.5 l.25.5.5.25-.5.25-.25.5-.25-.5-.5-.25.5-.25z" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
        </svg>
      );
  }
}

// ── DOUBLE-BEZEL SERVICE ICON CONTAINER ───────────────────────────────────────
function ServiceIconBezel({ gradient, shadowColor, children }: {
  gradient: string;
  shadowColor: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      width: 60,
      height: 60,
      borderRadius: 18,
      padding: 4,
      background: 'white',
      boxShadow: `0 4px 16px ${shadowColor}30`,
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: 14,
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {children}
      </div>
    </div>
  );
}

// ── ANIMATED HERO BG — dental geometry, no blobs ─────────────────────────────
function MobileHeroBg() {
  const shapes = [
    { x: 78, y: -8,  s: 52, d: 0,   t: 12, c: PINK, o: 0.06, sh: 'tooth'   },
    { x: -4, y: 20,  s: 56, d: 1.4, t: 10, c: AQUA, o: 0.05, sh: 'ring'    },
    { x: 82, y: 55,  s: 18, d: 0.7, t: 8,  c: PINK, o: 0.07, sh: 'plus'    },
    { x: 60, y: 78,  s: 40, d: 2.1, t: 14, c: AQUA, o: 0.04, sh: 'ring'    },
    { x: 8,  y: 72,  s: 14, d: 1.0, t: 7,  c: AQUA, o: 0.08, sh: 'sparkle' },
    { x: 92, y: 80,  s: 12, d: 0.2, t: 6,  c: PINK, o: 0.09, sh: 'sparkle' },
    { x: 30, y: -5,  s: 36, d: 2.8, t: 16, c: PINK, o: 0.04, sh: 'tooth'   },
    { x: -2, y: 50,  s: 16, d: 1.7, t: 9,  c: PINK, o: 0.06, sh: 'plus'    },
  ] as const;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {shapes.map((el, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', left: `${el.x}%`, top: `${el.y}%`, opacity: el.o }}
          animate={{
            y: [-8, 8, -8],
            rotate: el.sh === 'ring' ? [0, 5, 0] : el.sh === 'plus' ? [0, 16, 0] : el.sh === 'sparkle' ? [0, 20, 0] : [0, 3, 0],
          }}
          transition={{ duration: el.t, repeat: Infinity, delay: el.d, ease: 'easeInOut' }}
        >
          {el.sh === 'tooth' && (
            <svg width={el.s} height={Math.round(el.s * 1.15)} viewBox="0 0 100 115" fill="none">
              <path d="M50 5C33 5 19 18 19 34c0 10 3.5 18 8 27 4.5 9 7 17 7 28 0 3 2.5 5.5 5.5 5.5h21c3 0 5.5-2.5 5.5-5.5 0-11 2.5-19 7-28 4.5-9 8-17 8-27C81 18 67 5 50 5z"
                stroke={el.c} strokeWidth="4" strokeLinejoin="round" />
            </svg>
          )}
          {el.sh === 'ring' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="42" stroke={el.c} strokeWidth="3" />
              <circle cx="50" cy="50" r="29" stroke={el.c} strokeWidth="1.5" strokeDasharray="8 6" />
            </svg>
          )}
          {el.sh === 'plus' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100" fill="none">
              <path d="M50 18V82M18 50H82" stroke={el.c} strokeWidth="10" strokeLinecap="round" />
            </svg>
          )}
          {el.sh === 'sparkle' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100">
              <path d="M50 10L55 45L90 50L55 55L50 90L45 55L10 50L45 45Z" fill={el.c} />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ── GREETING ──────────────────────────────────────────────────────────────────
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Selamat Pagi';
  if (h < 17) return 'Selamat Siang';
  return 'Selamat Malam';
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
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
        background: '#F8F9FB',
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
        {/* 3px pink→rose→aqua gradient strip at very top */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
          zIndex: 2,
        }} />

        {/* Animated premium dental-geometry background */}
        <MobileHeroBg />

        {/* Status-bar safe area + top bar */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 20px 12px' }}>
          <div>
            <p style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#9CA3AF',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: 2,
            }}>
              {getGreeting()}
            </p>
            <h1 style={{
              color: '#111827',
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: -0.5,
              lineHeight: 1.1,
            }}>
              {firstName}! 👋
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
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
                border: `1.5px solid rgba(233,30,140,0.28)`,
                boxShadow: '0 2px 12px rgba(233,30,140,0.12)',
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
                border: `1.5px solid rgba(233,30,140,0.35)`,
                boxShadow: '0 2px 12px rgba(233,30,140,0.14)',
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
              borderRadius: 22,
              padding: 16,
              background: '#FFFFFF',
              boxShadow: '0 8px 32px rgba(233,30,140,0.12)',
              borderLeft: `3px solid ${PINK}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ color: '#9CA3AF', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                <p style={{ color: '#111827', fontWeight: 700, fontSize: 14, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {appointment.service.name}
                </p>
                <p style={{ color: '#6B7280', fontSize: 12, marginTop: 2 }}>{appointment.doctor.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
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

        {/* Quick actions — 3 pill buttons */}
        <div style={{ display: 'flex', gap: 10, padding: '14px 20px 0' }}>
          {[
            {
              label: 'Booking',
              icon: (
                <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              ),
              screen: 'booking' as const,
              bg: 'rgba(233,30,140,0.08)',
              color: '#E91E8C',
              border: 'rgba(233,30,140,0.20)',
            },
            {
              label: 'Antrian',
              icon: (
                <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 10h16M4 14h10M4 18h6" />
                </svg>
              ),
              screen: 'queue' as const,
              bg: 'rgba(6,182,212,0.08)',
              color: '#0891B2',
              border: 'rgba(6,182,212,0.20)',
            },
            {
              label: 'Darurat',
              icon: (
                <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.43 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.13 1.01.35 2 .66 2.96a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.96.31 1.95.53 2.96.66A2 2 0 0 1 22 16.92z" />
                </svg>
              ),
              screen: 'notifications' as const,
              bg: 'rgba(239,68,68,0.08)',
              color: '#DC2626',
              border: 'rgba(239,68,68,0.20)',
            },
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
              {a.icon}
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
          background: '#F8F9FB',
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
          background: '#F8F9FB',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '12px 16px 24px' }}>

          {/* ── Services Grid ── */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontWeight: 900, fontSize: 15, color: '#111827' }}>Layanan Kami</h2>
              <button
                onClick={() => setState({ screen: 'booking' })}
                style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                Lihat semua <ChevronRight size={13} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {SERVICES.map((svc, i) => (
                <motion.button
                  key={svc.id}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleServiceClick(svc)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <ServiceIconBezel
                    gradient={GRADIENTS[i % GRADIENTS.length]}
                    shadowColor={SHADOW_COLORS[i % SHADOW_COLORS.length]}
                  >
                    <DentalServiceIcon id={svc.id} />
                  </ServiceIconBezel>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    textAlign: 'center',
                    lineHeight: 1.3,
                    color: '#374151',
                    width: '100%',
                  }}>
                    {svc.name.length > 11 ? svc.name.slice(0, 10) + '…' : svc.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </section>

          {/* ── Doctors ── */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontWeight: 900, fontSize: 15, color: '#111827' }}>Dokter Rekomendasi</h2>
              <button
                onClick={() => setState({ screen: 'doctors' })}
                style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                Semua <ChevronRight size={13} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
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
                      borderRadius: 22,
                      padding: 14,
                      textAlign: 'left',
                      background: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Doctor avatar — elegant monogram in soft gradient circle */}
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 20,
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        background: GRADIENTS[i % GRADIENTS.length],
                        boxShadow: `0 4px 12px ${SHADOW_COLORS[i % SHADOW_COLORS.length]}30`,
                        flexShrink: 0,
                      }}
                    >
                      {doc.photo ? (
                        <img src={doc.photo} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{
                          color: 'white',
                          fontWeight: 900,
                          fontSize: 18,
                          letterSpacing: -0.5,
                          textShadow: '0 1px 4px rgba(0,0,0,0.2)',
                        }}>
                          {initials}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, color: '#1F2937', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {doc.name}
                    </p>
                    <p style={{ fontSize: 10, marginTop: 2, marginBottom: 10, lineHeight: 1.4, color: '#9CA3AF' }}>
                      {doc.specialty}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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

          {/* ── Promotions ── */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontWeight: 900, fontSize: 15, color: '#111827' }}>Promo Terkini</h2>
              <button
                onClick={() => setState({ screen: 'promos' })}
                style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                Semua <ChevronRight size={13} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
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
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    background: '#FFFFFF',
                  }}
                >
                  {/* Gradient header — UI element, fine with color */}
                  <div style={{ padding: '16px', position: 'relative', overflow: 'hidden', background: promo.color }}>
                    <div style={{
                      position: 'absolute', top: -20, right: -20,
                      width: 80, height: 80, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.12)',
                    }} />
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
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
                  {/* Content — white background, no dark bg */}
                  <div style={{ padding: '14px 16px', background: '#FFFFFF' }}>
                    <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {promo.description}
                    </p>
                    <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 6 }}>Berlaku s/d {promo.validUntil}</p>
                    <button
                      onClick={() => setState({ screen: 'booking' })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 700,
                        color: promo.color,
                        marginTop: 10,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      Klaim Sekarang <ChevronRight size={11} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Emergency card ── */}
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
              background: '#FFF8E7',
              border: '1px solid rgba(245,158,11,0.2)',
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
              background: 'rgba(245,158,11,0.15)',
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
                background: 'rgba(245,158,11,0.2)',
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
