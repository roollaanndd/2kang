import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';
import type { KioskStep } from '../../../types';
import { kioskSound } from '../../../lib/kioskSound';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';
const DARK = '#0D1421';

/* ── CSS Tooth decoration (white lines on dark) ── */
function ToothDecor({ color = 'rgba(255,255,255,0.08)', size = 200 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 100 115" fill="none" aria-hidden>
      <path
        d="M50 8C35 8 23 20 23 35c0 9 3 16 7 24 4 8 6.5 16 6.5 27 0 3 2 5 4.5 5h18c2.5 0 4.5-2 4.5-5 0-11 2.5-19 6.5-27 4-8 7-15 7-24C77 20 65 8 50 8z"
        stroke={color} strokeWidth="2" strokeLinejoin="round"
      />
      <line x1="44" y1="64" x2="41" y2="86" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="56" y1="64" x2="59" y2="86" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="66" x2="50" y2="90" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ fontVariantNumeric: 'tabular-nums', fontSize: 32, fontWeight: 900, color: DARK, letterSpacing: -1 }}>
      {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}

/* ── Custom SVG Icons ── */
function IconTicket() {
  return (
    <svg width={40} height={40} viewBox="0 0 44 44" fill="none">
      <rect x="4" y="10" width="36" height="24" rx="4" stroke="white" strokeWidth="1.6" />
      <path d="M14 10 C14 13.314 11.314 16 8 16 L4 16" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 34 C14 30.686 11.314 28 8 28 L4 28" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14" y1="14" x2="14" y2="30" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 3" />
      <line x1="20" y1="18" x2="34" y2="18" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="22" x2="30" y2="22" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="26" x2="32" y2="26" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconCheckin() {
  return (
    <svg width={40} height={40} viewBox="0 0 44 44" fill="none">
      <circle cx="18" cy="13" r="5.5" stroke="white" strokeWidth="1.6" />
      <path d="M6 36 C6 28.268 11.373 22 18 22 C21.068 22 23.874 23.268 26 25.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="32" cy="31" r="8" stroke="white" strokeWidth="1.6" />
      <path d="M27.5 31 L30.5 34 L36.5 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconClipboard() {
  return (
    <svg width={40} height={40} viewBox="0 0 44 44" fill="none">
      <rect x="8" y="10" width="28" height="30" rx="3" stroke="white" strokeWidth="1.6" />
      <path d="M16 10 L16 7 C16 6.448 16.448 6 17 6 L27 6 C27.552 6 28 6.448 28 7 L28 10" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="18" y="5" width="8" height="6" rx="1" stroke="white" strokeWidth="1.6" />
      <line x1="22" y1="19" x2="22" y2="31" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="16" y1="25" x2="28" y2="25" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconPromo() {
  return (
    <svg width={40} height={40} viewBox="0 0 44 44" fill="none">
      <path d="M8 16 L8 28 L14 28 L32 36 L32 8 L14 16 Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="8" y="16" width="6" height="12" rx="1" stroke="white" strokeWidth="1.6" />
      <path d="M35 15 C37 17 37 27 35 29" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 17 L20.9 19.7 L23.8 19.7 L21.5 21.4 L22.4 24.1 L20 22.4 L17.6 24.1 L18.5 21.4 L16.2 19.7 L19.1 19.7 Z" fill="white" opacity="0.9" />
    </svg>
  );
}

interface CardDef {
  id: string;
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  step: KioskStep;
  queueType?: 'new' | 'checkin' | 'register';
}

const CARDS: CardDef[] = [
  {
    id: 'queue',
    icon: <IconTicket />,
    label: 'Ambil Nomor Antrian',
    subtitle: 'Pilih layanan & dokter untuk nomor antrian Anda',
    step: 'service-select',
    queueType: 'new',
  },
  {
    id: 'checkin',
    icon: <IconCheckin />,
    label: 'Check-in Pasien Lama',
    subtitle: 'Konfirmasi kedatangan untuk janji temu Anda',
    step: 'checkin',
    queueType: 'checkin',
  },
  {
    id: 'register',
    icon: <IconClipboard />,
    label: 'Registrasi Pasien Baru',
    subtitle: 'Daftarkan diri sebagai pasien baru OMDC',
    step: 'new-patient',
    queueType: 'register',
  },
  {
    id: 'promo',
    icon: <IconPromo />,
    label: 'Info & Promo',
    subtitle: 'Lihat promo terkini & informasi layanan',
    step: 'info-promo',
  },
];

export function KioskMainMenu({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const [pressed, setPressed] = useState<string | null>(null);

  const handleSelect = (card: CardDef) => {
    kioskSound('select');
    setPressed(card.id);
    if (card.queueType) setState(prev => ({ ...prev, queueType: card.queueType }));
    setTimeout(() => goTo(card.step), 120);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        background: '#F2F4F8',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* 3px gradient brand strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${GOLD})`, zIndex: 20,
      }} />

      {/* ── TOP HEADER BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        style={{
          flexShrink: 0, height: 76,
          background: 'white',
          boxShadow: '0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center',
          padding: '0 36px',
          gap: 0, position: 'relative', zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 12px rgba(233,30,140,0.3)`,
          }}>
            <svg width={22} height={25} viewBox="0 0 100 115" fill="none">
              <path d="M50 8C35 8 23 20 23 35c0 9 3 16 7 24 4 8 6.5 16 6.5 27 0 3 2 5 4.5 5h18c2.5 0 4.5-2 4.5-5 0-11 2.5-19 6.5-27 4-8 7-15 7-24C77 20 65 8 50 8z"
                fill="white" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: DARK, letterSpacing: '-0.5px', lineHeight: 1, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              OMDC <span style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dental</span>
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginTop: 2, letterSpacing: '0.06em' }}>
              {t ? 'Healthy Smile · Confident' : 'Senyum Sehat · Percaya Diri'}
            </div>
          </div>
        </div>

        {/* Clock center */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LiveClock />
        </div>

        {/* Queue badge right */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#F8F9FC', borderRadius: 16,
          padding: '8px 18px', border: '1px solid rgba(0,0,0,0.07)',
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1 }}>
              {t ? 'Now Serving' : 'Antrian Saat Ini'}
            </div>
            <div style={{
              fontSize: 20, fontWeight: 900, lineHeight: 1.1, marginTop: 2,
              background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              A-042
            </div>
          </div>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4A017', display: 'block', boxShadow: '0 0 6px #D4A017', flexShrink: 0 }} />
        </div>
      </motion.div>

      {/* ── BENTO GRID ── */}
      <div style={{
        flex: 1, padding: '20px 24px 20px',
        display: 'grid',
        gridTemplateColumns: '3fr 2fr 2fr',
        gridTemplateRows: '1fr 1fr',
        gap: 16,
        overflow: 'hidden',
      }}>
        {/* MEGA CARD — spans 2 rows */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ gridRow: '1 / 3', cursor: 'pointer' }}
          onClick={() => handleSelect(CARDS[0])}
        >
          <div
            style={{
              height: '100%', borderRadius: 24,
              background: `linear-gradient(160deg, ${PINK} 0%, ${ROSE} 65%, #ffd8e6 100%)`,
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              padding: '32px 32px 28px',
              boxShadow: pressed === 'queue'
                ? `0 2px 8px rgba(233,30,140,0.3)`
                : '0 8px 32px rgba(233,30,140,0.28), 0 2px 8px rgba(233,30,140,0.14)',
              transform: pressed === 'queue' ? 'scale(0.98)' : 'scale(1)',
              transition: 'all 0.15s',
            }}
            onMouseDown={() => setPressed('queue')}
            onMouseUp={() => setPressed(null)}
            onMouseLeave={() => setPressed(null)}
          >
            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 60, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Tooth watermark */}
            <div style={{ position: 'absolute', bottom: 80, right: -20, opacity: 0.06, pointerEvents: 'none' }}>
              <ToothDecor color="white" size={180} />
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 20,
                background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                boxShadow: '0 8px 24px rgba(233,30,140,0.40)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <IconTicket />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                {t ? 'Queue System' : 'Sistem Antrian'}
              </div>
              <h2 style={{
                fontSize: 28, fontWeight: 900, color: 'white', lineHeight: 1.15, margin: 0,
                letterSpacing: '-0.5px', fontFamily: 'Plus Jakarta Sans, sans-serif',
                textShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}>
                {t ? 'Get Queue\nNumber' : 'Ambil Nomor\nAntrian'}
              </h2>
            </div>

            {/* Giant queue number */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                {t ? 'Next Number' : 'Nomor Berikutnya'}
              </div>
              <motion.div
                animate={{ textShadow: [`0 0 20px rgba(255,255,255,0.6)`, `0 0 40px rgba(255,255,255,0.9)`, `0 0 20px rgba(255,255,255,0.6)`] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontSize: 80, fontWeight: 900, lineHeight: 1, letterSpacing: -3,
                  color: 'white',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', fontVariantNumeric: 'tabular-nums',
                  marginBottom: 16,
                }}
              >
                A-043
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px',
                  background: 'white',
                  borderRadius: 100,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 800, color: PINK }}>
                  {t ? 'Ambil Antrian Sekarang' : 'Ambil Antrian Sekarang'}
                </span>
                <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke={PINK} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CENTER TOP: Check-in — glassmorphism aqua */}
        <BentoCard
          card={CARDS[1]}
          index={1}
          pressed={pressed}
          onPress={handleSelect}
          setPressed={setPressed}
          gradient={`linear-gradient(135deg, ${GOLD}, #B8860B)`}
          shadowColor="rgba(6,182,212,0.3)"
          cardBg="white"
          accent={GOLD}
          lang={t}
        />

        {/* RIGHT TOP: Registrasi — pink gradient bg */}
        <BentoCard
          card={CARDS[2]}
          index={2}
          pressed={pressed}
          onPress={handleSelect}
          setPressed={setPressed}
          gradient={`linear-gradient(135deg, ${PINK}, ${ROSE})`}
          shadowColor="rgba(233,30,140,0.3)"
          cardBg={`linear-gradient(135deg, ${PINK} 0%, ${ROSE} 100%)`}
          accent={PINK}
          lang={t}
          dark
        />

        {/* CENTER BOTTOM: Info & Promo — amber */}
        <BentoCard
          card={CARDS[3]}
          index={3}
          pressed={pressed}
          onPress={handleSelect}
          setPressed={setPressed}
          gradient="linear-gradient(135deg, #D4A017, #B8860B)"
          shadowColor="rgba(245,158,11,0.3)"
          cardBg="white"
          accent="#D4A017"
          lang={t}
        />

        {/* RIGHT BOTTOM: Back */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ cursor: 'pointer' }}
          onClick={() => { kioskSound('tap'); goBack(); }}
        >
          <div style={{
            height: '100%', borderRadius: 24,
            background: 'white',
            border: `2px solid rgba(0,0,0,0.08)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 12, padding: '24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            transition: 'all 0.15s',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              border: `2px solid rgba(0,0,0,0.10)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ArrowLeft size={22} color="#6B7280" />
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#6B7280', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t ? 'Back' : 'Kembali'}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Reusable bento card ── */
interface BentoCardProps {
  card: CardDef;
  index: number;
  pressed: string | null;
  onPress: (card: CardDef) => void;
  setPressed: (id: string | null) => void;
  gradient: string;
  shadowColor: string;
  cardBg: string;
  accent: string;
  lang: boolean;
  dark?: boolean;
}

function BentoCard({ card, index, pressed, onPress, setPressed, gradient, shadowColor, cardBg, accent, dark }: BentoCardProps) {
  const isPressed = pressed === card.id;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 + index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ cursor: 'pointer' }}
      onClick={() => onPress(card)}
    >
      <div
        style={{
          height: '100%', borderRadius: 22,
          background: cardBg,
          padding: '24px 22px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          boxShadow: isPressed
            ? `0 2px 8px ${shadowColor}`
            : `0 6px 24px ${shadowColor}, 0 2px 8px rgba(0,0,0,0.06)`,
          transform: isPressed ? 'scale(0.97)' : 'scale(1)',
          transition: 'all 0.15s',
          position: 'relative', overflow: 'hidden',
        }}
        onMouseDown={() => setPressed(card.id)}
        onMouseUp={() => setPressed(null)}
        onMouseLeave={() => setPressed(null)}
      >
        {/* Icon bezel */}
        <div style={{
          width: 60, height: 60, borderRadius: 18,
          background: gradient,
          boxShadow: `0 6px 20px ${shadowColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {card.icon}
        </div>

        <div>
          <div style={{
            fontSize: 18, fontWeight: 800, lineHeight: 1.2, marginBottom: 6,
            color: dark ? 'white' : DARK,
            fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.3px',
          }}>
            {card.label}
          </div>
          <div style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.65)' : '#6B7280', lineHeight: 1.5 }}>
            {card.subtitle}
          </div>
        </div>

        {/* Arrow indicator */}
        <div style={{
          position: 'absolute', bottom: 20, right: 20,
          width: 32, height: 32, borderRadius: '50%',
          background: dark ? 'rgba(255,255,255,0.15)' : `rgba(${accent === '#D4A017' ? '245,158,11' : accent === GOLD ? '6,182,212' : '233,30,140'},0.10)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke={dark ? 'white' : accent} strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
