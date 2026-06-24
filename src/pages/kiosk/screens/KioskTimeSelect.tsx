import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { TIME_SLOTS } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';
import { kioskSound } from '../../../lib/kioskSound';
import { useIsPortrait } from '../../../context/KioskOrientationContext';

export function KioskTimeSelect({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const portrait = useIsPortrait();

  const handleSelect = (time: string) => {
    kioskSound('select');
    setState(prev => ({ ...prev, selectedTime: time }));
    goTo('confirmation');
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
        padding: portrait ? '28px 32px 20px' : '28px 60px 20px',
        paddingTop: portrait ? '31px' : '31px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        {/* Step progress dots — all 4 complete */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 10 }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              height: 5, borderRadius: 3, width: 36,
              backgroundColor: '#E91E8C',
              transition: 'all 0.3s',
            }} />
          ))}
          <span style={{ fontSize: 11, fontWeight: 700, color: '#E91E8C', letterSpacing: '0.10em', textTransform: 'uppercase', marginLeft: 6 }}>
            {t ? 'Step 4 of 4' : 'Langkah 4 dari 4'}
          </span>
        </div>
        <div className="kd" style={{ fontSize: '34px', fontWeight: '800', color: '#1A1A2E', marginBottom: '4px' }}>
          {t ? 'Select Time' : 'Pilih Waktu'}
        </div>
        <div style={{ fontSize: '17px', color: '#6B7280' }}>
          {state.selectedDate && (
            <>{t ? 'Date:' : 'Tanggal:'} <span style={{ color: '#E91E8C', fontWeight: '700' }}>{state.selectedDate}</span></>
          )}
        </div>
      </div>

      {/* Time slots */}
      <div style={{
        flex: 1,
        padding: '32px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
      }}>
        {/* Legend */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '6px', backgroundColor: '#E91E8C' }} />
            <span style={{ fontSize: '15px', color: '#6B7280' }}>{t ? 'Selected' : 'Dipilih'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: '2px solid #E91E8C', backgroundColor: '#ffffff' }} />
            <span style={{ fontSize: '15px', color: '#6B7280' }}>{t ? 'Available' : 'Tersedia'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '6px', backgroundColor: '#E5E7EB' }} />
            <span style={{ fontSize: '15px', color: '#6B7280' }}>{t ? 'Unavailable' : 'Penuh'}</span>
          </div>
        </div>

        {/* Grid of time slots */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: portrait ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
          gap: '16px',
          width: '100%',
          maxWidth: '760px',
        }}>
          {TIME_SLOTS.map((slot, index) => {
            const isSelected = state.selectedTime === slot.time;
            const unavailable = !slot.available;

            let bg = '#ffffff';
            let color = '#1A1A2E';
            let border = '2px solid #E91E8C';
            let cursor = 'pointer';
            let textDecoration = 'none';
            let boxShadow = '0 2px 8px rgba(233,30,140,0.12)';

            if (isSelected) {
              bg = 'linear-gradient(135deg, #E91E8C, #FF6BB5)';
              color = '#ffffff';
              border = '2px solid #E91E8C';
              boxShadow = '0 6px 20px rgba(233,30,140,0.4)';
            } else if (unavailable) {
              bg = '#F3F4F6';
              color = '#9CA3AF';
              border = '2px solid #E5E7EB';
              cursor = 'not-allowed';
              textDecoration = 'line-through';
              boxShadow = 'none';
            }

            return (
              <motion.button
                key={slot.time}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileTap={slot.available && !isSelected ? { scale: 0.95 } : {}}
                onClick={() => slot.available && handleSelect(slot.time)}
                disabled={!slot.available}
                style={{
                  padding: '22px 16px',
                  borderRadius: '16px',
                  border,
                  background: bg,
                  color,
                  fontSize: '22px',
                  fontWeight: '700',
                  cursor,
                  textDecoration,
                  boxShadow,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (!slot.available || isSelected) return;
                  (e.currentTarget as HTMLButtonElement).style.background = '#FFF5F9';
                  (e.currentTarget as HTMLButtonElement).style.color = '#E91E8C';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(233,30,140,0.2)';
                }}
                onMouseLeave={e => {
                  if (!slot.available || isSelected) return;
                  (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                  (e.currentTarget as HTMLButtonElement).style.color = '#1A1A2E';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(233,30,140,0.12)';
                }}
              >
                <Clock size={18} style={{ opacity: 0.7 }} />
                {slot.time}
                <div style={{ fontSize: '13px', fontWeight: '500', opacity: 0.75 }}>
                  {unavailable ? (t ? 'Full' : 'Penuh') : (t ? 'Available' : 'Tersedia')}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '16px 40px',
        borderTop: '1px solid #F3F4F6',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <button
          onClick={goBack}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '14px 28px', borderRadius: '14px',
            border: '2px solid #E5E7EB', backgroundColor: '#ffffff',
            color: '#6B7280', fontSize: '17px', fontWeight: '600',
            cursor: 'pointer', transition: 'all 0.15s',
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

        {state.selectedTime && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => goTo('confirmation')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 36px', borderRadius: '14px', border: 'none',
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              color: '#ffffff', fontSize: '17px', fontWeight: '700',
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(233,30,140,0.35)',
            }}
          >
            {t ? 'Continue' : 'Lanjutkan'}
            <ChevronRight size={20} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
