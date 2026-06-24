import { motion } from 'motion/react';
import { ChevronLeft, Star, Clock } from 'lucide-react';
import { DOCTORS } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';
import type { Doctor } from '../../../types';
import { kioskSound } from '../../../lib/kioskSound';
import { useIsPortrait } from '../../../context/KioskOrientationContext';

const PINK = '#E91E8C';
const DARK = '#0D1421';
const AVATAR_COLORS = ['#E91E8C', '#4FC3F7', '#F59E0B', '#10B981'];

export function KioskDoctorSelect({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const portrait = useIsPortrait();

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
              width: n <= 2 ? 36 : 20,
              backgroundColor: n <= 2 ? PINK : '#E5E7EB',
              transition: 'all 0.3s',
            }} />
          ))}
          <span style={{ fontSize: 11, fontWeight: 700, color: PINK, letterSpacing: '0.10em', textTransform: 'uppercase', marginLeft: 6 }}>
            {t ? 'Step 2 of 4' : 'Langkah 2 dari 4'}
          </span>
        </div>
        <div className="kd" style={{ fontSize: 36, fontWeight: 900, color: DARK, marginBottom: 4, lineHeight: 1.1 }}>
          {t ? 'Select Doctor' : 'Pilih Dokter'}
        </div>
        <div style={{ fontSize: 16, color: '#6B7280' }}>
          {state.selectedService && (
            <>
              {t ? 'For' : 'Untuk'}{' '}
              <span style={{ color: PINK, fontWeight: 700 }}>
                {t ? state.selectedService.nameEn : state.selectedService.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Doctors list */}
      <div style={{
        flex: 1,
        padding: portrait ? '24px 32px' : '28px 60px',
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
            whileHover={doctor.available ? { y: -3 } : {}}
            whileTap={doctor.available ? { scale: 0.98 } : {}}
            onClick={() => handleSelect(doctor)}
            disabled={!doctor.available}
            style={{
              borderRadius: 20,
              border: `2px solid ${doctor.available ? PINK + '22' : '#E5E7EB'}`,
              backgroundColor: doctor.available ? '#ffffff' : '#F9FAFB',
              cursor: doctor.available ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '22px 28px',
              boxShadow: doctor.available ? '0 4px 18px rgba(0,0,0,0.07)' : 'none',
              opacity: doctor.available ? 1 : 0.55,
              transition: 'all 0.2s',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              if (!doctor.available) return;
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = PINK;
              btn.style.boxShadow = `0 8px 32px rgba(233,30,140,0.22)`;
            }}
            onMouseLeave={e => {
              if (!doctor.available) return;
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = PINK + '22';
              btn.style.boxShadow = '0 4px 18px rgba(0,0,0,0.07)';
            }}
          >
            {/* Left accent stripe */}
            {doctor.available && (
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: 4,
                background: `linear-gradient(180deg, ${PINK}, #FF6BB5)`,
                borderRadius: '4px 0 0 4px',
              }} />
            )}

            {/* Avatar with photo support */}
            <div style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 800,
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
                fontSize: 24,
                fontWeight: 900,
                color: DARK,
                marginBottom: 4,
                lineHeight: 1.2,
              }}>
                {doctor.name}
              </div>
              <div style={{
                fontSize: 15,
                color: '#6B7280',
                marginBottom: 10,
                fontWeight: 500,
              }}>
                {t ? doctor.specialtyEn : doctor.specialty}
              </div>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontSize: 14, fontWeight: 800, color: DARK }}>
                    {doctor.rating}
                  </span>
                  <span style={{ fontSize: 13, color: '#9CA3AF' }}>
                    ({doctor.reviewCount})
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={14} color="#9CA3AF" />
                  <span style={{ fontSize: 13, color: '#6B7280' }}>
                    {doctor.experience} {t ? 'yrs exp.' : 'thn pengalaman'}
                  </span>
                </div>
              </div>
            </div>

            {/* Availability badge */}
            <div style={{
              flexShrink: 0,
              padding: '10px 22px',
              borderRadius: 40,
              backgroundColor: doctor.available ? '#D1FAE5' : '#FEE2E2',
              color: doctor.available ? '#065F46' : '#991B1B',
              fontSize: 15,
              fontWeight: 800,
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
