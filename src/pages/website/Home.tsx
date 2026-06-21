/* eslint-disable */
import { useState, useEffect, useRef, useCallback, type ReactNode, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star, ChevronRight, Phone, MessageCircle, ArrowRight,
  Calendar, ChevronLeft, Quote, ChevronDown, ChevronUp,
  Sparkles, CheckCircle, MapPin, Clock, Shield,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import type { CMSTestimonial, CMSBeforeAfter } from '../../data/defaultCMSContent';
import { CountUp } from '../../components/ui/CountUp';
import { SmoothImage } from '../../components/ui/SmoothImage';
import { Skeleton } from '../../components/ui/Skeleton';
import { HeroIllustration } from '../../components/ui/HeroIllustration';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
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
function Eyebrow({ text }: { text: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 14px', borderRadius: 100,
      background: 'rgba(233,30,140,0.08)',
      border: '1px solid rgba(233,30,140,0.18)',
      color: PINK, fontSize: 11, fontWeight: 700,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      marginBottom: 18,
    }}>
      <Sparkles size={11} />
      {text}
    </div>
  );
}

function GradText({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{
      background: `linear-gradient(135deg, ${PINK} 0%, ${ROSE} 50%, ${AQUA} 100%)`,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      ...style,
    }}>
      {children}
    </span>
  );
}

