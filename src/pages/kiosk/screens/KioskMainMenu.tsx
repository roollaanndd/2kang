import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import type { KioskScreenProps } from '../KioskLayout';
import type { KioskStep } from '../../../types';
import { kioskSound } from '../../../lib/kioskSound';
import { useIsPortrait } from '../../../context/KioskOrientationContext';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const DARK = '#0D1421';

/* ─── Custom SVG Icons ──────────────────────────────────────────────── */

function IconTicket() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ticket body */}
      <rect x="4" y="10" width="36" height="24" rx="4" stroke="white" strokeWidth="1.5" />
      {/* perforated left notch */}
      <path d="M14 10 C14 13.314 11.314 16 8 16 L4 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 34 C14 30.686 11.314 28 8 28 L4 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* vertical dashed separator */}
      <line x1="14" y1="14" x2="14" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" />
      {/* text lines on right half */}
      <line x1="20" y1="18" x2="34" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="22" x2="30" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="26" x2="32" y2="26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* number badge on stub */}
      <circle cx="9" cy="22" r="3" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function IconCheckinPerson() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* person head */}
      <circle cx="18" cy="13" r="5.5" stroke="white" strokeWidth="1.5" />
      {/* person body */}
      <path d="M6 36 C6 28.268 11.373 22 18 22 C21.068 22 23.874 23.268 26 25.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* big checkmark */}
      <circle cx="32" cy="31" r="8" stroke="white" strokeWidth="1.5" />
      <path d="M27.5 31 L30.5 34 L36.5 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* clipboard body */}
      <rect x="8" y="10" width="28" height="30" rx="3" stroke="white" strokeWidth="1.5" />
      {/* clipboard top clip */}
      <path d="M16 10 L16 7 C16 6.448 16.448 6 17 6 L27 6 C27.552 6 28 6.448 28 7 L28 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* clip centre rect */}
      <rect x="18" y="5" width="8" height="6" rx="1" stroke="white" strokeWidth="1.5" />
      {/* plus sign for "new" */}
      <line x1="22" y1="19" x2="22" y2="31" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="25" x2="28" y2="25" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconMegaphone() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* megaphone cone */}
      <path d="M8 16 L8 28 L14 28 L32 36 L32 8 L14 16 Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      {/* speaker box */}
      <rect x="8" y="16" width="6" height="12" rx="1" stroke="white" strokeWidth="1.5" />
      {/* handle/cord drop */}
      <path d="M14 28 L14 38" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* sound waves */}
      <path d="M35 15 C37 17 37 27 35 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* star accent */}
      <path d="M20 17 L20.9 19.7 L23.8 19.7 L21.5 21.4 L22.4 24.1 L20 22.4 L17.6 24.1 L18.5 21.4 L16.2 19.7 L19.1 19.7 Z" fill="white" opacity="0.9" />
    </svg>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────── */

interface MenuCard {
  icon: ReactNode;
  label: string;
  subtitle: string;
  step: KioskStep;
  gradient: string;
  shadowColor: string;
  accentColor: string;
  queueType?: 'new' | 'checkin' | 'register';
}

const MENU_CARDS: MenuCard[] = [
  {
    icon: <IconTicket />,
    label: 'Ambil Nomor Antrian',
    subtitle: 'Pilih layanan & dokter untuk mendapat nomor antrian',
    step: 'service-select',
    gradient: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
    shadowColor: 'rgba(233,30,140,0.3)',
    accentColor: PINK,
    queueType: 'new',
  },
  {
    icon: <IconCheckinPerson />,
    label: 'Check-in Pasien Lama',
    subtitle: 'Konfirmasi kedatangan untuk janji temu yang sudah ada',
    step: 'checkin',
    gradient: 'linear-gradient(135deg, #06B6D4, #0284C7)',
    shadowColor: 'rgba(6,182,212,0.3)',
    accentColor: AQUA,
    queueType: 'checkin',
  },
  {
    icon: <IconClipboard />,
    label: 'Registrasi Pasien Baru',
    subtitle: 'Daftarkan diri sebagai pasien baru OMDC Dental',
    step: 'new-patient',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    shadowColor: 'rgba(16,185,129,0.3)',
    accentColor: '#10B981',
    queueType: 'register',
  },
  {
    icon: <IconMegaphone />,
    label: 'Informasi & Promo',
    subtitle: 'Lihat promo terkini dan informasi layanan kami',
    step: 'info-promo',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    shadowColor: 'rgba(245,158,11,0.3)',
    accentColor: '#F59E0B',
  },
];

/* ─── Component ─────────────────────────────────────────────────────── */

