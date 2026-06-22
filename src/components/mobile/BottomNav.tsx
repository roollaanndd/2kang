import { motion } from 'motion/react';
import { IconHome, IconCalendarTooth, IconQueue, IconDoctorTooth, IconProfile } from '../ui/OmdcIcons';
import { haptic } from '../../lib/haptics';
import type { MobileScreen } from '../../types';

interface BottomNavProps {
  currentScreen: MobileScreen;
  onNavigate: (screen: MobileScreen) => void;
}

const NAV_ITEMS = [
  { id: 'home' as MobileScreen, label: 'Beranda', Icon: IconHome },
  { id: 'booking' as MobileScreen, label: 'Booking', Icon: IconCalendarTooth },
  { id: 'queue' as MobileScreen, label: 'Antrian', Icon: IconQueue },
  { id: 'doctors' as MobileScreen, label: 'Dokter', Icon: IconDoctorTooth },
  { id: 'profile' as MobileScreen, label: 'Profil', Icon: IconProfile },
];

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const isActive = (id: MobileScreen) => {
    if (id === 'booking') {
      return ['booking', 'booking-branch', 'booking-doctor', 'booking-schedule', 'booking-confirm', 'booking-payment'].includes(currentScreen);
    }
    if (id === 'doctors') {
      return ['doctors', 'doctor-detail'].includes(currentScreen);
    }
    return currentScreen === id;
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'max(20px, env(safe-area-inset-bottom, 0px))',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: 36,
        border: '1px solid rgba(233,30,140,0.10)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(233,30,140,0.08)',
        flexShrink: 0,
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 68,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = isActive(id);
          return (
            <motion.button
              key={id}
              onClick={() => { haptic('light'); onNavigate(id); }}
              whileTap={{ scale: 0.88 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                flex: 1,
                height: '100%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <div
                style={{
                  padding: '8px 16px',
                  borderRadius: 24,
                  background: active
                    ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)'
                    : 'transparent',
                  transition: 'background 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.4 : 1.9}
                  color={active ? '#FFFFFF' : '#9CA3AF'}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: active ? 700 : 500,
                    lineHeight: 1,
                    color: active ? 'white' : '#9CA3AF',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
