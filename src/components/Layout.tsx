import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";
import { Menu, X, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "Cari Tukang", "Kategori", "Cara Kerja", "Testimoni", "Blog"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 border-b border-gray-100 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className={`text-sm font-semibold transition-colors ${
                  i === 0 ? "text-[#FF7315] border-b-2 border-[#FF7315] pb-1" : "text-gray-700 hover:text-[#FF7315]"
                }`}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-5 py-2 text-sm font-semibold text-[#0B1B3D] border border-gray-300 rounded-lg hover:border-[#0B1B3D] transition-colors bg-white">
              Masuk
            </button>
            <button className="px-5 py-2 text-sm font-semibold text-white bg-[#FF7315] rounded-lg hover:bg-[#E66510] shadow-sm hover:shadow-md transition-all">
              Download App
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#FF7315] focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[#FF7315] hover:bg-orange-50"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              ))}
              <div className="mt-4 flex flex-col space-y-3 px-3">
                <button className="w-full px-5 py-3 text-sm font-semibold text-[#0B1B3D] border border-gray-300 rounded-lg">
                  Masuk
                </button>
                <button className="w-full px-5 py-3 text-sm font-semibold text-white bg-[#FF7315] rounded-lg shadow-sm">
                  Download App
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0B1B3D] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <Logo textVisible={false} />
              <span className="font-extrabold text-3xl tracking-tight text-white">
                2<span className="text-[#FF7315]">kang</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              Cari Tukang, Kerja Jadi Tenang. #1 Marketplace Tukang dan Tenaga Ahli di Indonesia.
            </p>
            <div className="flex space-x-4 pt-2">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#FF7315] hover:text-white hover:border-[#FF7315] transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-3 flex flex-col text-sm text-gray-400">
              {["Cari Tukang", "Cara Kerja", "Kategori", "Download App"].map((l) => (
                <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 flex flex-col text-sm text-gray-400">
              {["Tentang Kami", "Karir", "Blog", "Kontak"].map((l) => (
                <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3 flex flex-col text-sm text-gray-400">
              {["FAQ", "Pusat Bantuan", "Syarat & Ketentuan", "Kebijakan Privasi"].map((l) => (
                <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400">Dapatkan tips dan info terbaru lainnya.</p>
            <div className="flex mt-4 gap-2">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="w-full bg-[#162A55] border border-gray-700 text-sm text-white rounded-lg px-4 py-2 outline-none focus:border-[#FF7315] transition-colors"
              />
              <button className="bg-[#FF7315] hover:bg-[#E66510] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                Kirim
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© 2024 2kang. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
