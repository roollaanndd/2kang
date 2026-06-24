import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Shield, Award, Users, Star, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import { CLINIC_NAME, CLINIC_ADDRESS } from '../../data/mockData';
import { WaveDivider } from '../../components/ui/WaveDivider';
import { SeoHead } from '../../components/ui/SeoHead';
import { PageHero } from '../../components/website/PageHero';
import { CountUp } from '../../components/ui/CountUp';

const milestones = [
  { year: '2010', title: 'Berdiri', desc: 'OMDC Dental didirikan di Jakarta Selatan dengan 2 dokter gigi dan misi memberikan pelayanan dental terbaik.' },
  { year: '2014', title: 'Ekspansi Tim', desc: 'Memperluas tim dengan menghadirkan 4 dokter spesialis dan meningkatkan kapasitas ruang perawatan.' },
  { year: '2018', title: 'Sertifikasi ISO', desc: 'Meraih sertifikasi ISO 9001:2015 sebagai bukti komitmen kami terhadap standar kualitas internasional.' },
  { year: '2021', title: 'Digitalisasi', desc: 'Meluncurkan sistem antrian digital dan aplikasi mobile untuk memudahkan pasien mengakses layanan kami.' },
  { year: '2025', title: 'Kini', desc: 'Melayani lebih dari 500 pasien per bulan dengan 10+ dokter spesialis dan fasilitas teknologi terkini.' },
];

const certifications = [
  { name: 'ISO 9001:2015', body: 'Bureau Veritas', year: '2018', icon: '🏅' },
  { name: 'PDGI Tersertifikasi', body: 'Persatuan Dokter Gigi Indonesia', year: '2010', icon: '⚕️' },
  { name: 'Kemenkes RI', body: 'Kementerian Kesehatan', year: '2010', icon: '🏥' },
  { name: 'BPJS Partner', body: 'BPJS Kesehatan', year: '2015', icon: '🤝' },
];

const values = [
  {
    icon: <Heart size={28} />,
    title: 'Kepedulian Pasien',
    desc: 'Kami menempatkan kepuasan dan kenyamanan pasien sebagai prioritas utama dalam setiap tindakan.',
    color: '#E91E8C',
    bg: '#FFF5F9',
  },
  {
    icon: <Shield size={28} />,
    title: 'Integritas & Keamanan',
    desc: 'Standar kebersihan dan keamanan tertinggi diterapkan di setiap sudut klinik kami.',
    color: '#4FC3F7',
    bg: '#F0FAFF',
  },
  {
    icon: <Award size={28} />,
    title: 'Keunggulan',
    desc: 'Selalu berupaya memberikan hasil terbaik dengan menggunakan teknologi dan teknik terkini.',
    color: '#A78BFA',
    bg: '#F5F3FF',
  },
  {
    icon: <Users size={28} />,
    title: 'Kerja Tim',
    desc: 'Tim yang solid dan berdedikasi bekerja bersama untuk memberikan pengalaman terbaik bagi pasien.',
    color: '#10B981',
    bg: '#F0FDF4',
  },
];

