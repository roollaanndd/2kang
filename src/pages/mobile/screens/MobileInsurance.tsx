/* eslint-disable */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, CheckCircle, XCircle, Plus, ChevronRight, FileText, Clock, AlertCircle } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface Props {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PINK = '#E91E8C';
const AQUA = '#06B6D4';
const INK = '#1A1A2E';

interface InsuranceCoverage { label: string; covered: boolean }
const COVERAGE: InsuranceCoverage[] = [
  { label: 'Konsultasi Dokter Gigi', covered: true },
  { label: 'Scaling / Pembersihan Karang', covered: true },
  { label: 'Tambal Gigi (Komposit)', covered: true },
  { label: 'Cabut Gigi Biasa', covered: true },
  { label: 'Rontgen Gigi (X-Ray)', covered: true },
  { label: 'Behel / Ortodonsi', covered: false },
  { label: 'Implan Gigi', covered: false },
  { label: 'Veneer Gigi', covered: false },
];

interface Claim { id: string; service: string; date: string; amount: number; status: 'approved' | 'pending' | 'rejected' }
const CLAIMS: Claim[] = [
  { id: 'c1', service: 'Scaling Gigi', date: '10 Jun 2026', amount: 450_000, status: 'approved' },
  { id: 'c2', service: 'Konsultasi Umum', date: '02 Mei 2026', amount: 150_000, status: 'approved' },
  { id: 'c3', service: 'Tambal Gigi', date: '18 Apr 2026', amount: 800_000, status: 'pending' },
];

const STATUS_CONFIG = {
  approved: { label: 'Disetujui', bg: 'rgba(16,185,129,0.10)', color: '#10B981', Icon: CheckCircle },
  pending: { label: 'Diproses', bg: 'rgba(245,158,11,0.10)', color: '#F59E0B', Icon: Clock },
  rejected: { label: 'Ditolak', bg: 'rgba(239,68,68,0.10)', color: '#EF4444', Icon: XCircle },
};

function InsuranceCard({ name }: { name: string }) {
  return (
    <div style={{
      borderRadius: 22, padding: '22px 24px',
      background: 'linear-gradient(135deg, #0B7DBF 0%, #06B6D4 50%, #0891B2 100%)',
      boxShadow: '0 12px 32px rgba(6,182,212,0.35)',
      position: 'relative', overflow: 'hidden', color: 'white',
    }}>
      {/* Decorative rings */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />
      <div style={{ position: 'absolute', bottom: -50, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: 'rgba(255,255,255,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={18} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 900 }}>BPJS Kesehatan</p>
              <p style={{ margin: 0, fontSize: 10, opacity: 0.8 }}>Kelas 1 – Gigi</p>
            </div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.22)' }}>
            AKTIF
          </span>
        </div>

        <p style={{ margin: 0, fontSize: 10, opacity: 0.75, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>No. Polis</p>
        <p style={{ margin: '2px 0 14px', fontSize: 17, fontWeight: 900, letterSpacing: 1 }}>0001 2345 6789</p>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p style={{ margin: 0, fontSize: 9, opacity: 0.7, textTransform: 'uppercase', fontWeight: 700 }}>Nama</p>
            <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 800 }}>{name}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: 9, opacity: 0.7, textTransform: 'uppercase', fontWeight: 700 }}>Berlaku Hingga</p>
            <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 800 }}>31 Des 2026</p>
          </div>
        </div>

        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.20)', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p style={{ margin: 0, fontSize: 9, opacity: 0.7, textTransform: 'uppercase', fontWeight: 700 }}>Plafon Per Tahun</p>
            <p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 900 }}>Rp 5.000.000</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: 9, opacity: 0.7, textTransform: 'uppercase', fontWeight: 700 }}>Sisa Plafon</p>
            <p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 900 }}>Rp 3.600.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyInsurance({ onAdd }: { onAdd: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center' }}>
      <svg width={110} height={110} viewBox="0 0 110 110" fill="none" style={{ marginBottom: 24 }}>
        <circle cx={55} cy={55} r={52} fill="rgba(233,30,140,0.05)" stroke="rgba(233,30,140,0.12)" strokeWidth={1.5} />
        <path d="M55 28 L55 28 C55 28 36 38 36 52 L36 62 C36 70 44 76 55 76 C66 76 74 70 74 62 L74 52 C74 38 55 28 55 28Z"
          fill="rgba(233,30,140,0.10)" stroke="#E91E8C" strokeWidth={1.5} strokeLinejoin="round" />
        <path d="M48 54 L53 59 L63 49" stroke="#E91E8C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={80} cy={30} r={12} fill="white" stroke="#F3F4F6" strokeWidth={2} />
        <path d="M80 25 L80 31 M80 33 L80 35" stroke="#F59E0B" strokeWidth={2} strokeLinecap="round" />
      </svg>
      <p style={{ fontSize: 17, fontWeight: 900, color: INK, margin: '0 0 8px' }}>Belum Ada Asuransi</p>
      <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6, margin: '0 0 28px' }}>
        Daftarkan asuransi gigimu agar kunjungan lebih hemat dan terlindungi.
      </p>
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onAdd}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '14px 28px', borderRadius: 16, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
          boxShadow: '0 8px 24px rgba(233,30,140,0.28)',
          color: 'white', fontSize: 14, fontWeight: 800,
        }}
      >
        <Plus size={17} /> Tambah Asuransi
      </motion.button>
    </div>
  );
}

