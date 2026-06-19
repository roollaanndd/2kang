import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Ticket, CheckSquare, ClipboardList, Megaphone } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';
import type { KioskStep } from '../../../types';

interface MenuCard {
  icon: ReactNode;
  label: string;
  subtitle: string;
  step: KioskStep;
  gradient: string;
  shadow: string;
  queueType?: 'new' | 'checkin' | 'register';
}

const MENU_CARDS: MenuCard[] = [
  {
    icon: <Ticket size={48} strokeWidth={1.5} color="white" />,
    label: 'Ambil Nomor Antrian',
    subtitle: 'Pilih layanan & dokter untuk mendapat nomor antrian',
    step: 'service-select',
    gradient: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
    shadow: '0 8px 32px rgba(233,30,140,0.35)',
    queueType: 'new',
  },
  {
    icon: <CheckSquare size={48} strokeWidth={1.5} color="white" />,
    label: 'Check-in Pasien Lama',
    subtitle: 'Konfirmasi kedatangan untuk janji temu yang sudah ada',
    step: 'checkin',
    gradient: 'linear-gradient(135deg, #4FC3F7, #0288D1)',
    shadow: '0 8px 32px rgba(79,195,247,0.35)',
    queueType: 'checkin',
  },
  {
    icon: <ClipboardList size={48} strokeWidth={1.5} color="white" />,
    label: 'Registrasi Pasien Baru',
    subtitle: 'Daftarkan diri sebagai pasien baru OMDC Dental',
    step: 'new-patient',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    shadow: '0 8px 32px rgba(16,185,129,0.35)',
    queueType: 'register',
  },
  {
    icon: <Megaphone size={48} strokeWidth={1.5} color="white" />,
    label: 'Informasi & Promo',
    subtitle: 'Lihat promo terkini dan informasi layanan kami',
    step: 'info-promo',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    shadow: '0 8px 32px rgba(245,158,11,0.35)',
  },
];

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
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header area */}
      <div style={{
        padding: '36px 60px 24px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        <div style={{
          fontSize: '34px',
          fontWeight: '800',
          color: '#1A1A2E',
          marginBottom: '6px',
        }}>
          {t ? 'Please Select a Service' : 'Silakan Pilih Layanan'}
        </div>
        <div style={{ fontSize: '18px', color: '#6B7280' }}>
          {t ? 'What brings you here today?' : 'Apa yang bisa kami bantu hari ini?'}
        </div>
      </div>

      {/* Cards grid */}
      <div style={{
        flex: 1,
        padding: '32px 60px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '24px',
      }}>
        {MENU_CARDS.map((card, index) => (
          <motion.button
            key={card.step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(card)}
            style={{
              borderRadius: '24px',
              border: 'none',
              background: card.gradient,
              boxShadow: card.shadow,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px) scale(1.01)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
            }}
          >
            {/* Decorative bg circle */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
            }} />
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {card.icon}
            </div>

            {/* Content */}
            <div>
              <div style={{
                fontSize: '26px',
                fontWeight: '800',
                color: '#ffffff',
                marginBottom: '8px',
                lineHeight: '1.2',
                textAlign: 'left',
              }}>
                {card.label}
              </div>
              <div style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.85)',
                textAlign: 'left',
                lineHeight: '1.4',
              }}>
                {card.subtitle}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '16px 40px',
        borderTop: '1px solid #F3F4F6',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flexShrink: 0,
      }}>
        <button
          onClick={goBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            borderRadius: '14px',
            border: '2px solid #E5E7EB',
            backgroundColor: '#ffffff',
            color: '#6B7280',
            fontSize: '17px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#E91E8C';
            (e.currentTarget as HTMLButtonElement).style.color = '#E91E8C';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB';
            (e.currentTarget as HTMLButtonElement).style.color = '#6B7280';
          }}
        >
          <ChevronLeft size={20} />
          {t ? 'Back' : 'Kembali'}
        </button>
      </div>
    </motion.div>
  );
}
