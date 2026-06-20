/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit3, Trash2, X, Eye, EyeOff, Search, UserCheck, UserX, AlertTriangle, Key } from 'lucide-react';
import { useAuth, type AdminUser } from '../../context/AuthContext';

const PINK = '#E91E8C';

function UserModal({ user, roles, onSave, onClose }: {
  user: AdminUser | null;
  roles: Array<{ id: string; name: string; color: string }>;
  onSave: (data: Partial<AdminUser>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: user?.name ?? '',
    username: user?.username ?? '',
    email: user?.email ?? '',
    password: user ? '' : '',
    roleId: user?.roleId ?? roles[0]?.id ?? '',
    isActive: user?.isActive ?? true,
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.username.trim()) e.username = 'Username wajib diisi';
    if (!user && !form.password.trim()) e.password = 'Password wajib diisi untuk user baru';
    if (form.password && form.password.length < 6) e.password = 'Password minimal 6 karakter';
    if (!form.email.includes('@')) e.email = 'Email tidak valid';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const data: Partial<AdminUser> = {
      name: form.name,
      username: form.username,
      email: form.email,
      roleId: form.roleId,
      isActive: form.isActive,
      avatar: form.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(),
    };
    if (form.password) data.password = form.password;
    onSave(data);
  };

  const selectedRole = roles.find(r => r.id === form.roleId);

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <div className="font-bold text-gray-800">{user ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</div>
            <div className="text-xs text-gray-400 mt-0.5">Isi informasi pengguna dengan lengkap</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Avatar preview */}
          <div className="flex justify-center mb-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
              style={{ background: selectedRole?.color || PINK }}
            >
              {form.name ? form.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : '?'}
            </div>
          </div>

          {[
            { label: 'Nama Lengkap', key: 'name', type: 'text', placeholder: 'Contoh: Dr. Ahmad Fauzi' },
            { label: 'Username', key: 'username', type: 'text', placeholder: 'Contoh: ahmad.fauzi', disabled: !!user },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'email@omdc.id' },
          ].map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
              <input
                type={field.type}
                value={(form as any)[field.key]}
                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                disabled={field.disabled}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:bg-gray-50 disabled:text-gray-400"
                style={{ borderColor: errors[field.key] ? '#EF4444' : '#E5E7EB' }}
              />
              {errors[field.key] && <p className="text-xs text-red-500 mt-1">{errors[field.key]}</p>}
            </div>
          ))}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {user ? 'Password Baru (kosongkan jika tidak diubah)' : 'Password *'}
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Min. 6 karakter"
                className="w-full px-4 py-2.5 pr-10 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                style={{ borderColor: errors.password ? '#EF4444' : '#E5E7EB' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role / Jabatan</label>
            <select
              value={form.roleId}
              onChange={e => setForm(f => ({ ...f, roleId: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            >
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            {selectedRole && (
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: selectedRole.color }} />
                <span className="text-xs text-gray-400">Role aktif: {selectedRole.name}</span>
              </div>
            )}
          </div>

          {/* Active status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <div className="text-sm font-medium text-gray-700">Status Akun</div>
              <div className="text-xs text-gray-400">{form.isActive ? 'Akun aktif dan bisa login' : 'Akun dinonaktifkan'}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
                className="sr-only peer"
              />
              <div
                className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                style={{ background: form.isActive ? PINK : '#E5E7EB' }}
              />
            </label>
          </div>
        </div>

        <div className="p-4 border-t flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
          >
            {user ? 'Simpan Perubahan' : 'Buat Pengguna'}
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-600">
            Batal
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminUsers() {
  const { users, roles, saveUsers, currentUser, hasPermission } = useAuth();
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const canEdit = hasPermission('users.edit');
  const canCreate = hasPermission('users.create');
  const canDelete = hasPermission('users.delete');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: Partial<AdminUser>, existing: AdminUser | null) => {
    if (existing) {
      saveUsers(users.map(u => u.id === existing.id ? { ...u, ...data } : u));
    } else {
      const newUser: AdminUser = {
        id: `u${Date.now()}`,
        name: data.name!, username: data.username!, password: data.password!,
        email: data.email!, avatar: data.avatar!, roleId: data.roleId!,
        isActive: data.isActive ?? true, lastLogin: null,
        createdAt: new Date().toISOString(),
      };
      saveUsers([...users, newUser]);
    }
    setEditTarget(null);
    setShowNew(false);
  };

  const toggleActive = (id: string) => {
    saveUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  const handleDelete = (id: string) => {
    saveUsers(users.filter(u => u.id !== id));
    setDeleteConfirm(null);
  };

  const getRoleBadge = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? { name: role.name, color: role.color } : { name: 'Unknown', color: '#999' };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Manajemen Pengguna</h1>
          <p className="text-sm text-gray-400 mt-0.5">{users.filter(u => u.isActive).length} aktif · {users.filter(u => !u.isActive).length} nonaktif</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
            style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
          >
            <Plus size={16} /> Tambah Pengguna
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Pengguna', value: users.length, color: PINK },
          { label: 'Pengguna Aktif', value: users.filter(u => u.isActive).length, color: '#10B981' },
          { label: 'Total Roles', value: roles.length, color: '#4FC3F7' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama, username, atau email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
        />
      </div>

      {/* User List */}
      <div className="grid gap-3">
        {filtered.map((user, i) => {
          const role = getRoleBadge(user.roleId);
          const isMe = user.id === currentUser?.id;
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 ${!user.isActive ? 'opacity-60' : ''}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ background: role.color }}
              >
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-gray-800">{user.name}</div>
                  {isMe && <span className="text-xs px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 font-medium">Saya</span>}
                  {!user.isActive && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 font-medium">Nonaktif</span>}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                  <span>@{user.username}</span>
                  <span className="text-gray-200">·</span>
                  <span>{user.email}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                    style={{ background: `${role.color}20`, color: role.color }}
                  >
                    {role.name}
                  </span>
                  {user.lastLogin && (
                    <span className="text-xs text-gray-300">Login: {new Date(user.lastLogin).toLocaleDateString('id-ID')}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleActive(user.id)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  title={user.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                  disabled={isMe}
                >
                  {user.isActive ? <UserCheck size={15} className="text-green-500" /> : <UserX size={15} className="text-gray-400" />}
                </button>
                {canEdit && (
                  <button onClick={() => setEditTarget(user)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                    <Edit3 size={15} className="text-gray-400" />
                  </button>
                )}
                {canDelete && !isMe && (
                  <button onClick={() => setDeleteConfirm(user.id)} className="p-2 rounded-xl hover:bg-red-50 transition-colors">
                    <Trash2 size={15} className="text-red-400" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-2xl">Tidak ada pengguna ditemukan</div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {(editTarget || showNew) && (
          <UserModal
            user={editTarget}
            roles={roles}
            onSave={(data) => handleSave(data, editTarget)}
            onClose={() => { setEditTarget(null); setShowNew(false); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800 mb-2">Hapus Pengguna Ini?</div>
                <p className="text-sm text-gray-500">Pengguna tidak akan bisa login lagi. Semua data terkait akan tetap tersimpan.</p>
              </div>
              <div className="flex gap-2 mt-5">
                <button onClick={() => handleDelete(deleteConfirm!)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold">Hapus</button>
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium">Batal</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
