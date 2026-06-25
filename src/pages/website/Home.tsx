/* eslint-disable */
import { useState, useEffect, useRef, useCallback, type ReactNode, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star, ChevronRight, Phone, MessageCircle, ArrowRight,
  Calendar, ChevronLeft, Quote, ChevronDown, ChevronUp,
  CheckCircle, MapPin, Clock, Shield,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import type { CMSTestimonial, CMSBeforeAfter } from '../../data/defaultCMSContent';
import { CountUp } from '../../components/ui/CountUp';
import { SmoothImage } from '../../components/ui/SmoothImage';
import { Skeleton } from '../../components/ui/Skeleton';
import { OmdcServiceIcon, IconStar, IconSmile } from '../../components/ui/OmdcIcons';
import { WaveDivider } from '../../components/ui/WaveDivider';
import { SeoHead } from '../../components/ui/SeoHead';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';
const DARK = '#0D1421';

// ─── SCROLL-REVEAL HOOK ───────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 860) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
}

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────
function Eyebrow({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 9,
        padding: '7px 16px 7px 12px', borderRadius: 100,
        background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.85)',
        border: dark ? '1px solid rgba(255,255,255,0.22)' : '1px solid rgba(233,30,140,0.18)',
        color: dark ? 'rgba(255,255,255,0.92)' : PINK,
        fontSize: 11, fontWeight: 800,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        marginBottom: 18,
        boxShadow: dark ? 'none' : '0 4px 16px rgba(233,30,140,0.10)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Animated pulse dot replaces the static sparkle */}
      <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
        <motion.span
          animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: dark ? '#FFFFFF' : ROSE }}
        />
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `linear-gradient(135deg, ${PINK}, ${ROSE})` }} />
      </span>
      {text}
    </motion.div>
  );
}

function GradText({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{
      background: `linear-gradient(135deg, ${PINK} 0%, ${ROSE} 60%, ${GOLD} 100%)`,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      ...style,
    }}>
      {children}
    </span>
  );
}

// ── Playful sparkle decoration (4-pointed star) ────────────────────────────────
function Sparkle({ size = 20, color = PINK, style = {} }: { size?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
      <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" />
    </svg>
  );
}

