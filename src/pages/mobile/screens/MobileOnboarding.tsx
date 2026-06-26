import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { MobileState } from '../../../types';

interface MobileOnboardingProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const TOTAL = 5;

const SLIDES = [
  {
    id: 0,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1w4cvbdYjxfVenUd7tN_p60fTLksacPF7v6SdIexxkoogYmWaSkUO7Cr8PZdgqToEn4uSxgqW4RApYlb3MJE5RVws-5j0f55QpsFF_sY0GomMVPHdy51dnibOp8rhk80WizjLZfDYuQ4KN8dfLT0i7_LPBwEwjIm134O-zw9gpJm498i1hzwhqDR_b_MYID-MFuvcN6YuOfp0haO63MZzO1dNOOqGL7kc2VNnr4YWtL1SnUCAa7rYhyP4eXt8a2rSU6P0RPGd4lk',
    title: 'Senyum Sehat\nMulai Dari Sini',
    subtitle: 'Nikmati perawatan gigi premium dengan kenyamanan maksimal untuk Anda dan keluarga.',
  },
  {
    id: 1,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1w4cvbdYjxfVenUd7tN_p60fTLksacPF7v6SdIexxkoogYmWaSkUO7Cr8PZdgqToEn4uSxgqW4RApYlb3MJE5RVws-5j0f55QpsFF_sY0GomMVPHdy51dnibOp8rhk80WizjLZfDYuQ4KN8dfLT0i7_LPBwEwjIm134O-zw9gpJm498i1hzwhqDR_b_MYID-MFuvcN6YuOfp0haO63MZzO1dNOOqGL7kc2VNnr4YWtL1SnUCAa7rYhyP4eXt8a2rSU6P0RPGd4lk',
    title: 'Selamat Datang!',
    subtitle: 'Kelola kesehatan gigi Anda dan keluarga dari genggaman tangan dengan mudah.',
  },
  {
    id: 2,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1w4cvbdYjxfVenUd7tN_p60fTLksacPF7v6SdIexxkoogYmWaSkUO7Cr8PZdgqToEn4uSxgqW4RApYlb3MJE5RVws-5j0f55QpsFF_sY0GomMVPHdy51dnibOp8rhk80WizjLZfDYuQ4KN8dfLT0i7_LPBwEwjIm134O-zw9gpJm498i1hzwhqDR_b_MYID-MFuvcN6YuOfp0haO63MZzO1dNOOqGL7kc2VNnr4YWtL1SnUCAa7rYhyP4eXt8a2rSU6P0RPGd4lk',
    title: 'Booking Mudah,\nKapan Saja',
    subtitle: 'Jadwalkan kunjungan dokter gigi dalam hitungan detik. Pilih dokter, tentukan waktu — selesai!',
  },
  {
    id: 3,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1w4cvbdYjxfVenUd7tN_p60fTLksacPF7v6SdIexxkoogYmWaSkUO7Cr8PZdgqToEn4uSxgqW4RApYlb3MJE5RVws-5j0f55QpsFF_sY0GomMVPHdy51dnibOp8rhk80WizjLZfDYuQ4KN8dfLT0i7_LPBwEwjIm134O-zw9gpJm498i1hzwhqDR_b_MYID-MFuvcN6YuOfp0haO63MZzO1dNOOqGL7kc2VNnr4YWtL1SnUCAa7rYhyP4eXt8a2rSU6P0RPGd4lk',
    title: 'Kelola Bersama\nKeluarga',
    subtitle: 'Satu akun untuk seluruh keluarga. Pantau jadwal dan riwayat perawatan gigi bersama.',
  },
  {
    id: 4,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1w4cvbdYjxfVenUd7tN_p60fTLksacPF7v6SdIexxkoogYmWaSkUO7Cr8PZdgqToEn4uSxgqW4RApYlb3MJE5RVws-5j0f55QpsFF_sY0GomMVPHdy51dnibOp8rhk80WizjLZfDYuQ4KN8dfLT0i7_LPBwEwjIm134O-zw9gpJm498i1hzwhqDR_b_MYID-MFuvcN6YuOfp0haO63MZzO1dNOOqGL7kc2VNnr4YWtL1SnUCAa7rYhyP4eXt8a2rSU6P0RPGd4lk',
    title: 'Dapatkan Reward\nSetiap Kunjungan',
    subtitle: 'Kumpulkan poin dari setiap perawatan dan tukarkan dengan hadiah menarik pilihan Anda.',
  },
];

