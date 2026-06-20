/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit3, Trash2, X, Check, Shield, ChevronDown, ChevronRight, AlertTriangle, Copy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PERMISSION_MODULES, ALL_PERMISSIONS } from '../../data/permissions';
import type { Role } from '../../data/defaultRoles';

const PINK = '#E91E8C';

const ROLE_COLORS = ['#E91E8C','#7C3AED','#1D4ED8','#059669','#D97706','#EF4444','#0891B2','#4F46E5','#0F766E','#9333EA','#DC2626','#65A30D'];

function PermissionPicker({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleModule = (moduleKey: string) => {
    setExpanded(prev => prev.includes(moduleKey) ? prev.filter(k => k !== moduleKey) : [...prev, moduleKey]);
  };

  const toggleModuleAll = (moduleKey: string) => {
    const keys = Object.keys(PERMISSION_MODULES[moduleKey].permissions);
    const allSelected = keys.every(k => value.includes(k));
    if (allSelected) {
      onChange(value.filter(p => !keys.includes(p)));
    } else {
      onChange([...new Set([...value, ...keys])]);
    }
  };

  const togglePerm = (perm: string) => {
    onChange(value.includes(perm) ? value.filter(p => p !== perm) : [...value, perm]);
  };

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
      {/* Select All */}
      <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl mb-3">
        <span className="text-sm font-semibold text-gray-700">Pilih Semua Permissions</span>
        <button
          onClick={() => onChange(value.length === ALL_PERMISSIONS.length ? [] : ALL_PERMISSIONS)}
          className="text-xs font-medium px-3 py-1 rounded-full border transition-all"
          style={value.length === ALL_PERMISSIONS.length
            ? { background: PINK, color: 'white', borderColor: PINK }
            : { color: PINK, borderColor: PINK }
          }
        >
          {value.length === ALL_PERMISSIONS.length ? 'Hapus Semua' : 'Pilih Semua'}
        </button>
      </div>

      {Object.entries(PERMISSION_MODULES).map(([moduleKey, module]) => {
        const modulePerms = Object.keys(module.permissions);
        const selectedCount = modulePerms.filter(p => value.includes(p)).length;
        const allSelected = selectedCount === modulePerms.length;
        const isOpen = expanded.includes(moduleKey);

        return (
          <div key={moduleKey} className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => toggleModule(moduleKey)}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{module.icon}</span>
                <span className="text-sm font-medium text-gray-800">{module.label}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={allSelected ? { background: PINK, color: 'white' } : { background: '#F3F4F6', color: '#6B7280' }}
                >
                  {selectedCount}/{modulePerms.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={e => { e.stopPropagation(); toggleModuleAll(moduleKey); }}
                  className="text-xs px-2 py-0.5 rounded-lg border hover:bg-gray-100 transition-colors"
                  style={{ color: PINK, borderColor: `${PINK}40` }}
                >
                  {allSelected ? 'Hapus' : 'Semua'}
                </button>
                {isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-gray-100"
                >
                  <div className="p-3 space-y-1 bg-gray-50">
                    {Object.entries(module.permissions).map(([perm, label]) => (
                      <label key={perm} className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white cursor-pointer transition-colors">
                        <div
                          className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all"
                          style={value.includes(perm)
                            ? { background: PINK, borderColor: PINK }
                            : { borderColor: '#D1D5DB' }
                          }
                        >
                          {value.includes(perm) && <Check size={10} className="text-white" />}
                        </div>
                        <input type="checkbox" checked={value.includes(perm)} onChange={() => togglePerm(perm)} className="sr-only" />
                        <span className="text-xs text-gray-600">{label}</span>
                        <code className="text-xs text-gray-300 ml-auto font-mono">{perm}</code>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

interface RoleFormData {
  name: string;
  description: string;
  color: string;
  permissions: string[];
}

function RoleModal({ role, onSave, onClose }: {
  role: Role | null;
  onSave: (data: RoleFormData) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<RoleFormData>({
    name: role?.name ?? '',
    description: role?.description ?? '',
    color: role?.color ?? ROLE_COLORS[0],
    permissions: role?.permissions ?? [],
  });
  const [tab, setTab] = useState<'info' | 'perms'>('info');

  const isValid = form.name.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: form.color }}>
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-800">{role ? 'Edit Role' : 'Buat Role Baru'}</div>
              <div className="text-xs text-gray-400">{form.permissions.length} permissions dipilih</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-6">
          {([['info', 'Info Role'], ['perms', 'Permissions']] as const).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="py-3 px-4 text-sm font-medium border-b-2 transition-colors"
              style={tab === t ? { color: PINK, borderColor: PINK } : { color: '#9CA3AF', borderColor: 'transparent' }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'info' ? (
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Role <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Contoh: Content Manager, Supervisor, dll."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  disabled={role?.isSystem}
                />
                {role?.isSystem && <p className="text-xs text-amber-600 mt-1 flex items-center gap-1"><AlertTriangle size={11} /> Nama role sistem tidak dapat diubah</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Deskripsi singkat tentang fungsi role ini..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warna Badge</label>
                <div className="flex flex-wrap gap-2">
                  {ROLE_COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setForm(f => ({ ...f, color: c }))}
                      className="w-8 h-8 rounded-full transition-all"
                      style={{
                        background: c,
                        boxShadow: form.color === c ? `0 0 0 3px white, 0 0 0 5px ${c}` : 'none',
                        transform: form.color === c ? 'scale(1.2)' : 'scale(1)',
                      }}
                    />
                  ))}
                  <div className="flex items-center gap-2 ml-2">
                    <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                      #
                    </div>
                    <input
                      type="color"
                      value={form.color}
                      onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                      className="w-8 h-8 rounded-full border-0 cursor-pointer bg-transparent"
                      title="Pilih warna custom"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs text-gray-400 mb-2">Preview badge:</div>
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ background: form.color }}
                  >
                    {form.name || 'Nama Role'}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: form.color }}
                  >
                    {(form.name || 'R').charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <PermissionPicker value={form.permissions} onChange={perms => setForm(f => ({ ...f, permissions: perms }))} />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={() => isValid && onSave(form)}
            disabled={!isValid}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-50"
            style={{ background: isValid ? `linear-gradient(135deg, ${PINK}, #FF6BB5)` : '#ccc' }}
          >
            {role ? 'Simpan Perubahan' : 'Buat Role'}
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-600">
            Batal
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminRoles() {
  const { roles, saveRoles, hasPermission } = useAuth();
  const [editTarget, setEditTarget] = useState<Role | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const canEdit = hasPermission('roles.edit');
  const canCreate = hasPermission('roles.create');
  const canDelete = hasPermission('roles.delete');

  const handleSave = (data: RoleFormData, existing: Role | null) => {
    if (existing) {
      saveRoles(roles.map(r => r.id === existing.id ? {
        ...r,
        ...(existing.isSystem ? {} : { name: data.name }),
        description: data.description,
        color: data.color,
        permissions: data.permissions,
      } : r));
    } else {
      const newRole: Role = {
        id: `custom_${Date.now()}`,
        name: data.name,
        description: data.description,
        color: data.color,
        isSystem: false,
        permissions: data.permissions,
        createdAt: new Date().toISOString(),
      };
      saveRoles([...roles, newRole]);
    }
    setEditTarget(null);
    setShowNew(false);
  };

  const handleDelete = (id: string) => {
    saveRoles(roles.filter(r => r.id !== id));
    setDeleteConfirm(null);
  };

  const handleDuplicate = (role: Role) => {
    const dup: Role = {
      ...role,
      id: `custom_${Date.now()}`,
      name: `${role.name} (Salinan)`,
      isSystem: false,
      createdAt: new Date().toISOString(),
    };
    saveRoles([...roles, dup]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Manajemen Roles</h1>
          <p className="text-sm text-gray-400 mt-0.5">{roles.length} roles terdefinisi · {roles.filter(r => !r.isSystem).length} custom</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
            style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
          >
            <Plus size={16} /> Buat Role Baru
          </button>
        )}
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
        <Shield size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <strong>Role menentukan apa yang dapat dilakukan setiap pengguna.</strong> Role sistem (🔒) tidak dapat dihapus namanya, tapi permission-nya dapat diubah. Buat role custom untuk kebutuhan spesifik klinik Anda.
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid gap-4">
        {roles.map((role, i) => {
          const userCount = 0; // would come from users list
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Color accent bar */}
              <div className="h-1" style={{ background: role.color }} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{ background: role.color }}
                    >
                      {role.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-gray-800">{role.name}</div>
                        {role.isSystem && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">🔒 Sistem</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 mt-0.5 truncate">{role.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {canEdit && (
                      <button
                        onClick={() => setEditTarget(role)}
                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                        title="Edit role"
                      >
                        <Edit3 size={15} className="text-gray-400" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDuplicate(role)}
                      className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                      title="Duplikat role"
                    >
                      <Copy size={15} className="text-gray-400" />
                    </button>
                    {canDelete && !role.isSystem && (
                      <button
                        onClick={() => setDeleteConfirm(role.id)}
                        className="p-2 rounded-xl hover:bg-red-50 transition-colors"
                        title="Hapus role"
                      >
                        <Trash2 size={15} className="text-red-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Permission count breakdown */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {Object.entries(PERMISSION_MODULES).map(([key, module]) => {
                    const modulePerms = Object.keys(module.permissions);
                    const count = modulePerms.filter(p => role.permissions.includes(p)).length;
                    if (count === 0) return null;
                    return (
                      <span
                        key={key}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${role.color}15`, color: role.color }}
                      >
                        {module.icon} {module.label.split(' ')[0]} ({count})
                      </span>
                    );
                  })}
                </div>

                <div className="mt-3 text-xs text-gray-400">
                  {role.permissions.length} dari {Object.keys(PERMISSION_MODULES).reduce((acc, k) => acc + Object.keys(PERMISSION_MODULES[k].permissions).length, 0)} permissions aktif
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Role Editor Modal */}
      <AnimatePresence>
        {(editTarget || showNew) && (
          <RoleModal
            role={editTarget}
            onSave={(data) => handleSave(data, editTarget)}
            onClose={() => { setEditTarget(null); setShowNew(false); }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800 mb-2">Hapus Role Ini?</div>
                <p className="text-sm text-gray-500">Pengguna dengan role ini akan kehilangan aksesnya. Tindakan ini tidak dapat dibatalkan.</p>
              </div>
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold"
                >
                  Ya, Hapus
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium"
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
