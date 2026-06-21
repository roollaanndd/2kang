import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Banknote, CreditCard, Smartphone, QrCode, Check } from 'lucide-react';
import type { KioskScreenProps } from '../KioskLayout';
import type { PaymentMethod } from '../../../types';

interface PaymentOption {
  id: PaymentMethod;
  icon: ReactNode;
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
  color: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'cash',
    icon: <Banknote size={32} />,
    label: 'Tunai',
    labelEn: 'Cash',
    description: 'Bayar di kasir klinik',
    descriptionEn: 'Pay at clinic cashier',
    color: '#10B981',
  },
  {
    id: 'card',
    icon: <CreditCard size={32} />,
    label: 'Kartu Debit / Kredit',
    labelEn: 'Debit / Credit Card',
    description: 'Visa, Mastercard, GPN',
    descriptionEn: 'Visa, Mastercard, GPN',
    color: '#3B82F6',
  },
  {
    id: 'ewallet',
    icon: <Smartphone size={32} />,
    label: 'E-Wallet',
    labelEn: 'E-Wallet',
    description: 'GoPay, OVO, DANA, ShopeePay',
    descriptionEn: 'GoPay, OVO, DANA, ShopeePay',
    color: '#8B5CF6',
  },
  {
    id: 'qris',
    icon: <QrCode size={32} />,
    label: 'QRIS',
    labelEn: 'QRIS',
    description: 'Scan QR untuk semua e-wallet',
    descriptionEn: 'Scan QR for all e-wallets',
    color: '#E91E8C',
  },
];

export function KioskPayment({ state, setState, goTo, goBack }: KioskScreenProps) {
  const t = state.language === 'en';
  const [selected, setSelected] = useState<PaymentMethod | null>(state.paymentMethod || null);

  const handleContinue = () => {
    setState(prev => ({ ...prev, paymentMethod: selected || undefined }));
    goTo('ticket');
  };

  const handleSkip = () => {
    setState(prev => ({ ...prev, paymentMethod: undefined }));
    goTo('ticket');
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
        position: 'relative',
      }}
    >
      {/* Signature 3px top gradient strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, #E91E8C, #FF6BB5, #06B6D4)',
        zIndex: 10,
      }} />

      {/* Header */}
      <div style={{
        padding: '28px 60px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3F4F6',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '34px', fontWeight: '800', color: '#1A1A2E', marginBottom: '4px' }}>
          {t ? 'Payment Method' : 'Pilih Metode Pembayaran'}
        </div>
        <div style={{ fontSize: '17px', color: '#6B7280' }}>
          {t ? 'Optional — you can skip this step' : 'Opsional — Anda dapat melewati langkah ini'}
        </div>
      </div>

      {/* Payment options */}
      <div style={{
        flex: 1,
        padding: '28px 60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        justifyContent: 'center',
      }}>
        {PAYMENT_OPTIONS.map((opt, index) => {
          const isSelected = selected === opt.id;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07, duration: 0.35 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(isSelected ? null : opt.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '22px 28px',
                borderRadius: '18px',
                border: `2px solid ${isSelected ? opt.color : '#E5E7EB'}`,
                backgroundColor: isSelected ? opt.color + '10' : '#ffffff',
                cursor: 'pointer',
                boxShadow: isSelected ? `0 4px 20px ${opt.color}25` : '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                if (isSelected) return;
                (e.currentTarget as HTMLButtonElement).style.borderColor = opt.color;
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = opt.color + '08';
              }}
              onMouseLeave={e => {
                if (isSelected) return;
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB';
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff';
              }}
            >
              {/* Icon */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: isSelected ? opt.color : opt.color + '15',
                color: isSelected ? '#ffffff' : opt.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}>
                {opt.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: isSelected ? opt.color : '#1A1A2E',
                  marginBottom: '4px',
                }}>
                  {t ? opt.labelEn : opt.label}
                </div>
                <div style={{ fontSize: '15px', color: '#9CA3AF' }}>
                  {t ? opt.descriptionEn : opt.description}
                </div>
              </div>

              {/* Radio */}
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: `3px solid ${isSelected ? opt.color : '#D1D5DB'}`,
                backgroundColor: isSelected ? opt.color : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                    style={{ display: 'flex' }}
                  >
                    <Check size={16} color="#ffffff" strokeWidth={3.5} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '16px 40px',
        borderTop: '1px solid #F3F4F6',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSkip}
            style={{
              padding: '14px 28px', borderRadius: '14px',
              border: '2px solid #E5E7EB', backgroundColor: '#ffffff',
              color: '#6B7280', fontSize: '17px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {t ? '← Skip' : '← Lewati'}
          </button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 36px', borderRadius: '14px', border: 'none',
              background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
              color: '#ffffff', fontSize: '17px', fontWeight: '700',
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(233,30,140,0.35)',
            }}
          >
            {t ? 'Continue' : 'Lanjutkan'}
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
