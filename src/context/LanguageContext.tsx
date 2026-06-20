import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Lang = 'id' | 'en';

const TRANSLATIONS = {
  id: {
    // Navbar
    nav_home: 'Beranda',
    nav_services: 'Layanan',
    nav_doctors: 'Dokter',
    nav_promotions: 'Promo',
    nav_about: 'Tentang',
    nav_contact: 'Kontak',
    nav_booking: 'Booking',
    // Hero
    hero_cta_primary: 'Booking Sekarang',
    hero_cta_secondary: 'Lihat Layanan',
    // Sections
    section_services: 'Layanan',
    section_doctors: 'Tim Dokter',
    section_testimonials: 'Testimoni',
    section_clinic: 'Fasilitas',
    section_promotions: 'Penawaran',
    section_articles: 'Edukasi',
    section_about: 'Tentang Kami',
    section_faq: 'FAQ',
    section_gallery: 'Galeri',
    // Common
    book_appointment: 'Buat Janji',
    view_all: 'Lihat Semua',
    read_more: 'Baca',
    claim_now: 'Klaim Sekarang',
    valid_until: 'Berlaku hingga',
    years_exp: 'Pengalaman',
    patients: 'pasien',
    // Footer / CTA
    cta_title: 'Mulai Perjalanan Senyum Sehat Anda',
    cta_sub: 'Booking sekarang dan dapatkan konsultasi gratis untuk kunjungan pertama Anda',
    chat_wa: 'Chat WhatsApp',
    // FAQ
    faq_q: 'Pertanyaan?',
    // Gallery
    before: 'Sebelum',
    after: 'Sesudah',
    drag_hint: 'Seret untuk membandingkan',
  },
  en: {
    // Navbar
    nav_home: 'Home',
    nav_services: 'Services',
    nav_doctors: 'Doctors',
    nav_promotions: 'Promos',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_booking: 'Book Now',
    // Hero
    hero_cta_primary: 'Book Now',
    hero_cta_secondary: 'Our Services',
    // Sections
    section_services: 'Services',
    section_doctors: 'Our Doctors',
    section_testimonials: 'Testimonials',
    section_clinic: 'Our Clinic',
    section_promotions: 'Offers',
    section_articles: 'Articles',
    section_about: 'About Us',
    section_faq: 'FAQ',
    section_gallery: 'Gallery',
    // Common
    book_appointment: 'Book Appointment',
    view_all: 'View All',
    read_more: 'Read',
    claim_now: 'Claim Now',
    valid_until: 'Valid until',
    years_exp: 'Experience',
    patients: 'patients',
    // Footer / CTA
    cta_title: 'Start Your Healthy Smile Journey',
    cta_sub: 'Book now and get a free consultation for your first visit',
    chat_wa: 'WhatsApp Chat',
    // FAQ
    faq_q: 'Questions?',
    // Gallery
    before: 'Before',
    after: 'After',
    drag_hint: 'Drag to compare',
  },
} as const;

type TranslationKey = keyof typeof TRANSLATIONS['id'];

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem('omdc_lang') as Lang) ?? 'id'; } catch { return 'id'; }
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('omdc_lang', l); } catch {}
  }, []);

  const t = useCallback((key: TranslationKey) => TRANSLATIONS[lang][key], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}
