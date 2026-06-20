import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import type { MobileState } from '../../types';
import { BottomNav } from '../../components/mobile/BottomNav';
import { MobileOnboarding } from './screens/MobileOnboarding';
import { MobileLogin } from './screens/MobileLogin';
import { MobileRegister } from './screens/MobileRegister';
import { MobileHome } from './screens/MobileHome';
import { MobileBooking } from './screens/MobileBooking';
import { MobileDoctorSelect } from './screens/MobileDoctorSelect';
import { MobileSchedule } from './screens/MobileSchedule';
import { MobileBookingConfirm } from './screens/MobileBookingConfirm';
import { MobilePayment } from './screens/MobilePayment';
import { MobileQueue } from './screens/MobileQueue';
import { MobileProfile } from './screens/MobileProfile';
import { MobileMedical } from './screens/MobileMedical';
import { MobileNotifications } from './screens/MobileNotifications';

const INITIAL_STATE: MobileState = {
  screen: 'onboarding',
  isLoggedIn: false,
  onboardingStep: 0,
};

const BOOKING_SCREENS = new Set([
  'booking', 'booking-doctor', 'booking-schedule', 'booking-confirm', 'booking-payment',
]);

const HIDE_BOTTOMNAV_SCREENS = new Set([
  'onboarding', 'login', 'register',
  'booking', 'booking-doctor', 'booking-schedule', 'booking-confirm', 'booking-payment',
]);

export function MobileLayout() {
  const [state, setStateRaw] = useState<MobileState>(INITIAL_STATE);

  const setState = useCallback((partial: Partial<MobileState>) => {
    setStateRaw(prev => ({ ...prev, ...partial }));
  }, []);

  const showBottomNav = state.isLoggedIn && !HIDE_BOTTOMNAV_SCREENS.has(state.screen);

  const handleNavigation = (screen: MobileState['screen']) => {
    setState({ screen });
  };

  const renderScreen = () => {
    switch (state.screen) {
      case 'onboarding':
        return <MobileOnboarding state={state} setState={setState} />;
      case 'login':
        return <MobileLogin setState={setState} />;
      case 'register':
        return <MobileRegister setState={setState} />;
      case 'home':
        return <MobileHome state={state} setState={setState} />;
      case 'booking':
        return <MobileBooking state={state} setState={setState} />;
      case 'booking-doctor':
        return <MobileDoctorSelect state={state} setState={setState} />;
      case 'booking-schedule':
        return <MobileSchedule state={state} setState={setState} />;
      case 'booking-confirm':
        return <MobileBookingConfirm state={state} setState={setState} />;
      case 'booking-payment':
        return <MobilePayment state={state} setState={setState} />;
      case 'queue':
        return <MobileQueue state={state} setState={setState} />;
      case 'profile':
        return <MobileProfile state={state} setState={setState} />;
      case 'medical':
        return <MobileMedical state={state} setState={setState} />;
      case 'notifications':
        return <MobileNotifications state={state} setState={setState} />;
      case 'doctors':
        return <MobileDoctorSelect state={state} setState={setState} />;
      case 'promos':
        return <MobileHome state={state} setState={setState} />;
      default:
        return <MobileHome state={state} setState={setState} />;
    }
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center"
      style={{ background: '#E5E7EB' }}
    >
      {/* Phone frame */}
      <div
        className="relative w-full max-w-[430px] min-h-screen flex flex-col overflow-hidden"
        style={{ background: 'white' }}
      >
        {/* Screen content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <div key={state.screen} className="flex flex-col flex-1 overflow-hidden">
              {renderScreen()}
            </div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        {showBottomNav && (
          <BottomNav
            currentScreen={state.screen}
            onNavigate={handleNavigation}
          />
        )}
      </div>
    </div>
  );
}

export default MobileLayout;
