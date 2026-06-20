/* eslint-disable */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Users,
  Activity,
  DollarSign,
  UserPlus,
  Circle,
} from 'lucide-react';

// ─── BRAND ───────────────────────────────────────────────────────────────────
const PINK = '#E91E8C';
const BLUE = '#4FC3F7';
const GREEN = '#10B981';
const AMBER = '#F59E0B';
const RED = '#EF4444';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// TODO: Replace with API call — dashboardService.getTodayStats()
const MOCK_TODAY_STATS = {
  totalAppointments: 24,
  completed: 8,
  waiting: 12,
  cancelled: 4,
  revenue: 8750000,
  newPatients: 5,
};

// TODO: Replace with API call — queueService.getLiveQueue()
const MOCK_QUEUE = [
  { id: '1', number: 'A017', patientName: 'Budi Santoso', service: 'Scaling & Polishing', doctor: 'drg. Sarah Sella', room: 'Ruang 2', status: 'serving', arrivedAt: '09:15' },
  { id: '2', number: 'A018', patientName: 'Andi Pratama', service: 'Scaling & Polishing', doctor: 'drg. Sarah Sella', room: 'Ruang 2', status: 'waiting', arrivedAt: '09:20' },
  { id: '3', number: 'A019', patientName: 'Siti Nurhaliza', service: 'Tambal Gigi', doctor: 'drg. Ivan Kontralizan', room: 'Ruang 1', status: 'waiting', arrivedAt: '09:30' },
  { id: '4', number: 'A020', patientName: 'Ahmad Fauzi', service: 'Pemeriksaan Gigi', doctor: 'drg. Andika Andilisa', room: 'Ruang 3', status: 'waiting', arrivedAt: '09:45' },
  { id: '5', number: 'A021', patientName: 'Rina Permatasari', service: 'Cabut Gigi', doctor: 'drg. Reza Rizki', room: 'Ruang 4', status: 'waiting', arrivedAt: '10:00' },
  { id: '6', number: 'A016', patientName: 'Dewi Susanti', service: 'Behel Kontrol', doctor: 'drg. Andika Andilisa', room: 'Ruang 3', status: 'done', arrivedAt: '08:45' },
  { id: '7', number: 'A015', patientName: 'Hendra Kusuma', service: 'Scaling', doctor: 'drg. Sarah Sella', room: 'Ruang 2', status: 'done', arrivedAt: '08:30' },
];

// TODO: Replace with API call — appointmentsService.getTodayAppointments()
const MOCK_APPOINTMENTS = [
  { id: 'ap1', patientName: 'Andi Pratama', service: 'Scaling & Polishing', doctor: 'drg. Sarah Sella', time: '09:00', status: 'confirmed' },
  { id: 'ap2', patientName: 'Siti Nurhaliza', service: 'Tambal Gigi', doctor: 'drg. Ivan Kontralizan', time: '10:00', status: 'confirmed' },
  { id: 'ap3', patientName: 'Budi Santoso', service: 'Behel Kontrol', doctor: 'drg. Andika Andilisa', time: '11:00', status: 'waiting' },
  { id: 'ap4', patientName: 'Rina Permatasari', service: 'Scaling & Polishing', doctor: 'drg. Sarah Sella', time: '13:00', status: 'pending' },
  { id: 'ap5', patientName: 'Ahmad Fauzi', service: 'Pemeriksaan', doctor: 'drg. Sarah Sella', time: '14:00', status: 'confirmed' },
];

// TODO: Replace with API call — doctorsService.getActiveList()
const MOCK_DOCTORS = [
  { id: 'd1', name: 'drg. Sarah Sella', specialty: 'Sp.Perio', todayAppointments: 8, status: 'active' },
  { id: 'd2', name: 'drg. Andika Andilisa', specialty: 'Sp.Ort', todayAppointments: 6, status: 'active' },
  { id: 'd3', name: 'drg. Reza Rizki', specialty: 'Sp.BM', todayAppointments: 4, status: 'off' },
  { id: 'd4', name: 'drg. Ivan Kontralizan', specialty: 'Konservasi', todayAppointments: 6, status: 'active' },
];

