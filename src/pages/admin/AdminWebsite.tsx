/* eslint-disable */
import { useState, useRef, useCallback, type ReactNode, type DragEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe, Image, Type, List, Users, Tag, Newspaper, Info,
  Phone, Palette, Shield, Plus, Trash2, Eye, EyeOff,
  Upload, X, ChevronDown, ChevronUp, Save, RotateCcw,
  Star, Check, GripVertical, Edit2, ExternalLink, MessageSquareQuote, Settings, Loader,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { uploadImage } from '../../lib/supabase';
import type {
  CMSStat, CMSService, CMSDoctor, CMSPromo, CMSArticle, CMSTestimonial, CMSFaq, CMSBeforeAfter,
} from '../../data/defaultCMSContent';

const PINK = '#E91E8C';
const BLUE = '#4FC3F7';

// ─── SECTION TABS ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'hero', label: 'Hero', icon: Image },
  { id: 'services', label: 'Layanan', icon: List },
  { id: 'doctors', label: 'Dokter', icon: Users },
  { id: 'promotions', label: 'Promo', icon: Tag },
  { id: 'articles', label: 'Artikel', icon: Newspaper },
  { id: 'clinic', label: 'Klinik', icon: Info },
  { id: 'about', label: 'Tentang', icon: Info },
  { id: 'contact', label: 'Kontak', icon: Phone },
  { id: 'appearance', label: 'Tampilan', icon: Palette },
  { id: 'trust', label: 'Trust', icon: Shield },
  { id: 'testimonials', label: 'Testimoni', icon: MessageSquareQuote },
  { id: 'faq', label: 'FAQ', icon: Settings },
  { id: 'gallery', label: 'Galeri', icon: Image },
  { id: 'kiosk', label: 'Kiosk', icon: Settings },
] as const;
type TabId = typeof TABS[number]['id'];

// ─── IMAGE UPLOAD HELPER ──────────────────────────────────────────────────────
function ImageUpload({
  value, onChange, label, aspectHint, folder = 'cms',
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  aspectHint?: string;
  folder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (e: any) {
      setError('Upload gagal. Coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  return (
    <div>
      {label && <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200">
          <img src={value} alt="" className="w-full h-40 object-cover" />
          <button
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50/30 transition-all"
          style={{ opacity: uploading ? 0.7 : 1 }}
        >
          {uploading
            ? <><Loader size={24} className="mx-auto text-pink-400 mb-2 animate-spin" /><div className="text-sm text-pink-500">Mengupload...</div></>
            : <><Upload size={24} className="mx-auto text-gray-400 mb-2" /><div className="text-sm text-gray-500">Klik atau seret gambar ke sini</div></>
          }
          {aspectHint && <div className="text-xs text-gray-400 mt-1">{aspectHint}</div>}
        </div>
      )}
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) { handleFile(f); e.target.value = ''; } }}
      />
    </div>
  );
}

// ─── STAT EDITOR ─────────────────────────────────────────────────────────────
function StatEditor({
  stats, onChange,
}: { stats: CMSStat[]; onChange: (stats: CMSStat[]) => void }) {
  const update = (i: number, field: keyof CMSStat, val: string) => {
    const next = stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    onChange(next);
  };
  const add = () => onChange([...stats, { value: '', label: '' }]);
  const remove = (i: number) => onChange(stats.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      {stats.map((s, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={s.value}
            onChange={e => update(i, 'value', e.target.value)}
            placeholder="Nilai (mis. 15+)"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            value={s.label}
            onChange={e => update(i, 'label', e.target.value)}
            placeholder="Label (mis. Tahun Pengalaman)"
            className="flex-[2] px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 transition-colors">
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-dashed border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-all"
      >
        <Plus size={14} /> Tambah Statistik
      </button>
    </div>
  );
}

// ─── FIELD ───────────────────────────────────────────────────────────────────
function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  );
}

function Input({ value, onChange, placeholder, multiline }: {
  value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  const cls = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 placeholder-gray-400";
  return multiline
    ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls + ' resize-none'} />
    : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />;
}

// ─── TOGGLE ──────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-all ${checked ? 'bg-pink-500' : 'bg-gray-200'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`}
      />
    </button>
  );
}

// ─── HERO IMAGES MULTI-UPLOAD ─────────────────────────────────────────────────
function HeroImagesEditor({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const addFiles = async (files: File[]) => {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (!imageFiles.length) return;
    setUploading(true);
    setUploadError(null);
    try {
      const urls = await Promise.all(imageFiles.map(f => uploadImage(f, 'hero')));
      onChange([...images, ...urls]);
    } catch {
      setUploadError('Gagal upload. Coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    addFiles(Array.from(e.dataTransfer.files));
  }, [images]);

  const remove = (i: number) => onChange(images.filter((_, idx) => idx !== i));
  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...images];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700">Foto Carousel Hero</div>
      <div className="text-xs text-gray-400">Upload beberapa foto untuk carousel yang berganti otomatis setiap 4.5 detik</div>

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden border border-gray-200 group">
              <img src={img} alt="" className="w-full h-24 object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                {i > 0 && (
                  <button
                    onClick={() => moveUp(i)}
                    className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
                    title="Pindah ke kiri"
                  >
                    ‹
                  </button>
                )}
                <button
                  onClick={() => remove(i)}
                  className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
              {i === 0 && (
                <div className="absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-pink-500 text-white">
                  Utama
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add image drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => !uploading && inputRef.current?.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50/30 transition-all"
        style={{ opacity: uploading ? 0.7 : 1 }}
      >
        {uploading
          ? <><Loader size={20} className="mx-auto text-pink-400 mb-1.5 animate-spin" /><div className="text-sm text-pink-500">Mengupload ke cloud...</div></>
          : <><Upload size={20} className="mx-auto text-gray-400 mb-1.5" /><div className="text-sm text-gray-500">Klik atau seret foto baru</div><div className="text-xs text-gray-400 mt-0.5">Disarankan 4:5 ratio, JPG/PNG</div></>
        }
      </div>
      {uploadError && <div className="text-xs text-red-500">{uploadError}</div>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => { addFiles(Array.from(e.target.files ?? [])); e.target.value = ''; }}
      />
    </div>
  );
}

