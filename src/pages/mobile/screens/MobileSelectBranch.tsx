import { motion } from 'motion/react';
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { ClinicBranch, MobileState } from '../../../types';

interface MobileSelectBranchProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

// Simple clinic illustration used when no photo is uploaded
function BranchIllus({ city, idx }: { city: string; idx: number }) {
  const palettes: [string, string][] = [
    ['#E91E8C', '#FF6BB5'],
    ['#06B6D4', '#22D3EE'],
    ['#8B5CF6', '#C4B5FD'],
    ['#F59E0B', '#FCD34D'],
  ];
  const [g1, g2] = palettes[idx % palettes.length];
  const letter = city.charAt(0).toUpperCase();

  return (
    <div style={{
      width: '100%', height: 110,
      background: `linear-gradient(135deg, ${g1}18, ${g2}28)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }} viewBox="0 0 200 110" preserveAspectRatio="xMidYMid slice">
        <circle cx="160" cy="20" r="48" fill={g1} />
        <circle cx="30" cy="90" r="36" fill={g2} />
        <rect x="80" y="35" width="60" height="60" rx="12" fill={g1} transform="rotate(15 110 65)" />
      </svg>
      {/* Building icon */}
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 16,
          background: `linear-gradient(135deg, ${g1}, ${g2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 6px',
          boxShadow: `0 6px 20px ${g1}40`,
        }}>
          <span style={{ color: 'white', fontSize: 20, fontWeight: 900 }}>{letter}</span>
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, color: g1, letterSpacing: '0.08em' }}>
          OMDC DENTAL
        </p>
      </div>
    </div>
  );
}

export function MobileSelectBranch({ state, setState }: MobileSelectBranchProps) {
  const { cms } = useCMS();
  const activeBranches = cms.branches.items.filter(b => b.isActive);

  const handleSelect = (branch: ClinicBranch) => {
    haptic('selection');
    const nextScreen = state.selectedDoctor ? 'booking-schedule' : 'booking-doctor';
    setState({ screen: nextScreen, selectedBranch: branch });
  };

  const back = () => setState({ screen: 'booking' });

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB' }}
    >
      <MobileHeader title="Pilih Lokasi Klinik" showBack onBack={back} />

      {/* Context banner */}
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

      {/* Subtitle */}
      <div style={{ padding: '14px 20px 4px' }}>
        <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>
          {activeBranches.length} lokasi tersedia
        </p>
      </div>

      <div style={{
        flex: 1, overflowY: 'auto', scrollbarWidth: 'none',
        padding: '4px 20px 80px', display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {activeBranches.map((branch, i) => {
          const isSelected = state.selectedBranch?.id === branch.id;
          return (
            <motion.button
              key={branch.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(branch)}
              style={{
                display: 'flex', flexDirection: 'column',
                background: 'white', borderRadius: 22, overflow: 'hidden',
                border: `2px solid ${isSelected ? '#E91E8C' : 'transparent'}`,
                boxShadow: isSelected
                  ? '0 8px 28px rgba(233,30,140,0.18)'
                  : '0 2px 14px rgba(0,0,0,0.06)',
                textAlign: 'left', cursor: 'pointer',
              }}
            >
              {/* Branch image or illustration */}
              {branch.image ? (
                <img
                  src={branch.image}
                  alt={branch.name}
                  style={{ width: '100%', height: 110, objectFit: 'cover' }}
                />
              ) : (
                <BranchIllus city={branch.city} idx={i} />
              )}

              {/* Info */}
              <div style={{ padding: '14px 16px 16px', position: 'relative' }}>
                {/* Selected badge */}
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: -12, right: 14,
                    background: '#E91E8C', color: 'white',
                    fontSize: 9, fontWeight: 800, padding: '3px 10px',
                    borderRadius: 20, letterSpacing: '0.06em',
                  }}>
                    DIPILIH
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ flex: 1, paddingRight: 8 }}>
                    <p style={{ fontWeight: 900, fontSize: 14, color: '#1A1A2E', marginBottom: 2, lineHeight: 1.3 }}>
                      {branch.name}
                    </p>
                    <span style={{
                      display: 'inline-block',
                      fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                      background: '#EEF6FF', color: '#2563EB',
                    }}>
                      {branch.city}
                    </span>
                  </div>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: isSelected ? '#E91E8C' : '#F3F4F6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ChevronRight size={16} color={isSelected ? 'white' : '#9CA3AF'} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <MapPin size={13} style={{ color: '#9CA3AF', flexShrink: 0, marginTop: 1 }} />
                    <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.5 }}>{branch.address}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Phone size={12} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                    <p style={{ fontSize: 11, color: '#6B7280' }}>{branch.phone}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Clock size={12} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                    <p style={{ fontSize: 11, color: '#6B7280' }}>{branch.hours}</p>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}

        {activeBranches.length === 0 && (
          <div style={{ textAlign: 'center', padding: '56px 0' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18, background: '#FFF0F7',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
            }}>
              <MapPin size={22} color="#E91E8C" />
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
              Belum ada lokasi aktif
            </p>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>Hubungi admin klinik</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
