/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  RefreshCw,
  Plus,
  RotateCcw,
  Phone,
  CheckCircle2,
  SkipForward,
  Clock,
  Users,
  ChevronRight,
  Mic,
} from 'lucide-react';

const PINK = '#E91E8C';
const BLUE = '#4FC3F7';
const GREEN = '#10B981';
const AMBER = '#F59E0B';
const RED = '#EF4444';

// TODO: Replace with API call — queueService.getLiveQueue()
const INITIAL_QUEUE = [
  { id: '1', number: 'A017', patientName: 'Budi Santoso', service: 'Scaling & Polishing', doctor: 'drg. Sarah Sella', room: 'Ruang 2', status: 'serving' as const, arrivedAt: '09:15', phone: '0812-3456-7890' },
  { id: '2', number: 'A018', patientName: 'Andi Pratama', service: 'Scaling & Polishing', doctor: 'drg. Sarah Sella', room: 'Ruang 2', status: 'waiting' as const, arrivedAt: '09:20', phone: '0823-4567-8901' },
  { id: '3', number: 'A019', patientName: 'Siti Nurhaliza', service: 'Tambal Gigi', doctor: 'drg. Ivan Kontralizan', room: 'Ruang 1', status: 'waiting' as const, arrivedAt: '09:30', phone: '0834-5678-9012' },
  { id: '4', number: 'A020', patientName: 'Ahmad Fauzi', service: 'Pemeriksaan Gigi', doctor: 'drg. Andika Andilisa', room: 'Ruang 3', status: 'waiting' as const, arrivedAt: '09:45', phone: '0845-6789-0123' },
  { id: '5', number: 'A021', patientName: 'Rina Permatasari', service: 'Cabut Gigi', doctor: 'drg. Reza Rizki', room: 'Ruang 4', status: 'waiting' as const, arrivedAt: '10:00', phone: '0856-7890-1234' },
  { id: '6', number: 'A016', patientName: 'Dewi Susanti', service: 'Behel Kontrol', doctor: 'drg. Andika Andilisa', room: 'Ruang 3', status: 'done' as const, arrivedAt: '08:45', phone: '0867-8901-2345' },
  { id: '7', number: 'A015', patientName: 'Hendra Kusuma', service: 'Scaling', doctor: 'drg. Sarah Sella', room: 'Ruang 2', status: 'done' as const, arrivedAt: '08:30', phone: '0878-9012-3456' },
];

type QueueStatus = 'serving' | 'waiting' | 'done' | 'skipped';

const ROOM_MAP = [
  { room: 'Ruang 1', doctor: 'drg. Ivan Kontralizan', status: 'busy' },
  { room: 'Ruang 2', doctor: 'drg. Sarah Sella', status: 'busy' },
  { room: 'Ruang 3', doctor: 'drg. Andika Andilisa', status: 'busy' },
  { room: 'Ruang 4', doctor: 'drg. Reza Rizki', status: 'idle' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    serving: { label: 'Dilayani', color: PINK, bg: '#FFF0F8' },
    waiting: { label: 'Menunggu', color: AMBER, bg: '#FFFBEB' },
    done: { label: 'Selesai', color: GREEN, bg: '#F0FDF4' },
    skipped: { label: 'Dilewati', color: '#888', bg: '#F3F4F6' },
  };
  const s = map[status] ?? { label: status, color: '#888', bg: '#F3F4F6' };
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ color: s.color, background: s.bg }}>
      {s.label}
    </span>
  );
}

