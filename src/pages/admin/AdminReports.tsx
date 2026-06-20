/* eslint-disable */
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp, TrendingDown, DollarSign, Users, CalendarDays,
  BarChart3, Download, Filter, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';

const PINK = '#E91E8C';
const BLUE = '#4FC3F7';
const GREEN = '#10B981';
const AMBER = '#F59E0B';

// TODO: Replace with reportsService.getSummary(period)
const MONTHLY_DATA = [
  { month: 'Jan', revenue: 42000000, patients: 128, appointments: 145 },
  { month: 'Feb', revenue: 38500000, patients: 112, appointments: 130 },
  { month: 'Mar', revenue: 51000000, patients: 158, appointments: 172 },
  { month: 'Apr', revenue: 47200000, patients: 142, appointments: 160 },
  { month: 'Mei', revenue: 55800000, patients: 168, appointments: 188 },
  { month: 'Jun', revenue: 62000000, patients: 185, appointments: 210 },
];

const TOP_SERVICES = [
  { name: 'Scaling & Polishing', count: 342, revenue: 119700000, percent: 28 },
  { name: 'Tambal Gigi', count: 218, revenue: 76300000, percent: 18 },
  { name: 'Bleaching', count: 156, revenue: 124800000, percent: 13 },
  { name: 'Kawat Gigi', count: 89, revenue: 445000000, percent: 7 },
  { name: 'Pemeriksaan Umum', count: 445, revenue: 44500000, percent: 36 },
];

const TOP_DOCTORS = [
  { name: 'drg. Sarah Sella', patients: 342, rating: 4.9, revenue: 285000000 },
  { name: 'drg. Reza Rizki', patients: 289, rating: 4.9, revenue: 231000000 },
  { name: 'drg. Ivan Kontralizan', patients: 218, rating: 4.8, revenue: 174000000 },
  { name: 'drg. Andika Andilisa', patients: 165, rating: 4.7, revenue: 132000000 },
];

const fmtRp = (n: number) => n >= 1000000
  ? `Rp${(n / 1000000).toFixed(1)}jt`
  : `Rp${(n / 1000).toFixed(0)}rb`;

export default function AdminReports() {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const current = MONTHLY_DATA[MONTHLY_DATA.length - 1];
  const prev = MONTHLY_DATA[MONTHLY_DATA.length - 2];
  const revGrowth = ((current.revenue - prev.revenue) / prev.revenue * 100).toFixed(1);
  const patGrowth = ((current.patients - prev.patients) / prev.patients * 100).toFixed(1);

  const maxRev = Math.max(...MONTHLY_DATA.map(d => d.revenue));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Laporan & Analitik</h1>
          <p className="text-sm text-gray-400 mt-0.5">Data performa klinik real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {(['weekly', 'monthly', 'yearly'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={period === p ? { background: PINK, color: 'white' } : { color: '#6B7280' }}
              >
                {p === 'weekly' ? 'Minggu' : p === 'monthly' ? 'Bulan' : 'Tahun'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Download size={15} />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pendapatan Bulan Ini', value: fmtRp(current.revenue), growth: +revGrowth, icon: DollarSign, color: PINK },
          { label: 'Pasien Baru', value: `${current.patients}`, growth: +patGrowth, icon: Users, color: BLUE },
          { label: 'Total Janji', value: `${current.appointments}`, growth: 11.7, icon: CalendarDays, color: GREEN },
          { label: 'Rating Kepuasan', value: '4.87', growth: 0.2, icon: BarChart3, color: AMBER },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          const isPos = kpi.growth >= 0;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${kpi.color}20` }}
                >
                  <Icon size={20} style={{ color: kpi.color }} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${isPos ? 'text-green-500' : 'text-red-400'}`}>
                  {isPos ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(kpi.growth)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800">{kpi.value}</div>
              <div className="text-xs text-gray-400 mt-1">{kpi.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="font-semibold text-gray-800">Pendapatan 6 Bulan</div>
            <div className="text-xs text-gray-400">dalam jutaan Rupiah</div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {MONTHLY_DATA.map((d, i) => {
              const pct = (d.revenue / maxRev) * 100;
              const isLast = i === MONTHLY_DATA.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs font-semibold text-gray-600">{fmtRp(d.revenue)}</div>
                  <div className="w-full relative flex items-end" style={{ height: '80px' }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="w-full rounded-t-lg"
                      style={{ background: isLast ? `linear-gradient(135deg, ${PINK}, #FF6BB5)` : '#F3F4F6' }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">{d.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Doctors */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="font-semibold text-gray-800 mb-4">Top Dokter</div>
          <div className="space-y-3">
            {TOP_DOCTORS.map((doc, i) => (
              <div key={doc.name} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 truncate">{doc.name}</div>
                  <div className="text-xs text-gray-400">{doc.patients} pasien · ⭐{doc.rating}</div>
                </div>
                <div className="text-xs font-semibold flex-shrink-0" style={{ color: PINK }}>
                  {fmtRp(doc.revenue)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Services */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="font-semibold text-gray-800 mb-4">Layanan Terpopuler</div>
        <div className="space-y-4">
          {TOP_SERVICES.map((s, i) => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-sm font-medium text-gray-700">{s.name}</div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{s.count}x</span>
                  <span className="font-semibold" style={{ color: PINK }}>{fmtRp(s.revenue)}</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.percent}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${PINK}, #FF6BB5)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
