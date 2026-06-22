import { useState } from 'react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, ChevronDown, ChevronUp, Calendar, ArrowRight, Star } from 'lucide-react';
import { SERVICES } from '../../data/mockData';
import {
  IconCheckup, IconScaling, IconFilling, IconExtraction,
  IconBraces, IconImplant, IconVeneer, IconBleaching,
} from '../../components/ui/OmdcIcons';
import { AnimatedDentalBg } from '../../components/ui/AnimatedDentalBg';
import { WaveDivider } from '../../components/ui/WaveDivider';

const formatPrice = (p: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

const categories = ['Semua', 'Perawatan Dasar', 'Estetika', 'Bedah', 'Ortodonti'];

const serviceCategoryMap: Record<string, string> = {
  s1: 'Perawatan Dasar',
  s2: 'Perawatan Dasar',
  s3: 'Perawatan Dasar',
  s4: 'Bedah',
  s5: 'Ortodonti',
  s6: 'Bedah',
  s7: 'Perawatan Dasar',
  s8: 'Perawatan Dasar',
};

const SERVICE_ICON_CMPS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  s1: IconCheckup, s2: IconScaling, s3: IconFilling, s4: IconExtraction,
  s5: IconBraces, s6: IconImplant, s7: IconVeneer, s8: IconBleaching,
};

const serviceDetails: Record<string, {
  benefits: string[];
  process: string[];
  duration: string;
  rating: number;
  reviewCount: number;
}> = {
  s1: {
    benefits: ['Deteksi dini masalah gigi', 'X-ray digital modern', 'Konsultasi dokter spesialis', 'Rekomendasi perawatan personal'],
    process: ['Anamnesis & riwayat kesehatan', 'Pemeriksaan visual menyeluruh', 'X-ray jika diperlukan', 'Konsultasi & rencana perawatan'],
    duration: '30 - 45 menit',
    rating: 4.9,
    reviewCount: 234,
  },
  s2: {
    benefits: ['Gigi bersih dari karang', 'Napas lebih segar', 'Gusi lebih sehat', 'Tampilan gigi lebih cerah'],
    process: ['Pemeriksaan awal', 'Ultrasonic scaling', 'Hand scaling detail', 'Polishing & fluoride'],
    duration: '45 - 60 menit',
    rating: 4.8,
    reviewCount: 189,
  },
  s3: {
    benefits: ['Material komposit estetis', 'Tahan lama & kuat', 'Warna sesuai gigi asli', 'Minimal invasif'],
    process: ['Anestesi lokal', 'Pembersihan lubang', 'Pemasangan matriks', 'Penambalan & curing'],
    duration: '60 - 90 menit',
    rating: 4.7,
    reviewCount: 156,
  },
  s4: {
    benefits: ['Prosedur aman & steril', 'Anestesi modern', 'Minimal rasa sakit', 'Pemulihan cepat'],
    process: ['Konsultasi & X-ray', 'Anestesi lokal', 'Pencabutan gigi', 'Instruksi pasca pencabutan'],
    duration: '30 - 60 menit',
    rating: 4.7,
    reviewCount: 143,
  },
  s5: {
    benefits: ['Gigi lebih rapi & estetis', 'Pilihan metal/keramik/clear', 'Kontrol rutin terjadwal', 'Hasil permanen'],
    process: ['Konsultasi & foto', 'Percetakan gigi', 'Pemasangan behel', 'Kontrol berkala 3-4 minggu'],
    duration: '90 - 120 menit',
    rating: 4.9,
    reviewCount: 312,
  },
  s6: {
    benefits: ['Pengganti gigi permanen', 'Tampilan natural', 'Kekuatan seperti gigi asli', 'Tidak merusak gigi sebelah'],
    process: ['Evaluasi tulang rahang', 'Pemasangan implan titanium', 'Masa osseointegration', 'Pemasangan mahkota'],
    duration: '120 - 180 menit',
    rating: 4.8,
    reviewCount: 97,
  },
  s7: {
    benefits: ['Menyelamatkan gigi asli', 'Bebas nyeri', 'Hasil jangka panjang', 'Teknologi rotary modern'],
    process: ['Anestesi & akses saluran', 'Pembersihan saluran akar', 'Pengisian saluran', 'Restorasi mahkota'],
    duration: '60 - 120 menit',
    rating: 4.8,
    reviewCount: 178,
  },
  s8: {
    benefits: ['Konsultasi mendalam', 'Solusi personal', 'Rujukan ke spesialis', 'Harga transparan'],
    process: ['Konsultasi awal', 'Pemeriksaan lengkap', 'Rencana perawatan', 'Pelaksanaan sesuai kebutuhan'],
    duration: '30 - 60 menit',
    rating: 4.7,
    reviewCount: 89,
  },
};

