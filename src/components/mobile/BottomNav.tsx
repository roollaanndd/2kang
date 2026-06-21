import { motion } from 'motion/react';
import { Home, Calendar, Ticket, User } from 'lucide-react';
import { haptic } from '../../lib/haptics';
import type { MobileScreen } from '../../types';

interface BottomNavProps {
  currentScreen: MobileScreen;
  onNavigate: (screen: MobileScreen) => void;
}

const NAV_ITEMS = [
  { id: 'home' as MobileScreen, label: 'Beranda', Icon: Home },
  { id: 'booking' as MobileScreen, label: 'Booking', Icon: Calendar },
  { id: 'queue' as MobileScreen, label: 'Antrian', Icon: Ticket },
  { id: 'profile' as MobileScreen, label: 'Profil', Icon: User },
];

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const isActive = (id: MobileScreen) => {
    if (id === 'booking') {
      return ['booking', 'booking-doctor', 'booking-schedule', 'booking-confirm', 'booking-payment'].includes(currentScreen);
    }
    return currentScreen === id;
  };

  return (
    <div
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(233,30,140,0.08)',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.08)',
        flexShrink: 0,
        zIndex: 50,
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
                  padding: '7px 14px',
                  borderRadius: 14,
                  background: active
                    ? 'linear-gradient(135deg, rgba(233,30,140,0.13), rgba(233,30,140,0.06))'
                    : 'transparent',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  style={{ color: active ? '#E91E8C' : '#D1D5DB' }}
                  fill={active ? '#E91E8C' : 'none'}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: active ? 700 : 500,
                  lineHeight: 1,
                  color: active ? '#E91E8C' : '#D1D5DB',
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                    marginTop: 2,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
              {!active && <div style={{ width: 4, height: 4, marginTop: 2 }} />}
            </motion.button>
          );
        })}
      </div>
      {/* Safe area padding for iPhone home indicator */}
      <div className="h-safe-bottom" />
    </div>
  );
}
