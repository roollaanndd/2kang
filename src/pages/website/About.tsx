import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, Shield, Heart, Users, Star, CheckCircle, ArrowRight, Calendar, Stethoscope, Building2, Target, Rocket } from 'lucide-react';
import { DOCTORS, CLINIC_NAME, CLINIC_ADDRESS } from '../../data/mockData';
import { AnimatedDentalBg } from '../../components/ui/AnimatedDentalBg';
import { WaveDivider } from '../../components/ui/WaveDivider';
import { CountUp } from '../../components/ui/CountUp';

function DoctorAvatar({ name, size = 72 }: { name: string; size?: number }) {
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

const milestones = [
  { year: '2010', title: 'Berdiri', desc: 'OMDC Dental didirikan di Jakarta Selatan dengan 2 dokter gigi dan misi memberikan pelayanan dental terbaik.' },
  { year: '2014', title: 'Ekspansi Tim', desc: 'Memperluas tim dengan menghadirkan 4 dokter spesialis dan meningkatkan kapasitas ruang perawatan.' },
  { year: '2018', title: 'Sertifikasi ISO', desc: 'Meraih sertifikasi ISO 9001:2015 sebagai bukti komitmen kami terhadap standar kualitas internasional.' },
  { year: '2021', title: 'Digitalisasi', desc: 'Meluncurkan sistem antrian digital dan aplikasi mobile untuk memudahkan pasien mengakses layanan kami.' },
  { year: '2025', title: 'Kini', desc: 'Melayani lebih dari 500 pasien per bulan dengan 10+ dokter spesialis dan fasilitas teknologi terkini.' },
];

const certifications = [
  { name: 'ISO 9001:2015', body: 'Bureau Veritas', year: '2018', icon: <Award size={22} color="#E91E8C" /> },
  { name: 'PDGI Tersertifikasi', body: 'Persatuan Dokter Gigi Indonesia', year: '2010', icon: <Stethoscope size={22} color="#E91E8C" /> },
  { name: 'Kemenkes RI', body: 'Kementerian Kesehatan', year: '2010', icon: <Building2 size={22} color="#E91E8C" /> },
  { name: 'BPJS Partner', body: 'BPJS Kesehatan', year: '2015', icon: <Heart size={22} color="#E91E8C" /> },
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
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(233,30,140,0.08)' }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />
        <AnimatedDentalBg />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#E91E8C' }}>Tentang Kami</p>
            <h1 className="text-4xl sm:text-5xl font-black mb-6" style={{ color: '#111827', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Mengenal OMDC Dental</h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              Lebih dari 15 tahun kami melayani kesehatan gigi masyarakat Jakarta dengan dedikasi, teknologi modern, dan tim dokter spesialis terbaik.
            </p>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#FFFFFF" toColor="white" />

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

            {/* Decorative visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{ background: 'white', border: '1.5px solid rgba(233,30,140,0.12)', boxShadow: '0 8px 48px rgba(233,30,140,0.08)' }}
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#FFF5F9' }}>
                    <Building2 size={32} color="#E91E8C" />
                  </div>
                  <h3 className="text-2xl font-black mb-2" style={{ color: '#111827' }}>{CLINIC_NAME}</h3>
                  <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>{CLINIC_ADDRESS}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: 'A+', label: 'Akreditasi Klinik' },
                      { val: '100%', label: 'Pasien Puas' },
                      { val: 'ISO', label: '9001:2015' },
                      { val: '24h', label: 'Layanan Darurat' },
                    ].map((s) => (
                      <div
                        key={s.val}
                        className="rounded-xl p-3 text-center"
                        style={{ background: '#FFF5F9', border: '1px solid rgba(233,30,140,0.12)' }}
                      >
                        <div className="text-xl font-black" style={{ color: '#E91E8C' }}><CountUp value={s.val} /></div>
                        <div className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rating card */}
              <div
                className="absolute -bottom-5 -left-5 rounded-2xl p-4 shadow-xl"
                style={{ background: 'white', minWidth: 180 }}
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
                icon: <Target size={32} color="#E91E8C" />,
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
                icon: <Rocket size={32} color="#4FC3F7" />,
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
                <div className="flex mb-5">{item.icon}</div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.map((doctor, i) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center"
                style={{ background: 'white' }}
              >
                <div
                  className="py-8 px-4"
                  style={{ background: 'linear-gradient(135deg, #FFF5F9, white)' }}
                >
                  <div className="flex justify-center mb-4">
                    <DoctorAvatar name={doctor.name} size={80} />
                  </div>
                  <h3 className="font-black text-sm mb-1" style={{ color: '#1A1A2E' }}>{doctor.name}</h3>
                  <p className="text-xs font-semibold mb-3" style={{ color: '#E91E8C' }}>{doctor.specialty}</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={12} fill={s <= Math.round(doctor.rating) ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />
                    ))}
                    <span className="text-xs font-bold ml-1" style={{ color: '#1A1A2E' }}>{doctor.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{doctor.experience} tahun pengalaman</p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 text-center leading-relaxed">{doctor.about}</p>
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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: '#FFF5F9' }}>
                  {cert.icon}
                </div>
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
  );
}
