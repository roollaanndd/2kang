/* eslint-disable */
import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Clock, ChevronRight, BookOpen } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface Props {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const AQUA = '#06B6D4';
const INK = '#1A1A2E';

type Category = 'Semua' | 'Perawatan' | 'Pencegahan' | 'Tips & Trik' | 'FAQ';
const CATEGORIES: Category[] = ['Semua', 'Perawatan', 'Pencegahan', 'Tips & Trik', 'FAQ'];

const CATEGORY_COLORS: Record<string, string> = {
  'Perawatan': '#E91E8C',
  'Pencegahan': '#10B981',
  'Tips & Trik': '#F59E0B',
  'FAQ': AQUA,
};

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  featured?: boolean;
  emoji: string;
}

const ARTICLES: Article[] = [
  {
    id: 'a1', featured: true, emoji: '🦷',
    category: 'Tips & Trik',
    title: 'Cara Menyikat Gigi yang Benar agar Bersih Optimal',
    excerpt: 'Teknik sikat gigi yang tepat dapat mencegah kerusakan enamel dan menjaga kesehatan gusi jangka panjang.',
    readTime: 5,
  },
  {
    id: 'a2', emoji: '🧴',
    category: 'Pencegahan',
    title: 'Manfaat Flossing Setiap Hari untuk Kesehatan Mulut',
    excerpt: 'Flossing membersihkan sisa makanan di sela gigi yang tidak terjangkau sikat. Pelajari teknik yang benar di sini.',
    readTime: 4,
  },
  {
    id: 'a3', emoji: '🍎',
    category: 'Pencegahan',
    title: 'Makanan yang Baik dan Buruk untuk Kesehatan Gigi',
    excerpt: 'Pilihan makanan berpengaruh besar terhadap kekuatan gigi. Ketahui mana yang harus dihindari.',
    readTime: 6,
  },
  {
    id: 'a4', emoji: '🔬',
    category: 'Perawatan',
    title: 'Kapan Harus Melakukan Scaling Gigi?',
    excerpt: 'Scaling dianjurkan minimal 6 bulan sekali untuk mencegah penyakit periodontal dan menjaga nafas segar.',
    readTime: 3,
  },
  {
    id: 'a5', emoji: '😬',
    category: 'FAQ',
    title: 'Mengapa Gigi Sensitif terhadap Makanan Dingin?',
    excerpt: 'Sensitivitas gigi sering disebabkan oleh erosi enamel atau akar yang terbuka. Simak cara mengatasinya.',
    readTime: 4,
  },
  {
    id: 'a6', emoji: '👶',
    category: 'Perawatan',
    title: 'Perawatan Gigi Anak Sejak Dini: Panduan Lengkap',
    excerpt: 'Kebiasaan oral hygiene yang baik sejak kecil membangun fondasi kesehatan gigi seumur hidup.',
    readTime: 7,
  },
  {
    id: 'a7', emoji: '💊',
    category: 'FAQ',
    title: 'Apakah Pemutih Gigi Aman Digunakan Rutin?',
    excerpt: 'Bleaching gigi semakin populer, namun ada aturan penggunaan yang perlu diketahui agar enamel tetap aman.',
    readTime: 5,
  },
  {
    id: 'a8', emoji: '🧵',
    category: 'Tips & Trik',
    title: 'Obat Kumur: Pilih yang Tepat untuk Kebutuhanmu',
    excerpt: 'Tidak semua obat kumur sama. Pelajari perbedaan formula antibakteri, fluoride, dan pemutih.',
    readTime: 4,
  },
];

// Inline SVG illustration for featured card
function FeaturedIllustration() {
  return (
    <svg width="100%" height={120} viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="120" rx="16" fill="url(#featGrad)" />
      <defs>
        <linearGradient id="featGrad" x1="0" y1="0" x2="300" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF5F9" />
          <stop offset="1" stopColor="#EBF8FF" />
        </linearGradient>
      </defs>
      {/* Big tooth */}
      <path d="M120 25C107 25 97 35 97 47c0 8 3 14 7 21 4 7 6 13 6 23 0 3 2 5 5 5h20c3 0 5-2 5-5 0-10 2-16 6-23 4-7 7-13 7-21 0-12-10-22-23-22z"
        fill="rgba(233,30,140,0.12)" stroke="#E91E8C" strokeWidth="1.5" />
      <path d="M111 43 L116 48 L126 38" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sparkles */}
      <path d="M155 30 l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#F59E0B" opacity="0.7" />
      <path d="M80 55 l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill={PINK} opacity="0.5" />
      <path d="M160 70 l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill={AQUA} opacity="0.6" />
      {/* Toothbrush */}
      <rect x="170" y="28" width="8" height="50" rx="4" fill="rgba(6,182,212,0.20)" stroke={AQUA} strokeWidth="1.2" />
      <rect x="166" y="28" width="16" height="18" rx="4" fill={AQUA} opacity="0.4" />
      {/* Bubbles */}
      <circle cx="200" cy="45" r="5" fill="rgba(233,30,140,0.10)" stroke="rgba(233,30,140,0.25)" strokeWidth="1" />
      <circle cx="215" cy="32" r="3.5" fill="rgba(6,182,212,0.10)" stroke="rgba(6,182,212,0.25)" strokeWidth="1" />
      <circle cx="205" cy="65" r="4" fill="rgba(245,158,11,0.10)" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
      {/* Dashed ring */}
      <circle cx="120" cy="58" r="55" stroke="rgba(233,30,140,0.08)" strokeWidth="1" strokeDasharray="5 4" />
    </svg>
  );
}

