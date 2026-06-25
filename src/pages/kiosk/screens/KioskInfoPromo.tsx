import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Tag, Clock, Info, X, MapPin, Phone, Mail, Check } from 'lucide-react';
import { PROMOTIONS } from '../../../data/mockData';
import type { KioskScreenProps } from '../KioskLayout';
import type { Promotion } from '../../../types';

const CLINIC_INFO = [
  {
    Icon: Clock,
    tint: '#E91E8C',
    label: 'Jam Operasional',
    labelEn: 'Operating Hours',
    value: 'Senin – Sabtu: 08.00 – 20.00 WIB',
    valueEn: 'Monday – Saturday: 08:00 – 20:00 WIB',
  },
  {
    Icon: MapPin,
    tint: '#D4A017',
    label: 'Alamat',
    labelEn: 'Address',
    value: 'Jl. Selisebel No. 123, Jakarta Selatan',
    valueEn: 'Jl. Selisebel No. 123, South Jakarta',
  },
  {
    Icon: Phone,
    tint: '#D4A017',
    label: 'Telepon',
    labelEn: 'Phone',
    value: '+62 21 1234 5678',
    valueEn: '+62 21 1234 5678',
  },
  {
    Icon: Mail,
    tint: '#D4A017',
    label: 'Email',
    labelEn: 'Email',
    value: 'info@omdcdental.com',
    valueEn: 'info@omdcdental.com',
  },
];

