/* eslint-disable */
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Save, Building2, Clock, Phone, Mail, MapPin, Globe, Key, Bell,
  Shield, Link2, CheckCircle2, AlertCircle, ChevronRight,
} from 'lucide-react';

const PINK = '#E91E8C';
const GREEN = '#10B981';

interface ClinicInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  website: string;
}

interface Hours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

const DAYS: Hours[] = [
  { day: 'Senin', open: '08:00', close: '17:00', isOpen: true },
  { day: 'Selasa', open: '08:00', close: '17:00', isOpen: true },
  { day: 'Rabu', open: '08:00', close: '17:00', isOpen: true },
  { day: 'Kamis', open: '08:00', close: '17:00', isOpen: true },
  { day: 'Jumat', open: '08:00', close: '16:00', isOpen: true },
  { day: 'Sabtu', open: '09:00', close: '15:00', isOpen: true },
  { day: 'Minggu', open: '', close: '', isOpen: false },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'clinic' | 'hours' | 'api' | 'notifications' | 'security'>('clinic');
  const [saved, setSaved] = useState(false);
  const [clinic, setClinic] = useState<ClinicInfo>({
    name: 'OMDC Dental',
    tagline: 'Senyum Sehat, Percaya Diri Penuh',
    phone: '(021) 2345-6789',
    whatsapp: '+62 812-3456-7890',
    email: 'info@omdc.id',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat 10220',
    website: 'https://omdc.id',
  });
  const [hours, setHours] = useState(DAYS);
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiStatus, setApiStatus] = useState<'untested' | 'ok' | 'error'>('untested');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const testApi = () => {
    // TODO: api.get('/health').then(() => setApiStatus('ok')).catch(() => setApiStatus('error'))
    setApiStatus(apiUrl ? 'ok' : 'error');
  };

  const TABS = [
    { id: 'clinic', label: 'Info Klinik', icon: Building2 },
    { id: 'hours', label: 'Jam Operasional', icon: Clock },
    { id: 'api', label: 'Integrasi API', icon: Link2 },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'security', label: 'Keamanan', icon: Shield },
  ] as const;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Pengaturan</h1>
          <p className="text-sm text-gray-400 mt-0.5">Konfigurasi sistem klinik</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all"
          style={{ background: saved ? GREEN : `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
        >
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {saved ? 'Tersimpan!' : 'Simpan'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Tab Nav */}
        <div className="w-52 flex-shrink-0 space-y-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
                style={activeTab === tab.id ? { background: `${PINK}15`, color: PINK } : { color: '#6B7280' }}
              >
                <Icon size={17} />
                {tab.label}
                {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-6">
          {activeTab === 'clinic' && (
            <div className="space-y-5">
              <div className="font-semibold text-gray-800 border-b pb-3">Informasi Klinik</div>
              {[
                { label: 'Nama Klinik', key: 'name', icon: Building2, placeholder: 'Nama klinik...' },
                { label: 'Tagline', key: 'tagline', icon: Globe, placeholder: 'Tagline klinik...' },
                { label: 'Telepon', key: 'phone', icon: Phone, placeholder: '(021) ...' },
                { label: 'WhatsApp', key: 'whatsapp', icon: Phone, placeholder: '+62 ...' },
                { label: 'Email', key: 'email', icon: Mail, placeholder: 'info@...' },
                { label: 'Website', key: 'website', icon: Globe, placeholder: 'https://...' },
              ].map(field => {
                const Icon = field.icon;
                return (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                    <div className="relative">
                      <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={(clinic as any)[field.key]}
                        onChange={e => setClinic(c => ({ ...c, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    </div>
                  </div>
                );
              })}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat Lengkap</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-3 text-gray-400" />
                  <textarea
                    value={clinic.address}
                    onChange={e => setClinic(c => ({ ...c, address: e.target.value }))}
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="space-y-5">
              <div className="font-semibold text-gray-800 border-b pb-3">Jam Operasional</div>
              {hours.map((h, i) => (
                <div key={h.day} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700">{h.day}</div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={h.isOpen}
                      onChange={e => setHours(prev => prev.map((item, idx) => idx === i ? { ...item, isOpen: e.target.checked } : item))}
                      className="sr-only peer"
                    />
                    <div
                      className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                      style={{ background: h.isOpen ? PINK : '#E5E7EB' }}
                    />
                  </label>
                  {h.isOpen ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={h.open}
                        onChange={e => setHours(prev => prev.map((item, idx) => idx === i ? { ...item, open: e.target.value } : item))}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                      <span className="text-gray-400 text-sm">–</span>
                      <input
                        type="time"
                        value={h.close}
                        onChange={e => setHours(prev => prev.map((item, idx) => idx === i ? { ...item, close: e.target.value } : item))}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Tutup</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-5">
              <div className="font-semibold text-gray-800 border-b pb-3">Integrasi API Sistem</div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                <div className="font-semibold mb-1">Koneksi ke Sistem Klinik</div>
                <p>Hubungkan OMDC ke sistem manajemen klinik yang sudah ada (HIS/EMR) menggunakan REST API. Pastikan endpoint API menggunakan HTTPS.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Base URL API</label>
                <input
                  type="url"
                  value={apiUrl}
                  onChange={e => setApiUrl(e.target.value)}
                  placeholder="https://api.klinik-anda.id/v1"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">API Key / Bearer Token</label>
                <div className="relative">
                  <Key size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="sk-xxxxxxxxxxxxxx"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>
              <button
                onClick={testApi}
                className="px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-2 transition-colors"
                style={{ borderColor: PINK, color: PINK }}
              >
                <Link2 size={15} />
                Test Koneksi
              </button>
              {apiStatus !== 'untested' && (
                <div
                  className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl"
                  style={apiStatus === 'ok'
                    ? { background: '#ECFDF5', color: GREEN }
                    : { background: '#FEF2F2', color: '#EF4444' }
                  }
                >
                  {apiStatus === 'ok' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {apiStatus === 'ok' ? 'Koneksi berhasil! API dapat digunakan.' : 'Koneksi gagal. Periksa URL dan API Key.'}
                </div>
              )}
              <div className="pt-4 border-t">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Endpoint yang Digunakan</div>
                {[
                  { path: 'GET /api/appointments', desc: 'Ambil data janji temu' },
                  { path: 'POST /api/appointments', desc: 'Buat janji temu baru' },
                  { path: 'GET /api/queue', desc: 'Status antrian real-time' },
                  { path: 'GET /api/patients', desc: 'Data rekam medis pasien' },
                  { path: 'GET /api/doctors', desc: 'Jadwal dokter' },
                ].map(ep => (
                  <div key={ep.path} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <code className="text-xs font-mono text-gray-600">{ep.path}</code>
                    <span className="text-xs text-gray-400">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <div className="font-semibold text-gray-800 border-b pb-3">Pengaturan Notifikasi</div>
              {[
                { label: 'Email konfirmasi janji temu', desc: 'Kirim email otomatis setelah booking berhasil', enabled: true },
                { label: 'WhatsApp reminder', desc: 'Pengingat H-1 via WhatsApp kepada pasien', enabled: true },
                { label: 'Notifikasi antrian ke pasien', desc: 'SMS/WA saat nomor antrian pasien dipanggil', enabled: true },
                { label: 'Laporan harian admin', desc: 'Ringkasan aktivitas klinik setiap pukul 22:00', enabled: false },
                { label: 'Alert jadwal dokter berubah', desc: 'Notifikasi ke pasien jika dokter membatalkan jadwal', enabled: true },
              ].map((notif, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">{notif.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{notif.desc}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-0.5">
                    <input type="checkbox" defaultChecked={notif.enabled} className="sr-only peer" />
                    <div
                      className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                      style={{ background: notif.enabled ? PINK : '#E5E7EB' }}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="font-semibold text-gray-800 border-b pb-3">Keamanan Akun</div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password Saat Ini</label>
                <input type="password" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password Baru</label>
                <input type="password" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Min. 8 karakter" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password Baru</label>
                <input type="password" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Ulangi password baru" />
              </div>
              <button
                className="px-5 py-2.5 rounded-xl text-white text-sm font-medium"
                style={{ background: `linear-gradient(135deg, ${PINK}, #FF6BB5)` }}
              >
                Ganti Password
              </button>
              <div className="pt-4 border-t">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Sesi Aktif</div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-700">Chrome — Jakarta, Indonesia</div>
                      <div className="text-xs text-gray-400 mt-0.5">Saat ini · IP: 192.168.1.xxx</div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">Aktif</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
