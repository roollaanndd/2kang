/* eslint-disable */
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star, Phone, Mail, Calendar, CheckCircle2,
  Edit3, Plus, X, Clock, Stethoscope, Camera, Upload,
} from 'lucide-react';

const PINK = '#E91E8C';
const GREEN = '#10B981';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  initials: string;
  photoUrl: string | null;
  rating: number;
  totalPatients: number;
  isAvailableToday: boolean;
  schedule: Record<string, { start: string; end: string; available: boolean }>;
  bio: string;
}

const BASE_DOCTORS: Doctor[] = [
  {
    id: '1', name: 'drg. Sarah Sella', specialty: 'Orthodontist',
    phone: '0812-1111-0001', email: 'sarah@omdc.id',
    initials: 'SS', photoUrl: null, rating: 4.9, totalPatients: 342, isAvailableToday: true,
    bio: 'Spesialis ortodonti dengan pengalaman 8 tahun menangani kawat gigi dan aligner.',
    schedule: {
      Senin: { start: '08:00', end: '17:00', available: true },
      Selasa: { start: '08:00', end: '17:00', available: true },
      Rabu: { start: '08:00', end: '12:00', available: true },
      Kamis: { start: '08:00', end: '17:00', available: true },
      Jumat: { start: '08:00', end: '16:00', available: true },
      Sabtu: { start: '09:00', end: '14:00', available: false },
      Minggu: { start: '', end: '', available: false },
    },
  },
  {
    id: '2', name: 'drg. Ivan Kontralizan', specialty: 'Endodontist',
    phone: '0812-2222-0002', email: 'ivan@omdc.id',
    initials: 'IK', photoUrl: null, rating: 4.8, totalPatients: 218, isAvailableToday: true,
    bio: 'Dokter spesialis saluran akar dengan teknisi terkini untuk prosedur minim nyeri.',
    schedule: {
      Senin: { start: '09:00', end: '17:00', available: true },
      Selasa: { start: '09:00', end: '17:00', available: false },
      Rabu: { start: '09:00', end: '17:00', available: true },
      Kamis: { start: '09:00', end: '17:00', available: true },
      Jumat: { start: '09:00', end: '15:00', available: true },
      Sabtu: { start: '09:00', end: '13:00', available: true },
      Minggu: { start: '', end: '', available: false },
    },
  },
  {
    id: '3', name: 'drg. Andika Andilisa', specialty: 'Prosthodontist',
    phone: '0812-3333-0003', email: 'andika@omdc.id',
    initials: 'AA', photoUrl: null, rating: 4.7, totalPatients: 165, isAvailableToday: false,
    bio: 'Spesialis prostodontia untuk perawatan implan, mahkota, dan veneer porcelain.',
    schedule: {
      Senin: { start: '', end: '', available: false },
      Selasa: { start: '10:00', end: '18:00', available: true },
      Rabu: { start: '10:00', end: '18:00', available: true },
      Kamis: { start: '10:00', end: '18:00', available: true },
      Jumat: { start: '10:00', end: '16:00', available: true },
      Sabtu: { start: '09:00', end: '14:00', available: true },
      Minggu: { start: '', end: '', available: false },
    },
  },
  {
    id: '4', name: 'drg. Reza Rizki', specialty: 'Oral Surgeon',
    phone: '0812-4444-0004', email: 'reza@omdc.id',
    initials: 'RR', photoUrl: null, rating: 4.9, totalPatients: 289, isAvailableToday: true,
    bio: 'Ahli bedah mulut dan maksilofasial, spesialis pencabutan gigi dan operasi rahang.',
    schedule: {
      Senin: { start: '08:00', end: '16:00', available: true },
      Selasa: { start: '08:00', end: '16:00', available: true },
      Rabu: { start: '', end: '', available: false },
      Kamis: { start: '08:00', end: '16:00', available: true },
      Jumat: { start: '08:00', end: '15:00', available: true },
      Sabtu: { start: '08:00', end: '12:00', available: true },
      Minggu: { start: '', end: '', available: false },
    },
  },
];

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const AVATAR_GRADS = [
  'linear-gradient(135deg,#E91E8C,#FF6BB5)',
  'linear-gradient(135deg,#4FC3F7,#0288D1)',
  'linear-gradient(135deg,#A78BFA,#7C3AED)',
  'linear-gradient(135deg,#10B981,#059669)',
];

