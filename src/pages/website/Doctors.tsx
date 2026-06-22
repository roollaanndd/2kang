import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Calendar, Search } from 'lucide-react';
import { DOCTORS } from '../../data/mockData';

const DOCTOR_PHOTOS: Record<string, string> = {
  d1: 'https://lh3.googleusercontent.com/aida/AP1WRLsJm6Hd3zuvQHAHO-2tZZTLKwucUMxPrVYakmwVrfOx5lQgn7H8rPUHO0E9FvxApcbh9i385scrC8chYANySbYJtsMy4Hmspv7NnWHRljsap8pRDF5UQ0HucY3JJW-PIzrYR6UHUTfU1WACFIsZKvj7SBe-Pv9OE-HUvpbBHmIqrKi6DWM87NPGer4TtoxBjkAFTi4X6ifT7hm35ORakGAiqThN9FxGY1br8lXTaEcAzDjpzPMDzLD00g',
  d2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIhrxctfPERdl-c4tEYYsHgOpqbOvzY3yKmMQ8b2dmhSNUt2vjVhAWtRZn5QziC_yxd58ibtFhBeYCPJ6phozfZcYsDgEcMusplCR5iBkccspmGf-mZdDg8-N9Ojbcq_Mc9bkhLgk7IhdUH_DxoRa2eNP2-hh63uYOTmk2aQjLJIRNYNdtcYqd3G0MGKtxOySWW-b0iOkOGWoXe0KPo7AJo2tUSc5hcaUxsYGVwC11d3eATNj1H-5lwsNWkB9CbljJJOzi436QrQU',
  d3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsBVbwaQO9whDMgd7dsLfxbQj9z4HC47UBF8p8IC2RkJW_-6IKyn75aV5ata31EBobh3nkNHUzMS82rlGFUbTWIgAVdE6pgroyfTU3H73cTj0bk42RC7nb7QsA39oMEqiwfcI28ozIS0DzrGZoR3mz6ed0-hF0T44yLY0LXDhybnXqZUoYvlMVZvB2Kp82s8_u41fLh5esLZkGgFF3S7gbxAC0dMdFS_mZhs1q7sl9ghBvmsV7a0V-26zwOh5ixOebv2O7BWWXJ1s',
  d4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArpj-4DGMkvfk78dhLYiaN2_BZrtenHjnv0X0TwpcuOP8Mbj6ilSiQftBLB4OFgew8NGk5Lk_qRyHIk5z3AWVn4ATvvnru52jVAa7SgdhHNPcaiM33xnESa-UAKiXpF4y9bjTravQ1w4od2UopXUmFuSy1seTdqfOYVtfMnuKEqebmY5PgWmGDgNwxV-rRNfYu7xwKEWVdw_TB9gYgjvb374JIWb8RMUUFLq98Xn8tP-DCUE1u8sJT_0980fGhOm6hoAiKM4AYGHs',
};

const specialties = ['Semua', 'Gigi Umum', 'Ortodonti', 'Bedah Mulut', 'Konservasi', 'Pedodonti'];

