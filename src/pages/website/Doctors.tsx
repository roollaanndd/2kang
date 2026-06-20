import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Calendar, Clock, Award, ChevronRight, Search, Filter } from 'lucide-react';
import { DOCTORS } from '../../data/mockData';

function DoctorAvatar({ name, size = 96 }: { name: string; size?: number }) {
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

const specialties = ['Semua', 'Periodonsia', 'Ortodonsia', 'Bedah Mulut', 'Konservasi Gigi'];

const doctorDetails = [
  {
    education: 'Universitas Indonesia, Sp.Perio',
    certifications: ['PDGI Tersertifikasi', 'ISO 9001:2015'],
    languages: ['Indonesia', 'English'],
    consultFee: 350000,
  },
  {
    education: 'Universitas Airlangga, Sp.Ort',
    certifications: ['PDGI Tersertifikasi', 'Invisalign Provider'],
    languages: ['Indonesia', 'English'],
    consultFee: 300000,
  },
  {
    education: 'Universitas Gadjah Mada, Sp.BM',
    certifications: ['PDGI Tersertifikasi', 'IAOMS Member'],
    languages: ['Indonesia'],
    consultFee: 400000,
  },
  {
    education: 'Universitas Padjadjaran',
    certifications: ['PDGI Tersertifikasi', 'ADA Member'],
    languages: ['Indonesia', 'English'],
    consultFee: 280000,
  },
];

export function Doctors() {
  const [activeSpecialty, setActiveSpecialty] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = DOCTORS.filter((d) => {
    const matchSpecialty = activeSpecialty === 'Semua' || d.specialty.toLowerCase().includes(activeSpecialty.toLowerCase());
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());
    return matchSpecialty && matchSearch;
  });

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5 60%, #FFD6EC)' }}
      >
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 80 + 20,
                height: Math.random() * 80 + 20,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-bold uppercase tracking-widest mb-4 text-white/80">Tim Profesional</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">Tim Dokter Kami</h1>
            <p className="text-xl text-white/85 max-w-2xl mx-auto mb-8">
              Didukung oleh dokter spesialis berpengalaman yang berdedikasi untuk memberikan perawatan dental terbaik.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              {[
                { val: '10+', label: 'Dokter Spesialis' },
                { val: '500+', label: 'Pasien Ditangani' },
                { val: '15+', label: 'Tahun Pengalaman' },
              ].map((s) => (
                <div
                  key={s.val}
                  className="px-6 py-3 rounded-2xl text-center"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
                >
                  <div className="text-2xl font-black text-white">{s.val}</div>
                  <div className="text-sm text-white/80">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="sticky top-16 z-30 shadow-sm" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari dokter atau spesialisasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-400 transition-colors"
              />
            </div>

            {/* Specialty Filter */}
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-1 text-xs text-gray-500 mr-1">
                <Filter size={14} />
                Filter:
              </div>
              {specialties.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSpecialty(s)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: activeSpecialty === s ? '#E91E8C' : '#F9FAFB',
                    color: activeSpecialty === s ? 'white' : '#6B7280',
                    border: `1px solid ${activeSpecialty === s ? '#E91E8C' : '#E5E7EB'}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16" style={{ background: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Tidak ada dokter ditemukan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filtered.map((doctor, i) => {
                const detail = doctorDetails[DOCTORS.indexOf(doctor)];
                return (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ background: 'white' }}
                  >
                    <div className="p-6">
                      <div className="flex gap-5">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <DoctorAvatar name={doctor.name} size={96} />
                          <div
                            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{
                              background: doctor.available ? '#10B981' : '#94A3B8',
                              border: '2px solid white',
                            }}
                          >
                            {doctor.available ? '✓' : '✗'}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <h3 className="font-black text-lg" style={{ color: '#1A1A2E' }}>{doctor.name}</h3>
                              <p className="text-sm font-semibold" style={{ color: '#E91E8C' }}>{doctor.specialty}</p>
                            </div>
                            <span
                              className="text-xs px-3 py-1 rounded-xl font-semibold flex-shrink-0"
                              style={{
                                background: doctor.available ? '#F0FDF4' : '#F1F5F9',
                                color: doctor.available ? '#10B981' : '#94A3B8',
                              }}
                            >
                              {doctor.available ? '● Tersedia' : '○ Tidak Tersedia'}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <div className="flex items-center gap-1">
                              {[1,2,3,4,5].map((s) => (
                                <Star key={s} size={13} fill={s <= Math.round(doctor.rating) ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />
                              ))}
                              <span className="text-sm font-bold ml-1" style={{ color: '#1A1A2E' }}>{doctor.rating}</span>
                              <span className="text-xs text-gray-400">({doctor.reviewCount} ulasan)</span>
                            </div>
                          </div>

                          <div className="flex gap-4 mt-3 flex-wrap">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Award size={13} style={{ color: '#E91E8C' }} />
                              {doctor.experience} tahun pengalaman
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Clock size={13} style={{ color: '#E91E8C' }} />
                              {doctor.schedule.length} hari/minggu
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* About */}
                      <p className="text-sm text-gray-600 leading-relaxed mt-4 pt-4" style={{ borderTop: '1px solid #f3f4f6' }}>
                        {doctor.about}
                      </p>

                      {/* Schedule */}
                      <div className="mt-4">
                        <p className="text-xs font-bold text-gray-500 mb-2">Jadwal Praktek:</p>
                        <div className="flex gap-2 flex-wrap">
                          {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((day) => (
                            <span
                              key={day}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                              style={{
                                background: doctor.schedule.includes(day) ? '#FFF5F9' : '#F9FAFB',
                                color: doctor.schedule.includes(day) ? '#E91E8C' : '#9CA3AF',
                                border: `1px solid ${doctor.schedule.includes(day) ? '#E91E8C40' : '#E5E7EB'}`,
                              }}
                            >
                              {day.slice(0, 3)}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certs & Fee */}
                      {detail && (
                        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                          <div className="flex gap-2 flex-wrap">
                            {detail.certifications.map((cert) => (
                              <span
                                key={cert}
                                className="px-2 py-1 rounded-lg text-xs font-semibold"
                                style={{ background: '#F0FDF4', color: '#10B981' }}
                              >
                                ✓ {cert}
                              </span>
                            ))}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Biaya Konsultasi</p>
                            <p className="text-sm font-black" style={{ color: '#E91E8C' }}>
                              {formatPrice(detail.consultFee)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer CTA */}
                    <div
                      className="px-6 py-4 flex items-center justify-between gap-4"
                      style={{ background: '#FAFAFA', borderTop: '1px solid #f3f4f6' }}
                    >
                      <p className="text-xs text-gray-500">
                        Tersedia: {doctor.schedule.join(', ')}
                      </p>
                      <Link
                        to="/booking"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
                        style={{
                          background: doctor.available
                            ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)'
                            : '#94A3B8',
                          boxShadow: doctor.available ? '0 4px 14px rgba(233,30,140,0.3)' : 'none',
                        }}
                      >
                        <Calendar size={14} />
                        Jadwalkan
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: '#1A1A2E' }}>
            Tidak Yakin Memilih Dokter?
          </h2>
          <p className="text-gray-500 mb-8">
            Tim kami siap membantu Anda memilih dokter yang paling sesuai dengan kebutuhan perawatan Anda.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 4px 20px rgba(233,30,140,0.3)' }}
          >
            Hubungi Kami
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
