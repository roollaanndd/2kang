import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, ListOrdered, Info, UserPlus, HelpCircle, ChevronLeft } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';
import type { KioskStep } from '../../../types';
import { kioskSound } from '../../../lib/kioskSound';
import { CURRENT_QUEUE } from '../../../data/mockData';

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
    <div style={{
      fontVariantNumeric: 'tabular-nums', fontSize: 28, fontWeight: 900,
      color: DARK, letterSpacing: -1, fontFamily: 'Plus Jakarta Sans, sans-serif',
    }}>
      {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}

interface CardDef {
  id: string;
  label: string;
  labelEn: string;
  subtitle: string;
  subtitleEn: string;
  step: KioskStep;
  gradFrom: string;
  gradTo: string;
  shadowColor: string;
  queueType?: 'new' | 'checkin' | 'register';
  icon: ReactNode;
}

const CARDS: CardDef[] = [
  {
    id: 'queue',
    label: 'Daftar Antrian',
    labelEn: 'Get Queue Number',
    subtitle: 'Check-in & ambil nomor urut',
    subtitleEn: 'Check-in & take your queue number',
    step: 'service-select',
    queueType: 'new',
    gradFrom: PINK,
    gradTo: ROSE,
    shadowColor: 'rgba(233,30,140,0.22)',
    icon: <CalendarDays size={44} color="white" />,
  },
  {
    id: 'status',
    label: 'Status Antrian',
    labelEn: 'Queue Status',
    subtitle: 'Cek nomor antrean Anda saat ini',
    subtitleEn: 'Check your current queue number',
    step: 'queue-display',
    gradFrom: AQUA,
    gradTo: '#22D3EE',
    shadowColor: 'rgba(6,182,212,0.22)',
    icon: <ListOrdered size={44} color="white" />,
  },
  {
    id: 'promo',
    label: 'Info & Promo',
    labelEn: 'Info & Promotions',
    subtitle: 'Lihat promosi dan jadwal dokter',
    subtitleEn: 'View promotions and doctor schedules',
    step: 'info-promo',
    gradFrom: ROSE,
    gradTo: '#FCA5A5',
    shadowColor: 'rgba(255,107,181,0.22)',
    icon: <Info size={44} color="white" />,
  },
  {
    id: 'register',
    label: 'Pasien Baru',
    labelEn: 'New Patient',
    subtitle: 'Registrasi untuk kunjungan pertama',
    subtitleEn: 'Register for your first visit',
    step: 'new-patient',
    queueType: 'register',
    gradFrom: '#10B981',
    gradTo: '#34D399',
    shadowColor: 'rgba(16,185,129,0.22)',
    icon: <UserPlus size={44} color="white" />,
  },
];

const FONT = "'Nunito Sans', 'Plus Jakarta Sans', sans-serif";

// Pastel backgrounds per card accent color (claymorphism tinted surfaces)
const CARD_BG: Record<string, string> = {
  queue: '#FFF0F8',
  status: '#F0FCFE',
  promo: '#FFF4FB',
  register: '#F0FDF4',
};
const CARD_BORDER: Record<string, string> = {
  queue: 'rgba(233,30,140,0.20)',
  status: 'rgba(6,182,212,0.22)',
  promo: 'rgba(255,107,181,0.22)',
  register: 'rgba(16,185,129,0.22)',
};