const faqs = [
  {
    q: 'Apakah BPJS Kesehatan diterima di OMDC Dental?',
    a: 'Ya, kami menerima pasien BPJS Kesehatan untuk layanan tertentu. Silakan hubungi kami terlebih dahulu untuk informasi lebih lanjut mengenai layanan yang ditanggung.',
  },
  {
    q: 'Berapa lama proses pemasangan behel biasanya?',
    a: 'Durasi perawatan behel bervariasi tergantung kondisi gigi, biasanya antara 12-24 bulan. Konsultasi dengan dokter ortodonti kami untuk penilaian yang akurat.',
  },
  {
    q: 'Apakah perawatan gigi anak-anak tersedia?',
    a: 'Ya, kami memiliki dokter yang berpengalaman dalam menangani pasien anak-anak. Kami menggunakan pendekatan ramah anak untuk membuat pengalaman lebih nyaman.',
  },
  {
    q: 'Bagaimana cara menjaga gigi setelah scaling?',
    a: 'Setelah scaling, sikat gigi 2x sehari, gunakan benang gigi, hindari makanan/minuman berwarna pekat selama 24 jam, dan lakukan scaling rutin setiap 6 bulan.',
  },
  {
    q: 'Apakah implan gigi menyakitkan?',
    a: 'Prosedur implan dilakukan dengan anestesi lokal sehingga tidak terasa sakit saat pemasangan. Rasa tidak nyaman ringan mungkin terasa beberapa hari setelahnya dan dapat diatasi dengan obat pereda nyeri.',
  },
  {
    q: 'Berapa lama masa pemulihan setelah cabut gigi?',
    a: 'Umumnya 1-3 hari untuk nyeri ringan, 7-10 hari untuk penyembuhan luka. Ikuti instruksi dokter: jangan merokok, hindari minum dengan sedotan, dan makan makanan lembut.',
  },
];

export function Services() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = SERVICES.filter(
    (s) => activeCategory === 'Semua' || serviceCategoryMap[s.id] === activeCategory
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(233,30,140,0.08)' }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />
        <AnimatedDentalBg />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#E91E8C' }}>Perawatan Terbaik</p>
            <h1 className="text-4xl sm:text-5xl font-black mb-6" style={{ color: '#111827', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Layanan Dental Kami</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: '#6B7280' }}>
              Kami menyediakan layanan dental komprehensif dengan teknologi terkini untuk menjaga senyum sehat Anda.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 4px 20px rgba(233,30,140,0.3)' }}
            >
              <Calendar size={18} />
              Buat Janji Sekarang
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-30 shadow-sm" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex-shrink-0"
                style={{
                  background: activeCategory === cat ? '#E91E8C' : '#F9FAFB',
                  color: activeCategory === cat ? 'white' : '#6B7280',
                  border: `1px solid ${activeCategory === cat ? '#E91E8C' : '#E5E7EB'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider after hero */}
      <WaveDivider fromColor="#FFFFFF" toColor="#FAFAFA" />

      {/* Services List */}
      <section className="py-16" style={{ background: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((service, i) => {
              const detail = serviceDetails[service.id];
              const SvcIcon = SERVICE_ICON_CMPS[service.id];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: 'white' }}
                >
                  {/* Header */}
                  <div
                    className="px-6 py-5 flex items-center gap-4"
                    style={{ background: service.color + '10', borderBottom: `2px solid ${service.color}20` }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: service.color + '20' }}
                    >
                      {SvcIcon && <SvcIcon size={32} color={service.color} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-xl" style={{ color: '#1A1A2E' }}>{service.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{service.nameEn}</p>
                    </div>
                    {detail && (
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          <Star size={13} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                          <span className="text-sm font-bold" style={{ color: '#1A1A2E' }}>{detail.rating}</span>
                          <span className="text-xs text-gray-400">({detail.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={12} />
                          {detail.duration}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5">
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">{service.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Benefits */}
                      {detail && (
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Manfaat</p>
                          <ul className="space-y-2">
                            {detail.benefits.map((b) => (
                              <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                                <div
                                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                  style={{ background: service.color + '20' }}
                                >
                                  <span style={{ color: service.color, fontSize: 10 }}>✓</span>
                                </div>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Process */}
                      {detail && (
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Proses</p>
                          <ol className="space-y-2">
                            {detail.process.map((p, idx) => (
                              <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                                <div
                                  className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5 text-xs"
                                  style={{ background: service.color }}
                                >
                                  {idx + 1}
                                </div>
                                {p}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="px-6 py-4 flex items-center justify-between gap-4"
                    style={{ background: '#FAFAFA', borderTop: '1px solid #f3f4f6' }}
                  >
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Estimasi Biaya</p>
                      <p className="text-base font-black" style={{ color: service.color }}>
                        {formatPrice(service.priceMin)} – {formatPrice(service.priceMax)}
                      </p>
                    </div>
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
                      }}
                    >
                      <Calendar size={14} />
                      Buat Janji
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#1A1A2E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="w-16 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl border overflow-hidden transition-all duration-200"
                style={{
                  borderColor: openFaq === i ? '#E91E8C40' : '#E5E7EB',
                  boxShadow: openFaq === i ? '0 4px 20px rgba(233,30,140,0.08)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200"
                  style={{ background: openFaq === i ? '#FFF5F9' : 'white' }}
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: '#1A1A2E' }}>{faq.q}</span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ background: openFaq === i ? '#E91E8C' : '#F3F4F6' }}
                  >
                    {openFaq === i
                      ? <ChevronUp size={15} className="text-white" />
                      : <ChevronDown size={15} style={{ color: '#6B7280' }} />}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-1" style={{ background: '#FFF5F9' }}>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">Masih punya pertanyaan?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: '#E91E8C',
                border: '2px solid #E91E8C',
                background: 'transparent',
              }}
            >
              Hubungi Kami <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
