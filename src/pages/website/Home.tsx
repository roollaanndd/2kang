/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronRight, Phone, MessageCircle, ArrowRight, Calendar, ChevronLeft, Quote, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useLanguage } from '../../context/LanguageContext';
import type { CMSTestimonial, CMSBeforeAfter } from '../../data/defaultCMSContent';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const CYAN = '#0EA5E9';
const PURPLE = '#8B5CF6';
const DEEP = '#06080F';

// ─── GRADIENT MESH BACKGROUND ─────────────────────────────────────────────────
function GradientMesh({ dark = false }: { dark?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: 700, height: 700, borderRadius: '50%',
        background: dark
          ? 'radial-gradient(circle, rgba(233,30,140,0.18) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(233,30,140,0.10) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%',
        width: 600, height: 600, borderRadius: '50%',
        background: dark
          ? 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '40%',
        width: 400, height: 400, borderRadius: '50%',
        background: dark
          ? 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
    </div>
  );
}

// ─── CUSTOM DENTAL SVG ICONS ─────────────────────────────────────────────────
const DENTAL_ICONS = [
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="17" cy="17" r="9" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.15"/>
    <line x1="24" y1="24" x2="33" y2="33" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="17" y1="12" x2="17" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="12" y1="17" x2="22" y2="17" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="17" cy="17" r="3.5" fill="white" fillOpacity="0.35"/>
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6C20 6 11 18 11 25C11 30 15 34 20 34C25 34 29 30 29 25C29 18 20 6 20 6Z" fill="white" fillOpacity="0.85"/>
    <path d="M16 26C16 28.2 17.8 30 20 30" stroke="white" strokeWidth="2" strokeLinecap="round" fillOpacity="0"/>
    <circle cx="30" cy="11" r="2.2" fill="white" fillOpacity="0.75"/>
    <path d="M32 7L34 5M34 9L36 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="14" r="1.6" fill="white" fillOpacity="0.6"/>
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 9C10 9 8 11.5 8 14C8 17 9.5 20 11 22C12.5 24.5 12.5 27 12.5 29C12.5 31 14 32 15 32C16 32 16.5 31 17 29C17.5 27 18 25 20 25C22 25 22.5 27 23 29C23.5 31 24 32 25 32C26 32 27.5 31 27.5 29C27.5 27 27.5 24.5 29 22C30.5 20 32 17 32 14C32 11.5 30 9 27 9C24.5 9 23 10 20 10C17 10 15.5 9 13 9Z" fill="white" fillOpacity="0.85"/>
    <rect x="16" y="15" width="8" height="6" rx="2" fill="white" fillOpacity="0.5"/>
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 11C12.5 11 11 13 11 15C11 18 12 21 13 23L14 31H17L18 23C18.5 21 18.5 18.5 18.5 16.5C18.5 13.5 17 11 15 11Z" fill="white" fillOpacity="0.85"/>
    <path d="M21 11C23.5 11 25 13 25 15C25 18 24 21 23 23L22 31H19L18 23C18.5 21 18.5 18.5 18.5 16.5C18.5 13.5 20 11 21 11Z" fill="white" fillOpacity="0.65"/>
    <path d="M27 5L31 2M29 9L33 6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M29 5L33 4" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="16" width="6" height="9" rx="2.5" fill="white" fillOpacity="0.85"/>
    <rect x="14" y="16" width="6" height="9" rx="2.5" fill="white" fillOpacity="0.85"/>
    <rect x="23" y="16" width="6" height="9" rx="2.5" fill="white" fillOpacity="0.85"/>
    <rect x="30" y="18" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.65"/>
    <path d="M11 20.5H14M20 20.5H23M29 20.5H30" stroke="white" strokeWidth="2.2"/>
    <path d="M5 20.5H4" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="17" cy="20.5" r="3" fill="white"/>
    <circle cx="26" cy="20.5" r="3" fill="white"/>
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="17" y="4" width="6" height="6" rx="2" fill="white" fillOpacity="0.9"/>
    <rect x="18" y="10" width="4" height="20" rx="2" fill="white" fillOpacity="0.75"/>
    <line x1="14" y1="14" x2="18" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="14" y1="18" x2="18" y2="18" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="14" y1="22" x2="18" y2="22" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="22" y1="14" x2="26" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="22" y1="18" x2="26" y2="18" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="22" y1="22" x2="26" y2="22" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16 30L20 35L24 30" fill="white" fillOpacity="0.85"/>
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L32 16L20 36L8 16L20 6Z" fill="white" fillOpacity="0.35" stroke="white" strokeWidth="2"/>
    <path d="M8 16H32" stroke="white" strokeWidth="1.8"/>
    <path d="M15 8L12 16L20 36" stroke="white" strokeWidth="1" strokeOpacity="0.6"/>
    <path d="M25 8L28 16L20 36" stroke="white" strokeWidth="1" strokeOpacity="0.6"/>
    <path d="M20 6L15 8M20 6L25 8" stroke="white" strokeWidth="1.8"/>
    <circle cx="20" cy="16" r="3" fill="white" fillOpacity="0.9"/>
  </svg>,
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="8" fill="white" fillOpacity="0.9"/>
    <line x1="20" y1="4" x2="20" y2="8" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="20" y1="32" x2="20" y2="36" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="4" y1="20" x2="8" y2="20" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="32" y1="20" x2="36" y2="20" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="8.1" y1="8.1" x2="11" y2="11" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="29" y1="29" x2="31.9" y2="31.9" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="31.9" y1="8.1" x2="29" y2="11" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="11" y1="29" x2="8.1" y2="31.9" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>,
];

