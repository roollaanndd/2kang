import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Tag, Clock, Calendar, ChevronDown, ChevronUp, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { PROMOTIONS } from '../../data/mockData';
import { AnimatedDentalBg } from '../../components/ui/AnimatedDentalBg';

const filterTypes = ['Semua', 'Scaling', 'Whitening', 'Ortodonti', 'Implan'];

const extendedPromos = [
  ...PROMOTIONS,
  {
    id: 'p4',
    title: 'Implan Spesial',
    description: 'Pasang implan gigi titanium premium dengan konsultasi dan perencanaan gratis',
    discount: 10,
    validUntil: '31 Agt 2025',
    color: '#6366F1',
    bgColor: '#EEF2FF',
    service: 'Implan Gigi',
  },
  {
    id: 'p5',
    title: 'Family Package',
    description: 'Hemat lebih banyak dengan paket pemeriksaan keluarga. Min. 3 anggota keluarga.',
    discount: 20,
    validUntil: '30 Sep 2025',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    service: 'Pemeriksaan Gigi',
  },
  {
    id: 'p6',
    title: 'Student Discount',
    description: 'Diskon khusus untuk pelajar dan mahasiswa. Tunjukkan kartu pelajar/mahasiswa aktif.',
    discount: 25,
    validUntil: '31 Des 2025',
    color: '#10B981',
    bgColor: '#F0FDF4',
    service: 'Semua Layanan',
  },
];

const termsMap: Record<string, string[]> = {
  p1: [
    'Berlaku untuk pasien baru dan lama',
    'Tidak dapat digabung dengan promo lain',
    'Berlaku pada jadwal dokter yang tersedia',
    'Booking minimal H-1 sebelum kunjungan',
    'Diskon diterapkan langsung pada kasir',
  ],
  p2: [
    'Berlaku untuk paket whitening standar',
    'Sesi whitening termasuk 1x home kit',
    'Tidak berlaku untuk veneer atau crown',
    'Konsultasi dokter wajib dilakukan sebelumnya',
    'Berlaku pada hari Senin dan Selasa',
  ],
  p3: [
    'Berlaku untuk behel metal dan keramik',
    'Konsultasi gratis termasuk foto rontgen panoramik',
    'Kontrol pertama gratis (kunjungan ke-2)',
    'Cicilan tersedia mulai 0% selama 12 bulan',
    'Dokter spesialis ortodonti bersertifikat',
  ],
  p4: [
    'Berlaku untuk 1 unit implan titanium',
    'Termasuk biaya konsultasi dan CT scan',
    'Pemasangan mahkota belum termasuk',
    'Garansi implan 5 tahun dari pemasangan',
    'Hanya tersedia pada hari Rabu dan Jumat',
  ],
  p5: [
    'Minimum 3 anggota keluarga dalam satu kunjungan',
    'Berlaku untuk pemeriksaan dan scaling dasar',
    'Setiap anggota mendapat laporan kesehatan gigi',
    'Harus booking bersamaan dalam satu waktu',
    'Berlaku Sabtu dan Minggu',
  ],
  p6: [
    'Wajib menunjukkan kartu pelajar/mahasiswa aktif',
    'Berlaku untuk layanan pemeriksaan dan scaling',
    'Tidak berlaku untuk behel dan implan',
    'Maksimal 1x penggunaan per bulan',
    'Berlaku Senin - Jumat',
  ],
};