const doctorDetails = [
  { fee: 'Rp 250.000', schedule: 'Senin - Jumat', hours: '10:00 - 18:00 WIB', available: true },
  { fee: 'Rp 450.000', schedule: 'Selasa, Kamis, Sabtu', hours: '14:00 - 20:00 WIB', available: false },
  { fee: 'Rp 500.000', schedule: 'Senin, Rabu, Jumat', hours: '09:00 - 15:00 WIB', available: true },
  { fee: 'Rp 400.000', schedule: 'Sabtu & Minggu', hours: '08:00 - 16:00 WIB', available: false },
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

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 overflow-hidden bg-[#FFF5F9]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-pink-50 text-[#E91E8C] font-semibold text-sm tracking-wider uppercase mb-4 shadow-sm border border-pink-100">
              Tim Profesional
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0D1421] tracking-tight mb-6 font-headline">
              Temui{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }}
              >
                Tim Dokter
              </span>{' '}
              Kami
            </h1>
            <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto font-body leading-relaxed">
              Dedikasi tim medis profesional kami siap memberikan perawatan gigi terbaik untuk senyum sehat dan penuh percaya diri Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96 flex-shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Cari dokter atau spesialisasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm font-body bg-gray-50 focus:outline-none focus:ring-2 focus:border-[#E91E8C] transition-all shadow-sm placeholder-gray-400"
                style={{ focusBorderColor: '#E91E8C' } as React.CSSProperties}
              />
            </div>
            {/* Specialty Filters */}
            <div
              className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto items-center"
              style={{ scrollbarWidth: 'none' }}
            >
              {specialties.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSpecialty(s)}
                  className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 shadow-sm"
                  style={
                    activeSpecialty === s
                      ? { background: '#E91E8C', color: 'white', boxShadow: '0 4px 12px rgba(233,30,140,0.3)' }
                      : { background: 'white', color: '#6B7280', border: '1px solid #E5E7EB' }
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Grid Section */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Tidak ada dokter ditemukan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((doctor, i) => {
                const detail = doctorDetails[DOCTORS.indexOf(doctor)] || doctorDetails[0];
                const photoUrl = DOCTOR_PHOTOS[doctor.id] || DOCTOR_PHOTOS['d1'];
                const isAvailable = doctor.available;
                return (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="bg-white rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-50/50 overflow-hidden flex flex-col group hover:-translate-y-1"
                  >
                    {/* Photo */}
                    <div className="relative pt-[100%] bg-[#FFF5F9] overflow-hidden">
                      <img
                        src={photoUrl}
                        alt={doctor.name}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute top-4 right-4 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5"
                        style={
                          isAvailable
                            ? { background: 'rgba(255,255,255,0.9)', color: '#16a34a', border: '1px solid #dcfce7' }
                            : { background: 'rgba(255,255,255,0.9)', color: '#6B7280', border: '1px solid #F3F4F6' }
                        }
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: isAvailable ? '#22c55e' : '#9CA3AF' }}
                        />
                        {isAvailable ? 'Tersedia Hari Ini' : 'Tersedia Besok'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider bg-pink-50 px-2.5 py-1 rounded-md" style={{ color: '#FF6BB5' }}>
                          {doctor.specialty}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0D1421] font-headline mt-2 mb-1 group-hover:text-[#E91E8C] transition-colors">
                        {doctor.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-4">
                        <div className="flex text-yellow-400 text-sm">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={14}
                              fill={s <= Math.round(doctor.rating) ? '#FBBF24' : 'none'}
                              className="text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#6B7280] font-medium ml-1">
                          {doctor.rating} ({doctor.reviewCount} Ulasan)
                        </span>
                      </div>

                      <div className="space-y-3 mb-6 flex-grow">
                        <div className="flex items-start gap-2.5 text-sm text-[#6B7280]">
                          <Calendar size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700">{detail.schedule}</p>
                            <p className="text-xs">{detail.hours}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-[#6B7280]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <path d="M2 10h20" />
                          </svg>
                          <p>Mulai <span className="font-bold text-[#0D1421]">{detail.fee}</span></p>
                        </div>
                      </div>

                      <Link
                        to="/booking"
                        className="w-full text-center py-3 rounded-xl font-bold font-headline text-sm shadow-md transition-all active:scale-95 group-hover:opacity-90 block"
                        style={
                          isAvailable
                            ? { background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)', color: 'white', boxShadow: '0 4px 12px rgba(233,30,140,0.3)' }
                            : { background: 'white', color: '#E91E8C', border: '2px solid #E91E8C' }
                        }
                      >
                        {isAvailable ? 'Booking Jadwal' : 'Cek Jadwal Lain'}
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 relative overflow-hidden bg-[#FFF5F9]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div
            className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-pink-50 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
          >
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold font-headline text-[#0D1421] mb-4 tracking-tight">
                Butuh konsultasi mendadak?
              </h2>
              <p className="text-[#6B7280] font-body text-lg">
                Layanan darurat kami siap membantu Anda. Jangan biarkan sakit gigi mengganggu hari Anda.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/booking"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold font-headline text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95 text-white"
                style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)', boxShadow: '0 4px 20px rgba(233,30,140,0.3)' }}
              >
                <Calendar size={20} />
                Booking Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
