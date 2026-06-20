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
      <div style={{ fontSize: 72, fontWeight: 900, color: '#0D1421', letterSpacing: -3, lineHeight: 1 }}>
        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: 18, color: '#6B7280', fontWeight: 400, marginTop: 8, letterSpacing: 0.5 }}>
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
        background: '#F8FAFB',
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Gradient mesh blobs — very subtle light versions */}
      {/* Soft pink top-right */}
      <div style={{
        position: 'absolute',
        top: -120,
        right: -80,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Soft aqua bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: -100,
        left: -80,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Soft lavender center */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '35%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Animated floating orbs — very subtle */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,30,140,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{
          position: 'absolute',
          top: '55%',
          left: '65%',
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Sparkling dots — pink dots vibrant, reduced set */}
      {[
        { x: '15%', y: '20%' }, { x: '85%', y: '15%' }, { x: '92%', y: '60%' },
        { x: '8%',  y: '75%' }, { x: '70%', y: '40%' },
      ].map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          style={{
            position: 'absolute',
            left: dot.x, top: dot.y,
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(233,30,140,0.75)' : 'rgba(255,107,181,0.55)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Decorative large tooth SVG — very light pink/gray fill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring', bounce: 0.4 }}
        style={{ position: 'absolute', top: 40, right: 80, opacity: 0.07 }}
      >
        <svg viewBox="0 0 200 220" width={240} height={264}>
          <path
            d="M100 8C71 8 50 29 50 58c0 18 7 33 14 48 7 15 11 26 11 41 0 6 4 10 9 10H116c5 0 9-4 9-10 0-15 4-26 11-41 7-15 14-30 14-48 0-29-21-50-50-50z"
            fill="#F3F4F6"
          />
          <rect x="80" y="144" width="12" height="36" rx="6" fill="#F3F4F6" opacity="0.7" />
          <rect x="108" y="144" width="12" height="36" rx="6" fill="#F3F4F6" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Main content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 32, padding: '40px 60px 70px',
        position: 'relative',
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
            fontSize: 32, fontWeight: 700, color: '#0D1421',
            letterSpacing: 0.3, marginBottom: 10, lineHeight: 1.25,
          }}>
            Senyum Sehat, Percaya Diri Penuh
          </div>
          <div style={{ fontSize: 18, color: '#6B7280', fontWeight: 400, letterSpacing: 0.2 }}>
            Gigi lebih sehat, senyum lebih percaya diri
          </div>
        </motion.div>

        {/* Touch to start CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{ position: 'relative', marginTop: 8 }}
        >
          {/* Glow rings — keep pink, slightly reduced intensity */}
          {[1, 2].map((n) => (
            <motion.div
              key={n}
              animate={{ scale: [1, 1.5 + n * 0.12, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: n * 0.45 }}
              style={{
                position: 'absolute',
                inset: -(n * 20),
                borderRadius: 60,
                border: `1.5px solid rgba(233,30,140,${0.35 - n * 0.1})`,
                pointerEvents: 'none',
              }}
            />
          ))}

          <motion.div
            animate={{ boxShadow: ['0 0 60px rgba(233,30,140,0.35)', '0 0 100px rgba(233,30,140,0.55)', '0 0 60px rgba(233,30,140,0.35)'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              padding: '24px 64px',
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              borderRadius: 60,
              boxShadow: '0 0 80px rgba(233,30,140,0.4)',
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                fontSize: 26, fontWeight: 800, color: 'white',
                textAlign: 'center', letterSpacing: 0.3,
              }}
            >
              👆 Sentuh Layar untuk Memulai
            </motion.div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginTop: 6 }}>
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
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(233,30,140,0.15)',
          padding: '14px 40px',
          display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
        }}
      >
        <div style={{
          background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
          color: 'white',
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
          style={{ fontSize: 16, color: '#374151', fontWeight: 500, flex: 1 }}
        >
          {TICKER_ITEMS[tickerIndex]}
        </motion.div>

        <div style={{
          fontSize: 14, color: '#9CA3AF',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          4 Dokter Spesialis • Booking Online • No Antrian Digital
        </div>
      </motion.div>
    </motion.div>
  );
}
