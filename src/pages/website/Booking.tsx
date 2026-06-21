import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Check, ChevronRight, ChevronLeft, Calendar, Clock,
  User, Star, ArrowRight, CheckCircle, Phone, Mail,
} from 'lucide-react';
import { DOCTORS, SERVICES, TIME_SLOTS } from '../../data/mockData';
import { AnimatedDentalBg } from '../../components/ui/AnimatedDentalBg';

const formatPrice = (p: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

const serviceIcons: Record<string, string> = {
  s1: '🦷', s2: '✨', s3: '🔧', s4: '❌', s5: '😁', s6: '🔩', s7: '💊', s8: '➕',
};

function DoctorAvatar({ name, size = 56 }: { name: string; size?: number }) {
  const letter = name.replace('drg. ', '')[0];
  const colors = [
    'linear-gradient(135deg, #E91E8C, #FF6BB5)',
    'linear-gradient(135deg, #4FC3F7, #0288D1)',
    'linear-gradient(135deg, #A78BFA, #7C3AED)',
    'linear-gradient(135deg, #10B981, #059669)',
  ];
  const idx = name.charCodeAt(5) % colors.length;
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
      style={{ width: size, height: size, background: colors[idx], fontSize: size * 0.38 }}
    >
      {letter}
    </div>
  );
}

const steps = [
  { label: 'Layanan', icon: <Star size={16} /> },
  { label: 'Dokter', icon: <User size={16} /> },
  { label: 'Jadwal', icon: <Calendar size={16} /> },
  { label: 'Data Diri', icon: <User size={16} /> },
  { label: 'Konfirmasi', icon: <Check size={16} /> },
];

interface BookingState {
  serviceId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  isNewPatient: boolean;
}

