/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star, ChevronRight, Phone, MessageCircle, ArrowRight,
  Calendar, ChevronLeft, Quote, ChevronDown, ChevronUp,
  Sparkles, CheckCircle, MapPin, Clock, Shield,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import type { CMSTestimonial, CMSBeforeAfter } from '../../data/defaultCMSContent';

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

function GradText({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
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

function LightMesh() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: '-15%', right: '-8%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', top: '35%', left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
    </div>
  );
}

// ─── BEFORE/AFTER SLIDER ─────────────────────────────────────────────────────
function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [pos, setPos] = useState(50);
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
      <img src={before} alt="Sebelum" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={after} alt="Sesudah" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, transform: 'translateX(-50%)', width: 3, background: 'white', boxShadow: '0 0 12px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 40, height: 40, borderRadius: '50%', background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <ChevronLeft size={12} color={PINK} />
          <ChevronRight size={12} color={PINK} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.55)', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Sebelum</div>
      <div style={{ position: 'absolute', top: 10, right: 10, background: PINK, color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Sesudah</div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.55))', color: 'white', fontSize: 13, fontWeight: 700 }}>{title}</div>
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { cms } = useCMS();
  const h = cms.hero;
  const images = h.heroImages ?? [];
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setImgIdx(i => (i + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);

  const services = cms.services.items.filter(s => s.isVisible).slice(0, 6);

  return (
    <section style={{ position: 'relative', background: '#FFFFFF', paddingTop: 80, paddingBottom: 0, overflow: 'hidden', minHeight: '100dvh', display: 'flex', alignItems: 'center' }}>
      <LightMesh />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: 48, alignItems: 'center', paddingTop: 40, paddingBottom: 60 }}>

          {/* Left: Text content */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
            <Eyebrow text={h.badgeText || 'OMDC Dental 2026'} />

            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: -1.5, color: DARK, margin: 0, marginBottom: 8 }}>
              {h.headline || 'Senyum Sehat,'}
            </h1>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: -1.5, margin: 0, marginBottom: 24 }}>
              <GradText>{h.headlineAccent || 'Percaya Diri Penuh'}</GradText>
            </h1>

            <p style={{ fontSize: 18, color: '#6B7280', lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
              {h.subheadline || 'Perawatan gigi modern dengan teknologi terkini untuk Anda dan keluarga tercinta.'}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/booking"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px',
                    background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                    color: 'white', borderRadius: 14, fontWeight: 700, fontSize: 15,
                    textDecoration: 'none', boxShadow: '0 8px 32px rgba(233,30,140,0.35)',
                  }}
                >
                  {h.ctaPrimaryText || 'Booking Sekarang'}
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={14} />
                  </div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/services"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px',
                    background: 'white', color: DARK,
                    border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 14,
                    fontWeight: 600, fontSize: 15, textDecoration: 'none',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  {h.ctaSecondaryText || 'Lihat Layanan'}
                  <ChevronRight size={16} color={PINK} />
                </Link>
              </motion.div>
            </div>

            {/* Stats pills */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {(h.stats ?? []).map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 20px', background: 'white', borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: DARK }}>{s.value}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginTop: 2, whiteSpace: 'nowrap' }}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Hero image + Booking card */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            style={{ position: 'relative' }}>

            {/* Hero image frame */}
            {images.length > 0 && (
              <div style={{ borderRadius: 28, overflow: 'hidden', aspectRatio: '4/5', position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(233,30,140,0.3) 100%)' }} />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIdx}
                    src={images[imgIdx]}
                    alt=""
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </AnimatePresence>
                {/* Dot indicators */}
                {images.length > 1 && (
                  <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setImgIdx(i)}
                        style={{ width: i === imgIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === imgIdx ? 'white' : 'rgba(255,255,255,0.45)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Booking card — floats if no image, overlays if image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                ...(images.length > 0
                  ? { position: 'absolute', bottom: -24, left: -28, right: 24 }
                  : {}),
                background: 'white', borderRadius: 22,
                padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.14)',
                border: '1px solid rgba(255,255,255,0.8)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={18} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: DARK }}>Booking Janji Temu</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>Gratis konsultasi awal</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  placeholder="Nama Lengkap"
                  style={{ padding: '10px 14px', borderRadius: 10, border: '1.5px solid #F3F4F6', fontSize: 13, color: DARK, outline: 'none', background: '#FAFBFC' }}
                  onFocus={e => (e.currentTarget.style.borderColor = ROSE)}
                  onBlur={e => (e.currentTarget.style.borderColor = '#F3F4F6')}
                />
                <select
                  style={{ padding: '10px 14px', borderRadius: 10, border: '1.5px solid #F3F4F6', fontSize: 13, color: DARK, outline: 'none', background: '#FAFBFC', cursor: 'pointer' }}
                  onFocus={e => (e.currentTarget.style.borderColor = ROSE)}
                  onBlur={e => (e.currentTarget.style.borderColor = '#F3F4F6')}
                >
                  <option value="">Pilih Layanan</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                </select>
                <input
                  type="date"
                  style={{ padding: '10px 14px', borderRadius: 10, border: '1.5px solid #F3F4F6', fontSize: 13, color: DARK, outline: 'none', background: '#FAFBFC' }}
                  onFocus={e => (e.currentTarget.style.borderColor = ROSE)}
                  onBlur={e => (e.currentTarget.style.borderColor = '#F3F4F6')}
                />
              </div>

              <Link to="/booking"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginTop: 14, padding: '13px', borderRadius: 12, background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                  color: 'white', fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(233,30,140,0.32)',
                }}
              >
                Booking Sekarang
                <ArrowRight size={16} />
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, justifyContent: 'center' }}>
                <Shield size={12} color="#10B981" />
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>Terpercaya · 15+ Tahun Pengalaman</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: '#F8F9FB', clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
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
          {visible.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
              style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.04)', cursor: 'default', transition: 'box-shadow 0.3s, transform 0.3s' }}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: DARK, marginBottom: 6, lineHeight: 1.3 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.5, marginBottom: 12 }}>{item.description}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: PINK }}>{item.price}</div>
            </motion.div>
          ))}
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
                      ? <img src={doc.photo} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                    ? <img src={item.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
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
      {/* Gradient background */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, #FFF5F9 0%, #F0FFFE 50%, #FFF5FC 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 50%, rgba(233,30,140,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(6,182,212,0.07) 0%, transparent 60%)` }} />

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
  return (
    <section ref={ref} style={{ background: `linear-gradient(135deg, #0D1421 0%, #1A0A2E 50%, #0A1628 100%)`, padding: '72px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <Eyebrow text="Mobile App" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              Kelola Kesehatan Gigi<br />
              <GradText>di Genggaman Anda</GradText>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 32 }}>
              Download aplikasi OMDC Dental untuk booking, pantau jadwal, ambil nomor antrian, dan akses rekam medis kapan saja.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'white', color: DARK, borderRadius: 14, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                📱 App Store
              </Link>
              <Link to="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: 14, fontWeight: 700, fontSize: 13, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                🤖 Google Play
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 220, height: 420, borderRadius: 36, background: 'linear-gradient(180deg, #1A1A2E 0%, #0D1421 100%)', border: '3px solid rgba(255,255,255,0.12)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🦷</div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>OMDC Dental</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 }}>Versi 2.0</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN HOME COMPONENT ──────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <HeroSection />
      <ServicesSection />
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
