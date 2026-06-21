import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, CheckCircle, XCircle, X, CalendarDays, Award } from 'lucide-react';
import { DOCTORS } from '../../../data/mockData';
import { haptic } from '../../../lib/haptics';
import type { MobileState, Doctor } from '../../../types';

interface MobileDoctorsProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const SPECIALTIES = ['Semua', 'Periodonsia', 'Ortodonsia', 'Bedah Mulut', 'Konservasi'];

const AVATAR_COLORS: [string, string][] = [
  ['#E91E8C', '#FF6BB5'],
  ['#06B6D4', '#22D3EE'],
  ['#8B5CF6', '#C4B5FD'],
  ['#F59E0B', '#FCD34D'],
];

function initials(name: string): string {
  const clean = name.replace(/^drg\.\s*/i, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 0) return 'D';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function avatarColors(idx: number): [string, string] {
  return AVATAR_COLORS[idx % AVATAR_COLORS.length];
}

// ── Doctor Detail Bottom Sheet ─────────────────────────────────────────────
function DoctorDetailSheet({
  doctor, idx, onClose, onBook,
}: {
  doctor: Doctor; idx: number; onClose: () => void; onBook: () => void;
}) {
  const [g1, g2] = avatarColors(idx);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(17,24,39,0.45)', zIndex: 40 }}
        onClick={onClose}
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 36 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: 'white', borderRadius: '24px 24px 0 0',
          maxHeight: '88%', overflowY: 'auto',
          boxShadow: '0 -8px 48px rgba(17,24,39,0.18)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div style={{
          background: `linear-gradient(135deg, ${g1}, ${g2})`,
          padding: '24px 20px 24px',
          borderRadius: '24px 24px 0 0',
          position: 'relative',
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.22)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={17} color="white" />
          </button>

          {/* Large avatar */}
          <div style={{
            width: 76, height: 76, borderRadius: 22,
            background: 'rgba(255,255,255,0.22)',
            border: '2.5px solid rgba(255,255,255,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 12, color: 'white', fontWeight: 900, fontSize: 26,
          }}>
            {initials(doctor.name)}
          </div>

          <p style={{ color: 'white', fontWeight: 900, fontSize: 17, marginBottom: 3 }}>
            {doctor.name}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginBottom: 16 }}>
            {doctor.specialty}
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: 0,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            {[
              { label: 'Rating', value: String(doctor.rating) },
              { label: 'Ulasan', value: String(doctor.reviewCount) },
              { label: 'Thn Pengalaman', value: String(doctor.experience) },
            ].map((stat, si) => (
              <div key={stat.label} style={{
                flex: 1, padding: '10px 6px', textAlign: 'center',
                borderLeft: si > 0 ? '1px solid rgba(255,255,255,0.2)' : 'none',
              }}>
                <p style={{ color: 'white', fontWeight: 900, fontSize: 17, lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9, marginTop: 3 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 20px 120px' }}>
          {/* Availability */}
          <div style={{ marginBottom: 18 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: doctor.available ? '#D1FAE5' : '#FEE2E2',
              color: doctor.available ? '#065F46' : '#991B1B',
            }}>
              {doctor.available
                ? <><CheckCircle size={13} /> Tersedia</>
                : <><XCircle size={13} /> Tidak Tersedia Hari Ini</>}
            </span>
          </div>

          {/* About */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'rgba(233,30,140,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Award size={14} color="#E91E8C" />
              </div>
              <p style={{ fontWeight: 800, fontSize: 13, color: '#1A1A2E' }}>Tentang Dokter</p>
            </div>
            <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65 }}>{doctor.about}</p>
          </div>

          {/* Schedule */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'rgba(6,182,212,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CalendarDays size={14} color="#06B6D4" />
              </div>
              <p style={{ fontWeight: 800, fontSize: 13, color: '#1A1A2E' }}>Jadwal Praktek</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {doctor.schedule.map(day => (
                <span key={day} style={{
                  padding: '7px 16px', borderRadius: 20,
                  background: '#FFF5F9', border: '1px solid rgba(233,30,140,0.18)',
                  color: '#E91E8C', fontSize: 12, fontWeight: 700,
                }}>
                  {day}
                </span>
              ))}
            </div>
          </div>

          {/* Rating breakdown */}
          <div style={{
            background: '#F8F9FB', borderRadius: 18, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <p style={{ fontSize: 30, fontWeight: 900, color: '#1A1A2E', lineHeight: 1 }}>
                {doctor.rating}
              </p>
              <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 4 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={11}
                    fill={i <= Math.round(doctor.rating) ? '#F59E0B' : '#E5E7EB'}
                    color={i <= Math.round(doctor.rating) ? '#F59E0B' : '#E5E7EB'}
                  />
                ))}
              </div>
              <p style={{ fontSize: 9, color: '#9CA3AF', marginTop: 3 }}>
                {doctor.reviewCount} ulasan
              </p>
            </div>
            <div style={{ flex: 1 }}>
              {[5, 4, 3, 2, 1].map((n, ni) => {
                const pct = [75, 18, 5, 1, 1][ni];
                return (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: '#9CA3AF', width: 8 }}>{n}</span>
                    <div style={{
                      flex: 1, height: 4, borderRadius: 2,
                      background: '#E5E7EB', overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', borderRadius: 2, background: '#F59E0B',
                        width: `${pct}%`,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div style={{
          position: 'sticky', bottom: 0, padding: '12px 20px 20px',
          background: 'white', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        }}>
          <motion.button
            whileTap={doctor.available ? { scale: 0.97 } : undefined}
            onClick={() => { if (doctor.available) onBook(); }}
            disabled={!doctor.available}
            style={{
              width: '100%', padding: '16px 0', borderRadius: 18,
              fontWeight: 800, fontSize: 15, color: 'white', border: 'none',
              background: doctor.available
                ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)'
                : '#D1D5DB',
              cursor: doctor.available ? 'pointer' : 'default',
              boxShadow: doctor.available ? '0 8px 24px rgba(233,30,140,0.3)' : 'none',
            }}
          >
            {doctor.available ? 'Buat Janji Sekarang' : 'Tidak Tersedia'}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────
export function MobileDoctors({ state, setState }: MobileDoctorsProps) {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('Semua');
  const [detail, setDetail] = useState<{ doc: Doctor; idx: number } | null>(null);

  const filtered = DOCTORS.filter(d => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
    const matchSpec = selectedSpec === 'Semua' || d.specialty.toLowerCase().includes(selectedSpec.toLowerCase());
    return matchSearch && matchSpec;
  });

  const handleBook = (doctor: Doctor) => {
    haptic('medium');
    setDetail(null);
    // Navigate to service selection with doctor pre-set;
    // MobileBooking will skip the doctor-select step since selectedDoctor is already in state.
    setState({ screen: 'booking', selectedDoctor: doctor });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB' }}
    >
      {/* Header */}
      <div style={{ position: 'relative', background: 'white', padding: '52px 20px 14px' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        }} />
        <p style={{ fontSize: 22, fontWeight: 900, color: '#111827', marginBottom: 12 }}>
          Tim Dokter
        </p>

        {/* Search bar */}
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{
            position: 'absolute', left: 14, top: '50%',
            transform: 'translateY(-50%)', color: '#9CA3AF',
          }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari dokter atau spesialisasi..."
            style={{
              width: '100%', paddingLeft: 40, paddingRight: 16,
              paddingTop: 12, paddingBottom: 12,
              borderRadius: 14, border: '1.5px solid #E5E7EB',
              background: '#FAFAFA', fontSize: 13, color: '#1A1A2E',
              outline: 'none', boxSizing: 'border-box',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#E91E8C'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#E5E7EB'; }}
          />
        </div>
      </div>

      {/* Specialty filter chips */}
      <div style={{ background: 'white', borderBottom: '1px solid #F3F4F6', paddingBottom: 12 }}>
        <div style={{
          overflowX: 'auto', paddingLeft: 20, paddingRight: 20,
          scrollbarWidth: 'none', display: 'flex', gap: 8,
        }}>
          {SPECIALTIES.map(spec => {
            const sel = selectedSpec === spec;
            return (
              <motion.button
                key={spec}
                whileTap={{ scale: 0.95 }}
                onClick={() => { haptic('selection'); setSelectedSpec(spec); }}
                style={{
                  flexShrink: 0, padding: '6px 16px', borderRadius: 20,
                  fontSize: 12, fontWeight: 700,
                  background: sel ? '#E91E8C' : '#F3F4F6',
                  color: sel ? 'white' : '#6B7280',
                  border: 'none', cursor: 'pointer',
                }}
              >
                {spec}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Count */}
      <div style={{ padding: '12px 20px 4px' }}>
        <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>
          {filtered.length} dokter tersedia
        </p>
      </div>

      {/* Doctor list */}
      <div style={{
        flex: 1, overflowY: 'auto', scrollbarWidth: 'none',
        padding: '4px 20px 100px', display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18, background: '#FFF0F7',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
            }}>
              <Search size={22} color="#E91E8C" />
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
              Tidak ada dokter ditemukan
            </p>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>Coba kata kunci lain</p>
          </div>
        ) : (
          filtered.map((doctor) => {
            const globalIdx = DOCTORS.indexOf(doctor);
            const [g1, g2] = avatarColors(globalIdx);
            return (
              <motion.button
                key={doctor.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { haptic('light'); setState({ screen: 'doctor-detail', selectedDoctor: doctor }); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: 'white', borderRadius: 20, padding: 14,
                  border: '1.5px solid #EEF0F4', textAlign: 'left',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)', cursor: 'pointer',
                  opacity: doctor.available ? 1 : 0.72,
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 58, height: 58, borderRadius: 17, flexShrink: 0,
                  background: `linear-gradient(135deg, ${g1}, ${g2})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 900, fontSize: 20,
                  boxShadow: `0 4px 14px ${g1}40`,
                }}>
                  {initials(doctor.name)}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2 }}>
                    <p style={{ fontWeight: 800, fontSize: 13, color: '#1A1A2E', lineHeight: 1.3, flex: 1, paddingRight: 8 }}>
                      {doctor.name}
                    </p>
                    <span style={{
                      flexShrink: 0, fontSize: 9, fontWeight: 700,
                      padding: '3px 8px', borderRadius: 20,
                      background: doctor.available ? '#D1FAE5' : '#FEE2E2',
                      color: doctor.available ? '#065F46' : '#991B1B',
                      display: 'flex', alignItems: 'center', gap: 3,
                    }}>
                      {doctor.available
                        ? <><CheckCircle size={9} /> Tersedia</>
                        : <><XCircle size={9} /> Tidak Tersedia</>}
                    </span>
                  </div>

                  <p style={{ fontSize: 11, color: '#6B7280', marginBottom: 6 }}>
                    {doctor.specialty}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Star size={11} fill="#F59E0B" color="#F59E0B" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#374151' }}>{doctor.rating}</span>
                      <span style={{ fontSize: 10, color: '#9CA3AF' }}>({doctor.reviewCount})</span>
                    </div>
                    <span style={{ fontSize: 9, color: '#D1D5DB' }}>•</span>
                    <span style={{ fontSize: 10, color: '#6B7280' }}>{doctor.experience} thn</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {doctor.schedule.slice(0, 3).map(day => (
                      <span key={day} style={{
                        fontSize: 9, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                        background: '#F3F4F6', color: '#6B7280',
                      }}>
                        {day}
                      </span>
                    ))}
                    {doctor.schedule.length > 3 && (
                      <span style={{ fontSize: 9, color: '#9CA3AF', alignSelf: 'center' }}>
                        +{doctor.schedule.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })
        )}
      </div>

      {/* Doctor detail bottom sheet */}
      <AnimatePresence>
        {detail && (
          <DoctorDetailSheet
            doctor={detail.doc}
            idx={detail.idx}
            onClose={() => setDetail(null)}
            onBook={() => handleBook(detail.doc)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
