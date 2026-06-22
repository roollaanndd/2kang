/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Bell, ChevronRight, Star, Clock, Calendar, Phone, ArrowRight,
} from 'lucide-react';
import { DOCTORS, SERVICES, PROMOTIONS, SAMPLE_APPOINTMENTS } from '../../../data/mockData';
import { Skeleton, SkeletonText, SkeletonCircle } from '../../../components/ui/Skeleton';
import { haptic } from '../../../lib/haptics';
import { useNotifications } from '../../../context/NotificationContext';
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
  '#E91E8C', '#0288D1', '#7C3AED', '#059669',
  '#D97706', '#DC2626', '#DB2777', '#0D9488',
];

// ── DENTAL SERVICE ICONS ──────────────────────────────────────────────────────
function DentalServiceIcon({ id }: { id: string }) {
  const size = 22;
  switch (id) {
    case 's1':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
          <path d="M9.5 9.5l2 2 3-3.5" />
        </svg>
      );
    case 's2':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4c0 0-4 4.5-4 7.5a4 4 0 0 0 8 0C16 8.5 12 4 12 4z" />
          <path d="M5 6l1 1M6 5l-1 1M5.5 5.5h1" />
          <path d="M18 8l1 1M19 7l-1 1M18.5 7.5h1" />
        </svg>
      );
    case 's3':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
          <rect x="9.5" y="7.5" width="5" height="4" rx="1" strokeWidth="1.8" />
        </svg>
      );
    case 's4':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 8C6.6 8 5 9.5 5 11.3c0 1.4.6 2.6 1.3 3.8.7 1.3 1.2 2.5 1.2 4.3 0 .4.5.6 1.2.6h6.6c.7 0 1.2-.2 1.2-.6 0-1.8.5-3 1.2-4.3.7-1.2 1.3-2.4 1.3-3.8C19 9.5 17.4 8 15.5 8c-.9 0-1.8.3-2.4.9-.3.3-.7.4-1.1.4-.4 0-.8-.1-1.1-.4C10.3 8.3 9.4 8 8.5 8z" />
          <path d="M12 7V2M9.5 4.5L12 2l2.5 2.5" />
        </svg>
      );
    case 's5':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14 Q4 8 7 8 Q10 8 10 12 Q10 8 12 8 Q14 8 14 12 Q14 8 17 8 Q20 8 20 14" />
          <path d="M4 14 Q12 17 20 14" />
          <path d="M5.5 11 H18.5" strokeWidth="1.2" />
          <rect x="8.5" y="9.8" width="2.2" height="2.2" rx="0.4" strokeWidth="1.4" />
          <rect x="13.3" y="9.8" width="2.2" height="2.2" rx="0.4" strokeWidth="1.4" />
        </svg>
      );
    case 's6':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 4h5l.5 2h-6l.5-2z" />
          <path d="M9.5 4C9 3 8 2 8 2h8s-1 1-1.5 2" />
          <rect x="10.5" y="6" width="3" height="2" rx="0.5" />
          <path d="M12 8v10" strokeWidth="2.4" />
          <path d="M10.5 10 H13.5 M10 12 H14 M10.5 14 H13.5 M11 16 H13" strokeWidth="1" />
          <path d="M7 15 Q12 13 17 15" strokeWidth="1.4" />
        </svg>
      );
    case 's7':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3C7.3 3 6 4.5 6 6.2c0 1.3.5 2.4 1 3.5.6 1.2 1 2.4 1 4.3v.5c0 .8.4 1.5 1 1.5h6c.6 0 1-.7 1-1.5v-.5c0-1.9.4-3.1 1-4.3.5-1.1 1-2.2 1-3.5C18 4.5 16.7 3 15 3c-.8 0-1.6.4-2.1.9-.3.3-.5.4-.9.4s-.6-.1-.9-.4C10.6 3.4 9.8 3 9 3z" />
          <path d="M10 15 Q9.5 18 9 21" />
          <path d="M14 15 Q14.5 18 15 21" />
          <path d="M12 15 V20" />
        </svg>
      );
    case 's8':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 4C6.8 4 5.5 5.5 5.5 7.2c0 1.5.5 2.7 1.1 4 .7 1.4 1.1 2.8 1.1 4.8 0 .6.4 1 1 1h5.6c.6 0 1-.4 1-1 0-2 .4-3.4 1.1-4.8.6-1.3 1.1-2.5 1.1-4C17.5 5.5 16.2 4 14.5 4c-.8 0-1.6.3-2.1.9-.2.2-.4.3-.4.3s-.2-.1-.4-.3C11.1 4.3 10.3 4 9.3 4" />
          <path d="M18 4 l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4z" />
          <path d="M16 8 l.3.7.7.3-.7.3-.3.7-.3-.7-.7-.3.7-.3z" />
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