export function About() {
  const stats = [
    { value: '15+', label: 'Tahun Pengalaman' },
    { value: '500+', label: 'Pasien Per Bulan' },
    { value: '10+', label: 'Dokter Spesialis' },
    { value: '4.9', label: 'Rating Google' },
    { value: '8', label: 'Layanan Unggulan' },
    { value: '4', label: 'Sertifikasi' },
  ];

  return (
    <>
    <SeoHead
      title="Tentang Kami"
      description="OMDC Dental berdiri sejak 2010 dengan misi menghadirkan perawatan gigi premium di Jakarta Selatan. Lebih dari 15.000 pasien telah mempercayakan senyum mereka kepada kami."
      keywords="klinik gigi Jakarta Selatan, sejarah OMDC Dental, dokter gigi terpercaya, klinik gigi premium Jakarta"
      path="/about"
    />
    <div>
      <PageHero
        badge="Tentang Kami"
        title="Mengenal"
        titleAccent="OMDC Dental"
        description="Lebih dari 15 tahun melayani kesehatan gigi masyarakat Jakarta dengan dedikasi, teknologi modern, dan tim dokter spesialis terbaik pilihan kami."
        ctaPrimaryLabel="Booking Sekarang"
        ctaPrimaryTo="/booking"
        ctaSecondaryLabel="Tim Dokter Kami"
        ctaSecondaryTo="/doctors"
        photoSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDKJplFRi4nZVbG6qEpXdvTzIklDzxC2rkfqnANtiqieo0SNdjlGabr__i82pi4PvbyrLF4QyhDoIqOmiuS-CfmIrP2XkJ0LEPd26Oii9Pw67bk5aLzKqz1Guz4rmcGHO3ObZvf5KLSNUDOthskRiLj2I0V9MLDMnEki5xVy-irVr-3pEIIEB0GdbTNlgB-DZA9pprSC8lWSJ9MKFhOPkVgHW2K6aT5R0VRbEEPNSM8HL9TsXNVyOq1cUfjn4Ea4mEoKcf7zuPDr5A"
        photoAlt="Tim OMDC Dental"
        floatingCard={{
          color: 'aqua',
          name: "Berdiri Sejak 2010",
          subtitle: "15+ Tahun Melayani",
          stat: { value: "15.000+", label: "pasien puas" },
        }}
      />

      <WaveDivider fromColor="#FFF5F9" toColor="white" />

      {/* Stats */}
      <section style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="text-center p-5 rounded-2xl"
                style={{ background: '#FFF5F9' }}
              >
                <div className="text-3xl font-black" style={{ color: '#E91E8C', fontFamily: "'Plus Jakarta Sans', sans-serif" }}><CountUp value={stat.value} /></div>
                <div className="text-xs mt-1 text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20" style={{ background: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#E91E8C' }}>Cerita Kami</p>
              <h2 className="text-3xl sm:text-4xl font-black mb-6" style={{ color: '#1A1A2E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Perjalanan 15 Tahun Melayani Senyum Indonesia
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  OMDC Dental didirikan pada tahun 2010 dengan sebuah visi sederhana namun kuat: memberikan pelayanan kesehatan gigi berkualitas tinggi yang dapat diakses oleh semua kalangan masyarakat Jakarta.
                </p>
                <p>
                  Berawal dari sebuah klinik kecil dengan hanya 2 dokter gigi, kami terus berkembang seiring kepercayaan yang diberikan pasien. Setiap senyum sehat yang berhasil kami wujudkan menjadi motivasi untuk terus meningkatkan kualitas layanan.
                </p>
                <p>
                  Kini, dengan lebih dari 10 dokter spesialis dan fasilitas berteknologi canggih, OMDC Dental telah menjadi salah satu klinik gigi terpercaya di Jakarta Selatan. Namun kami tetap pegang teguh nilai-nilai awal kami: pelayanan dengan hati dan profesionalisme tinggi.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  'Peralatan dental terkini',
                  'Dokter bersertifikat spesialis',
                  'Standar kebersihan ketat',
                  'Layanan komprehensif',
                  'Sistem antrian digital',
                  'Konsultasi online tersedia',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={15} style={{ color: '#E91E8C', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Clinic photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKJplFRi4nZVbG6qEpXdvTzIklDzxC2rkfqnANtiqieo0SNdjlGabr__i82pi4PvbyrLF4QyhDoIqOmiuS-CfmIrP2XkJ0LEPd26Oii9Pw67bk5aLzKqz1Guz4rmcGHO3ObZvf5KLSNUDOthskRiLj2I0V9MLDMnEki5xVy-irVr-3pEIIEB0GdbTNlgB-DZA9pprSC8lWSJ9MKFhOPkVgHW2K6aT5R0VRbEEPNSM8HL9TsXNVyOq1cUfjn4Ea4mEoKcf7zuPDr5A"
                alt="Klinik OMDC"
                className="rounded-3xl w-full object-cover"
                style={{ height: 480, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)' }}
              />
              {/* Rating card */}
              <div
                className="absolute bottom-4 left-4 sm:-bottom-5 sm:-left-5 rounded-2xl p-4 shadow-xl"
                style={{ background: 'white', maxWidth: 'calc(100% - 2rem)', border: '1px solid rgba(233,30,140,0.1)' }}
              >
                <p className="text-xs text-gray-500 mb-1">Rating Pasien</p>
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={16} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                  ))}
                  <span className="text-base font-black ml-1" style={{ color: '#1A1A2E' }}><CountUp value="4.9" /></span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Berdasarkan 450+ ulasan</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#FAFAFA" toColor="#FFFFFF" />

      {/* Mission & Vision */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>Fondasi Kami</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Visi & Misi</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                type: 'Visi',
                content: 'Menjadi klinik gigi pilihan utama masyarakat Indonesia dengan memberikan pelayanan dental berkualitas internasional yang mudah diakses oleh semua kalangan.',
                icon: '🎯',
                color: '#E91E8C',
                bg: '#FFF5F9',
              },
              {
                type: 'Misi',
                content: [
                  'Memberikan pelayanan kesehatan gigi yang komprehensif, berkualitas tinggi, dan terjangkau',
                  'Mengembangkan tim dokter yang profesional, berdedikasi, dan terus belajar',
                  'Mengadopsi teknologi dental terkini untuk hasil perawatan optimal',
                  'Menciptakan lingkungan klinik yang nyaman, bersih, dan menyenangkan bagi pasien',
                ],
                icon: '🚀',
                color: '#4FC3F7',
                bg: '#F0FAFF',
              },
            ].map((item) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-8"
                style={{ background: item.bg, border: `1px solid ${item.color}20` }}
              >
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-2xl font-black mb-4" style={{ color: item.color }}>{item.type}</h3>
                {typeof item.content === 'string' ? (
                  <p className="text-gray-700 leading-relaxed">{item.content}</p>
                ) : (
                  <ul className="space-y-3">
                    {item.content.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FAFAFA" />

      {/* Values */}
      <section className="py-20" style={{ background: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>Prinsip Kami</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Nilai-Nilai yang Kami Pegang</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ background: 'white' }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: v.bg, color: v.color }}
                >
                  {v.icon}
                </div>
                <h3 className="font-black text-base mb-3" style={{ color: '#1A1A2E' }}>{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#FAFAFA" toColor="white" />

      {/* Team */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>Tim Kami</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Wajah di Balik Senyum Anda</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
          </motion.div>

          {/* Featured 4 doctors with real photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'drg. Sarah Wijaya',
                specialty: 'Dokter Gigi Umum',
                photo: 'https://lh3.googleusercontent.com/aida/AP1WRLsJm6Hd3zuvQHAHO-2tZZTLKwucUMxPrVYakmwVrfOx5lQgn7H8rPUHO0E9FvxApcbh9i385scrC8chYANySbYJtsMy4Hmspv7NnWHRljsap8pRDF5UQ0HucY3JJW-PIzrYR6UHUTfU1WACFIsZKvj7SBe-Pv9OE-HUvpbBHmIqrKi6DWM87NPGer4TtoxBjkAFTi4X6ifT7hm35ORakGAiqThN9FxGY1br8lXTaEcAzDjpzPMDzLD00g',
              },
              {
                name: 'drg. Budi Santoso, Sp.Ort',
                specialty: 'Spesialis Ortodonsia',
                photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXouSwFWJsNZn1pJmRbQ7qV8JuY_usefbmHSWwjMzRVi0j_YI5A6MEdc7gduheE0xF6pqgd_p1qh12BdNPM9QPSmeND4V-x4b7rxb11wgxRVM7XWtY6M5GkZkGySyk_dSWIkno4_E7DjRfLvN88s7byqQ22m3qPdSiRp9IixB1ATAscaa6HLSK0AyDZ-Uw-yDL5iPwaYM72_bJo7Y6yjm33EfwxoqYQI7MIJuaRW9dJWgvX4gKVOjLfYi2lQEwwVjRotubs2AGs_o',
              },
              {
                name: 'drg. Amanda Putri, Sp.KGA',
                specialty: 'Spesialis Gigi Anak',
                photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk3rZ7NFZAP8zM18TlwMRLgFtUMz45aKhSlndxKs0271T5B6YKJkGtnmYCAp4Kc2SQ5YFbVbvDDwuiDyYI-X6S6bMKmN19BIWOQH-NhSHHO5uqaG3V6dK4l_lxNaQ1TPR8Bc3RqWcHgX2YG_OwmUzed6Xepi_bFRWxcR26hUuziBnpAX88zo-6iSfvz15vTe2xu5QFgM2S1dE7ZkF6ySXcehnDEuM08LEHlAZnuMHpugf7o26pvWBayyXt0RRsIjg7jd69XUYhOQ8',
              },
              {
                name: 'drg. Reza Pratama, Sp.BM',
                specialty: 'Spesialis Bedah Mulut',
                photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg9nXEC8Nt9CPBec93pGNpMNRGJN35j4lusppN_BOQ_Gtr3UX8wiQtqLd_yNwbspfJQMBZnMWXmFhLBYpIgvVGKSvMh7vsXvP0lgq316bbp3uPb1Ar8feLiIs1M3na5AEG9wvIMCFIZqLgRrba6F72Mh9z8tgmvP1ZACbN12fMhNZZXwzwWmCV_rph69j5iF6pj3zkMAIPzTyTA_ypjwPHqDORO4HSLTkkWYDeP--Oz4Wbf6xFFkNSUFHPeol8WqHhVfO2GB2ol6s',
              },
            ].map((doctor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                style={{ background: 'white' }}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-black text-base mb-1" style={{ color: '#1A1A2E' }}>{doctor.name}</h3>
                  <p className="text-sm font-semibold" style={{ color: '#E91E8C' }}>{doctor.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ color: '#E91E8C', border: '2px solid #E91E8C' }}
            >
              Profil Lengkap Dokter <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="white" toColor="#FAFAFA" />

      {/* Timeline */}
      <section className="py-20" style={{ background: '#FAFAFA' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>Perjalanan Kami</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Milestone OMDC Dental</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{ background: 'linear-gradient(180deg, #E91E8C, #FF6BB5)' }}
            />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-sm"
                      style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                    >
                      {m.year}
                    </div>
                  </div>
                  {/* Content */}
                  <div
                    className="flex-1 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{ background: 'white', border: '1px solid #E5E7EB' }}
                  >
                    <h3 className="font-black text-base mb-2" style={{ color: '#1A1A2E' }}>{m.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>Terpercaya</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sertifikasi & Penghargaan</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: '#FAFAFA' }}
              >
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h3 className="font-black text-base mb-1" style={{ color: '#1A1A2E' }}>{cert.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{cert.body}</p>
                <span
                  className="text-xs px-2 py-1 rounded-lg font-semibold"
                  style={{ background: '#FFF5F9', color: '#E91E8C' }}
                >
                  Sejak {cert.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: '#FAFAFA' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-10 relative overflow-hidden"
            style={{ background: '#FFF5F9', border: '1.5px solid rgba(233,30,140,0.15)' }}
          >
            <h2 className="text-2xl sm:text-3xl font-black mb-4 relative z-10" style={{ color: '#111827' }}>
              Bergabunglah dengan Keluarga OMDC Dental
            </h2>
            <p className="mb-8 relative z-10" style={{ color: '#6B7280' }}>
              Percayakan kesehatan gigi Anda kepada kami. Kami siap memberikan senyum terbaik untuk Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 4px 20px rgba(233,30,140,0.3)' }}
              >
                <Calendar size={18} />
                Buat Janji
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:-translate-y-1"
                style={{ border: '2px solid #E91E8C', color: '#E91E8C', background: 'white' }}
              >
                Hubungi Kami <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