// ── ANIMATED PLAYFUL HERO BACKGROUND — dental geometry + sparkles ────────────
function AnimatedHeroBg({ dark = false }: { dark?: boolean }) {
  const w = 'rgba(255,255,255,0.9)';
  const shapes = [
    { x: 90, y: -4,  s: 92,  d: 0,   t: 15, c: dark ? w : PINK, o: dark ? 0.04 : 0.06,  sh: 'tooth'   },
    { x: 2,  y: 8,   s: 100, d: 1.6, t: 13, c: dark ? w : GOLD, o: dark ? 0.03 : 0.06,  sh: 'ring'    },
    { x: 78, y: 55,  s: 28,  d: 0.9, t: 9,  c: dark ? w : GOLD, o: dark ? 0.04 : 0.10,  sh: 'sparkle' },
    { x: 4,  y: 62,  s: 68,  d: 2.3, t: 17, c: dark ? w : PINK, o: dark ? 0.03 : 0.05,  sh: 'tooth'   },
    { x: 88, y: 72,  s: 22,  d: 1.2, t: 8,  c: dark ? w : GOLD, o: dark ? 0.05 : 0.12,  sh: 'sparkle' },
    { x: 50, y: 88,  s: 72,  d: 0.5, t: 12, c: dark ? w : ROSE, o: dark ? 0.025: 0.05,  sh: 'ring'    },
    { x: 94, y: 30,  s: 22,  d: 1.9, t: 10, c: dark ? w : ROSE, o: dark ? 0.045: 0.09,  sh: 'sparkle' },
    { x: 8,  y: 30,  s: 18,  d: 0.3, t: 7,  c: dark ? w : PINK, o: dark ? 0.055: 0.12,  sh: 'sparkle' },
    { x: 40, y: 3,   s: 52,  d: 3.2, t: 19, c: dark ? w : ROSE, o: dark ? 0.022: 0.04,  sh: 'tooth'   },
    { x: 60, y: 10,  s: 80,  d: 2.6, t: 16, c: dark ? w : GOLD, o: dark ? 0.022: 0.05,  sh: 'ring'    },
    { x: 20, y: 78,  s: 16,  d: 1.5, t: 8,  c: dark ? w : GOLD, o: dark ? 0.04 : 0.14,  sh: 'sparkle' },
    { x: 66, y: 40,  s: 24,  d: 2.9, t: 13, c: dark ? w : PINK, o: dark ? 0.032: 0.06,  sh: 'plus'    },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {shapes.map((el, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', left: `${el.x}%`, top: `${el.y}%`, opacity: el.o }}
          animate={{
            y: [-10, 10, -10],
            rotate: el.sh === 'ring' ? [0, 6, 0] : el.sh === 'plus' ? [0, 18, 0] : el.sh === 'sparkle' ? [0, 22, 0] : [0, 3, 0],
          }}
          transition={{ duration: el.t, repeat: Infinity, delay: el.d, ease: 'easeInOut' }}
        >
          {el.sh === 'tooth' && (
            <svg width={el.s} height={Math.round(el.s * 1.15)} viewBox="0 0 100 115" fill="none">
              <path d="M50 5C33 5 19 18 19 34c0 10 3.5 18 8 27 4.5 9 7 17 7 28 0 3 2.5 5.5 5.5 5.5h21c3 0 5.5-2.5 5.5-5.5 0-11 2.5-19 7-28 4.5-9 8-17 8-27C81 18 67 5 50 5z"
                stroke={el.c} strokeWidth="3.5" strokeLinejoin="round" />
            </svg>
          )}
          {el.sh === 'ring' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="42" stroke={el.c} strokeWidth="2.5" />
              <circle cx="50" cy="50" r="30" stroke={el.c} strokeWidth="1.5" strokeDasharray="7 5" />
            </svg>
          )}
          {el.sh === 'plus' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100" fill="none">
              <path d="M50 18V82M18 50H82" stroke={el.c} strokeWidth="9" strokeLinecap="round" />
            </svg>
          )}
          {el.sh === 'sparkle' && (
            <svg width={el.s} height={el.s} viewBox="0 0 100 100">
              <path d="M50 10L55 45L90 50L55 55L50 90L45 55L10 50L45 45Z" fill={el.c} />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── BEFORE/AFTER SLIDER ─────────────────────────────────────────────────────
function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [pos, setPos] = useState(50);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={e => { dragging.current = true; updatePos(e.clientX); }}
      onMouseMove={e => { if (dragging.current) updatePos(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={e => { dragging.current = true; updatePos(e.touches[0].clientX); }}
      onTouchMove={e => { if (dragging.current) updatePos(e.touches[0].clientX); }}
      onTouchEnd={() => { dragging.current = false; }}
      style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none', aspectRatio: '4/3' }}
    >
      {(!beforeLoaded || !afterLoaded) && <Skeleton width="100%" height="100%" radius={0} style={{ position: 'absolute', inset: 0 }} />}
      <img src={before} alt="Sebelum" onLoad={() => setBeforeLoaded(true)} onError={() => setBeforeLoaded(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: beforeLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }} />
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={after} alt="Sesudah" onLoad={() => setAfterLoaded(true)} onError={() => setAfterLoaded(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: afterLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }} />
      </div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, transform: 'translateX(-50%)', width: 3, background: 'white', boxShadow: '0 0 12px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 40, height: 40, borderRadius: '50%', background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <ChevronLeft size={12} color={PINK} />
          <ChevronRight size={12} color={PINK} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.92)', color: '#374151', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, backdropFilter: 'blur(8px)' }}>Sebelum</div>
      <div style={{ position: 'absolute', top: 10, right: 10, background: PINK, color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Sesudah</div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(transparent, rgba(255,255,255,0.88))', color: '#374151', fontSize: 13, fontWeight: 700 }}>{title}</div>
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { cms } = useCMS();
  const h = cms.hero;
  const images = h.heroImages ?? [];
  const [imgIdx, setImgIdx] = useState(0);
  const isMobile = useIsMobile();
  const hasImages = images.length > 0;

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setImgIdx(i => (i + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);

  const services = cms.services.items.filter(s => s.isVisible).slice(0, 5);
  const stats = h.stats ?? [];
  const featuredDoctor = cms.doctors.items.find(d => d.isVisible) ?? null;

  return (
    <section style={{
      position: 'relative',
      background: hasImages ? '#FFF8F4' : 'linear-gradient(160deg, #FFF8F4 0%, #FFF0FA 50%, #FFFDF0 100%)',
      paddingTop: isMobile ? 92 : 80,
      overflow: 'hidden',
      minHeight: isMobile ? 'auto' : '100dvh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>

      {/* ── FULL-BLEED BACKGROUND IMAGES (crossfade) ── */}
      {hasImages && images.map((src, i) => (
        <motion.div
          key={src}
          animate={{ opacity: i === imgIdx ? 1 : 0, scale: i === imgIdx ? 1 : 1.04 }}
          transition={{ duration: 1.3, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'center center' : 'center 30%',
          }}
        />
      ))}

      {/* ── BLENDED OVERLAYS (light warm) ── */}
      {hasImages && (
        <>
          {/* Warm frosted gradient — opaque on left for dark text, clearing to reveal photo on right */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: isMobile
              ? 'linear-gradient(180deg, rgba(255,248,244,0.94) 0%, rgba(255,255,255,0.72) 45%, rgba(255,248,244,0.95) 100%)'
              : 'linear-gradient(108deg, rgba(255,255,255,0.97) 0%, rgba(255,248,244,0.92) 30%, rgba(255,255,255,0.45) 62%, rgba(255,255,255,0.08) 100%)',
          }} />
          {/* Brand tint — pink left, warm gold right */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: `linear-gradient(135deg, rgba(233,30,140,0.07) 0%, transparent 48%, rgba(212,160,23,0.05) 100%)`,
          }} />
        </>
      )}

      {/* ── GEOMETRIC SHAPES (always light theme) ── */}
      <AnimatedHeroBg dark={false} />

      {/* Playful floating sparkles — always visible */}
      <motion.div animate={{ y: [-8, 8, -8], rotate: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '12%', right: '8%', zIndex: 2, pointerEvents: 'none' }}>
        <Sparkle size={32} color={GOLD} style={{ opacity: 0.7 }} />
      </motion.div>
      <motion.div animate={{ y: [6, -6, 6], rotate: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{ position: 'absolute', top: '22%', right: '18%', zIndex: 2, pointerEvents: 'none' }}>
        <Sparkle size={18} color={PINK} style={{ opacity: 0.5 }} />
      </motion.div>
      <motion.div animate={{ y: [-5, 9, -5], rotate: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        style={{ position: 'absolute', bottom: '22%', right: '5%', zIndex: 2, pointerEvents: 'none' }}>
        <Sparkle size={24} color={ROSE} style={{ opacity: 0.6 }} />
      </motion.div>
      <motion.div animate={{ y: [4, -8, 4], rotate: [0, -18, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', top: '60%', right: '14%', zIndex: 2, pointerEvents: 'none' }}>
        <Sparkle size={14} color={GOLD} style={{ opacity: 0.8 }} />
      </motion.div>

      {/* Diagonal warm accents — only without background images */}
      {!hasImages && (
        <>
          <div style={{ position: 'absolute', top: '20%', right: '-4%', width: '52%', height: 3, background: `linear-gradient(90deg, transparent, ${ROSE}30, ${GOLD}30, transparent)`, transform: 'rotate(-6deg)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '27%', right: '-1%', width: '38%', height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}18, transparent)`, transform: 'rotate(-6deg)', pointerEvents: 'none' }} />
        </>
      )}

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ position: 'relative', zIndex: 2 }}>

        {hasImages ? (
          /* Full-bleed: 2-column — left text + right floating doctor card */
          <div style={{ display: isMobile ? 'block' : 'flex', alignItems: 'center', gap: 40 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.32, 0.72, 0, 1] }}
            style={{
              flex: '1 1 0',
              paddingTop: isMobile ? 16 : 48,
              paddingBottom: isMobile ? 80 : 60,
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            <Eyebrow text={h.badgeText || 'OMDC Dental 2026'} />

            <h1 style={{ fontSize: isMobile ? 'clamp(38px,10vw,52px)' : 'clamp(52px,5.5vw,78px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px', color: DARK, margin: 0, marginBottom: 6 }}>
              {h.headline || 'Senyum Sehat,'}
            </h1>
            <h1 style={{ fontSize: isMobile ? 'clamp(38px,10vw,52px)' : 'clamp(52px,5.5vw,78px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px', margin: 0, marginBottom: 24 }}>
              <GradText>{h.headlineAccent || 'Percaya Diri Penuh'}</GradText>
            </h1>

            {/* Service pills */}
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 24, justifyContent: isMobile ? 'center' : 'flex-start' }}>
              {services.map((sv, i) => (
                <motion.div key={sv.id}
                  initial={{ opacity: 0, scale: 0.82, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.24 + i * 0.07 }}
                  style={{ padding: '6px 13px', borderRadius: 100, background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(233,30,140,0.16)', backdropFilter: 'blur(8px)', fontSize: 12.5, color: '#374151', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 10px rgba(233,30,140,0.06)' }}>
                  <OmdcServiceIcon id={sv.id} size={15} color={i % 2 === 0 ? PINK : GOLD} />{sv.name}
                </motion.div>
              ))}
            </div>

            <p style={{ fontSize: isMobile ? 15.5 : 17, color: '#6B7280', lineHeight: 1.7, maxWidth: 500, margin: isMobile ? '0 auto 28px' : '0 0 32px' }}>
              {h.subheadline || 'Perawatan gigi modern dengan teknologi terkini untuk Anda dan keluarga tercinta.'}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: isMobile ? 32 : 44, justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} style={isMobile ? { flex: '1 1 100%', maxWidth: 320, margin: '0 auto' } : undefined}>
                <Link to="/booking" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '15px 32px',
                  width: isMobile ? '100%' : undefined,
                  background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                  color: 'white', borderRadius: 16, fontWeight: 700, fontSize: 15,
                  textDecoration: 'none', boxShadow: '0 10px 36px rgba(233,30,140,0.48)',
                }}>
                  {h.ctaPrimaryText || 'Booking Sekarang'}
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={14} />
                  </div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} style={isMobile ? { flex: '1 1 100%', maxWidth: 320, margin: '0 auto' } : undefined}>
                <Link to="/services" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '15px 24px',
                  width: isMobile ? '100%' : undefined,
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                  color: DARK, border: '1.5px solid rgba(233,30,140,0.18)', borderRadius: 16,
                  fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 2px 16px rgba(233,30,140,0.08)',
                }}>
                  {h.ctaSecondaryText || 'Lihat Layanan'}
                  <ChevronRight size={16} color={PINK} />
                </Link>
              </motion.div>
            </div>

            {/* Stats — frosted white cards on light bg */}
            <div style={{ display: isMobile ? 'grid' : 'flex', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : undefined, gap: isMobile ? 10 : 14, flexWrap: 'wrap', justifyContent: isMobile ? 'stretch' : 'flex-start' }}>
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isMobile ? '11px 10px' : '12px 20px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderRadius: 14, border: '1px solid rgba(233,30,140,0.10)', boxShadow: '0 4px 20px rgba(233,30,140,0.08)' }}>
                  <span style={{ fontSize: isMobile ? 19 : 22, fontWeight: 900, color: DARK }}><CountUp value={s.value} /></span>
                  <span style={{ fontSize: isMobile ? 10 : 11, color: '#9CA3AF', fontWeight: 500, marginTop: 2, whiteSpace: 'nowrap' }}>{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* ── MOBILE: doctor card (below hero content) ── */}
            {isMobile && featuredDoctor && (
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  marginTop: 22, textAlign: 'left',
                  background: 'rgba(255,255,255,0.96)',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 22, overflow: 'hidden',
                  boxShadow: '0 16px 48px rgba(233,30,140,0.16)',
                  border: '1px solid rgba(255,255,255,0.7)',
                }}
              >
                <div style={{ display: 'flex', gap: 12, padding: 12 }}>
                  <div style={{ position: 'relative', width: 92, height: 110, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
                    {featuredDoctor.photo ? (
                      <img src={featuredDoctor.photo} alt={featuredDoctor.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 36, fontWeight: 900, color: 'white' }}>{featuredDoctor.name[0]}</span>
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6, background: 'rgba(16,185,129,0.94)', borderRadius: 8, padding: '3px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 9, fontWeight: 700, color: 'white' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#6EE7B7' }} />
                      Tersedia
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: PINK, margin: 0 }}>Dokter Pilihan</p>
                    <p style={{ fontSize: 15, fontWeight: 800, color: DARK, margin: '3px 0 0', lineHeight: 1.25 }}>{featuredDoctor.name}</p>
                    <p style={{ fontSize: 12, color: '#6B7280', margin: '2px 0 0', fontWeight: 500 }}>{featuredDoctor.specialty}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 7 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 800, color: DARK }}>
                        <Star size={12} fill={GOLD} color={GOLD} />{featuredDoctor.rating}
                      </span>
                      <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{featuredDoctor.patients}+ pasien</span>
                      <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{featuredDoctor.experience}</span>
                    </div>
                  </div>
                </div>
                <Link to="/booking" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  margin: '0 12px 12px', padding: '12px 16px', borderRadius: 14,
                  background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                  color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  boxShadow: '0 6px 18px rgba(233,30,140,0.36)',
                }}>
                  <Calendar size={14} />
                  Booking dengan Dokter Ini
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* ── RIGHT: Floating doctor card (desktop only) ── */}
          {!isMobile && featuredDoctor && (
            <motion.div
              initial={{ opacity: 0, x: 48, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
              style={{ flex: '0 0 300px', paddingTop: 48, paddingBottom: 60 }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 24, overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(233,30,140,0.18), 0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255,255,255,0.7)',
              }}>
                {/* Doctor photo */}
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  {featuredDoctor.photo ? (
                    <img src={featuredDoctor.photo} alt={featuredDoctor.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 64, fontWeight: 900, color: 'white' }}>{featuredDoctor.name[0]}</span>
                    </div>
                  )}
                  {/* Available badge */}
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(16,185,129,0.92)', backdropFilter: 'blur(8px)',
                    borderRadius: 100, padding: '4px 12px',
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: 11, fontWeight: 700, color: 'white',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6EE7B7', flexShrink: 0 }} />
                    Tersedia Hari Ini
                  </div>
                </div>

                {/* Doctor info */}
                <div style={{ padding: '16px 18px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 800, color: DARK, margin: 0, lineHeight: 1.3 }}>{featuredDoctor.name}</p>
                      <p style={{ fontSize: 12, color: '#6B7280', margin: '3px 0 0', fontWeight: 500 }}>{featuredDoctor.specialty}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: '#FFF8F4', borderRadius: 10, padding: '4px 8px', flexShrink: 0 }}>
                      <Star size={12} fill={GOLD} color={GOLD} />
                      <span style={{ fontSize: 12, fontWeight: 800, color: DARK }}>{featuredDoctor.rating}</span>
                    </div>
                  </div>

                  {/* Mini stats */}
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    {[
                      { label: 'Pasien', value: `${featuredDoctor.patients}+` },
                      { label: 'Pengalaman', value: featuredDoctor.experience },
                    ].map((s, i) => (
                      <div key={i} style={{ flex: 1, background: '#F9FAFB', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: DARK }}>{s.value}</p>
                        <p style={{ margin: '2px 0 0', fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <Link to="/booking" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '11px 16px', borderRadius: 14,
                    background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                    color: 'white', fontWeight: 700, fontSize: 13,
                    textDecoration: 'none', boxShadow: '0 6px 20px rgba(233,30,140,0.4)',
                    width: '100%', boxSizing: 'border-box',
                  }}>
                    <Calendar size={14} />
                    Booking dengan Dokter Ini
                  </Link>
                </div>
              </div>

              {/* Next appointment floating chip */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  marginTop: 14,
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                  borderRadius: 16, padding: '12px 16px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  boxShadow: '0 8px 24px rgba(233,30,140,0.12)',
                  border: '1px solid rgba(233,30,140,0.12)',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={16} color="white" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: DARK }}>Slot Tersedia Besok</p>
                  <p style={{ margin: '2px 0 0', fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>08:00 — 10:00 · 14:00 — 16:00</p>
                </div>
              </motion.div>
            </motion.div>
          )}
          </div>
        ) : (
          /* No-image mode: classic 2-column with SVG illustration */
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '54% 46%', gap: isMobile ? 36 : 24, alignItems: 'center', paddingTop: isMobile ? 12 : 44, paddingBottom: isMobile ? 52 : 68 }}>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, ease: [0.32, 0.72, 0, 1] }}
              style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <Eyebrow text={h.badgeText || 'OMDC Dental 2026'} />
              <h1 style={{ fontSize: isMobile ? 'clamp(40px,10vw,54px)' : 'clamp(52px,5.5vw,76px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px', color: DARK, margin: 0, marginBottom: 6 }}>
                {h.headline || 'Senyum Sehat,'}
              </h1>
              <h1 style={{ fontSize: isMobile ? 'clamp(40px,10vw,54px)' : 'clamp(52px,5.5vw,76px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px', margin: 0, marginBottom: 22 }}>
                <GradText>{h.headlineAccent || 'Percaya Diri Penuh'}</GradText>
              </h1>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 22, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                {services.map((sv, i) => (
                  <motion.div key={sv.id} initial={{ opacity: 0, scale: 0.82, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.24 + i * 0.07 }}
                    style={{ padding: '6px 13px', borderRadius: 100, background: 'rgba(233,30,140,0.06)', border: '1px solid rgba(233,30,140,0.14)', fontSize: 12.5, color: '#374151', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <OmdcServiceIcon id={sv.id} size={15} color={i % 2 === 0 ? PINK : GOLD} />{sv.name}
                  </motion.div>
                ))}
              </div>
              <p style={{ fontSize: isMobile ? 15.5 : 17, color: '#6B7280', lineHeight: 1.7, maxWidth: 500, margin: isMobile ? '0 auto 28px' : '0 0 32px' }}>
                {h.subheadline || 'Perawatan gigi modern dengan teknologi terkini untuk Anda dan keluarga tercinta.'}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: isMobile ? 32 : 40, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} style={isMobile ? { flex: '1 1 100%', maxWidth: 320, margin: '0 auto' } : undefined}>
                  <Link to="/booking" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '15px 32px', width: isMobile ? '100%' : undefined, background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, color: 'white', borderRadius: 16, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 10px 36px rgba(233,30,140,0.38)' }}>
                    {h.ctaPrimaryText || 'Booking Sekarang'}
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={14} /></div>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} style={isMobile ? { flex: '1 1 100%', maxWidth: 320, margin: '0 auto' } : undefined}>
                  <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '15px 24px', width: isMobile ? '100%' : undefined, background: 'white', color: DARK, border: '1.5px solid rgba(0,0,0,0.10)', borderRadius: 16, fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                    {h.ctaSecondaryText || 'Lihat Layanan'} <ChevronRight size={16} color={PINK} />
                  </Link>
                </motion.div>
              </div>
              <div style={{ display: isMobile ? 'grid' : 'flex', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : undefined, gap: isMobile ? 10 : 14, flexWrap: 'wrap', justifyContent: isMobile ? 'stretch' : 'flex-start' }}>
                {stats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isMobile ? '11px 10px' : '12px 20px', background: 'white', borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                    <span style={{ fontSize: isMobile ? 19 : 22, fontWeight: 900, color: DARK }}><CountUp value={s.value} /></span>
                    <span style={{ fontSize: isMobile ? 10 : 11, color: '#9CA3AF', fontWeight: 500, marginTop: 2, whiteSpace: 'nowrap' }}>{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 36, y: isMobile ? 20 : 0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.72, delay: 0.16, ease: [0.32, 0.72, 0, 1] }}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
                <div style={{ borderRadius: 32, overflow: 'hidden', background: '#FFF8F4', padding: 16 }}>
                  <div style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0EolqzvY1WD2WOp6SMJdKAfmWFjfpNCMwTSa1ndh1x4It-v1j41ymL_OfNorfUA6mjRRuFakD-6K6WIRBoBtyttbuE5Ivgg8YTOseynTdlYroGQmGEdhf03RUWPZfuF76uArIkLfxm9a1Z14vb5Yh0VFlDIfJurcRoLF8l_ZqsCxQOFj8Pr2tmJnqKaiNHgfNcwpiUXhfmhjN6PbBxnqw9GtG9z5lbBi4bUiKS0hpL74lPZ4jnwrIMC_ALmA4HxPenTr68oA9VF8"
                      alt="Pasien OMDC Dental tersenyum"
                      style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,20,33,0.28), transparent)' }} />
                  </div>
                </div>
                {/* Floating doctor card */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', bottom: 4, left: -20, zIndex: 10,
                    background: 'white', borderRadius: 20, padding: '12px 16px',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.16)', border: '1px solid rgba(233,30,140,0.10)',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeN7q87J8qR8E0ucfCc4itng87NNA-kRonNC1qgDT_MnRGQ6l3c6veIVTHcfZ5w2zUYXSgFQDLidV3VYBuBduym_RsrpIyGSlgYhDqWJg2t1VZMSy-RDSWxtU7xtnTddBuuK8OpCe9ngSOYpSfJNNHMXVtthJnAtuaGeibKcILqPnHkbySqVut1_Cp_qMzFcQ6wWDspVw-77CS7gfij2UmsibjB9tn0S2OGGLx6fJG-UaRxeDO15FPa8FrSg04EfXXkNLJg5wuZ6o"
                    alt="drg. Sarah Wijaya"
                    style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${PINK}` }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: DARK }}>drg. Sarah Wijaya</div>
                    <div style={{ fontSize: 11, color: PINK, fontWeight: 600, marginBottom: 4 }}>Spesialis Ortodonti</div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#F59E0B" color="#F59E0B" />)}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Floating info cards — positioned over the right side of hero image */}
      {hasImages && !isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.65, type: 'spring', stiffness: 260, damping: 22 }}
            style={{ position: 'absolute', top: '28%', right: '6%', zIndex: 10, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)', borderRadius: 16, padding: '12px 16px', boxShadow: '0 12px 40px rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconStar size={19} color="#FFFFFF" /></div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 900, color: DARK, lineHeight: 1 }}><CountUp value="4.9" /></div>
              <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>Rating Pasien</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 22 }}
            style={{ position: 'absolute', bottom: '22%', right: '6%', zIndex: 10, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)', borderRadius: 16, padding: '12px 16px', boxShadow: '0 12px 40px rgba(212,160,23,0.18)', border: '1px solid rgba(212,160,23,0.15)', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${GOLD}, #F5C842)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconSmile size={19} color="#FFFFFF" /></div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 900, color: DARK, lineHeight: 1 }}><CountUp value="20K+" /></div>
              <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>Pasien Puas</div>
            </div>
          </motion.div>
        </>
      )}

      {/* Image pagination dots — bottom center, full-bleed mode */}
      {hasImages && images.length > 1 && (
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 7, zIndex: 10 }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setImgIdx(i)}
              style={{ width: i === imgIdx ? 28 : 9, height: 9, borderRadius: 5, background: i === imgIdx ? PINK : 'rgba(233,30,140,0.22)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.32s ease', boxShadow: i === imgIdx ? `0 0 8px ${PINK}66` : 'none' }} />
          ))}
        </div>
      )}

      {/* Bottom fade into next section */}
      {!isMobile && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, background: hasImages ? 'linear-gradient(transparent, rgba(255,255,255,0.98))' : '#FFFFFF', clipPath: 'ellipse(55% 100% at 50% 100%)', zIndex: 3 }} />
      )}
    </section>
  );
}

// ─── HERO TRUST BAR ───────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { label: 'BPJS Kesehatan', icon: <Shield size={16} color={PINK} /> },
  { label: 'Asuransi Swasta', icon: <CheckCircle size={16} color={PINK} /> },
  { label: 'Sertifikasi KKI', icon: <Star size={16} color={GOLD} /> },
  { label: 'Teknologi Digital', icon: <CheckCircle size={16} color='#06B6D4' /> },
  { label: 'Klinik Bersih', icon: <Shield size={16} color='#10B981' /> },
];

function HeroTrustBar() {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #FFF8F4 0%, #FFFFFF 50%, #FFF8F4 100%)',
      borderTop: '1px solid rgba(233,30,140,0.06)',
      borderBottom: '1px solid rgba(233,30,140,0.08)',
      padding: '20px 0',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C0C4CC', flexShrink: 0 }}>
            Dipercaya &amp; Tersertifikasi
          </span>
          <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.08)', flexShrink: 0 }} className="hidden sm:block" />
          {TRUST_BADGES.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '7px 14px', borderRadius: 100,
                background: 'white',
                border: '1px solid rgba(233,30,140,0.10)',
                boxShadow: '0 2px 8px rgba(233,30,140,0.06)',
                fontSize: 13, fontWeight: 700, color: DARK,
              }}
            >
              {badge.icon}
              {badge.label}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── WHY CHOOSE US SECTION ────────────────────────────────────────────────────
function WhyChooseUsSection() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  const FEATURES = [
    {
      icon: '🏆', grad: [PINK, ROSE] as const, label: 'Dokter Spesialis Bersertifikat',
      desc: 'Semua dokter kami berlisensi KKI dengan pengalaman klinis 10+ tahun di bidang kedokteran gigi spesialis.',
      stat: '15+', statLabel: 'Dokter Spesialis',
    },
    {
      icon: '✨', grad: [GOLD, '#F5C842'] as const, label: 'Teknologi Digital Terkini',
      desc: 'Digital X-ray, intraoral scanner, laser treatment & CAD/CAM untuk hasil presisi dan minim rasa sakit.',
      stat: '20+', statLabel: 'Alat Canggih',
    },
    {
      icon: '😊', grad: [ROSE, PINK] as const, label: '10,000+ Pasien Puas',
      desc: 'Ribuan keluarga telah mempercayakan kesehatan gigi mereka kepada kami selama 15+ tahun berturut-turut.',
      stat: '4.9', statLabel: 'Rating Rata-rata',
    },
    {
      icon: '💛', grad: ['#F5C842', GOLD] as const, label: 'Garansi Kepuasan Penuh',
      desc: 'Kami berkomitmen pada hasil terbaik. Jika belum puas, kami tangani kembali tanpa biaya tambahan.',
      stat: '100%', statLabel: 'Kepuasan Terjamin',
    },
  ] as const;

  return (
    <section ref={ref} style={{ background: '#FFFFFF', padding: isMobile ? '56px 0' : '88px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Warm cream tint stripe */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,240,250,0.5) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow text="Keunggulan Kami" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14 }}>
            Mengapa Pilih <GradText>OMDC Dental?</GradText>
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 520, margin: '0 auto' }}>
            Standar perawatan gigi kelas dunia dengan sentuhan hangat klinik keluarga Indonesia.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <motion.div key={f.label}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: `0 24px 56px ${f.grad[0]}22` }}
              style={{ background: 'white', borderRadius: 24, border: '1.5px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden', transition: 'all 0.3s' }}
            >
              <div style={{ height: 4, background: `linear-gradient(90deg, ${f.grad[0]}, ${f.grad[1]})` }} />
              <div style={{ padding: '24px 22px 28px' }}>
                <div style={{ width: 62, height: 62, borderRadius: 18, marginBottom: 18, background: `linear-gradient(135deg, ${f.grad[0]}, ${f.grad[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 8px 24px ${f.grad[0]}35` }}>
                  {f.icon}
                </div>
                <div style={{ fontSize: 30, fontWeight: 900, color: DARK, lineHeight: 1, marginBottom: 2 }}>{f.stat}</div>
                <p style={{ fontSize: 10, color: f.grad[0], fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{f.statLabel}</p>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: DARK, lineHeight: 1.3, marginBottom: 10 }}>{f.label}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS SECTION ─────────────────────────────────────────────────────
function HowItWorksSection() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  const STEPS = [
    { num: '01', icon: '📱', label: 'Pilih & Booking', color: PINK, colorEnd: ROSE, desc: 'Pilih layanan, dokter, tanggal, dan waktu yang sesuai via website, aplikasi mobile, kiosk, atau telepon.' },
    { num: '02', icon: '📅', label: 'Konfirmasi & Pengingat', color: GOLD, colorEnd: '#F5C842', desc: 'Dapatkan konfirmasi booking instan lewat SMS/WhatsApp + notifikasi pengingat sehari sebelum kunjungan.' },
    { num: '03', icon: '🦷', label: 'Kunjungi & Tersenyum', color: ROSE, colorEnd: PINK, desc: 'Datang ke klinik, ditangani dokter spesialis kami dengan penuh perhatian, dan pulang dengan senyum lebih sehat.' },
  ] as const;

  return (
    <section ref={ref} style={{ background: 'linear-gradient(160deg, #FFF8F4 0%, #FFFDF5 100%)', padding: isMobile ? '56px 0' : '88px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Warm sparkle top strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${GOLD})`, opacity: 0.25 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 60 }}>
          <Eyebrow text="Cara Kerja" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14 }}>
            Booking dalam <GradText>3 Langkah Mudah</GradText>
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 480, margin: '0 auto' }}>
            Dari booking hingga senyum sehat — mudah, cepat, tanpa antri panjang.
          </p>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Connecting gradient line — desktop only */}
          {!isMobile && (
            <div style={{
              position: 'absolute', top: 58, left: '16.7%', right: '16.7%', height: 2,
              background: `linear-gradient(90deg, ${PINK}44, ${GOLD}44, ${ROSE}44)`,
              zIndex: 0,
            }} />
          )}

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 20 : 40, position: 'relative', zIndex: 1 }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.55 }}
                style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 18 : 0, textAlign: isMobile ? 'left' : 'center' }}
              >
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: isMobile ? 0 : 24 }}>
                  <div style={{
                    width: 76, height: 76, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${step.color}, ${step.colorEnd})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 32, boxShadow: `0 14px 36px ${step.color}35`,
                    border: '5px solid white',
                    position: 'relative',
                  }}>
                    {step.icon}
                    <div style={{ position: 'absolute', top: -4, right: -4, width: 22, height: 22, borderRadius: '50%', background: `linear-gradient(135deg, ${step.color}, ${step.colorEnd})`, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: 'white' }}>
                      {step.num}
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 800, color: DARK, marginBottom: 10, lineHeight: 1.3 }}>{step.label}</h3>
                  <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 52 }}>
          <Link to="/booking" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 40px',
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, color: 'white',
            borderRadius: 18, fontWeight: 700, fontSize: 16, textDecoration: 'none',
            boxShadow: '0 10px 32px rgba(233,30,140,0.35)',
          }}>
            Mulai Booking Sekarang <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────
