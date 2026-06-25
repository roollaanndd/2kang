import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Copy, CheckCircle } from 'lucide-react';
import { PROMOTIONS } from '../../data/mockData';
import { SeoHead } from '../../components/ui/SeoHead';
import { PageHero } from '../../components/website/PageHero';

const filterTypes = ['Semua', 'Pembersihan', 'Behel', 'Estetika', 'Anak'];

const PROMO_IMAGES: Record<string, string> = {
  p1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBQk_b6jng2mEPno7VXagapwXl1CkG4E81hmEyQmi9FdpbKNr5tRUQ5CYR6hNDlooO_0iR6Lv0wqdEnrfkvYinMUMJxoLtBt3H4YFFj2qTOKsKUk_zwMaNpfRe1u38FIKjWLM2CF0_JGoDt_JAtdErga_rG_Z6FHbxEAkhT4AF0WShP63UfbkCQVgzw79X5oiGwIC4HEDMclfU9zY7N6vZVE2geRlznMrOV-HU3cKgSeRKQWQELGBh4PNwV89gC9lo3-hVV-EIzsY',
  p2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaBno55UjodDJEF6J9cXgXigl-2P7Nkw1-B_vT_Z75aBq-eFNfbS3mludSP7uju9-OkKab5LngqMQAnSqrMKPVmxiP8lrFLaPgPnczM1D7CzMDuzvBAvXxF4B2R666ty_3YcYI9T2JcrgqiszrgC9WWNTCgGeMGXK8bPBNopgOvEEZ4kmi8hgsZC_lVXNlUXQoQeqXpwa0xAjbx_VKmz1gstfSQ9eivzPwX8P3n0aSEdHJd429-5DPgzuA5ylk9lmj3aDav5om4_c',
  p3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLRp0MDasdGBb2lBeGWbqS029I_9_m91ldzlnnRJa4rAYsG-AcPpXUjixKONtFEDTBN-lsafCkmuDuq-AlYEGrkFzyE4BoUHtHz3qA54AHX2LKgfUVT2FxDhl8xJ4vqgK1HAR622VFsMshKQQggMcxf3z-MrddwwEXa4bkfT2b3Ka1RH6OxgNUK1HAqDWj_2LSdiNmVs8QRp3mRUFRMXHgSA1Q3kcdrs817as72LLO1wdX-7I2UzrD7AG_P_wq8mJ_E7qI7lPpkWA',
};

const PROMO_CODES: Record<string, string> = {
  p1: 'OMDCMERDEKA',
  p2: 'OMDCSAPPHIRE',
  p3: 'OMDCKIDS24',
};

const BADGE_LABELS: Record<string, { label: string; bg: string }> = {
  p1: { label: 'Diskon 50%', bg: '#ef4444' },
  p2: { label: 'Spesial', bg: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' },
  p3: { label: 'Keluarga', bg: '#D4A017' },
};

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
    color: '#D4A017',
    bgColor: '#F0FDF4',
    service: 'Semua Layanan',
  },
];

const termsMap: Record<string, string[]> = {
  p1: ['Berlaku untuk pasien baru dan lama', 'Tidak dapat digabung dengan promo lain', 'Berlaku pada jadwal dokter yang tersedia', 'Booking minimal H-1 sebelum kunjungan'],
  p2: ['Berlaku untuk paket whitening standar', 'Sesi whitening termasuk 1x home kit', 'Konsultasi dokter wajib dilakukan sebelumnya'],
  p3: ['Berlaku untuk behel metal dan keramik', 'Konsultasi gratis termasuk foto rontgen panoramik', 'Cicilan tersedia mulai 0% selama 12 bulan'],
  p4: ['Berlaku untuk 1 unit implan titanium', 'Termasuk biaya konsultasi dan CT scan', 'Garansi implan 5 tahun dari pemasangan'],
  p5: ['Minimum 3 anggota keluarga dalam satu kunjungan', 'Berlaku Sabtu dan Minggu'],
  p6: ['Wajib menunjukkan kartu pelajar/mahasiswa aktif', 'Berlaku Senin - Jumat'],
};

