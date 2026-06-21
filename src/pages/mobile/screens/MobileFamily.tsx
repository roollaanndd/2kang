import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Check, Pencil, Trash2, X, Users,
  UserPlus, Crown, AlertTriangle, BadgeCheck,
} from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileFamilyProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

type Relation = 'Suami' | 'Istri' | 'Anak' | 'Orang Tua';
type Gender = 'M' | 'F';

interface FamilyMember {
  id: string;
  name: string;
  relation: Relation;
  dob: string;
  gender: Gender;
  medicalRecordNo: string;
  isPrimary: boolean;
}

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const INK = '#111827';
const GREY = '#6B7280';
const GREY_LT = '#9CA3AF';

const RELATIONS: Relation[] = ['Suami', 'Istri', 'Anak', 'Orang Tua'];

// Per-member gradient pairs for the monogram avatars (light, brand-aligned).
const GRADIENTS: [string, string][] = [
  [PINK, ROSE],
  [AQUA, '#22D3EE'],
  ['#8B5CF6', '#C4B5FD'],
  ['#F59E0B', '#FCD34D'],
  ['#10B981', '#6EE7B7'],
  ['#3B82F6', '#93C5FD'],
];

function gradientFor(id: string): [string, string] {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

function monogram(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function calcAge(dob: string): number {
  if (!dob) return 0;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return 0;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1;
  return Math.max(0, age);
}

const INITIAL_MEMBERS: FamilyMember[] = [
  {
    id: 'self',
    name: 'Budi Santoso',
    relation: 'Suami',
    dob: '1990-05-15',
    gender: 'M',
    medicalRecordNo: 'RM-2024-001',
    isPrimary: true,
  },
  {
    id: 'f1',
    name: 'Sari Santoso',
    relation: 'Istri',
    dob: '1992-08-22',
    gender: 'F',
    medicalRecordNo: 'RM-2024-045',
    isPrimary: false,
  },
  {
    id: 'f2',
    name: 'Dino Santoso',
    relation: 'Anak',
    dob: '2018-03-10',
    gender: 'M',
    medicalRecordNo: 'RM-2024-089',
    isPrimary: false,
  },
];

interface FormState {
  name: string;
  relation: Relation;
  dob: string;
  gender: Gender;
}

const EMPTY_FORM: FormState = { name: '', relation: 'Anak', dob: '', gender: 'M' };

const SHEET_SPRING = { type: 'spring' as const, stiffness: 340, damping: 36 };

export function MobileFamily({ setState }: MobileFamilyProps) {
  const [members, setMembers] = useState<FamilyMember[]>(INITIAL_MEMBERS);
  const [activeId, setActiveId] = useState<string>('self');

  const [formMode, setFormMode] = useState<'add' | 'edit' | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const [actionTarget, setActionTarget] = useState<FamilyMember | null>(null);
  const [editTargetId, setEditTargetId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FamilyMember | null>(null);

  const activeMember = useMemo(
    () => members.find(m => m.id === activeId) ?? members[0],
    [members, activeId],
  );

  // ---- form helpers ----
  const openAdd = () => {
    haptic('light');
    setForm(EMPTY_FORM);
    setErrors({});
    setEditTargetId(null);
    setFormMode('add');
  };

  const openEdit = (member: FamilyMember) => {
    haptic('light');
    setActionTarget(null);
    setForm({ name: member.name, relation: member.relation, dob: member.dob, gender: member.gender });
    setErrors({});
    setEditTargetId(member.id);
    setFormMode('edit');
  };

  const closeForm = () => {
    setFormMode(null);
    setEditTargetId(null);
  };

  const validate = (f: FormState): Partial<Record<keyof FormState, string>> => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!f.name.trim()) e.name = 'Nama wajib diisi';
    else if (f.name.trim().length < 2) e.name = 'Nama terlalu pendek';
    if (!f.dob) e.dob = 'Tanggal lahir wajib diisi';
    else if (new Date(f.dob).getTime() > Date.now()) e.dob = 'Tanggal tidak valid';
    return e;
  };

  const submitForm = () => {
    const e = validate(form);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      haptic('warning');
      return;
    }
    if (formMode === 'add') {
      const newMember: FamilyMember = {
        id: `f${Date.now()}`,
        name: form.name.trim(),
        relation: form.relation,
        dob: form.dob,
        gender: form.gender,
        medicalRecordNo: `RM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
        isPrimary: false,
      };
      setMembers(prev => [...prev, newMember]);
    } else if (formMode === 'edit' && editTargetId) {
      setMembers(prev => prev.map(m =>
        m.id === editTargetId
          ? { ...m, name: form.name.trim(), relation: form.relation, dob: form.dob, gender: form.gender }
          : m,
      ));
    }
    haptic('success');
    closeForm();
  };

  // ---- member actions ----
  const makeActive = (member: FamilyMember) => {
    haptic('selection');
    setActiveId(member.id);
    setActionTarget(null);
  };

  const confirmDelete = () => {
    if (!deleteTarget || deleteTarget.isPrimary) return;
    haptic('success');
    setMembers(prev => prev.filter(m => m.id !== deleteTarget.id));
    if (activeId === deleteTarget.id) setActiveId('self');
    setDeleteTarget(null);
    setActionTarget(null);
  };

  const isEmpty = members.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.28 }}
      className="relative flex flex-col h-full"
      style={{ background: '#F8F9FB' }}
    >
      <MobileHeader
        title="Anggota Keluarga"
        showBack
        onBack={() => { haptic('light'); setState({ screen: 'profile' }); }}
      />

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28">
        {isEmpty ? (
          <EmptyState onAdd={openAdd} />
        ) : (
          <>
            {/* Active profile banner */}
            {activeMember && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl p-5 mb-5 text-white"
                style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE})` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck size={14} className="opacity-90" />
                  <p className="text-[11px] font-bold uppercase tracking-widest opacity-90">
                    Profil Aktif untuk Booking
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.45)' }}
                  >
                    {monogram(activeMember.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-black truncate">{activeMember.name}</p>
                    <p className="text-sm opacity-90">
                      {activeMember.relation} · {calcAge(activeMember.dob)} tahun
                    </p>
                    <p className="text-[11px] opacity-75 mt-0.5">{activeMember.medicalRecordNo}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <Users size={14} style={{ color: GREY_LT }} />
              <p className="text-xs" style={{ color: GREY_LT }}>
                {members.length} anggota · Ketuk kartu untuk kelola
              </p>
            </div>

            {/* Member cards */}
            <div className="flex flex-col gap-3">
              {members.map((member, i) => {
                const [g1, g2] = gradientFor(member.id);
                const active = member.id === activeId;
                return (
                  <motion.button
                    key={member.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { haptic('light'); setActionTarget(member); }}
                    className="w-full flex items-center gap-4 bg-white rounded-2xl px-4 py-4 text-left"
                    style={{
                      boxShadow: active ? `0 6px 20px ${PINK}26` : '0 2px 10px rgba(17,24,39,0.05)',
                      border: active ? `1.5px solid ${PINK}` : '1.5px solid #EEF0F4',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-base font-black flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
                    >
                      {monogram(member.name)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-bold text-sm truncate" style={{ color: INK }}>{member.name}</p>
                        {member.isPrimary && (
                          <span
                            className="inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded-full"
                            style={{ background: '#FCE7F3', color: PINK }}
                          >
                            <Crown size={9} /> AKUN UTAMA
                          </span>
                        )}
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: GREY }}>
                        {member.relation} · {calcAge(member.dob)} th · {member.gender === 'M' ? 'Laki-laki' : 'Perempuan'}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: GREY_LT }}>{member.medicalRecordNo}</p>
                    </div>

                    {active ? (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: PINK }}
                      >
                        <Check size={15} color="white" />
                      </div>
                    ) : (
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ background: '#F3F4F6', color: GREY }}
                      >
                        Aktifkan
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <p className="text-center text-[11px] px-6 mt-5 leading-relaxed" style={{ color: GREY_LT }}>
              Profil aktif digunakan untuk booking & rekam medis. Akun utama tidak dapat dihapus.
            </p>
          </>
        )}
      </div>

      {/* Floating add button */}
      {!isEmpty && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAdd}
          className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm text-white"
          style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, boxShadow: `0 8px 24px ${PINK}40` }}
        >
          <Plus size={18} />
          Tambah Anggota
        </motion.button>
      )}

      {/* ---- Action sheet ---- */}
      <AnimatePresence>
        {actionTarget && (
          <Overlay onClose={() => setActionTarget(null)}>
            <BottomSheet>
              <SheetHandle />
              {(() => {
                const [g1, g2] = gradientFor(actionTarget.id);
                return (
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-base font-black flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
                    >
                      {monogram(actionTarget.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-sm truncate" style={{ color: INK }}>{actionTarget.name}</p>
                      <p className="text-xs" style={{ color: GREY }}>
                        {actionTarget.relation} · {calcAge(actionTarget.dob)} tahun
                      </p>
                    </div>
                  </div>
                );
              })()}

              <div className="flex flex-col gap-2">
                {actionTarget.id !== activeId && (
                  <SheetAction
                    icon={<BadgeCheck size={18} />}
                    label="Jadikan Akun Aktif"
                    color={PINK}
                    onClick={() => makeActive(actionTarget)}
                  />
                )}
                <SheetAction
                  icon={<Pencil size={18} />}
                  label="Edit Detail"
                  color={AQUA}
                  onClick={() => openEdit(actionTarget)}
                />
                <SheetAction
                  icon={<Trash2 size={18} />}
                  label={actionTarget.isPrimary ? 'Akun utama tidak bisa dihapus' : 'Hapus Anggota'}
                  color="#EF4444"
                  disabled={actionTarget.isPrimary}
                  onClick={() => {
                    if (actionTarget.isPrimary) { haptic('warning'); return; }
                    haptic('light');
                    setDeleteTarget(actionTarget);
                    setActionTarget(null);
                  }}
                />
              </div>
            </BottomSheet>
          </Overlay>
        )}
      </AnimatePresence>

      {/* ---- Add / Edit form sheet ---- */}
      <AnimatePresence>
        {formMode && (
          <Overlay onClose={closeForm}>
            <BottomSheet>
              <SheetHandle />
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <UserPlus size={18} style={{ color: PINK }} />
                  <h3 className="text-base font-black" style={{ color: INK }}>
                    {formMode === 'add' ? 'Tambah Anggota' : 'Edit Anggota'}
                  </h3>
                </div>
                <button
                  onClick={closeForm}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <X size={15} style={{ color: GREY }} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="text-[11px] font-bold mb-1.5 block tracking-wide" style={{ color: GREY }}>
                    NAMA LENGKAP
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(x => ({ ...x, name: undefined })); }}
                    placeholder="Nama anggota keluarga"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ borderColor: errors.name ? '#EF4444' : '#E5E7EB', color: INK }}
                    onFocus={e => { if (!errors.name) e.target.style.borderColor = PINK; }}
                    onBlur={e => { if (!errors.name) e.target.style.borderColor = '#E5E7EB'; }}
                  />
                  {errors.name && <p className="text-[11px] mt-1" style={{ color: '#EF4444' }}>{errors.name}</p>}
                </div>

                {/* Relation */}
                <div>
                  <label className="text-[11px] font-bold mb-1.5 block tracking-wide" style={{ color: GREY }}>
                    HUBUNGAN
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {RELATIONS.map(r => {
                      const sel = form.relation === r;
                      return (
                        <button
                          key={r}
                          onClick={() => { haptic('selection'); setForm(f => ({ ...f, relation: r })); }}
                          className="py-2.5 rounded-xl text-[11px] font-bold border transition-colors"
                          style={sel
                            ? { background: PINK, color: 'white', borderColor: PINK }
                            : { background: 'white', color: GREY, borderColor: '#E5E7EB' }}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* DOB */}
                <div>
                  <label className="text-[11px] font-bold mb-1.5 block tracking-wide" style={{ color: GREY }}>
                    TANGGAL LAHIR
                  </label>
                  <input
                    type="date"
                    value={form.dob}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={e => { setForm(f => ({ ...f, dob: e.target.value })); setErrors(x => ({ ...x, dob: undefined })); }}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ borderColor: errors.dob ? '#EF4444' : '#E5E7EB', color: INK }}
                  />
                  {errors.dob && <p className="text-[11px] mt-1" style={{ color: '#EF4444' }}>{errors.dob}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label className="text-[11px] font-bold mb-1.5 block tracking-wide" style={{ color: GREY }}>
                    JENIS KELAMIN
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['M', 'F'] as const).map(g => {
                      const sel = form.gender === g;
                      return (
                        <button
                          key={g}
                          onClick={() => { haptic('selection'); setForm(f => ({ ...f, gender: g })); }}
                          className="py-3 rounded-xl text-sm font-bold border transition-colors"
                          style={sel
                            ? { background: AQUA, color: 'white', borderColor: AQUA }
                            : { background: 'white', color: GREY, borderColor: '#E5E7EB' }}
                        >
                          {g === 'M' ? 'Laki-laki' : 'Perempuan'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={submitForm}
                  className="w-full py-4 rounded-xl font-black text-sm text-white mt-1"
                  style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, boxShadow: `0 6px 18px ${PINK}33` }}
                >
                  {formMode === 'add' ? 'Tambahkan Anggota' : 'Simpan Perubahan'}
                </motion.button>
              </div>
            </BottomSheet>
          </Overlay>
        )}
      </AnimatePresence>

      {/* ---- Delete confirm ---- */}
      <AnimatePresence>
        {deleteTarget && (
          <Overlay onClose={() => setDeleteTarget(null)}>
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={SHEET_SPRING}
              onClick={e => e.stopPropagation()}
              className="absolute inset-0 z-50 flex items-center justify-center px-8 pointer-events-none"
            >
              <div
                className="bg-white rounded-3xl p-6 w-full pointer-events-auto"
                style={{ boxShadow: '0 12px 48px rgba(17,24,39,0.22)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: '#FEF2F2' }}
                >
                  <AlertTriangle size={24} style={{ color: '#EF4444' }} />
                </div>
                <h3 className="text-center font-black text-base mb-1.5" style={{ color: INK }}>
                  Hapus {deleteTarget.name}?
                </h3>
                <p className="text-center text-sm mb-5 leading-relaxed" style={{ color: GREY }}>
                  Data {deleteTarget.relation.toLowerCase()} ini akan dihapus dari daftar keluarga Anda.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { haptic('light'); setDeleteTarget(null); }}
                    className="flex-1 py-3 rounded-xl font-bold text-sm border active:scale-95 transition-transform"
                    style={{ borderColor: '#E5E7EB', color: GREY }}
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 py-3 rounded-xl font-bold text-sm text-white active:scale-95 transition-transform"
                    style={{ background: '#EF4444' }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </Overlay>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---- Reusable subcomponents ----

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-40"
        style={{ background: 'rgba(17,24,39,0.4)' }}
        onClick={onClose}
      />
      {children}
    </>
  );
}

function BottomSheet({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={SHEET_SPRING}
      onClick={e => e.stopPropagation()}
      className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white px-5 pt-3 pb-7"
      style={{ boxShadow: '0 -8px 40px rgba(17,24,39,0.16)' }}
    >
      {children}
    </motion.div>
  );
}

function SheetHandle() {
  return <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />;
}

function SheetAction({
  icon, label, color, onClick, disabled,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left text-sm font-bold"
      style={{
        background: disabled ? '#F9FAFB' : '#F8F9FB',
        color: disabled ? GREY_LT : color,
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <span style={{ color: disabled ? GREY_LT : color }}>{icon}</span>
      {label}
    </motion.button>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center h-full pt-20 px-6"
    >
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
        style={{ background: '#FCE7F3' }}
      >
        <Users size={34} style={{ color: PINK }} />
      </div>
      <h3 className="text-lg font-black mb-1.5" style={{ color: INK }}>Belum Ada Anggota</h3>
      <p className="text-sm mb-6 leading-relaxed" style={{ color: GREY }}>
        Tambahkan anggota keluarga untuk mengelola booking dan rekam medis mereka dalam satu akun.
      </p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAdd}
        className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm text-white"
        style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, boxShadow: `0 8px 24px ${PINK}40` }}
      >
        <Plus size={18} />
        Tambah Anggota
      </motion.button>
    </motion.div>
  );
}
