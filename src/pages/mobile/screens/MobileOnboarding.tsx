import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { OmdcLogo } from '../../../components/ui/OmdcLogo';
import { AnimatedDentalBg } from '../../../components/ui/AnimatedDentalBg';
import type { MobileState } from '../../../types';

interface MobileOnboardingProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const TOTAL = 5;

// ── Dot navigation ─────────────────────────────────────────────────────────
function SlideDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 8,
            width: i === current ? 28 : 8,
            borderRadius: 4,
            background: i === current ? '#E91E8C' : '#F3F4F6',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

// ── Illustrations ──────────────────────────────────────────────────────────

function IlluGreeting() {
  return (
    <svg viewBox="0 0 280 240" width="260" height="220" fill="none">
      {/* Soft outer ring */}
      <circle cx="140" cy="112" r="96" fill="#FFF0F8" opacity="0.7" />
      <circle cx="140" cy="112" r="72" fill="#FFE0F2" opacity="0.5" />
      {/* Large tooth body */}
      <path
        d="M140 42C115 42 96 59 96 80c0 12 4 22 10 34 5.5 11 8.5 22 8.5 37 0 5 4 9 8.5 9h54c4.5 0 8.5-4 8.5-9 0-15 3-26 8.5-37 6-12 10-22 10-34C184 59 165 42 140 42z"
        fill="white"
        stroke="#E91E8C"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Tooth shine */}
      <path d="M120 52 Q130 48 138 53" stroke="#FFB8D9" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* Eyes */}
      <ellipse cx="129" cy="78" rx="5" ry="5.5" fill="#1A1A2E" />
      <ellipse cx="151" cy="78" rx="5" ry="5.5" fill="#1A1A2E" />
      <circle cx="131" cy="76" r="1.8" fill="white" />
      <circle cx="153" cy="76" r="1.8" fill="white" />
      {/* Smile */}
      <path d="M127 95 Q140 108 153 95" stroke="#E91E8C" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* Rosy cheeks */}
      <ellipse cx="120" cy="98" rx="9" ry="6" fill="#FFB8D9" opacity="0.5" />
      <ellipse cx="160" cy="98" rx="9" ry="6" fill="#FFB8D9" opacity="0.5" />
      {/* Wave hand */}
      <path d="M68 80 Q64 68 72 62 Q78 58 82 65 Q86 57 94 62 Q100 70 90 82z" fill="#FFDAB9" stroke="#E91E8C" strokeWidth="1.5" />
      <path d="M72 62 L74 50 Q76 44 82 46" stroke="#FFDAB9" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M82 65 L84 50 Q86 43 92 46" stroke="#FFDAB9" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M94 62 L94 52 Q96 46 101 49" stroke="#FFDAB9" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Stars / sparkles */}
      <path d="M198 50 l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#FFB800" />
      <path d="M58 130 l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#06B6D4" />
      <path d="M208 140 l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#FF6BB5" />
      {/* Stethoscope at bottom-left */}
      <circle cx="92" cy="175" r="12" fill="#06B6D4" opacity="0.15" />
      <circle cx="92" cy="175" r="7" stroke="#06B6D4" strokeWidth="2" />
      <path d="M92 168 Q80 158 74 148" stroke="#06B6D4" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="74" cy="144" r="4" fill="#06B6D4" />
      {/* Cross medical */}
      <path d="M200 168 h12 M206 162 v12" stroke="#E91E8C" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function IlluBooking() {
  return (
    <svg viewBox="0 0 280 240" width="260" height="220" fill="none">
      {/* Background */}
      <circle cx="140" cy="112" r="90" fill="#F0F8FF" opacity="0.6" />
      {/* Phone */}
      <rect x="78" y="30" width="104" height="180" rx="20" fill="white" stroke="#E5E7EB" strokeWidth="2" />
      {/* Notch */}
      <rect x="112" y="36" width="36" height="8" rx="4" fill="#F0F0F5" />
      {/* Screen */}
      <rect x="86" y="52" width="88" height="148" rx="12" fill="#F8F9FB" />
      {/* Calendar header bar */}
      <rect x="86" y="52" width="88" height="32" rx="12" fill="#E91E8C" />
      <rect x="86" y="66" width="88" height="18" fill="#E91E8C" />
      {/* Calendar rows – 7 cols × 3 rows */}
      {[0,1,2,3,4,5,6].map(c =>
        [0,1,2].map(r => (
          <rect
            key={`${c}-${r}`}
            x={91 + c * 12}
            y={90 + r * 18}
            width="9" height="9" rx="3"
            fill={c === 2 && r === 1 ? '#E91E8C' : '#ECEEF2'}
          />
        ))
      )}
      {/* Appointment mini-card */}
      <rect x="90" y="150" width="80" height="44" rx="10" fill="white" />
      <rect x="90" y="150" width="4" height="44" rx="2" fill="#E91E8C" />
      {/* Card dots (simulating text) */}
      <rect x="98" y="158" width="44" height="6" rx="3" fill="#E91E8C" opacity="0.7" />
      <rect x="98" y="168" width="32" height="5" rx="2.5" fill="#1A1A2E" opacity="0.5" />
      <rect x="98" y="176" width="24" height="4" rx="2" fill="#9CA3AF" opacity="0.6" />
      {/* Green check badge */}
      <circle cx="196" cy="62" r="22" fill="#10B981" />
      <path d="M186 62 l7 7 13-12" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clock */}
      <circle cx="60" cy="140" r="18" fill="white" stroke="#06B6D4" strokeWidth="2.5" />
      <path d="M60 126 V140 H71" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="140" r="2" fill="#06B6D4" />
      {/* Stars */}
      <path d="M215 110 l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#FFB800" />
      <circle cx="45" cy="80" r="5" fill="#FF6BB5" opacity="0.7" />
      <circle cx="230" cy="165" r="4" fill="#A78BFA" opacity="0.7" />
    </svg>
  );
}

