import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, MapPin, Stethoscope, Phone } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileBookingConfirmProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: '#FFF8F4' }}
      >
        <span style={{ color: '#E91E8C' }}>{icon}</span>
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-medium mb-0.5" style={{ color: '#9CA3AF' }}>{label}</p>
        <p className="text-sm font-bold" style={{ color: '#1A1A2E' }}>{value}</p>
      </div>
    </div>
  );
}

export function MobileBookingConfirm({ state, setState }: MobileBookingConfirmProps) {
  const back = () => setState({ screen: 'booking-schedule' });

  const doctor = state.selectedDoctor;
  const service = state.selectedService;
  const branch = state.selectedBranch;
  const user = state.user;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-gray-50"
    >
      <MobileHeader title="Konfirmasi Janji" showBack onBack={back} />

      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-4">
        {/* Summary header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden mb-4"
          style={{ boxShadow: '0 4px 20px rgba(233,30,140,0.15)' }}
        >
          {/* Gradient header */}
          <div
            className="px-5 py-5"
            style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <Stethoscope size={28} color="white" />
              </div>
              <div>
                <p className="text-white/80 text-xs font-medium mb-0.5">Ringkasan Janji Temu</p>
                <p className="text-white text-lg font-black">{service?.name ?? '-'}</p>
                <p className="text-white/80 text-xs">{service?.duration} menit</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white px-4">
            <InfoRow icon={<User size={16} />} label="Dokter" value={doctor?.name ?? '-'} />
            <InfoRow icon={<Stethoscope size={16} />} label="Spesialisasi" value={doctor?.specialty ?? '-'} />
            <InfoRow icon={<Calendar size={16} />} label="Tanggal" value={state.selectedDate ?? '-'} />
            <InfoRow icon={<Clock size={16} />} label="Waktu" value={state.selectedTime ?? '-'} />
            <InfoRow icon={<MapPin size={16} />} label="Lokasi" value={branch?.name ?? 'OMDC Dental'} />
            {branch?.address && (
              <div className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF8F4' }}>
                  <MapPin size={14} style={{ color: '#E91E8C' }} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-medium mb-0.5" style={{ color: '#9CA3AF' }}>Alamat</p>
                  <p className="text-xs font-semibold leading-snug" style={{ color: '#1A1A2E' }}>{branch.address}</p>
                </div>
              </div>
            )}
            {state.selectedTeeth && state.selectedTeeth.length > 0 && (
              <div className="flex items-start gap-3 py-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base" style={{ background: '#FFF8F4' }}>
                  🦷
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-medium mb-1" style={{ color: '#9CA3AF' }}>Lokasi Keluhan</p>
                  <div className="flex flex-wrap gap-1">
                    {[...state.selectedTeeth].sort((a, b) => a - b).map(n => (
                      <span key={n} className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(233,30,140,0.08)', color: '#E91E8C' }}>
                        Gigi {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Patient info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl px-4 mb-4"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
              Data Pasien
            </p>
          </div>
          <InfoRow icon={<User size={16} />} label="Nama" value={user?.name ?? '-'} />
          <div className="flex items-center gap-3 py-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF8F4' }}>
              <Phone size={16} style={{ color: '#E91E8C' }} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-medium mb-0.5" style={{ color: '#9CA3AF' }}>No. HP</p>
              <p className="text-sm font-bold" style={{ color: '#1A1A2E' }}>{user?.phone ?? '-'}</p>
            </div>
          </div>
        </motion.div>

        {/* Price estimate */}
        {service && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl px-4 py-4"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
                Estimasi Biaya
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#374151' }}>{service.name}</span>
              <span className="text-sm font-black" style={{ color: '#E91E8C' }}>
                Rp {service.priceMin.toLocaleString('id-ID')} - {service.priceMax.toLocaleString('id-ID')}
              </span>
            </div>
            <p className="text-[10px] mt-2" style={{ color: '#9CA3AF' }}>
              * Biaya final akan ditentukan setelah pemeriksaan
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-white"
        style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}
      >
        <button
          onClick={() => { haptic('medium'); setState({ screen: 'booking-payment' }); }}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            boxShadow: '0 8px 24px rgba(233,30,140,0.3)',
          }}
        >
          Konfirmasi & Bayar
        </button>
      </div>
    </motion.div>
  );
}
