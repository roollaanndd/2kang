import { useEffect, useState } from 'react';
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
        fontSize: 80, fontWeight: 900, color: 'white', letterSpacing: -4, lineHeight: 1,
        fontVariantNumeric: 'tabular-nums', textShadow: `0 0 40px rgba(233,30,140,0.4)`,
        fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
      }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginTop: 8, letterSpacing: '0.06em' }}>
        {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
  );
}

/* Glowing architectural tooth built from layered CSS rings */
function GlowTooth() {
  return (
    <div style={{ position: 'relative', width: 160, height: 184 }}>
      {/* outer glow rings */}
      {[1.4, 1.2, 1.0].map((scale, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${scale})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width={160} height={184} viewBox="0 0 100 115" fill="none">
            <path
              d="M50 8C35 8 23 20 23 35c0 9 3 16 7 24 4 8 6.5 16 6.5 27 0 3 2 5 4.5 5h18c2.5 0 4.5-2 4.5-5 0-11 2.5-19 6.5-27 4-8 7-15 7-24C77 20 65 8 50 8z"
              stroke={i === 2 ? PINK : i === 1 ? ROSE : AQUA}
              strokeWidth={i === 2 ? 2 : 1.5}
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      ))}
      {/* core tooth with gradient stroke */}
      <motion.div
        animate={{ filter: ['drop-shadow(0 0 8px rgba(233,30,140,0.6))', 'drop-shadow(0 0 24px rgba(233,30,140,0.9))', 'drop-shadow(0 0 8px rgba(233,30,140,0.6))'] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width={100} height={115} viewBox="0 0 100 115" fill="none">
          <defs>
            <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={PINK} />
              <stop offset="50%" stopColor={ROSE} />
              <stop offset="100%" stopColor={AQUA} />
            </linearGradient>
          </defs>
          <path
            d="M50 8C35 8 23 20 23 35c0 9 3 16 7 24 4 8 6.5 16 6.5 27 0 3 2 5 4.5 5h18c2.5 0 4.5-2 4.5-5 0-11 2.5-19 6.5-27 4-8 7-15 7-24C77 20 65 8 50 8z"
            stroke="url(#toothGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="rgba(233,30,140,0.06)"
          />
          {/* inner root split lines */}
          <line x1="44" y1="64" x2="41" y2="86" stroke="url(#toothGrad)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="56" y1="64" x2="59" y2="86" stroke="url(#toothGrad)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="50" y1="66" x2="50" y2="90" stroke="url(#toothGrad)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        </svg>
      </motion.div>
      {/* floating particles */}
      {[
        { x: 20, y: 20, s: 4 }, { x: 130, y: 30, s: 3 }, { x: 10, y: 100, s: 5 },
        { x: 140, y: 120, s: 3 }, { x: 80, y: 10, s: 4 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [-6, 6, -6], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: p.x - 80, top: p.y - 40,
            width: p.s, height: p.s, borderRadius: '50%',
            background: [PINK, ROSE, AQUA, ROSE, PINK][i],
            boxShadow: `0 0 ${p.s * 2}px ${[PINK, ROSE, AQUA, ROSE, PINK][i]}`,
          }}
        />
      ))}
    </div>
  );
}

const TICKER_ITEMS = [
  '8 Dokter Spesialis Siap Melayani Anda',
  'Booking Online · Antrian Digital · Tanpa Antre Lama',
  'Buka Senin – Sabtu: 08.00 – 20.00 WIB',
  'Teknologi Digital X-ray & Laser Terkini',
];

