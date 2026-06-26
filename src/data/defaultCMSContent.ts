/* eslint-disable */
import type { ClinicBranch } from '../types';

export const CMS_SCHEMA_VERSION = 5;

export interface CMSStat { value: string; label: string; }
export interface CMSService { id: string; name: string; description: string; emoji: string; price: string; isVisible: boolean; }
export interface CMSDoctor { id: string; name: string; specialty: string; experience: string; photo: string | null; rating: number; patients: number; isVisible: boolean; }
export interface CMSPromo { id: string; title: string; subtitle: string; discount: string; image: string | null; validUntil: string; badge: string; color: string; isVisible: boolean; }
export interface CMSArticle { id: string; title: string; excerpt: string; thumbnail: string | null; category: string; publishedAt: string; isVisible: boolean; }
export interface CMSTestimonial { id: string; name: string; treatment: string; rating: number; text: string; avatar: string | null; isVisible: boolean; }
export interface CMSFaq { id: string; question: string; answer: string; isVisible: boolean; }
export interface CMSBeforeAfter { id: string; title: string; treatment: string; before: string | null; after: string | null; isVisible: boolean; }

export interface CMSContent {
  _schemaVersion?: number;
  hero: {
    headline: string;
    headlineAccent: string;
    subheadline: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    heroImage: string | null;
    heroImages: string[];
    badgeText: string;
    badgeSubtext: string;
    stats: CMSStat[];
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: CMSService[];
  };
  doctors: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: CMSDoctor[];
  };
  clinic: {
    sectionTitle: string;
    description: string;
    photo: string | null;
    stats: CMSStat[];
    address: string;
  };
  promotions: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: CMSPromo[];
  };
  articles: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: CMSArticle[];
  };
  about: {
    sectionTitle: string;
    description: string;
    mission: string;
    vision: string;
    stats: CMSStat[];
    logo: string | null;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    mapEmbed: string;
  };
  appearance: {
    primaryColor: string;
    accentColor: string;
    clinicName: string;
    tagline: string;
  };
  trust: {
    sectionTitle: string;
    logos: Array<{ name: string; logo: string }>;
  };
  testimonials: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: CMSTestimonial[];
  };
  faq: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: CMSFaq[];
  };
  gallery: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: CMSBeforeAfter[];
  };
  kioskSettings: {
    idleTimeoutSeconds: number;
    /** Prefix for kiosk queue numbers, e.g. "A" → A018. */
    queuePrefix: string;
    /** Allow patients to check in at the kiosk with their booking code / barcode. */
    bookingCodeCheckin: boolean;
    /** Allow settling payment at the kiosk. */
    kioskPayment: boolean;
  };
  /** Custom company logo — base64 data URL. When set, replaces the default tooth SVG everywhere. */
  logoUrl: string | null;
  /** Clinic branches / locations shown in the mobile booking flow and admin panel. */
  branches: {
    items: ClinicBranch[];
  };
}

