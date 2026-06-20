/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit3, Trash2, X, Check, Clock, DollarSign } from 'lucide-react';

const PINK = '#E91E8C';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  priceMax?: number;
  duration: number;
  description: string;
  isActive: boolean;
  icon: string;
}

// TODO: Replace with servicesService.list()
const INITIAL_SERVICES: Service[] = [
  { id: '1', name: 'Pemeriksaan Gigi', category: 'Umum', price: 100000, duration: 30, description: 'Pemeriksaan kondisi gigi dan gusi secara menyeluruh', isActive: true, icon: '🦷' },
  { id: '2', name: 'Scaling & Polishing', category: 'Preventif', price: 350000, duration: 60, description: 'Pembersihan karang gigi dan pemolesan permukaan gigi', isActive: true, icon: '✨' },
  { id: '3', name: 'Tambal Gigi', category: 'Restoratif', price: 200000, priceMax: 500000, duration: 45, description: 'Penambalan gigi berlubang dengan berbagai material pilihan', isActive: true, icon: '🔧' },
  { id: '4', name: 'Cabut Gigi', category: 'Bedah', price: 150000, priceMax: 400000, duration: 30, description: 'Pencabutan gigi sulung maupun permanen dengan anestesi lokal', isActive: true, icon: '🪥' },
  { id: '5', name: 'Kawat Gigi', category: 'Ortodonti', price: 5000000, priceMax: 15000000, duration: 60, description: 'Pemasangan bracket metal atau ceramic untuk merapikan gigi', isActive: true, icon: '📐' },
  { id: '6', name: 'Implan Gigi', category: 'Bedah', price: 8000000, priceMax: 12000000, duration: 120, description: 'Penggantian akar gigi dengan implan titanium berkualitas tinggi', isActive: true, icon: '🦾' },
  { id: '7', name: 'Veneer', category: 'Kosmetik', price: 2500000, priceMax: 5000000, duration: 90, description: 'Lapisan tipis porselen untuk mempercantik penampilan gigi', isActive: true, icon: '💎' },
  { id: '8', name: 'Bleaching Gigi', category: 'Kosmetik', price: 800000, priceMax: 2000000, duration: 60, description: 'Pemutihan gigi dengan teknologi laser atau gel profesional', isActive: false, icon: '⚡' },
];

const CATEGORIES = ['Semua', 'Umum', 'Preventif', 'Restoratif', 'Bedah', 'Ortodonti', 'Kosmetik'];

const fmtPrice = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

export default function AdminServices() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [catFilter, setCatFilter] = useState('Semua');
  const [editTarget, setEditTarget] = useState<Service | null>(null);

  const filtered = services.filter(s => catFilter === 'Semua' || s.category === catFilter);

  const toggleActive = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Layanan & Harga</h1>
          <p className="text-sm text-gray-400 mt-0.5">{services.filter(s => s.isActive).length} layanan aktif</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
        >
          <Plus size={16} />
          Tambah Layanan
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCatFilter(cat)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={catFilter === cat ? { background: PINK, color: 'white' } : { background: 'white', color: '#6B7280' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Service Cards */}
      <div className="grid gap-3">
        {filtered.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-white rounded-xl shadow-sm p-5 transition-opacity ${!s.isActive ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0 mt-0.5">{s.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-gray-800">{s.name}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs" style={{ background: '#FFF0F8', color: PINK }}>
                      {s.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => toggleActive(s.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title={s.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                    >
                      {s.isActive ? <Check size={15} className="text-green-500" /> : <X size={15} className="text-gray-400" />}
                    </button>
                    <button
                      onClick={() => setEditTarget(s)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit3 size={15} className="text-gray-400" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 size={15} className="text-red-400" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{s.description}</p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1 font-semibold" style={{ color: PINK }}>
                    <DollarSign size={13} />
                    {fmtPrice(s.price)}
                    {s.priceMax && <span className="text-gray-400 font-normal"> – {fmtPrice(s.priceMax)}</span>}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock size={13} />{s.duration} mnt
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <div className="font-bold text-gray-800">Edit Layanan</div>
                <button onClick={() => setEditTarget(null)}><X size={18} className="text-gray-400" /></button>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'Nama Layanan', key: 'name', type: 'text' },
                  { label: 'Harga Mulai (Rp)', key: 'price', type: 'number' },
                  { label: 'Harga Maks (Rp, opsional)', key: 'priceMax', type: 'number' },
                  { label: 'Durasi (menit)', key: 'duration', type: 'number' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      value={(editTarget as any)[field.key] ?? ''}
                      onChange={e => setEditTarget(prev => ({ ...prev!, [field.key]: field.type === 'number' ? +e.target.value : e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>
                ))}
              </div>
              <div className="p-4 border-t flex gap-2">
                <button
                  onClick={() => {
                    setServices(prev => prev.map(s => s.id === editTarget.id ? editTarget : s));
                    setEditTarget(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium"
                  style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
                >
                  Simpan
                </button>
                <button onClick={() => setEditTarget(null)} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-600">
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