function IlluFamily() {
  return (
    <svg viewBox="0 0 280 240" width="260" height="220" fill="none">
      {/* Background */}
      <circle cx="140" cy="112" r="90" fill="#FFF5F0" opacity="0.6" />
      {/* House/home shape */}
      <path d="M140 42 L94 78 L94 178 L186 178 L186 78z" fill="#FFF5F9" stroke="#E91E8C" strokeWidth="2.5" />
      <path d="M78 82 L140 38 L202 82" stroke="#E91E8C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Door */}
      <rect x="123" y="140" width="34" height="38" rx="17" fill="#FFE0F2" stroke="#E91E8C" strokeWidth="2" />
      <circle cx="152" cy="160" r="2.5" fill="#E91E8C" />
      {/* Person 1 (left - adult) */}
      <circle cx="104" cy="102" r="13" fill="#FFDAB9" stroke="#E5D5C5" strokeWidth="1.5" />
      <path d="M84 140 Q84 120 104 118 Q124 120 124 140" fill="#06B6D4" stroke="#05A3BB" strokeWidth="1.5" />
      {/* Person 2 (right - adult) */}
      <circle cx="176" cy="102" r="13" fill="#FFDAB9" stroke="#E5D5C5" strokeWidth="1.5" />
      <path d="M156 140 Q156 120 176 118 Q196 120 196 140" fill="#E91E8C" stroke="#C9186F" strokeWidth="1.5" />
      {/* Person 3 (center - child) */}
      <circle cx="140" cy="116" r="10" fill="#FFDAB9" stroke="#E5D5C5" strokeWidth="1.5" />
      <path d="M124 148 Q124 132 140 130 Q156 132 156 148" fill="#FF6BB5" stroke="#DB2777" strokeWidth="1.5" />
      {/* Heart above house */}
      <path d="M140 32 Q140 22 148 22 Q160 22 160 34 Q160 44 140 54 Q120 44 120 34 Q120 22 132 22 Q140 22 140 32z" fill="#E91E8C" opacity="0.8" />
      {/* Tooth in heart badge */}
      <circle cx="200" cy="50" r="18" fill="white" stroke="#E91E8C" strokeWidth="2" />
      <path d="M200 40 Q192 40 192 47 Q192 52 195 56 195 59 200 59 205 59 205 56 208 52 208 47 Q208 40 200 40z" fill="#E91E8C" opacity="0.5" />
      {/* Stars */}
      <path d="M50 100 l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#FFB800" />
      <circle cx="238" cy="140" r="5" fill="#A78BFA" opacity="0.7" />
      <circle cx="55" cy="170" r="4" fill="#06B6D4" opacity="0.6" />
    </svg>
  );
}

