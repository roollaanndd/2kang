import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { OmdcLogo } from '../../../components/ui/OmdcLogo';
import { CURRENT_QUEUE } from '../../../data/mockData';
import { kioskSound } from '../../../lib/kioskSound';
import type { KioskScreenProps } from '../KioskLayout';

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
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 72, fontWeight: 900, color: DARK, letterSpacing: -3, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: 16, color: '#9CA3AF', fontWeight: 500, marginTop: 8 }}>
        {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
  );
}

// Minimal QR code SVG placeholder
function QRCodeSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top-left finder */}
      <rect x="4" y="4" width="24" height="24" rx="3" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5"/>
      <rect x="9" y="9" width="14" height="14" rx="1" fill="rgba(255,255,255,0.7)"/>
      {/* Top-right finder */}
      <rect x="52" y="4" width="24" height="24" rx="3" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5"/>
      <rect x="57" y="9" width="14" height="14" rx="1" fill="rgba(255,255,255,0.7)"/>
      {/* Bottom-left finder */}
      <rect x="4" y="52" width="24" height="24" rx="3" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5"/>
      <rect x="9" y="57" width="14" height="14" rx="1" fill="rgba(255,255,255,0.7)"/>
      {/* Data dots */}
      {[
        [34,4],[38,4],[42,4],[46,4],[34,8],[42,8],[46,8],
        [34,12],[38,12],[34,16],[42,16],[46,16],[38,20],[42,20],
        [52,32],[56,32],[60,32],[64,32],[68,32],[72,32],
        [52,36],[60,36],[68,36],[52,40],[56,40],[64,40],[72,40],
        [4,32],[8,32],[12,32],[16,32],[20,32],[24,32],[28,32],
        [4,36],[12,36],[20,36],[28,36],[4,40],[8,40],[16,40],[24,40],[28,40],
        [34,52],[38,52],[42,52],[46,52],[52,52],[56,52],[60,52],[68,52],[72,52],
        [34,56],[46,56],[52,56],[60,56],[64,56],[72,56],
        [34,60],[38,60],[42,60],[60,60],[68,60],
        [34,64],[42,64],[46,64],[52,64],[56,64],[60,64],[64,64],[68,64],[72,64],
        [38,68],[46,68],[52,68],[60,68],[64,68],[72,68],
      ].map(([cx, cy], i) => (
        <rect key={i} x={cx} y={cy} width="4" height="4" fill="rgba(255,255,255,0.65)" />
      ))}
    </svg>
  );
}

const TICKER_ITEMS = [
  '4 Dokter Spesialis Siap Melayani',
  'Booking Online · Antrian Digital · Tanpa Antri Lama',
  'Buka Senin – Sabtu: 08.00 – 20.00 WIB',
  'Teknologi Digital X-ray & Laser Terkini',
];

