import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Star } from 'lucide-react';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const GOLD = '#D4A017';

const DARK = '#0D1421';

// Identical geometric shapes to Home's AnimatedHeroBg (light mode only)
function HeroBg() {
  const shapes = [
    { x: 90, y: -4,  s: 80,  d: 0,   t: 15, c: PINK, o: 0.04,  sh: 'tooth'   },
    { x: 2,  y: 8,   s: 88, d: 1.6, t: 13, c: GOLD, o: 0.035, sh: 'ring'    },
    { x: 78, y: 55,  s: 24,  d: 0.9, t: 9,  c: PINK, o: 0.05,  sh: 'plus'    },
    { x: 4,  y: 62,  s: 58,  d: 2.3, t: 17, c: PINK, o: 0.035, sh: 'tooth'   },
    { x: 88, y: 72,  s: 18,  d: 1.2, t: 8,  c: GOLD, o: 0.06,  sh: 'sparkle' },
    { x: 50, y: 88,  s: 62,  d: 0.5, t: 12, c: PINK, o: 0.028, sh: 'ring'    },
    { x: 94, y: 30,  s: 20,  d: 1.9, t: 10, c: GOLD, o: 0.055, sh: 'plus'    },
    { x: 8,  y: 30,  s: 16,  d: 0.3, t: 7,  c: PINK, o: 0.07,  sh: 'sparkle' },
  ];

  const tooth = (c: string, s: number) => (
    <svg width={s} height={Math.round(s * 1.15)} viewBox="0 0 100 115" fill="none">
      <path d="M50 5C33 5 19 18 19 34c0 10 3.5 18 8 27 4.5 9 7 17 7 28 0 3 2.5 5.5 5.5 5.5h21c3 0 5.5-2.5 5.5-5.5 0-11 2.5-19 7-28 4.5-9 8-17 8-27C81 18 67 5 50 5z"
        stroke={c} strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
  const ring = (c: string, s: number) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="42" stroke={c} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="30" stroke={c} strokeWidth="1.5" strokeDasharray="7 5" />
    </svg>
  );
  const plus = (c: string, s: number) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <path d="M50 18V82M18 50H82" stroke={c} strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
  const sparkle = (c: string, s: number) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <path d="M50 10L55 45L90 50L55 55L50 90L45 55L10 50L45 45Z" stroke={c} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {shapes.map((el, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: `${el.x}%`, top: `${el.y}%`, opacity: el.o }}
          animate={{ y: [-8, 8, -8], rotate: el.sh === 'ring' ? [0, 6, 0] : el.sh === 'plus' ? [0, 18, 0] : el.sh === 'sparkle' ? [0, 22, 0] : [0, 3, 0] }}
          transition={{ duration: el.t, repeat: Infinity, delay: el.d, ease: 'easeInOut' }}
        >
          {el.sh === 'tooth' && tooth(el.c, el.s)}
          {el.sh === 'ring' && ring(el.c, el.s)}
          {el.sh === 'plus' && plus(el.c, el.s)}
          {el.sh === 'sparkle' && sparkle(el.c, el.s)}
        </motion.div>
      ))}
    </div>
  );
}

export interface PageHeroProps {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryTo?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryTo?: string;
  photoSrc: string;
  photoAlt: string;
  floatingCard?: {
    avatar?: string;
    avatarAlt?: string;
    name: string;
    subtitle: string;
    rating?: boolean;
    stat?: { value: string; label: string };
    color?: 'pink' | 'aqua' | 'gold';
  };
}

