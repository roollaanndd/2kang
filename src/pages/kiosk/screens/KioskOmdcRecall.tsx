import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ScanLine, CheckCircle2, XCircle, Delete } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';
import { kioskSound } from '../../../lib/kioskSound';
import { lookupOmdcCode, seedDemoTransaction, checkInTransaction, type OmdcTransaction } from '../../../lib/omdcTransactions';
import { OmdcBarcode } from '../../../components/ui/OmdcBarcode';
import { useCMS } from '../../../context/CMSContext';

const PINK = '#E91E8C';
const ROSE = '#FF6BB5';
const AQUA = '#06B6D4';
const DARK = '#0D1421';

type Phase = 'entry' | 'searching' | 'found' | 'notfound';

const KEYS = [
  '1','2','3','4','5','6','7','8','9','0',
  'A','B','C','D','E','F','G','H','J','K',
  'L','M','N','P','Q','R','S','T','U','V',
  'W','X','Y','Z','-','⌫',
];

export function KioskOmdcRecall({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const { cms } = useCMS();
  const queuePrefix = cms.kioskSettings?.queuePrefix ?? 'A';
  const kioskPayment = cms.kioskSettings?.kioskPayment ?? true;
  const [value, setValue] = useState('');
  const [phase, setPhase] = useState<Phase>('entry');
  const [result, setResult] = useState<OmdcTransaction | null>(null);
  const [demo, setDemo] = useState<OmdcTransaction | null>(null);

  // Ensure there is always at least one recallable transaction for the demo.
  useEffect(() => { setDemo(seedDemoTransaction()); }, []);

  const submit = (code: string) => {
    kioskSound('tap');
    setPhase('searching');
    setTimeout(() => {
      const res = lookupOmdcCode(code);
      if (res.found && res.transaction) {
        kioskSound('success');
        setResult(res.transaction);
        setPhase('found');
      } else {
        kioskSound('error');
        setPhase('notfound');
      }
    }, 1100);
  };

  const handleKey = (k: string) => {
    kioskSound('tap');
    if (k === '⌫') { setValue(v => v.slice(0, -1)); return; }
    setValue(v => (v.length < 16 ? v + k : v));
  };

  const continueWithTransaction = (txn: OmdcTransaction) => {
    kioskSound('select');
    // Check the booking in — assigns a queue number from the shared counter.
    const checked = checkInTransaction(txn.key, queuePrefix) ?? txn;
    const needsPayment = !checked.paid && kioskPayment && !!checked.amount;
    setState(prev => ({
      ...prev,
      patientName: checked.patientName,
      selectedDate: checked.date,
      selectedTime: checked.time,
      queueNumber: checked.queueNumber,
      omdcCode: checked.code,
      bookingCode: checked.bookingCode,
      omdcTxnKey: checked.key,
      amountDue: checked.amount,
      recalledFromOmdc: true,
      queueType: 'checkin',
    }));
    goTo(needsPayment ? 'payment' : 'ticket');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35 }}
      style={{ width: '100%', height: '100%', backgroundColor: '#F9FAFB', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      {/* Brand strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${PINK}, ${ROSE}, ${AQUA})`, zIndex: 10 }} />

      {/* Header */}
      <div style={{ padding: '30px 64px 22px', backgroundColor: '#fff', borderBottom: '1px solid #F3F4F6', flexShrink: 0 }}>
        <div className="kd" style={{ fontSize: 38, fontWeight: 900, color: DARK, marginBottom: 6, lineHeight: 1.1 }}>
          {t ? 'Check-in with Booking Code' : 'Check-in dengan Kode Booking'}
        </div>
        <div style={{ fontSize: 19, color: '#6B7280' }}>
          {t ? 'Scan your barcode or enter your booking code from the app' : 'Scan barcode atau masukkan kode booking dari aplikasi'}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 36, padding: '32px 64px', minHeight: 0 }}>
        {/* LEFT — scan zone */}
        <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            flex: 1, borderRadius: 28, background: '#fff', border: '2px solid #FCE7F3',
            boxShadow: '0 8px 30px rgba(233,30,140,0.10)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 22, padding: 32, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 100,
              background: 'rgba(233,30,140,0.08)', border: '1px solid rgba(233,30,140,0.18)',
            }}>
              <ScanLine size={20} color={PINK} />
              <span style={{ fontSize: 16, fontWeight: 800, color: PINK, letterSpacing: '0.06em' }}>
                {t ? 'SCANNER READY' : 'SCANNER SIAP'}
              </span>
            </div>

            {/* Scan frame */}
            <div style={{ position: 'relative', width: 230, height: 230 }}>
              <div style={{ position: 'absolute', inset: 0, border: '3px solid #FBCFE8', borderRadius: 20 }} />
              {[
                { top: -2, left: -2, br: '20px 0 0 0', rot: 0 },
                { top: -2, right: -2, br: '0 20px 0 0', rot: 0 },
                { bottom: -2, left: -2, br: '0 0 0 20px', rot: 0 },
                { bottom: -2, right: -2, br: '0 0 20px 0', rot: 0 },
              ].map((c, i) => (
                <div key={i} style={{ position: 'absolute', width: 44, height: 44, border: `5px solid ${PINK}`, borderRadius: c.br, ...c,
                  borderRight: i % 2 === 0 ? 'none' : undefined, borderLeft: i % 2 === 1 ? 'none' : undefined,
                  borderBottom: i < 2 ? 'none' : undefined, borderTop: i >= 2 ? 'none' : undefined }} />
              ))}
              <motion.div
                animate={{ top: ['12%', '88%', '12%'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', left: 14, right: 14, height: 3, background: PINK, borderRadius: 3, boxShadow: `0 0 12px ${PINK}` }}
              />
              <div style={{ position: 'absolute', inset: 40, opacity: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {demo && <OmdcBarcode code={demo.code} height={70} moduleWidth={1.4} showText={false} background="transparent" />}
              </div>
            </div>

            <div style={{ fontSize: 17, color: '#6B7280', textAlign: 'center', lineHeight: 1.5, maxWidth: 280 }}>
              {t ? 'Hold the barcode in the app steady in front of the scanner' : 'Arahkan barcode di aplikasi ke scanner'}
            </div>

            {/* Simulate scan with the demo code */}
            {demo && (
              <button
                onClick={() => submit(demo.code)}
                style={{
                  padding: '14px 28px', borderRadius: 14, border: '2px dashed rgba(233,30,140,0.35)',
                  background: '#FFF5F9', color: PINK, fontSize: 16, fontWeight: 800, cursor: 'pointer',
                }}
              >
                {t ? 'Simulate scan (demo)' : 'Simulasi scan (demo)'}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT — manual entry */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: DARK }}>
              {t ? 'Or enter your code manually' : 'Atau masukkan kode secara manual'}
            </div>
            {demo && (
              <button
                onClick={() => { kioskSound('tap'); setValue(demo.bookingCode); }}
                style={{ fontSize: 13, fontWeight: 700, color: AQUA, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {t ? `Demo: ${demo.bookingCode}` : `Demo: ${demo.bookingCode}`}
              </button>
            )}
          </div>
          <div style={{
            padding: '20px 24px', borderRadius: 16, border: `2px solid ${PINK}`, background: '#fff',
            fontSize: 30, fontWeight: 900, letterSpacing: '0.12em', textAlign: 'center',
            color: value ? DARK : '#C8CCD4',
            fontFamily: "'Plus Jakarta Sans', monospace", minHeight: 30,
          }}>
            {value || (t ? 'e.g. 7H3K9Q' : 'mis. 7H3K9Q')}
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ color: PINK }}>|</motion.span>
          </div>

          {/* On-screen keyboard */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8, minHeight: 0 }}>
            {KEYS.map(k => (
              <button
                key={k}
                onClick={() => handleKey(k)}
                style={{
                  borderRadius: 12, border: '1.5px solid #E5E7EB',
                  background: k === '⌫' ? '#FFF5F9' : '#fff', color: k === '⌫' ? PINK : DARK,
                  fontSize: 20, fontWeight: 800, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', minHeight: 52,
                }}
              >
                {k === '⌫' ? <Delete size={22} /> : k}
              </button>
            ))}
          </div>

          <button
            onClick={() => submit(value)}
            disabled={value.replace(/[^0-9A-Za-z]/g, '').length < 4}
            style={{
              height: 68, borderRadius: 18, border: 'none',
              background: value.replace(/[^0-9A-Za-z]/g, '').length >= 4 ? `linear-gradient(135deg, ${PINK}, ${ROSE})` : '#E5E7EB',
              color: value.replace(/[^0-9A-Za-z]/g, '').length >= 4 ? '#fff' : '#9CA3AF', fontSize: 21, fontWeight: 800,
              cursor: value.replace(/[^0-9A-Za-z]/g, '').length >= 4 ? 'pointer' : 'not-allowed',
              boxShadow: value.replace(/[^0-9A-Za-z]/g, '').length >= 4 ? '0 8px 24px rgba(233,30,140,0.35)' : 'none',
            }}
          >
            {t ? 'Recall Patient' : 'Panggil Data Pasien'}
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ padding: '16px 48px', borderTop: '1px solid #F3F4F6', backgroundColor: '#fff', flexShrink: 0 }}>
        <button
          onClick={goBack}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 32px', height: 64, borderRadius: 16,
            border: '2px solid #E5E7EB', background: '#fff', color: '#6B7280', fontSize: 19, fontWeight: 700, cursor: 'pointer' }}
        >
          <ChevronLeft size={22} />
          {t ? 'Back' : 'Kembali'}
        </button>
      </div>

      {/* Result overlay */}
      <AnimatePresence>
        {phase !== 'entry' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(13,20,33,0.55)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 16 }} animate={{ scale: 1, y: 0 }}
              style={{ background: '#fff', borderRadius: 28, padding: '40px 48px', maxWidth: 560, width: '100%',
                textAlign: 'center', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}
            >
              {phase === 'searching' && (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ width: 72, height: 72, borderRadius: '50%', border: `6px solid #FCE7F3`, borderTopColor: PINK, margin: '0 auto 24px' }} />
                  <div className="kd" style={{ fontSize: 26, fontWeight: 800, color: DARK }}>
                    {t ? 'Searching…' : 'Mencari data…'}
                  </div>
                </>
              )}

              {phase === 'found' && result && (
                <>
                  <CheckCircle2 size={72} color="#10B981" style={{ margin: '0 auto 16px', display: 'block' }} />
                  <div className="kd" style={{ fontSize: 28, fontWeight: 900, color: DARK, marginBottom: 4 }}>
                    {t ? 'Welcome back,' : 'Selamat datang kembali,'}
                  </div>
                  <div className="kd" style={{ fontSize: 32, fontWeight: 900, color: PINK, marginBottom: 18 }}>
                    {result.patientName}
                  </div>
                  <div style={{ background: '#F9FAFB', borderRadius: 18, padding: '18px 22px', textAlign: 'left', marginBottom: 16, fontSize: 17, color: '#374151', lineHeight: 1.8 }}>
                    {result.serviceName && <div><strong>{t ? 'Service' : 'Layanan'}:</strong> {result.serviceName}</div>}
                    {result.doctorName && <div><strong>{t ? 'Doctor' : 'Dokter'}:</strong> {result.doctorName}</div>}
                    {result.time && <div><strong>{t ? 'Time' : 'Waktu'}:</strong> {result.time} WIB</div>}
                    <div><strong>{t ? 'Booking code' : 'Kode booking'}:</strong> {result.bookingCode}</div>
                  </div>
                  {/* Payment status chip */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
                    padding: '8px 18px', borderRadius: 100, fontSize: 15, fontWeight: 800,
                    background: result.paid ? '#D1FAE5' : '#FEF3C7', color: result.paid ? '#065F46' : '#92400E',
                  }}>
                    {result.paid
                      ? (t ? '✓ Paid' : '✓ Lunas')
                      : (t ? `Outstanding: Rp ${(result.amount ?? 0).toLocaleString('id-ID')}` : `Belum bayar: Rp ${(result.amount ?? 0).toLocaleString('id-ID')}`)}
                  </div>
                  <button
                    onClick={() => continueWithTransaction(result)}
                    style={{ width: '100%', height: 64, borderRadius: 16, border: 'none',
                      background: `linear-gradient(135deg, ${PINK}, ${ROSE})`, color: '#fff', fontSize: 20, fontWeight: 800,
                      cursor: 'pointer', boxShadow: '0 8px 24px rgba(233,30,140,0.35)' }}
                  >
                    {!result.paid && kioskPayment && result.amount
                      ? (t ? 'Check-in & Pay' : 'Check-in & Bayar')
                      : (t ? 'Confirm Check-in' : 'Konfirmasi Check-in')}
                  </button>
                </>
              )}

              {phase === 'notfound' && (
                <>
                  <XCircle size={72} color="#EF4444" style={{ margin: '0 auto 16px', display: 'block' }} />
                  <div className="kd" style={{ fontSize: 26, fontWeight: 900, color: DARK, marginBottom: 8 }}>
                    {t ? 'Code not found' : 'Kode tidak ditemukan'}
                  </div>
                  <div style={{ fontSize: 17, color: '#6B7280', marginBottom: 24, lineHeight: 1.5 }}>
                    {t ? 'Please check the code and try again, or register at the front desk.' : 'Periksa kembali kode Anda, atau daftar di resepsionis.'}
                  </div>
                  <button
                    onClick={() => { setPhase('entry'); setValue('OMDC-'); }}
                    style={{ width: '100%', height: 60, borderRadius: 16, border: `2px solid ${PINK}`,
                      background: '#fff', color: PINK, fontSize: 19, fontWeight: 800, cursor: 'pointer' }}
                  >
                    {t ? 'Try Again' : 'Coba Lagi'}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