const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    serviceId: '',
    doctorId: '',
    date: getTomorrowDate(),
    timeSlot: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
    isNewPatient: true,
  });

  const selectedService = SERVICES.find((s) => s.id === booking.serviceId);
  const selectedDoctor = DOCTORS.find((d) => d.id === booking.doctorId);
  const availableSlots = TIME_SLOTS;

  const canProceed = () => {
    if (currentStep === 0) return !!booking.serviceId;
    if (currentStep === 1) return !!booking.doctorId;
    if (currentStep === 2) return !!booking.date && !!booking.timeSlot;
    if (currentStep === 3) return !!booking.name && !!booking.phone;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4" style={{ background: '#FAFAFA' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full rounded-3xl p-10 text-center shadow-2xl"
          style={{ background: 'white' }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
          >
            <CheckCircle size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-black mb-3" style={{ color: '#1A1A2E' }}>Janji Berhasil Dibuat!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Terima kasih, <strong>{booking.name}</strong>! Janji temu Anda telah terdaftar. Tim kami akan menghubungi Anda di <strong>{booking.phone}</strong> untuk konfirmasi.
          </p>

          <div
            className="rounded-2xl p-5 mb-8 text-left space-y-3"
            style={{ background: '#FFF5F9', border: '1px solid rgba(233,30,140,0.15)' }}
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Layanan</span>
              <span className="font-bold" style={{ color: '#1A1A2E' }}>{selectedService?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dokter</span>
              <span className="font-bold" style={{ color: '#1A1A2E' }}>{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tanggal & Waktu</span>
              <span className="font-bold" style={{ color: '#1A1A2E' }}>{booking.date} — {booking.timeSlot}</span>
            </div>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row">
            <Link
              to="/"
              className="flex-1 py-3 rounded-xl text-sm font-bold text-center transition-all duration-200"
              style={{ border: '2px solid #E91E8C', color: '#E91E8C' }}
            >
              Kembali ke Beranda
            </Link>
            <button
              onClick={() => { setSubmitted(false); setCurrentStep(0); setBooking({ ...booking, serviceId: '', doctorId: '', timeSlot: '', name: '', phone: '', email: '', notes: '' }); }}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
            >
              Buat Janji Baru
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(233,30,140,0.08)' }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />
        <AnimatedDentalBg />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: '#111827' }}>Buat Janji Temu</h1>
          <p className="text-base" style={{ color: '#6B7280' }}>Isi formulir berikut untuk menjadwalkan kunjungan Anda</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 -z-0" />
            <div
              className="absolute top-5 left-5 h-0.5 transition-all duration-500 -z-0"
              style={{
                background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)',
                width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 10px)`,
              }}
            />
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center z-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2"
                  style={{
                    background: i <= currentStep ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : 'white',
                    borderColor: i <= currentStep ? '#E91E8C' : '#E5E7EB',
                    color: i <= currentStep ? 'white' : '#9CA3AF',
                  }}
                >
                  {i < currentStep ? <Check size={16} /> : step.icon}
                </div>
                <span
                  className="text-xs mt-1.5 font-semibold hidden sm:block"
                  style={{ color: i <= currentStep ? '#E91E8C' : '#9CA3AF' }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {/* Step 0: Select Service */}
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black mb-2" style={{ color: '#1A1A2E' }}>Pilih Layanan</h2>
              <p className="text-gray-500 mb-6">Pilih jenis layanan yang Anda butuhkan</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setBooking({ ...booking, serviceId: service.id })}
                    className="p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-1"
                    style={{
                      borderColor: booking.serviceId === service.id ? '#E91E8C' : '#E5E7EB',
                      background: booking.serviceId === service.id ? '#FFF5F9' : 'white',
                      boxShadow: booking.serviceId === service.id ? '0 4px 20px rgba(233,30,140,0.15)' : 'none',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: service.color + '18' }}
                      >
                        {serviceIcons[service.id]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm" style={{ color: '#1A1A2E' }}>{service.name}</h3>
                          {booking.serviceId === service.id && (
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: '#E91E8C' }}
                            >
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{service.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs font-bold" style={{ color: service.color }}>
                            {formatPrice(service.priceMin)}+
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={10} />
                            {service.duration} mnt
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Select Doctor */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black mb-2" style={{ color: '#1A1A2E' }}>Pilih Dokter</h2>
              <p className="text-gray-500 mb-6">Pilih dokter yang akan menangani Anda</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOCTORS.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => doctor.available && setBooking({ ...booking, doctorId: doctor.id })}
                    disabled={!doctor.available}
                    className="p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{
                      borderColor: booking.doctorId === doctor.id ? '#E91E8C' : '#E5E7EB',
                      background: booking.doctorId === doctor.id ? '#FFF5F9' : 'white',
                      boxShadow: booking.doctorId === doctor.id ? '0 4px 20px rgba(233,30,140,0.15)' : 'none',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <DoctorAvatar name={doctor.name} size={56} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-sm" style={{ color: '#1A1A2E' }}>{doctor.name}</h3>
                            <p className="text-xs mt-0.5" style={{ color: '#E91E8C' }}>{doctor.specialty}</p>
                          </div>
                          {booking.doctorId === doctor.id && (
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: '#E91E8C' }}
                            >
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} size={11} fill={s <= Math.round(doctor.rating) ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{doctor.rating} ({doctor.reviewCount})</span>
                        </div>
                        <div className="mt-2 flex gap-2 flex-wrap">
                          {doctor.schedule.slice(0, 3).map((day) => (
                            <span
                              key={day}
                              className="text-xs px-2 py-0.5 rounded-lg font-medium"
                              style={{ background: '#FFF5F9', color: '#E91E8C' }}
                            >
                              {day.slice(0, 3)}
                            </span>
                          ))}
                          {!doctor.available && (
                            <span className="text-xs px-2 py-0.5 rounded-lg font-medium bg-gray-100 text-gray-400">
                              Tidak Tersedia
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Date & Time */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black mb-2" style={{ color: '#1A1A2E' }}>Pilih Jadwal</h2>
              <p className="text-gray-500 mb-6">Pilih tanggal dan waktu yang sesuai</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date Picker */}
                <div className="rounded-2xl p-6" style={{ background: 'white', border: '1px solid #E5E7EB' }}>
                  <h3 className="font-bold text-base mb-4" style={{ color: '#1A1A2E' }}>
                    <span className="flex items-center gap-2"><Calendar size={16} style={{ color: '#E91E8C' }} /> Pilih Tanggal</span>
                  </h3>
                  <input
                    type="date"
                    value={booking.date}
                    min={getTomorrowDate()}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm font-medium focus:outline-none transition-colors"
                    style={{ borderColor: booking.date ? '#E91E8C' : '#E5E7EB', color: '#1A1A2E' }}
                  />
                  {selectedDoctor && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Jadwal {selectedDoctor.name}:</p>
                      <div className="flex gap-2 flex-wrap">
                        {selectedDoctor.schedule.map((day) => (
                          <span
                            key={day}
                            className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                            style={{ background: '#FFF5F9', color: '#E91E8C', border: '1px solid rgba(233,30,140,0.2)' }}
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Time Slots */}
                <div className="rounded-2xl p-6" style={{ background: 'white', border: '1px solid #E5E7EB' }}>
                  <h3 className="font-bold text-base mb-4" style={{ color: '#1A1A2E' }}>
                    <span className="flex items-center gap-2"><Clock size={16} style={{ color: '#E91E8C' }} /> Pilih Waktu</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && setBooking({ ...booking, timeSlot: slot.time })}
                        disabled={!slot.available}
                        className="py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          borderColor: booking.timeSlot === slot.time ? '#E91E8C' : '#E5E7EB',
                          background: booking.timeSlot === slot.time ? '#E91E8C' : 'white',
                          color: booking.timeSlot === slot.time ? 'white' : '#374151',
                        }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded" style={{ background: '#E91E8C' }} />
                      Dipilih
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded border border-gray-300" />
                      Tersedia
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-gray-100" />
                      Penuh
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Personal Info */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black mb-2" style={{ color: '#1A1A2E' }}>Data Diri</h2>
              <p className="text-gray-500 mb-6">Isi informasi pribadi Anda untuk pendaftaran</p>

              <div className="rounded-2xl p-6 space-y-5" style={{ background: 'white', border: '1px solid #E5E7EB' }}>
                {/* Patient type */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: '#1A1A2E' }}>Tipe Pasien</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: true, label: 'Pasien Baru', desc: 'Pertama kali ke OMDC Dental' },
                      { val: false, label: 'Pasien Lama', desc: 'Sudah terdaftar sebelumnya' },
                    ].map(({ val, label, desc }) => (
                      <button
                        key={String(val)}
                        onClick={() => setBooking({ ...booking, isNewPatient: val })}
                        className="p-4 rounded-xl border-2 text-left transition-all duration-200"
                        style={{
                          borderColor: booking.isNewPatient === val ? '#E91E8C' : '#E5E7EB',
                          background: booking.isNewPatient === val ? '#FFF5F9' : 'white',
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-bold" style={{ color: '#1A1A2E' }}>{label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                          </div>
                          {booking.isNewPatient === val && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#E91E8C' }}>
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>
                    Nama Lengkap <span style={{ color: '#E91E8C' }}>*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      value={booking.name}
                      onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                      style={{
                        borderColor: booking.name ? '#E91E8C' : '#E5E7EB',
                        color: '#1A1A2E',
                      }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>
                    Nomor Telepon <span style={{ color: '#E91E8C' }}>*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="+62 8xx xxxx xxxx"
                      value={booking.phone}
                      onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                      style={{
                        borderColor: booking.phone ? '#E91E8C' : '#E5E7EB',
                        color: '#1A1A2E',
                      }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={booking.email}
                      onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                      style={{
                        borderColor: booking.email ? '#E91E8C' : '#E5E7EB',
                        color: '#1A1A2E',
                      }}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>Catatan / Keluhan</label>
                  <textarea
                    placeholder="Jelaskan keluhan atau informasi tambahan untuk dokter..."
                    value={booking.notes}
                    onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors resize-none"
                    style={{ borderColor: booking.notes ? '#E91E8C' : '#E5E7EB', color: '#1A1A2E' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black mb-2" style={{ color: '#1A1A2E' }}>Konfirmasi Janji</h2>
              <p className="text-gray-500 mb-6">Periksa kembali detail janji temu Anda sebelum konfirmasi</p>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Summary */}
                <div className="lg:col-span-3 space-y-4">
                  {/* Service */}
                  <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid #E5E7EB' }}>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Layanan</p>
                    {selectedService && (
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                          style={{ background: selectedService.color + '18' }}
                        >
                          {serviceIcons[selectedService.id]}
                        </div>
                        <div>
                          <p className="font-bold" style={{ color: '#1A1A2E' }}>{selectedService.name}</p>
                          <p className="text-sm text-gray-500">{selectedService.duration} menit estimasi</p>
                          <p className="text-sm font-bold mt-1" style={{ color: selectedService.color }}>
                            {formatPrice(selectedService.priceMin)}+
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Doctor */}
                  <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid #E5E7EB' }}>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Dokter</p>
                    {selectedDoctor && (
                      <div className="flex items-center gap-4">
                        <DoctorAvatar name={selectedDoctor.name} size={48} />
                        <div>
                          <p className="font-bold" style={{ color: '#1A1A2E' }}>{selectedDoctor.name}</p>
                          <p className="text-sm" style={{ color: '#E91E8C' }}>{selectedDoctor.specialty}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={12} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                            <span className="text-xs font-bold" style={{ color: '#1A1A2E' }}>{selectedDoctor.rating}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Schedule */}
                  <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid #E5E7EB' }}>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Jadwal</p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} style={{ color: '#E91E8C' }} />
                        <span className="text-sm font-semibold" style={{ color: '#1A1A2E' }}>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} style={{ color: '#E91E8C' }} />
                        <span className="text-sm font-semibold" style={{ color: '#1A1A2E' }}>{booking.timeSlot} WIB</span>
                      </div>
                    </div>
                  </div>

                  {/* Patient */}
                  <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid #E5E7EB' }}>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Data Pasien</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User size={14} style={{ color: '#E91E8C' }} />
                        <span className="text-sm font-semibold" style={{ color: '#1A1A2E' }}>{booking.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-lg font-medium" style={{ background: '#FFF5F9', color: '#E91E8C' }}>
                          {booking.isNewPatient ? 'Pasien Baru' : 'Pasien Lama'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} style={{ color: '#E91E8C' }} />
                        <span className="text-sm" style={{ color: '#1A1A2E' }}>{booking.phone}</span>
                      </div>
                      {booking.email && (
                        <div className="flex items-center gap-2">
                          <Mail size={14} style={{ color: '#E91E8C' }} />
                          <span className="text-sm" style={{ color: '#1A1A2E' }}>{booking.email}</span>
                        </div>
                      )}
                      {booking.notes && (
                        <div className="mt-3 p-3 rounded-xl text-sm text-gray-600 bg-gray-50">
                          <p className="font-semibold text-xs text-gray-500 mb-1">Catatan:</p>
                          {booking.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="lg:col-span-2">
                  <div
                    className="rounded-2xl p-5 sticky top-32"
                    style={{ background: 'white', border: '1px solid #E5E7EB' }}
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-4">Ringkasan Biaya</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Biaya Konsultasi</span>
                        <span className="font-semibold" style={{ color: '#1A1A2E' }}>
                          {selectedService ? formatPrice(selectedService.priceMin) : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Biaya Administrasi</span>
                        <span className="font-semibold" style={{ color: '#1A1A2E' }}>Gratis</span>
                      </div>
                      <div
                        className="border-t pt-3 flex justify-between font-bold"
                        style={{ borderColor: '#F3F4F6' }}
                      >
                        <span style={{ color: '#1A1A2E' }}>Estimasi Total</span>
                        <span style={{ color: '#E91E8C' }}>
                          {selectedService ? `${formatPrice(selectedService.priceMin)}+` : '-'}
                        </span>
                      </div>
                    </div>

                    <div
                      className="mt-4 p-3 rounded-xl text-xs text-gray-500"
                      style={{ background: '#FAFAFA' }}
                    >
                      *Harga final dapat berbeda tergantung tindakan yang diperlukan dan akan dikonfirmasi oleh dokter.
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full mt-5 py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                      style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 4px 20px rgba(233,30,140,0.3)' }}
                    >
                      <CheckCircle size={18} />
                      Konfirmasi Janji
                    </button>

                    <p className="text-xs text-center text-gray-400 mt-3">
                      Tim kami akan menghubungi Anda untuk konfirmasi dalam 1×24 jam.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-30"
            style={{ border: '2px solid #E5E7EB', color: '#6B7280', background: 'white' }}
          >
            <ChevronLeft size={16} />
            Sebelumnya
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: canProceed() ? '0 4px 14px rgba(233,30,140,0.3)' : 'none' }}
            >
              Selanjutnya
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 4px 14px rgba(233,30,140,0.3)' }}
            >
              <CheckCircle size={16} />
              Konfirmasi
            </button>
          )}
        </div>

        {/* Step indicator text */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Langkah {currentStep + 1} dari {steps.length}
        </p>
      </div>

      {/* Info bar */}
      <div className="py-10" style={{ background: 'white', borderTop: '1px solid #F3F4F6' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: <CheckCircle size={20} style={{ color: '#10B981' }} />, title: 'Konfirmasi Cepat', desc: 'Respon dalam 1×24 jam' },
              { icon: <Calendar size={20} style={{ color: '#4FC3F7' }} />, title: 'Penjadwalan Fleksibel', desc: 'Buka Senin - Sabtu' },
              { icon: <ArrowRight size={20} style={{ color: '#E91E8C' }} />, title: 'Gratis Konsultasi', desc: 'Untuk pasien baru' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="text-left">
                  <p className="text-sm font-bold" style={{ color: '#1A1A2E' }}>{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
