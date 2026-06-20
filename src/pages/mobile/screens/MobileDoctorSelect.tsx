import { motion } from 'motion/react';
import { Star, CheckCircle, XCircle } from 'lucide-react';
import { DOCTORS } from '../../../data/mockData';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import type { MobileState, Doctor } from '../../../types';

interface MobileDoctorSelectProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

export function MobileDoctorSelect({ state, setState }: MobileDoctorSelectProps) {
  const handleSelect = (doctor: Doctor) => {
    if (!doctor.available) return;
    setState({ screen: 'booking-schedule', selectedDoctor: doctor });
  };

  const back = () => setState({ screen: 'booking' });

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-white"
    >
      <MobileHeader title="Pilih Dokter" showBack onBack={back} />

      {/* Selected service banner */}
      {state.selectedService && (
        <div className="mx-5 mt-4 mb-2">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: '#FFF5F9', border: '1px solid #FECDD3' }}
          >
            <span className="text-base">{state.selectedService.icon}</span>
            <div>
              <p className="text-xs font-bold" style={{ color: '#E91E8C' }}>
                Layanan: {state.selectedService.name}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 flex flex-col gap-4">
        {DOCTORS.map((doctor, i) => (
          <motion.button
            key={doctor.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => handleSelect(doctor)}
            disabled={!doctor.available}
            className="w-full text-left rounded-2xl overflow-hidden transition-all active:scale-[0.98]"
            style={{
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              opacity: doctor.available ? 1 : 0.65,
              border: state.selectedDoctor?.id === doctor.id
                ? '2px solid #E91E8C'
                : '2px solid transparent',
            }}
          >
            {/* Card header gradient */}
            <div
              className="h-2 w-full"
              style={{ background: doctor.available ? 'linear-gradient(90deg, #E91E8C, #FF6BB5)' : '#D1D5DB' }}
            />

            <div className="bg-white p-4">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: doctor.available
                      ? 'linear-gradient(135deg, #FFF5F9, #FFE0F0)'
                      : '#F3F4F6',
                  }}
                >
                  <span
                    className="text-2xl font-black"
                    style={{ color: doctor.available ? '#E91E8C' : '#9CA3AF' }}
                  >
                    {doctor.name.split(' ')[1]?.[0] ?? 'D'}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-black text-sm leading-tight" style={{ color: '#1A1A2E' }}>
                      {doctor.name}
                    </p>
                    <span
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ml-2"
                      style={{
                        background: doctor.available ? '#D1FAE5' : '#FEE2E2',
                        color: doctor.available ? '#065F46' : '#991B1B',
                      }}
                    >
                      {doctor.available
                        ? <><CheckCircle size={10} /> Tersedia</>
                        : <><XCircle size={10} /> Tidak Tersedia</>
                      }
                    </span>
                  </div>

                  <p className="text-xs mb-2" style={{ color: '#6B7280' }}>
                    {doctor.specialty}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} fill="#F59E0B" color="#F59E0B" />
                      <span className="text-xs font-bold" style={{ color: '#374151' }}>
                        {doctor.rating}
                      </span>
                      <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                        ({doctor.reviewCount})
                      </span>
                    </div>
                    <span className="text-[10px]" style={{ color: '#9CA3AF' }}>•</span>
                    <span className="text-[10px]" style={{ color: '#6B7280' }}>
                      {doctor.experience} thn pengalaman
                    </span>
                  </div>

                  {/* Schedule tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doctor.schedule.map(day => (
                      <span
                        key={day}
                        className="px-2 py-0.5 rounded-full text-[9px] font-semibold"
                        style={{ background: '#F3F4F6', color: '#374151' }}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* About */}
              <p className="text-xs mt-3 leading-relaxed" style={{ color: '#6B7280', borderTop: '1px solid #F3F4F6', paddingTop: 10 }}>
                {doctor.about}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
