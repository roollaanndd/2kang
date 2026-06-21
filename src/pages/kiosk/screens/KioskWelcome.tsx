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

function QRCodeSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="24" height="24" rx="3" fill="none" stroke="#0D1421" strokeWidth="2.5"/>
      <rect x="9" y="9" width="14" height="14" rx="1" fill="#E91E8C"/>
      <rect x="52" y="4" width="24" height="24" rx="3" fill="none" stroke="#0D1421" strokeWidth="2.5"/>
      <rect x="57" y="9" width="14" height="14" rx="1" fill="#E91E8C"/>
      <rect x="4" y="52" width="24" height="24" rx="3" fill="none" stroke="#0D1421" strokeWidth="2.5"/>
      <rect x="9" y="57" width="14" height="14" rx="1" fill="#E91E8C"/>
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
        <rect key={i} x={cx} y={cy} width="4" height="4" fill="#0D1421" opacity="0.7" />
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
      {/* 4px brand strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 30 }} />

      {/* ─── LEFT PANEL: Light branded side ─────────────────────────────── */}
      <div style={{
        width: '40%', flexShrink: 0, height: '100%',
        background: `linear-gradient(160deg, #FFF5F9 0%, #FFE4F1 50%, #ECFEFF 100%)`,
        borderRight: '1px solid rgba(233,30,140,0.10)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
        padding: '40px 32px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', border: `1px solid rgba(233,30,140,0.14)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 60, left: -40, width: 160, height: 160, borderRadius: '50%', border: `1px solid rgba(6,182,212,0.16)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: -20, right: -20, height: 1, background: 'rgba(233,30,140,0.06)', pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <OmdcLogo size="lg" variant="default" />
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
          style={{ textAlign: 'center', width: '100%' }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
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

          <div style={{ display: 'flex', gap: 0, borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(233,30,140,0.10)', boxShadow: '0 4px 16px rgba(233,30,140,0.06)', marginBottom: 20 }}>
            {[
              { label: 'Menunggu', value: '12' },
              { label: 'Est. Tunggu', value: '~8 mnt' },
              { label: 'Dokter', value: '4' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ flex: 1, padding: '12px 6px', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(233,30,140,0.08)' : 'none' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: DARK, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 600, marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
              </div>
            ))}
          </div>

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

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
          style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(233,30,140,0.12)', borderRadius: 16, padding: '14px 16px', boxShadow: '0 4px 16px rgba(233,30,140,0.06)' }}>
            <QRCodeSVG />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: DARK, marginBottom: 4, lineHeight: 1.3 }}>Download<br />OMDC App</div>
              <div style={{ fontSize: 10, color: '#6B7280', lineHeight: 1.5 }}>Booking &<br />pantau antrian</div>
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

        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          style={{ position: 'relative', zIndex: 2 }}>
          <LiveClock />
        </motion.div>

        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
          style={{ width: 80, height: 2, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${PINK}, transparent)`, position: 'relative', zIndex: 2 }} />

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            fontSize: 42, fontWeight: 900, color: '#0D1421',
            letterSpacing: -1, marginBottom: 10, lineHeight: 1.15,
          }}>
            Senyum Sehat,{' '}
            <span style={{
              background: `linear-gradient(135deg, ${PINK}, ${ROSE}, ${AQUA})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Percaya Diri
            </span>
          </div>
          <div style={{ fontSize: 18, color: '#9CA3AF', fontWeight: 400, letterSpacing: 0.2 }}>
            Gigi lebih sehat, senyum lebih percaya diri
          </div>
        </motion.div>

        {/* Touch to start CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{ position: 'relative', marginTop: 12, display: 'inline-block' }}
        >
          {[1, 2].map((n) => (
            <motion.div
              key={n}
              animate={{ scale: [1, 1.15 + n * 0.08, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: n * 0.55, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: -(n * 16),
                borderRadius: 80,
                background: n === 1 ? 'rgba(233,30,140,0.18)' : undefined,
                border: n === 2 ? `1.5px solid rgba(233,30,140,0.22)` : undefined,
                pointerEvents: 'none',
              }}
            />
          ))}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              padding: '28px 72px',
              background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
              borderRadius: 80,
              boxShadow: '0 20px 60px rgba(233,30,140,0.38)',
              minHeight: 88,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div style={{
              fontSize: 28, fontWeight: 800, color: 'white',
              textAlign: 'center', letterSpacing: 0.2,
              display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center',
            }}>
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'inline-block', fontSize: 28 }}
              >
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