export function MobileInsurance({ state, setState }: Props) {
  const [hasInsurance, setHasInsurance] = useState(false);
  const userName = state.user?.name ?? 'Nama Pemegang';

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)', zIndex: 10 }} />

      <MobileHeader
        title="Asuransi Gigi"
        showBack
        onBack={() => setState({ screen: 'profile' })}
        rightAction={
          hasInsurance ? (
            <button
              onClick={() => { haptic('light'); setHasInsurance(false); }}
              style={{ fontSize: 11, fontWeight: 700, color: '#EF4444', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Hapus
            </button>
          ) : undefined
        }
      />

      <AnimatePresence mode="wait">
        {!hasInsurance ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <EmptyInsurance onAdd={() => { haptic('medium'); setHasInsurance(true); }} />
          </motion.div>
        ) : (
          <motion.div key="has" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '16px 16px 100px' }}
          >
            {/* Insurance Card */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 16 }}>
              <InsuranceCard name={userName} />
            </motion.div>

            {/* Plafon progress */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              style={{ background: 'white', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 14 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: INK }}>Penggunaan Plafon</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: AQUA }}>Rp 1.400.000 digunakan</span>
              </div>
              <div style={{ height: 8, borderRadius: 10, background: '#F3F4F6', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }} animate={{ width: '28%' }}
                  transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', borderRadius: 10, background: `linear-gradient(90deg, ${AQUA}, #0891B2)` }}
                />
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 11, color: '#9CA3AF' }}>Sisa plafon: <b style={{ color: INK }}>Rp 3.600.000</b> dari Rp 5.000.000</p>
            </motion.div>

            {/* Coverage */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              style={{ background: 'white', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 14 }}
            >
              <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: '0 0 12px' }}>Cakupan Layanan</p>
              {COVERAGE.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < COVERAGE.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c.covered ? 'rgba(16,185,129,0.10)' : 'rgba(239,68,68,0.08)' }}>
                    {c.covered
                      ? <CheckCircle size={13} color="#10B981" />
                      : <XCircle size={13} color="#EF4444" />
                    }
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.covered ? INK : '#9CA3AF' }}>{c.label}</span>
                  {!c.covered && <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', color: '#EF4444' }}>Tidak Ditanggung</span>}
                </div>
              ))}
            </motion.div>

            {/* Claims */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
              style={{ background: 'white', borderRadius: 20, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: 14 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: INK, margin: 0 }}>Riwayat Klaim</p>
                <button style={{ fontSize: 11, fontWeight: 700, color: PINK, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                  Semua <ChevronRight size={11} />
                </button>
              </div>
              {CLAIMS.map((claim, i) => {
                const cfg = STATUS_CONFIG[claim.status];
                const StatusIcon = cfg.Icon;
                return (
                  <div key={claim.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < CLAIMS.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(233,30,140,0.07)' }}>
                      <FileText size={16} color={PINK} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: INK, margin: 0 }}>{claim.service}</p>
                      <p style={{ fontSize: 10, color: '#9CA3AF', margin: '1px 0 0' }}>{claim.date}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 12, fontWeight: 800, color: INK, margin: 0 }}>Rp {claim.amount.toLocaleString('id-ID')}</p>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 10, background: cfg.bg, color: cfg.color, display: 'inline-flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
                        <StatusIcon size={8} /> {cfg.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Claim CTA */}
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => haptic('medium')}
                style={{
                  flex: 1, padding: '14px', borderRadius: 16, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                  boxShadow: '0 6px 18px rgba(233,30,140,0.25)',
                  color: 'white', fontSize: 13, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                }}
              >
                <Plus size={16} /> Ajukan Klaim
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => haptic('light')}
                style={{
                  padding: '14px 18px', borderRadius: 16, cursor: 'pointer',
                  background: 'white', border: '1.5px solid rgba(233,30,140,0.20)',
                  color: PINK, fontSize: 13, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                }}
              >
                <AlertCircle size={16} /> Info
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