// Small article thumbnail illustration
function ArticleThumb({ emoji, color }: { emoji: string; color: string }) {
  return (
    <div style={{
      width: 72, height: 72, borderRadius: 16, flexShrink: 0,
      background: `${color}12`,
      border: `1.5px solid ${color}20`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 30,
    }}>
      {emoji}
    </div>
  );
}

export function MobileEducation({ state, setState }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');
  const [query, setQuery] = useState('');

  const featured = ARTICLES.find(a => a.featured)!;
  const rest = ARTICLES.filter(a => !a.featured);

  const filtered = (activeCategory === 'Semua' ? rest : rest.filter(a => a.category === activeCategory))
    .filter(a => !query || a.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)', zIndex: 10 }} />

      <MobileHeader title="Edukasi Dental" showBack onBack={() => setState({ screen: 'home' })} />

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>

        {/* Search */}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', borderRadius: 14, padding: '10px 14px', border: '1.5px solid #F0F0F5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <Search size={16} color="#9CA3AF" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari artikel kesehatan gigi..."
              style={{ flex: 1, fontSize: 13, color: INK, border: 'none', outline: 'none', background: 'transparent' }}
            />
          </div>
        </div>

        {/* Categories */}
        <div style={{ padding: '12px 16px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => {
            const active = cat === activeCategory;
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.94 }}
                onClick={() => { haptic('light'); setActiveCategory(cat); }}
                style={{
                  flexShrink: 0, padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 700,
                  background: active ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : 'white',
                  color: active ? 'white' : '#6B7280',
                  boxShadow: active ? '0 4px 14px rgba(233,30,140,0.25)' : '0 1px 6px rgba(0,0,0,0.06)',
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        <div style={{ padding: '0 16px 100px' }}>
          {/* Featured */}
          {activeCategory === 'Semua' && !query && (
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'white', borderRadius: 22, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: 18 }}
            >
              <FeaturedIllustration />
              <div style={{ padding: '14px 16px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 20,
                    background: `${CATEGORY_COLORS[featured.category]}15`, color: CATEGORY_COLORS[featured.category],
                  }}>
                    {featured.category.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 9, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Clock size={9} /> {featured.readTime} menit
                  </span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 900, color: INK, lineHeight: 1.35, margin: '0 0 8px' }}>{featured.title}</p>
                <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.55, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {featured.excerpt}
                </p>
                <button
                  onClick={() => haptic('light')}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Baca Selengkapnya <ChevronRight size={13} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: INK }}>
              {activeCategory === 'Semua' ? 'Artikel Lainnya' : activeCategory}
            </span>
            <span style={{ fontSize: 11, color: '#9CA3AF' }}>{filtered.length} artikel</span>
          </div>

          {/* Article list */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <BookOpen size={48} color="#E5E7EB" style={{ display: 'block', margin: '0 auto 12px' }} />
              <p style={{ fontSize: 14, color: '#9CA3AF', fontWeight: 600 }}>Artikel tidak ditemukan</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map((article, i) => {
                const catColor = CATEGORY_COLORS[article.category] ?? PINK;
                return (
                  <motion.button
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => haptic('light')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: 'white', borderRadius: 18, padding: '14px',
                      border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      textAlign: 'left', cursor: 'pointer',
                    }}
                  >
                    <ArticleThumb emoji={article.emoji} color={catColor} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20, background: `${catColor}12`, color: catColor }}>
                          {article.category.toUpperCase()}
                        </span>
                        <span style={{ fontSize: 9, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Clock size={8} /> {article.readTime} mnt
                        </span>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 800, color: INK, lineHeight: 1.3, margin: '0 0 4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {article.title}
                      </p>
                      <p style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.45, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {article.excerpt}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