// ── ANIMATED PREMIUM HERO BACKGROUND — dental geometry, no blobs ─────────────
function AnimatedHeroBg() {
  const shapes = [
    { x: 90, y: -4,  s: 92,  d: 0,   t: 15, c: PINK, o: 0.05,  sh: 'tooth'   },
    { x: 2,  y: 8,   s: 100, d: 1.6, t: 13, c: AQUA, o: 0.038, sh: 'ring'    },
    { x: 78, y: 55,  s: 28,  d: 0.9, t: 9,  c: PINK, o: 0.06,  sh: 'plus'    },
    { x: 4,  y: 62,  s: 68,  d: 2.3, t: 17, c: PINK, o: 0.04,  sh: 'tooth'   },
    { x: 88, y: 72,  s: 22,  d: 1.2, t: 8,  c: AQUA, o: 0.07,  sh: 'sparkle' },
    { x: 50, y: 88,  s: 72,  d: 0.5, t: 12, c: PINK, o: 0.03,  sh: 'ring'    },
    { x: 94, y: 30,  s: 22,  d: 1.9, t: 10, c: AQUA, o: 0.06,  sh: 'plus'    },
    { x: 8,  y: 30,  s: 18,  d: 0.3, t: 7,  c: PINK, o: 0.08,  sh: 'sparkle' },
    { x: 40, y: 3,   s: 52,  d: 3.2, t: 19, c: AQUA, o: 0.028, sh: 'tooth'   },
    { x: 60, y: 10,  s: 80,  d: 2.6, t: 16, c: AQUA, o: 0.03,  sh: 'ring'    },
    { x: 20, y: 78,  s: 16,  d: 1.5, t: 8,  c: PINK, o: 0.055, sh: 'sparkle' },
    { x: 66, y: 40,  s: 24,  d: 2.9, t: 13, c: PINK, o: 0.042, sh: 'plus'    },
  ] as const;

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

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setImgIdx(i => (i + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);

  const services = cms.services.items.filter(s => s.isVisible).slice(0, 5);
  const stats = h.stats ?? [];

  return (
    <section style={{ position: 'relative', background: '#FFFFFF', paddingTop: isMobile ? 92 : 80, overflow: 'hidden', minHeight: isMobile ? 'auto' : '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <AnimatedHeroBg />

      {/* Diagonal accent lines — geometric, no blobs */}
      <div style={{ position: 'absolute', top: '20%', right: '-4%', width: '52%', height: 3, background: `linear-gradient(90deg, transparent, ${PINK}22, ${AQUA}28, transparent)`, transform: 'rotate(-6deg)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '27%', right: '-1%', width: '38%', height: 2, background: `linear-gradient(90deg, transparent, ${AQUA}14, transparent)`, transform: 'rotate(-6deg)', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '54% 46%', gap: isMobile ? 36 : 24, alignItems: 'center', paddingTop: isMobile ? 12 : 44, paddingBottom: isMobile ? 52 : 68 }}>

          {/* LEFT: Text content */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, ease: [0.32, 0.72, 0, 1] }}
            style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Eyebrow text={h.badgeText || 'OMDC Dental 2026'} />

            {/* Giant headline */}
            <h1 style={{ fontSize: isMobile ? 'clamp(40px, 10vw, 54px)' : 'clamp(52px, 5.5vw, 76px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px', color: DARK, margin: 0, marginBottom: 6 }}>
              {h.headline || 'Senyum Sehat,'}
            </h1>
            <h1 style={{ fontSize: isMobile ? 'clamp(40px, 10vw, 54px)' : 'clamp(52px, 5.5vw, 76px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px', margin: 0, marginBottom: 22 }}>
              <GradText>{h.headlineAccent || 'Percaya Diri Penuh'}</GradText>
            </h1>

            {/* Service pills — in-hero */}
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 22, justifyContent: isMobile ? 'center' : 'flex-start' }}>
              {services.map((sv, i) => (
                <motion.div key={sv.id}
                  initial={{ opacity: 0, scale: 0.82, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.24 + i * 0.07 }}
                  style={{ padding: '6px 13px', borderRadius: 100, background: 'rgba(233,30,140,0.06)', border: '1px solid rgba(233,30,140,0.14)', fontSize: 12.5, color: '#374151', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 14 }}>{sv.emoji}</span>{sv.name}
                </motion.div>
              ))}
            </div>

            <p style={{ fontSize: isMobile ? 15.5 : 17, color: '#6B7280', lineHeight: 1.7, maxWidth: 500, margin: isMobile ? '0 auto 28px' : '0 0 32px' }}>
              {h.subheadline || 'Perawatan gigi modern dengan teknologi terkini untuk Anda dan keluarga tercinta.'}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: isMobile ? 32 : 40, justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} style={isMobile ? { flex: '1 1 100%', maxWidth: 320, margin: '0 auto' } : undefined}>
                <Link to="/booking" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '15px 32px',
                  width: isMobile ? '100%' : undefined,
                  background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                  color: 'white', borderRadius: 16, fontWeight: 700, fontSize: 15,
                  textDecoration: 'none', boxShadow: '0 10px 36px rgba(233,30,140,0.38)',
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
                  background: 'white', color: DARK,
                  border: '1.5px solid rgba(0,0,0,0.10)', borderRadius: 16,
                  fontWeight: 600, fontSize: 15, textDecoration: 'none',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                }}>
                  {h.ctaSecondaryText || 'Lihat Layanan'}
                  <ChevronRight size={16} color={PINK} />
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <div style={{ display: isMobile ? 'grid' : 'flex', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : undefined, gap: isMobile ? 10 : 14, flexWrap: 'wrap', justifyContent: isMobile ? 'stretch' : 'flex-start' }}>
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isMobile ? '11px 10px' : '12px 20px', background: 'white', borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontSize: isMobile ? 19 : 22, fontWeight: 900, color: DARK }}><CountUp value={s.value} /></span>
                  <span style={{ fontSize: isMobile ? 10 : 11, color: '#9CA3AF', fontWeight: 500, marginTop: 2, whiteSpace: 'nowrap' }}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Hero image with floating cards */}
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 36, y: isMobile ? 20 : 0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.72, delay: 0.16, ease: [0.32, 0.72, 0, 1] }}
            style={{ position: 'relative' }}>

            {images.length > 0 ? (
              <>
                {/* Decorative offset shadow-frame behind image */}
                {!isMobile && (
                  <div style={{
                    position: 'absolute', top: 28, right: -18, bottom: -28, left: 36,
                    borderRadius: '32px 8px 32px 8px',
                    background: `linear-gradient(135deg, rgba(233,30,140,0.07), rgba(6,182,212,0.06))`,
                    border: '1px solid rgba(233,30,140,0.08)',
                    zIndex: 0,
                  }} />
                )}

                {/* Image in asymmetric frame for visual distinction */}
                <div style={{
                  borderRadius: isMobile ? 24 : '28px 8px 28px 8px',
                  overflow: 'hidden', aspectRatio: isMobile ? '4/3' : '3/4',
                  position: 'relative', boxShadow: '0 28px 72px rgba(0,0,0,0.16)', zIndex: 1,
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(233,30,140,0.15) 100%)', zIndex: 1 }} />
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIdx} src={images[imgIdx]} alt=""
                      initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.7 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </AnimatePresence>
                  {images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 2 }}>
                      {images.map((_, i) => (
                        <button key={i} onClick={() => setImgIdx(i)}
                          style={{ width: i === imgIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === imgIdx ? 'white' : 'rgba(255,255,255,0.45)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Floating rating card */}
                {!isMobile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 22 }}
                    style={{ position: 'absolute', top: 36, left: -24, zIndex: 10, background: 'white', borderRadius: 16, padding: '12px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 10 }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⭐</div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: DARK, lineHeight: 1 }}><CountUp value="4.9" /></div>
                      <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>Rating Pasien</div>
                    </div>
                  </motion.div>
                )}

                {/* Floating patients card */}
                {!isMobile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.74, type: 'spring', stiffness: 260, damping: 22 }}
                    style={{ position: 'absolute', bottom: 32, right: -24, zIndex: 10, background: 'white', borderRadius: 16, padding: '12px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 10 }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${AQUA}, #38BDF8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>😊</div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: DARK, lineHeight: 1 }}><CountUp value="10K+" /></div>
                      <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>Pasien Puas</div>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              /* No CMS images — show branded family illustration */
              <motion.div
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <HeroIllustration width={520} height={560} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      {!isMobile && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: '#F8F9FB', clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      )}
    </section>
  );
}

// ─── WHY CHOOSE US SECTION ────────────────────────────────────────────────────
function WhyChooseUsSection() {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  const FEATURES = [
    {
      icon: '🏆', grad: [PINK, ROSE], label: 'Dokter Spesialis Bersertifikat',
      desc: 'Semua dokter kami berlisensi KKI dengan pengalaman klinis 10+ tahun di bidang kedokteran gigi spesialis.',
      stat: '15+', statLabel: 'Dokter Spesialis',
    },
    {
      icon: '🔬', grad: [AQUA, '#22D3EE'], label: 'Teknologi Digital Terkini',
      desc: 'Digital X-ray, intraoral scanner, laser treatment & CAD/CAM untuk hasil presisi dan minim rasa sakit.',
      stat: '20+', statLabel: 'Alat Canggih',
    },
    {
      icon: '😊', grad: ['#10B981', '#34D399'], label: '10,000+ Pasien Puas',
      desc: 'Ribuan keluarga telah mempercayakan kesehatan gigi mereka kepada kami selama 15+ tahun berturut-turut.',
      stat: '4.9', statLabel: 'Rating Rata-rata',
    },
    {
      icon: '🛡️', grad: ['#8B5CF6', '#A78BFA'], label: 'Garansi Kepuasan Penuh',
      desc: 'Kami berkomitmen pada hasil terbaik. Jika belum puas, kami tangani kembali tanpa biaya tambahan.',
      stat: '100%', statLabel: 'Kepuasan Terjamin',
    },
  ] as const;

  return (
    <section ref={ref} style={{ background: '#FFFFFF', padding: isMobile ? '56px 0' : '88px 0' }}>
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
    { num: '02', icon: '📅', label: 'Konfirmasi & Pengingat', color: AQUA, colorEnd: '#22D3EE', desc: 'Dapatkan konfirmasi booking instan lewat SMS/WhatsApp + notifikasi pengingat sehari sebelum kunjungan.' },
    { num: '03', icon: '🦷', label: 'Kunjungi & Tersenyum', color: '#10B981', colorEnd: '#34D399', desc: 'Datang ke klinik, ditangani dokter spesialis kami dengan penuh perhatian, dan pulang dengan senyum lebih sehat.' },
  ] as const;

  return (
    <section ref={ref} style={{ background: '#F8F9FB', padding: isMobile ? '56px 0' : '88px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle geometric background lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, opacity: 0.15 }} />

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
              background: `linear-gradient(90deg, ${PINK}44, ${AQUA}44, #10B98144)`,
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

  return (
    <section ref={ref} style={{ background: '#F8F9FB', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <Eyebrow text="Layanan Kami" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14 }}>
            {s.sectionTitle}
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 520, margin: '0 auto' }}>{s.sectionSubtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {visible.map((item, i) => {
            const CARD_COLORS = [PINK, AQUA, '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', ROSE, '#06B6D4'];
            const cardColor = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                style={{ background: 'white', borderRadius: 22, boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: `1.5px solid ${cardColor}18`, overflow: 'hidden', transition: 'all 0.3s', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 44px ${cardColor}22`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'; }}
              >
                {/* Colored top accent */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${cardColor}, ${cardColor}AA)` }} />
                <div style={{ padding: '20px 20px 22px' }}>
                  {/* Icon circle */}
                  <div style={{ width: 54, height: 54, borderRadius: 16, background: `${cardColor}18`, border: `1.5px solid ${cardColor}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 14 }}>
                    {item.emoji}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: DARK, marginBottom: 6, lineHeight: 1.3 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.55, marginBottom: 14 }}>{item.description}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: cardColor }}>{item.price}</span>
                    <Link to="/booking" style={{ fontSize: 11, fontWeight: 700, color: cardColor, background: `${cardColor}12`, padding: '4px 12px', borderRadius: 20, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}>
                      Booking <ChevronRight size={11} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 40 }}>
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
    </section>
  );
}

// ─── DOCTORS SECTION ──────────────────────────────────────────────────────────
function DoctorsSection() {
  const { cms } = useCMS();
  const d = cms.doctors;
  const visible = d.items.filter(i => i.isVisible);
  const [ref, inView] = useInView();

  return (
    <section ref={ref} style={{ background: '#FFFFFF', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ marginBottom: 44 }}>
          <Eyebrow text="Tim Dokter Kami" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 10 }}>
            {d.sectionTitle}
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 480 }}>{d.sectionSubtitle}</p>
        </motion.div>

        <div style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {visible.map((doc, i) => {
            const initials = doc.name.replace('drg. ', '').slice(0, 2).toUpperCase();
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
                style={{ flexShrink: 0, width: 220, background: 'white', borderRadius: 22, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.3s' }}
              >
                {/* Avatar */}
                <div style={{ position: 'relative', marginBottom: 14 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 18, overflow: 'hidden', background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {doc.photo
                      ? <SmoothImage src={doc.photo} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ fontSize: 28, fontWeight: 900, color: 'white' }}>{initials}</span>
                    }
                  </div>
                  <div style={{ position: 'absolute', bottom: -4, right: 0, width: 22, height: 22, borderRadius: '50%', background: doc.patients > 0 ? '#10B981' : '#D1D5DB', border: '3px solid white' }} />
                </div>
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
              </motion.div>
            );
          })}
        </div>
      </div>
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

  if (!visible.length) return null;

  const prev = () => setIdx(i => (i - 1 + visible.length) % visible.length);
  const next = () => setIdx(i => (i + 1) % visible.length);

  return (
    <section ref={ref} style={{ background: '#FFFFFF', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <Eyebrow text="Testimoni Pasien" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14 }}>
            {t.sectionTitle}
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 500, margin: '0 auto' }}>{t.sectionSubtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {visible.slice(0, 6).map((item: CMSTestimonial, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill={j < item.rating ? '#F59E0B' : '#E5E7EB'} color={j < item.rating ? '#F59E0B' : '#E5E7EB'} />
                ))}
              </div>
              <Quote size={24} color="rgba(233,30,140,0.2)" style={{ marginBottom: 10 }} />
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>{item.text}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROMOTIONS SECTION ───────────────────────────────────────────────────────
function PromotionsSection() {
  const { cms } = useCMS();
  const p = cms.promotions;
  const visible = p.items.filter(i => i.isVisible);
  const [ref, inView] = useInView();
  if (!visible.length) return null;

  return (
    <section ref={ref} style={{ background: '#F8F9FB', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <Eyebrow text="Promo Spesial" />
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 14 }}>
            {p.sectionTitle}
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 480, margin: '0 auto' }}>{p.sectionSubtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {visible.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
              style={{ background: 'white', borderRadius: 22, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', transition: 'all 0.3s' }}>
              {/* Gradient header */}
              <div style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`, padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
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
    </section>
  );
}

// ─── ARTICLES SECTION ─────────────────────────────────────────────────────────
function ArticlesSection() {
  const { cms } = useCMS();
  const a = cms.articles;
  const visible = a.items.filter(i => i.isVisible);
  const [ref, inView] = useInView();
  if (!visible.length) return null;

  return (
    <section ref={ref} style={{ background: '#FFFFFF', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 44 }}>
          <div>
            <Eyebrow text="Artikel Kesehatan" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: DARK, lineHeight: 1.15, marginBottom: 10 }}>
              {a.sectionTitle}
            </h2>
            <p style={{ fontSize: 17, color: '#6B7280' }}>{a.sectionSubtitle}</p>
          </div>
          <Link to="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: PINK, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Semua artikel <ChevronRight size={16} />
          </Link>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {visible.slice(0, 3).map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
              style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.3s' }}>
              {item.thumbnail ? (
                <SmoothImage src={item.thumbnail} alt={item.title} wrapperStyle={{ height: 180 }} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: 180, background: `linear-gradient(135deg, rgba(233,30,140,0.1), rgba(6,182,212,0.1))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>📰</div>
              )}
              <div style={{ padding: '18px 20px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: PINK, background: 'rgba(233,30,140,0.08)', padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  {item.category}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, lineHeight: 1.4, margin: '10px 0 8px' }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.5, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as any}>
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
          ))}
        </div>
      </div>
    </section>
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
function TrustSection() {
  const { cms } = useCMS();
  const t = cms.trust;
  if (!t.logos?.length) return null;
  const [ref, inView] = useInView();

  return (
    <section ref={ref} style={{ background: '#FFFFFF', padding: '48px 0', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#C0C4CC', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
          {t.sectionTitle || 'Mitra & Asuransi Terpercaya'}
        </motion.p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
          {t.logos.map((logo, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
              style={{ padding: '10px 22px', borderRadius: 12, background: '#F8F9FB', border: '1px solid rgba(0,0,0,0.06)', fontWeight: 800, color: '#6B7280', fontSize: 14, letterSpacing: 0.5 }}>
              {logo.logo || logo.name}
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
    <section ref={ref} style={{ position: 'relative', padding: '80px 0', overflow: 'hidden' }}>
      {/* Soft pastel gradient background — no blobs */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, #FFF5F9 0%, #F0FFFE 50%, #FFF5FC 100%)` }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Eyebrow text="Mulai Perjalanan Sehat Anda" />
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: DARK, lineHeight: 1.1, marginBottom: 20 }}>
            Siap untuk Senyum<br />
            <GradText>yang Lebih Sehat?</GradText>
          </h2>
          <p style={{ fontSize: 18, color: '#6B7280', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px' }}>
            Bergabunglah dengan ribuan keluarga yang telah mempercayakan kesehatan gigi mereka kepada kami.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link to="/booking" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px',
                background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                color: 'white', borderRadius: 16, fontWeight: 700, fontSize: 16,
                textDecoration: 'none', boxShadow: '0 12px 36px rgba(233,30,140,0.35)',
              }}>
                Booking Sekarang <Calendar size={18} />
              </Link>
            </motion.div>
            {c.whatsapp && (
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 28px',
                  background: 'white', color: DARK, borderRadius: 16, fontWeight: 700, fontSize: 16,
                  textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1.5px solid rgba(0,0,0,0.08)',
                }}>
                  <MessageCircle size={18} color="#25D366" /> WhatsApp
                </a>
              </motion.div>
            )}
          </div>

          {/* Contact info pills */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {c.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#6B7280' }}>
                <Phone size={14} color={PINK} /> {c.phone}
              </div>
            )}
            {c.address && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#6B7280' }}>
                <MapPin size={14} color={AQUA} /> {c.address}
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
    <section ref={ref} style={{ background: 'linear-gradient(135deg, #FFF0F7 0%, #F0FFFE 100%)', padding: isMobile ? '56px 0' : '72px 0', position: 'relative', overflow: 'hidden' }}>

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
              <div style={{ width: 200, height: 400, borderRadius: 38, background: 'linear-gradient(160deg, #FFF0F7 0%, #FFFFFF 50%, #F0FFFE 100%)', border: '1.5px solid rgba(233,30,140,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
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
    <div style={{ background: '#FFFFFF' }}>
      <HeroSection />
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
  );
}
