import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Check, Pencil, Trash2, X, User,
  ChevronRight, Users,
} from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import type { MobileState } from '../../../types';

interface MobileFamilyProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  dob: string;
  gender: 'M' | 'F';
  medicalRecordNo: string;
  isActive: boolean;
  color: string;
}

const RELATION_OPTIONS = ['Ayah', 'Ibu', 'Suami', 'Istri', 'Anak', 'Kakak', 'Adik', 'Kakek', 'Nenek', 'Lainnya'];

const AVATAR_COLORS = ['#E91E8C', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

const INITIAL_MEMBERS: FamilyMember[] = [
  {
    id: 'self',
    name: 'Budi Santoso',
    relation: 'Saya',
    dob: '1990-05-15',
    gender: 'M',
    medicalRecordNo: 'RM-2024-001',
    isActive: true,
    color: '#E91E8C',
  },
  {
    id: 'f1',
    name: 'Sari Santoso',
    relation: 'Istri',
    dob: '1992-08-22',
    gender: 'F',
    medicalRecordNo: 'RM-2024-045',
    isActive: false,
    color: '#3B82F6',
  },
  {
    id: 'f2',
    name: 'Dino Santoso',
    relation: 'Anak',
    dob: '2018-03-10',
    gender: 'M',
    medicalRecordNo: 'RM-2024-089',
    isActive: false,
    color: '#10B981',
  },
];

function calcAge(dob: string) {
  const birth = new Date(dob);
  const now = new Date();
  const age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  return m < 0 || (m === 0 && now.getDate() < birth.getDate()) ? age - 1 : age;
}

type ModalMode = 'add' | 'edit' | null;

export function MobileFamily({ state, setState }: MobileFamilyProps) {
  const [members, setMembers] = useState<FamilyMember[]>(INITIAL_MEMBERS);
  const [modal, setModal] = useState<ModalMode>(null);
  const [editTarget, setEditTarget] = useState<FamilyMember | null>(null);
  const [form, setForm] = useState({ name: '', relation: 'Anak', dob: '', gender: 'M' as 'M' | 'F' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const PINK = '#E91E8C';

  const openAdd = () => {
    setForm({ name: '', relation: 'Anak', dob: '', gender: 'M' });
    setEditTarget(null);
    setModal('add');
  };

  const openEdit = (member: FamilyMember) => {
    setForm({ name: member.name, relation: member.relation, dob: member.dob, gender: member.gender });
    setEditTarget(member);
    setModal('edit');
  };

  const closeModal = () => { setModal(null); setEditTarget(null); };

  const saveForm = () => {
    if (!form.name.trim() || !form.dob) return;
    if (modal === 'add') {
      const newMember: FamilyMember = {
        id: `f${Date.now()}`,
        name: form.name.trim(),
        relation: form.relation,
        dob: form.dob,
        gender: form.gender,
        medicalRecordNo: `RM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
        isActive: false,
        color: AVATAR_COLORS[members.length % AVATAR_COLORS.length],
      };
      setMembers(prev => [...prev, newMember]);
    } else if (modal === 'edit' && editTarget) {
      setMembers(prev => prev.map(m =>
        m.id === editTarget.id
          ? { ...m, name: form.name.trim(), relation: form.relation, dob: form.dob, gender: form.gender }
          : m,
      ));
    }
    closeModal();
  };

  const switchActive = (id: string) => {
    setMembers(prev => prev.map(m => ({ ...m, isActive: m.id === id })));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    setDeleteConfirm(null);
  };

  const activeMember = members.find(m => m.isActive) ?? members[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
      style={{ background: '#F8F9FA' }}
    >
      <MobileHeader
        title="Profil Keluarga"
        showBack
        onBack={() => setState({ screen: 'profile' })}
        rightAction={
          <button
            onClick={openAdd}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{ background: PINK }}
          >
            <Plus size={16} color="white" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 flex flex-col gap-4">
        {/* Active member banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 text-white"
          style={{ background: `linear-gradient(135deg, ${activeMember?.color ?? PINK}, ${activeMember?.color ?? PINK}CC)` }}
        >
          <p className="text-xs font-bold opacity-70 mb-2 uppercase tracking-wider">Profil Aktif</p>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.5)' }}
            >
              {activeMember?.name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-black">{activeMember?.name}</p>
              <p className="text-sm opacity-80">{activeMember?.relation} · {calcAge(activeMember?.dob ?? '')} tahun</p>
              <p className="text-xs opacity-60 mt-0.5">📋 {activeMember?.medicalRecordNo}</p>
            </div>
          </div>
        </motion.div>

        {/* Member count info */}
        <div className="flex items-center gap-2">
          <Users size={14} style={{ color: '#9CA3AF' }} />
          <p className="text-xs" style={{ color: '#9CA3AF' }}>
            {members.length} anggota keluarga · Ketuk untuk beralih profil
          </p>
        </div>

        {/* Members list */}
        <div className="flex flex-col gap-3">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: member.isActive ? `0 4px 16px ${member.color}30` : '0 2px 8px rgba(0,0,0,0.05)',
                border: member.isActive ? `2px solid ${member.color}` : '2px solid transparent',
              }}
            >
              <button
                onClick={() => switchActive(member.id)}
                className="w-full flex items-center gap-4 px-4 py-4 text-left transition-all active:bg-gray-50"
              >
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-black flex-shrink-0"
                  style={{ background: member.color }}
                >
                  {member.name[0].toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm" style={{ color: '#1A1A2E' }}>{member.name}</p>
                    {member.isActive && (
                      <span
                        className="text-[9px] font-black px-1.5 py-0.5 rounded-full text-white"
                        style={{ background: member.color }}
                      >
                        AKTIF
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                    {member.relation} · {calcAge(member.dob)} tahun · {member.gender === 'M' ? 'Laki-laki' : 'Perempuan'}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#9CA3AF' }}>
                    {member.medicalRecordNo}
                  </p>
                </div>

                {/* Active check or arrow */}
                {member.isActive ? (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: member.color }}
                  >
                    <Check size={16} color="white" />
                  </div>
                ) : (
                  <ChevronRight size={16} style={{ color: '#D1D5DB' }} className="flex-shrink-0" />
                )}
              </button>

              {/* Actions (only non-self can be edited/deleted) */}
              {member.id !== 'self' && (
                <div
                  className="flex items-center gap-2 px-4 py-2"
                  style={{ borderTop: '1px solid #F3F4F6' }}
                >
                  <button
                    onClick={() => openEdit(member)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                    style={{ background: '#F3F4F6', color: '#6B7280' }}
                  >
                    <Pencil size={11} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(member.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                    style={{ background: '#FEF2F2', color: '#EF4444' }}
                  >
                    <Trash2 size={11} />
                    Hapus
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Add button */}
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-2 border-dashed transition-all active:scale-[0.98]"
          style={{ borderColor: '#FECDD3', color: PINK }}
        >
          <Plus size={18} />
          <span className="text-sm font-bold">Tambah Anggota Keluarga</span>
        </button>

        <p className="text-center text-xs px-4" style={{ color: '#9CA3AF' }}>
          Maksimal 6 profil keluarga. Profil aktif digunakan untuk booking dan rekam medis.
        </p>
      </div>

      {/* Add/Edit modal */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={closeModal}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white px-5 pt-5 pb-8"
              style={{ boxShadow: '0 -8px 40px rgba(0,0,0,0.15)' }}
            >
              {/* Handle */}
              <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5" />
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-black" style={{ color: '#1A1A2E' }}>
                  {modal === 'add' ? 'Tambah Anggota' : 'Edit Anggota'}
                </h3>
                <button onClick={closeModal} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <X size={14} style={{ color: '#6B7280' }} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-bold mb-1 block" style={{ color: '#6B7280' }}>NAMA LENGKAP</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Nama anggota keluarga"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{ borderColor: '#E5E7EB', color: '#1A1A2E' }}
                    onFocus={e => (e.target.style.borderColor = PINK)}
                    onBlur={e => (e.target.style.borderColor = '#E5E7EB')}
                  />
                </div>

                {/* Relation */}
                <div>
                  <label className="text-xs font-bold mb-1 block" style={{ color: '#6B7280' }}>HUBUNGAN</label>
                  <select
                    value={form.relation}
                    onChange={e => setForm(f => ({ ...f, relation: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none appearance-none"
                    style={{ borderColor: '#E5E7EB', color: '#1A1A2E', background: 'white' }}
                  >
                    {RELATION_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* DOB + Gender row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold mb-1 block" style={{ color: '#6B7280' }}>TGL LAHIR</label>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                      className="w-full px-3 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: '#E5E7EB', color: '#1A1A2E' }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-1 block" style={{ color: '#6B7280' }}>JENIS KELAMIN</label>
                    <div className="flex gap-2">
                      {(['M', 'F'] as const).map(g => (
                        <button
                          key={g}
                          onClick={() => setForm(f => ({ ...f, gender: g }))}
                          className="flex-1 py-3 rounded-xl text-xs font-bold border transition-all"
                          style={
                            form.gender === g
                              ? { background: PINK, color: 'white', borderColor: PINK }
                              : { background: 'white', color: '#6B7280', borderColor: '#E5E7EB' }
                          }
                        >
                          {g === 'M' ? 'L' : 'P'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={saveForm}
                  disabled={!form.name.trim() || !form.dob}
                  className="w-full py-4 rounded-xl font-black text-sm text-white transition-all active:scale-[0.97] disabled:opacity-50"
                  style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
                >
                  {modal === 'add' ? 'Tambahkan' : 'Simpan Perubahan'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setDeleteConfirm(null)}
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute inset-0 z-50 flex items-center justify-center px-8"
            >
              <div className="bg-white rounded-2xl p-6 w-full" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: '#FEF2F2' }}
                >
                  <Trash2 size={22} style={{ color: '#EF4444' }} />
                </div>
                <h3 className="text-center font-black text-base mb-1" style={{ color: '#1A1A2E' }}>Hapus Anggota?</h3>
                <p className="text-center text-sm mb-5" style={{ color: '#6B7280' }}>
                  Data {members.find(m => m.id === deleteConfirm)?.name} akan dihapus dari daftar keluarga Anda.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-3 rounded-xl font-bold text-sm border transition-all active:scale-95"
                    style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => deleteMember(deleteConfirm)}
                    className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-95"
                    style={{ background: '#EF4444' }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