function ServicesSection() {
  const { cms } = useCMS();
  const s = cms.services;
  const visible = s.items.filter(i => i.isVisible);
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  const CARD_COLORS = [PINK, GOLD, ROSE, '#F5A0C8', GOLD, PINK, ROSE, '#F5C842'];

  return (
    <section ref={ref} style={{ background: '#FFFFFF', padding: isMobile ? '56px 0 0' : '80px 0 0', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 52, position: 'relative' }}>
          {/* Decorative section number — hidden on mobile to avoid overflow */}
          {!isMobile && (
            <div style={{
              fontSize: 120, fontWeight: 900, color: 'rgba(233,30,140,0.04)',
              position: 'absolute', top: -20, right: 0,
              lineHeight: 1, pointerEvents: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>01</div>
          )}
          <Eyebrow text="Layanan Kami" />
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {s.sectionTitle}
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: '#6B7280', maxWidth: 520, margin: '0 auto' }}>{s.sectionSubtitle}</p>
        </motion.div>

        {/* Bento grid — 2 cols on mobile, 4 cols on desktop */}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20 }}>
            {visible.map((item, i) => {
              const cardColor = CARD_COLORS[i % CARD_COLORS.length];
              const isFeatured = i === 0;

              if (isFeatured) {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0 }}
                    whileHover={{ y: -6 }}
                    style={{
                      gridColumn: 'span 2',
                      gridRow: isMobile ? 'auto' : 'span 2',
                      background: 'linear-gradient(150deg, #FFF8F4 0%, #FFE8F4 40%, #FFFDF0 100%)',
                      borderRadius: 24,
                      padding: isMobile ? '20px' : '32px',
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      minHeight: isMobile ? 160 : 280,
                      border: '1px solid rgba(233,30,140,0.12)',
                      boxShadow: '0 20px 60px rgba(233,30,140,0.12)',
                      transition: 'all 0.3s',
                      cursor: 'default',
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {/* decorative oversized tooth glyph */}
                    <div style={{ position: 'absolute', right: -28, bottom: -28, opacity: 0.06, pointerEvents: 'none' }}>
                      <OmdcServiceIcon id={item.id} size={200} color={PINK} />
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: isMobile ? 48 : 64, height: isMobile ? 48 : 64, borderRadius: isMobile ? 14 : 20,
                        background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: isMobile ? 12 : 20,
                        boxShadow: '0 10px 28px rgba(233,30,140,0.32)',
                      }}>
                        <OmdcServiceIcon id={item.id} size={isMobile ? 26 : 36} color="#FFFFFF" />
                      </div>
                      <div style={{ fontWeight: 800, fontSize: isMobile ? 15 : 22, color: DARK, marginBottom: isMobile ? 6 : 10, lineHeight: 1.2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.name}</div>
                      {!isMobile && <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, marginBottom: 16 }}>{item.description}</div>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                      <span style={{ fontSize: isMobile ? 13 : 16, fontWeight: 900, color: PINK }}>{item.price}</span>
                      <Link to="/booking" style={{ fontSize: 11, fontWeight: 700, color: 'white', background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, padding: isMobile ? '6px 10px' : '8px 16px', borderRadius: 20, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 4px 14px rgba(233,30,140,0.28)' }}>
                        Booking <ChevronRight size={10} />
                      </Link>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -4, boxShadow: `0 16px 40px ${cardColor}22` }}
                  style={{
                    background: 'white', borderRadius: isMobile ? 16 : 20, padding: isMobile ? '14px 12px' : 24,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    borderLeft: `3px solid ${cardColor}`,
                    cursor: 'default', transition: 'all 0.3s',
                  }}
                >
                  <div style={{ width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: isMobile ? 10 : 12, background: `${cardColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: isMobile ? 8 : 12 }}>
                    <OmdcServiceIcon id={item.id} size={isMobile ? 20 : 26} color={cardColor} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: isMobile ? 12 : 14, color: DARK, marginBottom: isMobile ? 4 : 6, lineHeight: 1.3 }}>{item.name}</div>
                  {!isMobile && <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.55, marginBottom: 12 }}>{item.description}</div>}
                  <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 800, color: cardColor }}>{item.price}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 40, paddingBottom: 0 }}>
          <Link to="/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px',
            background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, color: 'white',
            borderRadius: 14, fontWeight: 700, fontSize: 14, textDecoration: 'none',
            boxShadow: '0 6px 20px rgba(233,30,140,0.28)',
          }}>
            Lihat Semua Layanan <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
      <WaveDivider fromColor="#F8F9FB" toColor="#FFFFFF" />
    </section>
  );
}

// ─── DOCTORS SECTION ──────────────────────────────────────────────────────────
function DoctorsSection() {
  const { cms } = useCMS();
  const d = cms.doctors;
  const visible = d.items.filter(i => i.isVisible);
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  return (
    <section ref={ref} style={{ background: '#FAFAFA', padding: isMobile ? '56px 0 0' : '80px 0 0', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ marginBottom: isMobile ? 28 : 56, position: 'relative' }}>
          {/* Decorative section number — desktop only */}
          {!isMobile && (
            <div style={{
              fontSize: 120, fontWeight: 900, color: 'rgba(0,0,0,0.03)',
              position: 'absolute', top: -20, right: 0,
              lineHeight: 1, pointerEvents: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>02</div>
          )}
          <Eyebrow text="Tim Dokter Kami" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {d.sectionTitle}
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 480 }}>{d.sectionSubtitle}</p>
        </motion.div>

        <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 20, scrollbarWidth: 'none', alignItems: 'flex-start' }}>
          {visible.map((doc, i) => {
            const initials = doc.name.replace('drg. ', '').slice(0, 2).toUpperCase();
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                style={{
                  flexShrink: 0, width: 220,
                  background: 'white', borderRadius: 24,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  overflow: 'visible',
                  transition: 'all 0.3s',
                  marginTop: i % 2 === 1 ? 32 : 0,
                }}
              >
                {/* Pink gradient top section */}
                <div style={{ height: 80, background: `linear-gradient(135deg, ${PINK}14, ${GOLD}0A)`, borderRadius: '24px 24px 0 0', position: 'relative' }}>
                  {/* Overflow avatar */}
                  <div style={{
                    position: 'absolute', bottom: -28, left: 20,
                    width: 72, height: 72, borderRadius: '50%',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '4px solid white',
                    boxShadow: '0 8px 24px rgba(233,30,140,0.2)',
                  }}>
                    {doc.photo
                      ? <SmoothImage src={doc.photo} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ fontSize: 26, fontWeight: 900, color: 'white' }}>{initials}</span>
                    }
                  </div>
                  <div style={{ position: 'absolute', bottom: -6, left: 76, width: 18, height: 18, borderRadius: '50%', background: doc.patients > 0 ? '#10B981' : '#D1D5DB', border: '3px solid white' }} />
                </div>

                <div style={{ padding: '36px 20px 20px' }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: DARK, lineHeight: 1.3, marginBottom: 4 }}>{doc.name}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 12 }}>{doc.specialty} · {doc.experience}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={12} fill="#F59E0B" color="#F59E0B" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: DARK }}>{doc.rating}</span>
                    </div>
                    <span style={{ fontSize: 10, color: '#9CA3AF' }}>{doc.patients.toLocaleString('id-ID')} pasien</span>
                  </div>
                  <Link to="/booking"
                    style={{ display: 'block', marginTop: 14, padding: '9px', textAlign: 'center', background: 'rgba(233,30,140,0.07)', color: PINK, borderRadius: 10, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                    Buat Janji
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <WaveDivider fromColor="#FAFAFA" toColor="#F8F9FB" />
    </section>
  );
}

// ─── GALLERY SECTION ──────────────────────────────────────────────────────────
function GallerySection() {
  const { cms } = useCMS();
  const g = (cms as any).gallery;
  if (!g) return null;
  const visible = g.items?.filter((i: CMSBeforeAfter) => i.isVisible && i.before && i.after) ?? [];
  if (!visible.length) return null;
  const [ref, inView] = useInView();

  return (
    <section ref={ref} style={{ background: '#F8F9FB', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <Eyebrow text="Transformasi Senyum" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14 }}>
            {g.sectionTitle || 'Galeri Sebelum & Sesudah'}
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 500, margin: '0 auto' }}>{g.sectionSubtitle || 'Seret slider untuk melihat transformasi nyata pasien kami.'}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {visible.slice(0, 4).map((item: CMSBeforeAfter, i: number) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
              <BeforeAfterSlider before={item.before!} after={item.after!} title={item.title} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const { cms } = useCMS();
  const t = cms.testimonials;
  const visible = t.items.filter(i => i.isVisible);
  const [idx, setIdx] = useState(0);
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  if (!visible.length) return null;

  const prev = () => setIdx(i => (i - 1 + visible.length) % visible.length);
  const next = () => setIdx(i => (i + 1) % visible.length);

  return (
    <section ref={ref} style={{ background: '#F8F9FB', padding: isMobile ? '56px 0 0' : '80px 0 0', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 52, position: 'relative' }}>
          {/* Decorative section number — desktop only */}
          {!isMobile && (
            <div style={{
              fontSize: 120, fontWeight: 900, color: 'rgba(0,0,0,0.03)',
              position: 'absolute', top: -20, right: 0,
              lineHeight: 1, pointerEvents: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>03</div>
          )}
          <Eyebrow text="Testimoni Pasien" />
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {t.sectionTitle}
          </h2>
          <p style={{ fontSize: isMobile ? 15 : 17, color: '#6B7280', maxWidth: 500, margin: '0 auto' }}>{t.sectionSubtitle}</p>
        </motion.div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Giant decorative quote mark */}
          <div style={{
            position: 'absolute', top: -20, left: -10,
            fontSize: 240, fontWeight: 900, color: PINK, opacity: 0.04,
            lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            fontFamily: 'Georgia, serif', zIndex: 0,
          }}>"</div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: isMobile ? 12 : 20, position: 'relative', zIndex: 1 }}>
            {visible.slice(0, isMobile ? 3 : 6).map((item: CMSTestimonial, i) => {
              const isFeatured = i === 0;
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
                  style={{
                    background: isFeatured ? `linear-gradient(135deg, ${PINK}08, ${GOLD}05)` : 'white',
                    borderRadius: 20, padding: isFeatured ? (isMobile ? 20 : 28) : (isMobile ? 16 : 24),
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    border: isFeatured ? `1.5px solid ${PINK}20` : '1px solid rgba(0,0,0,0.05)',
                    gridColumn: isFeatured && !isMobile ? 'span 2' : undefined,
                  }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={isFeatured ? 16 : 14} fill={j < item.rating ? '#F59E0B' : '#E5E7EB'} color={j < item.rating ? '#F59E0B' : '#E5E7EB'} />
                    ))}
                  </div>
                  <Quote size={isFeatured ? 36 : 24} color="rgba(233,30,140,0.2)" style={{ marginBottom: 10 }} />
                  <p style={{ fontSize: isFeatured ? 16 : 14, color: '#374151', lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>{item.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.avatar
                        ? <SmoothImage src={item.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>{item.name[0]}</span>
                      }
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: DARK }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>{item.treatment}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <WaveDivider fromColor="#F8F9FB" toColor="#FFFFFF" />
    </section>
  );
}

// ─── PROMOTIONS SECTION ───────────────────────────────────────────────────────
function PromotionsSection() {
  const { cms } = useCMS();
  const p = cms.promotions;
  const visible = p.items.filter(i => i.isVisible);
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  if (!visible.length) return null;

  return (
    <section ref={ref} style={{ background: '#F8F9FB', padding: isMobile ? '56px 0 0' : '80px 0 0', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <Eyebrow text="Promo Spesial" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {p.sectionTitle}
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 480, margin: '0 auto' }}>{p.sectionSubtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {visible.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, rotate: 0, boxShadow: '0 20px 48px rgba(0,0,0,0.12)' }}
              style={{
                background: 'white', borderRadius: 22, overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.07)', transition: 'all 0.3s',
                transform: i % 2 === 1 ? 'rotate(0.5deg)' : 'rotate(-0.3deg)',
              }}>
              {/* Gradient header with clip path */}
              <div style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`, padding: '28px 24px 36px', position: 'relative', overflow: 'hidden', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
                <div style={{ position: 'absolute', top: -16, right: -16, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                {item.badge && (
                  <span style={{ fontSize: 10, fontWeight: 800, background: 'rgba(255,255,255,0.25)', color: 'white', padding: '3px 10px', borderRadius: 20, marginBottom: 8, display: 'inline-block' }}>
                    {item.badge}
                  </span>
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>{item.title}</span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: 'white', flexShrink: 0 }}>{item.discount}</span>
                </div>
              </div>
              <div style={{ padding: '16px 22px' }}>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, marginBottom: 10 }}>{item.subtitle}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>s/d {item.validUntil}</span>
                  <Link to="/booking" style={{ fontSize: 12, fontWeight: 700, color: item.color, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Klaim <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <WaveDivider fromColor="#F8F9FB" toColor="#FFFFFF" />
    </section>
  );
}

// ─── ARTICLES SECTION ─────────────────────────────────────────────────────────
function ArticlesSection() {
  const { cms } = useCMS();
  const a = cms.articles;
  const visible = a.items.filter(i => i.isVisible);
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  if (!visible.length) return null;

  return (
    <>
      <WaveDivider fromColor="#FFFFFF" toColor="#F8F9FB" />
      <section ref={ref} style={{ background: '#F8F9FB', padding: isMobile ? '56px 0' : '100px 0 80px', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: isMobile ? 28 : 44 }}>
            <div>
              <Eyebrow text="Artikel Kesehatan" />
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {a.sectionTitle}
              </h2>
              <p style={{ fontSize: isMobile ? 15 : 17, color: '#6B7280' }}>{a.sectionSubtitle}</p>
            </div>
            <Link to="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: PINK, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Semua artikel <ChevronRight size={16} />
            </Link>
          </motion.div>

          {/* Magazine layout — single col on mobile, 3-col with featured span on desktop */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 14 : 24 }}>
            {visible.slice(0, 3).map((item, i) => {
              const isFeatured = i === 0;
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
                  style={{
                    background: 'white', borderRadius: 20, overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.3s',
                    gridColumn: isFeatured && !isMobile ? 'span 2' : undefined,
                  }}>
                  {item.thumbnail ? (
                    <SmoothImage src={item.thumbnail} alt={item.title} wrapperStyle={{ height: isFeatured && !isMobile ? 260 : 180 }} style={{ width: '100%', height: isFeatured && !isMobile ? 260 : 180, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: isFeatured && !isMobile ? 260 : 180, background: `linear-gradient(135deg, rgba(233,30,140,0.1), rgba(6,182,212,0.1))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>📰</div>
                  )}
                  <div style={{ padding: isMobile ? '14px 16px' : '18px 20px' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: PINK, background: 'rgba(233,30,140,0.08)', padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                      {item.category}
                    </span>
                    <h3 style={{ fontSize: isFeatured && !isMobile ? 20 : 15, fontWeight: 700, color: DARK, lineHeight: 1.4, margin: '10px 0 8px', fontFamily: isFeatured && !isMobile ? "'Plus Jakarta Sans', sans-serif" : undefined }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.5, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: isFeatured && !isMobile ? 3 : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as any}>
                      {item.excerpt}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, color: '#C0C4CC' }}>{item.publishedAt}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: PINK, display: 'flex', alignItems: 'center', gap: 4 }}>
                        Baca <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── FAQ SECTION ──────────────────────────────────────────────────────────────
function FAQSection() {
  const { cms } = useCMS();
  const f = (cms as any).faq;
  if (!f) return null;
  const visible = f.items?.filter((i: any) => i.isVisible) ?? [];
  const [open, setOpen] = useState<string | null>(null);
  const [ref, inView] = useInView();
  if (!visible.length) return null;

  return (
    <section ref={ref} style={{ background: '#F8F9FB', padding: '80px 0' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}>
          <Eyebrow text="FAQ" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14 }}>
            {f.sectionTitle || 'Pertanyaan Umum'}
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280' }}>{f.sectionSubtitle || ''}</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visible.map((item: any, i: number) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.06 }}
              style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <button
                onClick={() => setOpen(open === item.id ? null : item.id)}
                style={{ width: '100%', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontWeight: 700, fontSize: 14, color: DARK, lineHeight: 1.4 }}>{item.question}</span>
                {open === item.id
                  ? <ChevronUp size={18} color={PINK} style={{ flexShrink: 0 }} />
                  : <ChevronDown size={18} color="#9CA3AF" style={{ flexShrink: 0 }} />
                }
              </button>
              <AnimatePresence>
                {open === item.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, padding: '0 22px 18px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRUST SECTION ────────────────────────────────────────────────────────────
const STATIC_TRUST_ITEMS = [
  { icon: <Shield size={18} color={PINK} />, label: 'BPJS Kesehatan' },
  { icon: <CheckCircle size={18} color={PINK} />, label: 'Asuransi Swasta' },
  { icon: <Star size={18} color={PINK} />, label: 'Sertifikasi KKI' },
  { icon: <Clock size={18} color={PINK} />, label: 'Teknologi Digital' },
  { icon: <MapPin size={18} color={PINK} />, label: 'Klinik Bersih' },
];

function TrustSection() {
  const { cms } = useCMS();
  const t = cms.trust;
  const [ref, inView] = useInView();

  const items = t.logos?.length ? t.logos.map(l => ({ label: l.logo || l.name, icon: <Shield size={18} color={PINK} /> })) : STATIC_TRUST_ITEMS;

  return (
    <section ref={ref} style={{ background: '#F8F9FB', padding: '40px 0', borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#C0C4CC', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
          {t.sectionTitle || 'Mitra & Asuransi Terpercaya'}
        </motion.p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', alignItems: 'center', opacity: 0.7 }}>
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, background: 'white', border: '1px solid rgba(0,0,0,0.06)', fontWeight: 700, color: DARK, fontSize: 14 }}>
              {item.icon}{item.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ──────────────────────────────────────────────────────────────
function CTASection() {
  const { cms } = useCMS();
  const c = cms.contact;
  const [ref, inView] = useInView();

  return (
    <section ref={ref} style={{ position: 'relative', padding: '80px 0', overflow: 'hidden', background: `linear-gradient(135deg, ${PINK} 0%, #F0387F 40%, ${ROSE} 100%)` }}>
      {/* Playful background decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 18, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '10%', left: '5%' }}>
          <Sparkle size={40} color="rgba(255,255,255,0.25)" />
        </motion.div>
        <motion.div animate={{ y: [8, -8, 8], rotate: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', top: '15%', right: '8%' }}>
          <Sparkle size={28} color="rgba(255,255,255,0.2)" />
        </motion.div>
        <motion.div animate={{ y: [-6, 9, -6], rotate: [0, 22, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{ position: 'absolute', bottom: '15%', left: '12%' }}>
          <Sparkle size={20} color={GOLD} style={{ opacity: 0.6 }} />
        </motion.div>
        <motion.div animate={{ y: [5, -10, 5] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '20%', right: '6%' }}>
          <Sparkle size={32} color={GOLD} style={{ opacity: 0.5 }} />
        </motion.div>
        {/* Large decorative tooth outline */}
        <div style={{ position: 'absolute', top: '-5%', right: '-2%', opacity: 0.06 }}>
          <svg width={280} height={320} viewBox="0 0 100 115" fill="none">
            <path d="M50 5C33 5 19 18 19 34c0 10 3.5 18 8 27 4.5 9 7 17 7 28 0 3 2.5 5.5 5.5 5.5h21c3 0 5.5-2.5 5.5-5.5 0-11 2.5-19 7-28 4.5-9 8-17 8-27C81 18 67 5 50 5z"
              stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          {/* Gold badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 100, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', marginBottom: 20 }}>
            <Sparkle size={12} color={GOLD} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'white' }}>Gratis Konsultasi Pertama</span>
          </div>

          <h2 style={{ fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 900, color: 'white', lineHeight: 1.08, marginBottom: 20, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Siap untuk Senyum<br />yang Lebih Sehat? 🦷
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.88)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px' }}>
            Bergabunglah dengan ribuan keluarga yang telah mempercayakan kesehatan gigi mereka kepada kami.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/booking" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '17px 36px',
                background: 'white',
                color: PINK, borderRadius: 18, fontWeight: 800, fontSize: 16,
                textDecoration: 'none', boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
              }}>
                Booking Sekarang <Calendar size={18} />
              </Link>
            </motion.div>
            {c.whatsapp && (
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '17px 28px',
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                  color: 'white', borderRadius: 18, fontWeight: 700, fontSize: 16,
                  textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)',
                }}>
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </motion.div>
            )}
          </div>

          {/* Contact info pills */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', opacity: 0.85 }}>
            {c.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'white' }}>
                <Phone size={14} color="white" /> {c.phone}
              </div>
            )}
            {c.address && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'white' }}>
                <MapPin size={14} color="white" /> {c.address}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── APP PROMO SECTION ────────────────────────────────────────────────────────
function AppPromoSection() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  return (
    <section ref={ref} style={{ background: 'linear-gradient(135deg, #FFF8F4 0%, #FFF5FA 50%, #FFFDF0 100%)', padding: isMobile ? '56px 0' : '72px 0', position: 'relative', overflow: 'hidden' }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 60, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -24, y: isMobile ? 20 : 0 }} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ textAlign: isMobile ? 'center' : 'left', order: isMobile ? 2 : 1 }}>
            <Eyebrow text="Mobile App" />
            <h2 style={{ fontSize: isMobile ? 'clamp(26px, 7vw, 36px)' : 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: DARK, lineHeight: 1.1, marginBottom: 20 }}>
              Kelola Kesehatan Gigi<br />
              <GradText>di Genggaman Anda</GradText>
            </h2>
            <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.7, marginBottom: 32, maxWidth: isMobile ? 480 : undefined, marginLeft: isMobile ? 'auto' : undefined, marginRight: isMobile ? 'auto' : undefined }}>
              Download aplikasi OMDC Dental untuk booking, pantau jadwal, ambil nomor antrian, dan akses rekam medis kapan saja.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
              <Link to="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, color: 'white', borderRadius: 14, fontWeight: 700, fontSize: 13, textDecoration: 'none', boxShadow: '0 4px 20px rgba(233,30,140,0.3)' }}>
                📱 App Store
              </Link>
              <Link to="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: 'white', color: DARK, borderRadius: 14, fontWeight: 700, fontSize: 13, textDecoration: 'none', border: '1.5px solid rgba(233,30,140,0.15)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                🤖 Google Play
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 24, y: isMobile ? 20 : 0 }} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', justifyContent: 'center', order: isMobile ? 1 : 2 }}>
            {/* Outer shell — double-bezel */}
            <div style={{ padding: 10, borderRadius: 46, background: 'white', boxShadow: '0 24px 72px rgba(233,30,140,0.14), 0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(233,30,140,0.1)' }}>
              <div style={{ width: 200, height: 400, borderRadius: 38, background: 'linear-gradient(160deg, #FFF8F4 0%, #FFFFFF 50%, #FFFDF0 100%)', border: '1.5px solid rgba(233,30,140,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 8px 24px rgba(233,30,140,0.3)' }}>🦷</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: DARK, fontWeight: 900, fontSize: 16 }}>OMDC Dental</div>
                  <div style={{ color: '#9CA3AF', fontSize: 11, marginTop: 4 }}>Versi 2.0</div>
                </div>
                <div style={{ width: 140, height: 1, background: 'linear-gradient(90deg, transparent, rgba(233,30,140,0.15), transparent)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '80%' }}>
                  {['Booking Online', 'No. Antrian Digital', 'Rekam Medis'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#6B7280' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: PINK, flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN HOME COMPONENT ──────────────────────────────────────────────────────
export function Home() {
  return (
    <>
    <SeoHead
      title="OMDC Dental — Klinik Gigi Keluarga Terpercaya di Jakarta"
      description="OMDC Dental: klinik gigi modern untuk keluarga di Jakarta Selatan. Dokter spesialis berpengalaman, teknologi terkini, ramah anak, menerima BPJS & asuransi. Booking online mudah & cepat!"
      keywords="klinik gigi Jakarta, klinik gigi anak, dokter gigi keluarga, OMDC Dental, klinik gigi BPJS Jakarta, dokter gigi terbaik Jakarta Selatan, perawatan gigi modern, behel gigi Jakarta, veneer gigi, implan gigi"
      path="/"
    />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "OMDC Dental",
      "description": "Klinik gigi modern untuk keluarga di Jakarta Selatan. Dokter spesialis berpengalaman, teknologi terkini, ramah anak.",
      "url": "https://roollaanndd.github.io/2kang/",
      "telephone": "+62-21-XXXX-XXXX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jakarta Selatan",
        "addressRegion": "DKI Jakarta",
        "addressCountry": "ID"
      },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "20:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "09:00", "closes": "17:00" }
      ],
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "500" },
      "medicalSpecialty": ["Orthodontics","Pediatric Dentistry","Cosmetic Dentistry","Oral Surgery"],
      "priceRange": "Rp 150.000 – Rp 15.000.000",
      "sameAs": ["https://www.instagram.com/omdcdental", "https://www.facebook.com/omdcdental"]
    })}} />
    <div style={{ background: '#FFFFFF' }}>
      <HeroSection />
      <HeroTrustBar />
      <WhyChooseUsSection />
      <ServicesSection />
      <HowItWorksSection />
      <DoctorsSection />
      <TestimonialsSection />
      <GallerySection />
      <PromotionsSection />
      <ArticlesSection />
      <AppPromoSection />
      <FAQSection />
      <TrustSection />
      <CTASection />
    </div>
    </>
  );
}
