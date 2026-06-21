import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ChevronRight, ChevronDown, X } from 'lucide-react';
import { SERVICES } from '../../../data/mockData';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { Odontogram } from '../../../components/mobile/Odontogram';
import { haptic } from '../../../lib/haptics';
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
  const [chartOpen, setChartOpen] = useState(false);
  const teeth = state.selectedTeeth ?? [];

  const handleSelect = (service: Service) => {
    haptic('selection');
    setState({ screen: 'booking-doctor', selectedService: service });
  };

  const toggleTooth = (fdi: number) => {
    haptic('selection');
    const next = teeth.includes(fdi) ? teeth.filter(n => n !== fdi) : [...teeth, fdi];
    setState({ selectedTeeth: next });
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

        {/* Interactive dental chart — optional "where does it hurt?" */}
        <div className="mx-5 mb-5 rounded-2xl overflow-hidden" style={{ background: 'white', border: '1.5px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <button
            onClick={() => { haptic('light'); setChartOpen(o => !o); }}
            className="w-full flex items-center gap-3 p-4 text-left"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style={{ background: 'rgba(233,30,140,0.08)' }}>
              🦷
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm" style={{ color: '#1A1A2E' }}>Di mana lokasi keluhan?</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#F3F4F6', color: '#9CA3AF' }}>OPSIONAL</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                {teeth.length > 0 ? `${teeth.length} gigi ditandai` : 'Ketuk gigi yang terasa sakit'}
              </p>
            </div>
            <motion.div animate={{ rotate: chartOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={18} style={{ color: '#9CA3AF' }} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {chartOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '4px 14px 16px', borderTop: '1px solid #F6F7F9' }}>
                  <div style={{ paddingTop: 12 }}>
                    <Odontogram selected={teeth} onToggle={toggleTooth} />
                  </div>

                  {teeth.length > 0 && (
                    <div className="mt-3 flex items-center flex-wrap gap-1.5">
                      {[...teeth].sort((a, b) => a - b).map(n => (
                        <span key={n} className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(233,30,140,0.08)', color: '#E91E8C' }}>
                          Gigi {n}
                          <button onClick={() => toggleTooth(n)} style={{ display: 'flex', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
                            <X size={11} style={{ color: '#E91E8C' }} />
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => { haptic('light'); setState({ selectedTeeth: [] }); }}
                        className="text-[11px] font-semibold px-2 py-1 rounded-full"
                        style={{ background: '#F9FAFB', color: '#9CA3AF', border: '1px solid #F3F4F6', cursor: 'pointer' }}
                      >
                        Hapus semua
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
