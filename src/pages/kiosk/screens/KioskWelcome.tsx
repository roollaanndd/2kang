import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CURRENT_QUEUE } from '../../../data/mockData';
import { kioskSound } from '../../../lib/kioskSound';
import type { KioskScreenProps } from '../KioskLayout';
import { useIsPortrait } from '../../../context/KioskOrientationContext';
import { useCMS } from '../../../context/CMSContext';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const DARK = '#0D1421';
const FONT = "'Nunito Sans', 'Plus Jakarta Sans', sans-serif";

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div style={{
        fontSize: 46, fontWeight: 900, color: PINK, lineHeight: 1,
        fontVariantNumeric: 'tabular-nums', letterSpacing: -2, fontFamily: FONT,
      }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 600, marginTop: 4, fontFamily: FONT }}>
        {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
  );
}

/** 2.5D clay-style tooth mascot — puffy white tooth with thick outline, friendly face */
function ClayToothMascot({ size = 260 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.12)} viewBox="0 0 240 268" fill="none" aria-hidden>
      {/* Ambient sparkles */}
      <text x="16" y="52" fontSize="22" fill={PINK} opacity="0.7">✦</text>
      <text x="200" y="36" fontSize="15" fill={AQUA} opacity="0.75">✦</text>
      <text x="208" y="110" fontSize="20" fill={ROSE} opacity="0.60">✦</text>
      <text x="22" y="148" fontSize="13" fill={AQUA} opacity="0.55">✦</text>

      {/* Cast shadow */}
      <ellipse cx="120" cy="258" rx="72" ry="10" fill="rgba(233,30,140,0.12)" />

      {/* White coat body behind tooth */}
      <rect x="72" y="148" width="96" height="90" rx="16"
        fill="white" stroke="#E5E7EB" strokeWidth="3" />
      {/* Coat collar V */}
      <path d="M100 148 L120 172 L140 148" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Pocket */}
      <rect x="92" y="190" width="22" height="18" rx="5" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />

      {/* Stethoscope */}
      <path d="M96 200 Q88 218 100 224 Q112 230 112 218" stroke={AQUA} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="226" r="6" fill={AQUA} stroke="white" strokeWidth="2" />

      {/* Tooth body — puffy, inflated */}
      <path d="M120 18 C86 18, 58 46, 58 78 C58 104 67 124 78 148 C88 170 95 188 95 210 L145 210 C145 188 152 170 162 148 C173 124 182 104 182 78 C182 46 154 18 120 18 Z"
        fill="white" stroke={DARK} strokeWidth="4.5" strokeLinejoin="round" />

      {/* Inner highlight — light catching the puffy top */}
      <path d="M90 34 Q80 54 78 76" stroke="rgba(255,255,255,0.85)" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M94 28 Q88 38 86 50" stroke="rgba(255,255,255,0.50)" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Cheek blush */}
      <ellipse cx="86" cy="112" rx="12" ry="8" fill="rgba(233,30,140,0.15)" />
      <ellipse cx="154" cy="112" rx="12" ry="8" fill="rgba(233,30,140,0.15)" />

      {/* Eyes */}
      <circle cx="104" cy="88" r="13" fill={DARK} />
      <circle cx="136" cy="88" r="13" fill={DARK} />
      {/* Pupils highlight */}
      <circle cx="108" cy="84" r="5" fill="white" />
      <circle cx="140" cy="84" r="5" fill="white" />

      {/* Smile */}
      <path d="M100 118 Q120 138 140 118" stroke={DARK} strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Tiny dental mirror in right hand */}
      <line x1="168" y1="170" x2="190" y2="150" stroke={DARK} strokeWidth="3" strokeLinecap="round" />
      <circle cx="192" cy="148" r="8" fill="white" stroke={DARK} strokeWidth="2.5" />
      <circle cx="192" cy="148" r="4" fill="rgba(6,182,212,0.3)" />

      {/* OMDC badge on coat pocket area */}
      <rect x="145" y="185" width="40" height="22" rx="8" fill={PINK} />
      <text x="165" y="200" fontSize="9" fontWeight="800" fill="white" textAnchor="middle" fontFamily="Nunito Sans, sans-serif">OMDC</text>
    </svg>
  );
}