// TODO: Replace with API call — patientsService.getNewThisWeek()
const MOCK_NEW_PATIENTS = [
  { name: 'Andi Pratama', date: '18 Mei', service: 'Scaling' },
  { name: 'Dewi Lestari', date: '17 Mei', service: 'Konsultasi' },
  { name: 'Fajar Nugroho', date: '16 Mei', service: 'Tambal Gigi' },
  { name: 'Ratna Sari', date: '15 Mei', service: 'Implan' },
  { name: 'Hendra Putra', date: '14 Mei', service: 'Behel' },
];

// Revenue bar chart data
const REVENUE_DATA = [
  { day: 'Sen', amount: 4200000 },
  { day: 'Sel', amount: 6800000 },
  { day: 'Rab', amount: 5500000 },
  { day: 'Kam', amount: 7200000 },
  { day: 'Jum', amount: 8750000 },
  { day: 'Sab', amount: 9100000 },
  { day: 'Min', amount: 3200000 },
];
const MAX_REVENUE = Math.max(...REVENUE_DATA.map(d => d.amount));

function formatRupiah(n: number) {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
  return `Rp ${n.toLocaleString('id-ID')}`;
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    serving: { label: 'Dilayani', color: PINK, bg: '#FFF0F8' },
    waiting: { label: 'Menunggu', color: AMBER, bg: '#FFFBEB' },
    done: { label: 'Selesai', color: GREEN, bg: '#F0FDF4' },
    confirmed: { label: 'Konfirmasi', color: GREEN, bg: '#F0FDF4' },
    pending: { label: 'Pending', color: AMBER, bg: '#FFFBEB' },
    cancelled: { label: 'Batal', color: RED, bg: '#FEF2F2' },
  };
  const s = map[status] ?? { label: status, color: '#888', bg: '#F3F4F6' };
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  bg,
  trend,
}: {
  icon: any;
  label: string;
  value: string;
  sub?: string;
  color: string;
  bg: string;
  trend?: 'up' | 'down';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: bg }}
        >
          <Icon size={22} style={{ color }} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-400'}`}>
            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend === 'up' ? '12%' : '3%'}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-0.5">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </motion.div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">{today}</p>
        </div>
        <div
          className="px-4 py-2 rounded-xl text-sm font-medium text-white"
          style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
        >
          Live Update
        </div>
      </div>

      {/* ── TOP STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarDays}
          label="Janji Hari Ini"
          value={String(MOCK_TODAY_STATS.totalAppointments)}
          sub="↑12% dari kemarin"
          color={BLUE}
          bg="#EFF9FF"
          trend="up"
        />
        <StatCard
          icon={CheckCircle2}
          label="Selesai"
          value={String(MOCK_TODAY_STATS.completed)}
          sub={`${Math.round((MOCK_TODAY_STATS.completed / MOCK_TODAY_STATS.totalAppointments) * 100)}% selesai`}
          color={GREEN}
          bg="#F0FDF4"
        />
        <StatCard
          icon={Clock}
          label="Menunggu"
          value={String(MOCK_TODAY_STATS.waiting)}
          sub={`${MOCK_TODAY_STATS.cancelled} dibatalkan`}
          color={AMBER}
          bg="#FFFBEB"
        />
        <StatCard
          icon={DollarSign}
          label="Pendapatan"
          value={formatRupiah(MOCK_TODAY_STATS.revenue)}
          sub="Hari ini"
          color={PINK}
          bg="#FFF0F8"
          trend="up"
        />
      </div>

      {/* ── MIDDLE ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Live Queue */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Activity size={18} style={{ color: PINK }} />
              <h2 className="font-semibold text-gray-800 text-sm">Antrian Live</h2>
            </div>
            <Link
              to="/admin/queue"
              className="flex items-center gap-1 text-xs font-medium hover:underline"
              style={{ color: PINK }}
            >
              Kelola Antrian <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {MOCK_QUEUE.slice(0, 5).map(q => (
              <div key={q.id} className="flex items-center gap-3 px-5 py-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs"
                  style={{
                    background: q.status === 'serving' ? PINK : q.status === 'done' ? '#F0FDF4' : '#F8FAFC',
                    color: q.status === 'serving' ? '#fff' : q.status === 'done' ? GREEN : '#888',
                  }}
                >
                  {q.number.replace('A0', 'A')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{q.patientName}</div>
                  <div className="text-xs text-gray-400 truncate">{q.service} · {q.doctor}</div>
                </div>
                <StatusBadge status={q.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Today Appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} style={{ color: BLUE }} />
              <h2 className="font-semibold text-gray-800 text-sm">Jadwal Hari Ini</h2>
            </div>
            <Link
              to="/admin/appointments"
              className="flex items-center gap-1 text-xs font-medium hover:underline"
              style={{ color: BLUE }}
            >
              Lihat Semua <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {MOCK_APPOINTMENTS.map(ap => (
              <div key={ap.id} className="flex items-center gap-3 px-5 py-3">
                <div
                  className="text-xs font-bold w-14 text-center py-1 rounded-lg flex-shrink-0"
                  style={{ background: '#F8FAFC', color: '#555' }}
                >
                  {ap.time}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{ap.patientName}</div>
                  <div className="text-xs text-gray-400 truncate">{ap.service} · {ap.doctor}</div>
                </div>
                <StatusBadge status={ap.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:col-span-1">
          <h2 className="font-semibold text-gray-800 text-sm mb-4">Pendapatan Minggu Ini</h2>
          <div className="flex items-end gap-2 h-32">
            {REVENUE_DATA.map((d, i) => {
              const pct = (d.amount / MAX_REVENUE) * 100;
              const isToday = i === 4;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${pct}%`,
                      background: isToday
                        ? `linear-gradient(180deg, ${PINK}, #FF6BB5)`
                        : '#EFF9FF',
                      minHeight: 4,
                    }}
                    title={formatRupiah(d.amount)}
                  />
                  <span className="text-xs text-gray-400">{d.day}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-50">
            <div className="text-xs text-gray-400">Total minggu ini</div>
            <div className="text-lg font-bold text-gray-800">
              {formatRupiah(REVENUE_DATA.reduce((s, d) => s + d.amount, 0))}
            </div>
          </div>
        </div>

        {/* Doctor Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm">Aktivitas Dokter</h2>
            <Link to="/admin/doctors" className="text-xs" style={{ color: PINK }}>Lihat →</Link>
          </div>
          <div className="space-y-3">
            {MOCK_DOCTORS.map(d => (
              <div key={d.id} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ background: d.status === 'active' ? `linear-gradient(135deg, ${BLUE}, #29B6F6)` : '#E5E7EB' }}
                >
                  {d.name.split(' ')[1]?.[0] ?? 'D'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{d.name}</div>
                  <div className="text-xs text-gray-400">{d.specialty}</div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-sm font-bold text-gray-700">{d.todayAppointments}</span>
                  <span className={`text-xs ${d.status === 'active' ? 'text-green-500' : 'text-gray-400'}`}>
                    {d.status === 'active' ? '● Aktif' : '○ Libur'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Patients */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserPlus size={16} style={{ color: GREEN }} />
              <h2 className="font-semibold text-gray-800 text-sm">Pasien Baru Minggu Ini</h2>
            </div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: '#F0FDF4', color: GREEN }}
            >
              +{MOCK_NEW_PATIENTS.length}
            </span>
          </div>
          <div className="space-y-3">
            {MOCK_NEW_PATIENTS.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
                >
                  {p.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.service}</div>
                </div>
                <div className="text-xs text-gray-400 flex-shrink-0">{p.date}</div>
              </div>
            ))}
          </div>
          <Link
            to="/admin/patients"
            className="flex items-center justify-center gap-1 mt-4 pt-4 border-t border-gray-50 text-xs font-medium"
            style={{ color: PINK }}
          >
            Lihat Semua Pasien <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
