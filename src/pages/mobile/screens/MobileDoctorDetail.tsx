import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Star, CheckCircle, XCircle, CalendarDays, Award, MessageCircle, Video, MapPin, Clock } from 'lucide-react';
import { DOCTORS } from '../../../data/mockData';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface Props {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const AVATAR_COLORS: [string, string][] = [
  ['#E91E8C', '#FF6BB5'],
  ['#06B6D4', '#22D3EE'],
  ['#8B5CF6', '#C4B5FD'],
  ['#F59E0B', '#FCD34D'],
];

const MOCK_REVIEWS = [
  { name: 'Andi S.', rating: 5, comment: 'Dokternya sangat ramah dan profesional, penjelasannya mudah dipahami.', date: '15 Jun 2026' },
  { name: 'Budi R.', rating: 5, comment: 'Penanganannya cepat dan hasilnya memuaskan. Sangat recommended!', date: '10 Jun 2026' },
  { name: 'Citra M.', rating: 4, comment: 'Pelayanan bagus, hanya menunggu sedikit lama.', date: '3 Jun 2026' },
];

function initials(name: string) {
  const clean = name.replace(/^drg\.\s*/i, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 0) return 'D';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function MobileDoctorDetail({ state, setState }: Props) {
  const doctor = DOCTORS.find(d => d.id === state.selectedDoctor?.id) ?? DOCTORS[0];
  const doctorIdx = DOCTORS.indexOf(doctor);
  const [g1, g2] = AVATAR_COLORS[doctorIdx % AVATAR_COLORS.length];
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');

  const goBack = () => {
    haptic('light');
    setState({ screen: 'doctors' });
  };

  const handleBook = () => {
    haptic('medium');
    setState({ screen: 'booking', selectedDoctor: doctor });
  };

  const handleChat = () => {
    haptic('medium');
    setState({ screen: 'chat-detail', activeChatDoctorId: doctor.id });
  };

  const handleVideoCall = () => {
    haptic('medium');
    setState({ screen: 'video-call', activeChatDoctorId: doctor.id });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.28 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8F9FB', position: 'relative' }}
    >
      {/* 3px brand strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)', zIndex: 10 }} />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 100 }}>

        {/* Gradient header */}
        <div style={{
          background: `linear-gradient(145deg, ${g1}, ${g2})`,
          paddingTop: 52, paddingBottom: 28, paddingLeft: 20, paddingRight: 20,
          position: 'relative',
        }}>
          {/* Back button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
            style={{
              position: 'absolute', top: 16, left: 16,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ChevronLeft size={20} color="white" />
          </motion.button>

          {/* Avatar — photo if available, else monogram */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 90, height: 90, borderRadius: 26,
              background: 'rgba(255,255,255,0.22)',
              border: '3px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 900, fontSize: 32,
              flexShrink: 0, overflow: 'hidden',
            }}>
              {doctor.photo
                ? <img src={doctor.photo} alt={doctor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : initials(doctor.name)
              }
            </div>
            <div style={{ flex: 1 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: doctor.available ? 'rgba(16,185,129,0.22)' : 'rgba(239,68,68,0.22)',
                color: doctor.available ? '#6EE7B7' : '#FCA5A5',
                marginBottom: 8,
              }}>
                {doctor.available
                  ? <><CheckCircle size={11} /> Tersedia Hari Ini</>
                  : <><XCircle size={11} /> Tidak Tersedia</>}
              </span>
              <p style={{ color: 'white', fontWeight: 900, fontSize: 18, lineHeight: 1.3, marginBottom: 4 }}>
                {doctor.name}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 13 }}>
                {doctor.specialty}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', borderRadius: 16, overflow: 'hidden',
            background: 'rgba(255,255,255,0.15)',
          }}>
            {[
              { label: 'Rating', value: String(doctor.rating), sub: '/ 5.0' },
              { label: 'Ulasan', value: String(doctor.reviewCount), sub: 'pasien' },
              { label: 'Pengalaman', value: `${doctor.experience}`, sub: 'tahun' },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, padding: '12px 8px', textAlign: 'center',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.2)' : 'none',
              }}>
                <p style={{ color: 'white', fontWeight: 900, fontSize: 20, lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, marginTop: 2 }}>
                  {stat.sub}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9, marginTop: 1 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: 10, padding: '14px 16px', background: 'white', borderBottom: '1px solid #F3F4F6' }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleChat}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 14, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              color: 'white', fontSize: 13, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              boxShadow: '0 4px 16px rgba(233,30,140,0.3)',
            }}
          >
            <MessageCircle size={16} /> Chat
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleVideoCall}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 14, border: '1.5px solid rgba(6,182,212,0.3)', cursor: 'pointer',
              background: 'rgba(6,182,212,0.06)',
              color: '#06B6D4', fontSize: 13, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <Video size={16} /> Video Call
          </motion.button>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', background: 'white', borderBottom: '1px solid #F3F4F6', marginBottom: 12 }}>
          {(['info', 'reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '13px 0', border: 'none', cursor: 'pointer',
                background: 'transparent', fontSize: 13, fontWeight: 700,
                color: activeTab === tab ? '#E91E8C' : '#9CA3AF',
                borderBottom: activeTab === tab ? '2.5px solid #E91E8C' : '2.5px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {tab === 'info' ? 'Informasi' : 'Ulasan'}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: '0 16px' }}>
          {activeTab === 'info' ? (
            <>
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(233,30,140,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={16} color="#E91E8C" />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 900, color: '#1A1A2E' }}>Tentang Dokter</p>
                </div>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{doctor.about}</p>
              </motion.div>

              {/* Schedule */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(6,182,212,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CalendarDays size={16} color="#06B6D4" />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 900, color: '#1A1A2E' }}>Jadwal Praktek</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {doctor.schedule.map(day => (
                    <span key={day} style={{
                      padding: '7px 16px', borderRadius: 20,
                      background: '#FFF5F9', border: '1.5px solid rgba(233,30,140,0.18)',
                      color: '#E91E8C', fontSize: 12, fontWeight: 700,
                    }}>
                      {day}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: '#9CA3AF' }}>
                  <Clock size={13} />
                  <span style={{ fontSize: 12 }}>08:00 – 17:00 WIB</span>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(139,92,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={16} color="#8B5CF6" />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 900, color: '#1A1A2E' }}>Klinik</p>
                </div>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
                  OMDC Dental Clinic<br />
                  Jl. Pemuda No. 12, Jakarta Timur<br />
                  <span style={{ color: '#E91E8C', fontWeight: 700 }}>Ruang 3, Lantai 2</span>
                </p>
              </motion.div>
            </>
          ) : (
            <>
              {/* Rating summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', gap: 16, alignItems: 'center' }}
              >
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <p style={{ fontSize: 40, fontWeight: 900, color: '#1A1A2E', lineHeight: 1 }}>{doctor.rating}</p>
                  <div style={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '5px 0 4px' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={12}
                        fill={i <= Math.round(doctor.rating) ? '#F59E0B' : '#E5E7EB'}
                        color={i <= Math.round(doctor.rating) ? '#F59E0B' : '#E5E7EB'}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: 10, color: '#9CA3AF' }}>{doctor.reviewCount} ulasan</p>
                </div>
                <div style={{ flex: 1 }}>
                  {[5, 4, 3, 2, 1].map((n, ni) => {
                    const pct = [75, 18, 5, 1, 1][ni];
                    return (
                      <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                        <span style={{ fontSize: 10, color: '#9CA3AF', width: 8, textAlign: 'right' }}>{n}</span>
                        <div style={{ flex: 1, height: 5, borderRadius: 3, background: '#F3F4F6', overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.1 + ni * 0.05, duration: 0.6 }}
                            style={{ height: '100%', borderRadius: 3, background: '#F59E0B' }}
                          />
                        </div>
                        <span style={{ fontSize: 10, color: '#9CA3AF', width: 24 }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Review list */}
              {MOCK_REVIEWS.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  style={{ background: 'white', borderRadius: 20, padding: '14px 16px', marginBottom: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 10,
                        background: `linear-gradient(135deg, ${g1}, ${g2})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 900, fontSize: 13,
                      }}>
                        {review.name[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 800, color: '#1A1A2E', margin: 0 }}>{review.name}</p>
                        <p style={{ fontSize: 10, color: '#9CA3AF', margin: 0 }}>{review.date}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={11}
                          fill={s <= review.rating ? '#F59E0B' : '#E5E7EB'}
                          color={s <= review.rating ? '#F59E0B' : '#E5E7EB'}
                        />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{review.comment}</p>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Sticky footer CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 24px', background: 'white',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
      }}>
        <motion.button
          whileTap={doctor.available ? { scale: 0.97 } : undefined}
          onClick={handleBook}
          disabled={!doctor.available}
          style={{
            width: '100%', padding: '16px 0', borderRadius: 18,
            fontWeight: 800, fontSize: 15, color: 'white', border: 'none', cursor: doctor.available ? 'pointer' : 'default',
            background: doctor.available
              ? 'linear-gradient(135deg, #E91E8C, #FF6BB5)'
              : '#D1D5DB',
            boxShadow: doctor.available ? '0 8px 24px rgba(233,30,140,0.35)' : 'none',
          }}
        >
          {doctor.available ? 'Buat Janji Sekarang' : 'Tidak Tersedia'}
        </motion.button>
      </div>
    </motion.div>
  );
}