export function KioskMainMenu({ state, setState, goTo }: KioskScreenProps) {
  const t = state.language === 'en';

  const handleSelect = (card: CardDef) => {
    kioskSound('select');
    if (card.queueType) setState(prev => ({ ...prev, queueType: card.queueType }));
    goTo(card.step);
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
        background: '#FFF5F9',
        position: 'relative', overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      {/* 4px brand strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 20,
      }} />

      {/* Clay background circles */}
      <div style={{ position: 'absolute', top: -80, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(6,182,212,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 340, height: 340, borderRadius: '50%', background: 'rgba(233,30,140,0.04)', pointerEvents: 'none' }} />

      {/* ── HEADER ── */}
      <div style={{
        flexShrink: 0, height: 76, paddingTop: 4,
        background: 'white',
        borderBottom: '1px solid rgba(233,30,140,0.08)',
        display: 'flex', alignItems: 'center',
        padding: '4px 36px 0',
        position: 'relative', zIndex: 10,
        boxShadow: '0 2px 12px rgba(233,30,140,0.06)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '33%' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'white',
            border: `3px solid rgba(233,30,140,0.18)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 3px 10px rgba(233,30,140,0.15)',
          }}>
            <svg width={22} height={26} viewBox="0 0 100 115" fill="none">
              <path d="M50 8C35 8 23 20 23 35c0 9 3 16 7 24 4 8 6.5 16 6.5 27 0 3 2 5 4.5 5h18c2.5 0 4.5-2 4.5-5 0-11 2.5-19 6.5-27 4-8 7-15 7-24C77 20 65 8 50 8z" fill={PINK} />
              <path d="M43 54l5 5 9-11" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 900, color: DARK, fontFamily: FONT }}>
            OMDC <span style={{ color: PINK }}>Dental</span>
          </span>
        </div>

        {/* Live clock */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <LiveClock />
        </div>

        {/* Queue badge */}
        <div style={{ width: '33%', display: 'flex', justifyContent: 'flex-end' }}>
          <div className="clay-pill" style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px',
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.10em', lineHeight: 1 }}>
                {t ? 'Now Serving' : 'Antrian Saat Ini'}
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: DARK, lineHeight: 1.1, marginTop: 2, fontFamily: FONT }}>
                {CURRENT_QUEUE}
              </div>
            </div>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 9, height: 9, borderRadius: '50%', background: '#10B981', display: 'block', boxShadow: '0 0 8px #10B981' }}
            />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px 36px',
      }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <h1 style={{
            fontSize: 40, fontWeight: 900, color: DARK, lineHeight: 1.1,
            margin: 0, marginBottom: 8, fontFamily: FONT,
          }}>
            {t ? 'Choose Menu' : 'Pilih Menu'}
          </h1>
          <p style={{ fontSize: 18, color: '#9CA3AF', margin: 0, fontWeight: 600 }}>
            {t ? 'What would you like to do today?' : 'Apa yang ingin Anda lakukan hari ini?'}
          </p>
        </motion.div>

        {/* Clay card grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20, width: '100%', maxWidth: 900,
        }}>
          {CARDS.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97, y: 3 }}
              transition={{ delay: 0.08 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => handleSelect(card)}
              style={{
                background: CARD_BG[card.id] ?? 'white',
                borderRadius: 28,
                padding: '28px 24px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                gap: 16, minHeight: 192,
                border: `3px solid ${CARD_BORDER[card.id] ?? 'rgba(0,0,0,0.08)'}`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.85), 0 4px 0 ${card.shadowColor.replace('0.22', '0.18')}, 0 8px 24px ${card.shadowColor}, 0 20px 40px rgba(0,0,0,0.05)`,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                fontFamily: FONT,
              }}
            >
              {/* Icon bezel */}
              <div style={{
                width: 88, height: 88, borderRadius: 24,
                background: `linear-gradient(145deg, ${card.gradFrom}, ${card.gradTo})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 0 ${card.shadowColor.replace('0.22', '0.35')}, 0 10px 24px ${card.shadowColor}`,
              }}>
                {card.icon}
              </div>
              <div>
                <div style={{
                  fontSize: 22, fontWeight: 900, color: DARK,
                  marginBottom: 6, lineHeight: 1.2, fontFamily: FONT,
                }}>
                  {t ? card.labelEn : card.label}
                </div>
                <div style={{ fontSize: 15, color: '#9CA3AF', lineHeight: 1.5, fontWeight: 600 }}>
                  {t ? card.subtitleEn : card.subtitle}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        flexShrink: 0, height: 68,
        background: 'white', borderTop: '1px solid rgba(233,30,140,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 36px',
        boxShadow: '0 -2px 12px rgba(233,30,140,0.05)',
      }}>
        <button
          disabled
          style={{
            width: 46, height: 46, borderRadius: 14,
            border: '2px solid rgba(0,0,0,0.08)', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.3, cursor: 'not-allowed',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          <ChevronLeft size={20} color={DARK} />
        </button>

        <button className="clay-btn-ghost" style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px',
          fontSize: 14, fontFamily: FONT,
        }}>
          <HelpCircle size={18} color={PINK} />
          {t ? 'Need Help?' : 'Butuh Bantuan?'}
        </button>

        <div style={{ fontSize: 12, color: '#C0C4CC', fontWeight: 600, letterSpacing: '0.06em', fontFamily: FONT }}>
          OMDC Digital v2.9
        </div>
      </div>
    </motion.div>
  );
}
