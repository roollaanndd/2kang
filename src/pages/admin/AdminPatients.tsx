/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, UserPlus, Eye, Phone, Mail, Calendar, FileText,
  ChevronRight, Activity, X, Edit3,
} from 'lucide-react';

const PINK = '#E91E8C';
const BLUE = '#4FC3F7';

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: 'M' | 'F';
  mrn: string;
  address: string;
  lastVisit: string;
  totalVisits: number;
  notes?: string;
}

// TODO: Replace with patientsService.list(search)
const MOCK_PATIENTS: Patient[] = [
  { id: '1', name: 'Budi Santoso', phone: '0812-3456-7890', email: 'budi@gmail.com', dob: '1990-05-15', gender: 'M', mrn: 'MR-2024-001', address: 'Jl. Merdeka No. 10, Jakarta', lastVisit: '2026-06-20', totalVisits: 8 },
  { id: '2', name: 'Andi Pratama', phone: '0823-4567-8901', email: 'andi@gmail.com', dob: '1985-11-22', gender: 'M', mrn: 'MR-2024-002', address: 'Jl. Sudirman No. 45, Jakarta', lastVisit: '2026-06-20', totalVisits: 3 },
  { id: '3', name: 'Siti Nurhaliza', phone: '0834-5678-9012', email: 'siti@gmail.com', dob: '1995-03-08', gender: 'F', mrn: 'MR-2024-003', address: 'Jl. Thamrin No. 7, Jakarta', lastVisit: '2026-06-18', totalVisits: 12 },
  { id: '4', name: 'Ahmad Fauzi', phone: '0845-6789-0123', email: 'ahmad@gmail.com', dob: '1978-07-30', gender: 'M', mrn: 'MR-2024-004', address: 'Jl. Gatot Subroto No. 100, Jakarta', lastVisit: '2026-06-15', totalVisits: 5 },
  { id: '5', name: 'Rina Permatasari', phone: '0856-7890-1234', email: 'rina@gmail.com', dob: '1992-09-14', gender: 'F', mrn: 'MR-2024-005', address: 'Jl. Kuningan No. 32, Jakarta', lastVisit: '2026-06-12', totalVisits: 7 },
  { id: '6', name: 'Desi Ratnasari', phone: '0867-8901-2345', email: 'desi@gmail.com', dob: '1988-12-03', gender: 'F', mrn: 'MR-2024-006', address: 'Jl. Rasuna Said No. 5, Jakarta', lastVisit: '2026-06-10', totalVisits: 2 },
  { id: '7', name: 'Hendra Wijaya', phone: '0878-9012-3456', email: 'hendra@gmail.com', dob: '1982-02-19', gender: 'M', mrn: 'MR-2024-007', address: 'Jl. Casablanca No. 8, Jakarta', lastVisit: '2026-06-08', totalVisits: 15 },
  { id: '8', name: 'Maya Wulandari', phone: '0889-0123-4567', email: 'maya@gmail.com', dob: '1996-06-25', gender: 'F', mrn: 'MR-2024-008', address: 'Jl. MT Haryono No. 22, Jakarta', lastVisit: '2026-06-05', totalVisits: 4 },
];

const MOCK_RECORDS = [
  { date: '2026-06-20', service: 'Scaling & Polishing', doctor: 'drg. Sarah Sella', diagnosis: 'Karang gigi', treatment: 'Scaling ultrasonik', notes: 'Kondisi baik' },
  { date: '2026-04-10', service: 'Pemeriksaan Rutin', doctor: 'drg. Sarah Sella', diagnosis: 'Gigi berlubang kecil', treatment: 'Observasi', notes: 'Jadwalkan tambal 2 bulan' },
  { date: '2026-01-05', service: 'Tambal Gigi', doctor: 'drg. Ivan Kontralizan', diagnosis: 'Karies gigi', treatment: 'Tambal resin komposit', notes: 'Berhasil, tidak nyeri' },
];

export default function AdminPatients() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Patient | null>(null);
  const [tab, setTab] = useState<'info' | 'records'>('info');

  const filtered = MOCK_PATIENTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.mrn.toLowerCase().includes(search.toLowerCase())
  );

  const calcAge = (dob: string) => {
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Data Pasien</h1>
          <p className="text-sm text-gray-400 mt-0.5">{MOCK_PATIENTS.length} pasien terdaftar</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
        >
          <UserPlus size={16} />
          Tambah Pasien
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Pasien', value: MOCK_PATIENTS.length, color: PINK },
          { label: 'Pasien Baru Bulan Ini', value: 3, color: BLUE },
          { label: 'Kunjungan Hari Ini', value: 8, color: '#10B981' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
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
          placeholder="Cari nama, nomor HP, atau No. Rekam Medis..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
        />
      </div>

      {/* Patient Cards */}
      <div className="grid gap-3">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => { setSelected(p); setTab('info'); }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
            >
              {p.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800">{p.name}</div>
              <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1"><Phone size={11} />{p.phone}</span>
                <span className="text-gray-300">·</span>
                <span>{p.mrn}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs text-gray-400">Kunjungan terakhir</div>
              <div className="text-sm font-medium text-gray-700 mt-0.5">{p.lastVisit}</div>
              <div className="text-xs mt-1" style={{ color: PINK }}>{p.totalVisits}x kunjungan</div>
            </div>
            <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-2xl">
            Tidak ada pasien ditemukan
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
                  >
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">{selected.name}</div>
                    <div className="text-sm text-gray-400">{selected.mrn}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                    <Edit3 size={16} className="text-gray-500" />
                  </button>
                  <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                    <X size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b">
                {(['info', 'records'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="flex-1 py-3 text-sm font-medium transition-colors border-b-2"
                    style={tab === t ? { color: PINK, borderColor: PINK } : { color: '#9CA3AF', borderColor: 'transparent' }}
                  >
                    {t === 'info' ? 'Info Pasien' : 'Rekam Medis'}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {tab === 'info' ? (
                  <div className="space-y-4">
                    {[
                      { label: 'Telepon', value: selected.phone, icon: Phone },
                      { label: 'Email', value: selected.email, icon: Mail },
                      { label: 'Tanggal Lahir', value: `${selected.dob} (${calcAge(selected.dob)} tahun)`, icon: Calendar },
                      { label: 'Jenis Kelamin', value: selected.gender === 'M' ? 'Laki-laki' : 'Perempuan', icon: Activity },
                      { label: 'Alamat', value: selected.address, icon: FileText },
                    ].map(row => {
                      const Icon = row.icon;
                      return (
                        <div key={row.label} className="flex gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon size={15} className="text-gray-500" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">{row.label}</div>
                            <div className="text-sm font-medium text-gray-800 mt-0.5">{row.value}</div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="bg-gray-50 rounded-xl p-4 mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total kunjungan</span>
                        <span className="font-bold" style={{ color: PINK }}>{selected.totalVisits}x</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-400">Kunjungan terakhir</span>
                        <span className="font-medium text-gray-700">{selected.lastVisit}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {MOCK_RECORDS.map((r, i) => (
                      <div key={i} className="border border-gray-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm font-semibold text-gray-800">{r.service}</div>
                          <div className="text-xs text-gray-400">{r.date}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div><span className="text-gray-400">Dokter: </span><span className="text-gray-700">{r.doctor}</span></div>
                          <div><span className="text-gray-400">Diagnosis: </span><span className="text-gray-700">{r.diagnosis}</span></div>
                          <div><span className="text-gray-400">Tindakan: </span><span className="text-gray-700">{r.treatment}</span></div>
                          <div><span className="text-gray-400">Catatan: </span><span className="text-gray-700">{r.notes}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