// Walk-in modal
function WalkinModal({ onClose, onAdd }: { onClose: () => void; onAdd: (name: string, service: string, doctor: string) => void }) {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [doctor, setDoctor] = useState('drg. Sarah Sella');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tambah Pasien Walk-in</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pasien</label>
            <input className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2" style={{ '--tw-ring-color': PINK } as any} value={name} onChange={e => setName(e.target.value)} placeholder="Nama lengkap" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Layanan</label>
            <input className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none" value={service} onChange={e => setService(e.target.value)} placeholder="cth. Scaling & Polishing" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dokter</label>
            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none" value={doctor} onChange={e => setDoctor(e.target.value)}>
              <option>drg. Sarah Sella</option>
              <option>drg. Andika Andilisa</option>
              <option>drg. Ivan Kontralizan</option>
              <option>drg. Reza Rizki</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Batal</button>
          <button
            onClick={() => { if (name && service) { onAdd(name, service, doctor); onClose(); } }}
            className="flex-1 py-2.5 rounded-xl text-sm text-white font-semibold"
            style={{ background: PINK }}
          >
            Tambah Antrian
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminQueue() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [filter, setFilter] = useState<string>('all');
  const [showWalkin, setShowWalkin] = useState(false);
  const [lastUpdated] = useState(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));

  const serving = queue.find(q => q.status === 'serving');
  const waiting = queue.filter(q => q.status === 'waiting');
  const done = queue.filter(q => q.status === 'done');

  const filtered = filter === 'all' ? queue : queue.filter(q => q.status === filter);

  // TODO: Replace with API call — queueService.callNext()
  const callNext = () => {
    setQueue(prev => {
      const next = [...prev];
      const currentServingIdx = next.findIndex(q => q.status === 'serving');
      const nextWaitingIdx = next.findIndex(q => q.status === 'waiting');
      if (currentServingIdx !== -1) next[currentServingIdx] = { ...next[currentServingIdx], status: 'done' };
      if (nextWaitingIdx !== -1) next[nextWaitingIdx] = { ...next[nextWaitingIdx], status: 'serving' };
      return next;
    });
  };

  // TODO: Replace with API call — queueService.markDone(id)
  const markDone = (id: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'done' } : q));
  };

  // TODO: Replace with API call — queueService.skipPatient(id)
  const skipPatient = (id: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'skipped' as any } : q));
  };

  // TODO: Replace with API call — queueService.callPatient(id)
  const callPatient = (id: string) => {
    setQueue(prev => prev.map(q => {
      if (q.id === id) return { ...q, status: 'serving' };
      if (q.status === 'serving') return { ...q, status: 'done' };
      return q;
    }));
  };

  // TODO: Replace with API call — queueService.addWalkin(data)
  const addWalkin = (name: string, service: string, doctor: string) => {
    const nextNum = queue.length + 15;
    setQueue(prev => [...prev, {
      id: String(Date.now()),
      number: `A0${nextNum}`,
      patientName: name,
      service,
      doctor,
      room: 'Ruang 1',
      status: 'waiting',
      arrivedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      phone: '-',
    }]);
  };

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Antrian</h1>
          <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1.5">
            <RefreshCw size={12} /> Terakhir diperbarui: {lastUpdated}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowWalkin(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} /> Walk-in
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-100 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <RotateCcw size={16} /> Reset
          </button>
          <button
            onClick={callNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
          >
            <Mic size={16} /> Panggil Berikutnya
          </button>
        </div>
      </div>

      {/* Live Status Banner */}
      {serving && (
        <motion.div
          key={serving.id}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 text-white overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${PINK} 0%, #C2185B 100%)` }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="text-sm text-pink-100 font-medium mb-1">Sedang Dilayani</div>
              <div className="text-5xl font-black tracking-wider mb-2">{serving.number}</div>
              <div className="font-semibold text-lg">{serving.patientName}</div>
              <div className="text-pink-200 text-sm">{serving.doctor} · {serving.room}</div>
              <div className="text-pink-200 text-sm">{serving.service}</div>
            </div>
            <div className="flex flex-row sm:flex-col gap-3 sm:gap-4 sm:text-right">
              {[
                { label: 'Menunggu', value: waiting.length, color: AMBER },
                { label: 'Selesai', value: done.length, color: GREEN },
                { label: 'Total', value: queue.length, color: '#fff' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl font-black" style={{ color: s.color === '#fff' ? 'rgba(255,255,255,0.9)' : 'white' }}>{s.value}</div>
                  <div className="text-xs text-pink-200">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Queue Table */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 px-5 py-3 border-b border-gray-50 overflow-x-auto">
            {[
              { key: 'all', label: 'Semua', count: queue.length },
              { key: 'serving', label: 'Dilayani', count: queue.filter(q => q.status === 'serving').length },
              { key: 'waiting', label: 'Menunggu', count: waiting.length },
              { key: 'done', label: 'Selesai', count: done.length },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                style={filter === tab.key
                  ? { background: PINK, color: 'white' }
                  : { color: '#666', background: 'transparent' }
                }
              >
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <th className="px-4 py-3 text-left font-semibold">No. Antrian</th>
                  <th className="px-4 py-3 text-left font-semibold">Nama Pasien</th>
                  <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Layanan</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Dokter</th>
                  <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Ruang</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Jam</th>
                  <th className="px-4 py-3 text-left font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filtered.map(q => (
                    <motion.tr
                      key={q.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`hover:bg-gray-50/50 transition-colors ${q.status === 'serving' ? 'bg-pink-50/40' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <span
                          className="font-bold text-sm px-2 py-1 rounded-lg"
                          style={{
                            background: q.status === 'serving' ? PINK : '#F3F4F6',
                            color: q.status === 'serving' ? 'white' : '#374151',
                          }}
                        >
                          {q.number}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm text-gray-800">{q.patientName}</div>
                        <div className="text-xs text-gray-400 md:hidden">{q.service}</div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-600">{q.service}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-sm text-gray-600">{q.doctor}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{q.room}</span>
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
                      <td className="px-4 py-3 hidden sm:table-cell text-xs text-gray-400">{q.arrivedAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {q.status === 'waiting' && (
                            <>
                              <button
                                onClick={() => callPatient(q.id)}
                                className="px-2.5 py-1 text-xs rounded-lg font-medium text-white transition-colors"
                                style={{ background: PINK }}
                              >
                                Panggil
                              </button>
                              <button
                                onClick={() => skipPatient(q.id)}
                                className="px-2.5 py-1 text-xs rounded-lg font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                              >
                                Lewati
                              </button>
                            </>
                          )}
                          {q.status === 'serving' && (
                            <button
                              onClick={() => markDone(q.id)}
                              className="px-2.5 py-1 text-xs rounded-lg font-medium text-white"
                              style={{ background: GREEN }}
                            >
                              Selesai
                            </button>
                          )}
                          {(q.status === 'done' || q.status === 'skipped') && (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-64 space-y-4">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Ringkasan</h3>
            <div className="space-y-3">
              {[
                { label: 'Dilayani', value: queue.filter(q => q.status === 'serving').length, color: PINK },
                { label: 'Menunggu', value: waiting.length, color: AMBER },
                { label: 'Selesai', value: done.length, color: GREEN },
                { label: 'Dilewati', value: queue.filter(q => q.status === 'skipped').length, color: '#9CA3AF' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-sm text-gray-600">{s.label}</span>
                  </div>
                  <span className="font-bold text-sm text-gray-800">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Availability */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Ketersediaan Ruang</h3>
            <div className="space-y-2.5">
              {ROOM_MAP.map(r => (
                <div key={r.room} className="flex items-start gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: r.status === 'busy' ? RED : GREEN }}
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-800">{r.room}</div>
                    <div className="text-xs text-gray-400">{r.doctor}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: r.status === 'busy' ? RED : GREEN }}>
                      {r.status === 'busy' ? 'Sedang digunakan' : 'Kosong'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Walk-in Modal */}
      <AnimatePresence>
        {showWalkin && (
          <WalkinModal onClose={() => setShowWalkin(false)} onAdd={addWalkin} />
        )}
      </AnimatePresence>
    </div>
  );
}