const STATS = [
  { icon: '👥', v: '10.000+', l: 'Pasien Puas', color: PINK },
  { icon: '🦷', v: '8', l: 'Dokter Spesialis', color: ROSE },
  { icon: '📅', v: 'Senin–Sabtu', l: 'Buka Setiap Hari', color: AQUA },
];

export function KioskWelcome({ goTo, setState }: KioskScreenProps) {
  const portrait = useIsPortrait();
  const { cms } = useCMS();
  const bookingCodeCheckin = cms.kioskSettings?.bookingCodeCheckin ?? true;
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
    id: {
      title: 'Selamat\nDatang!', sub: 'Klinik Gigi Keluarga Terpercaya',
      checkin: 'MULAI CHECK-IN', scanOmdc: 'KODE BOOKING / SCAN',
      hint: 'Ketuk tombol untuk memulai', nowServing: 'Antrian Saat Ini',
    },
    en: {
      title: 'Welcome!', sub: 'Your Trusted Family Dental Clinic',
      checkin: 'START CHECK-IN', scanOmdc: 'BOOKING CODE / SCAN',
      hint: 'Tap a button to start', nowServing: 'Now Serving',
    },
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
        background: '#FFF5F9',
        fontFamily: FONT,
      }}
    >
      {/* 4px brand strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 30,
      }} />

      {/* Floating pastel circles — depth decoration */}
      <div style={{ position: 'absolute', top: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(233,30,140,0.05)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: -100, right: -60, width: 380, height: 380, borderRadius: '50%', background: 'rgba(6,182,212,0.05)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '35%', left: '42%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,107,181,0.04)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── LEFT PANEL: Clay illustration ── */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: portrait ? '100%' : '42%', flexShrink: 0,
          height: portrait ? '40%' : '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: portrait ? '32px 24px 20px' : '48px 36px 36px',
          position: 'relative', zIndex: 1,
        }}
      >
        {/* Logo clay badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: 'white',
            border: `3px solid rgba(233,30,140,0.18)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 12px rgba(233,30,140,0.15)',
          }}>
            <svg width={28} height={32} viewBox="0 0 100 115" fill="none">
              <path d="M50 8C35 8 23 20 23 35c0 9 3 16 7 24 4 8 6.5 16 6.5 27 0 3 2 5 4.5 5h18c2.5 0 4.5-2 4.5-5 0-11 2.5-19 6.5-27 4-8 7-15 7-24C77 20 65 8 50 8z"
                fill={PINK} />
              <path d="M43 54l5 5 9-11" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: DARK, lineHeight: 1, fontFamily: FONT }}>OMDC</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: ROSE, letterSpacing: '0.15em', textTransform: 'uppercase' }}>DENTAL</div>
          </div>
        </div>

        {/* Clay tooth mascot — center of left panel */}
        {!portrait && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ClayToothMascot size={230} />
            </motion.div>
          </div>
        )}

        {/* Clay stat pills */}
        <div style={{ display: 'flex', flexDirection: portrait ? 'row' : 'column', gap: 10, flexWrap: 'wrap' }}>
          {STATS.map(s => (
            <div key={s.v} className="clay-pill" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 18px', flex: portrait ? '1' : undefined,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: `${s.color}18`,
                border: `2px solid ${s.color}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: portrait ? 15 : 17, fontWeight: 900, color: DARK, lineHeight: 1, fontFamily: FONT }}>{s.v}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, marginTop: 2 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Language toggle */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {(['id', 'en'] as const).map(l => (
            <button
              key={l}
              onClick={e => { e.stopPropagation(); kioskSound('tap'); setLang(l); }}
              style={{
                padding: '10px 28px', borderRadius: 9999, fontSize: 14, fontWeight: 800,
                fontFamily: FONT, textTransform: 'uppercase', letterSpacing: '0.08em',
                cursor: 'pointer', transition: 'all 0.18s',
                background: lang === l ? PINK : 'white',
                color: lang === l ? 'white' : PINK,
                border: lang === l ? 'none' : `2px solid rgba(233,30,140,0.28)`,
                boxShadow: lang === l
                  ? `0 4px 0 #C41678, 0 8px 18px rgba(233,30,140,0.35)`
                  : `0 2px 8px rgba(233,30,140,0.10)`,
              }}
            >
              {l === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── RIGHT PANEL: CTAs ── */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1, height: '100%',
          display: 'flex', flexDirection: 'column', gap: portrait ? 14 : 18,
          padding: portrait ? '20px 24px 24px' : '44px 44px 36px',
          position: 'relative', zIndex: 1,
        }}
      >
        {/* Clock + queue chip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <LiveClock />
          <div className="clay-pill" style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
          }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: PINK, display: 'block', flexShrink: 0 }}
            />
            <span style={{ fontSize: 14, fontWeight: 800, color: PINK, fontFamily: FONT }}>
              {LABEL.nowServing}: {CURRENT_QUEUE}
            </span>
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 style={{
            fontSize: portrait ? 38 : 60, fontWeight: 900, lineHeight: 1.05,
            color: DARK, fontFamily: FONT,
            letterSpacing: -1.5, margin: 0, whiteSpace: 'pre-line',
          }}>
            {LABEL.title}
          </h1>
          <p style={{ fontSize: 17, color: '#9CA3AF', fontWeight: 600, marginTop: 8, margin: '8px 0 0' }}>
            {LABEL.sub}
          </p>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Primary — MULAI CHECK-IN */}
          <motion.button
            className="clay-btn"
            whileTap={{ y: 3 }}
            onClick={handleCheckin}
            style={{
              width: '100%', height: portrait ? 88 : 108,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
              fontSize: portrait ? 22 : 28, letterSpacing: 0.5,
            }}
          >
            <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-3-8-10V5l8-3 8 3v7c0 7-8 10-8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span style={{ fontFamily: FONT }}>{LABEL.checkin}</span>
          </motion.button>

          {bookingCodeCheckin && (
            <motion.button
              className="clay-btn-aqua"
              whileTap={{ y: 3 }}
              onClick={handleOmdc}
              style={{
                width: '100%', height: portrait ? 72 : 88,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                fontSize: portrait ? 18 : 22, letterSpacing: 0.4,
              }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={AQUA} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8v8M10 8v8M13 8v8M17 8v8" />
              </svg>
              <span style={{ fontFamily: FONT }}>{LABEL.scanOmdc}</span>
            </motion.button>
          )}
        </div>

        {/* Feature tiles */}
        {!portrait && (
          <div style={{ display: 'flex', gap: 12, flex: 1 }}>
            {[
              { icon: '📋', label: lang === 'id' ? 'Cek Status Antrian' : 'Check Queue Status', sub: lang === 'id' ? 'Lihat posisi antrian Anda' : 'View your queue position', action: handleQueue, accent: AQUA, bg: '#F0FCFE', border: 'rgba(6,182,212,0.18)' },
              { icon: '🦷', label: lang === 'id' ? '8 Layanan Unggulan' : '8 Premium Services', sub: lang === 'id' ? 'Dokter spesialis berpengalaman' : 'Experienced specialist doctors', action: handleCheckin, accent: ROSE, bg: '#FFF0F8', border: 'rgba(255,107,181,0.18)' },
            ].map((item, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                onClick={item.action}
                style={{
                  flex: 1, background: item.bg,
                  border: `3px solid ${item.border}`,
                  borderRadius: 24, cursor: 'pointer',
                  padding: '0 20px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  textAlign: 'left',
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 14px ${item.border}`,
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 18, flexShrink: 0,
                  background: 'white',
                  border: `2px solid ${item.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.9), 0 3px 8px ${item.border}`,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: DARK, lineHeight: 1.25, fontFamily: FONT }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 3, fontWeight: 600 }}>
                    {item.sub}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', color: item.accent, fontSize: 22, fontWeight: 700 }}>›</div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Hint text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: PINK }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: PINK, letterSpacing: '0.05em', fontFamily: FONT }}>
            {LABEL.hint}
          </span>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: ROSE }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