export const DEFAULT_CMS_CONTENT: CMSContent = {
  _schemaVersion: CMS_SCHEMA_VERSION,
  logoUrl: null,
  hero: {
    headline: 'Senyum Sehat,',
    headlineAccent: 'Percaya Diri Penuh',
    subheadline: 'Perawatan gigi modern untuk Anda dan keluarga dalam genggaman. Teknologi terkini, dokter berpengalaman, nyaman & terpercaya.',
    ctaPrimaryText: 'Booking Sekarang',
    ctaSecondaryText: 'Lihat Layanan',
    heroImage: 'https://images.pexels.com/photos/4545205/pexels-photo-4545205.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
    heroImages: [
      'https://images.pexels.com/photos/4545205/pexels-photo-4545205.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
      'https://images.pexels.com/photos/6627574/pexels-photo-6627574.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
      'https://images.pexels.com/photos/35438269/pexels-photo-35438269.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
    ],
    badgeText: 'Healthy Smile',
    badgeSubtext: 'for Better Life',
    stats: [
      { value: '15+', label: 'Tahun Pengalaman' },
      { value: '20.000+', label: 'Pasien Puas' },
      { value: '10+', label: 'Dokter Spesialis' },
      { value: '4.9/5', label: 'Rating Pasien' },
    ],
  },
  services: {
    sectionTitle: 'Layanan Kami',
    sectionSubtitle: 'Perawatan gigi lengkap dengan teknologi modern dan tenaga ahli berpengalaman untuk senyum sempurna Anda',
    items: [
      { id: '1', name: 'Pemeriksaan Gigi', description: 'Pemeriksaan rutin menyeluruh', emoji: '🔍', price: 'Rp 100.000', isVisible: true },
      { id: '2', name: 'Scaling & Polishing', description: 'Bersihkan karang gigi', emoji: '✨', price: 'Rp 350.000', isVisible: true },
      { id: '3', name: 'Tambal Gigi', description: 'Tambalan estetik & kuat', emoji: '🦷', price: 'Rp 200.000+', isVisible: true },
      { id: '4', name: 'Cabut Gigi', description: 'Pencabutan aman & minim nyeri', emoji: '🪥', price: 'Rp 150.000+', isVisible: true },
      { id: '5', name: 'Kawat Gigi', description: 'Ortodonti metal & ceramic', emoji: '📐', price: 'Rp 5.000.000+', isVisible: true },
      { id: '6', name: 'Implan Gigi', description: 'Penggantian akar titanium', emoji: '🦾', price: 'Rp 8.000.000+', isVisible: true },
      { id: '7', name: 'Veneer Gigi', description: 'Porselen tipis estetik', emoji: '💎', price: 'Rp 2.500.000+', isVisible: true },
      { id: '8', name: 'Bleaching', description: 'Pemutihan gigi laser', emoji: '⚡', price: 'Rp 800.000+', isVisible: true },
    ],
  },
  doctors: {
    sectionTitle: 'Dokter Spesialis Berpengalaman',
    sectionSubtitle: 'Tim dokter gigi kami yang terlatih dan berpengalaman siap memberikan perawatan terbaik untuk Anda',
    items: [
      { id: '1', name: 'drg. Sarah Sella, Sp.Ort', specialty: 'Spesialis Ortodonti', experience: '8 Tahun', photo: 'https://images.pexels.com/photos/19963182/pexels-photo-19963182.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop&q=80', rating: 4.9, patients: 342, isVisible: true },
      { id: '2', name: 'drg. Ivan Kontralizan, Sp.KG', specialty: 'Spesialis Konservasi', experience: '6 Tahun', photo: 'https://images.pexels.com/photos/5214964/pexels-photo-5214964.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop&q=80', rating: 4.8, patients: 218, isVisible: true },
      { id: '3', name: 'drg. Andika Andilisa, Sp.Pros', specialty: 'Spesialis Prostodonsi', experience: '7 Tahun', photo: 'https://images.pexels.com/photos/19218034/pexels-photo-19218034.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop&q=80', rating: 4.7, patients: 165, isVisible: true },
      { id: '4', name: 'drg. Reza Rizki, Sp.BM', specialty: 'Bedah Mulut & Maksilofasial', experience: '10 Tahun', photo: 'https://images.pexels.com/photos/7108250/pexels-photo-7108250.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop&q=80', rating: 4.9, patients: 289, isVisible: true },
    ],
  },
  clinic: {
    sectionTitle: 'Klinik Kami',
    description: 'Fasilitas modern berstandar internasional dengan suasana nyaman untuk pengalaman perawatan gigi yang menyenangkan.',
    photo: 'https://images.pexels.com/photos/30902075/pexels-photo-30902075.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    stats: [
      { value: '15+', label: 'Tahun Berdiri' },
      { value: '4', label: 'Ruang Perawatan' },
      { value: '1.000+', label: 'Pasien/Bulan' },
      { value: 'ISO', label: 'Bersertifikat' },
    ],
    address: 'Jl. Sudirman No. 123, Jakarta Pusat 10220',
  },
  promotions: {
    sectionTitle: 'Promo & Penawaran',
    sectionSubtitle: 'Dapatkan penawaran spesial untuk perawatan gigi terbaik Anda',
    items: [
      { id: '1', title: 'Healthy Smile Special Offer!', subtitle: 'Scaling + Pemeriksaan paket hemat', discount: '30%', image: null, validUntil: '2026-07-31', badge: 'TERPOPULER', color: '#E91E8C', isVisible: true },
      { id: '2', title: 'Free Konsultasi Pertama', subtitle: 'Gratis konsultasi untuk kunjungan pertama', discount: 'GRATIS', image: null, validUntil: '2026-12-31', badge: 'BARU', color: '#4FC3F7', isVisible: true },
      { id: '3', title: 'Promo Weekend Bleaching', subtitle: 'Pemutihan gigi spesial akhir pekan', discount: '25%', image: null, validUntil: '2026-08-31', badge: '', color: '#F59E0B', isVisible: true },
    ],
  },
  articles: {
    sectionTitle: 'Artikel & Edukasi',
    sectionSubtitle: 'Tips dan informasi seputar kesehatan gigi untuk Anda dan keluarga',
    items: [
      { id: '1', title: '5 Tips Menjaga Kesehatan Gigi Sehari-hari', excerpt: 'Pelajari kebiasaan sederhana yang bisa membuat gigi Anda tetap sehat dan bersih sepanjang hari...', thumbnail: 'https://images.pexels.com/photos/6627574/pexels-photo-6627574.jpeg?auto=compress&cs=tinysrgb&w=600&h=360&fit=crop&q=80', category: 'Tips Kesehatan', publishedAt: '2026-06-15', isVisible: true },
      { id: '2', title: 'Kapan Harus Pasang Kawat Gigi? Ini Tanda-tandanya', excerpt: 'Gigi berantakan atau rahang tidak sejajar? Kenali tanda-tanda Anda membutuhkan ortodonti...', thumbnail: 'https://images.pexels.com/photos/4545205/pexels-photo-4545205.jpeg?auto=compress&cs=tinysrgb&w=600&h=360&fit=crop&q=80', category: 'Ortodonti', publishedAt: '2026-06-10', isVisible: true },
      { id: '3', title: 'Perbedaan Veneer dan Mahkota Gigi yang Perlu Anda Tahu', excerpt: 'Sebelum memutuskan perawatan kosmetik gigi, ketahui perbedaan veneer dan mahkota secara lengkap...', thumbnail: 'https://images.pexels.com/photos/6812453/pexels-photo-6812453.jpeg?auto=compress&cs=tinysrgb&w=600&h=360&fit=crop&q=80', category: 'Perawatan Kosmetik', publishedAt: '2026-06-05', isVisible: true },
    ],
  },
  about: {
    sectionTitle: 'Tentang OMDC Dental',
    description: 'OMDC Dental hadir sejak 2009 dengan misi memberikan perawatan gigi terbaik yang terjangkau untuk seluruh keluarga Indonesia. Dengan teknologi modern dan tim dokter spesialis berpengalaman, kami berkomitmen untuk memberikan senyum sehat kepada setiap pasien.',
    mission: 'Memberikan perawatan gigi berkualitas tinggi yang terjangkau dan mudah diakses oleh seluruh masyarakat Indonesia.',
    vision: 'Menjadi klinik gigi digital terdepan di Indonesia yang menggabungkan teknologi modern dengan sentuhan manusiawi.',
    stats: [
      { value: '2009', label: 'Berdiri Sejak' },
      { value: '20.000+', label: 'Pasien Dilayani' },
      { value: '100%', label: 'Kepuasan Pasien' },
      { value: '15+', label: 'Penghargaan' },
    ],
    logo: null,
  },
  contact: {
    phone: '(021) 2345-6789',
    whatsapp: '+62 812-3456-7890',
    email: 'info@omdc.id',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat 10220',
    mapEmbed: '',
  },
  appearance: {
    primaryColor: '#E91E8C',
    accentColor: '#4FC3F7',
    clinicName: 'OMDC Dental',
    tagline: 'Senyum Sehat, Percaya Diri Penuh',
  },
  trust: {
    sectionTitle: 'Kepercayaan Anda Prioritas Kami',
    logos: [
      { name: 'BCA', logo: 'BCA' },
      { name: 'VISA', logo: 'VISA' },
      { name: 'BNI', logo: 'BNI' },
      { name: 'OVO', logo: 'OVO' },
      { name: 'GoPay', logo: 'GOPAY' },
      { name: 'QRIS', logo: 'QRIS' },
    ],
  },
  testimonials: {
    sectionTitle: 'Apa Kata Pasien Kami',
    sectionSubtitle: 'Ribuan pasien telah mempercayakan kesehatan gigi mereka kepada kami',
    items: [
      { id: '1', name: 'Rina Kusuma', treatment: 'Kawat Gigi', rating: 5, text: 'Pelayanan sangat ramah dan profesional! Dokternya sabar menjelaskan setiap prosedur. Hasil kawat gigi saya luar biasa dalam 18 bulan!', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80', isVisible: true },
      { id: '2', name: 'Budi Santoso', treatment: 'Bleaching', rating: 5, text: 'Setelah bleaching, gigi saya putih bersih dan hasilnya natural. Prosesnya nyaman, tidak sakit sama sekali. Sangat puas!', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80', isVisible: true },
      { id: '3', name: 'Dewi Maharani', treatment: 'Veneer Gigi', rating: 5, text: 'Veneer gigi saya terlihat sangat natural dan cantik. Dokternya sangat teliti dan memastikan saya nyaman selama prosedur.', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80', isVisible: true },
      { id: '4', name: 'Ahmad Fauzi', treatment: 'Implan Gigi', rating: 5, text: 'Implan gigi berhasil dengan sempurna. Terasa seperti gigi asli! Sudah 2 tahun berjalan sangat baik. Terima kasih OMDC!', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80', isVisible: true },
      { id: '5', name: 'Sari Indah', treatment: 'Scaling & Polishing', rating: 4, text: 'Gigi bersih dan segar setelah scaling. Dokternya gentle dan penuh perhatian. Kliniknya juga bersih dan modern.', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80', isVisible: true },
      { id: '6', name: 'Rizky Pratama', treatment: 'Tambal Gigi', rating: 5, text: 'Tambal gigi dengan bahan estetik hasilnya sangat natural, tidak terlihat tambalannya. Harga juga sangat terjangkau.', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&q=80', isVisible: true },
    ],
  },
  faq: {
    sectionTitle: 'Pertanyaan Umum',
    sectionSubtitle: 'Temukan jawaban atas pertanyaan yang sering ditanyakan seputar perawatan gigi kami',
    items: [
      { id: '1', question: 'Berapa biaya pemeriksaan gigi pertama kali?', answer: 'Pemeriksaan awal dimulai dari Rp 100.000. Konsultasi pertama untuk pasien baru gratis. Biaya perawatan lanjutan tergantung jenis tindakan yang diperlukan.', isVisible: true },
      { id: '2', question: 'Apakah klinik menerima BPJS?', answer: 'Saat ini kami melayani pasien umum dan beberapa asuransi swasta. Untuk info terbaru tentang BPJS, silakan hubungi kami langsung melalui WhatsApp atau telepon.', isVisible: true },
      { id: '3', question: 'Berapa lama proses pemasangan kawat gigi?', answer: 'Durasi perawatan kawat gigi bervariasi, umumnya 12–24 bulan tergantung kondisi gigi. Dokter kami akan memberikan estimasi yang lebih akurat setelah pemeriksaan awal.', isVisible: true },
      { id: '4', question: 'Apakah bleaching gigi aman dan menyakitkan?', answer: 'Bleaching modern yang kami gunakan aman dan nyaman. Sebagian kecil pasien merasakan sedikit sensitivitas yang bersifat sementara. Prosedur dilakukan oleh dokter berpengalaman dengan teknologi terkini.', isVisible: true },
      { id: '5', question: 'Bagaimana cara booking janji temu?', answer: 'Anda bisa booking melalui tombol "Booking Sekarang" di website, WhatsApp, atau langsung menelepon klinik kami. Konfirmasi jadwal akan dikirim melalui WhatsApp dalam 1×24 jam.', isVisible: true },
      { id: '6', question: 'Apakah ada parkir di klinik?', answer: 'Ya, klinik kami menyediakan tempat parkir yang cukup untuk kendaraan roda 2 maupun roda 4. Area parkir dijaga dan tersedia 24 jam selama jam operasional klinik.', isVisible: true },
    ],
  },
  gallery: {
    sectionTitle: 'Transformasi Senyum',
    sectionSubtitle: 'Lihat perubahan nyata pasien kami sebelum dan sesudah perawatan gigi',
    items: [
      { id: '1', title: 'Kawat Gigi 18 Bulan', treatment: 'Ortodonti', before: 'https://images.pexels.com/photos/6627574/pexels-photo-6627574.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop&q=80', after: 'https://images.pexels.com/photos/4545205/pexels-photo-4545205.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop&q=80', isVisible: true },
      { id: '2', title: 'Veneer Gigi Porselen', treatment: 'Veneer', before: 'https://images.pexels.com/photos/30902075/pexels-photo-30902075.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop&q=80', after: 'https://images.pexels.com/photos/35438269/pexels-photo-35438269.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop&q=80', isVisible: true },
      { id: '3', title: 'Bleaching Laser', treatment: 'Pemutihan', before: 'https://images.pexels.com/photos/6812453/pexels-photo-6812453.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop&q=80', after: 'https://images.pexels.com/photos/925288/pexels-photo-925288.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop&q=80', isVisible: true },
    ],
  },
  kioskSettings: {
    idleTimeoutSeconds: 30,
    queuePrefix: 'A',
    bookingCodeCheckin: true,
    kioskPayment: true,
  },
  branches: {
    items: [
      {
        id: 'b1',
        name: 'OMDC Dental Jakarta Selatan',
        city: 'Jakarta Selatan',
        address: 'Jl. Fatmawati No. 28, Cilandak, Jakarta Selatan 12430',
        phone: '(021) 7654-3210',
        whatsapp: '+62 812-0001-0001',
        hours: 'Sen–Sab: 08:00–20:00',
        image: null,
        isActive: true,
      },
      {
        id: 'b2',
        name: 'OMDC Dental Jakarta Pusat',
        city: 'Jakarta Pusat',
        address: 'Jl. Sudirman No. 123, Tanah Abang, Jakarta Pusat 10220',
        phone: '(021) 2345-6789',
        whatsapp: '+62 812-0002-0002',
        hours: 'Sen–Sab: 08:00–20:00',
        image: null,
        isActive: true,
      },
      {
        id: 'b3',
        name: 'OMDC Dental Tangerang',
        city: 'Tangerang',
        address: 'Jl. MH Thamrin No. 55, Karawaci, Tangerang 15117',
        phone: '(021) 5566-7788',
        whatsapp: '+62 812-0003-0003',
        hours: 'Sen–Sab: 09:00–19:00',
        image: null,
        isActive: true,
      },
      {
        id: 'b4',
        name: 'OMDC Dental Bekasi',
        city: 'Bekasi',
        address: 'Jl. Ahmad Yani No. 88, Bekasi Timur, Bekasi 17111',
        phone: '(021) 8833-4455',
        whatsapp: '+62 812-0004-0004',
        hours: 'Sen–Sab: 08:00–18:00',
        image: null,
        isActive: true,
      },
    ],
  },
};

export function mergeCMSWithDefaults(remote: Partial<CMSContent>): CMSContent {
  return {
    ...DEFAULT_CMS_CONTENT,
    ...remote,
    _schemaVersion: CMS_SCHEMA_VERSION,
    hero: { ...DEFAULT_CMS_CONTENT.hero, ...(remote.hero ?? {}) },
    services: { ...DEFAULT_CMS_CONTENT.services, ...(remote.services ?? {}) },
    doctors: { ...DEFAULT_CMS_CONTENT.doctors, ...(remote.doctors ?? {}) },
    clinic: { ...DEFAULT_CMS_CONTENT.clinic, ...(remote.clinic ?? {}) },
    promotions: { ...DEFAULT_CMS_CONTENT.promotions, ...(remote.promotions ?? {}) },
    articles: { ...DEFAULT_CMS_CONTENT.articles, ...(remote.articles ?? {}) },
    about: { ...DEFAULT_CMS_CONTENT.about, ...(remote.about ?? {}) },
    contact: { ...DEFAULT_CMS_CONTENT.contact, ...(remote.contact ?? {}) },
    appearance: { ...DEFAULT_CMS_CONTENT.appearance, ...(remote.appearance ?? {}) },
    trust: { ...DEFAULT_CMS_CONTENT.trust, ...(remote.trust ?? {}) },
    testimonials: { ...DEFAULT_CMS_CONTENT.testimonials, ...(remote.testimonials ?? {}) },
    faq: { ...DEFAULT_CMS_CONTENT.faq, ...(remote.faq ?? {}) },
    gallery: { ...DEFAULT_CMS_CONTENT.gallery, ...(remote.gallery ?? {}) },
    kioskSettings: { ...DEFAULT_CMS_CONTENT.kioskSettings, ...(remote.kioskSettings ?? {}) },
    branches: { ...DEFAULT_CMS_CONTENT.branches, ...(remote.branches ?? {}) },
  };
}

export function loadCMSContent(): CMSContent {
  try {
    const stored = localStorage.getItem('omdc_cms_content');
    if (stored) {
      const parsed = JSON.parse(stored);
      // If schema version is outdated, wipe local cache and use defaults
      if ((parsed._schemaVersion ?? 0) < CMS_SCHEMA_VERSION) {
        localStorage.removeItem('omdc_cms_content');
        return DEFAULT_CMS_CONTENT;
      }
      return mergeCMSWithDefaults(parsed);
    }
  } catch {}
  return DEFAULT_CMS_CONTENT;
}

export function saveCMSContent(content: CMSContent): void {
  localStorage.setItem('omdc_cms_content', JSON.stringify(content));
}
