/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, Star, ChevronRight, ArrowRight } from 'lucide-react';
import { DOCTORS, SERVICES, SAMPLE_APPOINTMENTS } from '../../../data/mockData';
import { Skeleton, SkeletonText } from '../../../components/ui/Skeleton';
import { haptic } from '../../../lib/haptics';
import { useNotifications } from '../../../context/NotificationContext';
import type { MobileState, Service } from '../../../types/index';

interface MobileHomeProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';
const DARK = '#0D1421';

const SERVICE_GRADIENTS = [
  'linear-gradient(135deg,#E91E8C,#FF6BB5)',
  'linear-gradient(135deg,#D4A017,#B8860B)',
  'linear-gradient(135deg,#FF6BB5,#E91E8C)',
  'linear-gradient(135deg,#D4A017,#B8860B)',
  'linear-gradient(135deg,#D4A017,#B8860B)',
  'linear-gradient(135deg,#EF4444,#DC2626)',
  'linear-gradient(135deg,#D4A017,#0369A1)',
  'linear-gradient(135deg,#EC4899,#DB2777)',
];
const SERVICE_SHADOW = [
  'rgba(233,30,140,0.30)', 'rgba(2,136,209,0.28)', 'rgba(124,58,237,0.28)', 'rgba(5,150,105,0.28)',
  'rgba(217,119,6,0.28)', 'rgba(220,38,38,0.28)', 'rgba(3,105,161,0.28)', 'rgba(219,39,119,0.28)',
];

function ServiceIcon({ id }: { id: string }) {
  const size = 22;
  const paths: Record<string, JSX.Element> = {
    s1: <><path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" /><path d="M9.5 9.5l2 2 3-3.5" /></>,
    s2: <><path d="M12 4c0 0-4 4.5-4 7.5a4 4 0 0 0 8 0C16 8.5 12 4 12 4z" /></>,
    s3: <><path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" /><rect x="9.5" y="7.5" width="5" height="4" rx="1" /></>,
    s4: <><path d="M8.5 8C6.6 8 5 9.5 5 11.3c0 1.4.6 2.6 1.3 3.8.7 1.3 1.2 2.5 1.2 4.3 0 .4.5.6 1.2.6h6.6c.7 0 1.2-.2 1.2-.6 0-1.8.5-3 1.2-4.3.7-1.2 1.3-2.4 1.3-3.8C19 9.5 17.4 8 15.5 8c-.9 0-1.8.3-2.4.9-.3.3-.7.4-1.1.4-.4 0-.8-.1-1.1-.4C10.3 8.3 9.4 8 8.5 8z" /><path d="M12 7V2M9.5 4.5L12 2l2.5 2.5" /></>,
    s5: <><path d="M4 14 Q4 8 7 8 Q10 8 10 12 Q10 8 12 8 Q14 8 14 12 Q14 8 17 8 Q20 8 20 14" /><path d="M4 14 Q12 17 20 14" /></>,
    s6: <><path d="M9.5 4h5l.5 2h-6l.5-2z" /><path d="M12 6v12" strokeWidth="2.4" /></>,
    s7: <><path d="M9 3C7.3 3 6 4.5 6 6.2c0 1.3.5 2.4 1 3.5.6 1.2 1 2.4 1 4.3v.5c0 .8.4 1.5 1 1.5h6c.6 0 1-.7 1-1.5v-.5c0-1.9.4-3.1 1-4.3.5-1.1 1-2.2 1-3.5C18 4.5 16.7 3 15 3c-.8 0-1.6.4-2.1.9-.3.3-.5.4-.9.4s-.6-.1-.9-.4C10.6 3.4 9.8 3 9 3z" /></>,
    s8: <><path d="M8.5 4C6.8 4 5.5 5.5 5.5 7.2c0 1.5.5 2.7 1.1 4 .7 1.4 1.1 2.8 1.1 4.8 0 .6.4 1 1 1h5.6c.6 0 1-.4 1-1 0-2 .4-3.4 1.1-4.8.6-1.3 1.1-2.5 1.1-4C17.5 5.5 16.2 4 14.5 4c-.8 0-1.6.3-2.1.9-.2.2-.4.3-.4.3s-.2-.1-.4-.3C11.1 4.3 10.3 4 9.3 4" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[id] ?? paths['s1']}
    </svg>
  );
}

