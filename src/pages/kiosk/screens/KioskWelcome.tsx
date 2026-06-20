import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { OmdcLogo } from '../../../components/ui/OmdcLogo';
import { CURRENT_QUEUE } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';

const TICKER_ITEMS = [
  `Antrian saat ini: ${CURRENT_QUEUE} - Scaling & Polishing - Ruang 2`,
  '4 Dokter Spesialis siap melayani Anda',
  'Booking Online • No Antrian Digital • Layanan Terbaik',
  'Buka Senin - Sabtu: 08.00 - 20.00 WIB',
];

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 64, fontWeight: 900, color: 'white', letterSpacing: -2, lineHeight: 1 }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginTop: 4 }}>
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
        background: 'linear-gradient(145deg, #9D174D 0%, #BE185D 20%, #E91E8C 55%, #FF6BB5 85%, #FFB3D9 100%)',
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Animated background blobs */}
      {[
        { w: 500, h: 500, x: -100, y: -100, op: 0.07, dur: 8 },
        { w: 350, h: 350, x: '70%', y: '60%', op: 0.06, dur: 10 },
        { w: 250, h: 250, x: '80%', y: '5%',  op: 0.08, dur: 7  },
        { w: 200, h: 200, x: '10%', y: '70%', op: 0.05, dur: 12 },
      ].map((b, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
          style={{
            position: 'absolute',
            width: b.w, height: b.h,
            left: b.x, top: b.y,
            borderRadius: '50%',
            background: `rgba(255,255,255,${b.op})`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Sparkling dots */}
      {[
        { x: '15%', y: '20%' }, { x: '85%', y: '15%' }, { x: '92%', y: '60%' },
        { x: '8%',  y: '75%' }, { x: '50%', y: '90%' }, { x: '70%', y: '40%' },
        { x: '30%', y: '60%' }, { x: '60%', y: '12%' },
      ].map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          style={{
            position: 'absolute',
            left: dot.x, top: dot.y,
            width: 6 + (i % 3) * 3,
            height: 6 + (i % 3) * 3,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.6)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Animated SVG tooth */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring', bounce: 0.4 }}
        style={{ position: 'absolute', top: 40, right: 80, opacity: 0.12 }}
      >
        <svg viewBox="0 0 200 220" width={200} height={220}>
          <path
            d="M100 8C71 8 50 29 50 58c0 18 7 33 14 48 7 15 11 26 11 41 0 6 4 10 9 10H116c5 0 9-4 9-10 0-15 4-26 11-41 7-15 14-30 14-48 0-29-21-50-50-50z"
            fill="white"
          />
          <rect x="80" y="144" width="12" height="36" rx="6" fill="white" opacity="0.7" />
          <rect x="108" y="144" width="12" height="36" rx="6" fill="white" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Main content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 28, padding: '40px 60px 70px',
      }}>
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: -24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          <OmdcLogo size="xl" variant="white" />
        </motion.div>

        {/* Clock */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <Clock />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            fontSize: 30, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
            letterSpacing: 0.5, marginBottom: 6,
          }}>
            Senyum Sehat, Percaya Diri Penuh
          </div>
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}>
            Gigi lebih sehat, senyum lebih percaya diri
          </div>
        </motion.div>

        {/* Touch to start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{ position: 'relative', marginTop: 12 }}
        >
          {/* Ripple rings */}
          {[1, 2].map((n) => (
            <motion.div
              key={n}
              animate={{ scale: [1, 1.5 + n * 0.15, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: n * 0.4 }}
              style={{
                position: 'absolute',
                inset: -(n * 16),
                borderRadius: '60px',
                border: '2px solid rgba(255,255,255,0.4)',
                pointerEvents: 'none',
              }}
            />
          ))}

          <div style={{
            padding: '22px 56px',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 60,
            border: '2px solid rgba(255,255,255,0.45)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}>
            <motion.div
              animate={{ opacity: [1, 0.55, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                fontSize: 24, fontWeight: 800, color: 'white',
                textAlign: 'center', letterSpacing: 0.5,
              }}
            >
              👆 Sentuh Layar untuk Memulai
            </motion.div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 4 }}>
              Touch Screen to Start
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom info ticker */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        style={{
          background: 'rgba(26,26,46,0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '14px 40px',
          display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
        }}
      >
        <div style={{
          background: '#E91E8C', color: 'white',
          fontSize: 11, fontWeight: 800, padding: '5px 14px',
          borderRadius: 20, letterSpacing: 1, whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          INFO
        </div>

        <motion.div
          key={tickerIndex}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: tickerVisible ? 1 : 0, x: tickerVisible ? 0 : -24 }}
          transition={{ duration: 0.35 }}
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.88)', fontWeight: 500, flex: 1 }}
        >
          {TICKER_ITEMS[tickerIndex]}
        </motion.div>

        <div style={{
          fontSize: 14, color: 'rgba(255,255,255,0.45)',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          4 Dokter Spesialis • Booking Online • No Antrian Digital
        </div>
      </motion.div>
    </motion.div>
  );
}