export function KioskWelcome({ goTo, setState }: KioskScreenProps) {
  const portrait = useIsPortrait();
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVis, setTickerVis] = useState(true);
  const [lang, setLang] = useState<'id' | 'en'>('id');

  useEffect(() => {
    const id = setInterval(() => {
      setTickerVis(false);
      setTimeout(() => { setTickerIdx(p => (p + 1) % TICKER_ITEMS.length); setTickerVis(true); }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const handleTouch = () => {
    kioskSound('tap');
    setState(prev => ({ ...prev, step: 'language', language: lang }));
    goTo('language');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleTouch}
      style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: portrait ? 'column' : 'row',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        background: '#FFF8F4',
      }}
    >
      {/* 3px signature brand strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 30,
      }} />

      {/* ── LEFT PANEL: Dark navy with glowing tooth ── */}
      <div style={{
        width: portrait ? '100%' : '42%', flexShrink: 0,
        height: portrait ? '40%' : '100%',
        background: `linear-gradient(160deg, ${PINK} 0%, ${ROSE} 65%, #ffd8e6 100%)`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: portrait ? '32px 24px 24px' : '52px 40px 40px',
        position: 'relative', overflow: 'hidden',
        borderRight: portrait ? 'none' : `1px solid rgba(255,255,255,0.20)`,
        borderBottom: portrait ? `1px solid rgba(255,255,255,0.20)` : 'none',
      }}>
        {/* ambient glow spots */}
        <div style={{ position: 'absolute', top: -80, left: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.20) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Brand wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ textAlign: 'center', zIndex: 2 }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 4 }}>
            OMDC
          </div>
          <div style={{
            fontSize: 28, fontWeight: 900, lineHeight: 1,
            background: `linear-gradient(135deg, ${PINK}, ${ROSE}, ${AQUA})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.5px',
          }}>
            Dental
          </div>
        </motion.div>

        {/* Glowing tooth hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, zIndex: 2 }}
        >
          <GlowTooth />
        </motion.div>

        {/* Stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
          style={{ display: 'flex', flexDirection: portrait ? 'row' : 'column', gap: 10, zIndex: 2, width: '100%' }}
        >
          {[
            { v: '15+', l: 'Tahun Pengalaman' },
            { v: '10.000+', l: 'Pasien Puas' },
            { v: '8', l: 'Dokter Spesialis' },
          ].map((s) => (
            <div key={s.v} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.25)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 14, padding: '10px 14px',
              backdropFilter: 'blur(8px)',
              display: 'flex', flexDirection: portrait ? 'column' : 'row', alignItems: portrait ? 'flex-start' : 'center',
              gap: portrait ? 2 : 10,
            }}>
              <span style={{
                fontSize: 20, fontWeight: 900, color: 'white', lineHeight: 1,
                textShadow: '0 1px 4px rgba(0,0,0,0.15)',
              }}>{s.v}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT PANEL: White editorial ── */}
      <div style={{
        flex: 1, height: '100%',
        background: '#FFFFFF',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: portrait ? '32px 32px 0' : '52px 56px 0',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Language toggle + clock row */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <LiveClock />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={e => { e.stopPropagation(); setLang(l => l === 'id' ? 'en' : 'id'); }}
            style={{
              display: 'flex', borderRadius: 999,
              background: '#F3F4F6', border: '1px solid rgba(0,0,0,0.08)',
              overflow: 'hidden', padding: 3, gap: 2, cursor: 'pointer',
            }}
          >
            {(['id', 'en'] as const).map(l => (
              <div key={l} style={{
                padding: '6px 18px', borderRadius: 999, fontSize: 13, fontWeight: 700,
                background: lang === l ? `linear-gradient(135deg, ${PINK}, ${ROSE})` : 'transparent',
                color: lang === l ? 'white' : '#6B7280',
                transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>{l}</div>
            ))}
          </motion.div>
        </div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: PINK, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16 }}>
            {lang === 'id' ? '— SELAMAT DATANG —' : '— WELCOME —'}
          </div>
          <h1 style={{
            fontSize: portrait ? 52 : 72, fontWeight: 900, lineHeight: 1.05, margin: 0,
            color: DARK, letterSpacing: '-2px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            {lang === 'id' ? 'Senyum Sehat,' : 'Healthy Smile,'}
          </h1>
          <h1 style={{
            fontSize: portrait ? 52 : 72, fontWeight: 200, lineHeight: 1.05, margin: 0,
            background: `linear-gradient(135deg, ${PINK}, ${ROSE}, ${AQUA})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-1px', fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            {lang === 'id' ? 'Percaya Diri' : 'Full Confidence'}
          </h1>
          <p style={{ fontSize: 16, color: '#6B7280', marginTop: 16, fontWeight: 400 }}>
            {lang === 'id' ? 'Gigi lebih sehat, hidup lebih percaya diri' : 'Healthier teeth, more confident life'}
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ position: 'relative', width: '75%', maxWidth: 420 }}
        >
          {/* Pulse rings */}
          {[1, 2].map(n => (
            <motion.div
              key={n}
              animate={{ scale: [1, 1.12 + n * 0.06, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: n * 0.6, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: -(n * 14), borderRadius: 100,
                border: `1.5px solid rgba(233,30,140,${n === 1 ? '0.35' : '0.18'})`,
                pointerEvents: 'none',
              }}
            />
          ))}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '100%', padding: '26px 0',
              background: `linear-gradient(135deg, ${PINK} 0%, ${ROSE} 50%, ${AQUA} 100%)`,
              backgroundSize: '200% 200%',
              borderRadius: 100,
              boxShadow: '0 20px 60px rgba(233,30,140,0.40), 0 4px 16px rgba(233,30,140,0.20)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4, cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: 0.2 }}>
              {lang === 'id' ? 'Sentuh Layar untuk Memulai' : 'Touch Screen to Start'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
              {lang === 'id' ? 'Touch Screen to Start' : 'Sentuh Layar untuk Memulai'}
            </div>
          </motion.div>
        </motion.div>

        {/* Queue status bento card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{
            width: '75%', maxWidth: 420,
            background: '#F8F9FC', borderRadius: 18,
            border: '1px solid rgba(0,0,0,0.07)',
            padding: '16px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              {lang === 'id' ? 'Sedang Dilayani' : 'Now Serving'}
            </div>
            <div style={{
              fontSize: 32, fontWeight: 900, lineHeight: 1, letterSpacing: -1,
              background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              {CURRENT_QUEUE}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.20)', borderRadius: 20, padding: '4px 10px' }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'block' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#059669' }}>4 {lang === 'id' ? 'Dokter Online' : 'Doctors Active'}</span>
            </div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>
              12 {lang === 'id' ? 'menunggu · ~8 mnt' : 'waiting · ~8 min'}
            </div>
          </div>
        </motion.div>

        {/* Bottom info ticker */}
        <div style={{
          width: '100%', background: '#F8F9FC',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          padding: '13px 24px', display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, color: 'white',
            fontSize: 10, fontWeight: 800, padding: '4px 14px', borderRadius: 20,
            letterSpacing: 1, whiteSpace: 'nowrap', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(233,30,140,0.28)',
          }}>
            INFO
          </div>
          <motion.div
            key={tickerIdx}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: tickerVis ? 1 : 0, x: tickerVis ? 0 : -16 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: 13, color: '#374151', fontWeight: 500, flex: 1 }}
          >
            {TICKER_ITEMS[tickerIdx]}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
