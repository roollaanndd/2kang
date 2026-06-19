import type { MobileScreen } from '../../types';
import { Home, Calendar, Ticket, User } from 'lucide-react';

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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-50"
      style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = isActive(id);
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 active:scale-95"
            >
              <div
                className="p-1.5 rounded-xl transition-all duration-200"
                style={active ? { background: '#FFF5F9' } : {}}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  style={{ color: active ? '#E91E8C' : '#9CA3AF' }}
                  fill={active ? '#E91E8C' : 'none'}
                />
              </div>
              <span
                className="text-[10px] font-semibold leading-none"
                style={{ color: active ? '#E91E8C' : '#9CA3AF' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area padding for iPhone home indicator */}
      <div className="h-safe-bottom" />
    </div>
  );
}
