/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CalendarDays, Clock, User, Search, Filter, CheckCircle2,
  XCircle, AlertCircle, ChevronLeft, ChevronRight, Phone, Plus, Eye,
} from 'lucide-react';

const PINK = '#E91E8C';
const BLUE = '#4FC3F7';
const GREEN = '#10B981';
const AMBER = '#F59E0B';
const RED = '#EF4444';

type ApptStatus = 'confirmed' | 'pending' | 'cancelled' | 'done';

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  status: ApptStatus;
  notes?: string;
}

// TODO: Replace with appointmentsService.list({ date, status })
const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '1', patientName: 'Budi Santoso', phone: '0812-3456-7890', service: 'Scaling & Polishing', doctor: 'drg. Sarah Sella', date: '2026-06-20', time: '09:00', status: 'done' },
  { id: '2', patientName: 'Andi Pratama', phone: '0823-4567-8901', service: 'Pemeriksaan Gigi', doctor: 'drg. Sarah Sella', date: '2026-06-20', time: '09:30', status: 'confirmed' },
  { id: '3', patientName: 'Siti Nurhaliza', phone: '0834-5678-9012', service: 'Tambal Gigi', doctor: 'drg. Ivan Kontralizan', date: '2026-06-20', time: '10:00', status: 'confirmed' },
  { id: '4', patientName: 'Ahmad Fauzi', phone: '0845-6789-0123', service: 'Bleaching', doctor: 'drg. Andika Andilisa', date: '2026-06-20', time: '10:30', status: 'pending' },
  { id: '5', patientName: 'Rina Permatasari', phone: '0856-7890-1234', service: 'Cabut Gigi', doctor: 'drg. Reza Rizki', date: '2026-06-20', time: '11:00', status: 'pending' },
  { id: '6', patientName: 'Desi Ratnasari', phone: '0867-8901-2345', service: 'Kawat Gigi', doctor: 'drg. Sarah Sella', date: '2026-06-21', time: '09:00', status: 'confirmed' },
  { id: '7', patientName: 'Hendra Wijaya', phone: '0878-9012-3456', service: 'Implan Gigi', doctor: 'drg. Ivan Kontralizan', date: '2026-06-21', time: '10:00', status: 'cancelled' },
  { id: '8', patientName: 'Maya Wulandari', phone: '0889-0123-4567', service: 'Veneer', doctor: 'drg. Andika Andilisa', date: '2026-06-21', time: '11:00', status: 'confirmed' },
];

const STATUS_CONFIG: Record<ApptStatus, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  confirmed: { label: 'Dikonfirmasi', color: '#1D4ED8', bg: '#EFF6FF', icon: CheckCircle2 },
  pending: { label: 'Menunggu', color: AMBER, bg: '#FFFBEB', icon: AlertCircle },
  cancelled: { label: 'Dibatalkan', color: RED, bg: '#FEF2F2', icon: XCircle },
  done: { label: 'Selesai', color: GREEN, bg: '#ECFDF5', icon: CheckCircle2 },
};

const DATES = ['2026-06-18', '2026-06-19', '2026-06-20', '2026-06-21', '2026-06-22', '2026-06-23', '2026-06-24'];
const DAY_NAMES = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export default function AdminAppointments() {
  const [selectedDate, setSelectedDate] = useState('2026-06-20');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApptStatus | 'all'>('all');
  const [selected, setSelected] = useState<Appointment | null>(null);

  const filtered = MOCK_APPOINTMENTS.filter(a => {
    const matchDate = a.date === selectedDate;
    const matchSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchDate && matchSearch && matchStatus;
  });

  const stats = {
    total: MOCK_APPOINTMENTS.filter(a => a.date === selectedDate).length,
    confirmed: MOCK_APPOINTMENTS.filter(a => a.date === selectedDate && a.status === 'confirmed').length,
    pending: MOCK_APPOINTMENTS.filter(a => a.date === selectedDate && a.status === 'pending').length,
    done: MOCK_APPOINTMENTS.filter(a => a.date === selectedDate && a.status === 'done').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Jadwal & Janji Temu</h1>
          <p className="text-sm text-gray-400 mt-0.5">Kelola semua janji temu pasien</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
        >
          <Plus size={16} />
          Buat Janji
        </button>
      </div>

      {/* Date Strip */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors"><ChevronLeft size={16} /></button>
          <span className="text-sm font-semibold text-gray-700 flex-1 text-center">Juni 2026</span>
          <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors"><ChevronRight size={16} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {DATES.map((d, i) => {
            const day = parseInt(d.split('-')[2]);
            const isSelected = d === selectedDate;
            const count = MOCK_APPOINTMENTS.filter(a => a.date === d).length;
            return (
              <button
                key={d}
                onClick={() => setSelectedDate(d)}
                className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all"
                style={isSelected ? { background: PINK, color: 'white' } : { color: '#374151' }}
              >
                <span className="text-xs opacity-70">{DAY_NAMES[i]}</span>
                <span className="font-bold text-sm">{day}</span>
                {count > 0 && (
                  <span
                    className="text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium"
                    style={isSelected ? { background: 'rgba(255,255,255,0.3)', color: 'white' } : { background: '#FFF0F8', color: PINK }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total, color: BLUE },
          { label: 'Terkonfirmasi', value: stats.confirmed, color: '#1D4ED8' },
          { label: 'Menunggu', value: stats.pending, color: AMBER },
          { label: 'Selesai', value: stats.done, color: GREEN },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pasien atau layanan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {(['all', 'confirmed', 'pending', 'done', 'cancelled'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={statusFilter === s ? { background: PINK, color: 'white' } : { color: '#6B7280' }}
            >
              {s === 'all' ? 'Semua' : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Pasien</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Layanan</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Dokter</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Waktu</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                  Tidak ada janji temu pada tanggal ini
                </td>
              </tr>
            ) : (
              filtered.map((a, i) => {
                const cfg = STATUS_CONFIG[a.status];
                const Icon = cfg.icon;
                return (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800 text-sm">{a.patientName}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Phone size={11} />{a.phone}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{a.service}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{a.doctor}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Clock size={13} className="text-gray-400" />{a.time}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        <Icon size={12} />{cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelected(a)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Eye size={15} className="text-gray-400" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b" style={{ background: `linear-gradient(135deg, ${PINK}15, ${BLUE}15)` }}>
                <div className="font-bold text-gray-800 text-lg">{selected.patientName}</div>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Phone size={13} />{selected.phone}
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'Layanan', value: selected.service },
                  { label: 'Dokter', value: selected.doctor },
                  { label: 'Tanggal', value: selected.date },
                  { label: 'Waktu', value: selected.time },
                  { label: 'Status', value: STATUS_CONFIG[selected.status].label },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{row.label}</span>
                    <span className="font-medium text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t flex gap-2">
                {selected.status === 'pending' && (
                  <button
                    className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium"
                    style={{ background: GREEN }}
                  >
                    Konfirmasi
                  </button>
                )}
                {selected.status !== 'cancelled' && selected.status !== 'done' && (
                  <button
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-red-200 text-red-500"
                  >
                    Batalkan
                  </button>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-600"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
