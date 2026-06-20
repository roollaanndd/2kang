import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star, ChevronRight, Shield, Award, Clock, Users,
  CheckCircle, ArrowRight, Calendar, Phone,
  Zap, Heart, MapPin, Smartphone, Apple, Play,
} from 'lucide-react';
import { DOCTORS, SERVICES, PROMOTIONS, TESTIMONIALS } from '../../data/mockData';

function DoctorAvatar({ name, size = 64 }: { name: string; size?: number }) {
  const letter = name.replace('drg. ', '')[0];
  const colors = [
    'linear-gradient(135deg, #E91E8C, #FF6BB5)',
    'linear-gradient(135deg, #4FC3F7, #0288D1)',
    'linear-gradient(135deg, #A78BFA, #7C3AED)',
    'linear-gradient(135deg, #10B981, #059669)',
  ];
  const idx = name.charCodeAt(5) % colors.length;
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
      style={{ width: size, height: size, background: colors[idx], fontSize: size * 0.38 }}
    >
      {letter}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i <= Math.round(rating) ? '#F59E0B' : 'none'}
          style={{ color: '#F59E0B' }}
        />
      ))}
    </div>
  );
}

const formatPrice = (p: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

const serviceIcons: Record<string, string> = {
  s1: '🦷', s2: '✨', s3: '🔧', s4: '❌', s5: '😁', s6: '🔩', s7: '💊', s8: '➕',
};

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Pilih Layanan',
    desc: 'Tentukan jenis perawatan gigi yang Anda butuhkan dari daftar layanan lengkap kami.',
    icon: '🦷',
  },
  {
    step: 2,
    title: 'Pilih Dokter & Jadwal',
    desc: 'Pilih dokter spesialis favorit Anda dan tentukan waktu yang paling sesuai.',
    icon: '👨‍⚕️',
  },
  {
    step: 3,
    title: 'Datang & Dilayani',
    desc: 'Datang ke klinik tepat waktu dan nikmati pelayanan dental terbaik dari tim kami.',
    icon: '✅',
  },
];

