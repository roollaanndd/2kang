import { motion } from 'motion/react';
import { ChevronLeft, Star, Clock } from 'lucide-react';
import { DOCTORS } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';
import type { Doctor } from '../../../types';
import { kioskSound } from '../../../lib/kioskSound';

const AVATAR_COLORS = ['#E91E8C', '#4FC3F7', '#F59E0B', '#10B981'];

export function KioskDoctorSelect({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';

  const handleSelect = (doctor: Doctor) => {
    if (!doctor.available) {
      kioskSound('error');
      return;
    }
    kioskSound('select');
    setState(prev => ({ ...prev, selectedDoctor: doctor }));
    goTo('date-select');
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
          {t ? 'Select Doctor' : 'Pilih Dokter'}
        </div>
        <div style={{ fontSize: '17px', color: '#6B7280' }}>
          {state.selectedService && (
            <>
              {t ? 'For' : 'Untuk'}{' '}
              <span style={{ color: '#E91E8C', fontWeight: '700' }}>
                {t ? state.selectedService.nameEn : state.selectedService.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Doctors list */}
      <div style={{
        flex: 1,
        padding: '28px 60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflowY: 'auto',
      }}>
        {DOCTORS.map((doctor, index) => (
          <motion.button
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            whileTap={doctor.available ? { scale: 0.98 } : {}}
            onClick={() => handleSelect(doctor)}
            disabled={!doctor.available}
            style={{
              borderRadius: '20px',
              border: `2px solid ${doctor.available ? '#E91E8C22' : '#E5E7EB'}`,
              backgroundColor: doctor.available ? '#ffffff' : '#F9FAFB',
              cursor: doctor.available ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '24px 28px',
              boxShadow: doctor.available ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
              opacity: doctor.available ? 1 : 0.6,
              transition: 'all 0.2s',
              textAlign: 'left',
            }}
            onMouseEnter={e => {
              if (!doctor.available) return;
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = '#E91E8C';
              btn.style.boxShadow = '0 6px 24px rgba(233,30,140,0.18)';
              btn.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              if (!doctor.available) return;
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = '#E91E8C22';
              btn.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
              btn.style.transform = 'translateY(0)';
            }}
          >
            {/* Avatar — photo if available, else coloured monogram */}
            <div style={{
              width: '88px',
              height: '88px',
              borderRadius: '24px',
              backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: '800',
              color: '#ffffff',
              flexShrink: 0,
              overflow: 'hidden',
              boxShadow: doctor.available ? `0 6px 20px ${AVATAR_COLORS[index % AVATAR_COLORS.length]}40` : 'none',
            }}>
              {doctor.photo
                ? <img src={doctor.photo} alt={doctor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : doctor.name.split(' ')[1]?.[0] || doctor.name[0]
              }
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#1A1A2E',
                marginBottom: '4px',
              }}>
                {doctor.name}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#6B7280',
                marginBottom: '10px',
              }}>
                {t ? doctor.specialtyEn : doctor.specialty}
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1A2E' }}>
                    {doctor.rating}
                  </span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                    ({doctor.reviewCount})
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} color="#9CA3AF" />
                  <span style={{ fontSize: '13px', color: '#6B7280' }}>
                    {doctor.experience} {t ? 'yrs exp.' : 'thn pengalaman'}
                  </span>
                </div>
              </div>
            </div>

            {/* Availability badge */}
            <div style={{
              flexShrink: 0,
              padding: '8px 20px',
              borderRadius: '40px',
              backgroundColor: doctor.available ? '#D1FAE5' : '#FEE2E2',
              color: doctor.available ? '#065F46' : '#991B1B',
              fontSize: '15px',
              fontWeight: '700',
            }}>
              {doctor.available
                ? (t ? 'Available' : 'Tersedia')
                : (t ? 'Unavailable' : 'Tidak Tersedia')}
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