// ─── HERO FRAME ───────────────────────────────────────────────────────────────
function HeroFrame({ images, primaryColor }: { images: string[]; primaryColor: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);

  const src = images[current] ?? null;

  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none">
      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 180, height: 180, borderRadius: '50%',
        background: `radial-gradient(circle, ${PINK}50 0%, transparent 70%)`,
        filter: 'blur(30px)',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: -40,
        width: 140, height: 140, borderRadius: '50%',
        background: `radial-gradient(circle, ${AQUA}40 0%, transparent 70%)`,
        filter: 'blur(30px)',
      }} />

      {/* Gradient outer ring */}
      <div
        className="relative rounded-[32px] p-[3px]"
        style={{
          background: `linear-gradient(145deg, ${primaryColor}, ${ROSE}, ${AQUA})`,
          boxShadow: `0 40px 80px ${primaryColor}30, 0 0 0 1px ${primaryColor}20`,
        }}
      >
        <div
          className="relative overflow-hidden rounded-[30px]"
          style={{ aspectRatio: '4/5', background: `${primaryColor}15` }}
        >
          <AnimatePresence mode="wait">
            {src ? (
              <motion.img
                key={current}
                src={src}
                alt="Hero"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: `linear-gradient(160deg, ${primaryColor}18, ${AQUA}18)` }}
              >
                <div className="text-7xl">🦷</div>
                <div className="text-sm font-semibold text-center px-6" style={{ color: primaryColor }}>
                  Upload foto hero di Admin CMS
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {src && (
            <div
              className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }}
            />
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrent(c => (c - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors"
                style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}
              >
                <ChevronLeft size={14} style={{ color: primaryColor }} />
              </button>
              <button
                onClick={() => setCurrent(c => (c + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors"
                style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}
              >
                <ChevronRight size={14} style={{ color: primaryColor }} />
              </button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 20 : 6, height: 6, borderRadius: 3,
                    background: i === current ? 'white' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s', border: 'none', cursor: 'pointer', padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating badge — Healthy Smile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-8 -left-8"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          borderRadius: 20,
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 8px 32px rgba(233,30,140,0.18), 0 0 0 1px rgba(255,255,255,0.8)',
        }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${PINK}15` }}>😁</div>
        <div>
          <div className="text-xs font-bold text-gray-800 leading-tight">Healthy Smile</div>
          <div className="text-[10px] text-gray-400">for Better Life</div>
        </div>
      </motion.div>

      {/* Floating badge — Rating */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-16 -right-8"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          borderRadius: 20,
          padding: '12px 16px',
          boxShadow: '0 8px 32px rgba(6,182,212,0.18), 0 0 0 1px rgba(255,255,255,0.8)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <Star size={14} fill="#F59E0B" className="text-yellow-400" />
          <span className="text-sm font-bold text-gray-800">4.9/5</span>
        </div>
        <div className="text-[10px] text-gray-400 mt-0.5">Rating Pasien</div>
      </motion.div>
    </div>
  );
}

// ─── STAT BAR ────────────────────────────────────────────────────────────────
const STAT_GRADIENTS = [
  `linear-gradient(135deg,${PINK},${ROSE})`,
  `linear-gradient(135deg,${AQUA},${CYAN})`,
  `linear-gradient(135deg,${PURPLE},#7C3AED)`,
  'linear-gradient(135deg,#10B981,#059669)',
];

function StatBar({ stats }: { stats: Array<{ value: string; label: string }> }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          whileHover={{ y: -4 }}
          style={{
            position: 'relative',
            textAlign: 'center',
            padding: '20px',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.25s ease',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: STAT_GRADIENTS[i % STAT_GRADIENTS.length],
          }} />
          <div style={{
            fontSize: 26, fontWeight: 900, lineHeight: 1.1,
            background: STAT_GRADIENTS[i % STAT_GRADIENTS.length],
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {stat.value}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontWeight: 500 }}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
const SERVICE_GRADIENTS = [
  `linear-gradient(135deg,${PINK},${ROSE})`,
  `linear-gradient(135deg,${AQUA},${CYAN})`,
  `linear-gradient(135deg,${PURPLE},#7C3AED)`,
  'linear-gradient(135deg,#10B981,#059669)',
  'linear-gradient(135deg,#F59E0B,#D97706)',
  'linear-gradient(135deg,#EF4444,#DC2626)',
  `linear-gradient(135deg,${ROSE},#DB2777)`,
  'linear-gradient(135deg,#14B8A6,#0D9488)',
];

const SERVICE_GLOW_COLORS = [
  `${PINK}30`, `${AQUA}30`, `${PURPLE}30`, '#10B98130',
  '#F59E0B30', '#EF444430', `${ROSE}30`, '#14B8A630',
];

function ServiceCard({ emoji, name, description, price, index }: {
  emoji: string; name: string; description: string; price: string; index: number;
}) {
  const grad = SERVICE_GRADIENTS[index % SERVICE_GRADIENTS.length];
  const glow = SERVICE_GLOW_COLORS[index % SERVICE_GLOW_COLORS.length];
  const icon = DENTAL_ICONS[index % DENTAL_ICONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.07 }}
      whileHover={{ y: -6 }}
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${glow}, 0 0 0 1px rgba(255,255,255,0.14)`;
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
      }}
    >
      {/* Gradient icon area */}
      <div style={{ position: 'relative', padding: '20px 16px 24px', background: grad, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -16, right: -16, width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ position: 'absolute', bottom: -8, left: -8, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ width: 44, height: 44, position: 'relative', zIndex: 1 }}>{icon}</div>
      </div>

      {/* Glass pull-up */}
      <div style={{
        position: 'relative',
        marginTop: -14,
        padding: '14px 14px 16px',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '16px 16px 0 0',
      }}>
        <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.92)', fontSize: 13, marginBottom: 4, lineHeight: 1.3 }}>{name}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 10, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>{description}</div>
        <div style={{ fontSize: 11, fontWeight: 800, background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {price}
        </div>
      </div>
    </motion.div>
  );
}

// ─── TESTIMONIAL CARD ────────────────────────────────────────────────────────
function TestimonialCard({ item, primaryColor, index }: { item: CMSTestimonial; primaryColor: string; index: number }) {
  const accents = [
    `linear-gradient(135deg,${PINK},${ROSE})`,
    `linear-gradient(135deg,${AQUA},${CYAN})`,
    `linear-gradient(135deg,${PURPLE},#7C3AED)`,
    'linear-gradient(135deg,#10B981,#059669)',
    'linear-gradient(135deg,#F59E0B,#D97706)',
    `linear-gradient(135deg,${ROSE},#DB2777)`,
  ];
  const grad = accents[index % accents.length];
  const initial = item.name[0] ?? 'P';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      whileHover={{ y: -5 }}
      style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.10)',
        transition: 'all 0.25s ease',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, width: '100%', background: grad }} />

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Quote icon */}
        <div style={{ marginBottom: 12, opacity: 0.3 }}>
          <Quote size={28} style={{ color: PINK }} />
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} fill={i < item.rating ? '#F59E0B' : 'rgba(255,255,255,0.15)'} style={{ color: i < item.rating ? '#F59E0B' : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>

        {/* Text */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, flex: 1, marginBottom: 16, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as any }}>
          "{item.text}"
        </p>

        {/* Treatment chip */}
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 100, color: 'white', background: grad }}>
            {item.treatment}
          </span>
        </div>

        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {item.avatar ? (
            <img src={item.avatar} alt={item.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700,
              background: grad, flexShrink: 0,
            }}>
              {initial}
            </div>
          )}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.2 }}>{item.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Pasien OMDC Dental</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── DOCTOR CARD ──────────────────────────────────────────────────────────────
function DoctorCard({ name, specialty, experience, photo, rating, patients, primaryColor, index }: {
  name: string; specialty: string; experience: string; photo: string | null;
  rating: number; patients: number; primaryColor: string; index: number;
}) {
  const initial = name.replace('drg. ', '')[0] ?? 'D';
  const avatarColors = [
    `linear-gradient(135deg, ${PINK}, ${ROSE})`,
    `linear-gradient(135deg, ${AQUA}, ${CYAN})`,
    `linear-gradient(135deg, ${PURPLE}, #7C3AED)`,
    'linear-gradient(135deg, #10B981, #059669)',
  ];
  const colorIdx = index % avatarColors.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.09 }}
      whileHover={{ y: -6 }}
      className="relative bg-white rounded-3xl overflow-hidden"
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Gradient top strip */}
      <div style={{ height: 4, width: '100%', background: avatarColors[colorIdx] }} />

      {/* Subtle swatch */}
      <div className="absolute top-0 left-0 right-0 h-28 opacity-[0.05]" style={{ background: avatarColors[colorIdx] }} />

      <div className="relative p-5 text-center">
        <div className="relative inline-block mb-4">
          <div
            className="w-[88px] h-[88px] rounded-full p-[3px] inline-flex"
            style={{ background: avatarColors[colorIdx], boxShadow: `0 8px 24px ${PINK}25` }}
          >
            {photo ? (
              <img src={photo} alt={name} className="w-full h-full rounded-full object-cover border-2 border-white" />
            ) : (
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-black border-2 border-white"
                style={{ background: avatarColors[colorIdx] }}
              >
                {initial}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-green-500 border-2 border-white shadow-sm">
            <span className="text-white text-[8px] font-bold">✓</span>
          </div>
        </div>

        <div className="font-bold text-gray-800 text-sm leading-snug">{name}</div>
        <div className="text-xs mt-1 font-semibold" style={{ color: primaryColor }}>{specialty}</div>
        <div className="text-xs text-gray-400 mt-0.5">{experience} Pengalaman</div>

        <div className="flex items-center justify-center gap-1.5 mt-3">
          <Star size={12} fill="#F59E0B" className="text-yellow-400" />
          <span className="text-xs font-bold text-gray-700">{rating}</span>
          <span className="text-xs text-gray-400">· {patients} pasien</span>
        </div>

        <Link
          to="/booking"
          className="mt-4 block text-xs font-semibold py-2.5 px-4 rounded-full transition-all hover:opacity-85 hover:-translate-y-0.5"
          style={{ background: avatarColors[colorIdx], color: 'white', boxShadow: `0 4px 12px ${PINK}30` }}
        >
          Buat Janji
        </Link>
      </div>
    </motion.div>
  );
}

