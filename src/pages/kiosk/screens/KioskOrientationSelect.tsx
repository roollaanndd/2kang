import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { OmdcLogo } from '../../../components/ui/OmdcLogo';
import { AnimatedDentalBg } from '../../../components/ui/AnimatedDentalBg';
import { kioskSound } from '../../../lib/kioskSound';
import type { KioskOrientation } from '../../../context/KioskOrientationContext';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';
const DARK = '#0D1421';

interface Props {
  onSelect: (orientation: KioskOrientation) => void;
}

/* Simple device-frame glyphs so the choice reads instantly on a touchscreen */
function LandscapeGlyph({ active }: { active: boolean }) {
  const c = active ? '#FFFFFF' : PINK;
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" fill="none" aria-hidden="true">
      <rect x="10" y="24" width="72" height="44" rx="6" stroke={c} strokeWidth="3.5" />
      <rect x="18" y="32" width="56" height="28" rx="2" fill={c} opacity={active ? 0.25 : 0.12} />
      <line x1="46" y1="68" x2="46" y2="74" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function PortraitGlyph({ active }: { active: boolean }) {
  const c = active ? '#FFFFFF' : GOLD;
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" fill="none" aria-hidden="true">
      <rect x="26" y="8" width="40" height="76" rx="6" stroke={c} strokeWidth="3.5" />
      <rect x="34" y="18" width="24" height="50" rx="2" fill={c} opacity={active ? 0.25 : 0.12} />
      <circle cx="46" cy="76" r="2.6" fill={c} />
    </svg>
  );
}

interface CardConfig {
  orientation: KioskOrientation;
  title: string;
  subtitle: string;
  gradient: string;
  shadow: string;
  glyph: (active: boolean) => ReactNode;
}

const CARDS: CardConfig[] = [
  {
    orientation: 'landscape',
    title: 'Landscape',
    subtitle: 'Layar lebar / mendatar',
    gradient: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
    shadow: 'rgba(233,30,140,0.35)',
    glyph: (active) => <LandscapeGlyph active={active} />,
  },
  {
    orientation: 'portrait',
    title: 'Portrait',
    subtitle: 'Layar tinggi / berdiri',
    gradient: `linear-gradient(135deg, ${GOLD}, #B8860B)`,
    shadow: 'rgba(6,182,212,0.35)',
    glyph: (active) => <PortraitGlyph active={active} />,
  },
];

export function KioskOrientationSelect({ onSelect }: Props) {
  const handle = (o: KioskOrientation) => {
    kioskSound('select');
    onSelect(o);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 9500,
        background: 'linear-gradient(135deg, #FFF8F4 0%, #FFFFFF 50%, #ECFEFF 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 24,
      }}
    >
      {/* Signature top gradient strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${GOLD})`, zIndex: 20 }} />

      <AnimatedDentalBg />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 10, marginBottom: 14 }}
      >
        <OmdcLogo />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ fontSize: 34, fontWeight: 900, color: DARK, margin: '6px 0 4px', textAlign: 'center', position: 'relative', zIndex: 10 }}
      >
        Pilih Orientasi Layar
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 16, color: '#6B7280', marginBottom: 40, textAlign: 'center', position: 'relative', zIndex: 10 }}
      >
        Select screen orientation to continue
      </motion.p>

      <div style={{ display: 'flex', gap: 28, position: 'relative', zIndex: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {CARDS.map((card, i) => (
          <motion.button
            key={card.orientation}
            type="button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handle(card.orientation)}
            style={{
              width: 240,
              height: 260,
              borderRadius: 28,
              border: '2px solid rgba(0,0,0,0.06)',
              background: '#FFFFFF',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 18,
              padding: 24,
              transition: 'box-shadow 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = `0 16px 44px ${card.shadow}`;
              el.style.borderColor = 'transparent';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
              el.style.borderColor = 'rgba(0,0,0,0.06)';
            }}
          >
            <div
              style={{
                width: 132,
                height: 132,
                borderRadius: 28,
                background: card.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 10px 28px ${card.shadow}`,
              }}
            >
              {card.glyph(true)}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: DARK }}>{card.title}</div>
              <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>{card.subtitle}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ fontSize: 12, color: '#B0B7C3', marginTop: 36, position: 'relative', zIndex: 10 }}
      >
        Pengaturan dapat diubah kembali dari layar awal
      </motion.p>
    </div>
  );
}
