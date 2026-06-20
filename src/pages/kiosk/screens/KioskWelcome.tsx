import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { OmdcLogo } from '../../../components/ui/OmdcLogo';
import { CURRENT_QUEUE } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';

const TICKER_ITEMS = [
  `Antrian saat ini: ${CURRENT_QUEUE} · Scaling & Polishing · Ruang 2`,
  '4 Dokter Spesialis siap melayani Anda',
  'Booking Online · No. Antrian Digital · Layanan Terbaik',
  'Buka Senin – Sabtu: 08.00 – 20.00 WIB',
];

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 80, fontWeight: 900, color: '#0D1421', letterSpacing: -3, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: 18, color: '#9CA3AF', fontWeight: 500, marginTop: 10, letterSpacing: 0.5 }}>
        {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
    </div>
  );
}

export function KioskWelcome({ goTo, setState }: KioskScreenProps) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIndex(prev => (prev + 1) % TICKER_ITEMS.length);
        setTickerVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const handleTouch = () => {
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
      style={{
        width: '100%', height: '100%',
        background: '#FFFFFF',
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Signature 3px gradient accent strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 20 }} />

      {/* Restrained premium mesh — two soft blobs only */}
      <div style={{
        position: 'absolute', top: -160, right: -120, width: 640, height: 640,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(233,30,140,0.06) 0%, transparent 62%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -180, left: -120, width: 560, height: 560,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 62%)',
        pointerEvents: 'none',
      }} />

      {/* Decorative tooth watermark — barely-there */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        style={{ position: 'absolute', bottom: -30, right: 60, pointerEvents: 'none' }}
      >
        <svg viewBox="0 0 200 220" width={300} height={330}>
          <path
            d="M100 8C71 8 50 29 50 58c0 18 7 33 14 48 7 15 11 26 11 41 0 6 4 10 9 10H116c5 0 9-4 9-10 0-15 4-26 11-41 7-15 14-30 14-48 0-29-21-50-50-50z"
            fill={PINK}
          />
        </svg>
      </motion.div>

      {/* Main content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 40, padding: '60px 60px 80px',
        position: 'relative', zIndex: 10,
      }}>
        {/* Logo in a premium bezel card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: -24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring', bounce: 0.3 }}
          style={{
            padding: '22px 40px',
            borderRadius: 28,
            background: '#FFFFFF',
            border: '1px solid rgba(233,30,140,0.10)',
            boxShadow: '0 16px 50px rgba(233,30,140,0.10), 0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <OmdcLogo size="xl" variant="default" />
        </motion.div>

        {/* Clock */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <Clock />
        </motion.div>

        {/* Hairline divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{ width: 120, height: 2, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${PINK}, transparent)` }}
        />

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            fontSize: 34, fontWeight: 800, color: '#0D1421',
            letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.2,
          }}>
            Senyum Sehat, Percaya Diri Penuh
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
          style={{ position: 'relative', marginTop: 12 }}
        >
          {/* Soft pulsing halo ring */}
          {[1, 2].map((n) => (
            <motion.div
              key={n}
              animate={{ scale: [1, 1.4 + n * 0.1, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: n * 0.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: -(n * 16),
                borderRadius: 70,
                border: `1.5px solid rgba(233,30,140,${0.28 - n * 0.08})`,
                pointerEvents: 'none',
              }}
            />
          ))}

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              padding: '26px 68px',
              background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
              borderRadius: 70,
              boxShadow: '0 20px 60px rgba(233,30,140,0.35)',
            }}
          >
            <div style={{
              fontSize: 27, fontWeight: 800, color: 'white',
              textAlign: 'center', letterSpacing: 0.2,
              display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center',
            }}>
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'inline-block' }}
              >
                👆
              </motion.span>
              Sentuh Layar untuk Memulai
            </div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 6, fontWeight: 500 }}>
              Touch Screen to Start
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom info ticker */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          padding: '16px 44px',
          display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0,
          position: 'relative', zIndex: 10,
        }}
      >
        <div style={{
          background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
          color: 'white',
          fontSize: 11, fontWeight: 800, padding: '6px 15px',
          borderRadius: 20, letterSpacing: 1, whiteSpace: 'nowrap', flexShrink: 0,
          boxShadow: '0 4px 14px rgba(233,30,140,0.25)',
        }}>
          INFO
        </div>

        <motion.div
          key={tickerIndex}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: tickerVisible ? 1 : 0, x: tickerVisible ? 0 : -24 }}
          transition={{ duration: 0.35 }}
          style={{ fontSize: 16, color: '#374151', fontWeight: 500, flex: 1 }}
        >
          {TICKER_ITEMS[tickerIndex]}
        </motion.div>

        <div style={{
          fontSize: 14, color: '#9CA3AF',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          4 Dokter Spesialis · Booking Online · No. Antrian Digital
        </div>
      </motion.div>
    </motion.div>
  );
}
