import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Camera, User, Phone, Calendar, Users } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';

type RegStep = 'start' | 'form' | 'processing' | 'done';

interface FormData {
  namaLengkap: string;
  noHp: string;
  tglLahir: string;
  jenisKelamin: 'L' | 'P' | '';
}

export function KioskNewPatient({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const [regStep, setRegStep] = useState<RegStep>('start');
  const [form, setForm] = useState<FormData>({
    namaLengkap: '',
    noHp: '',
    tglLahir: '',
    jenisKelamin: '',
  });
  const [activeField, setActiveField] = useState<keyof FormData | null>(null);

  const isFormValid = form.namaLengkap.length >= 3 && form.noHp.length >= 10 && form.jenisKelamin !== '';

  const handleStartRegistration = () => setRegStep('form');

  const handleSubmit = () => {
    setRegStep('processing');
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        patientName: form.namaLengkap,
        queueNumber: 'A' + String(Math.floor(Math.random() * 10) + 18).padStart(3, '0'),
      }));
      setRegStep('done');
      setTimeout(() => goTo('ticket'), 2000);
    }, 2500);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35 }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '28px 60px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '34px', fontWeight: '800', color: '#1A1A2E', marginBottom: '4px' }}>
          {t ? 'New Patient Registration' : 'Registrasi Pasien Baru'}
        </div>
        <div style={{ fontSize: '17px', color: '#6B7280' }}>
          {t ? 'Quick registration to get started' : 'Registrasi cepat untuk memulai layanan'}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '28px 60px', overflowY: 'auto' }}>
        <AnimatePresence mode="wait">

          {/* Start screen */}
          {regStep === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '32px',
                textAlign: 'center',
              }}
            >
              {/* KTP illustration */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '200px',
                  height: '130px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #4FC3F7, #0288D1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 12px 40px rgba(79,195,247,0.4)',
                  padding: '24px',
                }}
              >
                <Camera size={48} color="white" strokeWidth={1.5} />
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'rgba(255,255,255,0.9)' }}>
                  {t ? 'KTP / ID Card' : 'KTP Anda'}
                </div>
              </motion.div>

              <div>
                <div style={{ fontSize: '26px', fontWeight: '800', color: '#1A1A2E', marginBottom: '10px' }}>
                  {t ? 'Prepare your ID card for registration' : 'Siapkan KTP Anda untuk melakukan registrasi'}
                </div>
                <div style={{ fontSize: '17px', color: '#6B7280', maxWidth: '560px', lineHeight: '1.6' }}>
                  {t
                    ? 'We will use your ID card to fill in your registration data automatically.'
                    : 'Kami akan menggunakan KTP Anda untuk mengisi data pendaftaran secara otomatis.'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartRegistration}
                  style={{
                    padding: '18px 56px',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                    color: '#ffffff',
                    fontSize: '20px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 6px 24px rgba(233,30,140,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <Camera size={22} />
                  {t ? 'Start Registration' : 'Mulai Registrasi'}
                </motion.button>
              </div>

              <div style={{
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '14px',
                padding: '14px 24px',
                fontSize: '15px',
                color: '#92400E',
                maxWidth: '480px',
              }}>
                💡 {t ? 'If you don\'t have an ID, you can fill in the form manually.' : 'Jika tidak memiliki KTP, Anda dapat mengisi formulir secara manual.'}
              </div>
            </motion.div>
          )}

          {/* Form screen */}
          {regStep === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              style={{
                display: 'flex',
                gap: '32px',
                height: '100%',
              }}
            >
              {/* Left: form */}
              <div style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '28px 32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#1A1A2E' }}>
                  {t ? 'Patient Information' : 'Informasi Pasien'}
                </div>

                {/* Full name */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '700', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <User size={14} /> {t ? 'Full Name *' : 'Nama Lengkap *'}
                  </label>
                  <input
                    value={form.namaLengkap}
                    onChange={e => updateField('namaLengkap', e.target.value)}
                    onFocus={() => setActiveField('namaLengkap')}
                    onBlur={() => setActiveField(null)}
                    placeholder={t ? 'e.g. Budi Santoso' : 'cth. Budi Santoso'}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      fontSize: '18px',
                      border: `2px solid ${activeField === 'namaLengkap' ? '#E91E8C' : '#E5E7EB'}`,
                      borderRadius: '12px',
                      outline: 'none',
                      color: '#1A1A2E',
                      backgroundColor: '#F9FAFB',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s',
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '700', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Phone size={14} /> {t ? 'Mobile Number *' : 'No. HP *'}
                  </label>
                  <input
                    type="tel"
                    value={form.noHp}
                    onChange={e => updateField('noHp', e.target.value)}
                    onFocus={() => setActiveField('noHp')}
                    onBlur={() => setActiveField(null)}
                    placeholder="08xx xxxx xxxx"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      fontSize: '18px',
                      border: `2px solid ${activeField === 'noHp' ? '#E91E8C' : '#E5E7EB'}`,
                      borderRadius: '12px',
                      outline: 'none',
                      color: '#1A1A2E',
                      backgroundColor: '#F9FAFB',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s',
                    }}
                  />
                </div>

                {/* Date of birth */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '700', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Calendar size={14} /> {t ? 'Date of Birth' : 'Tanggal Lahir'}
                  </label>
                  <input
                    type="date"
                    value={form.tglLahir}
                    onChange={e => updateField('tglLahir', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      fontSize: '18px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '12px',
                      outline: 'none',
                      color: '#1A1A2E',
                      backgroundColor: '#F9FAFB',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '700', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Users size={14} /> {t ? 'Gender *' : 'Jenis Kelamin *'}
                  </label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[
                      { val: 'L', label: t ? 'Male' : 'Laki-laki', emoji: '♂️' },
                      { val: 'P', label: t ? 'Female' : 'Perempuan', emoji: '♀️' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => updateField('jenisKelamin', opt.val)}
                        style={{
                          flex: 1,
                          padding: '14px',
                          borderRadius: '12px',
                          border: `2px solid ${form.jenisKelamin === opt.val ? '#E91E8C' : '#E5E7EB'}`,
                          backgroundColor: form.jenisKelamin === opt.val ? '#FFF5F9' : '#ffffff',
                          color: form.jenisKelamin === opt.val ? '#E91E8C' : '#6B7280',
                          fontSize: '17px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.15s',
                        }}
                      >
                        <span>{opt.emoji}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: preview + submit */}
              <div style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                {/* Preview card */}
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  flex: 1,
                }}>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#9CA3AF', marginBottom: '16px', letterSpacing: '1px' }}>
                    {t ? 'PREVIEW' : 'PRATINJAU'}
                  </div>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '32px', fontWeight: '800', color: '#ffffff',
                    marginBottom: '16px',
                  }}>
                    {form.namaLengkap?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#1A1A2E', marginBottom: '6px' }}>
                    {form.namaLengkap || (t ? 'Full Name' : 'Nama Lengkap')}
                  </div>
                  <div style={{ fontSize: '15px', color: '#9CA3AF' }}>
                    {form.noHp || (t ? 'Phone Number' : 'No. HP')}
                  </div>
                  {form.jenisKelamin && (
                    <div style={{ marginTop: '8px', fontSize: '14px', color: '#6B7280' }}>
                      {form.jenisKelamin === 'L' ? (t ? 'Male' : 'Laki-laki') : (t ? 'Female' : 'Perempuan')}
                    </div>
                  )}
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  style={{
                    width: '100%',
                    padding: '18px',
                    borderRadius: '14px',
                    border: 'none',
                    background: isFormValid ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)' : '#E5E7EB',
                    color: isFormValid ? '#ffffff' : '#9CA3AF',
                    fontSize: '18px',
                    fontWeight: '700',
                    cursor: isFormValid ? 'pointer' : 'not-allowed',
                    boxShadow: isFormValid ? '0 4px 16px rgba(233,30,140,0.35)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  {t ? 'Register Now' : 'Daftar Sekarang'}
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Processing */}
          {regStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '80px', height: '80px',
                  border: '6px solid #FCE7F3',
                  borderTopColor: '#E91E8C',
                  borderRadius: '50%',
                }}
              />
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1A1A2E' }}>
                {t ? 'Registering...' : 'Mendaftarkan...'}
              </div>
              <div style={{ fontSize: '16px', color: '#9CA3AF' }}>
                {t ? 'Please wait a moment' : 'Mohon tunggu sebentar'}
              </div>
            </motion.div>
          )}

          {/* Done */}
          {regStep === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                style={{
                  width: '100px', height: '100px',
                  borderRadius: '50%',
                  backgroundColor: '#D1FAE5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '52px',
                }}
              >
                ✓
              </motion.div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#1A1A2E' }}>
                {t ? 'Registration Successful!' : 'Registrasi Berhasil!'}
              </div>
              <div style={{ fontSize: '18px', color: '#6B7280' }}>
                {t ? 'Redirecting to ticket...' : 'Mengarahkan ke tiket...'}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      {regStep !== 'processing' && regStep !== 'done' && (
        <div style={{
          padding: '16px 40px',
          borderTop: '1px solid #F3F4F6',
          backgroundColor: '#ffffff',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
        }}>
          <button
            onClick={regStep === 'form' ? () => setRegStep('start') : goBack}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 28px', borderRadius: '14px',
              border: '2px solid #E5E7EB', backgroundColor: '#ffffff',
              color: '#6B7280', fontSize: '17px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#E91E8C';
              (e.currentTarget as HTMLButtonElement).style.color = '#E91E8C';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB';
              (e.currentTarget as HTMLButtonElement).style.color = '#6B7280';
            }}
          >
            <ChevronLeft size={20} />
            {t ? 'Back' : 'Kembali'}
          </button>
        </div>
      )}
    </motion.div>
  );
}
