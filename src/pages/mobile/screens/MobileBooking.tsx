import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ChevronRight, ChevronDown, X } from 'lucide-react';
import { SERVICES } from '../../../data/mockData';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { Odontogram } from '../../../components/mobile/Odontogram';
import {
  DentalServiceIcon,
  ServiceIconBezel,
  SERVICE_GRADIENTS,
  SERVICE_SHADOWS,
} from '../../../components/mobile/DentalServiceIcon';
import { haptic } from '../../../lib/haptics';
import type { MobileState, Service } from '../../../types';

interface MobileBookingProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const formatPrice = (min: number, max: number) => {
  const fmt = (n: number) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)} jt`
      : `${(n / 1000).toFixed(0)} rb`;
  return `Rp ${fmt(min)} – ${fmt(max)}`;
};

export function MobileBooking({ state, setState }: MobileBookingProps) {
  const [chartOpen, setChartOpen] = useState(false);
  const teeth = state.selectedTeeth ?? [];

  const handleSelect = (service: Service) => {
    haptic('selection');
    setState({ screen: 'booking-branch', selectedService: service });
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
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB' }}
    >
      <MobileHeader
        title="Pilih Layanan"
        showBack
        onBack={() => setState({ screen: 'home' })}
      />

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>

        {/* ── Welcome banner ── */}
        <div style={{ padding: '16px 20px 4px' }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, color: '#0D1421', marginBottom: 4 }}>
            Halo, Kawan OMDC! 👋
          </h2>
          <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
            Silakan pilih layanan yang kamu butuhkan hari ini.
          </p>
        </div>

        {/* ── Tooth chart accordion ── */}
        <div style={{
          margin: '0 20px 16px',
          borderRadius: 20,
          overflow: 'hidden',
          background: 'white',
          border: '1.5px solid #F0F0F5',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <button
            onClick={() => { haptic('light'); setChartOpen(o => !o); }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: 16, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 14, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: teeth.length > 0 ? 'rgba(233,30,140,0.10)' : '#F5F5F8',
            }}>
              <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={teeth.length > 0 ? '#E91E8C' : '#9CA3AF'} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E' }}>Di mana lokasi keluhan?</p>
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: '2px 7px',
                  borderRadius: 20, background: '#F3F4F6', color: '#9CA3AF',
                }}>OPSIONAL</span>
              </div>
              <p style={{ fontSize: 11, color: teeth.length > 0 ? '#E91E8C' : '#9CA3AF' }}>
                {teeth.length > 0 ? `${teeth.length} gigi ditandai` : 'Ketuk gigi yang terasa sakit'}
              </p>
            </div>
            <motion.div animate={{ rotate: chartOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={16} color="#9CA3AF" />
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
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                      {[...teeth].sort((a, b) => a - b).map(n => (
                        <span key={n} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 11, fontWeight: 700, padding: '4px 10px',
                          borderRadius: 20, background: 'rgba(233,30,140,0.09)', color: '#E91E8C',
                        }}>
                          Gigi {n}
                          <button
                            onClick={() => toggleTooth(n)}
                            style={{ display: 'flex', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
                          >
                            <X size={11} color="#E91E8C" />
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => { haptic('light'); setState({ selectedTeeth: [] }); }}
                        style={{
                          fontSize: 11, fontWeight: 600, padding: '4px 10px',
                          borderRadius: 20, background: '#F9FAFB', color: '#9CA3AF',
                          border: '1px solid #F3F4F6', cursor: 'pointer',
                        }}
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

        {/* ── Section header ── */}
        <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#1A1A2E' }}>Layanan Tersedia</span>
          <span style={{ fontSize: 11, color: '#9CA3AF' }}>{SERVICES.length} layanan</span>
        </div>

        {/* ── Service list ── */}
        <div style={{ padding: '0 20px 100px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SERVICES.map((service, i) => {
            const isSelected = state.selectedService?.id === service.id;
            const gradient = SERVICE_GRADIENTS[i % SERVICE_GRADIENTS.length];
            const shadow = SERVICE_SHADOWS[i % SERVICE_SHADOWS.length];

            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.045 }}
                whileTap={{ scale: 0.982 }}
                onClick={() => handleSelect(service)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 14px 14px 16px',
                  borderRadius: 20,
                  textAlign: 'left',
                  background: isSelected ? '#FFF8F4' : 'white',
                  border: `2px solid ${isSelected ? '#E91E8C' : 'rgba(0,0,0,0.06)'}`,
                  boxShadow: isSelected
                    ? '0 8px 24px rgba(233,30,140,0.20)'
                    : '0 2px 10px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Selected accent bar */}
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    left: 0, top: 0, bottom: 0,
                    width: 3,
                    background: gradient,
                    borderRadius: '3px 0 0 3px',
                  }} />
                )}

                {/* Branded icon bezel */}
                <ServiceIconBezel gradient={gradient} shadowColor={shadow} size={56} radius={16}>
                  <DentalServiceIcon id={service.id} size={24} />
                </ServiceIconBezel>

                {/* Text info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 800, fontSize: 14, color: '#1A1A2E', marginBottom: 3, lineHeight: 1.2 }}>
                    {service.name}
                  </p>
                  <p style={{
                    fontSize: 11, color: '#9CA3AF', lineHeight: 1.45, marginBottom: 9,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {service.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 10, fontWeight: 600,
                      padding: '3px 8px', borderRadius: 20,
                      background: '#F3F4F6', color: '#6B7280',
                    }}>
                      <Clock size={9} />
                      {service.duration} menit
                    </span>
                    <span style={{
                      fontSize: 10, fontWeight: 800,
                      padding: '3px 10px', borderRadius: 20,
                      background: isSelected ? 'rgba(233,30,140,0.13)' : 'rgba(233,30,140,0.07)',
                      color: '#E91E8C',
                    }}>
                      {formatPrice(service.priceMin, service.priceMax)}
                    </span>
                  </div>
                </div>

                <div style={{
                  width: 30, height: 30, borderRadius: 10, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isSelected ? 'rgba(233,30,140,0.10)' : '#F5F5F8',
                }}>
                  <ChevronRight size={15} color={isSelected ? '#E91E8C' : '#C4C4D0'} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
