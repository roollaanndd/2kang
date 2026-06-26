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

export function KioskMainMenu({ state, setState, goTo }: KioskScreenProps) {
  const t = state.language === 'en';
  const [hovered, setHovered] = useState<string | null>(null);

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
        background: '#F9FAFB',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* 3px gradient brand strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 20,
      }} />

      {/* ── HEADER ── */}
      <div style={{
        flexShrink: 0, height: 72, paddingTop: 3,
        background: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center',
        padding: '3px 32px 0',
        position: 'relative', zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '33%' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 12px rgba(233,30,140,0.28)`,
          }}>
            <svg width={20} height={23} viewBox="0 0 100 115" fill="none">
              <path d="M50 8C35 8 23 20 23 35c0 9 3 16 7 24 4 8 6.5 16 6.5 27 0 3 2 5 4.5 5h18c2.5 0 4.5-2 4.5-5 0-11 2.5-19 6.5-27 4-8 7-15 7-24C77 20 65 8 50 8z" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: DARK, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            OMDC{' '}
            <span style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Dental
            </span>
          </span>
        </div>

        {/* Live clock — center */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <LiveClock />
        </div>

        {/* Queue badge — right */}
        <div style={{ width: '33%', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#F9FAFB', borderRadius: 14, padding: '7px 16px',
            border: '1px solid rgba(0,0,0,0.07)',
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1 }}>
                {t ? 'Now Serving' : 'Antrian Saat Ini'}
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: DARK, lineHeight: 1.1, marginTop: 2, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {CURRENT_QUEUE}
              </div>
            </div>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'block', boxShadow: '0 0 6px #10B981' }}
            />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px 32px',
        position: 'relative',
      }}>
        {/* Atmospheric blurs */}
        <div style={{ position: 'absolute', top: 16, left: 16, width: 240, height: 240, borderRadius: '50%', background: 'rgba(233,30,140,0.04)', filter: 'blur(48px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 16, right: 16, width: 280, height: 280, borderRadius: '50%', background: 'rgba(6,182,212,0.04)', filter: 'blur(56px)', pointerEvents: 'none' }} />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <h1 style={{
            fontSize: 40, fontWeight: 900, color: DARK, lineHeight: 1.1,
            margin: 0, marginBottom: 10,
            fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.5px',
          }}>
            {t ? 'Choose Menu' : 'Pilih Menu'}
          </h1>
          <p style={{ fontSize: 18, color: '#6B7280', margin: 0 }}>
            {t ? 'What would you like to do today?' : 'Apa yang ingin Anda lakukan hari ini?'}
          </p>
        </motion.div>

        {/* Card grid — 2 wide top + 2 wide bottom, larger targets */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 18, width: '100%', maxWidth: 880,
        }}>
          {CARDS.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => handleSelect(card)}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'white', borderRadius: 26,
                padding: '32px 28px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                gap: 18, minHeight: 200,
                border: `1.5px solid ${hovered === card.id ? card.gradFrom + '44' : 'rgba(0,0,0,0.06)'}`,
                boxShadow: hovered === card.id
                  ? `0 12px 40px ${card.shadowColor}, 0 4px 12px rgba(0,0,0,0.04)`
                  : '0 4px 18px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                transform: hovered === card.id ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              <div style={{
                width: 96, height: 96, borderRadius: 26,
                background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 28px ${card.shadowColor}`,
                transition: 'transform 0.25s',
                transform: hovered === card.id ? 'scale(1.06)' : 'scale(1)',
              }}>
                {card.icon}
              </div>
              <div>
                <div style={{
                  fontSize: 22, fontWeight: 800, color: DARK,
                  marginBottom: 8, lineHeight: 1.2,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  {t ? card.labelEn : card.label}
                </div>
                <div style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.5 }}>
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
        background: 'white', borderTop: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
      }}>
        <button
          disabled
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '1.5px solid rgba(0,0,0,0.10)', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.35, cursor: 'not-allowed',
          }}
        >
          <ChevronLeft size={20} color={DARK} />
        </button>

        <button style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px',
          borderRadius: 100, background: '#FFF5F9',
          border: '1.5px solid rgba(233,30,140,0.14)',
          color: PINK, fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>
          <HelpCircle size={18} color={PINK} />
          {t ? 'Need Help?' : 'Butuh Bantuan?'}
        </button>

        <div style={{ fontSize: 12, color: '#C0C4CC', fontWeight: 500, letterSpacing: '0.05em' }}>
          OMDC Digital v2.9
        </div>
      </div>
    </motion.div>
  );
}
