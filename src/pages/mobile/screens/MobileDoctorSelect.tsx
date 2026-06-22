import { motion } from 'motion/react';
import { Star, CheckCircle, XCircle } from 'lucide-react';
import { DOCTORS } from '../../../data/mockData';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState, Doctor } from '../../../types';

interface MobileDoctorSelectProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const AVATAR_COLORS: [string, string][] = [
  ['#E91E8C', '#FF6BB5'],
  ['#06B6D4', '#22D3EE'],
  ['#8B5CF6', '#C4B5FD'],
  ['#F59E0B', '#FCD34D'],
];

function initials(name: string): string {
  const clean = name.replace(/^drg\.\s*/i, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 0) return 'D';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function MobileDoctorSelect({ state, setState }: MobileDoctorSelectProps) {
  const handleSelect = (doctor: Doctor) => {
    if (!doctor.available) return;
    haptic('selection');
    setState({ screen: 'booking-schedule', selectedDoctor: doctor });
  };

  const back = () => setState({ screen: 'booking-branch' });

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB' }}
    >
      <MobileHeader title="Pilih Dokter" showBack onBack={back} />

      {/* Selected service banner */}
      {state.selectedService && (
        <div style={{ padding: '10px 20px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 14,
            background: '#FFF5F9', border: '1px solid rgba(233,30,140,0.15)',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 1 }}>Layanan yang dipilih</p>
              <p style={{ fontSize: 12, fontWeight: 800, color: '#E91E8C' }}>
                {state.selectedService.name}
              </p>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DOCTORS.map((doctor, i) => {
          const [g1, g2] = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const isSelected = state.selectedDoctor?.id === doctor.id;

          return (
            <motion.button
              key={doctor.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={doctor.available ? { scale: 0.98 } : undefined}
              onClick={() => handleSelect(doctor)}
              disabled={!doctor.available}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: 16, borderRadius: 20, textAlign: 'left',
                background: 'white',
                border: `1.5px solid ${isSelected ? '#E91E8C' : '#EEF0F4'}`,
                boxShadow: isSelected
                  ? '0 6px 22px rgba(233,30,140,0.15)'
                  : '0 2px 10px rgba(0,0,0,0.04)',
                cursor: doctor.available ? 'pointer' : 'default',
                opacity: doctor.available ? 1 : 0.65,
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Selected left accent */}
              {isSelected && (
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                  background: 'linear-gradient(180deg, #E91E8C, #FF6BB5)',
                }} />
              )}

              {/* Colored avatar */}
              <div style={{
                width: 58, height: 58, borderRadius: 17, flexShrink: 0,
                background: `linear-gradient(135deg, ${g1}, ${g2})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 900, fontSize: 20,
                boxShadow: doctor.available ? `0 4px 14px ${g1}44` : 'none',
              }}>
                {initials(doctor.name)}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 3 }}>
                  <p style={{ fontWeight: 800, fontSize: 13, color: '#1A1A2E', lineHeight: 1.3, flex: 1, paddingRight: 8 }}>
                    {doctor.name}
                  </p>
                  <span style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: 3,
                    fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                    background: doctor.available ? '#D1FAE5' : '#FEE2E2',
                    color: doctor.available ? '#065F46' : '#991B1B',
                  }}>
                    {doctor.available
                      ? <><CheckCircle size={9} /> Tersedia</>
                      : <><XCircle size={9} /> Tidak Tersedia</>}
                  </span>
                </div>

                <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 7 }}>
                  {doctor.specialty}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Star size={11} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#374151' }}>{doctor.rating}</span>
                    <span style={{ fontSize: 10, color: '#9CA3AF' }}>({doctor.reviewCount})</span>
                  </div>
                  <span style={{ fontSize: 9, color: '#D1D5DB' }}>•</span>
                  <span style={{ fontSize: 10, color: '#6B7280' }}>{doctor.experience} thn pengalaman</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {doctor.schedule.map(day => (
                    <span key={day} style={{
                      fontSize: 9, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                      background: '#F3F4F6', color: '#6B7280',
                    }}>
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
