import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import type { KioskScreenProps } from '../KioskLayout';
import type { KioskStep } from '../../../types';

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
  tint: string;
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
    tint: 'rgba(233,30,140,0.04)',
    queueType: 'new',
  },
  {
    icon: <IconCheckinPerson />,
    label: 'Check-in Pasien Lama',
    subtitle: 'Konfirmasi kedatangan untuk janji temu yang sudah ada',
    step: 'checkin',
    gradient: 'linear-gradient(135deg, #06B6D4, #0284C7)',
    shadowColor: 'rgba(6,182,212,0.3)',
    tint: 'rgba(6,182,212,0.04)',
    queueType: 'checkin',
  },
  {
    icon: <IconClipboard />,
    label: 'Registrasi Pasien Baru',
    subtitle: 'Daftarkan diri sebagai pasien baru OMDC Dental',
    step: 'new-patient',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    shadowColor: 'rgba(16,185,129,0.3)',
    tint: 'rgba(16,185,129,0.04)',
    queueType: 'register',
  },
  {
    icon: <IconMegaphone />,
    label: 'Informasi & Promo',
    subtitle: 'Lihat promo terkini dan informasi layanan kami',
    step: 'info-promo',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    shadowColor: 'rgba(245,158,11,0.3)',
    tint: 'rgba(245,158,11,0.04)',
  },
];

/* ─── Component ─────────────────────────────────────────────────────── */

export function KioskMainMenu({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';

  const handleSelect = (card: MenuCard) => {
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
        backgroundColor: '#F8F9FB',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Pink accent strip at very top ── */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        flexShrink: 0,
        zIndex: 10,
      }} />

      {/* ── Soft radial mesh background blobs ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* top-left rose blob */}
        <div style={{
          position: 'absolute',
          top: '-120px',
          left: '-120px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 70%)',
        }} />
        {/* bottom-right aqua blob */}
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          right: '-80px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
        }} />
        {/* centre amber blob */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 60%)',
        }} />
      </div>

      {/* ── Header ── */}
      <div style={{
        padding: '32px 60px 24px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Eyebrow pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(233,30,140,0.08)',
            border: '1px solid rgba(233,30,140,0.18)',
            borderRadius: '999px',
            padding: '5px 14px',
            marginBottom: '14px',
          }}
        >
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#E91E8C',
          }} />
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#E91E8C',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {t ? 'OMDC Dental Kiosk' : 'Kiosk OMDC Dental'}
          </span>
        </motion.div>

        {/* Big title */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{
            fontSize: '36px',
            fontWeight: 900,
            color: '#111827',
            lineHeight: 1.15,
            marginBottom: '6px',
          }}
        >
          {t ? 'Please Select a Service' : 'Silakan Pilih Layanan'}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ fontSize: '16px', color: '#6B7280', fontWeight: 500 }}
        >
          {t ? 'What brings you here today?' : 'Apa yang bisa kami bantu hari ini?'}
        </motion.div>
      </div>

      {/* ── Cards Grid ── */}
      <div style={{
        flex: 1,
        padding: '8px 52px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '20px',
        position: 'relative',
        zIndex: 1,
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

      {/* ── Bottom Bar ── */}
      <div style={{
        padding: '14px 52px 18px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={goBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 26px',
            borderRadius: '999px',
            border: '1.5px solid rgba(0,0,0,0.10)',
            backgroundColor: 'white',
            color: '#6B7280',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            transition: 'all 0.18s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.borderColor = '#E91E8C';
            el.style.color = '#E91E8C';
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{ cursor: 'pointer' }}
      onClick={onSelect}
    >
      {/* ── Outer shell (double-bezel layer 1) ── */}
      <div
        style={{
          borderRadius: '32px',
          padding: '6px',
          background: 'white',
          border: '1px solid rgba(233,30,140,0.08)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
          height: '100%',
          boxSizing: 'border-box',
          transition: 'box-shadow 0.22s, border-color 0.22s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = `0 16px 48px ${card.shadowColor}`;
          el.style.borderColor = card.shadowColor.replace('0.3)', '0.25)');
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.06)';
          el.style.borderColor = 'rgba(233,30,140,0.08)';
        }}
      >
        {/* ── Inner core (double-bezel layer 2) ── */}
        <div style={{
          borderRadius: '26px',
          background: card.tint,
          padding: '32px',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {/* Icon container */}
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '28px',
            background: card.gradient,
            boxShadow: `0 12px 32px ${card.shadowColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            {card.icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.2,
              marginBottom: '8px',
            }}>
              {card.label}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: 1.5,
              fontWeight: 400,
            }}>
              {card.subtitle}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
