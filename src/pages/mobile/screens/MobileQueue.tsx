import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Clock, ArrowLeft, XCircle, Users, Sparkles, Bell } from 'lucide-react';
import { CURRENT_QUEUE, CLINIC_NAME } from '../../../data/mockData';
import { Skeleton, SkeletonText, SkeletonCircle } from '../../../components/ui/Skeleton';
import { haptic } from '../../../lib/haptics';
import type { MobileState } from '../../../types';

interface MobileQueueProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const MIN_PER_PATIENT = 4;

export function MobileQueue({ state, setState }: MobileQueueProps) {
  const queueNo = state.currentQueue ?? 'A018';

  const queuePrefix = queueNo.replace(/\d+$/, '');
  const queueNum = parseInt(queueNo.replace(/\D/g, ''), 10);
  const startNum = parseInt(CURRENT_QUEUE.replace(/\D/g, ''), 10);

  const [loading, setLoading] = useState(true);
  const [servingNum, setServingNum] = useState(startNum);

  const initialAhead = Math.max(0, queueNum - startNum);
  const [secondsLeft, setSecondsLeft] = useState(initialAhead * MIN_PER_PATIENT * 60);

  const ahead = Math.max(0, queueNum - servingNum);
  const isTurn = servingNum >= queueNum;

  const celebratedRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading || isTurn) return;
    const id = setInterval(() => {
      setSecondsLeft(s => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [loading, isTurn]);

  useEffect(() => {
    if (loading || isTurn) return;
    const id = setInterval(() => {
      setServingNum(n => {
        const next = Math.min(queueNum, n + 1);
        setSecondsLeft(Math.max(0, (queueNum - next) * MIN_PER_PATIENT * 60));
        return next;
      });
      haptic('selection');
    }, 7000);
    return () => clearInterval(id);
  }, [loading, isTurn, queueNum]);

  useEffect(() => {
    if (!loading && isTurn && !celebratedRef.current) {
      celebratedRef.current = true;
      haptic('success');
    }
  }, [loading, isTurn]);

  const mins = Math.ceil(secondsLeft / 60);
  const waitLabel = secondsLeft <= 0 ? '<1 menit' : `~${mins} menit`;

  const servingLabel = `${queuePrefix}${String(servingNum).padStart(3, '0')}`;

  // Determine queue step (0=Menunggu, 1=Dipanggil, 2=Dilayani, 3=Selesai)
  const queueStep = isTurn ? 2 : (ahead <= 2 ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFF5F9' }}
    >
      {/* 3px gradient strip */}
      <div style={{ height: 3, flexShrink: 0, background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)' }} />

      {/* Header */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(252,231,243,0.8)', boxShadow: '0 1px 8px rgba(233,30,140,0.06)',
      }}>
        <button
          onClick={() => setState({ screen: 'home' })}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', cursor: 'pointer',
          }}
        >
          <ArrowLeft size={22} color="#0D1421" />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#0D1421', letterSpacing: -0.3 }}>Status Antrian</h1>
        <div style={{ width: 40 }} />
      </div>

      {loading ? (
        <QueueSkeleton />
      ) : (
        <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '20px 20px 100px' }}>

          {/* ── Hero Queue Number Card ── */}
          <div style={{
            background: 'white', borderRadius: 24,
            boxShadow: '0 8px 30px rgba(233,30,140,0.12)',
            border: '1px solid rgba(252,231,243,0.8)',
            padding: '32px 24px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden', marginBottom: 16,
          }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: '#6B7280', marginBottom: 8 }}>Nomor Antrian Anda</p>
            <AnimatePresence mode="popLayout">
              <motion.h2
                key={isTurn ? queueNo : 'waiting'}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                style={{ fontSize: 64, fontWeight: 900, color: '#E91E8C', letterSpacing: -2, lineHeight: 1, marginBottom: 20 }}
              >
                {queueNo.replace(/(\D+)(\d+)/, '$1-$2')}
              </motion.h2>
            </AnimatePresence>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(233,30,140,0.05)', padding: '8px 16px',
              borderRadius: 999, border: '1px solid rgba(233,30,140,0.1)',
            }}>
              <Clock size={18} color="#E91E8C" />
              <span style={{ fontSize: 13, fontWeight: 500, color: '#E91E8C' }}>
                {isTurn ? 'Giliran Anda telah tiba!' : `Estimasi Tunggu: ${waitLabel}`}
              </span>
            </div>
          </div>

          {/* ── Currently Serving ── */}
          <div style={{
            background: 'linear-gradient(to right, rgba(233,30,140,0.08), transparent)',
            borderRadius: 18, padding: '16px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', border: '1px solid rgba(233,30,140,0.1)', marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)', color: '#E91E8C',
              }}>
                <Users size={18} color="#E91E8C" />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, color: '#6B7280' }}>Sedang Dilayani</p>
                <p style={{ fontSize: 18, fontWeight: 900, color: '#0D1421' }}>
                  {servingLabel.replace(/(\D+)(\d+)/, '$1-$2')}
                </p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, color: '#6B7280' }}>Sisa</p>
              <p style={{ fontSize: 16, fontWeight: 900, color: '#E91E8C' }}>{ahead} Antrian</p>
            </div>
          </div>

          {/* ── Progress Tracker ── */}
          <div style={{ marginBottom: 24, position: 'relative' }}>
            {/* Connecting line background */}
            <div style={{
              position: 'absolute', top: 20, left: '12.5%', right: '12.5%', height: 2,
              background: '#E5E7EB', zIndex: 0,
            }} />
            {/* Progress line fill */}
            <div style={{
              position: 'absolute', top: 20, left: '12.5%',
              width: `${(queueStep / 3) * 75}%`,
              height: 2, background: '#E91E8C', zIndex: 1,
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
              {[
                { label: 'Menunggu', done: true },
                { label: 'Dipanggil', active: queueStep === 1 },
                { label: 'Dilayani', active: queueStep === 2 },
                { label: 'Selesai', future: queueStep < 3 },
              ].map((step, i) => {
                const isDone = i < queueStep;
                const isActive = i === queueStep;
                return (
                  <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '25%' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isDone ? '#E91E8C' : isActive ? 'white' : 'white',
                      border: isDone ? 'none' : isActive ? '3px solid #E91E8C' : '2px solid #E5E7EB',
                      boxShadow: isDone ? '0 4px 12px rgba(233,30,140,0.3)' : isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      color: isDone ? 'white' : isActive ? '#E91E8C' : '#9CA3AF',
                      position: 'relative',
                    }}>
                      {isDone ? (
                        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          {i === 1 && <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>}
                          {i === 2 && <path d="M8.5 3C6.6 3 5 4.7 5 6.8c0 1.7.6 3.1 1.3 4.6.7 1.5 1.2 3 1.2 5.1 0 .8.5 1.5 1.2 1.5h6.6c.7 0 1.2-.7 1.2-1.5 0-2.1.5-3.6 1.2-5.1C18.4 9.9 19 8.5 19 6.8 19 4.7 17.4 3 15.5 3c-.9 0-1.8.4-2.4 1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5C10.3 3.4 9.4 3 8.5 3z" />}
                          {i === 3 && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></>}
                        </svg>
                      )}
                      {isActive && (
                        <div style={{
                          position: 'absolute', inset: -2, borderRadius: '50%',
                          border: '2px solid rgba(233,30,140,0.3)',
                          animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                        }} />
                      )}
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: isDone || isActive ? 700 : 500,
                      color: isDone || isActive ? (isDone ? '#E91E8C' : '#0D1421') : '#6B7280',
                      textAlign: 'center',
                    }}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Doctor Info Card ── */}
          <div style={{
            background: 'white', borderRadius: 20, padding: 16,
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(252,231,243,0.8)',
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24,
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, overflow: 'hidden', background: '#FDF2F8', flexShrink: 0 }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWlA2ONi9r_sZj9cJWAcFLhuO18mlylkIA7EISRKawbHqvQ04xH34cTGJFZxGoBYKN2__2BC-Gerrw0IHCTUDXXNFmEfnrqQLf__64BAxl2U5tyiObbpJ-QVMj48AZ8y3SpygEOW4uJjvkExLY2sm8injWanlt7Y-NjzeVqiBUk7Nz2ysOhWC8YaA3Fw3WnY4d2jba1_1BPCxhVDRyhM9mNQSnfrmZT3p0CbzZiEBvTDkoNl1MmCGOnqoXzL10wwgm2DsUS37HplA"
                alt="Doctor"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#E91E8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                Dokter Anda
              </p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0D1421', marginBottom: 4 }}>
                {state.selectedDoctor?.name ?? 'drg. Sarah Wijaya'}
              </h3>
              <p style={{ fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Ruang Periksa 02
              </p>
            </div>
          </div>

          {/* ── Cancel Button ── */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => { haptic('light'); setState({ screen: 'home' }); }}
            style={{
              width: '100%', padding: '14px', borderRadius: 18,
              border: '2px solid #E91E8C', background: 'white', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 14, fontWeight: 700, color: '#E91E8C',
            }}
          >
            <XCircle size={18} />
            Batalkan Antrian
          </motion.button>

        </div>
      )}
    </motion.div>
  );
}

function QueueSkeleton() {
  return (
    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton width="100%" height={170} radius={24} />
      <Skeleton width="100%" height={72} radius={18} />
      <Skeleton width="100%" height={80} radius={16} />
      <Skeleton width="100%" height={86} radius={20} />
      <Skeleton width="100%" height={50} radius={18} />
    </div>
  );
}
