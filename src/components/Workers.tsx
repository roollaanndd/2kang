import { motion } from "motion/react";
import { Star, MapPin, ChevronRight, ShieldCheck } from "lucide-react";

export function TopWorkers() {
  const workers = [
    {
      id: 1,
      name: "Budi Santoso",
      job: "Tukang Bangunan",
      rating: 4.9,
      reviews: 130,
      price: "Rp150.000",
      location: "Jakarta Timur",
      img: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 2,
      name: "Agus Riyanto",
      job: "Tukang Cat",
      rating: 4.9,
      reviews: 88,
      price: "Rp120.000",
      location: "Jakarta Selatan",
      img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 3,
      name: "Hendra Wijaya",
      job: "Tukang Listrik",
      rating: 4.9,
      reviews: 110,
      price: "Rp150.000",
      location: "Depok",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 4,
      name: "Supriyadi",
      job: "Tukang Keramik",
      rating: 4.7,
      reviews: 75,
      price: "Rp130.000",
      location: "Bekasi",
      img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 5,
      name: "Ade Irawan",
      job: "Tukang Ledeng",
      rating: 4.9,
      reviews: 50,
      price: "Rp130.000",
      location: "Tangerang",
      img: "https://images.unsplash.com/photo-1508214751196-bfdcf20eb432?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <section id="testimoni" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-[#0B1B3D]">Tukang Pilihan Pelanggan</h2>
            <p className="text-gray-500 mt-2 text-lg">Tukang berpengalaman dengan rating terbaik.</p>
          </div>
          <a href="#" className="flex items-center text-[#FF7315] font-semibold hover:text-[#E66510] transition-colors whitespace-nowrap">
            Lihat Semua <ChevronRight size={20} className="ml-1" />
          </a>
        </div>

        {/* Horizontal scroll container with hidden scrollbar for smaller screens */}
        <div className="relative -mx-4 sm:mx-0">
          <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar px-4 sm:px-0 gap-6">
            {workers.map((worker, idx) => (
              <motion.div 
                key={worker.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-[280px] shrink-0 snap-center bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={worker.img} 
                    alt={worker.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                     <ShieldCheck size={14} className="text-green-500" />
                     <span className="text-[10px] font-bold text-[#0B1B3D]">Verified</span>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-[#0B1B3D] text-lg">{worker.job}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{worker.name}</p>
                  
                  <div className="flex items-center gap-1 mt-3 text-sm">
                    <Star fill="#FF7315" stroke="none" size={16} className="-mt-0.5" />
                    <span className="font-bold text-[#0B1B3D]">{worker.rating}</span>
                    <span className="text-gray-400 text-xs ml-1">({worker.reviews})</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex-1">
                    <p className="font-bold text-[#0B1B3D]">{worker.price} <span className="text-xs font-normal text-gray-500">/ hari</span></p>
                    <div className="flex items-center text-gray-500 mt-2 text-xs">
                      <MapPin size={14} className="mr-1 shrink-0" />
                      <span className="truncate">{worker.location}</span>
                    </div>
                  </div>

                  <button className="w-full mt-5 py-2.5 bg-white border border-gray-200 text-[#0B1B3D] text-sm font-semibold rounded-lg hover:border-[#FF7315] hover:text-[#FF7315] transition-colors">
                    Lihat Profil
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