export function PageHero({
  badge, title, titleAccent, description,
  ctaPrimaryLabel = 'Booking Sekarang',
  ctaPrimaryTo = '/booking',
  ctaSecondaryLabel,
  ctaSecondaryTo,
  photoSrc, photoAlt,
  floatingCard,
}: PageHeroProps) {
  return (
    <section style={{
      position: 'relative',
      background: '#FFF5F9',
      overflow: 'hidden',
      paddingTop: 80,
    }}>
      <HeroBg />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ position: 'relative', zIndex: 2 }}>
        <div className="page-hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: 'clamp(20px, 4vw, 48px)',
          alignItems: 'center',
          paddingTop: 24,
          paddingBottom: 56,
        }}>

          {/* ── LEFT: Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '7px 16px 7px 12px', borderRadius: 100,
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(233,30,140,0.18)',
                color: PINK, fontSize: 11, fontWeight: 800,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                marginBottom: 18,
                boxShadow: '0 4px 16px rgba(233,30,140,0.10)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span style={{ position: 'relative', width: 8, height: 8, flexShrink: 0, display: 'inline-block' }}>
                <motion.span
                  animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: ROSE, display: 'block' }}
                />
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, display: 'block' }} />
              </span>
              {badge}
            </motion.div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 62px)',
              fontWeight: 900, lineHeight: 1.05, letterSpacing: '-1.5px',
              color: DARK, margin: 0, marginBottom: 6,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {title}
            </h1>
            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 62px)',
              fontWeight: 900, lineHeight: 1.05, letterSpacing: '-1.5px',
              margin: 0, marginBottom: 20,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: `linear-gradient(135deg, ${PINK} 0%, ${ROSE} 50%, ${GOLD} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {titleAccent}
            </h1>

            {/* Description */}
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: '#6B7280', lineHeight: 1.72, maxWidth: 480,
              marginBottom: 32,
            }}>
              {description}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                {ctaPrimaryTo.startsWith('#') ? (
                  <a href={ctaPrimaryTo} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '14px 28px', borderRadius: 16,
                    background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                    color: 'white', fontWeight: 700, fontSize: 15,
                    textDecoration: 'none',
                    boxShadow: '0 10px 36px rgba(233,30,140,0.38)',
                  }}>
                    {ctaPrimaryLabel}
                    <ChevronRight size={16} />
                  </a>
                ) : (
                  <Link to={ctaPrimaryTo} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '14px 28px', borderRadius: 16,
                    background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                    color: 'white', fontWeight: 700, fontSize: 15,
                    textDecoration: 'none',
                    boxShadow: '0 10px 36px rgba(233,30,140,0.38)',
                  }}>
                    {ctaPrimaryLabel}
                    <ChevronRight size={16} />
                  </Link>
                )}
              </motion.div>
              {ctaSecondaryLabel && ctaSecondaryTo && (
                <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                  {ctaSecondaryTo.startsWith('http') ? (
                    <a href={ctaSecondaryTo} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '14px 24px', borderRadius: 16,
                      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                      color: DARK, border: '1.5px solid rgba(233,30,140,0.18)',
                      fontWeight: 600, fontSize: 15, textDecoration: 'none',
                      boxShadow: '0 2px 16px rgba(233,30,140,0.08)',
                    }}>
                      {ctaSecondaryLabel}
                      <ChevronRight size={16} color={PINK} />
                    </a>
                  ) : (
                    <Link to={ctaSecondaryTo} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '14px 24px', borderRadius: 16,
                      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                      color: DARK, border: '1.5px solid rgba(233,30,140,0.18)',
                      fontWeight: 600, fontSize: 15, textDecoration: 'none',
                      boxShadow: '0 2px 16px rgba(233,30,140,0.08)',
                    }}>
                      {ctaSecondaryLabel}
                      <ChevronRight size={16} color={PINK} />
                    </Link>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* ── RIGHT: Photo card ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.72, delay: 0.16, ease: [0.32, 0.72, 0, 1] }}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
              {/* Photo frame */}
              <div style={{ borderRadius: 32, overflow: 'hidden', background: '#FFF5F9', padding: 12, boxShadow: '0 24px 64px rgba(233,30,140,0.12)' }}>
                <div style={{ borderRadius: 22, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={photoSrc}
                    alt={photoAlt}
                    referrerPolicy="no-referrer"
                    style={{ width: '100%', height: 'clamp(260px, 40vw, 420px)', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,20,33,0.22), transparent 60%)' }} />
                </div>
              </div>

              {/* Floating card */}
              {floatingCard && (
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', bottom: 8, left: -16, zIndex: 10,
                    background: 'white', borderRadius: 20, padding: '12px 16px',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
                    border: '1px solid rgba(233,30,140,0.10)',
                    display: 'flex', alignItems: 'center', gap: 12,
                    maxWidth: 220,
                  }}
                >
                  {floatingCard.avatar ? (
                    <img
                      src={floatingCard.avatar}
                      alt={floatingCard.avatarAlt || floatingCard.name}
                      referrerPolicy="no-referrer"
                      style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${PINK}`, flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                      background: floatingCard.color === 'aqua'
                        ? `linear-gradient(135deg, ${GOLD}, #F5C842)`
                        : `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Star size={20} color="white" fill="white" />
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: DARK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{floatingCard.name}</div>
                    <div style={{ fontSize: 11, color: floatingCard.color === 'aqua' ? GOLD : PINK, fontWeight: 600, marginBottom: floatingCard.rating ? 4 : 0 }}>{floatingCard.subtitle}</div>
                    {floatingCard.rating && (
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#F59E0B" color="#F59E0B" />)}
                      </div>
                    )}
                    {floatingCard.stat && (
                      <div style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>{floatingCard.stat.value} <span style={{ color: '#9CA3AF', fontWeight: 400 }}>{floatingCard.stat.label}</span></div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Decorative corner accent */}
              <div style={{
                position: 'absolute', top: -10, right: -10, width: 56, height: 56,
                borderRadius: 16, background: `linear-gradient(135deg, ${PINK}, ${ROSE})`,
                opacity: 0.12,
              }} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom wave fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
        background: 'linear-gradient(to bottom, transparent, rgba(255,245,249,0.6))',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
