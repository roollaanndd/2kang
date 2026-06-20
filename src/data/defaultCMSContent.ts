/* eslint-disable */

export interface CMSStat { value: string; label: string; }
export interface CMSService { id: string; name: string; description: string; emoji: string; price: string; isVisible: boolean; }
export interface CMSDoctor { id: string; name: string; specialty: string; experience: string; photo: string | null; rating: number; patients: number; isVisible: boolean; }
export interface CMSPromo { id: string; title: string; subtitle: string; discount: string; image: string | null; validUntil: string; badge: string; color: string; isVisible: boolean; }
export interface CMSArticle { id: string; title: string; excerpt: string; thumbnail: string | null; category: string; publishedAt: string; isVisible: boolean; }

export interface CMSContent {
  hero: {
    headline: string;
    headlineAccent: string;
    subheadline: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    heroImage: string | null;
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
}

export const DEFAULT_CMS_CONTENT: CMSContent = {
  hero: {
    headline: 'Senyum Sehat,',
    headlineAccent: 'Percaya Diri Penuh',
    subheadline: 'Perawatan gigi modern untuk Anda dan keluarga dalam genggaman. Teknologi terkini, dokter berpengalaman, nyaman & terpercaya.',
    ctaPrimaryText: 'Booking Sekarang',
    ctaSecondaryText: 'Lihat Layanan',
    heroImage: null,
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
      { id: '1', name: 'drg. Sarah Sella, Sp.Ort', specialty: 'Spesialis Ortodonti', experience: '8 Tahun', photo: null, rating: 4.9, patients: 342, isVisible: true },
      { id: '2', name: 'drg. Ivan Kontralizan, Sp.KG', specialty: 'Spesialis Konservasi', experience: '6 Tahun', photo: null, rating: 4.8, patients: 218, isVisible: true },
      { id: '3', name: 'drg. Andika Andilisa, Sp.Pros', specialty: 'Spesialis Prostodonsi', experience: '7 Tahun', photo: null, rating: 4.7, patients: 165, isVisible: true },
      { id: '4', name: 'drg. Reza Rizki, Sp.BM', specialty: 'Bedah Mulut & Maksilofasial', experience: '10 Tahun', photo: null, rating: 4.9, patients: 289, isVisible: true },
    ],
  },
  clinic: {
    sectionTitle: 'Klinik Kami',
    description: 'Fasilitas modern berstandar internasional dengan suasana nyaman untuk pengalaman perawatan gigi yang menyenangkan.',
    photo: null,
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
      { id: '1', title: '5 Tips Menjaga Kesehatan Gigi Sehari-hari', excerpt: 'Pelajari kebiasaan sederhana yang bisa membuat gigi Anda tetap sehat dan bersih sepanjang hari...', thumbnail: null, category: 'Tips Kesehatan', publishedAt: '2026-06-15', isVisible: true },
      { id: '2', title: 'Kapan Harus Pasang Kawat Gigi? Ini Tanda-tandanya', excerpt: 'Gigi berantakan atau rahang tidak sejajar? Kenali tanda-tanda Anda membutuhkan ortodonti...', thumbnail: null, category: 'Ortodonti', publishedAt: '2026-06-10', isVisible: true },
      { id: '3', title: 'Perbedaan Veneer dan Mahkota Gigi yang Perlu Anda Tahu', excerpt: 'Sebelum memutuskan perawatan kosmetik gigi, ketahui perbedaan veneer dan mahkota secara lengkap...', thumbnail: null, category: 'Perawatan Kosmetik', publishedAt: '2026-06-05', isVisible: true },
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
};

export function loadCMSContent(): CMSContent {
  try {
    const stored = localStorage.getItem('omdc_cms_content');
    if (stored) return { ...DEFAULT_CMS_CONTENT, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_CMS_CONTENT;
}

export function saveCMSContent(content: CMSContent): void {
  localStorage.setItem('omdc_cms_content', JSON.stringify(content));
}
