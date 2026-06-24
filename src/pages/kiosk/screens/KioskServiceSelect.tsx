import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { SERVICES } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';
import type { Service } from '../../../types';
import { kioskSound } from '../../../lib/kioskSound';
import { useIsPortrait } from '../../../context/KioskOrientationContext';

const PINK = '#E91E8C';
const DARK = '#0D1421';

export function KioskServiceSelect({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const portrait = useIsPortrait();

  const handleSelect = (service: Service) => {
    kioskSound('select');
    setState(prev => ({ ...prev, selectedService: service }));
    goTo('doctor-select');
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
        position: 'relative',
      }}
    >
      {/* 3px signature top strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        zIndex: 10,
      }} />

      {/* Header */}
      <div style={{
        padding: portrait ? '24px 32px 18px' : '24px 60px 18px',
        paddingTop: portrait ? '27px' : '27px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        {/* Step progress dots */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 10 }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              height: 5, borderRadius: 3,
              width: n === 1 ? 36 : 20,
              backgroundColor: n === 1 ? PINK : '#E5E7EB',
              transition: 'all 0.3s',
            }} />
          ))}
          <span style={{ fontSize: 11, fontWeight: 700, color: PINK, letterSpacing: '0.10em', textTransform: 'uppercase', marginLeft: 6 }}>
            {t ? 'Step 1 of 4' : 'Langkah 1 dari 4'}
          </span>
        </div>
        <div style={{ fontSize: 36, fontWeight: 900, color: DARK, marginBottom: 4, lineHeight: 1.1 }}>
          {t ? 'Select Service' : 'Pilih Layanan'}
        </div>
        <div style={{ fontSize: 16, color: '#6B7280' }}>
          {t ? 'Choose the dental service you need' : 'Pilih layanan gigi yang Anda butuhkan'}
        </div>
      </div>

      {/* Services grid */}
      <div style={{
        flex: 1,
        padding: portrait ? '24px 32px' : '24px 60px',
        display: 'grid',
        gridTemplateColumns: portrait ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gridTemplateRows: portrait ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
        gap: portrait ? '16px' : '20px',
        overflow: portrait ? 'auto' : 'hidden',
      }}>
        {SERVICES.map((service, index) => (
          <motion.button
            key={service.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(service)}
            style={{
              borderRadius: 20,
              border: `2px solid ${service.color}22`,
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              padding: '24px 16px',
              minHeight: 120,
              boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.border = `3px solid ${PINK}`;
              btn.style.boxShadow = `0 0 0 4px rgba(233,30,140,0.12), 0 8px 28px ${service.color}30`;
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.border = `2px solid ${service.color}22`;
              btn.style.boxShadow = '0 4px 18px rgba(0,0,0,0.07)';
            }}
          >
            {/* Left accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 4,
              background: `linear-gradient(180deg, ${service.color}, ${service.color}88)`,
              borderRadius: '4px 0 0 4px',
            }} />

            {/* Icon circle */}
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: service.color + '18',
              border: `2px solid ${service.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              flexShrink: 0,
            }}>
              {service.icon}
            </div>

            <div>
              <div style={{
                fontSize: 16,
                fontWeight: 800,
                color: DARK,
                textAlign: 'center',
                lineHeight: 1.3,
                marginBottom: 4,
              }}>
                {t ? service.nameEn : service.name}
              </div>
              <div style={{
                fontSize: 12,
                color: '#9CA3AF',
                textAlign: 'center',
                fontWeight: 500,
              }}>
                {service.duration} menit
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '16px 40px',
        borderTop: '1px solid #F3F4F6',
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
