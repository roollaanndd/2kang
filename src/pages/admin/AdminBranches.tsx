/* eslint-disable */
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Plus, Pencil, Trash2, X, Building2, Phone, Clock,
  Image as ImageIcon, ToggleLeft, ToggleRight, CheckCircle2, AlertCircle,
  Upload, Eye,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import type { ClinicBranch } from '../../types';

const PINK = '#E91E8C';
const GREEN = '#10B981';
const RED = '#EF4444';

const EMPTY_FORM: Omit<ClinicBranch, 'id'> = {
  name: '',
  city: '',
  address: '',
  phone: '',
  whatsapp: '',
  hours: 'Sen–Sab: 08:00–20:00',
  image: null,
  isActive: true,
};

function BranchCard({ branch, idx, onEdit, onDelete, onToggle }: {
  branch: ClinicBranch;
  idx: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const palettes: [string, string][] = [
    ['#E91E8C', '#FF6BB5'],
    ['#D4A017', '#22D3EE'],
    ['#8B5CF6', '#C4B5FD'],
    ['#F59E0B', '#FCD34D'],
  ];
  const [g1, g2] = palettes[idx % palettes.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)', opacity: branch.isActive ? 1 : 0.65 }}
    >
      {/* Image / Illustration header */}
      <div style={{ height: 130, position: 'relative', overflow: 'hidden' }}>
        {branch.image ? (
          <img src={branch.image} alt={branch.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(135deg, ${g1}18, ${g2}28)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, margin: '0 auto 6px',
                background: `linear-gradient(135deg, ${g1}, ${g2})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 6px 18px ${g1}40`,
              }}>
                <Building2 size={22} color="white" />
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, color: g1 }}>Belum ada foto</p>
            </div>
          </div>
        )}
        {/* Status chip */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          padding: '4px 10px', borderRadius: 20,
          fontSize: 10, fontWeight: 700,
          background: branch.isActive ? '#D1FAE5' : '#FEE2E2',
          color: branch.isActive ? '#065F46' : '#991B1B',
        }}>
          {branch.isActive ? '● Aktif' : '● Nonaktif'}
        </div>
        {/* City chip */}
        <div style={{
          position: 'absolute', bottom: 10, left: 10,
          padding: '4px 10px', borderRadius: 20,
          fontSize: 9, fontWeight: 800, background: 'white',
          color: '#374151', letterSpacing: '0.04em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}>
          {branch.city}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="font-bold text-sm mb-3" style={{ color: '#1A1A2E' }}>{branch.name}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2">
            <MapPin size={12} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs leading-snug" style={{ color: '#6B7280' }}>{branch.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-gray-400 flex-shrink-0" />
            <p className="text-xs" style={{ color: '#6B7280' }}>{branch.phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-gray-400 flex-shrink-0" />
            <p className="text-xs" style={{ color: '#6B7280' }}>{branch.hours}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3" style={{ borderTop: '1px solid #F3F4F6' }}>
          <button
            onClick={onToggle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            style={{
              background: branch.isActive ? '#FEE2E2' : '#D1FAE5',
              color: branch.isActive ? RED : GREEN,
            }}
          >
            {branch.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
            {branch.isActive ? 'Nonaktifkan' : 'Aktifkan'}
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            style={{ background: '#EFF6FF', color: '#2563EB' }}
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ml-auto"
            style={{ background: '#FEF2F2', color: RED }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Image Upload Widget ──────────────────────────────────────────────────────
function ImageUpload({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      onChange(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (ref.current) ref.current.value = '';
  };

  return (
    <div>
      <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>
        Foto / Ilustrasi Klinik
      </label>
      <input ref={ref} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {preview ? (
        <div className="relative rounded-xl overflow-hidden" style={{ height: 140 }}>
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => ref.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Upload size={13} /> Ganti
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: 'rgba(239,68,68,0.7)' }}
            >
              <X size={13} /> Hapus
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors"
          style={{ height: 120, borderColor: '#E5E7EB', background: '#FAFAFA' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = PINK; e.currentTarget.style.background = '#FFF8F4'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#FAFAFA'; }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FCE7F3' }}>
            <ImageIcon size={18} style={{ color: PINK }} />
          </div>
          <p className="text-xs font-semibold" style={{ color: '#6B7280' }}>
            Klik untuk upload foto klinik
          </p>
          <p className="text-[10px]" style={{ color: '#9CA3AF' }}>PNG, JPG, WEBP (maks. 5MB)</p>
        </button>
      )}
    </div>
  );
}

// ── Form Field ───────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#374151' }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
      style={{ borderColor: '#E5E7EB', color: '#1A1A2E' }}
      onFocus={e => { e.currentTarget.style.borderColor = PINK; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(233,30,140,0.1)'; }}
      onBlur={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
    />
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function AdminBranches() {
  const { cms, updateBranches } = useCMS();
  const branches = cms.branches?.items ?? [];

  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<ClinicBranch, 'id'>>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<ClinicBranch | null>(null);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setModalMode('add');
  };

  const openEdit = (branch: ClinicBranch) => {
    setForm({
      name: branch.name, city: branch.city, address: branch.address,
      phone: branch.phone, whatsapp: branch.whatsapp, hours: branch.hours,
      image: branch.image, isActive: branch.isActive,
    });
    setEditId(branch.id);
    setModalMode('edit');
  };

  const closeModal = () => { setModalMode(null); setEditId(null); };

  const handleSave = () => {
    if (!form.name.trim() || !form.city.trim() || !form.address.trim()) return;
    let next: ClinicBranch[];
    if (modalMode === 'add') {
      const newBranch: ClinicBranch = { ...form, id: `b${Date.now()}` };
      next = [...branches, newBranch];
    } else {
      next = branches.map(b => b.id === editId ? { ...b, ...form } : b);
    }
    updateBranches({ items: next });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    closeModal();
  };

  const handleToggle = (id: string) => {
    const next = branches.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b);
    updateBranches({ items: next });
  };

  const handleDelete = (branch: ClinicBranch) => setDeleteTarget(branch);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const next = branches.filter(b => b.id !== deleteTarget.id);
    updateBranches({ items: next });
    setDeleteTarget(null);
  };

  const activeCount = branches.filter(b => b.isActive).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lokasi Cabang</h1>
          <p className="text-sm text-gray-500 mt-1">
            {branches.length} cabang terdaftar · {activeCount} aktif
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
                style={{ background: '#D1FAE5', color: GREEN }}
              >
                <CheckCircle2 size={16} /> Tersimpan
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)`, boxShadow: '0 4px 14px rgba(233,30,140,0.3)' }}
          >
            <Plus size={16} /> Tambah Cabang
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl mb-6" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
        <Eye size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          Perubahan di sini akan langsung muncul di aplikasi mobile pada menu <strong>Pilih Lokasi Klinik</strong> saat pasien melakukan booking.
          Upload foto klinik agar tampilan lebih menarik.
        </p>
      </div>

      {/* Branch cards grid */}
      {branches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#FCE7F3' }}>
            <Building2 size={28} style={{ color: PINK }} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Belum Ada Cabang</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Tambahkan lokasi cabang OMDC Dental agar pasien bisa memilih klinik terdekat saat booking.
          </p>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
          >
            <Plus size={16} /> Tambah Cabang Pertama
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {branches.map((branch, i) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                idx={i}
                onEdit={() => openEdit(branch)}
                onDelete={() => handleDelete(branch)}
                onToggle={() => handleToggle(branch.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Add / Edit Modal ── */}
      <AnimatePresence>
        {modalMode && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#FCE7F3' }}>
                      <Building2 size={18} style={{ color: PINK }} />
                    </div>
                    <h2 className="text-base font-bold text-gray-900">
                      {modalMode === 'add' ? 'Tambah Cabang Baru' : 'Edit Cabang'}
                    </h2>
                  </div>
                  <button onClick={closeModal} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <X size={16} className="text-gray-500" />
                  </button>
                </div>

                {/* Modal body */}
                <div className="px-6 py-5 space-y-4">
                  {/* Image upload first — most visual */}
                  <ImageUpload
                    value={form.image}
                    onChange={v => update('image', v)}
                  />

                  <Field label="Nama Cabang">
                    <Input value={form.name} onChange={v => update('name', v)} placeholder="OMDC Dental Jakarta Selatan" />
                  </Field>

                  <Field label="Kota">
                    <Input value={form.city} onChange={v => update('city', v)} placeholder="Jakarta Selatan" />
                  </Field>

                  <Field label="Alamat Lengkap">
                    <textarea
                      value={form.address}
                      onChange={e => update('address', e.target.value)}
                      placeholder="Jl. Contoh No. 123, Kecamatan, Kota..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all resize-none"
                      style={{ borderColor: '#E5E7EB', color: '#1A1A2E' }}
                      onFocus={e => { e.currentTarget.style.borderColor = PINK; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#E5E7EB'; }}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Telepon">
                      <Input value={form.phone} onChange={v => update('phone', v)} placeholder="(021) 1234-5678" type="tel" />
                    </Field>
                    <Field label="WhatsApp">
                      <Input value={form.whatsapp} onChange={v => update('whatsapp', v)} placeholder="+62 812-xxxx" type="tel" />
                    </Field>
                  </div>

                  <Field label="Jam Operasional">
                    <Input value={form.hours} onChange={v => update('hours', v)} placeholder="Sen–Sab: 08:00–20:00" />
                  </Field>

                  {/* Active toggle */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: '#F8F9FB' }}>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Status Aktif</p>
                      <p className="text-xs text-gray-500">Cabang ini tampil di aplikasi mobile</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => update('isActive', !form.isActive)}
                      className="relative w-12 h-6 rounded-full transition-colors"
                      style={{ background: form.isActive ? PINK : '#D1D5DB' }}
                    >
                      <motion.div
                        animate={{ x: form.isActive ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      />
                    </button>
                  </div>
                </div>

                {/* Modal footer */}
                <div className="px-6 pb-6 flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 rounded-xl border text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#E5E7EB' }}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!form.name.trim() || !form.city.trim() || !form.address.trim()}
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
                    style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)`, boxShadow: '0 6px 18px rgba(233,30,140,0.3)' }}
                  >
                    {modalMode === 'add' ? 'Tambah Cabang' : 'Simpan Perubahan'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Delete Confirm ── */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm pointer-events-auto" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#FEF2F2' }}>
                  <AlertCircle size={26} style={{ color: RED }} />
                </div>
                <h3 className="text-center font-bold text-gray-900 mb-2">Hapus Cabang?</h3>
                <p className="text-center text-sm text-gray-500 mb-5">
                  <strong>{deleteTarget.name}</strong> akan dihapus dari daftar lokasi dan tidak lagi muncul di aplikasi mobile.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="flex-1 py-3 rounded-xl border text-sm font-semibold text-gray-600"
                    style={{ borderColor: '#E5E7EB' }}
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: RED }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