// ─── HERO TAB ─────────────────────────────────────────────────────────────────
function HeroTab() {
  const { cms, updateHero } = useCMS();
  const h = cms.hero;
  const heroImages = h.heroImages ?? [];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
        <strong>Info:</strong> Foto hero ditampilkan dalam frame persegi panjang premium. Upload beberapa foto untuk carousel otomatis.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Headline Utama">
            <Input value={h.headline} onChange={v => updateHero({ headline: v })} placeholder="Senyum Sehat," />
          </Field>
          <Field label="Headline Aksen (pink)">
            <Input value={h.headlineAccent} onChange={v => updateHero({ headlineAccent: v })} placeholder="Percaya Diri Penuh" />
          </Field>
          <Field label="Subheadline">
            <Input value={h.subheadline} onChange={v => updateHero({ subheadline: v })} multiline placeholder="Deskripsi singkat klinik..." />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tombol Utama">
              <Input value={h.ctaPrimaryText} onChange={v => updateHero({ ctaPrimaryText: v })} placeholder="Booking Sekarang" />
            </Field>
            <Field label="Tombol Kedua">
              <Input value={h.ctaSecondaryText} onChange={v => updateHero({ ctaSecondaryText: v })} placeholder="Lihat Layanan" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Badge Teks">
              <Input value={h.badgeText} onChange={v => updateHero({ badgeText: v })} placeholder="Healthy Smile" />
            </Field>
            <Field label="Badge Sub">
              <Input value={h.badgeSubtext} onChange={v => updateHero({ badgeSubtext: v })} placeholder="for Better Life" />
            </Field>
          </div>
        </div>

        <div className="space-y-4">
          <HeroImagesEditor
            images={heroImages}
            onChange={imgs => updateHero({ heroImages: imgs })}
          />

          {/* Preview */}
          {heroImages.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs font-medium text-gray-500 mb-2">Preview Frame</div>
              <div
                className="relative rounded-2xl overflow-hidden mx-auto"
                style={{ width: 120, aspectRatio: '4/5', border: '2px solid #E91E8C40' }}
              >
                <img src={heroImages[0]} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-gray-700 mb-3">Statistik Hero</div>
        <StatEditor stats={h.stats} onChange={stats => updateHero({ stats })} />
      </div>
    </div>
  );
}

