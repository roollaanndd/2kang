/* eslint-disable */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ChevronRight, Phone, MessageCircle, ArrowRight, Calendar } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

const PINK = '#E91E8C';
const BLUE = '#4FC3F7';

// ─── HERO BLOB SVG ────────────────────────────────────────────────────────────
function HeroBlob({ heroImage, primaryColor }: { heroImage: string | null; primaryColor: string }) {
  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      {/* Decorative circles — always visible regardless of image */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-30"
        style={{ background: primaryColor }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-14 h-14 rounded-full opacity-20"
        style={{ background: BLUE }}
      />
      <div
        className="absolute top-1/3 -left-4 w-8 h-8 rounded-full opacity-40"
        style={{ background: primaryColor }}
      />

      {/* Pink organic blob shape with image inside */}
      <svg
        viewBox="0 0 480 520"
        className="w-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="heroBlob">
            <path d="M240,20 C310,20 375,55 410,115 C445,175 445,255 420,325 C395,395 345,445 280,470 C215,495 145,485 95,450 C45,415 20,360 20,295 C20,230 45,160 90,110 C135,60 185,20 240,20Z" />
          </clipPath>
          <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor="#FF6BB5" />
          </linearGradient>
        </defs>

        {/* Blob fill */}
        <path
          d="M240,20 C310,20 375,55 410,115 C445,175 445,255 420,325 C395,395 345,445 280,470 C215,495 145,485 95,450 C45,415 20,360 20,295 C20,230 45,160 90,110 C135,60 185,20 240,20Z"
          fill="url(#blobGrad)"
          opacity="0.15"
        />

        {/* Hero image or placeholder */}
        {heroImage ? (
          <image
            href={heroImage}
            x="20"
            y="20"
            width="440"
            height="480"
            clipPath="url(#heroBlob)"
            preserveAspectRatio="xMidYMid slice"
          />
        ) : (
          <>
            {/* Default placeholder — family/dental illustration */}
            <rect x="20" y="20" width="440" height="480" clipPath="url(#heroBlob)" fill={`${primaryColor}15`} />
            {/* Tooth mascot silhouette */}
            <g clipPath="url(#heroBlob)" opacity="0.6">
              <ellipse cx="240" cy="200" rx="80" ry="100" fill={primaryColor} opacity="0.2" />
              <ellipse cx="240" cy="190" rx="60" ry="80" fill={primaryColor} opacity="0.25" />
              {/* Smile */}
              <path d="M215,220 Q240,240 265,220" fill="none" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
              {/* Eyes */}
              <circle cx="225" cy="195" r="6" fill={primaryColor} opacity="0.4" />
              <circle cx="255" cy="195" r="6" fill={primaryColor} opacity="0.4" />
            </g>
            <text x="240" y="360" textAnchor="middle" fill={primaryColor} fontSize="14" opacity="0.5" fontFamily="sans-serif">
              Upload foto hero di Admin CMS
            </text>
          </>
        )}

        {/* Blob border */}
        <path
          d="M240,20 C310,20 375,55 410,115 C445,175 445,255 420,325 C395,395 345,445 280,470 C215,495 145,485 95,450 C45,415 20,360 20,295 C20,230 45,160 90,110 C135,60 185,20 240,20Z"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          opacity="0.2"
        />
      </svg>

      {/* Floating badge — Healthy Smile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-10 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
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
        className="absolute bottom-16 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3"
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
          whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(233,30,140,0.12)' }}
          className="relative text-center p-5 rounded-2xl bg-white shadow-sm border border-gray-50 overflow-hidden"
          style={{ transition: 'all 0.3s ease' }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: STAT_GRADIENTS[i % STAT_GRADIENTS.length] }} />
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.07 }}
      whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(233,30,140,0.18)' }}
      className="relative bg-white rounded-2xl p-5 border border-gray-100 cursor-pointer overflow-hidden group"
      style={{ transition: 'all 0.3s ease' }}
    >
      {/* Subtle gradient hover bg */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{ background: `${primaryColor}06`, transition: 'opacity 0.3s' }}
      />
      {/* Bottom accent bar on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0"
        style={{ background: grad, transition: 'width 0.35s ease' }}
      />

      {/* Gradient icon container */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl shadow-sm"
        style={{ background: grad }}
      >
        <span style={{ filter: 'brightness(10) grayscale(1)' }}>{emoji}</span>
        {/* Shine dot */}
        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white opacity-60" />
      </div>

      <div className="relative font-bold text-gray-800 text-sm mb-1.5">{name}</div>
      <div className="relative text-xs text-gray-500 mb-3 leading-relaxed">{description}</div>
      <div className="relative text-sm font-bold" style={{ color: primaryColor }}>{price}</div>
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
      whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(233,30,140,0.15)' }}
      className="relative bg-white rounded-2xl p-5 border border-gray-100 text-center overflow-hidden"
      style={{ transition: 'all 0.3s ease' }}
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: avatarColors[colorIdx] }} />

      <div className="relative inline-block mb-4 mt-1">
        {/* Outer ring with gradient */}
        <div
          className="w-22 h-22 rounded-full p-0.5 inline-block"
          style={{ background: avatarColors[colorIdx] }}
        >
          {photo ? (
            <img
              src={photo}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-black border-2 border-white"
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
      <div className="text-xs mt-1 font-medium" style={{ color: primaryColor }}>{specialty}</div>
      <div className="text-xs text-gray-400 mt-0.5">{experience} Pengalaman</div>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        <Star size={12} fill="#F59E0B" className="text-yellow-400" />
        <span className="text-xs font-bold text-gray-700">{rating}</span>
        <span className="text-xs text-gray-400">· {patients} pasien</span>
      </div>

      <Link
        to="/booking"
        className="mt-3.5 block text-xs font-semibold py-2 px-4 rounded-full transition-all"
        style={{ background: avatarColors[colorIdx], color: 'white' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
      >
        Buat Janji
      </Link>
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
      whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
      className="relative rounded-2xl overflow-hidden bg-white"
      style={{ transition: 'all 0.3s ease' }}
    >
      {/* Gradient header area */}
      <div className="relative px-5 pt-5 pb-4 overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
        <div style={{
          position: 'absolute', top: -20, right: -20,
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
        }} />
        {badge && (
          <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full text-white mb-2"
            style={{ background: 'rgba(255,255,255,0.25)' }}>
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
          className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
        >
          Klaim Sekarang <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── ARTICLE CARD ─────────────────────────────────────────────────────────────
function ArticleCard({ title, excerpt, thumbnail, category, publishedAt }: {
  title: string; excerpt: string; thumbnail: string | null; category: string; publishedAt: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all cursor-pointer"
    >
      <div className="h-40 bg-gray-100 relative overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🦷</div>
        )}
      </div>
      <div className="p-4">
        <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 mb-2">{category}</span>
        <div className="font-semibold text-gray-800 text-sm leading-snug mb-2">{title}</div>
        <div className="text-xs text-gray-500 leading-relaxed line-clamp-2">{excerpt}</div>
        <div className="text-xs text-gray-400 mt-3">
          {new Date(publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
export function Home() {
  const { cms } = useCMS();
  const { hero, services, doctors, promotions, articles, about, clinic, contact, trust, appearance } = cms;
  const primary = appearance.primaryColor || PINK;

  const visibleServices = services.items.filter(s => s.isVisible);
  const visibleDoctors = doctors.items.filter(d => d.isVisible);
  const visiblePromos = promotions.items.filter(p => p.isVisible);
  const visibleArticles = articles.items.filter(a => a.isVisible);

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

            {/* Right: Hero image blob */}
            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <HeroBlob heroImage={hero.heroImage} primaryColor={primary} />
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
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100">
                {clinic.photo ? (
                  <img src={clinic.photo} alt="Klinik" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: `${primary}10` }}>
                    <span className="text-6xl">🏥</span>
                  </div>
                )}
              </div>
              {/* Floating stats on image */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 min-w-[150px]">
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
                  <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 text-center shadow-sm">
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
