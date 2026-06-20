/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronRight, Phone, MessageCircle, ArrowRight, Calendar, ChevronLeft, Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useLanguage } from '../../context/LanguageContext';
import type { CMSTestimonial, CMSBeforeAfter } from '../../data/defaultCMSContent';

const PINK = '#E91E8C';
const BLUE = '#4FC3F7';

// ─── CUSTOM DENTAL SVG ICONS ─────────────────────────────────────────────────
const DENTAL_ICONS = [
  // 0: Pemeriksaan — dental mirror + magnify
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="17" cy="17" r="9" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.15"/>
    <line x1="24" y1="24" x2="33" y2="33" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <line x1="17" y1="12" x2="17" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="12" y1="17" x2="22" y2="17" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="17" cy="17" r="3.5" fill="white" fillOpacity="0.35"/>
  </svg>,
  // 1: Scaling — water drop + sparkles
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6C20 6 11 18 11 25C11 30 15 34 20 34C25 34 29 30 29 25C29 18 20 6 20 6Z" fill="white" fillOpacity="0.85"/>
    <path d="M16 26C16 28.2 17.8 30 20 30" stroke="white" strokeWidth="2" strokeLinecap="round" fillOpacity="0"/>
    <circle cx="30" cy="11" r="2.2" fill="white" fillOpacity="0.75"/>
    <path d="M32 7L34 5M34 9L36 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="14" r="1.6" fill="white" fillOpacity="0.6"/>
  </svg>,
  // 2: Tambal — tooth shape with fill patch
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 9C10 9 8 11.5 8 14C8 17 9.5 20 11 22C12.5 24.5 12.5 27 12.5 29C12.5 31 14 32 15 32C16 32 16.5 31 17 29C17.5 27 18 25 20 25C22 25 22.5 27 23 29C23.5 31 24 32 25 32C26 32 27.5 31 27.5 29C27.5 27 27.5 24.5 29 22C30.5 20 32 17 32 14C32 11.5 30 9 27 9C24.5 9 23 10 20 10C17 10 15.5 9 13 9Z" fill="white" fillOpacity="0.85"/>
    <rect x="16" y="15" width="8" height="6" rx="2" fill="white" fillOpacity="0.5"/>
  </svg>,
  // 3: Cabut — tooth with motion arrows
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 11C12.5 11 11 13 11 15C11 18 12 21 13 23L14 31H17L18 23C18.5 21 18.5 18.5 18.5 16.5C18.5 13.5 17 11 15 11Z" fill="white" fillOpacity="0.85"/>
    <path d="M21 11C23.5 11 25 13 25 15C25 18 24 21 23 23L22 31H19L18 23C18.5 21 18.5 18.5 18.5 16.5C18.5 13.5 20 11 21 11Z" fill="white" fillOpacity="0.65"/>
    <path d="M27 5L31 2M29 9L33 6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M29 5L33 4" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
  </svg>,
  // 4: Kawat — braces
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
  // 5: Implan — dental implant screw
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
  // 6: Veneer — diamond
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L32 16L20 36L8 16L20 6Z" fill="white" fillOpacity="0.35" stroke="white" strokeWidth="2"/>
    <path d="M8 16H32" stroke="white" strokeWidth="1.8"/>
    <path d="M15 8L12 16L20 36" stroke="white" strokeWidth="1" strokeOpacity="0.6"/>
    <path d="M25 8L28 16L20 36" stroke="white" strokeWidth="1" strokeOpacity="0.6"/>
    <path d="M20 6L15 8M20 6L25 8" stroke="white" strokeWidth="1.8"/>
    <circle cx="20" cy="16" r="3" fill="white" fillOpacity="0.9"/>
  </svg>,
  // 7: Bleaching — radiant sun/laser
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

// ─── HERO FRAME (replaces blob) ───────────────────────────────────────────────
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
      {/* Decorative blobs behind the frame */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-20 blur-xl"
        style={{ background: primaryColor }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full opacity-15 blur-xl"
        style={{ background: BLUE }}
      />
      <div
        className="absolute top-1/2 -right-4 w-10 h-10 rounded-full opacity-25"
        style={{ background: primaryColor, transform: 'translateY(-60%)' }}
      />

      {/* Gradient outer ring */}
      <div
        className="relative rounded-[32px] p-[3px]"
        style={{
          background: `linear-gradient(145deg, ${primaryColor}, #FF6BB5, ${BLUE})`,
          boxShadow: `0 32px 64px ${primaryColor}30, 0 8px 24px rgba(0,0,0,0.12)`,
        }}
      >
        {/* Inner frame */}
        <div
          className="relative overflow-hidden rounded-[30px]"
          style={{ aspectRatio: '4/5', background: `${primaryColor}15` }}
        >
          {/* Image carousel */}
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
                style={{ background: `linear-gradient(160deg, ${primaryColor}18, ${BLUE}18)` }}
              >
                <div className="text-7xl">🦷</div>
                <div className="text-sm font-semibold text-center px-6" style={{ color: primaryColor }}>
                  Upload foto hero di Admin CMS
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom gradient scrim */}
          {src && (
            <div
              className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }}
            />
          )}

          {/* Nav arrows for multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrent(c => (c - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <ChevronLeft size={14} style={{ color: primaryColor }} />
              </button>
              <button
                onClick={() => setCurrent(c => (c + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <ChevronRight size={14} style={{ color: primaryColor }} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: 'white',
                    opacity: i === current ? 1 : 0.55,
                    transition: 'all 0.3s',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
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
        className="absolute top-8 -left-6 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
        style={{ boxShadow: '0 8px 32px rgba(233,30,140,0.15)' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${PINK}15` }}>
          😁
        </div>
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
        className="absolute bottom-16 -right-6 bg-white rounded-2xl shadow-xl px-4 py-3"
        style={{ boxShadow: '0 8px 32px rgba(79,195,247,0.2)' }}
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
  'linear-gradient(135deg,#E91E8C,#FF6BB5)',
  'linear-gradient(135deg,#4FC3F7,#0288D1)',
  'linear-gradient(135deg,#A78BFA,#7C3AED)',
  'linear-gradient(135deg,#10B981,#059669)',
];

function StatBar({ stats, primaryColor }: { stats: Array<{ value: string; label: string }>; primaryColor: string }) {
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
          className="relative text-center p-5 rounded-2xl bg-white border border-gray-50 overflow-hidden"
          style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'all 0.25s ease' }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: STAT_GRADIENTS[i % STAT_GRADIENTS.length] }} />
          {/* Corner glow */}
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full opacity-[0.07]" style={{ background: STAT_GRADIENTS[i % STAT_GRADIENTS.length] }} />
          <div className="text-2xl font-extrabold leading-tight" style={{ color: primaryColor }}>{stat.value}</div>
          <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
