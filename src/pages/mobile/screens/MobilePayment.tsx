import { useState } from 'react';
import type { ComponentType } from 'react';
import { motion } from 'motion/react';
import { Banknote, CreditCard, Wallet, QrCode, CheckCircle } from 'lucide-react';
import { MobileHeader } from '../../../components/mobile/MobileHeader';
import { haptic } from '../../../lib/haptics';
import type { MobileState, PaymentMethod } from '../../../types';

interface MobilePaymentProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; sublabel: string; Icon: ComponentType<{ size?: number; color?: string }> }[] = [
  { id: 'cash', label: 'Tunai', sublabel: 'Bayar langsung di klinik', Icon: Banknote },
  { id: 'card', label: 'Kartu Debit/Kredit', sublabel: 'Visa, Mastercard, GPN', Icon: CreditCard },
  { id: 'ewallet', label: 'E-Wallet', sublabel: 'OVO, GoPay, DANA, ShopeePay', Icon: Wallet },
  { id: 'qris', label: 'QRIS', sublabel: 'Scan QR untuk semua e-wallet', Icon: QrCode },
];

export function MobilePayment({ state, setState }: MobilePaymentProps) {
  const [selected, setSelected] = useState<PaymentMethod | null>('cash');
  const [loading, setLoading] = useState(false);

  const back = () => setState({ screen: 'booking-confirm' });

  const handlePay = () => {
    if (!selected) return;
    haptic('success');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setState({ screen: 'queue', currentQueue: 'A018' });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-gray-50"
    >
      <MobileHeader title="Pilih Pembayaran" showBack onBack={back} />

      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-4">
        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl px-4 py-4 mb-5"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#9CA3AF' }}>
            Ringkasan Pembayaran
          </p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm" style={{ color: '#374151' }}>
              {state.selectedService?.name ?? 'Layanan'}
            </span>
            <span className="text-sm font-bold" style={{ color: '#1A1A2E' }}>
              Rp {(state.selectedService?.priceMin ?? 0).toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm" style={{ color: '#374151' }}>Biaya Admin</span>
            <span className="text-sm font-bold" style={{ color: '#1A1A2E' }}>Rp 5.000</span>
          </div>
          <div
            className="flex justify-between items-center pt-3 mt-1"
            style={{ borderTop: '1.5px dashed #E5E7EB' }}
          >
            <span className="text-sm font-bold" style={{ color: '#1A1A2E' }}>Total</span>
            <span className="text-base font-black" style={{ color: '#E91E8C' }}>
              Rp {((state.selectedService?.priceMin ?? 0) + 5000).toLocaleString('id-ID')}
            </span>
          </div>
        </motion.div>

        {/* Payment methods */}
        <p className="text-sm font-black mb-3" style={{ color: '#1A1A2E' }}>
          Metode Pembayaran
        </p>
        <div className="flex flex-col gap-3">
          {PAYMENT_OPTIONS.map(({ id, label, sublabel, Icon }, i) => {
            const active = selected === id;
            return (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => { haptic('selection'); setSelected(id); }}
                className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
                style={{
                  background: active ? '#FFF5F9' : 'white',
                  border: `2px solid ${active ? '#E91E8C' : '#F3F4F6'}`,
                  boxShadow: active ? '0 4px 16px rgba(233,30,140,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: active ? '#E91E8C' : '#F3F4F6',
                  }}
                >
                  <Icon size={22} color={active ? 'white' : '#6B7280'} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: active ? '#E91E8C' : '#1A1A2E' }}>
                    {label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                    {sublabel}
                  </p>
                </div>
                {active && (
                  <CheckCircle size={22} style={{ color: '#E91E8C' }} fill="#E91E8C" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* QRIS instruction */}
        {selected === 'qris' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 rounded-2xl p-4 flex flex-col items-center"
            style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD' }}
          >
            <div
              className="w-32 h-32 rounded-2xl mb-3 flex items-center justify-center"
              style={{ background: 'white', border: '2px solid #E5E7EB' }}
            >
              <QrCode size={80} style={{ color: '#1A1A2E' }} />
            </div>
            <p className="text-xs font-semibold text-center" style={{ color: '#0369A1' }}>
              Scan QR code di klinik saat kedatangan
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-white"
        style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}
      >
        <button
          onClick={handlePay}
          disabled={!selected || loading}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #E91E8C, #FF6BB5)',
            boxShadow: '0 8px 24px rgba(233,30,140,0.3)',
          }}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : 'Bayar Sekarang'}
        </button>
      </div>
    </motion.div>
  );
}