// ─── PROMO CARD ──────────────────────────────────────────────────────────────
function PromoCard({ title, subtitle, discount, image, validUntil, badge, color }: {
  title: string; subtitle: string; discount: string; image: string | null;
  validUntil: string; badge: string; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl overflow-hidden bg-white"
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
        transition: 'all 0.25s ease',
      }}
    >
      <div className="relative px-5 pt-5 pb-5 overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
        <div style={{ position: 'absolute', top: -24, right: -24, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ position: 'absolute', bottom: -12, left: -12, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        {badge && (
          <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full text-white mb-2" style={{ background: 'rgba(255,255,255,0.25)' }}>
            {badge}
          </span>
        )}
        <div className="text-3xl font-extrabold text-white leading-tight">{discount}</div>
        <div className="font-bold text-white/90 text-sm mt-1">{title}</div>
      </div>

      <div className="p-5">
        <div className="text-xs text-gray-500 mb-2">{subtitle}</div>
        <div className="text-xs text-gray-400 mb-4">
          Berlaku hingga {new Date(validUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <Link
          to="/booking"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
        >
          Klaim Sekarang <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── ARTICLE CARD ─────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  'Tips Kesehatan': '#10B981',
  'Ortodonti': '#A78BFA',
  'Perawatan Kosmetik': '#EC4899',
};

function ArticleCard({ title, excerpt, thumbnail, category, publishedAt }: {
  title: string; excerpt: string; thumbnail: string | null; category: string; publishedAt: string;
}) {
  const catColor = CATEGORY_COLORS[category] ?? PINK;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.04)',
        transition: 'all 0.25s ease',
      }}
    >
      <div className="h-44 relative overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${catColor}18, ${catColor}08)` }}
          >
            <span className="text-4xl">🦷</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
            style={{ background: catColor, boxShadow: `0 2px 8px ${catColor}60` }}
          >
            {category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="font-semibold text-gray-800 text-sm leading-snug mb-2">{title}</div>
        <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{excerpt}</div>
        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-gray-400">
            {new Date(publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <div className="text-xs font-semibold flex items-center gap-0.5" style={{ color: catColor }}>
            Baca <ChevronRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── BEFORE / AFTER SLIDER ───────────────────────────────────────────────────
function BeforeAfterSlider({ item, primaryColor, t }: { item: CMSBeforeAfter; primaryColor: string; t: (k: string) => string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(98, Math.max(2, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => { if (dragging) calcPos(e.clientX); }, [dragging, calcPos]);
  const onTouchMove = useCallback((e: TouchEvent) => { calcPos(e.touches[0].clientX); }, [calcPos]);
  const stopDrag = useCallback(() => setDragging(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [onMouseMove, onTouchMove, stopDrag]);

  const hasBefore = !!item.before;
  const hasAfter = !!item.after;
  const hasBoth = hasBefore && hasAfter;

  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        style={{ aspectRatio: '4/3', cursor: hasBoth ? 'col-resize' : 'default' }}
        onMouseDown={() => hasBoth && setDragging(true)}
        onTouchStart={() => hasBoth && setDragging(true)}
        onMouseMove={e => hasBoth && calcPos(e.clientX)}
      >
        {hasAfter ? (
          <img src={item.after!} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}06)` }}>
            <span className="text-5xl">🦷</span>
            <span className="text-xs text-gray-400">Upload foto sesudah</span>
          </div>
        )}
        {hasBefore ? (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
          >
            <img src={item.before!} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ) : (
          !hasAfter && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{ background: `linear-gradient(135deg, ${primaryColor}08, ${AQUA}08)` }}>
              <span className="text-5xl">📸</span>
              <span className="text-xs text-gray-400">Upload foto sebelum & sesudah di Admin</span>
            </div>
          )
        )}
        {hasBefore && (
          <div className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
            style={{ background: 'rgba(0,0,0,0.6)' }}>
            {t('before')}
          </div>
        )}
        {hasAfter && (
          <div className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
            style={{ background: primaryColor }}>
            {t('after')}
          </div>
        )}
        {hasBoth && (
          <>
            <div
              className="absolute top-0 bottom-0 w-0.5"
              style={{ left: `${pos}%`, background: 'white', boxShadow: '0 0 8px rgba(0,0,0,0.4)', pointerEvents: 'none' }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl"
              style={{ left: `${pos}%`, pointerEvents: 'none', boxShadow: `0 4px 20px ${primaryColor}50, 0 0 0 2px ${primaryColor}` }}
            >
              <div className="flex gap-0.5">
                <ChevronLeft size={12} style={{ color: primaryColor }} />
                <ChevronRight size={12} style={{ color: primaryColor }} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="px-4 py-3 border-t border-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-gray-800">{item.title}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: primaryColor }}>{item.treatment}</div>
          </div>
          {hasBoth && (
            <div className="text-[10px] text-gray-400 flex items-center gap-1">
              <ChevronLeft size={10} />{t('drag_hint')}<ChevronRight size={10} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────
function FaqItem({ question, answer, primaryColor, index }: {
  question: string; answer: string; primaryColor: string; index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100"
      style={{ boxShadow: open ? `0 4px 24px ${primaryColor}15` : '0 2px 12px rgba(0,0,0,0.04)', transition: 'box-shadow 0.25s' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ background: open ? `${primaryColor}06` : 'white' }}
      >
        <span className="text-sm font-semibold text-gray-800 pr-4 leading-snug">{question}</span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: open ? primaryColor : `${primaryColor}15` }}
        >
          {open
            ? <ChevronUp size={14} color="white" />
            : <ChevronDown size={14} style={{ color: primaryColor }} />
          }
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
      style={{
        background: dark ? 'rgba(233,30,140,0.15)' : 'rgba(233,30,140,0.1)',
        color: dark ? ROSE : PINK,
        border: dark ? '1px solid rgba(233,30,140,0.2)' : 'none',
      }}
    >
      <Sparkles size={10} />
      {text}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
export function Home() {
  const { cms } = useCMS();
  const { t } = useLanguage();
  const { hero, services, doctors, promotions, articles, about, clinic, contact, trust, appearance } = cms;
  const primary = appearance.primaryColor || PINK;

  const visibleServices = services.items.filter(s => s.isVisible);
  const visibleDoctors = doctors.items.filter(d => d.isVisible);
  const visiblePromos = promotions.items.filter(p => p.isVisible);
  const visibleArticles = articles.items.filter(a => a.isVisible);

  const heroImages = hero.heroImages?.length > 0
    ? hero.heroImages
    : hero.heroImage ? [hero.heroImage] : [];

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ background: `linear-gradient(160deg, ${DEEP} 0%, #0D0A23 45%, #060E28 100%)` }}
      >
        <GradientMesh dark />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
                style={{
                  background: 'rgba(233,30,140,0.12)',
                  border: '1px solid rgba(233,30,140,0.25)',
                  color: ROSE,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span>🦷</span>
                <span>{hero.badgeText} · {hero.badgeSubtext}</span>
              </div>

              {/* Headline — gradient text */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5">
                <span style={{ color: 'rgba(255,255,255,0.95)' }}>{hero.headline}{' '}</span>
                <span style={{
                  background: `linear-gradient(135deg, ${PINK} 0%, ${ROSE} 40%, ${AQUA} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {hero.headlineAccent}
                </span>
              </h1>

              <p className="text-base text-white/55 leading-relaxed mb-10 max-w-lg">
                {hero.subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  to="/booking"
                  className="flex items-center gap-2 px-7 py-4 rounded-full text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                    boxShadow: `0 8px 32px ${PINK}45`,
                  }}
                >
                  <Calendar size={18} />
                  {hero.ctaPrimaryText}
                </Link>
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {hero.ctaSecondaryText}
                  <ChevronRight size={18} />
                </Link>
              </div>

              {/* Contact quick links */}
              <div className="flex gap-5">
                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:text-green-400"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    <MessageCircle size={15} className="text-green-400" />
                    WhatsApp
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    <Phone size={15} style={{ color: ROSE }} />
                    {contact.phone}
                  </a>
                )}
              </div>
            </motion.div>

            {/* Right: Hero image frame */}
            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <HeroFrame images={heroImages} primaryColor={primary} />
            </motion.div>
          </div>

          {/* Stats bar */}
          {hero.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-16"
            >
              <StatBar stats={hero.stats} />
            </motion.div>
          )}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      {visibleServices.length > 0 && (
        <section className="py-24 relative" style={{ background: `linear-gradient(180deg, ${DEEP} 0%, #0A0A1A 100%)` }}>
          <GradientMesh dark />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <SectionLabel text="Layanan" dark />
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'rgba(255,255,255,0.95)' }}>
                {services.sectionTitle}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto', fontSize: 14, lineHeight: 1.7 }}>
                {services.sectionSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleServices.map((s, idx) => (
                <ServiceCard key={s.id} {...s} index={idx} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: ROSE }}
              >
                Lihat Semua Layanan <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── DOCTORS ──────────────────────────────────────────────────────── */}
      {visibleDoctors.length > 0 && (
        <section className="py-24 relative" style={{ background: '#FAFBFF' }}>
          {/* Subtle light mesh */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div style={{
              position: 'absolute', top: '-20%', right: '-5%',
              width: 500, height: 500, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(233,30,140,0.06) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }} />
            <div style={{
              position: 'absolute', bottom: '-10%', left: '0%',
              width: 400, height: 400, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <SectionLabel text="Tim Dokter" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{doctors.sectionTitle}</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">{doctors.sectionSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {visibleDoctors.map((d, idx) => (
                <DoctorCard key={d.id} {...d} primaryColor={primary} index={idx} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/doctors" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70" style={{ color: primary }}>
                Lihat Semua Dokter <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      {(() => {
        const visibleTestimonials = (cms.testimonials?.items ?? []).filter(t => t.isVisible);
        if (!visibleTestimonials.length) return null;
        return (
          <section className="py-24 relative" style={{ background: `linear-gradient(160deg, #0A0814 0%, ${DEEP} 100%)` }}>
            <GradientMesh dark />
            <div className="relative max-w-7xl mx-auto px-6">
              <div className="text-center mb-14">
                <SectionLabel text="Testimoni" dark />
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'rgba(255,255,255,0.95)' }}>
                  {cms.testimonials.sectionTitle}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto', fontSize: 14, lineHeight: 1.7 }}>
                  {cms.testimonials.sectionSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleTestimonials.map((t, idx) => (
                  <TestimonialCard key={t.id} item={t} primaryColor={primary} index={idx} />
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── BEFORE/AFTER GALLERY ─────────────────────────────────────────── */}
      {(() => {
        const visibleGallery = (cms.gallery?.items ?? []).filter(g => g.isVisible);
        if (!visibleGallery.length) return null;
        return (
          <section className="py-24 relative" style={{ background: '#F8FAFC' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-14">
                <SectionLabel text={t('section_gallery')} />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{cms.gallery.sectionTitle}</h2>
                <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">{cms.gallery.sectionSubtitle}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleGallery.map(item => (
                  <BeforeAfterSlider key={item.id} item={item} primaryColor={primary} t={t} />
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      {(() => {
        const visibleFaqs = (cms.faq?.items ?? []).filter(f => f.isVisible);
        if (!visibleFaqs.length) return null;
        return (
          <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6">
              <div className="text-center mb-14">
                <SectionLabel text={t('section_faq')} />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{cms.faq.sectionTitle}</h2>
                <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">{cms.faq.sectionSubtitle}</p>
              </div>
              <div className="space-y-3">
                {visibleFaqs.map((f, idx) => (
                  <FaqItem key={f.id} {...f} primaryColor={primary} index={idx} />
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── CLINIC SECTION ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{
            position: 'absolute', top: '-30%', left: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233,30,140,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div
                className="rounded-3xl overflow-hidden aspect-[4/3]"
                style={{
                  background: `${primary}10`,
                  boxShadow: `0 24px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)`,
                }}
              >
                {clinic.photo ? (
                  <img src={clinic.photo} alt="Klinik" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">🏥</span>
                  </div>
                )}
              </div>
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl p-4 min-w-[150px]"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(255,255,255,0.8)',
                }}
              >
                <div className="text-2xl font-extrabold" style={{ color: primary }}>{clinic.stats[0]?.value}</div>
                <div className="text-xs text-gray-500">{clinic.stats[0]?.label}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionLabel text="Fasilitas" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{clinic.sectionTitle}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{clinic.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {clinic.stats.slice(1).map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl"
                    style={{
                      background: i % 2 === 0 ? `${PINK}08` : `${AQUA}08`,
                      border: `1px solid ${i % 2 === 0 ? PINK : AQUA}12`,
                    }}
                  >
                    <div
                      className="text-xl font-extrabold"
                      style={{ color: i % 2 === 0 ? primary : AQUA }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              {clinic.address && (
                <div className="text-sm text-gray-500 flex items-start gap-2">
                  <span>📍</span>
                  <span>{clinic.address}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROMOTIONS ────────────────────────────────────────────────────── */}
      {visiblePromos.length > 0 && (
        <section className="py-24" style={{ background: '#F8FAFC' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <SectionLabel text="Penawaran" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{promotions.sectionTitle}</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">{promotions.sectionSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visiblePromos.map(p => (
                <PromoCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ARTICLES ─────────────────────────────────────────────────────── */}
      {visibleArticles.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <SectionLabel text="Edukasi" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{articles.sectionTitle}</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">{articles.sectionSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleArticles.map(a => (
                <ArticleCard key={a.id} {...a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section className="py-24 relative" style={{ background: `linear-gradient(135deg, ${DEEP} 0%, #0D0A23 100%)` }}>
        <GradientMesh dark />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <SectionLabel text="Tentang Kami" dark />
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'rgba(255,255,255,0.95)' }}>{about.sectionTitle}</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{about.description}</p>
              {about.mission && (
                <div
                  className="rounded-2xl p-4 mb-3"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(233,30,140,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: ROSE }}>Misi</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{about.mission}</p>
                </div>
              )}
              {about.vision && (
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(6,182,212,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: AQUA }}>Visi</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{about.vision}</p>
                </div>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-2 gap-4">
                {about.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 text-center"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <div
                      className="text-2xl font-extrabold mb-1"
                      style={{
                        background: i % 2 === 0 ? `linear-gradient(135deg, ${PINK}, ${ROSE})` : `linear-gradient(135deg, ${AQUA}, ${CYAN})`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST LOGOS ──────────────────────────────────────────────────── */}
      {trust.logos.length > 0 && (
        <section className="py-12 bg-white border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center text-sm font-medium text-gray-400 mb-8">{trust.sectionTitle}</div>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {trust.logos.map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="px-6 py-3 rounded-xl bg-gray-50 border border-gray-100 font-bold text-gray-500 text-sm hover:border-gray-200 transition-all"
                >
                  {logo.logo || logo.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #1A0A2E 0%, #2D0A4E 35%, #1A1040 65%, #0A1628 100%)` }}>
        {/* Rich mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{
            position: 'absolute', top: '-30%', left: '-10%',
            width: 700, height: 700, borderRadius: '50%',
            background: `radial-gradient(circle, ${PINK}35 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-20%', right: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: `radial-gradient(circle, ${AQUA}25 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }} />
          <div style={{
            position: 'absolute', top: '30%', right: '20%',
            width: 400, height: 400, borderRadius: '50%',
            background: `radial-gradient(circle, ${PURPLE}20 0%, transparent 65%)`,
            filter: 'blur(60px)',
          }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="text-5xl mb-6">😁</div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4"
              style={{
                background: `linear-gradient(135deg, white 0%, rgba(255,255,255,0.85) 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            >
              Mulai Perjalanan Senyum Sehat Anda
            </h2>
            <p className="mb-10 leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Booking sekarang dan dapatkan konsultasi gratis untuk kunjungan pertama Anda
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/booking"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                  color: 'white',
                  boxShadow: `0 12px 40px ${PINK}50`,
                }}
              >
                <Calendar size={18} /> Booking Sekarang
              </Link>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <MessageCircle size={18} /> Chat WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