export function Home() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const testimonialTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stats = [
    { value: '500+', label: 'Pasien Puas', icon: '🏆' },
    { value: '10+', label: 'Dokter Spesialis', icon: '👨‍⚕️' },
    { value: '15+', label: 'Tahun Pengalaman', icon: '🎖️' },
    { value: '4.9', label: 'Rating Google', icon: '⭐' },
  ];

  const features = [
    {
      icon: <Award size={28} />,
      title: 'Dokter Berpengalaman',
      desc: 'Tim dokter spesialis bersertifikat dengan pengalaman bertahun-tahun di bidangnya.',
      color: '#E91E8C',
      bg: '#FFF5F9',
    },
    {
      icon: <Zap size={28} />,
      title: 'Teknologi Modern',
      desc: 'Peralatan dental terkini dengan standar internasional untuk perawatan optimal.',
      color: '#4FC3F7',
      bg: '#F0FAFF',
    },
    {
      icon: <Shield size={28} />,
      title: 'Sertifikasi Standar',
      desc: 'Klinik bersertifikat ISO dengan protokol kebersihan dan keamanan tertinggi.',
      color: '#A78BFA',
      bg: '#F5F3FF',
    },
    {
      icon: <Clock size={28} />,
      title: 'Waktu Fleksibel',
      desc: 'Buka 6 hari seminggu dari pagi hingga malam untuk kenyamanan Anda.',
      color: '#10B981',
      bg: '#F0FDF4',
    },
  ];

  // Auto-rotate testimonials every 4s
  useEffect(() => {
    if (isPaused) return;
    testimonialTimer.current = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => {
      if (testimonialTimer.current) clearInterval(testimonialTimer.current);
    };
  }, [isPaused]);

  const displayedServices = showAllServices ? SERVICES : SERVICES.slice(0, 4);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #E91E8C 0%, #FF6BB5 40%, #FFD6EC 75%, #FFF5F9 100%)',
          minHeight: '92vh',
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-10 right-10 rounded-full opacity-20"
          style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.3)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute bottom-0 left-0 rounded-full opacity-10"
          style={{ width: 400, height: 400, background: 'white', filter: 'blur(60px)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Klinik Gigi Terpercaya #1 di Jakarta
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Senyum Sehat,
                <br />
                <span style={{ color: 'rgba(255,255,255,0.9)' }}>Percaya Diri</span>
                <br />
                Penuh
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Kami hadir untuk memberikan pelayanan dental terbaik dengan teknologi modern dan dokter berpengalaman. Senyum indah Anda adalah prioritas kami.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    background: 'white',
                    color: '#E91E8C',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }}
                >
                  <Calendar size={18} />
                  Buat Janji Sekarang
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:-translate-y-1"
                  style={{
                    border: '2px solid rgba(255,255,255,0.6)',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  Pelajari Lebih
                  <ChevronRight size={18} />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-4">
                {['BPJS Diterima', 'Konsultasi Gratis', 'Teknologi Digital'].map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    <CheckCircle size={16} fill="rgba(255,255,255,0.3)" />
                    {b}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                {/* Big pink circle */}
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 380,
                    height: 380,
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(255,255,255,0.4)',
                  }}
                >
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                    <path
                      d="M100 20 C70 20 45 40 45 70 C45 85 50 95 56 108 C62 121 65 130 65 150 C65 165 72 175 80 175 C90 175 95 165 100 155 C105 165 110 175 120 175 C128 175 135 165 135 150 C135 130 138 121 144 108 C150 95 155 85 155 70 C155 40 130 20 100 20Z"
                      fill="white"
                      opacity="0.95"
                    />
                    <path
                      d="M75 45 C72 55 70 65 71 75"
                      stroke="rgba(233,30,140,0.4)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M85 38 C82 44 81 50 82 56"
                      stroke="rgba(233,30,140,0.3)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M68 130 Q100 145 132 130"
                      stroke="rgba(233,30,140,0.5)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Floating glass stats cards */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -left-10 rounded-2xl p-3.5 shadow-xl"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    minWidth: 150,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#FFF5F9' }}>
                      <Star size={16} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Rating Google</p>
                      <p className="text-sm font-black" style={{ color: '#1A1A2E' }}>4.9 ⭐ / 5.0</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -right-10 rounded-2xl p-3.5 shadow-xl"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    minWidth: 160,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#F0FDF4' }}>
                      <Users size={16} style={{ color: '#10B981' }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Total Pasien</p>
                      <p className="text-sm font-black" style={{ color: '#1A1A2E' }}>500+ Pasien</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute top-1/2 -right-14 -translate-y-1/2 rounded-2xl p-3.5 shadow-xl"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                  }}
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium">Pengalaman</p>
                    <p className="text-xl font-black" style={{ color: '#E91E8C' }}>15+</p>
                    <p className="text-xs text-gray-500">Tahun</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.35)',
                }}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>
              Apa yang Kami Tawarkan
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E' }}>
              Layanan Unggulan Kami
            </h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Kami menyediakan berbagai layanan dental komprehensif dengan peralatan modern dan tenaga ahli berpengalaman.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={showAllServices ? 'all' : 'partial'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {displayedServices.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <Link
                    to="/services"
                    className="block p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden"
                    style={{ background: 'white' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = service.color + '40';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${service.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#f3f4f6';
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: service.color + '18' }}
                    >
                      {serviceIcons[service.id]}
                    </div>
                    <h3 className="font-bold text-base mb-2" style={{ color: '#1A1A2E' }}>{service.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{service.description}</p>
                    {/* Price on hover overlay */}
                    <div
                      className="text-xs font-bold"
                      style={{ color: service.color }}
                    >
                      {formatPrice(service.priceMin)} – {formatPrice(service.priceMax)}
                    </div>
                    {/* Hover price highlight bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 py-2 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between"
                      style={{ background: service.color, borderRadius: '0 0 16px 16px' }}
                    >
                      <span className="text-xs text-white font-bold">
                        Mulai {formatPrice(service.priceMin)}
                      </span>
                      <span className="text-white text-xs font-semibold">Pilih →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowAllServices((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: '#E91E8C',
                border: '2px solid #E91E8C',
                background: showAllServices ? '#FFF5F9' : 'transparent',
              }}
            >
              {showAllServices ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua Layanan'}
              <ArrowRight size={16} style={{ transform: showAllServices ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20" style={{ background: '#FFF5F9' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>
              Mudah & Cepat
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E' }}>
              Cara Membuat Janji
            </h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
            <p className="text-gray-500 max-w-lg mx-auto">
              Hanya 3 langkah mudah untuk mendapatkan perawatan gigi terbaik dari tim kami.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-10 left-[16.6%] right-[16.6%] h-0.5"
              style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #E91E8C)' }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg z-10 relative"
                      style={{
                        background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                        boxShadow: '0 8px 24px rgba(233,30,140,0.35)',
                      }}
                    >
                      {step.icon}
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-xs z-20 border-2 border-white"
                      style={{ background: '#1A1A2E' }}
                    >
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-black mb-3" style={{ color: '#1A1A2E' }}>{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                boxShadow: '0 6px 20px rgba(233,30,140,0.35)',
              }}
            >
              <Calendar size={18} />
              Mulai Sekarang
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== DOCTORS ===== */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>
              Tim Profesional
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E' }}>
              Tim Dokter Kami
            </h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Didukung oleh dokter spesialis berpengalaman yang siap memberikan perawatan terbaik untuk Anda.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.map((doctor, i) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ background: 'white', border: '1px solid #F3F4F6' }}
              >
                <div
                  className="p-6 flex flex-col items-center text-center"
                  style={{ background: 'linear-gradient(135deg, #FFF5F9, white)' }}
                >
                  <div className="relative mb-4">
                    <DoctorAvatar name={doctor.name} size={80} />
                    <div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: doctor.available ? '#10B981' : '#94A3B8',
                        border: '2px solid white',
                      }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <h3 className="font-black text-sm mb-1" style={{ color: '#1A1A2E' }}>{doctor.name}</h3>
                  <p className="text-xs mb-3" style={{ color: '#E91E8C' }}>{doctor.specialty}</p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={doctor.rating} />
                    <span className="text-xs font-bold" style={{ color: '#1A1A2E' }}>{doctor.rating}</span>
                    <span className="text-xs text-gray-400">({doctor.reviewCount})</span>
                  </div>
                </div>

                <div className="px-4 py-4 border-t border-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-500">{doctor.experience} thn pengalaman</span>
                    <span
                      className="text-xs px-2 py-1 rounded-lg font-semibold"
                      style={{
                        background: doctor.available ? '#F0FDF4' : '#F1F5F9',
                        color: doctor.available ? '#10B981' : '#94A3B8',
                      }}
                    >
                      {doctor.available ? 'Tersedia' : 'Tidak Tersedia'}
                    </span>
                  </div>
                  <Link
                    to="/booking"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                  >
                    <Calendar size={14} />
                    Jadwalkan
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: '#E91E8C',
                border: '2px solid #E91E8C',
                background: 'transparent',
              }}
            >
              Lihat Semua Dokter <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROMOTIONS ===== */}
      <section className="py-20" style={{ background: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #E91E8C 0%, #FF6BB5 50%, #FFB3D9 100%)',
              padding: '60px 40px',
            }}
          >
            <div className="text-center mb-12">
              <p className="text-sm font-bold uppercase tracking-widest mb-3 text-white/80">
                Penawaran Terbatas
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Promo Spesial untuk Anda
              </h2>
              <p className="text-white/80 text-base max-w-lg mx-auto">
                Jangan lewatkan penawaran eksklusif kami. Dapatkan layanan dental premium dengan harga terjangkau.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {PROMOTIONS.map((promo, i) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ background: 'white' }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-4"
                    style={{ background: `linear-gradient(135deg, ${promo.color}, ${promo.color}99)` }}
                  >
                    -{promo.discount}%
                  </div>
                  <h3 className="font-black text-lg mb-1" style={{ color: '#1A1A2E' }}>{promo.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{promo.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Berlaku s/d {promo.validUntil}</span>
                    <Link
                      to="/booking"
                      className="text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                      style={{ background: promo.color }}
                    >
                      Ambil
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/promotions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid rgba(255,255,255,0.5)' }}
              >
                Lihat Semua Promo <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>
              Keunggulan Kami
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E' }}>
              Mengapa Memilih OMDC Dental?
            </h2>
            <div className="w-16 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ background: 'white' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = feature.color + '40';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#f3f4f6';
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: feature.bg, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3 className="font-black text-base mb-3" style={{ color: '#1A1A2E' }}>{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS (Auto-rotating Carousel) ===== */}
      <section className="py-20" style={{ background: '#FFF5F9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>
              Testimonial
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E' }}>
              Kata Pasien Kami
            </h2>
            <div className="w-16 h-1.5 rounded-full mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Kepercayaan pasien adalah motivasi terbesar kami untuk terus memberikan pelayanan terbaik.
            </p>
          </motion.div>

          {/* Carousel */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${testimonialIndex * (100 / Math.min(TESTIMONIALS.length, 4))}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="min-w-[calc(25%-12px)] px-3 flex-shrink-0"
                  style={{ minWidth: 'clamp(280px, 25%, 320px)' }}
                >
                  <div
                    className="p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full"
                    style={{ background: 'white' }}
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} fill={s <= t.rating ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">"{t.comment}"</p>
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #f3f4f6' }}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: '#1A1A2E' }}>{t.name}</p>
                        <p className="text-xs text-gray-400">{t.service}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === testimonialIndex ? 24 : 8,
                  height: 8,
                  background: i === testimonialIndex ? '#E91E8C' : '#E5E7EB',
                }}
              />
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            {isPaused ? 'Dijeda' : 'Otomatis berganti setiap 4 detik'} · Hover untuk menjeda
          </p>
        </div>
      </section>

      {/* ===== APP DOWNLOAD CTA BANNER ===== */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D5E 60%, #1A1A2E 100%)' }}
          >
            {/* Decorative blobs */}
            <div
              className="absolute top-0 right-0 rounded-full opacity-20"
              style={{ width: 350, height: 350, background: '#E91E8C', filter: 'blur(80px)', transform: 'translate(30%,-30%)' }}
            />
            <div
              className="absolute bottom-0 left-0 rounded-full opacity-15"
              style={{ width: 250, height: 250, background: '#4FC3F7', filter: 'blur(60px)', transform: 'translate(-30%,30%)' }}
            />

            <div className="relative z-10 p-10 sm:p-14">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left: text */}
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
                    style={{ background: 'rgba(233,30,140,0.2)', border: '1px solid rgba(233,30,140,0.4)' }}
                  >
                    <Smartphone size={14} style={{ color: '#FF6BB5' }} />
                    <span style={{ color: '#FF6BB5' }}>Aplikasi Mobile</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                    Unduh Aplikasi
                    <br />
                    <span style={{ color: '#FF6BB5' }}>OMDC Dental</span>
                  </h2>
                  <p className="text-white/70 text-base mb-8 leading-relaxed">
                    Buat janji, pantau antrian, dan kelola rekam medis Anda langsung dari smartphone. Lebih mudah, lebih cepat.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#"
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                      style={{ background: 'white' }}
                    >
                      <Apple size={24} style={{ color: '#1A1A2E' }} />
                      <div>
                        <p className="text-xs text-gray-500 leading-none">Download on the</p>
                        <p className="text-sm font-black" style={{ color: '#1A1A2E' }}>App Store</p>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                      style={{ background: 'white' }}
                    >
                      <Play size={24} style={{ color: '#10B981', fill: '#10B981' }} />
                      <div>
                        <p className="text-xs text-gray-500 leading-none">Get it on</p>
                        <p className="text-sm font-black" style={{ color: '#1A1A2E' }}>Google Play</p>
                      </div>
                    </a>
                  </div>

                  <div className="mt-6 flex gap-6 flex-wrap">
                    {['Gratis Download', 'iOS & Android', '4.9 ⭐ Rating'].map((tag) => (
                      <div key={tag} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        <CheckCircle size={14} style={{ color: '#10B981' }} />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: QR code placeholder */}
                <div className="flex justify-center lg:justify-end">
                  <div className="flex flex-col items-center gap-4">
                    {/* QR placeholder */}
                    <div
                      className="w-44 h-44 rounded-2xl flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                      style={{
                        background: 'white',
                        border: '3px solid rgba(233,30,140,0.3)',
                        boxShadow: '0 0 0 6px rgba(233,30,140,0.1)',
                      }}
                    >
                      {/* QR pattern simulation */}
                      <div className="grid grid-cols-7 gap-0.5 p-3">
                        {Array.from({ length: 49 }, (_, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-sm"
                            style={{
                              background: [0,1,2,3,4,5,6,7,13,14,21,27,28,35,41,42,43,44,45,46,47,48,8,16,24,32,40].includes(i) || Math.random() > 0.5
                                ? '#1A1A2E'
                                : 'transparent',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      Scan QR untuk download
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20" style={{ background: '#FAFAFA' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
          >
            <div
              className="absolute top-0 right-0 rounded-full opacity-20"
              style={{ width: 300, height: 300, background: 'white', transform: 'translate(30%, -30%)', filter: 'blur(40px)' }}
            />
            <div
              className="absolute bottom-0 left-0 rounded-full opacity-20"
              style={{ width: 200, height: 200, background: 'white', transform: 'translate(-30%, 30%)', filter: 'blur(30px)' }}
            />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <Heart size={32} className="text-white" fill="white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Siap untuk Senyum Lebih Indah?
              </h2>
              <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto">
                Jadwalkan konsultasi Anda sekarang dan dapatkan pemeriksaan awal gratis dengan dokter spesialis kami.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ background: 'white', color: '#E91E8C', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}
                >
                  <Calendar size={18} />
                  Buat Janji Sekarang
                </Link>
                <a
                  href="tel:+622112345678"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:-translate-y-1"
                  style={{ border: '2px solid rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.15)' }}
                >
                  <Phone size={18} />
                  Hubungi Kami
                </a>
              </div>

              <div className="mt-8 flex justify-center gap-8 flex-wrap">
                {[
                  { icon: <MapPin size={14} />, text: 'Jakarta Selatan' },
                  { icon: <Clock size={14} />, text: 'Buka Setiap Hari' },
                  { icon: <Shield size={14} />, text: 'Bersertifikat ISO' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-sm text-white/80">
                    {item.icon}
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
