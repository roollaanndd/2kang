import { motion } from "motion/react";

export function Logo({ className = "", textVisible = true }: { className?: string; textVisible?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-10 h-10 bg-[#0B1B3D] rounded-xl overflow-hidden shadow-md shrink-0"
      >
        {/* Stylized House Roof */}
        <div className="absolute top-[6px] w-[22px] h-[10px] bg-white rounded-t-[8px] z-10 opacity-90"></div>
        <div className="absolute top-[14px] w-[30px] h-[3px] bg-white rounded-full z-10 opacity-90"></div>
        {/* The '2' */}
        <span className="text-[#FF7315] z-20 text-[28px] font-black tracking-tighter leading-none mt-1.5 drop-shadow-sm">
          2
        </span>
        {/* Windows */}
        <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 grid grid-cols-2 gap-[2px] z-20">
          <div className="bg-white rounded-[1px] opacity-90"></div>
          <div className="bg-white rounded-[1px] opacity-90"></div>
          <div className="bg-white rounded-[1px] opacity-90"></div>
          <div className="bg-white rounded-[1px] opacity-90"></div>
        </div>
      </motion.div>
      {textVisible && (
        <span className="font-extrabold text-2xl tracking-tight text-[#0B1B3D]">
          2<span className="text-[#FF7315]">kang</span>
        </span>
      )}
    </div>
  );
}