function ServiceIconBezel({ gradient, shadowColor, children }: {
  gradient: string; shadowColor: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: 18, padding: 3,
      background: 'white', boxShadow: `0 6px 16px ${shadowColor}35`,
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 14,
        background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {children}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export function MobileHome({ state, setState }: MobileHomeProps) {
  const firstName = state.user?.name?.split(' ')[0] ?? 'Pengguna';
  const userPhoto = state.user?.photo;
  const appointment = SAMPLE_APPOINTMENTS[0];
  const { unreadCount } = useNotifications();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
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
      style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF5F9', overflow: 'hidden' }}
    >
      {/* 3px gradient strip */}
      <div style={{ height: 3, flexShrink: 0, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div style={{
        flexShrink: 0, background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(252,231,243,0.8)',
        boxShadow: '0 1px 8px rgba(233,30,140,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#FCE7F3', overflow: 'hidden', flexShrink: 0,
            border: '1.5px solid rgba(233,30,140,0.15)',
          }}>
            {userPhoto ? (
              <img src={userPhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: PINK }}>
                {firstName[0]}
              </div>
            )}
          </div>
          <div>
            <h1 style={{ fontSize: 17, fontWeight: 900, color: '#0D1421', letterSpacing: -0.3, lineHeight: 1 }}>
              Halo, {firstName}
            </h1>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Senyum Sehat Hari Ini!</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => { haptic('light'); setState({ screen: 'notifications' }); }}
          style={{
            position: 'relative', width: 40, height: 40, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: PINK,
          }}
        >
          <Bell size={22} color={PINK} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: 6, right: 6,
              width: 8, height: 8, borderRadius: '50%',
              background: '#EF4444', border: '1.5px solid white',
            }} />
          )}
        </motion.button>
      </div>

      {/* ── SCROLLABLE CONTENT ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
        {loading ? (
          <HomeContentSkeleton />
        ) : (
          <div style={{ padding: '16px 16px 100px', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* ── Hero Queue Card ── */}
            <section>
              <div style={{
                borderRadius: 20,
                padding: '20px 20px',
                background: '#fdf2f8',
                backgroundImage: 'radial-gradient(at 0% 0%, rgba(233,30,140,0.08) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(6,182,212,0.08) 0px, transparent 50%)',
                border: '1px solid rgba(252,231,243,0.8)',
                boxShadow: '0 4px 20px rgba(233,30,140,0.08)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#6B7280', marginBottom: 4 }}>
                      Status Antrian Klinik
                    </p>
                    <h2 style={{ fontSize: 32, fontWeight: 900, color: PINK, marginBottom: 10, lineHeight: 1 }}>
                      {appointment?.queue ?? 'A-024'}
                    </h2>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)',
                      padding: '6px 12px', borderRadius: 999,
                      border: '1px solid rgba(252,231,243,0.8)',
                    }}>
                      <Clock size={14} color={AQUA} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#0D1421' }}>Est. 15 menit lagi</span>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.93 }}
                    onClick={() => { haptic('light'); setState({ screen: 'queue' }); }}
                    style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'white', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" />
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </section>

            {/* ── Quick Actions ── */}
            <section>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  { label: 'Booking', screen: 'booking' as const, color: PINK, bg: 'rgba(233,30,140,0.08)', icon: <Calendar size={24} color={PINK} /> },
                  { label: 'Antrian', screen: 'queue' as const, color: AQUA, bg: 'rgba(6,182,212,0.08)', icon: (
                    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke={AQUA} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 6h16M4 10h16M4 14h10M4 18h6" />
                    </svg>
                  )},
                  { label: 'Riwayat', screen: 'history' as const, color: ROSE, bg: 'rgba(255,107,181,0.1)', icon: (
                    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke={ROSE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
                    </svg>
                  )},
                  { label: 'Loyalti', screen: 'loyalty' as const, color: PINK, bg: 'rgba(233,30,140,0.08)', hasBadge: true, icon: (
                    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )},
                ].map((action) => (
                  <motion.button
                    key={action.label}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => { haptic('light'); setState({ screen: action.screen }); }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                    }}
                  >
                    <div style={{
                      width: 56, height: 56, borderRadius: 18,
                      background: 'white', border: '1px solid rgba(252,231,243,0.8)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                    }}>
                      {action.hasBadge && (
                        <span style={{
                          position: 'absolute', top: -3, right: -3,
                          width: 10, height: 10, borderRadius: '50%',
                          background: '#EF4444', border: '2px solid white',
                        }} />
                      )}
                      {action.icon}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#0D1421' }}>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* ── Services Grid ── */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h2 style={{ fontWeight: 800, fontSize: 16, color: '#0D1421' }}>Layanan Klinik</h2>
                <button
                  onClick={() => { haptic('light'); setState({ screen: 'booking' }); }}
                  style={{ fontSize: 12, fontWeight: 600, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  Lihat Semua <ChevronRight size={13} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {SERVICES.map((svc, i) => (
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
                      width: 52, height: 52, borderRadius: 18,
                      background: 'linear-gradient(135deg, #fdf2f8 0%, #FFF5F9 100%)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(252,231,243,0.6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <DentalServiceIconPink id={svc.id} />
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 500, textAlign: 'center',
                      lineHeight: 1.3, color: '#6B7280', width: '100%',
                    }}>
                      {svc.name.length > 11 ? svc.name.slice(0, 10) + '…' : svc.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* ── Doctors Carousel ── */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h2 style={{ fontWeight: 800, fontSize: 16, color: '#0D1421' }}>Dokter Pilihan</h2>
                <button
                  onClick={() => { haptic('light'); setState({ screen: 'doctors' }); }}
                  style={{ fontSize: 12, fontWeight: 600, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  Lihat Semua
                </button>
              </div>
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', margin: '0 -4px', padding: '0 4px 4px' }}>
                {DOCTORS.map((doc, i) => {
                  const initials = doc.name.replace('drg. ', '').slice(0, 2).toUpperCase();
                  return (
                    <motion.button
                      key={doc.id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => { haptic('selection'); setState({ screen: 'booking-doctor', selectedDoctor: doc }); }}
                      style={{
                        flexShrink: 0, width: 200, borderRadius: 20, padding: 12,
                        textAlign: 'left', background: 'white',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(252,231,243,0.8)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{
                        aspectRatio: '1/1', borderRadius: 14, overflow: 'hidden',
                        background: i % 2 === 0 ? '#ECFEFF' : '#FDF2F8', marginBottom: 12,
                      }}>
                        {doc.photo ? (
                          <img src={doc.photo} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{
                            width: '100%', height: '100%',
                            background: GRADIENTS[i % GRADIENTS.length],
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <span style={{ color: 'white', fontWeight: 900, fontSize: 26 }}>{initials}</span>
                          </div>
                        )}
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: 13, color: '#0D1421', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>
                        {doc.name}
                      </h4>
                      <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 10 }}>{doc.specialty}</p>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 11, fontWeight: 600, color: '#F59E0B',
                        background: '#FFFBEB', padding: '3px 8px', borderRadius: 8,
                      }}>
                        <Star size={12} fill="#F59E0B" color="#F59E0B" />
                        {doc.rating}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* ── Promo Banner ── */}
            <section>
              <div style={{
                position: 'relative', width: '100%', height: 160,
                borderRadius: 20, overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(233,30,140,0.08)', cursor: 'pointer',
              }}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiAZWeaemjeIqljeLaOnJLKaJ3hkQudHh5CDDXTMJMIcWmcFsOFE6kBEkoGfUiE0rMHR9JSIKHBHILKw0iG31s4ns1gwZexFepetKHgzjXEBbhW8f8xbCjONyN-RFI2Md5AJI2Tu3_-hfF1jV2jwbB9oykpp4Nkt4xxRBKxl_1OUp4iJ65wc0hvqtLg8iTvyT-S4vS00SqstLpevkrH5HJ_K7B5ij0p4PTFtg7Bf8EjuuxPyBOXmj9TinX6_vMF_yPFLfPDWoGiJs"
                  alt="Clinic Promo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, rgba(233,30,140,0.90) 0%, rgba(233,30,140,0.65) 50%, transparent 100%)',
                }} />
                <div style={{ position: 'absolute', inset: 0, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '65%' }}>
                  <span style={{
                    display: 'inline-flex', fontSize: 9, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    color: 'white', background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)', padding: '3px 8px', borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.3)', marginBottom: 8, width: 'fit-content',
                  }}>
                    Promo Spesial
                  </span>
                  <h3 style={{ fontWeight: 900, fontSize: 18, color: 'white', lineHeight: 1.25, marginBottom: 8 }}>
                    Diskon 25%<br />Spesialis Ortho
                  </h3>
                  <button
                    onClick={() => { haptic('light'); setState({ screen: 'booking' }); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.9)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    }}
                  >
                    Klaim sekarang <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}
      </div>
    </motion.div>
  );
}

// Pink icon variant for the service grid (uses pink stroke, not white)
function DentalServiceIconPink({ id }: { id: string }) {
  const size = 22;
  switch (id) {
    case 's1':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={PINK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
          <path d="M9.5 9.5l2 2 3-3.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={PINK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
        </svg>
      );
  }
}

// ── Skeleton placeholder ──────────────────────────────────────────
function HomeContentSkeleton() {
  return (
    <div style={{ padding: '16px 16px 100px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Skeleton width="100%" height={100} radius={20} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Skeleton width={56} height={56} radius={18} />
            <SkeletonText width={44} height={9} />
          </div>
        ))}
      </div>
      <section>
        <SkeletonText width={120} height={15} style={{ marginBottom: 14 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Skeleton width={52} height={52} radius={18} />
              <SkeletonText width={44} height={9} />
            </div>
          ))}
        </div>
      </section>
      <section>
        <SkeletonText width={150} height={15} style={{ marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 12, overflow: 'hidden' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ flexShrink: 0, width: 200, borderRadius: 20, padding: 12, background: 'white' }}>
              <Skeleton width="100%" height={160} radius={14} style={{ marginBottom: 10 }} />
              <SkeletonText width="80%" height={12} style={{ marginBottom: 6 }} />
              <SkeletonText width="60%" height={10} />
            </div>
          ))}
        </div>
      </section>
      <Skeleton width="100%" height={160} radius={20} />
    </div>
  );
}
