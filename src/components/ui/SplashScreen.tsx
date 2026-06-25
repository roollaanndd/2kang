import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SHOWN_KEY = 'omdc_splash_shown';
const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';
const DARK = '#0D1421';

export function SplashScreen() {
  const [visible, setVisible] = useState(() => {
    try { return !sessionStorage.getItem(SHOWN_KEY); } catch { return false; }
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem(SHOWN_KEY, '1'); } catch {}
    }, 2400);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="omdc-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#FFFFFF',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'all',
          }}
        >
          {/* Top gradient strip — animated sweep */}
          <motion.div
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1, transformOrigin: 'left' }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${GOLD})`,
            }}
          />

          {/* Floating background teeth */}
          {([
            { x: 8, y: 12, s: 80, d: 0, c: PINK },
            { x: 76, y: 6, s: 64, d: 0.5, c: GOLD },
            { x: 4, y: 65, s: 48, d: 1.2, c: GOLD },
            { x: 82, y: 62, s: 56, d: 0.8, c: PINK },
          ] as const).map((sh, i) => (
            <motion.div key={i}
              animate={{ y: [-8, 8, -8], rotate: [0, 4, 0] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
              style={{ position: 'absolute', left: `${sh.x}%`, top: `${sh.y}%`, opacity: 0.035, pointerEvents: 'none' }}
            >
              <svg width={sh.s} height={sh.s * 1.15} viewBox="0 0 100 115" fill="none">
                <path
                  d="M50 5C33 5 19 18 19 34c0 10 3.5 18 8 27 4.5 9 7 17 7 28 0 3 2.5 5.5 5.5 5.5h21c3 0 5.5-2.5 5.5-5.5 0-11 2.5-19 7-28 4.5-9 8-17 8-27C81 18 67 5 50 5z"
                  stroke={sh.c} strokeWidth="3.5" strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          ))}

          {/* OMDC tooth logomark */}
          <motion.div
            initial={{ scale: 0.45, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
            style={{ marginBottom: 24 }}
          >
            <svg width={84} height={96} viewBox="0 0 72 82" fill="none">
              <defs>
                <linearGradient id="sp-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={PINK} />
                  <stop offset="100%" stopColor={ROSE} />
                </linearGradient>
                <filter id="sp-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path
                d="M36 3C23.9 3 14 12.2 14 23.6c0 7.4 2.6 13.4 5.9 20.1C23.3 50.6 25.3 56.5 25.3 65c0 2.3 1.8 4.1 4.1 4.1H42.6c2.3 0 4.1-1.8 4.1-4.1 0-8.5 2-14.4 5.4-21.3 3.3-6.7 5.9-12.7 5.9-20.1C58 12.2 48.1 3 36 3z"
                fill="url(#sp-g)" filter="url(#sp-glow)"
              />
              {/* Highlight arc */}
              <path d="M24 21c1.5-6 7-10 12-10" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.5" fill="none" />
              {/* Medical cross */}
              <path d="M36 46v14M29 53h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
            </svg>
          </motion.div>

          {/* Brand wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            style={{ textAlign: 'center', marginBottom: 40 }}
          >
            <div style={{
              fontSize: 32, fontWeight: 900, letterSpacing: '-0.5px', color: DARK,
              lineHeight: 1.1, marginBottom: 7,
            }}>
              OMDC{' '}
              <span style={{
                background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Dental
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: '#B0B8C1', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Senyum Sehat · Percaya Diri Penuh
            </div>
          </motion.div>

          {/* Pulsing dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            style={{ display: 'flex', gap: 8 }}
          >
            {([PINK, ROSE, GOLD] as const).map((c, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.55, 1], opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
                style={{ width: 9, height: 9, borderRadius: '50%', background: c }}
              />
            ))}
          </motion.div>

          {/* Bottom strip */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${GOLD}, ${ROSE}, ${PINK})`,
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
