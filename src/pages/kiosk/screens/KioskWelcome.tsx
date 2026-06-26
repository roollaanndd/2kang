import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CURRENT_QUEUE } from '../../../data/mockData';
import { kioskSound } from '../../../lib/kioskSound';
import type { KioskScreenProps } from '../KioskLayout';
import { useIsPortrait } from '../../../context/KioskOrientationContext';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const DARK = '#0D1421';


function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div style={{
        fontSize: 52, fontWeight: 900, color: PINK, lineHeight: 1,
        fontVariantNumeric: 'tabular-nums', letterSpacing: -2,
        fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
      }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginTop: 4 }}>
        {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
  );
}

const STATS = [
  { icon: '👥', v: '10.000+', l: 'Pasien Puas' },
  { icon: '🦷', v: '8', l: 'Dokter Spesialis' },
  { icon: '📅', v: 'Senin–Sabtu', l: 'Buka Setiap Hari' },
];

export function KioskWelcome({ goTo, setState }: KioskScreenProps) {
  const portrait = useIsPortrait();
  const [lang, setLang] = useState<'id' | 'en'>('id');

  const handleCheckin = () => {
    kioskSound('tap');
    setState(prev => ({ ...prev, language: lang }));
    goTo('language');
  };

  const handleQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    kioskSound('select');
    goTo('queue-display');
  };

  const handleOmdc = (e: React.MouseEvent) => {
    e.stopPropagation();
    kioskSound('select');
    setState(prev => ({ ...prev, language: lang }));
    goTo('omdc-recall');
  };

  const LABEL = {
    id: { welcome: '— SELAMAT DATANG —', title: 'Selamat\nDatang!', sub: 'Klinik Gigi Keluarga Terpercaya', checkin: 'MULAI CHECK-IN', scanOmdc: 'SCAN KODE OMDC', cekAntrian: 'Cek Antrian', hint: 'Ketuk layar untuk memulai', nowServing: 'Antrian Saat Ini' },
    en: { welcome: '— WELCOME —', title: 'Welcome!', sub: 'Your Trusted Family Dental Clinic', checkin: 'START CHECK-IN', scanOmdc: 'SCAN OMDC CODE', cekAntrian: 'Check Queue', hint: 'Tap screen to start', nowServing: 'Now Serving' },
  }[lang];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: portrait ? 'column' : 'row',
        position: 'relative', overflow: 'hidden',
        background: '#FFF8F4',
      }}
    >
      {/* 3px brand strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 30,
      }} />

      {/* ── LEFT PANEL: Pink gradient ── */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: portrait ? '100%' : '42%', flexShrink: 0,
          height: portrait ? '40%' : '100%',
          background: `linear-gradient(160deg, ${PINK} 0%, ${ROSE} 65%, #ffd8e6 100%)`,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: portrait ? '32px 24px 24px' : '52px 40px 40px',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Ambient glow spots */}
        <div style={{ position: 'absolute', top: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 2 }}>
          <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
            <rect width={36} height={36} rx={10} fill="rgba(255,255,255,0.22)" />
            <path d="M12 10C10 10 8.5 11.8 8.5 14c0 2 .7 3.7 1.5 5.5.8 1.7 1.3 3.4 1.3 5.8 0 .4.3.7.7.7h8c.4 0 .7-.3.7-.7 0-2.4.5-4.1 1.3-5.8C22.8 17.7 23.5 16 23.5 14 23.5 11.8 22 10 20 10c-.9 0-1.8.4-2.3 1-.3.3-.5.4-.7.4s-.4-.1-.7-.4C15.8 10.4 14.9 10 14 10z"
              fill="white" opacity={0.9} />
            <path d="M16 16.5l1.5 1.5 2.5-3" stroke="rgba(233,30,140,0.8)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'white', lineHeight: 1, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>OMDC</div>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.12em' }}>DENTAL</div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.70)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>
            {LABEL.welcome}
          </div>
          <h1 style={{
            fontSize: portrait ? 42 : 64, fontWeight: 900, lineHeight: 1.05,
            color: 'white', fontFamily: 'Plus Jakarta Sans, sans-serif',
            letterSpacing: -2, margin: 0, whiteSpace: 'pre-line',
          }}>
            {LABEL.title}
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.80)', fontWeight: 500, marginTop: 10 }}>
            {LABEL.sub}
          </p>
        </div>

        {/* Stat chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 2 }}>
          {STATS.map(s => (
            <div key={s.v} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.30)',
              borderRadius: 16, padding: '13px 16px',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.80)', fontWeight: 500, marginTop: 2 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Language toggle (bottom) */}
        <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 2 }}>
          {(['id', 'en'] as const).map(l => (
            <button
              key={l}
              onClick={e => { e.stopPropagation(); kioskSound('tap'); setLang(l); }}
              style={{
                padding: '8px 22px', borderRadius: 100, fontSize: 13, fontWeight: 700,
                background: lang === l ? 'white' : 'rgba(255,255,255,0.18)',
                color: lang === l ? PINK : 'white',
                border: lang === l ? 'none' : '1px solid rgba(255,255,255,0.30)',
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em',
                transition: 'all 0.18s',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── RIGHT PANEL: Cream editorial ── */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleCheckin}
        style={{
          flex: 1, height: '100%', cursor: 'pointer',
          background: '#FFF8F4',
          display: 'flex', flexDirection: 'column', gap: portrait ? 16 : 20,
          padding: portrait ? '24px 24px 24px' : '48px 48px 36px',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Subtle tooth pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='70' viewBox='0 0 60 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C22 5 16 12 16 21c0 6 2 10 5 16 3 5 4 10 4 16 0 2 1.5 3 3 3h4c1.5 0 3-1 3-3 0-6 1-11 4-16 3-6 5-10 5-16C44 12 38 5 30 5z' fill='%23E91E8C'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 70px',
        }} />

        {/* Top row: clock + queue chip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          <LiveClock />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(233,30,140,0.08)',
            border: `1px solid rgba(233,30,140,0.18)`,
            borderRadius: 20, padding: '8px 16px',
          }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: PINK, display: 'block', flexShrink: 0 }}
            />
            <span style={{ fontSize: 14, fontWeight: 700, color: PINK }}>
              {LABEL.nowServing}: {CURRENT_QUEUE}
            </span>
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 2 }}>
          {/* Pulse rings behind primary button */}
          <div style={{ position: 'relative' }}>
            {[1, 2].map(n => (
              <motion.div
                key={n}
                animate={{ scale: [1, 1.05 + n * 0.03, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: n * 0.6 }}
                style={{
                  position: 'absolute', inset: -(n * 8), borderRadius: 24,
                  border: `1.5px solid rgba(233,30,140,${n === 1 ? '0.30' : '0.15'})`,
                  pointerEvents: 'none',
                }}
              />
            ))}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckin}
              style={{
                width: '100%', height: 88,
                background: `linear-gradient(135deg, ${PINK} 0%, ${ROSE} 100%)`,
                border: 'none', borderRadius: 22, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
                boxShadow: '0 10px 32px rgba(233,30,140,0.40), 0 2px 8px rgba(233,30,140,0.20)',
                position: 'relative', zIndex: 1,
              }}
            >
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s-8-3-8-10V5l8-3 8 3v7c0 7-8 10-8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span style={{ fontSize: 26, fontWeight: 800, color: 'white', letterSpacing: 0.5, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {LABEL.checkin}
              </span>
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleOmdc}
            style={{
              width: '100%', height: 76,
              background: 'white', border: `2.5px solid ${AQUA}`,
              borderRadius: 20, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              boxShadow: '0 4px 14px rgba(6,182,212,0.18)',
            }}
          >
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={AQUA} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 8v8M10 8v8M13 8v8M17 8v8" />
            </svg>
            <span style={{ fontSize: 21, fontWeight: 800, color: AQUA, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: 0.4 }}>
              {LABEL.scanOmdc}
            </span>
          </motion.button>
        </div>

        {/* Feature highlights — 3 large actionable tiles */}
        <div style={{ position: 'relative', zIndex: 2, flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
            {[
              { icon: '📋', label: lang === 'id' ? 'Cek Status Antrian' : 'Check Queue Status', sub: lang === 'id' ? 'Lihat posisi antrean Anda' : 'View your queue position', action: handleQueue, accent: AQUA },
              { icon: '🦷', label: lang === 'id' ? '8 Layanan Unggulan' : '8 Premium Services', sub: lang === 'id' ? 'Dokter spesialis berpengalaman' : 'Experienced specialist doctors', action: handleCheckin, accent: ROSE },
            ].map((item, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                onClick={item.action}
                style={{
                  flex: 1,
                  background: 'white', border: `1.5px solid rgba(0,0,0,0.06)`,
                  borderRadius: 18, cursor: 'pointer', padding: '0 20px',
                  display: 'flex', flexDirection: 'row', alignItems: 'center',
                  gap: 14, boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: `linear-gradient(135deg, ${item.accent}, ${item.accent}bb)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: DARK, lineHeight: 1.2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
                    {item.sub}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', color: item.accent, fontSize: 20 }}>›</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Hint text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            position: 'relative', zIndex: 2,
          }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="2" strokeLinecap="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: PINK }}>{LABEL.hint}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
