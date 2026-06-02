import { motion } from "motion/react";
import { Search, UserPlus, Calendar, CheckCircle, Star } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF7315] text-sm font-bold tracking-wide">
              #1 Marketplace Tukang Indonesia
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1B3D] leading-[1.15] tracking-tight">
              Cari Tukang <br className="hidden md:block"/> Profesional Dalam <br className="hidden md:block"/> Hitungan Menit
            </h1>
            
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
              Temukan tukang bangunan, listrik, cat, keramik, dan mandor terpercaya untuk proyek rumah maupun bisnis Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FF7315] text-white font-bold rounded-xl hover:bg-[#E66510] shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                <Search size={20} />
                Cari Tukang
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#0B1B3D] font-bold rounded-xl border-2 border-gray-200 hover:border-[#0B1B3D] transition-all whitespace-nowrap">
                <UserPlus size={20} />
                Daftar Jadi Tukang
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-100 pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#FF7315]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#0B1B3D] text-lg leading-none">5000+</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">Tukang Aktif</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#FF7315]">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#0B1B3D] text-lg leading-none">10000+</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">Proyek Selesai</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#FF7315]">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-[#0B1B3D] text-lg leading-none">95%</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">Kepuasan Pelanggan</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Mockup */}
          <div className="relative w-full max-w-[440px] mx-auto lg:ml-auto lg:mr-0 aspect-[1/2.1] lg:mt-0 mt-8">
            {/* Background Blob Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-[#FF7315]/10 rounded-full blur-[80px] z-0 pointer-events-none"></div>
            
            {/* Floating Elements (Animated) */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 -left-8 md:-left-16 bg-white p-4 rounded-2xl shadow-xl z-30 w-64 border border-gray-100"
            >
              <p className="font-bold text-gray-800 text-sm">Halo, Budi 👋</p>
              <p className="text-xs text-gray-500 mt-0.5">Mau cari tukang apa hari ini?</p>
              <div className="mt-3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <div className="w-full bg-gray-50 text-xs text-gray-400 rounded-full py-2 pl-9 pr-4 border border-gray-100">
                  Cari tukang, pekerjaan...
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-24 -right-6 md:-right-12 bg-white p-3 rounded-2xl shadow-xl z-30 flex items-center gap-3 border border-gray-100"
            >
               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
               </div>
               <div>
                  <div className="flex items-center gap-1 font-bold text-[#0B1B3D]">
                    4.9 
                  </div>
                  <div className="flex items-center gap-0.5 text-[#FF7315]">
                    <Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">(120+ ulasan)</p>
               </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-32 -right-8 md:-right-16 bg-white py-3 px-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-30 flex items-center gap-3 border border-gray-100 border-l-4 border-l-green-500"
            >
               <div className="w-8 h-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0">
                 <CheckCircle size={18} />
               </div>
               <div>
                 <p className="font-bold text-[#0B1B3D] text-sm">Booking Berhasil!</p>
                 <p className="text-[10px] text-gray-500 mt-0.5 leading-tight max-w-[120px]">Tukang akan datang sesuai jadwal yang ditentukan.</p>
               </div>
            </motion.div>

            {/* Main Phone Device */}
            <div className="relative z-10 w-full h-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border-[6px] border-gray-900 overflow-hidden flex flex-col">
              {/* Fake UI Inside Phone */}
              <div className="w-full h-full pt-12 pb-6 px-5 bg-gray-50 relative">
                {/* Dynamic Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-6 bg-gray-900 rounded-b-2xl z-40"></div>
                
                {/* Fake Category grid */}
                <div className="grid grid-cols-4 gap-3 mt-24">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex flex-col items-center gap-2">
                       <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200"></div>
                       <div className="w-10 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 font-bold text-sm text-gray-800">Tukang Terdekat</div>
                
                <div className="mt-4 bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex gap-3">
                   <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&h=100&fit=crop" className="w-full h-full opacity-60" />
                   </div>
                   <div className="space-y-2 flex-1 pt-1">
                     <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
                     <div className="w-16 h-2 bg-orange-200 rounded-full"></div>
                     <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
                   </div>
                </div>
                
                <div className="mt-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex gap-3 opacity-50">
                   <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                   <div className="space-y-2 flex-1 pt-1">
                     <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
                     <div className="w-16 h-2 bg-orange-200 rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