function IlluRewards() {
  return (
    <svg viewBox="0 0 280 240" width="260" height="220" fill="none">
      {/* Background */}
      <circle cx="140" cy="112" r="90" fill="#FFFBF0" opacity="0.6" />
      {/* Trophy base */}
      <rect x="118" y="168" width="44" height="12" rx="6" fill="#F59E0B" />
      <rect x="126" y="152" width="28" height="18" rx="4" fill="#F59E0B" />
      {/* Trophy cup */}
      <path d="M96 72 Q96 140 140 148 Q184 140 184 72z" fill="#FFB800" />
      <path d="M96 72 Q96 140 140 148 Q184 140 184 72z" fill="url(#trophyGrad)" />
      {/* Trophy handles */}
      <path d="M96 80 Q80 80 80 96 Q80 112 96 112" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M184 80 Q200 80 200 96 Q200 112 184 112" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* Star on trophy */}
      <path d="M140 88 l5 14 15 0-12 9 5 14-13-9-13 9 5-14-12-9 15 0z" fill="white" opacity="0.9" />
      {/* Star badges floating */}
      <circle cx="66" cy="80" r="18" fill="#E91E8C" />
      <path d="M66 70 l2.5 7 7.5 0-6 4.5 2.5 7-6.5-4.5-6.5 4.5 2.5-7-6-4.5 7.5 0z" fill="white" />
      <circle cx="214" cy="95" r="14" fill="#06B6D4" />
      <path d="M214 87 l2 5.5 5.5 0-4.5 3.5 2 5.5-5-3.5-5 3.5 2-5.5-4.5-3.5 5.5 0z" fill="white" />
      {/* Coins */}
      <circle cx="60" cy="140" r="12" fill="#FFB800" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="60" cy="140" r="7" fill="#F59E0B" opacity="0.5" />
      <circle cx="220" cy="148" r="10" fill="#FFB800" stroke="#F59E0B" strokeWidth="2" />
      {/* Sparkles / confetti */}
      <path d="M90 52 l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FF6BB5" />
      <path d="M185 48 l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#A78BFA" />
      <circle cx="52" cy="65" r="4" fill="#10B981" opacity="0.7" />
      <circle cx="230" cy="64" r="5" fill="#E91E8C" opacity="0.5" />
      <rect x="78" y="38" width="5" height="5" rx="1" fill="#06B6D4" opacity="0.7" transform="rotate(30 80 40)" />
      <rect x="190" y="145" width="4" height="4" rx="1" fill="#FFB800" opacity="0.8" transform="rotate(45 192 147)" />
      {/* Gradient def */}
      <defs>
        <linearGradient id="trophyGrad" x1="96" y1="72" x2="184" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Slide content config ───────────────────────────────────────────────────
type SplashSlide = { id: number; type: 'splash' };
type FeatureSlide = { id: number; type: 'feature'; title: string; subtitle: string; Illus: () => React.ReactElement; bg: string };
type SlideConfig = SplashSlide | FeatureSlide;

const SLIDES: SlideConfig[] = [
  { id: 0, type: 'splash' },
  {
    id: 1,
    type: 'feature',
    title: 'Selamat Datang!',
    subtitle: 'Kelola kesehatan gigi Anda dan keluarga dari genggaman tangan dengan mudah.',
    Illus: IlluGreeting,
    bg: 'linear-gradient(180deg, #FFF5FA 0%, #FFFFFF 60%)',
  },
  {
    id: 2,
    type: 'feature',
    title: 'Booking Mudah, Kapan Saja',
    subtitle: 'Jadwalkan kunjungan dokter gigi dalam hitungan detik. Pilih dokter, tentukan waktu — selesai!',
    Illus: IlluBooking,
    bg: 'linear-gradient(180deg, #EFF8FF 0%, #FFFFFF 60%)',
  },
  {
    id: 3,
    type: 'feature',
    title: 'Kelola Bersama Keluarga',
    subtitle: 'Satu akun untuk seluruh keluarga. Pantau jadwal dan riwayat perawatan gigi bersama.',
    Illus: IlluFamily,
    bg: 'linear-gradient(180deg, #FFF5F0 0%, #FFFFFF 60%)',
  },
  {
    id: 4,
    type: 'feature',
    title: 'Dapatkan Reward Setiap Kunjungan',
    subtitle: 'Kumpulkan poin dari setiap perawatan dan tukarkan dengan hadiah menarik pilihan Anda.',
    Illus: IlluRewards,
    bg: 'linear-gradient(180deg, #FFFBF0 0%, #FFFFFF 60%)',
  },
];

// ── Main component ──────────────────────────────────────────────────────────
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
      <AnimatePresence mode="wait">

        {/* ── Slide 0: Splash ── */}
        {step === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}
          >
            {/* 3px brand strip */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)', zIndex: 10 }} />
            <AnimatedDentalBg size="sm" />

            {/* Logo + tagline */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, padding: '60px 32px 20px' }}>
              <motion.div
                initial={{ scale: 0.72, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.12, type: 'spring', stiffness: 220, damping: 18 }}
                style={{ borderRadius: 28, padding: 20, marginBottom: 24, background: 'white', boxShadow: '0 10px 48px rgba(233,30,140,0.18)', border: '1px solid rgba(233,30,140,0.10)' }}
              >
                <OmdcLogo size="xl" variant="default" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ textAlign: 'center' }}
              >
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#111827', letterSpacing: -0.5, marginBottom: 8, lineHeight: 1.1 }}>
                  OMDC Dental App
                </h1>
                <p style={{ fontSize: 16, fontWeight: 600, fontStyle: 'italic', color: '#E91E8C', marginBottom: 10 }}>
                  "Senyum Sehat, Percaya Diri Penuh"
                </p>
                <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6, maxWidth: 260, margin: '0 auto' }}>
                  Kelola kunjungan gigi Anda dengan mudah dan nyaman
                </p>
              </motion.div>
            </div>

            {/* Bottom */}
            <div style={{ padding: '0 24px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <SlideDots current={step} total={TOTAL} />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={goNext}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 18, padding: '16px 0', fontWeight: 800, fontSize: 16, color: 'white', background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(233,30,140,0.32)' }}
              >
                Mulai <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── Slides 1–4: Feature slides ── */}
        {step > 0 && (
          <motion.div
            key={`s${step}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            {/* Illustration area */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: slide.type === 'feature' ? slide.bg : '#FFFFFF',
              padding: '20px 24px 0',
              overflow: 'hidden',
            }}>
              {/* 3px strip */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />

              {/* Illustration */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.08, type: 'spring', stiffness: 200, damping: 22 }}
                style={{ marginBottom: 4 }}
              >
                {slide.type === 'feature' && <slide.Illus />}
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                style={{ textAlign: 'center', paddingBottom: 16 }}
              >
                <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A2E', marginBottom: 10, lineHeight: 1.2, letterSpacing: -0.3 }}>
                  {slide.type === 'feature' ? slide.title : ''}
                </h2>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, maxWidth: 280 }}>
                  {slide.type === 'feature' ? slide.subtitle : ''}
                </p>
              </motion.div>
            </div>

            {/* Step indicator bar */}
            <div style={{ height: 4, background: '#F3F4F6' }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, #E91E8C, #06B6D4)', borderRadius: 2 }}
                animate={{ width: `${(step / (TOTAL - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            {/* Bottom */}
            <div style={{ padding: '16px 24px 36px', display: 'flex', flexDirection: 'column', gap: 14, background: 'white' }}>
              <SlideDots current={step} total={TOTAL} />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={goNext}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 18, padding: '16px 0', fontWeight: 800, fontSize: 16, color: 'white', background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(233,30,140,0.30)' }}
              >
                {step < TOTAL - 1 ? (<>Lanjut <ChevronRight size={20} /></>) : 'Mulai Sekarang'}
              </motion.button>
              <button
                onClick={goLogin}
                style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 500, color: '#9CA3AF', cursor: 'pointer', paddingBottom: 4 }}
              >
                Lewati
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
