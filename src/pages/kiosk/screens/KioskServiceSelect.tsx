import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { SERVICES } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';
import type { Service } from '../../../types';

export function KioskServiceSelect({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';

  const handleSelect = (service: Service) => {
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
      }}
    >
      {/* Header */}
      <div style={{
        padding: '28px 60px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '34px', fontWeight: '800', color: '#1A1A2E', marginBottom: '4px' }}>
          {t ? 'Select Service' : 'Pilih Layanan'}
        </div>
        <div style={{ fontSize: '17px', color: '#6B7280' }}>
          {t ? 'Choose the dental service you need' : 'Pilih layanan gigi yang Anda butuhkan'}
        </div>
      </div>

      {/* Services grid */}
      <div style={{
        flex: 1,
        padding: '24px 60px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '20px',
        overflow: 'hidden',
      }}>
        {SERVICES.map((service, index) => (
          <motion.button
            key={service.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(service)}
            style={{
              borderRadius: '20px',
              border: `2px solid ${service.color}22`,
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              padding: '24px 16px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = service.color + '12';
              btn.style.borderColor = service.color;
              btn.style.boxShadow = `0 6px 24px ${service.color}30`;
              btn.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = '#ffffff';
              btn.style.borderColor = service.color + '22';
              btn.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
              btn.style.transform = 'translateY(0)';
            }}
          >
            {/* Icon circle */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: service.color + '20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              flexShrink: 0,
            }}>
              {service.icon}
            </div>

            <div>
              <div style={{
                fontSize: '17px',
                fontWeight: '700',
                color: '#1A1A2E',
                textAlign: 'center',
                lineHeight: '1.3',
                marginBottom: '4px',
              }}>
                {t ? service.nameEn : service.name}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#9CA3AF',
                textAlign: 'center',
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
