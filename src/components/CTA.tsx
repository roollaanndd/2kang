import { motion } from "motion/react";
import { Play } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-[#FF7315] to-[#FFA045] relative overflow-hidden py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-white space-y-6 md:pr-10"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              Semua Dalam <br/> Genggaman Anda
            </h2>
            <p className="text-white/90 text-lg max-w-md">
              Unduh aplikasi 2kang sekarang dan temukan tukang terbaik dengan mudah, cepat, dan aman.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition-colors w-fit">
                 <Play size={24} fill="currentColor" />
                 <div className="text-left">
                   <div className="text-[10px] uppercase font-semibold text-gray-300">GET IT ON</div>
                   <div className="text-base font-bold leading-none">Google Play</div>
                 </div>
               </button>
               
               <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl w-fit border border-white/20 shadow-inner">
                  <div className="w-12 h-12 bg-white rounded p-1">
                     {/* Fake QR pattern */}
                     <div className="w-full h-full bg-[#0B1B3D] opacity-80 rounded-sm" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, #fff 2px, #fff 4px)"}}></div>
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight">Scan untuk<br/>Download App</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <div className="relative h-[300px] md:h-[450px] hidden md:block">
             <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-32 top-10 w-48 h-96 bg-white rounded-[2rem] border-[4px] border-gray-900 shadow-2xl rotate-[-10deg] overflow-hidden opacity-90"
             >
                <div className="w-full flex justify-between px-4 pt-2">
                   <div className="w-20 h-4 bg-gray-200 rounded-full"></div>
                </div>
                <div className="mt-8 px-4 space-y-3">
                   <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
                   <div className="w-full h-24 bg-orange-50 rounded-lg border border-orange-100"></div>
                   <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
                   <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
                   <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
                </div>
             </motion.div>
             
             <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-20 w-56 h-[420px] bg-white rounded-[2rem] border-[6px] border-gray-900 shadow-2xl rotate-[5deg] overflow-hidden z-10"
             >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-gray-900 rounded-b-xl z-20"></div>
                <div className="w-full h-48 bg-gray-100 mt-0">
                  <img src="https://images.unsplash.com/photo-1508214751196-bfdcf20eb432?w=300&h=300&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
                </div>
                <div className="px-4 py-4 space-y-3">
                   <div className="w-32 h-4 bg-gray-800 rounded"></div>
                   <div className="w-20 h-3 bg-orange-500 rounded"></div>
                   <div className="w-full h-2 bg-gray-200 rounded mt-4"></div>
                   <div className="w-full h-2 bg-gray-200 rounded"></div>
                   <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                   <div className="w-full py-2.5 mt-6 bg-[#FF7315] rounded-lg border-2 border-[#FF7315]"></div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>
      
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-5 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 10px 10px" }}></div>
    </section>
  );
}
