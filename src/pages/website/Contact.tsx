import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL, CLINIC_HOURS } from '../../data/mockData';
import { useCMS } from '../../context/CMSContext';

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const subjectOptions = [
  'Pertanyaan Umum',
  'Informasi Layanan',
  'Jadwal Dokter',
  'Informasi Harga',
  'Keluhan / Saran',
  'Lainnya',
];

export function Contact() {
  const { cms } = useCMS();
  const mapEmbed = cms.contact.mapEmbed;
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin size={22} />,
      title: 'Alamat Klinik',
      lines: [CLINIC_ADDRESS, 'Jakarta Selatan, DKI Jakarta 12345'],
      color: '#E91E8C',
      bg: '#FFF5F9',
      action: { label: 'Lihat di Google Maps', href: '#' },
    },
    {
      icon: <Phone size={22} />,
      title: 'Telepon',
      lines: [CLINIC_PHONE, 'WhatsApp: +62 812 9999 8888'],
      color: '#10B981',
      bg: '#F0FDF4',
      action: { label: 'Hubungi Sekarang', href: `tel:${CLINIC_PHONE}` },
    },
    {
      icon: <Mail size={22} />,
      title: 'Email',
      lines: [CLINIC_EMAIL, 'Balasan dalam 1×24 jam'],
      color: '#4FC3F7',
      bg: '#F0FAFF',
      action: { label: 'Kirim Email', href: `mailto:${CLINIC_EMAIL}` },
    },
    {
      icon: <Clock size={22} />,
      title: 'Jam Operasional',
      lines: [CLINIC_HOURS, 'Minggu: Tutup'],
      color: '#A78BFA',
      bg: '#F5F3FF',
      action: { label: 'Buat Janji', href: '/booking' },
    },
  ];

  const socialLinks = [
    { name: 'Instagram', handle: '@omdcdental', color: '#E4405F', icon: '📸' },
    { name: 'Facebook', handle: 'OMDC Dental Jakarta', color: '#1877F2', icon: '📘' },
    { name: 'WhatsApp', handle: '+62 812 9999 8888', color: '#25D366', icon: '💬' },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5 50%, #FFD6EC 80%, #FFF5F9)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-bold uppercase tracking-widest mb-4 text-white/80">Kami Siap Membantu</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">Hubungi Kami</h1>
            <p className="text-xl text-white/85 max-w-2xl mx-auto">
              Ada pertanyaan atau ingin membuat janji? Tim kami siap membantu Anda kapan saja.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: 'white' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: info.bg, color: info.color }}
                >
                  {info.icon}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#1A1A2E' }}>{info.title}</h3>
                {info.lines.map((line, j) => (
                  <p key={j} className={`text-sm ${j === 0 ? 'text-gray-700 font-medium' : 'text-gray-400 text-xs mt-0.5'}`}>
                    {line}
                  </p>
                ))}
                <a
                  href={info.action.href}
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold transition-colors duration-200"
                  style={{ color: info.color }}
                >
                  {info.action.label}
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main section: Form + Map */}
      <section className="py-16" style={{ background: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl p-8"
                style={{ background: 'white', border: '1px solid #E5E7EB' }}
              >
                {submitted ? (
                  <div className="text-center py-10">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                    >
                      <CheckCircle size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-3" style={{ color: '#1A1A2E' }}>Pesan Terkirim!</h3>
                    <p className="text-gray-500 mb-6 leading-relaxed">
                      Terima kasih, <strong>{form.name}</strong>! Pesan Anda telah kami terima. Tim kami akan menghubungi Anda di <strong>{form.phone || form.email}</strong> dalam 1×24 jam.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }); }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-black mb-1" style={{ color: '#1A1A2E' }}>Kirim Pesan</h2>
                      <p className="text-gray-500 text-sm">Isi formulir di bawah dan kami akan segera merespons</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>
                            Nama Lengkap <span style={{ color: '#E91E8C' }}>*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nama Anda"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                            style={{ borderColor: form.name ? '#E91E8C' : '#E5E7EB', color: '#1A1A2E' }}
                          />
                        </div>
                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>
                            Nomor Telepon <span style={{ color: '#E91E8C' }}>*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+62 8xx xxxx xxxx"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                            style={{ borderColor: form.phone ? '#E91E8C' : '#E5E7EB', color: '#1A1A2E' }}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>Email</label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                          style={{ borderColor: form.email ? '#E91E8C' : '#E5E7EB', color: '#1A1A2E' }}
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>
                          Subjek <span style={{ color: '#E91E8C' }}>*</span>
                        </label>
                        <select
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors appearance-none"
                          style={{ borderColor: form.subject ? '#E91E8C' : '#E5E7EB', color: form.subject ? '#1A1A2E' : '#9CA3AF' }}
                        >
                          <option value="">Pilih subjek pesan Anda</option>
                          {subjectOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: '#1A1A2E' }}>
                          Pesan <span style={{ color: '#E91E8C' }}>*</span>
                        </label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Tulis pesan Anda di sini..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors resize-none"
                          style={{ borderColor: form.message ? '#E91E8C' : '#E5E7EB', color: '#1A1A2E' }}
                        />
                        <p className="text-xs text-gray-400 mt-1 text-right">{form.message.length} karakter</p>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70"
                        style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)', boxShadow: '0 4px 20px rgba(233,30,140,0.3)' }}
                      >
                        {loading ? (
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={18} />
                            Kirim Pesan
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>

            {/* Right column: Map + info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid #E5E7EB', height: 280 }}
              >
                {mapEmbed ? (
                  <iframe
                    src={mapEmbed}
                    className="w-full h-full border-0"
                    title="Lokasi Klinik"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center relative"
                    style={{ background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)' }}
                  >
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `repeating-linear-gradient(0deg, #374151, #374151 1px, transparent 1px, transparent 40px),
                                          repeating-linear-gradient(90deg, #374151, #374151 1px, transparent 1px, transparent 40px)`,
                      }}
                    />
                    <div
                      className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                      style={{ background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)' }}
                    >
                      <MapPin size={28} className="text-white" />
                    </div>
                    <p className="relative z-10 text-base font-black" style={{ color: '#1A1A2E' }}>Peta Lokasi</p>
                    <p className="relative z-10 text-sm text-gray-500 mt-1 text-center px-4">{CLINIC_ADDRESS}</p>
                    <p className="relative z-10 text-xs text-gray-400 mt-2">Tambahkan Maps embed di Admin → Kontak</p>
                  </div>
                )}
              </motion.div>

              {/* Emergency */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl p-5"
                style={{ background: 'linear-gradient(135deg, #FFF5F9, white)', border: '1px solid rgba(233,30,140,0.2)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#E91E8C' }}
                  >
                    <AlertCircle size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: '#1A1A2E' }}>Layanan Darurat 24 Jam</p>
                    <p className="text-xs text-gray-500 mb-2">Untuk kondisi darurat gigi di luar jam operasional</p>
                    <a
                      href="tel:+628129999888"
                      className="inline-flex items-center gap-1.5 text-sm font-black"
                      style={{ color: '#E91E8C' }}
                    >
                      <Phone size={14} />
                      +62 812 9999 8888
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl p-5"
                style={{ background: 'white', border: '1px solid #E5E7EB' }}
              >
                <p className="font-bold text-sm mb-4" style={{ color: '#1A1A2E' }}>Ikuti Kami</p>
                <div className="space-y-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href="#"
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:-translate-x-1"
                      style={{ background: '#FAFAFA' }}
                    >
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <p className="text-sm font-bold" style={{ color: '#1A1A2E' }}>{s.name}</p>
                        <p className="text-xs text-gray-500">{s.handle}</p>
                      </div>
                      <ArrowRight size={14} className="ml-auto text-gray-400" />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a
                  href="https://wa.me/628129999888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #25D366, #20BA5C)' }}
                >
                  <MessageCircle size={20} />
                  Chat via WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#E91E8C' }}>Jadwal</p>
            <h2 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: '#1A1A2E' }}>Jam Operasional</h2>
            <div className="w-16 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #E91E8C, #FF6BB5)' }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {[
              { day: 'Senin', hours: '08.00 – 20.00 WIB', open: true },
              { day: 'Selasa', hours: '08.00 – 20.00 WIB', open: true },
              { day: 'Rabu', hours: '08.00 – 20.00 WIB', open: true },
              { day: 'Kamis', hours: '08.00 – 20.00 WIB', open: true },
              { day: 'Jumat', hours: '08.00 – 20.00 WIB', open: true },
              { day: 'Sabtu', hours: '08.00 – 17.00 WIB', open: true },
              { day: 'Minggu', hours: 'Tutup', open: false },
            ].map((schedule) => (
              <div
                key={schedule.day}
                className="flex items-center justify-between px-5 py-3 rounded-xl"
                style={{
                  background: schedule.open ? '#FFF5F9' : '#F9FAFB',
                  border: `1px solid ${schedule.open ? 'rgba(233,30,140,0.15)' : '#E5E7EB'}`,
                }}
              >
                <span className="font-semibold text-sm" style={{ color: '#1A1A2E' }}>{schedule.day}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: schedule.open ? '#E91E8C' : '#9CA3AF' }}
                >
                  {schedule.hours}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-6 p-4 rounded-2xl max-w-2xl mx-auto text-center"
            style={{ background: '#FFF5F9', border: '1px solid rgba(233,30,140,0.15)' }}
          >
            <p className="text-sm text-gray-600">
              <span className="font-bold" style={{ color: '#E91E8C' }}>Darurat di luar jam operasional?</span>{' '}
              Hubungi hotline darurat kami di{' '}
              <a href="tel:+628129999888" className="font-bold" style={{ color: '#E91E8C' }}>+62 812 9999 8888</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