export function KioskWelcome({ goTo, setState }: KioskScreenProps) {
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVis, setTickerVis] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTickerVis(false);
      setTimeout(() => { setTickerIdx(p => (p + 1) % TICKER_ITEMS.length); setTickerVis(true); }, 380);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const handleTouch = () => {
    kioskSound('tap');
    setState(prev => ({ ...prev, step: 'language', language: 'id' }));
    goTo('language');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleTouch}
      style={{ width: '100%', height: '100%', display: 'flex', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
    >
      {/* 3px brand strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 30 }} />

      {/* ─── LEFT PANEL: Dark branded side ─────────────────────────────── */}
      <div style={{
        width: '40%', flexShrink: 0, height: '100%',
        background: `linear-gradient(160deg, #141b2d 0%, ${DARK} 50%, #0a1520 100%)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
        padding: '40px 32px 32px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle geometric backdrop */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', border: `1px solid rgba(233,30,140,0.12)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 60, left: -40, width: 160, height: 160, borderRadius: '50%', border: `1px solid rgba(6,182,212,0.10)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: -20, right: -20, height: 1, background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <OmdcLogo size="lg" variant="white" />
        </motion.div>

        {/* Live queue display */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
          style={{ textAlign: 'center', width: '100%' }}>
          {/* Serving now */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
              SEDANG DILAYANI
            </div>
            <div style={{
              fontSize: 64, fontWeight: 900, lineHeight: 1,
              background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              letterSpacing: -2,
            }}>
              {CURRENT_QUEUE}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 0, borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 20 }}>
            {[
              { label: 'Menunggu', value: '12' },
              { label: 'Est. Tunggu', value: '~8 mnt' },
              { label: 'Dokter', value: '4' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ flex: 1, padding: '12px 6px', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Status badges */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 20, padding: '5px 14px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', display: 'block', boxShadow: '0 0 6px #10B981' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6EE7B7' }}>4 Dokter Online</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(233,30,140,0.12)', border: '1px solid rgba(233,30,140,0.2)', borderRadius: 20, padding: '5px 14px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#FF6BB5' }}>⚡ Kiosk Aktif</span>
            </div>
          </div>
        </motion.div>

        {/* QR code for app download */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
          style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '14px 16px' }}>
            <QRCodeSVG />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'white', marginBottom: 4, lineHeight: 1.3 }}>Download<br />OMDC App</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>Booking &<br />pantau antrian</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── RIGHT PANEL: White interactive side ────────────────────────── */}
      <div style={{
        flex: 1, height: '100%', background: '#FFFFFF',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '44px 48px 0',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle dental geometry on right panel */}
        {[
          { x: 85, y: 8, s: 60, c: PINK, o: 0.04 },
          { x: 5, y: 72, s: 48, c: AQUA, o: 0.04 },
          { x: 72, y: 78, s: 32, c: ROSE, o: 0.05 },
        ].map((el, i) => (
          <motion.div key={i} style={{ position: 'absolute', left: `${el.x}%`, top: `${el.y}%`, opacity: el.o, pointerEvents: 'none' }}
            animate={{ y: [-8, 8, -8] }} transition={{ duration: 10 + i * 3, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width={el.s} height={el.s * 1.15} viewBox="0 0 100 115" fill="none">
              <path d="M50 5C33 5 19 18 19 34c0 10 3.5 18 8 27 4.5 9 7 17 7 28 0 3 2.5 5.5 5.5 5.5h21c3 0 5.5-2.5 5.5-5.5 0-11 2.5-19 7-28 4.5-9 8-17 8-27C81 18 67 5 50 5z"
                stroke={el.c} strokeWidth="3.5" strokeLinejoin="round" />
            </svg>
          </motion.div>
        ))}

        {/* Clock */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          style={{ position: 'relative', zIndex: 2 }}>
          <LiveClock />
        </motion.div>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
          style={{ width: 80, height: 2, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${PINK}, transparent)`, position: 'relative', zIndex: 2 }} />

        {/* Tagline */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
          style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: DARK, letterSpacing: -0.5, lineHeight: 1.25, marginBottom: 8 }}>
            Senyum Sehat,<br />
            <span style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE}, ${AQUA})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Percaya Diri Penuh
            </span>
          </div>
          <p style={{ fontSize: 15, color: '#9CA3AF', fontWeight: 400 }}>Gigi lebih sehat, senyum lebih percaya diri</p>
        </motion.div>

        {/* Touch to Start CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: 'spring', stiffness: 280, damping: 24 }}
          style={{ position: 'relative', zIndex: 2 }}>
          {/* Pulsing halo rings */}
          {[1, 2].map(n => (
            <motion.div key={n}
              animate={{ scale: [1, 1.35 + n * 0.08, 1], opacity: [0.18, 0, 0.18] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: n * 0.55, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: -(n * 18), borderRadius: 80, border: `1.5px solid rgba(233,30,140,${0.28 - n * 0.07})`, pointerEvents: 'none' }}
            />
          ))}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ padding: '22px 60px', background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, borderRadius: 80, boxShadow: '0 20px 60px rgba(233,30,140,0.38)' }}
          >
            <div style={{ fontSize: 24, fontWeight: 800, color: 'white', textAlign: 'center', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-block', fontSize: 26 }}>
                👆
              </motion.span>
              Sentuh Layar untuk Memulai
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginTop: 5, fontWeight: 500 }}>
              Touch Screen to Start
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom info ticker */}
        <div style={{ width: '100%', background: '#F8F9FB', borderTop: '1px solid rgba(0,0,0,0.06)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, color: 'white', fontSize: 10, fontWeight: 800, padding: '5px 14px', borderRadius: 20, letterSpacing: 1, whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 4px 12px rgba(233,30,140,0.25)' }}>
            INFO
          </div>
          <motion.div
            key={tickerIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: tickerVis ? 1 : 0, x: tickerVis ? 0 : -20 }}
            transition={{ duration: 0.32 }}
            style={{ fontSize: 14, color: '#374151', fontWeight: 500, flex: 1 }}
          >
            {TICKER_ITEMS[tickerIdx]}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
