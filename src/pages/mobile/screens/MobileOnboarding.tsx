import { motion, AnimatePresence } from 'motion/react';
import { Calendar, UserCheck, Smartphone, ChevronRight } from 'lucide-react';
import { OmdcLogo } from '../../../components/ui/OmdcLogo';
import type { MobileState } from '../../../types';

interface MobileOnboardingProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const SLIDES = [
  {
    id: 0,
    gradient: true,
  },
  {
    id: 1,
    title: 'Jadwalkan dengan Mudah',
    subtitle: 'Buat janji dokter gigi kapan saja, di mana saja',
    features: ['Pilih dokter favorit', 'Jadwal fleksibel', 'Reminder otomatis'],
    icons: [Calendar, UserCheck, Smartphone],
  },
  {
    id: 2,
    title: 'Pantau Antrian Real-time',
    subtitle: 'Tidak perlu menunggu lama, pantau nomor antrian dari smartphone',
  },
];

export function MobileOnboarding({ state, setState }: MobileOnboardingProps) {
  const step = state.onboardingStep ?? 0;

  const goNext = () => {
    if (step < 2) {
      setState({ onboardingStep: step + 1 });
    } else {
      setState({ screen: 'login' });
    }
  };

  const goLogin = () => setState({ screen: 'login' });

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="slide0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full items-center justify-between py-16 px-8 relative overflow-hidden"
            style={{ background: '#FFFFFF' }}
          >
            {/* 3px top accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)', zIndex: 10 }} />
            {/* Soft blobs */}
            <div style={{ position: 'absolute', top: -80, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

            {/* Logo area */}
            <div className="flex flex-col items-center gap-6 flex-1 justify-center relative z-10">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                className="rounded-3xl p-5 mb-2"
                style={{ background: 'white', boxShadow: '0 8px 40px rgba(233,30,140,0.15)', border: '1px solid rgba(233,30,140,0.1)' }}
              >
                <OmdcLogo size="xl" variant="default" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h1 className="text-3xl font-black mb-2 tracking-tight" style={{ color: '#111827' }}>
                  Aplikasi OMDC Dental
                </h1>
                <p className="text-lg font-semibold mb-3 italic" style={{ color: '#E91E8C' }}>
                  "Senyum Sehat, Percaya Diri Penuh"
                </p>
                <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#6B7280' }}>
                  Kelola kunjungan gigi Anda dengan mudah dan nyaman
                </p>
              </motion.div>
            </div>

            {/* Dots + Button */}
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === step ? 24 : 8,
                      height: 8,
                      background: i === step ? '#E91E8C' : '#F3F4F6',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-base text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 8px 24px rgba(233,30,140,0.3)' }}
              >
                Lanjut <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="slide1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full bg-white"
          >
            {/* Illustration area */}
            <div
              className="flex-1 flex flex-col items-center justify-center px-8 py-10"
              style={{ background: '#FFF5F9' }}
            >
              <div className="flex gap-5 mb-8">
                {[
                  { Icon: Calendar, color: '#E91E8C', bg: '#FFE0F0', label: 'Jadwal' },
                  { Icon: UserCheck, color: '#4FC3F7', bg: '#E0F5FF', label: 'Dokter' },
                  { Icon: Smartphone, color: '#A78BFA', bg: '#EDE9FE', label: 'Antrian' },
                ].map(({ Icon, color, bg, label }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center"
                      style={{ background: bg }}
                    >
                      <Icon size={36} color={color} />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>{label}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <h2 className="text-2xl font-black mb-3" style={{ color: '#1A1A2E' }}>
                  Jadwalkan dengan Mudah
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                  Buat janji dokter gigi kapan saja, di mana saja
                </p>

                <div className="flex flex-col gap-3 text-left">
                  {['Pilih dokter favorit', 'Jadwal fleksibel', 'Reminder otomatis'].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                      >
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#1A1A2E' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom */}
            <div className="px-8 py-8 flex flex-col gap-4">
              <div className="flex gap-2 justify-center">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === step ? 24 : 8,
                      height: 8,
                      background: i === step ? '#E91E8C' : '#F3F4F6',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-base text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 8px 24px rgba(233,30,140,0.3)' }}
              >
                Lanjut <ChevronRight size={20} />
              </button>
              <button onClick={goLogin} className="text-sm text-center font-medium" style={{ color: '#9CA3AF' }}>
                Lewati
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="slide2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full bg-white"
          >
            {/* Illustration */}
            <div
              className="flex-1 flex flex-col items-center justify-center px-8 py-10"
              style={{ background: 'linear-gradient(180deg, #FFF5F9 0%, #FFFFFF 100%)' }}
            >
              {/* Queue ticket illustration */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
                className="relative mb-8"
              >
                <div
                  className="w-56 rounded-3xl overflow-hidden"
                  style={{ boxShadow: '0 20px 60px rgba(233,30,140,0.2)' }}
                >
                  <div
                    className="py-4 px-6 text-center"
                    style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                  >
                    <p className="text-white/80 text-xs font-semibold mb-1">NOMOR ANTRIAN</p>
                    <p className="text-white text-5xl font-black tracking-widest">A018</p>
                  </div>
                  <div className="bg-white py-5 px-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Layanan</span><span className="font-semibold text-gray-800">Scaling</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Dokter</span><span className="font-semibold text-gray-800">drg. Sarah</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Waktu</span><span className="font-semibold text-gray-800">09:00</span>
                    </div>
                  </div>
                  <div
                    className="py-3 text-center"
                    style={{ background: '#F9FAFB', borderTop: '1px dashed #E5E7EB' }}
                  >
                    <p className="text-xs font-medium" style={{ color: '#E91E8C' }}>
                      Antrian saat ini: A017
                    </p>
                  </div>
                </div>

                {/* Ping badge */}
                <div
                  className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black animate-bounce"
                  style={{ background: '#10B981', boxShadow: '0 4px 12px rgba(16,185,129,0.4)' }}
                >
                  LIVE
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-center"
              >
                <h2 className="text-2xl font-black mb-3" style={{ color: '#1A1A2E' }}>
                  Pantau Antrian Real-time
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  Tidak perlu menunggu lama, pantau nomor antrian dari smartphone Anda
                </p>
              </motion.div>
            </div>

            {/* Bottom */}
            <div className="px-8 py-8 flex flex-col gap-4">
              <div className="flex gap-2 justify-center">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === step ? 24 : 8,
                      height: 8,
                      background: i === step ? '#E91E8C' : '#F3F4F6',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={goLogin}
                className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-base text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 8px 24px rgba(233,30,140,0.3)' }}
              >
                Mulai Sekarang
              </button>
              <button onClick={goLogin} className="text-sm text-center font-medium" style={{ color: '#9CA3AF' }}>
                Lewati
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
