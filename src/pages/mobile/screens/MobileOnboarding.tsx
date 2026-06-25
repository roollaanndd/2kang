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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      {/* 3px top strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #D4A017)', zIndex: 10 }} />

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
          {/* Illustration container */}
          <div style={{
            width: '100%', maxWidth: 320, aspectRatio: '1/1',
            margin: '0 auto 40px',
            borderRadius: 24,
            background: 'linear-gradient(180deg, rgba(255,245,249,0.5) 0%, transparent 100%)',
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(255,255,255,0.4)',
              borderRadius: 24,
            }} />
            <motion.img
              src={slide.img}
              alt="OMDC Dental onboarding illustration"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%', height: '100%', objectFit: 'contain',
                position: 'relative', zIndex: 1,
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
              }}
            />
          </div>

          {/* Text content */}
          <div style={{ textAlign: 'center', maxWidth: 300, margin: '0 auto' }}>
            <h1 style={{
              fontSize: 24, fontWeight: 700, color: '#0D1421',
              lineHeight: 1.3, letterSpacing: -0.3, marginBottom: 16,
              whiteSpace: 'pre-line',
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontSize: 14, color: '#6B7280', lineHeight: 1.6,
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

        {/* CTA button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={goNext}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, padding: '16px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
            fontWeight: 700, fontSize: 16, color: 'white',
            background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)',
            boxShadow: '0 8px 20px rgba(233,30,140,0.25)',
          }}
        >
          <span>{step < TOTAL - 1 ? 'Lanjut' : 'Mulai Sekarang'}</span>
          {step < TOTAL - 1 && <ArrowRight size={18} />}
        </motion.button>
      </footer>
    </div>
  );
}