const SERVICE_GRADIENTS = [
  'linear-gradient(135deg,#E91E8C,#FF6BB5)',
  'linear-gradient(135deg,#4FC3F7,#0288D1)',
  'linear-gradient(135deg,#A78BFA,#7C3AED)',
  'linear-gradient(135deg,#10B981,#059669)',
  'linear-gradient(135deg,#F59E0B,#D97706)',
  'linear-gradient(135deg,#EF4444,#DC2626)',
  'linear-gradient(135deg,#EC4899,#DB2777)',
  'linear-gradient(135deg,#14B8A6,#0D9488)',
];

function ServiceCard({ emoji, name, description, price, primaryColor, index }: {
  emoji: string; name: string; description: string; price: string; primaryColor: string; index: number;
}) {
  const grad = SERVICE_GRADIENTS[index % SERVICE_GRADIENTS.length];
  const icon = DENTAL_ICONS[index % DENTAL_ICONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.07 }}
      whileHover={{ y: -6 }}
      className="relative bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.04)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Gradient top section */}
      <div
        className="relative px-4 pt-5 pb-7 overflow-hidden"
        style={{ background: grad }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -16, right: -16,
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
        }} />
        <div style={{
          position: 'absolute', bottom: -8, left: -8,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        {/* Custom SVG icon */}
        <div style={{ width: 44, height: 44, position: 'relative', zIndex: 1 }}>
          {icon}
        </div>
      </div>

      {/* White pull-up overlap */}
      <div
        className="relative bg-white rounded-t-2xl"
        style={{ marginTop: -14, padding: '12px 14px 14px' }}
      >
        <div className="font-bold text-gray-800 text-sm mb-1 leading-tight">{name}</div>
        <div className="text-xs text-gray-400 mb-2.5 leading-relaxed line-clamp-2">{description}</div>
        <div
          className="text-xs font-extrabold"
          style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {price}
        </div>
      </div>
    </motion.div>
  );
}