export function MobileOnboarding({ state, setState }: MobileOnboardingProps) {
  const step = state.onboardingStep ?? 0;

  const goNext = () => {
    if (step < TOTAL - 1) {
      setState({ onboardingStep: step + 1 });
    } else {
      setState({ screen: 'login' });
    }
  };

  const goLogin = () => setState({ screen: 'login' });

  const slide = SLIDES[Math.min(step, SLIDES.length - 1)];
  const progressPct = ((step + 1) / TOTAL) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFF5F9', position: 'relative', overflow: 'hidden', fontFamily: "'Nunito Sans', 'Plus Jakarta Sans', sans-serif" }}>
      {/* 4px brand strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)', zIndex: 10 }} />

      {/* Skip button */}
      <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px 24px 0' }}>
        <button
          onClick={goLogin}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#6B7280', fontSize: 14, fontWeight: 500,
            padding: '8px 16px', borderRadius: 999,
          }}
        >
          Lewati
        </button>
      </header>

      {/* Main illustration + text */}
      <AnimatePresence mode="wait">
        <motion.main
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 24px 0' }}
        >
          {/* Illustration container — clay card style */}
          <div style={{
            width: '100%', maxWidth: 300, aspectRatio: '1/1',
            margin: '0 auto 36px',
            borderRadius: 32,
            background: 'white',
            border: '3px solid rgba(233,30,140,0.12)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 0 rgba(233,30,140,0.10), 0 8px 28px rgba(233,30,140,0.12), 0 20px 40px rgba(0,0,0,0.05)',
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <motion.img
              src={slide.img}
              alt="OMDC Dental onboarding illustration"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '85%', height: '85%', objectFit: 'contain',
                position: 'relative', zIndex: 1,
                filter: 'drop-shadow(0 16px 32px rgba(233,30,140,0.18))',
              }}
            />
          </div>

          {/* Text content */}
          <div style={{ textAlign: 'center', maxWidth: 300, margin: '0 auto' }}>
            <h1 style={{
              fontSize: 26, fontWeight: 800, color: '#0D1421',
              lineHeight: 1.3, letterSpacing: -0.4, marginBottom: 14,
              whiteSpace: 'pre-line', fontFamily: "'Nunito Sans', sans-serif",
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontSize: 14, color: '#9CA3AF', lineHeight: 1.7, fontWeight: 500,
              padding: '0 8px',
            }}>
              {slide.subtitle}
            </p>
          </div>
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer style={{ padding: '32px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {/* Dots + progress bar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
          {/* Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 8,
                  width: i === step ? 32 : 8,
                  borderRadius: 4,
                  background: i === step ? '#E91E8C' : 'rgba(107,114,128,0.2)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
          {/* Progress bar */}
          <div style={{ width: '50%', height: 4, background: 'rgba(107,114,128,0.1)', borderRadius: 999, overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ height: '100%', background: '#E91E8C', borderRadius: 999 }}
            />
          </div>
        </div>

        {/* CTA button — clay primary */}
        <motion.button
          whileTap={{ y: 3 }}
          onClick={goNext}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, padding: '18px 0', borderRadius: 9999, border: 'none', cursor: 'pointer',
            fontWeight: 800, fontSize: 16, color: 'white',
            background: 'linear-gradient(145deg, #FF4DAD, #E91E8C)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 0 #C41678, 0 8px 22px rgba(233,30,140,0.40)',
            fontFamily: "'Nunito Sans', sans-serif",
          }}
        >
          <span>{step < TOTAL - 1 ? 'Lanjut' : 'Mulai Sekarang'}</span>
          {step < TOTAL - 1 && <ArrowRight size={18} />}
        </motion.button>
      </footer>
    </div>
  );
}