export function Promotions() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filtered = extendedPromos.filter(
    (p) => activeFilter === 'Semua' || p.service.toLowerCase().includes(activeFilter.toLowerCase())
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
    <SeoHead
      title="Promo & Penawaran Spesial"
      description="Temukan promo dan diskon perawatan gigi terbaik di OMDC Dental — paket scaling, behel, pemutihan gigi, dan perawatan anak dengan harga spesial. Penawaran terbatas!"
      keywords="promo klinik gigi, diskon scaling, paket behel, promo gigi anak, voucher dental, penawaran gigi Jakarta"
      path="/promotions"
    />
    <div className="bg-white">
      <PageHero
        badge="Promo Terbatas"
        title="Penawaran Spesial"
        titleAccent="OMDC Dental"
        description="Nikmati perawatan gigi premium dengan diskon eksklusif. Paket scaling, behel, pemutihan gigi, dan perawatan anak dengan harga terbaik — penawaran terbatas!"
        ctaPrimaryLabel="Klaim Promo"
        ctaPrimaryTo="/booking"
        ctaSecondaryLabel="Lihat Semua Promo"
        ctaSecondaryTo="#promos"
        photoSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDBQk_b6jng2mEPno7VXagapwXl1CkG4E81hmEyQmi9FdpbKNr5tRUQ5CYR6hNDlooO_0iR6Lv0wqdEnrfkvYinMUMJxoLtBt3H4YFFj2qTOKsKUk_zwMaNpfRe1u38FIKjWLM2CF0_JGoDt_JAtdErga_rG_Z6FHbxEAkhT4AF0WShP63UfbkCQVgzw79X5oiGwIC4HEDMclfU9zY7N6vZVE2geRlznMrOV-HU3cKgSeRKQWQELGBh4PNwV89gC9lo3-hVV-EIzsY"
        photoAlt="Promo perawatan gigi OMDC Dental"
        floatingCard={{
          color: 'pink',
          name: "Hemat Hingga 40%",
          subtitle: "Untuk member baru",
          stat: { value: "6 Promo", label: "aktif sekarang" },
        }}
      />
      <main className="pb-20">

        {/* Category Filter */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filterTypes.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full font-medium transition-all active:scale-95"
                style={
                  activeFilter === f
                    ? { background: '#E91E8C', color: 'white', boxShadow: '0 4px 12px rgba(233,30,140,0.25)' }
                    : { background: '#FFF8F4', color: '#0D1421', border: '1px solid #fce7f3' }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Promo Grid */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((promo, i) => {
              const imageUrl = PROMO_IMAGES[promo.id];
              const code = PROMO_CODES[promo.id];
              const badge = BADGE_LABELS[promo.id];
              return (
                <motion.article
                  key={promo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white rounded-[24px] p-6 border border-pink-50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                  style={{ boxShadow: '0 10px 40px -10px rgba(233,30,140,0.08)' }}
                >
                  {/* Badge */}
                  {badge && (
                    <div
                      className="absolute top-0 right-0 text-white font-bold py-1.5 px-4 rounded-bl-xl z-10 shadow-sm flex items-center gap-1 text-sm"
                      style={{ background: badge.bg }}
                    >
                      {badge.label}
                    </div>
                  )}
                  {!badge && (
                    <div className="absolute top-0 right-0 text-white font-bold py-1.5 px-4 rounded-bl-xl z-10 shadow-sm text-sm" style={{ background: promo.color || '#E91E8C' }}>
                      -{promo.discount}%
                    </div>
                  )}

                  {/* Image */}
                  {imageUrl ? (
                    <div className="h-48 rounded-[18px] mb-6 relative overflow-hidden">
                      <img src={imageUrl} alt={promo.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  ) : (
                    <div
                      className="h-48 rounded-[18px] mb-6 relative overflow-hidden"
                      style={{ background: promo.bgColor || '#FFF8F4' }}
                    />
                  )}

                  {/* Content */}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold font-headline text-[#0D1421] mb-2 group-hover:text-[#E91E8C] transition-colors">
                      {promo.title}
                    </h3>
                    <p className="text-[#6B7280] font-body text-sm mb-4 line-clamp-2">
                      {promo.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280] mb-4 bg-gray-50 p-2 rounded-lg">
                      <Calendar size={14} className="text-[#E91E8C]" />
                      Berlaku s/d {promo.validUntil}
                    </div>

                    {/* Promo Code */}
                    {code && (
                      <div className="pt-4 border-t border-gray-100 mb-4">
                        <span className="text-xs text-[#6B7280] block mb-1">Kode Promo:</span>
                        <div className="inline-flex items-center gap-2 bg-pink-50 px-3 py-1 rounded-md border border-pink-100 border-dashed">
                          <span className="font-mono font-bold text-[#E91E8C] text-sm tracking-wider">{code}</span>
                          <button
                            onClick={() => handleCopy(code)}
                            className="text-[#E91E8C] hover:text-pink-700 transition-colors"
                            title="Salin kode"
                          >
                            {copiedCode === code
                              ? <CheckCircle size={14} />
                              : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* SK & CTA */}
                    <div className="flex items-center justify-between gap-4 mt-2">
                      <details className="text-sm text-[#6B7280]">
                        <summary className="cursor-pointer hover:text-[#E91E8C] font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-[#E91E8C] transition-all">
                          S&K Berlaku
                        </summary>
                        <ul className="mt-2 space-y-1 text-xs">
                          {(termsMap[promo.id] || []).map((t) => (
                            <li key={t} className="flex items-start gap-1">
                              <span className="text-[#E91E8C]">•</span> {t}
                            </li>
                          ))}
                        </ul>
                      </details>
                      <Link
                        to="/booking"
                        className="font-semibold py-2.5 px-5 rounded-xl active:scale-95 transition-all shadow-md flex-1 text-center text-white text-sm"
                        style={{ background: '#E91E8C', boxShadow: '0 4px 12px rgba(233,30,140,0.25)' }}
                      >
                        Klaim Promo
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* How to use */}
        <section className="py-16 bg-[#FFF8F4] mb-24 relative overflow-hidden">
          <div className="px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline text-[#0D1421] mb-4">Cara Menggunakan Promo</h2>
              <p className="text-[#6B7280] font-body max-w-2xl mx-auto">Tiga langkah mudah untuk mendapatkan perawatan gigi premium dengan harga spesial.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                { n: '1', title: 'Pilih Promo', desc: 'Temukan penawaran yang sesuai dengan kebutuhan perawatan gigi Anda dan salin kodenya.', icon: '🏷️' },
                { n: '2', title: 'Tunjukkan Kode', desc: 'Tunjukkan kode promo kepada resepsionis kami saat melakukan pendaftaran atau booking via WhatsApp.', icon: '📱' },
                { n: '3', title: 'Nikmati Perawatan', desc: 'Dapatkan pelayanan prima dari tim dokter gigi profesional kami dengan harga lebih hemat.', icon: '😊' },
              ].map((step) => (
                <div key={step.n} className="relative flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 border-4 border-[#FFF8F4] relative hover:scale-105 transition-transform">
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full text-white font-bold flex items-center justify-center text-sm shadow-md" style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}>
                      {step.n}
                    </span>
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold font-headline text-[#0D1421] mb-2">{step.title}</h3>
                  <p className="text-[#6B7280] font-body text-sm px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="px-6 md:px-12 max-w-5xl mx-auto mb-16">
          <div className="rounded-[32px] p-8 md:p-12 border border-pink-100 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: 'linear-gradient(135deg, #fdf2f8, #FFF8F4)' }}>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold font-headline text-[#0D1421] mb-3">Dapatkan Info Promo Terbaru</h2>
              <p className="text-[#6B7280] font-body">Jangan lewatkan penawaran spesial dan tips kesehatan gigi eksklusif langsung ke inbox Anda.</p>
            </div>
            <div className="md:w-1/2 w-full">
              <form className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">✉</span>
                  <input
                    type="email"
                    placeholder="Alamat email Anda"
                    required
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#E91E8C] transition-all font-body text-[#0D1421] placeholder-gray-400 bg-white/80"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white font-bold px-8 py-3.5 rounded-2xl transition-all whitespace-nowrap hover:shadow-lg active:scale-95"
                  style={{ background: '#E91E8C' }}
                >
                  Daftar
                </button>
              </form>
              <p className="text-xs text-[#6B7280] mt-3 text-center md:text-left">Kami menjaga privasi Anda. Bebas spam.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
