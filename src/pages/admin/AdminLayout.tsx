/* eslint-disable */
import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users2,
  CalendarDays,
  ClipboardList,
  Stethoscope,
  Scissors,
  Tag,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Menu,
  X,
  Activity,
} from 'lucide-react';

import AdminDashboard from './AdminDashboard';
import AdminQueue from './AdminQueue';
import AdminAppointments from './AdminAppointments';
import AdminPatients from './AdminPatients';
import AdminDoctors from './AdminDoctors';
import AdminServices from './AdminServices';
import AdminPromotions from './AdminPromotions';
import AdminReports from './AdminReports';
import AdminSettings from './AdminSettings';

// ─── BRAND CONSTANTS ─────────────────────────────────────────────────────────
const SIDEBAR_BG = '#1A1A2E';
const PINK = '#E91E8C';
const BLUE = '#4FC3F7';

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { path: '', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: 'queue', label: 'Antrian', icon: Activity },
  { path: 'appointments', label: 'Jadwal', icon: CalendarDays },
  { path: 'patients', label: 'Pasien', icon: Users2 },
  { path: 'doctors', label: 'Dokter', icon: Stethoscope },
  { path: 'services', label: 'Layanan', icon: Scissors },
  { path: 'promotions', label: 'Promo', icon: Tag },
  { path: 'reports', label: 'Laporan', icon: BarChart3 },
  { path: 'settings', label: 'Pengaturan', icon: Settings },
];

// ─── BREADCRUMB MAP ──────────────────────────────────────────────────────────
const BREADCRUMB_MAP: Record<string, string> = {
  '': 'Dashboard',
  queue: 'Manajemen Antrian',
  appointments: 'Jadwal & Janji',
  patients: 'Data Pasien',
  doctors: 'Manajemen Dokter',
  services: 'Layanan & Harga',
  promotions: 'Promo & Diskon',
  reports: 'Laporan & Analitik',
  settings: 'Pengaturan',
};

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // TODO: Replace with API call — authService.adminLogin(username, password)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('omdc_admin_token', 'admin-mock-token-2024');
        onLogin();
      } else {
        setError('Username atau password salah.');
        setLoading(false);
      }
    }, 700);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: SIDEBAR_BG }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: PINK }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: BLUE }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-6" style={{ background: 'linear-gradient(135deg, #1A1A2E, #16213E)' }}>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C9.24 3 7 5.24 7 8c0 1.74.88 3.26 2.2 4.17L12 21l2.8-8.83C16.12 11.26 17 9.74 17 8c0-2.76-2.24-5-5-5z" fill="white" opacity="0.9" />
                  <circle cx="12" cy="8" r="2" fill="white" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-xl leading-tight">OMDC Dental</div>
                <div className="text-gray-400 text-sm">Admin Panel</div>
              </div>
            </div>
            <h1 className="text-white text-xl font-semibold">Masuk sebagai Admin</h1>
            <p className="text-gray-400 text-sm mt-1">Kelola klinik dengan mudah</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-800 placeholder-gray-400 text-sm"
                style={{ focusRingColor: PINK } as any}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-800 placeholder-gray-400 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-70"
              style={{ background: loading ? '#ccc' : `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
            >
              {loading ? 'Memuat...' : 'Masuk'}
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-400">
                Default: <span className="font-mono text-gray-600">admin</span> /{' '}
                <span className="font-mono text-gray-600">admin123</span>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('omdc_admin_token');
    window.location.reload();
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 280 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="flex-shrink-0 flex flex-col h-full overflow-hidden"
      style={{ background: SIDEBAR_BG }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C9.24 3 7 5.24 7 8c0 1.74.88 3.26 2.2 4.17L12 21l2.8-8.83C16.12 11.26 17 9.74 17 8c0-2.76-2.24-5-5-5z" fill="white" opacity="0.9" />
            <circle cx="12" cy="8" r="2" fill="white" />
          </svg>
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="text-white font-bold text-base leading-tight">OMDC Dental</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Admin Panel</div>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
              style={({ isActive }) =>
                isActive ? { background: PINK } : {}
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className="flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                  {collapsed && (
                    <div
                      className="absolute left-full ml-2 px-2 py-1 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity"
                      style={{ background: '#333' }}
                    >
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom: Logout */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-red-500/10 transition-all group relative"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Keluar</span>}
          {collapsed && (
            <div
              className="absolute left-full ml-2 px-2 py-1 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity"
              style={{ background: '#333' }}
            >
              Keluar
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
}

// ─── TOPBAR ──────────────────────────────────────────────────────────────────
function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const path = window.location.pathname.replace('/admin', '').replace(/^\//, '');
  const label = BREADCRUMB_MAP[path] ?? 'Admin';

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <div>
          <div className="text-xs text-gray-400">Admin Panel</div>
          <div className="text-sm font-semibold text-gray-800">{label}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(v => !v)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
          >
            <Bell size={20} className="text-gray-600" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: PINK }}
            />
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="font-semibold text-gray-800 text-sm">Notifikasi</div>
              </div>
              {[
                { msg: 'Pasien baru: Ahmad Fauzi mendaftar', time: '5 menit lalu' },
                { msg: 'Antrian A020 belum dikonfirmasi', time: '12 menit lalu' },
                { msg: 'drg. Reza Rizki sedang libur hari ini', time: '1 jam lalu' },
              ].map((n, i) => (
                <div key={i} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0">
                  <p className="text-sm text-gray-700">{n.msg}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Admin avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-100">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
          >
            A
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-800">Admin</div>
            <div className="text-xs text-gray-400">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── ADMIN LAYOUT ─────────────────────────────────────────────────────────────
export default function AdminLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem('omdc_admin_token')
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F8FAFC' }}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(v => !v)} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onToggleSidebar={() => setSidebarCollapsed(v => !v)} />

        <main className="flex-1 overflow-y-auto" style={{ background: '#F8FAFC' }}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/queue" element={<AdminQueue />} />
            <Route path="/appointments" element={<AdminAppointments />} />
            <Route path="/patients" element={<AdminPatients />} />
            <Route path="/doctors" element={<AdminDoctors />} />
            <Route path="/services" element={<AdminServices />} />
            <Route path="/promotions" element={<AdminPromotions />} />
            <Route path="/reports" element={<AdminReports />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
