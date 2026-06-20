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

// ── ANIMATED PREMIUM BACKGROUND ───────────────────────────────────────────────
function KioskAnimatedBg() {
  const shapes = [
    { x: 6,  y: -3,  s: 88,  d: 0,   t: 14, c: PINK, o: 0.055, sh: 'tooth'   },
    { x: 84, y: 4,   s: 108, d: 1.5, t: 12, c: AQUA, o: 0.04,  sh: 'ring'    },
    { x: 70, y: 56,  s: 32,  d: 0.8, t: 9,  c: PINK, o: 0.065, sh: 'plus'    },
    { x: 80, y: 73,  s: 72,  d: 2.2, t: 16, c: PINK, o: 0.042, sh: 'tooth'   },
    { x: 16, y: 60,  s: 22,  d: 1.1, t: 8,  c: AQUA, o: 0.075, sh: 'sparkle' },
    { x: 44, y: 80,  s: 68,  d: 0.4, t: 11, c: PINK, o: 0.032, sh: 'ring'    },
    { x: 3,  y: 30,  s: 20,  d: 1.8, t: 10, c: AQUA, o: 0.065, sh: 'plus'    },
    { x: 91, y: 30,  s: 18,  d: 0.2, t: 7,  c: PINK, o: 0.085, sh: 'sparkle' },
    { x: 48, y: 2,   s: 54,  d: 3,   t: 18, c: AQUA, o: 0.03,  sh: 'tooth'   },
    { x: 18, y: 7,   s: 82,  d: 2.5, t: 15, c: AQUA, o: 0.032, sh: 'ring'    },
    { x: 57, y: 48,  s: 16,  d: 1.4, t: 8,  c: PINK, o: 0.055, sh: 'sparkle' },
    { x: 30, y: 40,  s: 26,  d: 2.8, t: 12, c: PINK, o: 0.045, sh: 'plus'    },
  ] as const;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {shapes.map((el, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', left: `${el.x}%`, top: `${el.y}%`, opacity: el.o }}
          animate={{
            y: [-10, 10, -10],
            rotate: el.sh === 'ring' ? [0, 6, 0] : el.sh === 'plus' ? [0, 18, 0] : el.sh === 'sparkle' ? [0, 22, 0] : [0, 4, 0],
          }}
          transition={{ duration: el.t, repeat: Infinity, delay: el.d, ease: 'easeInOut' }}
        >
          {el.sh === 'tooth' && (
            <svg width={el.s} height={Math.round(el.s * 1.15)} viewBox="0 0 100 115" fill="none">
              <path d="M50 5C33 5 19 18 19 34c0 10 3.5 18 8 27 4.5 9 7 17 7 28 0 3 2.5 5.5 5.5 5.5h21c3 0 5.5-2.5 5.5-5.5 0-11 2.5-19 7-28 4.5-9 8-17 8-27C81 18 67 5 50 5z"
                stroke={el.c} strokeWidth="3.5" strokeLinejoin="round" />
            </svg>
          )}
          {el.sh === 'ring' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="42" stroke={el.c} strokeWidth="2.5" />
              <circle cx="50" cy="50" r="30" stroke={el.c} strokeWidth="1.5" strokeDasharray="7 5" />
            </svg>
          )}
          {el.sh === 'plus' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100" fill="none">
              <path d="M50 18V82M18 50H82" stroke={el.c} strokeWidth="9" strokeLinecap="round" />
            </svg>
          )}
          {el.sh === 'sparkle' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100">
              <path d="M50 10L55 45L90 50L55 55L50 90L45 55L10 50L45 45Z" fill={el.c} />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

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

      {/* Animated premium dental-geometry background */}
      <KioskAnimatedBg />

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
