import { motion } from "motion/react";
import { Hammer, PaintRoller, Zap, Grid2X2, Droplets, HardHat, FileText, CheckCircle2, Search, CalendarDays, Wallet, ArrowRight, ShieldCheck, Tag, Lock, Star } from "lucide-react";

export function Categories() {
  const categories = [
    { title: "Tukang Bangunan", icon: Hammer, color: "text-amber-700" },
    { title: "Tukang Cat", icon: PaintRoller, color: "text-orange-500" },
    { title: "Tukang Listrik", icon: Zap, color: "text-yellow-500" },
    { title: "Tukang Keramik", icon: Grid2X2, color: "text-gray-500" },
    { title: "Tukang Ledeng", icon: Droplets, color: "text-blue-500" },
    { title: "Mandor", icon: HardHat, color: "text-amber-800" },
  ];

  return (
    <section id="kategori" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#0B1B3D]">Pilih Kebutuhan Anda</h2>
          <p className="text-gray-500 mt-3 text-lg">Temukan tenaga profesional untuk setiap pekerjaan.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer shadow-sm transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center ${cat.color} group-hover:bg-[#FF7315] group-hover:text-white transition-colors duration-300`}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1B3D] text-[15px]">{cat.title}</h3>
                </div>
                <div className="flex items-center text-[#FF7315] text-xs font-semibold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity mt-auto pt-2">
                  Lihat Tukang <ArrowRight size={14} className="ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { num: "01", title: "Cari Tukang", desc: "Cari tukang sesuai kebutuhan Anda.", icon: Search },
    { num: "02", title: "Pilih Jadwal", desc: "Pilih tanggal dan waktu pekerjaan.", icon: CalendarDays },
    { num: "03", title: "Booking", desc: "Konfirmasi pemesanan dengan mudah.", icon: FileText },
    { num: "04", title: "Pekerjaan Selesai", desc: "Tukang menyelesaikan pekerjaan dengan baik.", icon: CheckCircle2 },
    { num: "05", title: "Bayar Aman", desc: "Lakukan pembayaran dengan aman dan nyaman.", icon: Wallet },
  ];

  return (
    <section id="cara-kerja" className="py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-[#0B1B3D]">Cara Kerja 2kang</h2>
          <p className="text-gray-500 mt-3 text-lg">Hanya perlu beberapa langkah mudah.</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gray-200 border-t-2 border-dashed border-gray-300 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-md border-[6px] border-gray-50 z-10 transition-transform duration-300 group-hover:scale-110 ${idx === 3 || idx === 1 ? 'text-[#FF7315]' : idx === 4 ? 'text-amber-600' : 'text-[#FF7315]'}`}>
                     <Icon size={36} strokeWidth={1.5} />
                  </div>
                  <div className="mt-6">
                    <span className="font-extrabold text-[#0B1B3D] text-lg block">{step.num}</span>
                    <h3 className="font-bold text-gray-900 mt-1 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed mx-auto">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const features = [
    { title: "Verified Workers", text: "Semua tukang melalui proses verifikasi identitas dan keahlian.", icon: ShieldCheck },
    { title: "Transparent Pricing", text: "Harga jelas dan transparan sebelum pekerjaan dimulai.", icon: Tag },
    { title: "Secure Payment", text: "Pembayaran aman dengan sistem terpercaya dan tercatat.", icon: Lock },
    { title: "Ratings & Reviews", text: "Lihat ulasan dan rating asli dari pelanggan sebelumnya.", icon: Star },
  ];

  return (
    <section className="py-20 bg-[#0B1B3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:hidden">
           <h2 className="text-3xl font-black text-white">Kenapa Memilih 2kang?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-4 mb-4">
             <h2 className="text-3xl font-black text-white">Kenapa Memilih 2kang?</h2>
          </div>
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#FF7315] to-[#E66510] rounded-[18px] flex items-center justify-center text-white shadow-lg shadow-orange-500/20 transform rotate-3">
                  <div className="-rotate-3">
                    <Icon size={28} />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{feat.title}</h4>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{feat.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