function DoctorAvatar({ doc, size = 64 }: { doc: Doctor; size?: number }) {
  const idx = parseInt(doc.id) % AVATAR_GRADS.length;
  const radius = size * 0.3125;
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: radius,
        overflow: 'hidden',
        background: doc.photoUrl ? undefined : AVATAR_GRADS[idx],
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {doc.photoUrl ? (
        <img src={doc.photoUrl} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ color: 'white', fontWeight: 900, fontSize: size * 0.28 }}>{doc.initials}</span>
      )}
    </div>
  );
}

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>(BASE_DOCTORS);
  const [selected, setSelected] = useState<Doctor | null>(null);
  const [editSchedule, setEditSchedule] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const handlePhotoUpload = (id: string, file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploading(id);
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setDoctors(prev => prev.map(d => d.id === id ? { ...d, photoUrl: url } : d));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, photoUrl: url } : null);
      setUploading(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Manajemen Dokter</h1>
          <p className="text-sm text-gray-400 mt-0.5">{doctors.length} dokter aktif</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
        >
          <Plus size={16} />
          Tambah Dokter
        </button>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelected(doc)}
          >
            <div className="flex items-start gap-4">
              {/* Avatar with upload overlay */}
              <div className="relative flex-shrink-0">
                <DoctorAvatar doc={doc} size={64} />
                <label
                  htmlFor={`photo-${doc.id}`}
                  onClick={e => e.stopPropagation()}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ background: '#1A1A2E', border: '2px solid white' }}
                  title="Upload foto"
                >
                  {uploading === doc.id ? (
                    <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <Camera size={11} color="white" />
                  )}
                  <input
                    id={`photo-${doc.id}`}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={e => { if (e.target.files?.[0]) handlePhotoUpload(doc.id, e.target.files[0]); }}
                  />
                </label>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-bold text-gray-800 truncate">{doc.name}</div>
                    <div className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
                      <Stethoscope size={12} />{doc.specialty}
                    </div>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0"
                    style={doc.isAvailableToday
                      ? { background: '#ECFDF5', color: GREEN }
                      : { background: '#FEF2F2', color: '#EF4444' }
                    }
                  >
                    {doc.isAvailableToday ? 'Hadir' : 'Libur'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={13} fill="currentColor" />
                    <span className="font-semibold">{doc.rating}</span>
                  </div>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-400">{doc.totalPatients} pasien</span>
                  {doc.photoUrl && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                        <CheckCircle2 size={11} /> Foto
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Schedule bar */}
            <div className="mt-4 flex gap-1">
              {DAYS.slice(0, 6).map(day => {
                const s = doc.schedule[day];
                return (
                  <div
                    key={day}
                    className="flex-1 h-1.5 rounded-full"
                    style={{ background: s.available ? PINK : '#E5E7EB' }}
                  />
                );
              })}
            </div>
            <div className="text-xs text-gray-400 mt-1.5">Jadwal mingguan</div>
          </motion.div>
        ))}
      </div>

      {/* Doctor Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setSelected(null); setEditSchedule(false); }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="p-6 border-b flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  {/* Avatar with upload in modal */}
                  <div className="relative flex-shrink-0">
                    <DoctorAvatar doc={selected} size={64} />
                    <label
                      htmlFor="modal-photo-upload"
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer shadow-md"
                      style={{ background: PINK, border: '2px solid white' }}
                      title="Ganti foto"
                    >
                      {uploading === selected.id ? (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <Camera size={13} color="white" />
                      )}
                      <input
                        id="modal-photo-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={e => { if (e.target.files?.[0]) handlePhotoUpload(selected.id, e.target.files[0]); }}
                      />
                    </label>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">{selected.name}</div>
                    <div className="text-sm text-gray-400">{selected.specialty}</div>
                    {!selected.photoUrl && (
                      <label
                        htmlFor="modal-photo-upload-2"
                        className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer px-2.5 py-1 rounded-full"
                        style={{ color: PINK, background: `${PINK}12` }}
                      >
                        <Upload size={11} /> Upload foto dokter
                        <input
                          id="modal-photo-upload-2"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={e => { if (e.target.files?.[0]) handlePhotoUpload(selected.id, e.target.files[0]); }}
                        />
                      </label>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => { setSelected(null); setEditSchedule(false); }}
                  className="p-2 rounded-xl hover:bg-gray-100 flex-shrink-0"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact */}
                <div className="space-y-2">
                  {[
                    { icon: Phone, val: selected.phone },
                    { icon: Mail, val: selected.email },
                  ].map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon size={14} className="text-gray-400" />{row.val}
                      </div>
                    );
                  })}
                </div>

                {/* Bio */}
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Tentang</div>
                  <p className="text-sm text-gray-600">{selected.bio}</p>
                </div>

                {/* Schedule */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Jadwal Praktik</div>
                    <button
                      onClick={() => setEditSchedule(v => !v)}
                      className="text-xs font-medium flex items-center gap-1"
                      style={{ color: PINK }}
                    >
                      <Edit3 size={12} />
                      {editSchedule ? 'Simpan' : 'Edit'}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {DAYS.map(day => {
                      const s = selected.schedule[day];
                      return (
                        <div key={day} className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-700 w-16">{day}</div>
                          <div className="flex items-center gap-2 flex-1">
                            {s.available ? (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock size={13} className="text-gray-400" />
                                <span>{s.start} – {s.end}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-300">Libur</span>
                            )}
                          </div>
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0"
                            style={{ background: s.available ? GREEN : '#E5E7EB' }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