export function KioskInfoPromo({ state, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const [activeTab, setActiveTab] = useState<'promo' | 'info'>('promo');
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [promoIndex, setPromoIndex] = useState(0);

  const prevPromo = () => setPromoIndex(i => Math.max(0, i - 1));
  const nextPromo = () => setPromoIndex(i => Math.min(PROMOTIONS.length - 1, i + 1));

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
        position: 'relative',
      }}
    >
      {/* 3px signature top strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        zIndex: 10,
      }} />

      {/* Header */}
      <div style={{
        padding: '28px 60px 0',
        paddingTop: '31px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        <div className="kd" style={{ fontSize: '34px', fontWeight: '800', color: '#1A1A2E', marginBottom: '20px' }}>
          {t ? 'Information & Promotions' : 'Informasi & Promo'}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0' }}>
          {[
            { id: 'promo', icon: <Tag size={18} />, label: t ? 'Promotions' : 'Promo' },
            { id: 'info', icon: <Info size={18} />, label: t ? 'Clinic Info' : 'Info Klinik' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'promo' | 'info')}
              style={{
                padding: '14px 32px',
                borderRadius: '0',
                border: 'none',
                backgroundColor: 'transparent',
                color: activeTab === tab.id ? '#E91E8C' : '#9CA3AF',
                fontSize: '17px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: activeTab === tab.id ? '3px solid #E91E8C' : '3px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">

          {/* Promo tab */}
          {activeTab === 'promo' && (
            <motion.div
              key="promo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                height: '100%',
                padding: '28px 60px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Featured promo */}
              <div style={{ position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={promoIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      borderRadius: '24px',
                      padding: '36px 40px',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      minHeight: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '32px',
                    }}
                    onClick={() => setSelectedPromo(PROMOTIONS[promoIndex])}
                  >
                    {/* Background */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(135deg, ${PROMOTIONS[promoIndex].color}E0, ${PROMOTIONS[promoIndex].color})`,
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '-30px', right: '-30px',
                      width: '200px', height: '200px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                    }} />

                    {/* Discount badge */}
                    <div style={{
                      position: 'relative',
                      width: '130px',
                      height: '130px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      border: '3px solid rgba(255,255,255,0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.9)', letterSpacing: '1px' }}>
                        DISKON
                      </div>
                      <div style={{ fontSize: '48px', fontWeight: '900', color: '#ffffff', lineHeight: '1' }}>
                        {PROMOTIONS[promoIndex].discount}%
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ position: 'relative', flex: 1 }}>
                      <div style={{
                        fontSize: '30px', fontWeight: '900',
                        color: '#ffffff', marginBottom: '10px',
                      }}>
                        {PROMOTIONS[promoIndex].title}
                      </div>
                      <div style={{
                        fontSize: '17px',
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '16px',
                        lineHeight: '1.5',
                      }}>
                        {PROMOTIONS[promoIndex].description}
                      </div>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '8px 18px',
                        borderRadius: '30px',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.95)',
                        fontWeight: '600',
                      }}>
                        <Clock size={14} />
                        {t ? 'Valid until:' : 'Berlaku hingga:'} {PROMOTIONS[promoIndex].validUntil}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
                {promoIndex > 0 && (
                  <button
                    onClick={prevPromo}
                    style={{
                      position: 'absolute', left: '-16px', top: '50%',
                      transform: 'translateY(-50%)',
                      width: '48px', height: '48px', borderRadius: '50%',
                      border: 'none', backgroundColor: '#ffffff',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <ChevronLeft size={22} color="#1A1A2E" />
                  </button>
                )}
                {promoIndex < PROMOTIONS.length - 1 && (
                  <button
                    onClick={nextPromo}
                    style={{
                      position: 'absolute', right: '-16px', top: '50%',
                      transform: 'translateY(-50%)',
                      width: '48px', height: '48px', borderRadius: '50%',
                      border: 'none', backgroundColor: '#ffffff',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <ChevronRight size={22} color="#1A1A2E" />
                  </button>
                )}
              </div>

              {/* Promo dots */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {PROMOTIONS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPromoIndex(i)}
                    style={{
                      width: i === promoIndex ? '28px' : '10px',
                      height: '10px',
                      borderRadius: '5px',
                      border: 'none',
                      backgroundColor: i === promoIndex ? '#E91E8C' : '#E5E7EB',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>

              {/* All promos grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: '16px',
              }}>
                {PROMOTIONS.map((promo, i) => (
                  <motion.button
                    key={promo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setSelectedPromo(promo); setPromoIndex(i); }}
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      border: `2px solid ${promo.color}30`,
                      backgroundColor: promo.bgColor,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = promo.color;
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 16px ${promo.color}25`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = promo.color + '30';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: promo.color,
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '800',
                      alignSelf: 'flex-start',
                    }}>
                      <Tag size={12} />
                      {promo.discount}% OFF
                    </div>
                    <div style={{ fontSize: '17px', fontWeight: '800', color: '#1A1A2E' }}>
                      {promo.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
                      s/d {promo.validUntil}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Info tab */}
          {activeTab === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                height: '100%',
                padding: '28px 60px',
                display: 'flex',
                gap: '24px',
              }}
            >
              {/* Clinic info cards */}
              <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                alignContent: 'start',
              }}>
                {CLINIC_INFO.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '18px',
                      padding: '24px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      border: '1px solid #F3F4F6',
                    }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, marginBottom: '12px',
                      backgroundColor: item.tint + '15', color: item.tint,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <item.Icon size={26} strokeWidth={2} />
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#9CA3AF', marginBottom: '6px' }}>
                      {t ? item.labelEn : item.label}
                    </div>
                    <div style={{ fontSize: '17px', fontWeight: '600', color: '#1A1A2E', lineHeight: '1.4' }}>
                      {t ? item.valueEn : item.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <div style={{
                width: '320px',
                flexShrink: 0,
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #E8F5E9, #E3F2FD)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  minHeight: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Grid lines */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`h${i}`} style={{
                      position: 'absolute',
                      left: 0, right: 0,
                      top: `${i * 14}%`,
                      height: '1px',
                      backgroundColor: 'rgba(0,0,0,0.06)',
                    }} />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`v${i}`} style={{
                      position: 'absolute',
                      top: 0, bottom: 0,
                      left: `${i * 20}%`,
                      width: '1px',
                      backgroundColor: 'rgba(0,0,0,0.06)',
                    }} />
                  ))}

                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50% 50% 50% 0',
                      transform: 'rotate(-45deg)',
                      background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
                      boxShadow: '0 4px 16px rgba(233,30,140,0.4)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                  <div style={{
                    width: '12px', height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    position: 'relative',
                    zIndex: 1,
                  }} />
                </div>

                <div style={{
                  padding: '20px',
                  borderTop: '1px solid #F3F4F6',
                }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A2E', marginBottom: '4px' }}>
                    OMDC Dental Jakarta
                  </div>
                  <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
                    Jl. Selisebel No. 123, Jakarta Selatan
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '16px 40px',
        borderTop: '1px solid #F3F4F6',
        backgroundColor: '#ffffff',
        flexShrink: 0,
      }}>
        <button
          onClick={goBack}
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

      {/* Promo detail modal */}
      <AnimatePresence>
        {selectedPromo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPromo(null)}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '60px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '28px',
                overflow: 'hidden',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
              }}
            >
              {/* Modal header */}
              <div style={{
                padding: '32px 36px',
                background: `linear-gradient(135deg, ${selectedPromo.color}E0, ${selectedPromo.color})`,
                position: 'relative',
              }}>
                <button
                  onClick={() => setSelectedPromo(null)}
                  style={{
                    position: 'absolute', top: '20px', right: '20px',
                    width: '36px', height: '36px', borderRadius: '50%',
                    border: 'none', backgroundColor: 'rgba(255,255,255,0.2)',
                    color: '#ffffff', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={18} />
                </button>
                <div style={{
                  fontSize: '60px', fontWeight: '900', color: '#ffffff',
                  lineHeight: '1', marginBottom: '8px',
                }}>
                  {selectedPromo.discount}% OFF
                </div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>
                  {selectedPromo.title}
                </div>
              </div>

              {/* Modal body */}
              <div style={{ padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '18px', color: '#374151', lineHeight: '1.6' }}>
                  {selectedPromo.description}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '14px 20px', backgroundColor: '#FFF8F4',
                  borderRadius: '12px', border: '1px solid #FCE7F3',
                }}>
                  <Clock size={18} color="#E91E8C" />
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#E91E8C' }}>
                    {t ? 'Valid until:' : 'Berlaku hingga:'} {selectedPromo.validUntil}
                  </span>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '14px 20px', backgroundColor: '#F0FDF4',
                  borderRadius: '12px', border: '1px solid #BBF7D0',
                  fontSize: '15px', color: '#16A34A',
                }}>
                  <Check size={18} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  {t
                    ? 'Show this promo to our receptionist when you arrive.'
                    : 'Tunjukkan promo ini kepada resepsionis saat Anda tiba.'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