// ─── SERVICES TAB ─────────────────────────────────────────────────────────────
function ServicesTab() {
  const { cms, updateServices } = useCMS();
  const s = cms.services;
  const [editing, setEditing] = useState<CMSService | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const toggleVisible = (id: string) => {
    updateServices({ items: s.items.map(i => i.id === id ? { ...i, isVisible: !i.isVisible } : i) });
  };

  const openEdit = (item: CMSService, idx: number) => { setEditing({ ...item }); setEditIdx(idx); };
  const saveEdit = () => {
    if (!editing || editIdx === null) return;
    updateServices({ items: s.items.map((i, idx) => idx === editIdx ? editing : i) });
    setEditing(null); setEditIdx(null);
  };
  const deleteItem = (id: string) => updateServices({ items: s.items.filter(i => i.id !== id) });
  const addItem = () => {
    const id = `s${Date.now()}`;
    updateServices({ items: [...s.items, { id, name: 'Layanan Baru', description: '', emoji: '🦷', price: 'Rp 0', isVisible: true }] });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Judul Seksi"><Input value={s.sectionTitle} onChange={v => updateServices({ sectionTitle: v })} /></Field>
        <Field label="Subjudul Seksi"><Input value={s.sectionSubtitle} onChange={v => updateServices({ sectionSubtitle: v })} multiline /></Field>
      </div>

      <div className="space-y-2">
        {s.items.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-2xl w-10 text-center">{item.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{item.name}</div>
              <div className="text-xs text-gray-500 truncate">{item.description}</div>
              <div className="text-xs font-medium mt-0.5" style={{ color: PINK }}>{item.price}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Toggle checked={item.isVisible} onChange={() => toggleVisible(item.id)} />
              <button onClick={() => openEdit(item, idx)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all">
                <Edit2 size={14} />
              </button>
              <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-all">
        <Plus size={16} /> Tambah Layanan
      </button>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={e => { if (e.target === e.currentTarget) { setEditing(null); setEditIdx(null); } }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-800">Edit Layanan</div>
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} /></button>
              </div>
              <Field label="Nama Layanan"><Input value={editing.name} onChange={v => setEditing({ ...editing, name: v })} /></Field>
              <Field label="Deskripsi"><Input value={editing.description} onChange={v => setEditing({ ...editing, description: v })} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Emoji/Ikon"><Input value={editing.emoji} onChange={v => setEditing({ ...editing, emoji: v })} placeholder="🦷" /></Field>
                <Field label="Harga"><Input value={editing.price} onChange={v => setEditing({ ...editing, price: v })} placeholder="Rp 0" /></Field>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                <button onClick={saveEdit} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all" style={{ background: PINK }}>Simpan</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── DOCTORS TAB ─────────────────────────────────────────────────────────────
function DoctorsTab() {
  const { cms, updateDoctors } = useCMS();
  const d = cms.doctors;
  const [editing, setEditing] = useState<CMSDoctor | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const toggleVisible = (id: string) => {
    updateDoctors({ items: d.items.map(i => i.id === id ? { ...i, isVisible: !i.isVisible } : i) });
  };
  const openEdit = (item: CMSDoctor, idx: number) => { setEditing({ ...item }); setEditIdx(idx); };
  const saveEdit = () => {
    if (!editing || editIdx === null) return;
    updateDoctors({ items: d.items.map((i, idx) => idx === editIdx ? editing : i) });
    setEditing(null); setEditIdx(null);
  };
  const deleteItem = (id: string) => updateDoctors({ items: d.items.filter(i => i.id !== id) });
  const addItem = () => {
    const id = `d${Date.now()}`;
    updateDoctors({ items: [...d.items, { id, name: 'drg. Nama Dokter', specialty: 'Spesialis', experience: '0 Tahun', photo: null, rating: 5.0, patients: 0, isVisible: true }] });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Judul Seksi"><Input value={d.sectionTitle} onChange={v => updateDoctors({ sectionTitle: v })} /></Field>
        <Field label="Subjudul Seksi"><Input value={d.sectionSubtitle} onChange={v => updateDoctors({ sectionSubtitle: v })} multiline /></Field>
      </div>

      <div className="space-y-2">
        {d.items.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}>
              {item.name.replace('drg. ', '')[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{item.name}</div>
              <div className="text-xs text-gray-500">{item.specialty} · {item.experience}</div>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={10} fill="#F59E0B" className="text-yellow-400" />
                <span className="text-xs text-gray-500">{item.rating} · {item.patients} pasien</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Toggle checked={item.isVisible} onChange={() => toggleVisible(item.id)} />
              <button onClick={() => openEdit(item, idx)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all"><Edit2 size={14} /></button>
              <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-all">
        <Plus size={16} /> Tambah Dokter
      </button>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={e => { if (e.target === e.currentTarget) { setEditing(null); setEditIdx(null); } }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-800">Edit Dokter</div>
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} /></button>
              </div>
              <Field label="Nama Dokter"><Input value={editing.name} onChange={v => setEditing({ ...editing, name: v })} /></Field>
              <Field label="Spesialisasi"><Input value={editing.specialty} onChange={v => setEditing({ ...editing, specialty: v })} /></Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Pengalaman"><Input value={editing.experience} onChange={v => setEditing({ ...editing, experience: v })} /></Field>
                <Field label="Rating">
                  <input type="number" min="1" max="5" step="0.1" value={editing.rating}
                    onChange={e => setEditing({ ...editing, rating: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
                </Field>
                <Field label="Pasien">
                  <input type="number" min="0" value={editing.patients}
                    onChange={e => setEditing({ ...editing, patients: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
                </Field>
              </div>
              <ImageUpload label="Foto Dokter (opsional)" value={editing.photo} onChange={v => setEditing({ ...editing, photo: v })} aspectHint="Foto wajah, rasio 1:1 disarankan" />
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                <button onClick={saveEdit} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all" style={{ background: PINK }}>Simpan</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PROMOTIONS TAB ──────────────────────────────────────────────────────────
function PromotionsTab() {
  const { cms, updatePromotions } = useCMS();
  const p = cms.promotions;
  const [editing, setEditing] = useState<CMSPromo | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const toggleVisible = (id: string) => updatePromotions({ items: p.items.map(i => i.id === id ? { ...i, isVisible: !i.isVisible } : i) });
  const openEdit = (item: CMSPromo, idx: number) => { setEditing({ ...item }); setEditIdx(idx); };
  const saveEdit = () => {
    if (!editing || editIdx === null) return;
    updatePromotions({ items: p.items.map((i, idx) => idx === editIdx ? editing : i) });
    setEditing(null); setEditIdx(null);
  };
  const deleteItem = (id: string) => updatePromotions({ items: p.items.filter(i => i.id !== id) });
  const addItem = () => {
    const id = `p${Date.now()}`;
    updatePromotions({ items: [...p.items, { id, title: 'Promo Baru', subtitle: '', discount: '0%', image: null, validUntil: new Date().toISOString().slice(0, 10), badge: '', color: '#E91E8C', isVisible: true }] });
  };

  const isExpired = (until: string) => new Date(until) < new Date();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Judul Seksi"><Input value={p.sectionTitle} onChange={v => updatePromotions({ sectionTitle: v })} /></Field>
        <Field label="Subjudul Seksi"><Input value={p.sectionSubtitle} onChange={v => updatePromotions({ sectionSubtitle: v })} multiline /></Field>
      </div>

      <div className="space-y-2">
        {p.items.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: item.color }}>
              {item.discount}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-gray-800 truncate">{item.title}</div>
                {item.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white flex-shrink-0" style={{ background: item.color }}>{item.badge}</span>}
                {isExpired(item.validUntil) && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-100 text-red-600 flex-shrink-0">KADALUARSA</span>}
              </div>
              <div className="text-xs text-gray-500 truncate">{item.subtitle}</div>
              <div className="text-xs text-gray-400 mt-0.5">Berlaku s/d {item.validUntil}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Toggle checked={item.isVisible} onChange={() => toggleVisible(item.id)} />
              <button onClick={() => openEdit(item, idx)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all"><Edit2 size={14} /></button>
              <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-all">
        <Plus size={16} /> Tambah Promo
      </button>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={e => { if (e.target === e.currentTarget) { setEditing(null); setEditIdx(null); } }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-800">Edit Promo</div>
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} /></button>
              </div>
              <Field label="Judul Promo"><Input value={editing.title} onChange={v => setEditing({ ...editing, title: v })} /></Field>
              <Field label="Subjudul"><Input value={editing.subtitle} onChange={v => setEditing({ ...editing, subtitle: v })} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Diskon / Label"><Input value={editing.discount} onChange={v => setEditing({ ...editing, discount: v })} placeholder="30%" /></Field>
                <Field label="Badge"><Input value={editing.badge} onChange={v => setEditing({ ...editing, badge: v })} placeholder="TERPOPULER" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Berlaku Hingga">
                  <input type="date" value={editing.validUntil} onChange={e => setEditing({ ...editing, validUntil: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
                </Field>
                <Field label="Warna Aksen">
                  <div className="flex gap-2 items-center">
                    <input type="color" value={editing.color} onChange={e => setEditing({ ...editing, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200" />
                    <input value={editing.color} onChange={e => setEditing({ ...editing, color: e.target.value })} className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none" />
                  </div>
                </Field>
              </div>
              <ImageUpload label="Gambar Promo (opsional)" value={editing.image} onChange={v => setEditing({ ...editing, image: v })} aspectHint="Rasio 16:9 disarankan" />
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                <button onClick={saveEdit} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all" style={{ background: PINK }}>Simpan</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ARTICLES TAB ─────────────────────────────────────────────────────────────
function ArticlesTab() {
  const { cms, updateArticles } = useCMS();
  const a = cms.articles;
  const [editing, setEditing] = useState<CMSArticle | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const toggleVisible = (id: string) => updateArticles({ items: a.items.map(i => i.id === id ? { ...i, isVisible: !i.isVisible } : i) });
  const openEdit = (item: CMSArticle, idx: number) => { setEditing({ ...item }); setEditIdx(idx); };
  const saveEdit = () => {
    if (!editing || editIdx === null) return;
    updateArticles({ items: a.items.map((i, idx) => idx === editIdx ? editing : i) });
    setEditing(null); setEditIdx(null);
  };
  const deleteItem = (id: string) => updateArticles({ items: a.items.filter(i => i.id !== id) });
  const addItem = () => {
    const id = `ar${Date.now()}`;
    updateArticles({ items: [...a.items, { id, title: 'Artikel Baru', excerpt: '', thumbnail: null, category: 'Umum', publishedAt: new Date().toISOString().slice(0, 10), isVisible: true }] });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Judul Seksi"><Input value={a.sectionTitle} onChange={v => updateArticles({ sectionTitle: v })} /></Field>
        <Field label="Subjudul Seksi"><Input value={a.sectionSubtitle} onChange={v => updateArticles({ sectionSubtitle: v })} multiline /></Field>
      </div>

      <div className="space-y-2">
        {a.items.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-12 h-10 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
              {item.thumbnail ? <img src={item.thumbnail} alt="" className="w-full h-full object-cover" /> : <Newspaper size={16} className="text-gray-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-600">{item.category}</span>
              </div>
              <div className="text-sm font-medium text-gray-800 truncate mt-0.5">{item.title}</div>
              <div className="text-xs text-gray-400">{item.publishedAt}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Toggle checked={item.isVisible} onChange={() => toggleVisible(item.id)} />
              <button onClick={() => openEdit(item, idx)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all"><Edit2 size={14} /></button>
              <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-all">
        <Plus size={16} /> Tambah Artikel
      </button>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={e => { if (e.target === e.currentTarget) { setEditing(null); setEditIdx(null); } }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-800">Edit Artikel</div>
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} /></button>
              </div>
              <Field label="Judul Artikel"><Input value={editing.title} onChange={v => setEditing({ ...editing, title: v })} /></Field>
              <Field label="Ringkasan"><Input value={editing.excerpt} onChange={v => setEditing({ ...editing, excerpt: v })} multiline /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Kategori"><Input value={editing.category} onChange={v => setEditing({ ...editing, category: v })} /></Field>
                <Field label="Tanggal Publish">
                  <input type="date" value={editing.publishedAt} onChange={e => setEditing({ ...editing, publishedAt: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
                </Field>
              </div>
              <ImageUpload label="Thumbnail (opsional)" value={editing.thumbnail} onChange={v => setEditing({ ...editing, thumbnail: v })} aspectHint="Rasio 16:9 disarankan" />
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                <button onClick={saveEdit} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all" style={{ background: PINK }}>Simpan</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── CLINIC TAB ──────────────────────────────────────────────────────────────
function ClinicTab() {
  const { cms, updateClinic } = useCMS();
  const c = cms.clinic;
  return (
    <div className="space-y-5">
      <Field label="Judul Seksi"><Input value={c.sectionTitle} onChange={v => updateClinic({ sectionTitle: v })} /></Field>
      <Field label="Deskripsi"><Input value={c.description} onChange={v => updateClinic({ description: v })} multiline /></Field>
      <Field label="Alamat"><Input value={c.address} onChange={v => updateClinic({ address: v })} /></Field>
      <ImageUpload label="Foto Klinik" value={c.photo} onChange={v => updateClinic({ photo: v })} aspectHint="Foto tampak depan atau interior klinik" />
      <div>
        <div className="text-sm font-medium text-gray-700 mb-3">Statistik Klinik</div>
        <StatEditor stats={c.stats} onChange={stats => updateClinic({ stats })} />
      </div>
    </div>
  );
}

// ─── ABOUT TAB ───────────────────────────────────────────────────────────────
function AboutTab() {
  const { cms, updateAbout } = useCMS();
  const a = cms.about;
  return (
    <div className="space-y-5">
      <Field label="Judul Seksi"><Input value={a.sectionTitle} onChange={v => updateAbout({ sectionTitle: v })} /></Field>
      <Field label="Deskripsi Utama"><Input value={a.description} onChange={v => updateAbout({ description: v })} multiline /></Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Misi Klinik"><Input value={a.mission} onChange={v => updateAbout({ mission: v })} multiline /></Field>
        <Field label="Visi Klinik"><Input value={a.vision} onChange={v => updateAbout({ vision: v })} multiline /></Field>
      </div>
      <ImageUpload label="Logo Klinik" value={a.logo} onChange={v => updateAbout({ logo: v })} aspectHint="Format PNG dengan background transparan disarankan" />
      <div>
        <div className="text-sm font-medium text-gray-700 mb-3">Statistik Tentang</div>
        <StatEditor stats={a.stats} onChange={stats => updateAbout({ stats })} />
      </div>
    </div>
  );
}

// ─── CONTACT TAB ─────────────────────────────────────────────────────────────
function ContactTab() {
  const { cms, updateContact } = useCMS();
  const c = cms.contact;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Telepon"><Input value={c.phone} onChange={v => updateContact({ phone: v })} placeholder="(021) 2345-6789" /></Field>
        <Field label="WhatsApp"><Input value={c.whatsapp} onChange={v => updateContact({ whatsapp: v })} placeholder="+62 812-3456-7890" /></Field>
        <Field label="Email"><Input value={c.email} onChange={v => updateContact({ email: v })} placeholder="info@omdc.id" /></Field>
        <Field label="Alamat"><Input value={c.address} onChange={v => updateContact({ address: v })} /></Field>
      </div>
      <Field label="Embed Google Maps (URL iframe src)" hint="Copy URL dari Google Maps > Share > Embed a map > salin src= nya saja">
        <Input value={c.mapEmbed} onChange={v => updateContact({ mapEmbed: v })} multiline placeholder="https://www.google.com/maps/embed?pb=..." />
      </Field>
      {c.mapEmbed && (
        <div className="rounded-xl overflow-hidden border border-gray-200 h-48">
          <iframe src={c.mapEmbed} className="w-full h-full border-0" title="Google Maps" />
        </div>
      )}
    </div>
  );
}

// ─── APPEARANCE TAB ───────────────────────────────────────────────────────────
function AppearanceTab() {
  const { cms, updateAppearance, updateCMS } = useCMS();
  const ap = cms.appearance;
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [logoUploading, setLogoUploading] = useState(false);
  const handleLogoFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setLogoUploading(true);
    try {
      const url = await uploadImage(file, 'logo');
      updateCMS({ logoUrl: url });
    } catch {
      // silent
    } finally {
      setLogoUploading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ── LOGO PERUSAHAAN ────────────────────────────────────────────── */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-800">Logo Perusahaan</div>
            <div className="text-xs text-gray-500 mt-0.5">Akan diterapkan ke semua halaman: website, kiosk, dan aplikasi mobile</div>
          </div>
          {cms.logoUrl && (
            <button
              onClick={() => updateCMS({ logoUrl: null })}
              className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
            >
              <X size={13} /> Reset ke default
            </button>
          )}
        </div>
        <div className="p-5">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Preview */}
            <div className="flex-shrink-0">
              <div className="text-xs font-medium text-gray-500 mb-2">Preview</div>
              <div className="flex gap-3">
                {/* On light bg */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-28 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center px-3">
                    {cms.logoUrl
                      ? <img src={cms.logoUrl} alt="Logo" style={{ maxHeight: 36, maxWidth: '100%', objectFit: 'contain' }} />
                      : <div className="flex items-center gap-1.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#E91E8C,#FF6BB5)' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.5 2 6 4.5 6 8c0 2 .8 3.5 1.5 5 .7 1.5 1 2.5 1 4 0 .6.4 1 1 1h5c.6 0 1-.4 1-1 0-1.5.3-2.5 1-4 .7-1.5 1.5-3 1.5-5 0-3.5-2.5-6-6-6z" fill="white" opacity="0.9"/></svg>
                          </div>
                          <div><div className="text-xs font-black text-pink-500 leading-none">OMDC</div><div className="text-[8px] font-semibold text-gray-400 leading-none uppercase tracking-widest">Dental</div></div>
                        </div>
                    }
                  </div>
                  <span className="text-[10px] text-gray-400">Terang</span>
                </div>
                {/* On dark bg */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-28 h-16 rounded-xl flex items-center justify-center px-3" style={{ background: 'linear-gradient(135deg,#9D174D,#E91E8C)' }}>
                    {cms.logoUrl
                      ? <img src={cms.logoUrl} alt="Logo" style={{ maxHeight: 36, maxWidth: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                      : <div className="flex items-center gap-1.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.5 2 6 4.5 6 8c0 2 .8 3.5 1.5 5 .7 1.5 1 2.5 1 4 0 .6.4 1 1 1h5c.6 0 1-.4 1-1 0-1.5.3-2.5 1-4 .7-1.5 1.5-3 1.5-5 0-3.5-2.5-6-6-6z" fill="white" opacity="0.9"/></svg>
                          </div>
                          <div><div className="text-xs font-black text-white leading-none">OMDC</div><div className="text-[8px] font-semibold text-white/70 leading-none uppercase tracking-widest">Dental</div></div>
                        </div>
                    }
                  </div>
                  <span className="text-[10px] text-gray-400">Gelap</span>
                </div>
              </div>
            </div>

            {/* Upload area */}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-500 mb-2">Upload Logo Baru</div>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoFile(f); e.target.value = ''; }}
              />
              <div
                onClick={() => !logoUploading && logoInputRef.current?.click()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleLogoFile(f); }}
                onDragOver={e => e.preventDefault()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50/30 transition-all"
                style={{ opacity: logoUploading ? 0.7 : 1 }}
              >
                {logoUploading
                  ? <><Loader size={22} className="mx-auto text-pink-400 mb-2 animate-spin" /><div className="text-sm text-pink-500">Mengupload logo...</div></>
                  : <><Upload size={22} className="mx-auto text-gray-400 mb-2" /><div className="text-sm text-gray-500 font-medium">Klik atau seret file logo</div><div className="text-xs text-gray-400 mt-1">PNG, SVG, JPG • Latar transparan direkomendasikan</div></>
                }
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Tips: Gunakan logo dengan latar belakang transparan (PNG/SVG) untuk hasil terbaik di semua halaman.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
        Perubahan warna akan diterapkan ke seluruh website secara real-time. Pastikan kombinasi warna memiliki kontras yang baik.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Nama Klinik"><Input value={ap.clinicName} onChange={v => updateAppearance({ clinicName: v })} /></Field>
        <Field label="Tagline"><Input value={ap.tagline} onChange={v => updateAppearance({ tagline: v })} /></Field>

        <Field label="Warna Utama (Primary)">
          <div className="flex gap-3 items-center">
            <input type="color" value={ap.primaryColor} onChange={e => updateAppearance({ primaryColor: e.target.value })} className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200" />
            <Input value={ap.primaryColor} onChange={v => updateAppearance({ primaryColor: v })} placeholder="#E91E8C" />
          </div>
        </Field>
        <Field label="Warna Aksen (Secondary)">
          <div className="flex gap-3 items-center">
            <input type="color" value={ap.accentColor} onChange={e => updateAppearance({ accentColor: e.target.value })} className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200" />
            <Input value={ap.accentColor} onChange={v => updateAppearance({ accentColor: v })} placeholder="#4FC3F7" />
          </div>
        </Field>
      </div>

      {/* Color Preview */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700">Preview Warna</div>
        </div>
        <div className="p-4 flex gap-3 flex-wrap">
          <div className="flex-1 min-w-32 h-20 rounded-xl flex items-center justify-center text-white text-sm font-semibold" style={{ background: ap.primaryColor }}>
            Primary
          </div>
          <div className="flex-1 min-w-32 h-20 rounded-xl flex items-center justify-center text-white text-sm font-semibold" style={{ background: ap.accentColor }}>
            Accent
          </div>
          <div className="flex-1 min-w-32 h-20 rounded-xl flex items-center justify-center text-sm font-semibold border border-gray-100" style={{ background: ap.primaryColor + '15', color: ap.primaryColor }}>
            Primary Light
          </div>
          <div className="flex-1 min-w-48 h-20 rounded-xl flex items-center justify-center text-white text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${ap.primaryColor}, ${ap.accentColor})` }}>
            Gradient
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TRUST TAB ────────────────────────────────────────────────────────────────
function TrustTab() {
  const { cms, updateTrust } = useCMS();
  const t = cms.trust;

  const updateLogo = (i: number, field: 'name' | 'logo', val: string) => {
    const next = t.logos.map((l, idx) => idx === i ? { ...l, [field]: val } : l);
    updateTrust({ logos: next });
  };
  const addLogo = () => updateTrust({ logos: [...t.logos, { name: '', logo: '' }] });
  const removeLogo = (i: number) => updateTrust({ logos: t.logos.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-5">
      <Field label="Judul Seksi"><Input value={t.sectionTitle} onChange={v => updateTrust({ sectionTitle: v })} /></Field>

      <div>
        <div className="text-sm font-medium text-gray-700 mb-3">Logo Kepercayaan</div>
        <div className="space-y-2">
          {t.logos.map((logo, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                value={logo.name}
                onChange={e => updateLogo(i, 'name', e.target.value)}
                placeholder="Nama (mis. BCA)"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                value={logo.logo}
                onChange={e => updateLogo(i, 'logo', e.target.value)}
                placeholder="Label/Teks (mis. BCA)"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button onClick={() => removeLogo(i)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addLogo} className="mt-2 flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-dashed border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-all">
          <Plus size={14} /> Tambah Logo
        </button>
      </div>

      {/* Preview */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700">Preview Trust Bar</div>
        </div>
        <div className="p-4 flex flex-wrap gap-4 justify-center">
          {t.logos.map((logo, i) => (
            <div key={i} className="px-5 py-3 bg-gray-50 rounded-xl border border-gray-100 font-bold text-gray-600 text-sm">
              {logo.logo || logo.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TESTIMONIALS TAB ─────────────────────────────────────────────────────────
function TestimonialsTab() {
  const { cms, updateTestimonials } = useCMS();
  const t = cms.testimonials;
  const [editing, setEditing] = useState<CMSTestimonial | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const toggleVisible = (id: string) => updateTestimonials({ items: t.items.map(i => i.id === id ? { ...i, isVisible: !i.isVisible } : i) });
  const openEdit = (item: CMSTestimonial, idx: number) => { setEditing({ ...item }); setEditIdx(idx); };
  const saveEdit = () => {
    if (!editing || editIdx === null) return;
    updateTestimonials({ items: t.items.map((i, idx) => idx === editIdx ? editing : i) });
    setEditing(null); setEditIdx(null);
  };
  const deleteItem = (id: string) => updateTestimonials({ items: t.items.filter(i => i.id !== id) });
  const addItem = () => {
    const id = `tm${Date.now()}`;
    updateTestimonials({ items: [...t.items, { id, name: 'Nama Pasien', treatment: 'Layanan', rating: 5, text: 'Tuliskan testimoni di sini...', avatar: null, isVisible: true }] });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Judul Seksi"><Input value={t.sectionTitle} onChange={v => updateTestimonials({ sectionTitle: v })} /></Field>
        <Field label="Subjudul Seksi"><Input value={t.sectionSubtitle} onChange={v => updateTestimonials({ sectionSubtitle: v })} multiline /></Field>
      </div>

      <div className="space-y-2">
        {t.items.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg,#E91E8C,#FF6BB5)' }}>
              {item.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{item.name}</div>
              <div className="text-xs text-gray-500">{item.treatment}</div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={10} fill={i < item.rating ? '#F59E0B' : '#E5E7EB'} className={i < item.rating ? 'text-yellow-400' : 'text-gray-200'} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Toggle checked={item.isVisible} onChange={() => toggleVisible(item.id)} />
              <button onClick={() => openEdit(item, idx)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all"><Edit2 size={14} /></button>
              <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-all">
        <Plus size={16} /> Tambah Testimoni
      </button>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={e => { if (e.target === e.currentTarget) { setEditing(null); setEditIdx(null); } }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-800">Edit Testimoni</div>
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} /></button>
              </div>
              <Field label="Nama Pasien"><Input value={editing.name} onChange={v => setEditing({ ...editing, name: v })} /></Field>
              <Field label="Layanan / Perawatan"><Input value={editing.treatment} onChange={v => setEditing({ ...editing, treatment: v })} /></Field>
              <Field label="Rating (1-5)">
                <input type="number" min="1" max="5" step="1" value={editing.rating}
                  onChange={e => setEditing({ ...editing, rating: Math.min(5, Math.max(1, parseInt(e.target.value) || 5)) })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
              </Field>
              <Field label="Teks Testimoni"><Input value={editing.text} onChange={v => setEditing({ ...editing, text: v })} multiline /></Field>
              <ImageUpload label="Foto Pasien (opsional)" value={editing.avatar} onChange={v => setEditing({ ...editing, avatar: v })} aspectHint="Foto wajah, rasio 1:1 disarankan" />
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                <button onClick={saveEdit} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all" style={{ background: PINK }}>Simpan</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FAQ TAB ──────────────────────────────────────────────────────────────────
function FaqTab() {
  const { cms, updateFaq } = useCMS();
  const f = cms.faq;
  const [editing, setEditing] = useState<CMSFaq | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const toggleVisible = (id: string) => updateFaq({ items: f.items.map(i => i.id === id ? { ...i, isVisible: !i.isVisible } : i) });
  const openEdit = (item: CMSFaq, idx: number) => { setEditing({ ...item }); setEditIdx(idx); };
  const saveEdit = () => {
    if (!editing || editIdx === null) return;
    updateFaq({ items: f.items.map((i, idx) => idx === editIdx ? editing : i) });
    setEditing(null); setEditIdx(null);
  };
  const deleteItem = (id: string) => updateFaq({ items: f.items.filter(i => i.id !== id) });
  const addItem = () => {
    const id = `fq${Date.now()}`;
    updateFaq({ items: [...f.items, { id, question: 'Pertanyaan baru?', answer: 'Jawaban...', isVisible: true }] });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Judul Seksi"><Input value={f.sectionTitle} onChange={v => updateFaq({ sectionTitle: v })} /></Field>
        <Field label="Subjudul Seksi"><Input value={f.sectionSubtitle} onChange={v => updateFaq({ sectionSubtitle: v })} multiline /></Field>
      </div>

      <div className="space-y-2">
        {f.items.map((item, idx) => (
          <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 mb-1">{item.question}</div>
                <div className="text-xs text-gray-500 line-clamp-2">{item.answer}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Toggle checked={item.isVisible} onChange={() => toggleVisible(item.id)} />
                <button onClick={() => openEdit(item, idx)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all"><Edit2 size={14} /></button>
                <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-all">
        <Plus size={16} /> Tambah Pertanyaan
      </button>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={e => { if (e.target === e.currentTarget) { setEditing(null); setEditIdx(null); } }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-800">Edit FAQ</div>
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} /></button>
              </div>
              <Field label="Pertanyaan"><Input value={editing.question} onChange={v => setEditing({ ...editing, question: v })} /></Field>
              <Field label="Jawaban"><Input value={editing.answer} onChange={v => setEditing({ ...editing, answer: v })} multiline /></Field>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                <button onClick={saveEdit} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all" style={{ background: PINK }}>Simpan</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── GALLERY TAB ──────────────────────────────────────────────────────────────
function GalleryTab() {
  const { cms, updateGallery } = useCMS();
  const g = cms.gallery;
  const [editing, setEditing] = useState<CMSBeforeAfter | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const toggleVisible = (id: string) => updateGallery({ items: g.items.map(i => i.id === id ? { ...i, isVisible: !i.isVisible } : i) });
  const openEdit = (item: CMSBeforeAfter, idx: number) => { setEditing({ ...item }); setEditIdx(idx); };
  const saveEdit = () => {
    if (!editing || editIdx === null) return;
    updateGallery({ items: g.items.map((i, idx) => idx === editIdx ? editing : i) });
    setEditing(null); setEditIdx(null);
  };
  const deleteItem = (id: string) => updateGallery({ items: g.items.filter(i => i.id !== id) });
  const addItem = () => {
    const id = `ga${Date.now()}`;
    updateGallery({ items: [...g.items, { id, title: 'Kasus Baru', treatment: 'Perawatan', before: null, after: null, isVisible: true }] });
  };

  return (
    <div className="space-y-5">
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
        Upload foto sebelum & sesudah perawatan. Pengunjung dapat menyeret slider untuk membandingkan kedua foto.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Judul Seksi"><Input value={g.sectionTitle} onChange={v => updateGallery({ sectionTitle: v })} /></Field>
        <Field label="Subjudul Seksi"><Input value={g.sectionSubtitle} onChange={v => updateGallery({ sectionSubtitle: v })} multiline /></Field>
      </div>

      <div className="space-y-2">
        {g.items.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex gap-2 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-gray-200 text-xs text-gray-400">
                {item.before ? <img src={item.before} alt="" className="w-full h-full object-cover" /> : 'B'}
              </div>
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center text-xs text-white" style={{ background: PINK }}>
                {item.after ? <img src={item.after} alt="" className="w-full h-full object-cover" /> : 'A'}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800">{item.title}</div>
              <div className="text-xs text-gray-500">{item.treatment}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Toggle checked={item.isVisible} onChange={() => toggleVisible(item.id)} />
              <button onClick={() => openEdit(item, idx)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all"><Edit2 size={14} /></button>
              <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500 transition-all">
        <Plus size={16} /> Tambah Kasus
      </button>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={e => { if (e.target === e.currentTarget) { setEditing(null); setEditIdx(null); } }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-800">Edit Galeri</div>
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} /></button>
              </div>
              <Field label="Judul"><Input value={editing.title} onChange={v => setEditing({ ...editing, title: v })} /></Field>
              <Field label="Jenis Perawatan"><Input value={editing.treatment} onChange={v => setEditing({ ...editing, treatment: v })} /></Field>
              <ImageUpload label="Foto Sebelum (Before)" value={editing.before} onChange={v => setEditing({ ...editing, before: v })} aspectHint="Rasio 4:3 disarankan" />
              <ImageUpload label="Foto Sesudah (After)" value={editing.after} onChange={v => setEditing({ ...editing, after: v })} aspectHint="Rasio 4:3 disarankan" />
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => { setEditing(null); setEditIdx(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                <button onClick={saveEdit} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-all" style={{ background: PINK }}>Simpan</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── KIOSK SETTINGS TAB ───────────────────────────────────────────────────────
function KioskSettingsTab() {
  const { cms, updateKioskSettings } = useCMS();
  const k = cms.kioskSettings;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
        Pengaturan ini berlaku untuk tampilan e-Kiosk di layar sentuh klinik.
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-800">Screensaver Idle</div>
          <div className="text-xs text-gray-500 mt-0.5">Screensaver akan muncul saat tidak ada aktivitas dalam waktu yang ditentukan</div>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Waktu Idle sebelum Screensaver (detik)" hint="Disarankan: 30–120 detik. Sentuh layar untuk membangunkan kiosk.">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={10}
                max={300}
                step={5}
                value={k.idleTimeoutSeconds}
                onChange={e => updateKioskSettings({ idleTimeoutSeconds: parseInt(e.target.value) })}
                className="flex-1"
                style={{ accentColor: PINK }}
              />
              <div
                className="w-20 text-center font-bold text-sm py-2 rounded-lg"
                style={{ background: `${PINK}15`, color: PINK }}
              >
                {k.idleTimeoutSeconds}d
              </div>
            </div>
          </Field>

          <div className="rounded-xl overflow-hidden border border-gray-100">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-500">Preview Screensaver</div>
            </div>
            <div
              className="relative flex flex-col items-center justify-center py-10 gap-3"
              style={{ background: 'linear-gradient(135deg,#F4F6FB,#FDF2F8,#ECFEFF)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg,${PINK},#FF6BB5,#D4A017)` }} />
              <div className="text-5xl">🦷</div>
              <div className="font-black text-4xl tracking-tight" style={{ color: '#0D1421' }}>HH : MM : SS</div>
              <div className="text-sm" style={{ color: '#9CA3AF' }}>Sabtu, 20 Juni 2026</div>
              <div
                className="mt-2 px-8 py-3 rounded-full text-white text-sm font-bold"
                style={{ background: `linear-gradient(135deg,${PINK},#FF6BB5)` }}
              >
                ✋ Sentuh Layar untuk Memulai
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminWebsite() {
  const [activeTab, setActiveTab] = useState<TabId>('hero');
  const { hasPermission } = useAuth();
  const { resetToDefaults } = useCMS();
  const [showReset, setShowReset] = useState(false);
  const [saved, setSaved] = useState(false);

  const canEdit = hasPermission('website.edit_hero') || hasPermission('website.edit_services') ||
    hasPermission('website.edit_appearance') || hasPermission('website.publish');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetToDefaults();
    setShowReset(false);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'hero': return <HeroTab />;
      case 'services': return <ServicesTab />;
      case 'doctors': return <DoctorsTab />;
      case 'promotions': return <PromotionsTab />;
      case 'articles': return <ArticlesTab />;
      case 'clinic': return <ClinicTab />;
      case 'about': return <AboutTab />;
      case 'contact': return <ContactTab />;
      case 'appearance': return <AppearanceTab />;
      case 'trust': return <TrustTab />;
      case 'testimonials': return <TestimonialsTab />;
      case 'faq': return <FaqTab />;
      case 'gallery': return <GalleryTab />;
      case 'kiosk': return <KioskSettingsTab />;
      default: return null;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Website</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola semua konten dan tampilan website publik</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all"
          >
            <ExternalLink size={14} /> Preview Website
          </a>
          <button
            onClick={() => setShowReset(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-sm text-red-500 hover:bg-red-50 transition-all"
          >
            <RotateCcw size={14} /> Reset Default
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-white text-sm font-medium transition-all"
            style={{ background: saved ? '#22C55E' : PINK }}
          >
            {saved ? <><Check size={14} /> Tersimpan!</> : <><Save size={14} /> Simpan</>}
          </button>
        </div>
      </div>

      {!canEdit && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 mb-6">
          Anda hanya memiliki akses baca. Hubungi administrator untuk mendapat akses edit.
        </div>
      )}

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === tab.id
                  ? 'text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              style={activeTab === tab.id ? { background: PINK } : {}}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      >
        {renderTab()}
      </motion.div>

      {/* Reset Confirm Modal */}
      <AnimatePresence>
        {showReset && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            >
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RotateCcw size={24} className="text-red-500" />
                </div>
                <div className="font-semibold text-gray-800 text-lg">Reset Semua Konten?</div>
                <p className="text-sm text-gray-500 mt-1">Semua perubahan akan dikembalikan ke data bawaan. Tindakan ini tidak bisa dibatalkan.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowReset(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
                <button onClick={handleReset} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium bg-red-500 hover:bg-red-600 transition-all">Ya, Reset</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
