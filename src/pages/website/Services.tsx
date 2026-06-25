import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, CheckCircle, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { SERVICES } from '../../data/mockData';
import { DentalServiceIcon, ServiceIconBezel, SERVICE_GRADIENTS, SERVICE_SHADOWS } from '../../components/mobile/DentalServiceIcon';
import { SeoHead } from '../../components/ui/SeoHead';
import { PageHero } from '../../components/website/PageHero';

const formatPrice = (p: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

const categories = ['Semua', 'Pencegahan', 'Estetika', 'Restorasi', 'Bedah'];

const serviceCategoryMap: Record<string, string> = {
  s1: 'Pencegahan',
  s2: 'Pencegahan',
  s3: 'Restorasi',
  s4: 'Bedah',
  s5: 'Estetika',
  s6: 'Bedah',
  s7: 'Restorasi',
  s8: 'Pencegahan',
};

const serviceDetails: Record<string, {
  benefits: string[];
  duration: string;
  rating: number;
  reviewCount: number;
}> = {
  s1: {
    benefits: ['Deteksi dini karies', 'Rencana perawatan tepat'],
    duration: '30 mnt',
    rating: 4.9,
    reviewCount: 234,
  },
  s2: {
    benefits: ['Gusi lebih sehat', 'Nafas segar'],
    duration: '45 mnt',
    rating: 4.8,
    reviewCount: 189,
  },
  s3: {
    benefits: ['Material komposit estetis', 'Warna sesuai gigi asli'],
    duration: '60 mnt',
    rating: 4.7,
    reviewCount: 156,
  },
  s4: {
    benefits: ['Prosedur aman & steril', 'Pemulihan cepat'],
    duration: '45 mnt',
    rating: 4.7,
    reviewCount: 143,
  },
  s5: {
    benefits: ['Gigi lebih rapi & estetis', 'Hasil permanen'],
    duration: '90 mnt',
    rating: 4.9,
    reviewCount: 312,
  },
  s6: {
    benefits: ['Pengganti gigi permanen', 'Kekuatan seperti gigi asli'],
    duration: '120 mnt',
    rating: 4.8,
    reviewCount: 97,
  },
  s7: {
    benefits: ['Menyelamatkan gigi asli', 'Bebas nyeri'],
    duration: '90 mnt',
    rating: 4.8,
    reviewCount: 178,
  },
  s8: {
    benefits: ['Solusi personal', 'Harga transparan'],
    duration: '30 mnt',
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
    <>
    <SeoHead
      title="Layanan Dental"
      description="Layanan perawatan gigi lengkap di OMDC Dental: pemeriksaan, scaling, tambal, cabut, behel ortodonsi, implan, perawatan saluran akar, dan veneer. Dokter spesialis berpengalaman."
      keywords="layanan gigi, scaling gigi, tambal gigi, cabut gigi, behel ortodonsi, implan gigi, perawatan saluran akar, veneer gigi, Jakarta"
      path="/services"
    />
    <div className="bg-[#FFF5F9]">
      <PageHero
        badge="Perawatan Terbaik"
        title="Layanan Dental"
        titleAccent="Premium Kami"
        description="Menghadirkan senyum sehat dan percaya diri penuh melalui 8 layanan perawatan gigi dengan teknologi terkini dan dokter spesialis berpengalaman."
        ctaPrimaryLabel="Booking Sekarang"
        ctaPrimaryTo="/booking"
        ctaSecondaryLabel="Konsultasi Gratis"
        ctaSecondaryTo="/contact"
        photoSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuC0EolqzvY1WD2WOp6SMJdKAfmWFjfpNCMwTSa1ndh1x4It-v1j41ymL_OfNorfUA6mjRRuFakD-6K6WIRBoBtyttbuE5Ivgg8YTOseynTdlYroGQmGEdhf03RUWPZfuF76uArIkLfxm9a1Z14vb5Yh0VFlDIfJurcRoLF8l_ZqsCxQOFj8Pr2tmJnqKaiNHgfNcwpiUXhfmhjN6PbBxnqw9GtG9z5lbBi4bUiKS0hpL74lPZ4jnwrIMC_ALmA4HxPenTr68oA9VF8"
        photoAlt="Perawatan gigi di OMDC Dental"
        floatingCard={{
          color: 'pink',
          name: "8 Layanan Unggulan",
          subtitle: "Ditangani Spesialis",
          stat: { value: "4.9★", label: "rata-rata rating" },
        }}
      />

      {/* Filter Chips */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <div
          className="flex overflow-x-auto space-x-3 pb-4 justify-start md:justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200"
              style={
                activeCategory === cat
                  ? { background: '#E91E8C', color: 'white', boxShadow: '0 4px 12px rgba(233,30,140,0.3)' }
                  : { background: 'white', color: '#6B7280', border: '1px solid #fce7f3' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Service Grid */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((service, i) => {
            const detail = serviceDetails[service.id];
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-pink-50 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="mb-6">
                  <ServiceIconBezel
                    gradient={SERVICE_GRADIENTS[i % SERVICE_GRADIENTS.length]}
                    shadowColor={SERVICE_SHADOWS[i % SERVICE_SHADOWS.length]}
                    size={56}
                    radius={16}
                  >
                    <DentalServiceIcon id={service.id} size={26} />
                  </ServiceIconBezel>
                </div>
                <h3 className="font-headline font-bold text-xl mb-3 text-[#0D1421]">{service.name}</h3>
                <p className="text-[#6B7280] text-sm mb-6 flex-grow leading-relaxed">{service.description}</p>
                {detail && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-xs font-semibold text-[#0D1421] uppercase tracking-wider mb-2">Manfaat</h4>
                      <ul className="text-sm text-[#6B7280] space-y-1">
                        {detail.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-[#D4A017] flex-shrink-0 mt-0.5" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div className="pt-4 border-t border-pink-50 mt-auto">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Estimasi Biaya</p>
                      <p className="font-headline font-bold text-[#E91E8C]">
                        Mulai {formatPrice(service.priceMin)}
                      </p>
                    </div>
                    {detail && (
                      <p className="text-xs text-[#6B7280] flex items-center gap-1">
                        <Clock size={12} /> {detail.duration}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3 text-[#E91E8C]">FAQ</p>
            <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-[#0D1421] mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
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
                  borderColor: openFaq === i ? 'rgba(233,30,140,0.25)' : '#E5E7EB',
                  boxShadow: openFaq === i ? '0 4px 20px rgba(233,30,140,0.08)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200"
                  style={{ background: openFaq === i ? '#FFF5F9' : 'white' }}
                >
                  <span className="font-semibold text-sm pr-4 text-[#0D1421]">{faq.q}</span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ background: openFaq === i ? '#E91E8C' : '#F3F4F6' }}
                  >
                    {openFaq === i
                      ? <ChevronUp size={15} className="text-white" />
                      : <ChevronDown size={15} className="text-[#6B7280]" />}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-1 bg-[#FFF5F9]">
                    <p className="text-sm text-[#6B7280] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#6B7280] mb-4">Masih punya pertanyaan?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ color: '#E91E8C', border: '2px solid #E91E8C' }}
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-[32px] p-8 md:p-12 text-white"
            style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
          >
            <h2 className="font-headline font-black text-3xl md:text-4xl mb-4">
              Siap Mulai Perawatan?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Jadwalkan konsultasi dengan dokter spesialis kami hari ini.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full font-headline font-bold hover:shadow-lg transition-all hover:-translate-y-0.5"
              style={{ color: '#E91E8C' }}
            >
              <Calendar size={18} />
              Booking Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