export function KioskMainMenu({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const portrait = useIsPortrait();

  const handleSelect = (card: MenuCard) => {
    kioskSound('select');
    if (card.queueType) {
      setState(prev => ({ ...prev, queueType: card.queueType }));
    }
    goTo(card.step);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35 }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: portrait ? 'column' : 'row',
        background: '#FAFAFA',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── BRAND PANEL — left sidebar in landscape, top band in portrait ── */}
      <div style={{
        width: portrait ? '100%' : 320,
        flexShrink: 0,
        background: 'linear-gradient(165deg, #FFF5F9 0%, #FFE4F1 52%, #ECFEFF 100%)',
        borderRight: portrait ? 'none' : '1px solid rgba(233,30,140,0.10)',
        borderBottom: portrait ? '1px solid rgba(233,30,140,0.10)' : 'none',
        display: 'flex',
        flexDirection: portrait ? 'row' : 'column',
        alignItems: portrait ? 'center' : 'stretch',
        justifyContent: portrait ? 'space-between' : 'flex-start',
        gap: portrait ? 24 : 0,
        flexWrap: portrait ? 'wrap' : 'nowrap',
        padding: portrait ? '24px 40px' : '44px 36px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top gradient strip */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`,
        }} />

        {/* Decorative tooth watermark */}
        <svg
          style={{ position: 'absolute', bottom: -20, right: -40, opacity: 0.05, pointerEvents: 'none' }}
          width={240} height={280} viewBox="0 0 100 115" fill="none"
        >
          <path
            d="M50 5C33 5 19 18 19 34c0 10 3.5 18 8 27 4.5 9 7 17 7 28 0 3 2.5 5.5 5.5 5.5h21c3 0 5.5-2.5 5.5-5.5 0-11 2.5-19 7-28 4.5-9 8-17 8-27C81 18 67 5 50 5z"
            fill={PINK}
          />
        </svg>

        {/* Decorative ring accents */}
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 180, height: 180,
          borderRadius: '50%', border: `1px solid rgba(233,30,140,0.12)`, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 80, right: -20, width: 100, height: 100,
          borderRadius: '50%', border: `1px solid rgba(255,107,181,0.08)`, pointerEvents: 'none',
        }} />

        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: portrait ? 0 : 40 }}
        >
          <div style={{ fontSize: 26, fontWeight: 900, color: DARK, letterSpacing: '-0.5px' }}>
            OMDC{' '}
            <span style={{
              background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Dental</span>
          </div>
          <div style={{
            fontSize: 11, color: '#9CA3AF', marginTop: 4,
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            {t ? 'Healthy Smile · Confident' : 'Senyum Sehat · Percaya Diri'}
          </div>
        </motion.div>

        {/* Quick stats */}
        {[
          { num: '5000+', label: t ? 'Happy Patients' : 'Pasien Puas' },
          { num: '15 Thn', label: t ? 'Experience' : 'Pengalaman' },
          { num: '8 Dokter', label: t ? 'Specialists' : 'Spesialis' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.18 + i * 0.08 }}
            style={{ marginBottom: portrait ? 0 : 28 }}
          >
            <div style={{ fontSize: 30, fontWeight: 900, color: PINK, lineHeight: 1, letterSpacing: '-0.5px' }}>
              {s.num}
            </div>
            <div style={{ fontSize: 13, color: '#6B7280', marginTop: 3, fontWeight: 500 }}>
              {s.label}
            </div>
          </motion.div>
        ))}

        {/* Active status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: portrait ? 'none' : 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.22)',
            borderRadius: 20, padding: '6px 14px', marginBottom: portrait ? 0 : 24, alignSelf: portrait ? 'center' : 'flex-start',
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#10B981', display: 'block',
            boxShadow: '0 0 6px #10B981',
          }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#6EE7B7' }}>
            {t ? 'Kiosk Active' : 'Kiosk Aktif'}
          </span>
        </motion.div>

        {/* Bottom: date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: portrait ? 0 : 'auto', display: portrait ? 'none' : 'block' }}
        >
          <div style={{ fontSize: 11, color: '#9CA3AF', letterSpacing: '0.06em', lineHeight: 1.6 }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT CONTENT PANEL ── */}
      <div style={{
        flex: 1,
        padding: '44px 48px 20px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ marginBottom: 28, flexShrink: 0 }}
        >
          <div style={{
            fontSize: 13, fontWeight: 700, color: PINK,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8,
          }}>
            {t ? 'Welcome' : 'Selamat Datang'}
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: DARK, lineHeight: 1.1, margin: 0 }}>
            {t ? 'How can we help\nyou today?' : 'Apa yang bisa\nkami bantu hari ini?'}
          </h1>
        </motion.div>

        {/* Menu cards grid */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '18px',
          overflow: 'hidden',
        }}>
          {MENU_CARDS.map((card, index) => (
            <MenuCardItem
              key={card.step}
              card={card}
              index={index}
              onSelect={() => handleSelect(card)}
            />
          ))}
        </div>

        {/* Back button */}
        <div style={{ paddingTop: 16, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={goBack}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', borderRadius: 999,
              border: '1.5px solid rgba(0,0,0,0.10)', backgroundColor: 'white',
              color: '#6B7280', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = PINK;
              el.style.color = PINK;
              el.style.boxShadow = '0 4px 16px rgba(233,30,140,0.15)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = 'rgba(0,0,0,0.10)';
              el.style.color = '#6B7280';
              el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }}
          >
            <ChevronLeft size={18} />
            {t ? 'Back' : 'Kembali'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Single Card ───────────────────────────────────────────────────── */

interface MenuCardItemProps {
  card: MenuCard;
  index: number;
  onSelect: () => void;
}

function MenuCardItem({ card, index, onSelect }: MenuCardItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      style={{ cursor: 'pointer', position: 'relative' }}
      onClick={onSelect}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          padding: '28px 24px 24px',
          border: '2px solid transparent',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: '100%',
          boxSizing: 'border-box',
          transition: 'all 0.2s',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = `0 12px 40px ${card.shadowColor}`;
          el.style.borderColor = card.accentColor + '40';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
          el.style.borderColor = 'transparent';
        }}
      >
        {/* Left accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: 4,
          background: card.gradient,
          borderRadius: '4px 0 0 4px',
        }} />

        {/* Icon container */}
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          background: card.gradient,
          boxShadow: `0 8px 24px ${card.shadowColor}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 18, flexShrink: 0,
        }}>
          {card.icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: DARK, lineHeight: 1.2, marginBottom: 6 }}>
            {card.label}
          </div>
          <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, fontWeight: 400 }}>
            {card.subtitle}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