export function Promotions() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [openTerms, setOpenTerms] = useState<string | null>(null);

  const filtered = extendedPromos.filter(
    (p) => activeFilter === 'Semua' || p.service.toLowerCase().includes(activeFilter.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(233,30,140,0.08)' }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />
        <AnimatedDentalBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold"
              style={{ background: '#FFF0F7', color: '#E91E8C', border: '1px solid rgba(233,30,140,0.2)' }}
            >
              <Tag size={14} />
              Penawaran Terbatas
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-6" style={{ color: '#111827' }}>Promo Spesial OMDC</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: '#6B7280' }}>
              Dapatkan layanan dental premium dengan harga istimewa. Jangan lewatkan penawaran eksklusif kami!
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              {[
                { val: extendedPromos.length + '+', label: 'Promo Aktif' },
                { val: 'S/D 30%', label: 'Diskon Terbesar' },
                { val: '0%', label: 'Cicilan Tersedia' },
              ].map((s) => (
                <div
                  key={s.val}
                  className="px-6 py-3 rounded-2xl text-center"
                  style={{ background: 'white', border: '1px solid rgba(233,30,140,0.15)', boxShadow: '0 2px 12px rgba(233,30,140,0.08)' }}
                >
                  <div className="text-2xl font-black" style={{ color: '#E91E8C' }}>{s.val}</div>
                  <div className="text-sm" style={{ color: '#6B7280' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-30 shadow-sm" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterTypes.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex-shrink-0"
                style={{
                  background: activeFilter === f ? '#E91E8C' : '#F9FAFB',
                  color: activeFilter === f ? 'white' : '#6B7280',
                  border: `1px solid ${activeFilter === f ? '#E91E8C' : '#E5E7EB'}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Cards */}
      <section className="py-16" style={{ background: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Tidak ada promo untuk kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((promo, i) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ background: 'white' }}
                >
                  {/* Card header */}
                  <div
                    className="p-6 relative overflow-hidden"
                    style={{ background: promo.bgColor }}
                  >
                    {/* Background disc */}
                    <div
                      className="absolute -top-8 -right-8 rounded-full opacity-15"
                      style={{ width: 120, height: 120, background: promo.color }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div>
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold text-white mb-3"
                            style={{ background: promo.color }}
                          >
                            <Tag size={11} />
                            {promo.service}
                          </div>
                          <h3 className="text-xl font-black mb-1" style={{ color: '#1A1A2E' }}>{promo.title}</h3>
                        </div>
                        {/* Discount badge */}
                        <div
                          className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${promo.color}, ${promo.color}bb)` }}
                        >
                          <span className="text-xl font-black leading-none">-{promo.discount}%</span>
                          <span className="text-xs opacity-80">OFF</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed mt-2">{promo.description}</p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock size={14} style={{ color: promo.color }} />
                        Berlaku s/d <span className="font-semibold" style={{ color: '#1A1A2E' }}>{promo.validUntil}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={12} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                        ))}
                      </div>
                    </div>

                    {/* Terms toggle */}
                    <button
                      onClick={() => setOpenTerms(openTerms === promo.id ? null : promo.id)}
                      className="w-full flex items-center justify-between py-3 text-sm font-semibold transition-colors duration-200 border-t"
                      style={{ borderColor: '#F3F4F6', color: '#6B7280' }}
                    >
                      <span>Syarat & Ketentuan</span>
                      {openTerms === promo.id
                        ? <ChevronUp size={16} style={{ color: promo.color }} />
                        : <ChevronDown size={16} />
                      }
                    </button>

                    {openTerms === promo.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="pb-3"
                      >
                        <ul className="space-y-2">
                          {(termsMap[promo.id] || []).map((term) => (
                            <li key={term} className="flex items-start gap-2 text-xs text-gray-600">
                              <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: promo.color }} />
                              {term}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="px-6 pb-5">
                    <Link
                      to="/booking"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${promo.color}, ${promo.color}cc)` }}
                    >
                      <Calendar size={15} />
                      Gunakan Promo Ini
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How to use */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>Cara Pakai</p>
            <h2 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: '#1A1A2E' }}>Cara Menggunakan Promo</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Pilih Promo', desc: 'Pilih promo yang sesuai dengan kebutuhan perawatan Anda dan klik "Gunakan Promo Ini".' },
              { step: '02', title: 'Buat Janji', desc: 'Isi formulir booking dan pilih dokter, tanggal, serta waktu yang tersedia untuk Anda.' },
              { step: '03', title: 'Datang & Nikmati', desc: 'Datang ke klinik sesuai jadwal dan sebutkan kode promo di kasir untuk mendapatkan diskon.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center p-6 rounded-2xl"
                style={{ background: '#FAFAFA', border: '1px solid #E5E7EB' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#1A1A2E' }}>{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: '#FAFAFA' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div
            className="rounded-3xl p-10 relative overflow-hidden"
            style={{ background: '#FFF5F9', border: '1.5px solid rgba(233,30,140,0.15)' }}
          >
            <h2 className="text-2xl sm:text-3xl font-black mb-4 relative z-10" style={{ color: '#111827' }}>
              Tidak Ada Promo yang Cocok?
            </h2>
            <p className="mb-6 relative z-10" style={{ color: '#6B7280' }}>
              Hubungi kami dan ceritakan kebutuhan Anda. Kami siap memberikan penawaran terbaik untuk Anda!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative z-10"
              style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 4px 20px rgba(233,30,140,0.3)' }}
            >
              Hubungi Kami
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