/* Inline tooth graphic for the greeting card */
function ToothDecorSmall() {
  return (
    <svg width={54} height={62} viewBox="0 0 100 115" fill="none" aria-hidden>
      <path d="M50 8C35 8 23 20 23 35c0 9 3 16 7 24 4 8 6.5 16 6.5 27 0 3 2 5 4.5 5h18c2.5 0 4.5-2 4.5-5 0-11 2.5-19 6.5-27 4-8 7-15 7-24C77 20 65 8 50 8z"
        stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinejoin="round" fill="rgba(255,255,255,0.06)" />
      <line x1="44" y1="64" x2="41" y2="86" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
      <line x1="56" y1="64" x2="59" y2="86" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="66" x2="50" y2="90" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MobileHome({ state, setState }: MobileHomeProps) {
  const firstName = state.user?.name?.split(' ')[0] ?? 'Pengguna';
  const userPhoto = state.user?.photo;
  const appointment = SAMPLE_APPOINTMENTS[0];
  const { unreadCount } = useNotifications();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleServiceClick = (svc: Service) => {
    haptic('selection');
    setState({ screen: 'booking-doctor', selectedService: svc });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F2F4F8', overflow: 'hidden' }}
    >
      {/* 3px brand strip */}
      <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${GOLD})` }} />

      {/* ── HEADER ── */}
      <div style={{
        flexShrink: 0,
        background: 'white',
        boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, overflow: 'hidden',
          }}>
            {userPhoto ? (
              <img src={userPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: 'white', fontWeight: 900, fontSize: 15 }}>{firstName[0]}</span>
            )}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: DARK, lineHeight: 1, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Halo, {firstName}
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>Senyum Sehat Hari Ini</div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => { haptic('light'); setState({ screen: 'notifications' }); }}
          style={{
            position: 'relative', width: 38, height: 38, borderRadius: '50%',
            background: '#F8F9FC', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Bell size={20} color={DARK} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: 7, right: 7,
              width: 8, height: 8, borderRadius: '50%',
              background: '#EF4444', border: '1.5px solid white',
            }} />
          )}
        </motion.button>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
        {loading ? (
          <HomeSkeleton />
        ) : (
          <div style={{ padding: '14px 14px 90px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* ── GREETING / QUEUE HERO CARD ── */}
            <section>
              <div style={{
                borderRadius: 20, padding: '18px 20px',
                background: DARK,
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(13,20,33,0.20)',
              }}>
                {/* ambient glow */}
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -20, left: 30, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 10, fontWeight: 500 }}>
                      Apa yang bisa kami bantu hari ini?
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                      Sedang Dilayani
                    </div>
                    <div style={{
                      fontSize: 36, fontWeight: 900, lineHeight: 1, marginBottom: 12,
                      background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: -1,
                    }}>
                      {appointment?.queue ?? 'A-024'}
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      onClick={() => { haptic('light'); setState({ screen: 'queue' }); }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '8px 16px', borderRadius: 100,
                        background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                        border: 'none', cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(233,30,140,0.35)',
                      }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>Pantau Antrian</span>
                      <ArrowRight size={13} color="white" />
                    </motion.button>
                  </div>
                  <div style={{ flexShrink: 0, opacity: 0.8 }}>
                    <ToothDecorSmall />
                  </div>
                </div>

                {/* Stats row */}
                <div style={{
                  marginTop: 16, display: 'flex', gap: 0,
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: 12, overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative', zIndex: 2,
                }}>
                  {[
                    { v: '12', l: 'Menunggu' },
                    { v: '~8 mnt', l: 'Est. Waktu' },
                    { v: '4', l: 'Dokter Aktif' },
                  ].map((s, i) => (
                    <div key={s.l} style={{
                      flex: 1, padding: '10px 8px', textAlign: 'center',
                      borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    }}>
                      <div style={{ fontSize: 16, fontWeight: 900, color: 'white', lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2, fontWeight: 500 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── QUICK ACTIONS ── */}
            <section>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                  { label: 'Booking', screen: 'booking' as const, grad: `linear-gradient(135deg, ${PINK}, ${ROSE})`, shadow: 'rgba(233,30,140,0.30)',
                    icon: <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> },
                  { label: 'Antrian', screen: 'queue' as const, grad: `linear-gradient(135deg, ${GOLD}, #B8860B)`, shadow: 'rgba(6,182,212,0.30)',
                    icon: <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 10h16M4 14h10M4 18h6" /></svg> },
                  { label: 'Riwayat', screen: 'history' as const, grad: 'linear-gradient(135deg, #FF6BB5, #E91E8C)', shadow: 'rgba(124,58,237,0.28)',
                    icon: <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/></svg> },
                  { label: 'Loyalti', screen: 'loyalty' as const, grad: 'linear-gradient(135deg, #D4A017, #B8860B)', shadow: 'rgba(245,158,11,0.28)',
                    icon: <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
                ].map((action, i) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileTap={{ scale: 0.90 }}
                    onClick={() => { haptic('light'); setState({ screen: action.screen }); }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                    }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: 16,
                      background: action.grad,
                      boxShadow: `0 6px 16px ${action.shadow}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {action.icon}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: DARK }}>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* ── SERVICES ── */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: DARK, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Layanan Klinik</div>
                <button onClick={() => { haptic('light'); setState({ screen: 'booking' }); }}
                  style={{ fontSize: 12, fontWeight: 600, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
                  Lihat Semua <ChevronRight size={13} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {SERVICES.slice(0, 8).map((svc, i) => (
                  <motion.button
                    key={svc.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileTap={{ scale: 0.88 }}
                    onClick={() => handleServiceClick(svc)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                    }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: 16, padding: 3,
                      background: 'white',
                      boxShadow: `0 4px 12px ${SERVICE_SHADOW[i % 8]}`,
                    }}>
                      <div style={{
                        width: '100%', height: '100%', borderRadius: 12,
                        background: SERVICE_GRADIENTS[i % 8],
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <ServiceIcon id={svc.id} />
                      </div>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 500, textAlign: 'center',
                      lineHeight: 1.3, color: '#374151', width: '100%',
                    }}>
                      {svc.name.length > 11 ? svc.name.slice(0, 10) + '…' : svc.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* ── PROMO BANNER (CSS only, no external image) ── */}
            <section>
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => { haptic('light'); setState({ screen: 'booking' }); }}
                style={{
                  borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                  background: `linear-gradient(135deg, ${DARK} 0%, #1a2535 60%, #0D2A3A 100%)`,
                  padding: '20px 20px',
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(13,20,33,0.18)',
                  minHeight: 110,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                {/* Glow accents */}
                <div style={{ position: 'absolute', top: -20, right: 60, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -20, right: 20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    display: 'inline-flex', fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.14em', color: PINK, background: 'rgba(233,30,140,0.15)',
                    border: '1px solid rgba(233,30,140,0.25)', padding: '3px 10px', borderRadius: 100, marginBottom: 10,
                  }}>
                    Promo Bulan Ini
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: 8, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Diskon 30%<br />
                    <span style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      Scaling & Bleaching
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Berlaku s/d 30 Juni 2026</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                    padding: '8px 18px', borderRadius: 100,
                    boxShadow: '0 4px 14px rgba(233,30,140,0.35)',
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>Klaim Sekarang</span>
                    <ArrowRight size={13} color="white" />
                  </div>
                </div>

                {/* Large tooth decoration right */}
                <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.12, pointerEvents: 'none' }}>
                  <svg width={80} height={92} viewBox="0 0 100 115" fill="none">
                    <path d="M50 8C35 8 23 20 23 35c0 9 3 16 7 24 4 8 6.5 16 6.5 27 0 3 2 5 4.5 5h18c2.5 0 4.5-2 4.5-5 0-11 2.5-19 6.5-27 4-8 7-15 7-24C77 20 65 8 50 8z"
                      fill="white" />
                  </svg>
                </div>
              </motion.div>
            </section>

            {/* ── DOCTORS ── */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: DARK, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Dokter Pilihan</div>
                <button onClick={() => { haptic('light'); setState({ screen: 'doctors' }); }}
                  style={{ fontSize: 12, fontWeight: 600, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  Lihat Semua
                </button>
              </div>
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', margin: '0 -2px', padding: '0 2px 4px' }}>
                {DOCTORS.slice(0, 5).map((doc, i) => {
                  const gradients = [`linear-gradient(135deg, ${PINK}, ${ROSE})`, `linear-gradient(135deg, ${GOLD}, #B8860B)`, 'linear-gradient(135deg, #FF6BB5, #E91E8C)', `linear-gradient(135deg, #D4A017, #B8860B)`, 'linear-gradient(135deg, #D4A017, #B8860B)'];
                  const initials = doc.name.replace('drg. ', '').slice(0, 2).toUpperCase();
                  return (
                    <motion.button
                      key={doc.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => { haptic('selection'); setState({ screen: 'booking-doctor', selectedDoctor: doc }); }}
                      style={{
                        flexShrink: 0, width: 140, borderRadius: 18, padding: '14px 12px',
                        textAlign: 'center', background: 'white',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)',
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      }}
                    >
                      <div style={{
                        width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                        background: gradients[i % gradients.length],
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {doc.photo ? (
                          <img src={doc.photo} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ color: 'white', fontWeight: 900, fontSize: 20 }}>{initials}</span>
                        )}
                      </div>
                      <div style={{ width: '100%' }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: DARK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>
                          {doc.name}
                        </div>
                        <div style={{ fontSize: 10, color: '#6B7280', marginBottom: 8 }}>{doc.specialty}</div>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: 3,
                          fontSize: 11, fontWeight: 700, color: '#D4A017',
                          background: '#FFFBEB', padding: '3px 8px', borderRadius: 8,
                        }}>
                          <Star size={11} fill="#D4A017" color="#D4A017" />
                          {doc.rating}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>

          </div>
        )}
      </div>
    </motion.div>
  );
}

function HomeSkeleton() {
  return (
    <div style={{ padding: '14px 14px 90px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Skeleton width="100%" height={140} radius={20} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Skeleton width={52} height={52} radius={16} />
            <SkeletonText width={40} height={9} />
          </div>
        ))}
      </div>
      <div>
        <SkeletonText width={120} height={14} style={{ marginBottom: 12 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[0,1,2,3,4,5,6,7].map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Skeleton width={52} height={52} radius={16} />
              <SkeletonText width={40} height={9} />
            </div>
          ))}
        </div>
      </div>
      <Skeleton width="100%" height={110} radius={20} />
      <div>
        <SkeletonText width={120} height={14} style={{ marginBottom: 12 }} />
        <div style={{ display: 'flex', gap: 12, overflow: 'hidden' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ flexShrink: 0, width: 140, borderRadius: 18, padding: 14, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Skeleton width={56} height={56} radius={28} />
              <SkeletonText width={90} height={11} />
              <SkeletonText width={70} height={9} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
