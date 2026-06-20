/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit3, Trash2, X, Tag, Calendar, Percent, Eye, EyeOff } from 'lucide-react';

const PINK = '#E91E8C';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  discountType: 'percent' | 'fixed';
  validUntil: string;
  minPurchase?: number;
  services: string[];
  isActive: boolean;
  badge?: string;
  color: string;
}

// TODO: Replace with promotionsService.list()
const INITIAL_PROMOS: Promotion[] = [
  {
    id: '1', title: 'Paket Lebaran Sehat', description: 'Scaling + Tambal gigi hemat spesial Lebaran!',
    discount: 30, discountType: 'percent', validUntil: '2026-07-31',
    services: ['Scaling & Polishing', 'Tambal Gigi'], isActive: true, badge: 'TERPOPULER',
    color: '#E91E8C',
  },
  {
    id: '2', title: 'Free Konsultasi Pertama', description: 'Kunjungan pertama? Konsultasi gratis dengan dokter pilihan!',
    discount: 100000, discountType: 'fixed', validUntil: '2026-12-31',
    services: ['Pemeriksaan Gigi'], isActive: true, badge: 'BARU',
    color: '#4FC3F7',
  },
  {
    id: '3', title: 'Bleaching Spesial Weekend', description: 'Hemat 25% untuk perawatan bleaching setiap Sabtu & Minggu.',
    discount: 25, discountType: 'percent', validUntil: '2026-08-31',
    services: ['Bleaching Gigi'], isActive: true, color: '#F59E0B',
  },
  {
    id: '4', title: 'Promo Anak-Anak', description: 'Paket pemeriksaan dan tambal gigi anak diskon 40%',
    discount: 40, discountType: 'percent', validUntil: '2026-06-01',
    services: ['Pemeriksaan Gigi', 'Tambal Gigi'], isActive: false, color: '#10B981',
  },
];

const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
const isExpired = (d: string) => new Date(d) < new Date();

export default function AdminPromotions() {
  const [promos, setPromos] = useState(INITIAL_PROMOS);
  const [editTarget, setEditTarget] = useState<Promotion | null>(null);
  const [showForm, setShowForm] = useState(false);

  const toggleActive = (id: string) => {
    setPromos(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const activeCount = promos.filter(p => p.isActive && !isExpired(p.validUntil)).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Promo & Diskon</h1>
          <p className="text-sm text-gray-400 mt-0.5">{activeCount} promo aktif</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
        >
          <Plus size={16} />
          Tambah Promo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Promo', value: promos.length, color: PINK },
          { label: 'Aktif', value: activeCount, color: '#10B981' },
          { label: 'Kadaluarsa', value: promos.filter(p => isExpired(p.validUntil)).length, color: '#EF4444' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Promo Cards */}
      <div className="grid gap-4">
        {promos.map((promo, i) => {
          const expired = isExpired(promo.validUntil);
          return (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-opacity ${(!promo.isActive || expired) ? 'opacity-60' : ''}`}
            >
              {/* Color bar */}
              <div className="h-1.5" style={{ background: promo.color }} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-bold text-gray-800">{promo.title}</div>
                      {promo.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ background: promo.color }}>
                          {promo.badge}
                        </span>
                      )}
                      {expired && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 font-medium">Kadaluarsa</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{promo.description}</p>
                  </div>
                  <div
                    className="text-2xl font-bold flex-shrink-0"
                    style={{ color: promo.color }}
                  >
                    {promo.discountType === 'percent' ? `${promo.discount}%` : `Rp${promo.discount / 1000}rb`}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {promo.services.map(s => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{s}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={12} />
                    Berlaku hingga {fmtDate(promo.validUntil)}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleActive(promo.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title={promo.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                    >
                      {promo.isActive ? <Eye size={15} className="text-green-500" /> : <EyeOff size={15} className="text-gray-400" />}
                    </button>
                    <button
                      onClick={() => setEditTarget(promo)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit3 size={15} className="text-gray-400" />
                    </button>
                    <button
                      onClick={() => setPromos(prev => prev.filter(p => p.id !== promo.id))}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={15} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {(editTarget || showForm) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setEditTarget(null); setShowForm(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <div className="font-bold text-gray-800">{editTarget ? 'Edit Promo' : 'Tambah Promo'}</div>
                <button onClick={() => { setEditTarget(null); setShowForm(false); }}>
                  <X size={18} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Promo</label>
                  <input
                    defaultValue={editTarget?.title ?? ''}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                    placeholder="Nama promo..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                  <textarea
                    defaultValue={editTarget?.description ?? ''}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                    placeholder="Deskripsi singkat..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Diskon</label>
                    <input
                      type="number"
                      defaultValue={editTarget?.discount ?? ''}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Berlaku Hingga</label>
                    <input
                      type="date"
                      defaultValue={editTarget?.validUntil ?? ''}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t flex gap-2">
                <button
                  onClick={() => { setEditTarget(null); setShowForm(false); }}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium"
                  style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
                >
                  Simpan
                </button>
                <button
                  onClick={() => { setEditTarget(null); setShowForm(false); }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-600"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