// ─── TESTIMONIAL CARD ────────────────────────────────────────────────────────
function TestimonialCard({ item, primaryColor, index }: { item: CMSTestimonial; primaryColor: string; index: number }) {
  const accents = [
    `linear-gradient(135deg,${primaryColor},#FF6BB5)`,
    `linear-gradient(135deg,#4FC3F7,#0288D1)`,
    `linear-gradient(135deg,#A78BFA,#7C3AED)`,
    `linear-gradient(135deg,#10B981,#059669)`,
    `linear-gradient(135deg,#F59E0B,#D97706)`,
    `linear-gradient(135deg,#EC4899,#DB2777)`,
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
      className="relative bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{
        boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.04)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: grad }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Quote icon */}
        <div className="mb-3" style={{ opacity: 0.15 }}>
          <Quote size={28} style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fill: primaryColor }} />
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} fill={i < item.rating ? '#F59E0B' : '#E5E7EB'} className={i < item.rating ? 'text-yellow-400' : 'text-gray-200'} />
          ))}
        </div>

        {/* Text */}
        <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4 line-clamp-4">"{item.text}"</p>

        {/* Treatment chip */}
        <div className="mb-4">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: grad }}>
            {item.treatment}
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
          {item.avatar ? (
            <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ background: grad }}
            >
              {initial}
            </div>
          )}
          <div>
            <div className="text-sm font-bold text-gray-800 leading-tight">{item.name}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Pasien OMDC Dental</div>
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
    `linear-gradient(135deg, ${primaryColor}, #FF6BB5)`,
    `linear-gradient(135deg, ${BLUE}, #0288D1)`,
    `linear-gradient(135deg, #A78BFA, #7C3AED)`,
    `linear-gradient(135deg, #10B981, #059669)`,
  ];
  const colorIdx = index % avatarColors.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.09 }}
      whileHover={{ y: -6 }}
      className="relative bg-white rounded-2xl overflow-hidden"
      style={{
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.04)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Gradient top strip */}
      <div className="h-1.5 w-full" style={{ background: avatarColors[colorIdx] }} />

      {/* Angled background swatch */}
      <div
        className="absolute top-0 left-0 right-0 h-24 opacity-[0.07]"
        style={{ background: avatarColors[colorIdx] }}
      />

      <div className="relative p-5 text-center">
        <div className="relative inline-block mb-4">
          <div
            className="w-[84px] h-[84px] rounded-full p-[3px] inline-flex"
            style={{ background: avatarColors[colorIdx] }}
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
          className="mt-3.5 block text-xs font-semibold py-2 px-4 rounded-full transition-all hover:opacity-85 hover:-translate-y-0.5"
          style={{ background: avatarColors[colorIdx], color: 'white' }}
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
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.04)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Gradient header */}
      <div className="relative px-5 pt-5 pb-5 overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
        {/* Decorative circles */}
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
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
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
        {/* Category chip overlaid on image */}
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
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.04)' }}>
      {/* Image comparison area */}
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        style={{ aspectRatio: '4/3', cursor: hasBoth ? 'col-resize' : 'default' }}
        onMouseDown={() => hasBoth && setDragging(true)}
        onTouchStart={() => hasBoth && setDragging(true)}
        onMouseMove={e => hasBoth && calcPos(e.clientX)}
      >
        {/* AFTER (base layer) */}
        {hasAfter ? (
          <img src={item.after!} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}06)` }}>
            <span className="text-5xl">🦷</span>
            <span className="text-xs text-gray-400">Upload foto sesudah</span>
          </div>
        )}

        {/* BEFORE (clip layer) */}
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
              style={{ background: `linear-gradient(135deg, ${primaryColor}08, #4FC3F708)` }}>
              <span className="text-5xl">📸</span>
              <span className="text-xs text-gray-400">Upload foto sebelum & sesudah di Admin</span>
            </div>
          )
        )}

        {/* Labels */}
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

        {/* Divider line + handle */}
        {hasBoth && (
          <>
            <div
              className="absolute top-0 bottom-0 w-0.5"
              style={{ left: `${pos}%`, background: 'white', boxShadow: '0 0 6px rgba(0,0,0,0.4)', pointerEvents: 'none' }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl"
              style={{ left: `${pos}%`, pointerEvents: 'none', boxShadow: `0 4px 16px ${primaryColor}40, 0 0 0 2px ${primaryColor}` }}
            >
              <div className="flex gap-0.5">
                <ChevronLeft size={12} style={{ color: primaryColor }} />
                <ChevronRight size={12} style={{ color: primaryColor }} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Card footer */}
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

  // Support both single heroImage (legacy) and heroImages array
  const heroImages = hero.heroImages?.length > 0
    ? hero.heroImages
    : hero.heroImage ? [hero.heroImage] : [];

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center" style={{ background: `linear-gradient(160deg, #fff9fc 0%, #fff 60%, #f0faff 100%)` }}>
        {/* Background decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5" style={{ background: primary, transform: 'translate(200px, -200px)' }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5" style={{ background: BLUE, transform: 'translate(-100px, 100px)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: `${primary}15`, color: primary }}>
                <span>🦷</span>
                <span>{hero.badgeText} · {hero.badgeSubtext}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                {hero.headline}{' '}
                <span style={{ color: primary }}>{hero.headlineAccent}</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                {hero.subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/booking"
                  className="flex items-center gap-2 px-7 py-4 rounded-full text-white font-semibold text-sm shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${primary}, #FF6BB5)` }}
                >
                  <Calendar size={18} />
                  {hero.ctaPrimaryText}
                </Link>
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm border-2 transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{ borderColor: primary, color: primary }}
                >
                  {hero.ctaSecondaryText}
                  <ChevronRight size={18} />
                </Link>
              </div>

              {/* Contact quick links */}
              <div className="flex gap-4 mt-6">
                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <MessageCircle size={16} className="text-green-500" />
                    WhatsApp
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <Phone size={16} style={{ color: primary }} />
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
              <StatBar stats={hero.stats} primaryColor={primary} />
            </motion.div>
          )}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      {visibleServices.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: `${primary}15`, color: primary }}>
                Layanan
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{services.sectionTitle}</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">{services.sectionSubtitle}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleServices.map((s, idx) => (
                <ServiceCard key={s.id} {...s} primaryColor={primary} index={idx} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70" style={{ color: primary }}>
                Lihat Semua Layanan <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── DOCTORS ──────────────────────────────────────────────────────── */}
      {visibleDoctors.length > 0 && (
        <section className="py-20" style={{ background: '#FFF5F9' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: `${primary}15`, color: primary }}>
                Tim Dokter
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{doctors.sectionTitle}</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">{doctors.sectionSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {visibleDoctors.map((d, idx) => (
                <DoctorCard key={d.id} {...d} primaryColor={primary} index={idx} />
              ))}
            </div>
            <div className="text-center mt-8">
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
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: `${primary}15`, color: primary }}>
                  Testimoni
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{cms.testimonials.sectionTitle}</h2>
                <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">{cms.testimonials.sectionSubtitle}</p>
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
          <section className="py-20" style={{ background: '#F8FAFC' }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: `${primary}15`, color: primary }}>
                  {t('section_gallery')}
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{cms.gallery.sectionTitle}</h2>
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
          <section className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: `${primary}15`, color: primary }}>
                  {t('section_faq')}
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{cms.faq.sectionTitle}</h2>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Clinic image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3]" style={{ background: `${primary}10` }}>
                {clinic.photo ? (
                  <img src={clinic.photo} alt="Klinik" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">🏥</span>
                  </div>
                )}
              </div>
              {/* Floating stats on image */}
              <div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 min-w-[150px]"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                <div className="text-2xl font-extrabold" style={{ color: primary }}>{clinic.stats[0]?.value}</div>
                <div className="text-xs text-gray-500">{clinic.stats[0]?.label}</div>
              </div>
            </motion.div>

            {/* Clinic text */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4" style={{ background: `${primary}15`, color: primary }}>
                Fasilitas
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{clinic.sectionTitle}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{clinic.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {clinic.stats.slice(1).map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ background: `${primary}08` }}>
                    <div className="text-xl font-extrabold" style={{ color: primary }}>{stat.value}</div>
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
        <section className="py-20" style={{ background: '#F8FAFC' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: `${primary}15`, color: primary }}>
                Penawaran
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{promotions.sectionTitle}</h2>
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: `${primary}15`, color: primary }}>
                Edukasi
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{articles.sectionTitle}</h2>
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
      <section className="py-20" style={{ background: `linear-gradient(135deg, ${primary}08, ${BLUE}08)` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4" style={{ background: `${primary}15`, color: primary }}>
                Tentang Kami
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{about.sectionTitle}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{about.description}</p>
              {about.mission && (
                <div className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: primary }}>Misi</div>
                  <p className="text-sm text-gray-600">{about.mission}</p>
                </div>
              )}
              {about.vision && (
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: BLUE }}>Visi</div>
                  <p className="text-sm text-gray-600">{about.vision}</p>
                </div>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-2 gap-4">
                {about.stats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 text-center" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                    <div className="text-2xl font-extrabold mb-1" style={{ color: i % 2 === 0 ? primary : BLUE }}>{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
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
      <section className="py-20" style={{ background: `linear-gradient(135deg, ${primary}, #FF6BB5)` }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="text-4xl mb-4">😁</div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Mulai Perjalanan Senyum Sehat Anda</h2>
            <p className="text-white/80 text-sm mb-8 leading-relaxed">
              Booking sekarang dan dapatkan konsultasi gratis untuk kunjungan pertama Anda
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/booking"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={{ color: primary }}
              >
                <Calendar size={18} /> Booking Sekarang
              </Link>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all"
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
