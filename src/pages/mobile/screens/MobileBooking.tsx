import { motion } from 'motion/react';
import { Clock, ChevronRight } from 'lucide-react';
import { SERVICES } from '../../../data/mockData';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import type { MobileState, Service } from '../../../types';

interface MobileBookingProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const formatPrice = (min: number, max: number) => {
  const fmt = (n: number) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(0)} jt`
      : `${(n / 1000).toFixed(0)} rb`;
  return `Rp ${fmt(min)} - ${fmt(max)}`;
};

const SERVICE_EMOJIS: Record<string, string> = {
  s1: '🦷', s2: '✨', s3: '🔧', s4: '❌', s5: '😁', s6: '🔩', s7: '💊', s8: '➕',
};

export function MobileBooking({ state, setState }: MobileBookingProps) {
  const handleSelect = (service: Service) => {
    setState({ screen: 'booking-doctor', selectedService: service });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-white"
    >
      <MobileHeader
        title="Buat Janji"
        showBack
        onBack={() => setState({ screen: 'home' })}
      />

      <div className="flex-1 overflow-y-auto">
        {/* Banner */}
        <div
          className="mx-5 mt-4 mb-5 rounded-2xl p-4"
          style={{ background: 'linear-gradient(135deg, #FFF5F9, #FFE0F0)' }}
        >
          <p className="font-bold text-sm mb-0.5" style={{ color: '#E91E8C' }}>Pilih Layanan</p>
          <p className="text-xs" style={{ color: '#6B7280' }}>
            Pilih jenis perawatan gigi yang Anda butuhkan
          </p>
        </div>

        {/* Service list */}
        <div className="px-5 flex flex-col gap-3 pb-24">
          {SERVICES.map((service, i) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelect(service)}
              className="flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[0.98] transition-all"
              style={{
                background: state.selectedService?.id === service.id ? '#FFF5F9' : 'white',
                border: `1.5px solid ${state.selectedService?.id === service.id ? '#E91E8C' : '#F3F4F6'}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: service.color + '18' }}
              >
                {SERVICE_EMOJIS[service.id] ?? '🦷'}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-bold text-sm mb-0.5" style={{ color: '#1A1A2E' }}>
                  {service.name}
                </p>
                <p className="text-xs leading-snug mb-2" style={{ color: '#6B7280' }}>
                  {service.description}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Clock size={11} style={{ color: '#9CA3AF' }} />
                    <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                      {service.duration} menit
                    </span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: '#E91E8C' }}>
                    {formatPrice(service.priceMin, service.priceMax)}
                  </span>
                </div>
              </div>

              <ChevronRight size={18} style={{ color: '#D1D5DB' }} />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
