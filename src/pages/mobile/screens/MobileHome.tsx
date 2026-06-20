import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  Bell, ChevronRight, Star, MapPin, Clock,
  Stethoscope, Sparkles, Wrench, X, Smile, Anchor, Pill, Plus,
} from 'lucide-react';
import { DOCTORS, SERVICES, PROMOTIONS, SAMPLE_APPOINTMENTS } from '../../../data/mockData';
import type { MobileState, Service } from '../../../types';

interface MobileHomeProps {
  state: MobileState;
  setState: (s: Partial<MobileState>) => void;
}

const SERVICE_ICONS: Record<string, ReactNode> = {
  's1': <Stethoscope size={20} />,
  's2': <Sparkles size={20} />,
  's3': <Wrench size={20} />,
  's4': <X size={20} />,
  's5': <Smile size={20} />,
  's6': <Anchor size={20} />,
  's7': <Pill size={20} />,
  's8': <Plus size={20} />,
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Selamat pagi';
  if (h < 17) return 'Selamat siang';
  return 'Selamat malam';
};

export function MobileHome({ state, setState }: MobileHomeProps) {
  const user = state.user;
  const firstName = user?.name?.split(' ')[0] ?? 'Pengguna';
  const appointment = SAMPLE_APPOINTMENTS[0];

  const handleServiceClick = (service: Service) => {
    setState({ screen: 'booking', selectedService: service });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#F8F9FA' }}
    >
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6"
        style={{ background: 'linear-gradient(160deg, #E91E8C 0%, #FF6BB5 100%)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/80 text-sm font-medium">
              {getGreeting()},
            </p>
            <h1 className="text-white text-xl font-black">
              {firstName}! 👋
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setState({ screen: 'notifications' })}
              className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Bell size={20} color="white" />
              <span
                className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                style={{ background: '#FFD700' }}
              />
            </button>
            <button
              onClick={() => setState({ screen: 'profile' })}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.5)' }}
            >
              <span className="text-white font-black text-base">
                {firstName[0]}
              </span>
            </button>
          </div>
        </div>

        {/* Next appointment card */}
        {appointment && (
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                Janji Temu Berikutnya
              </span>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ background: '#10B981', color: 'white' }}
              >
                Terkonfirmasi
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <Stethoscope size={24} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm mb-0.5">{appointment.service.name}</p>
                <p className="text-white/80 text-xs mb-1">{appointment.doctor.name}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Clock size={11} color="rgba(255,255,255,0.7)" />
                    <span className="text-white/70 text-xs">{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={11} color="rgba(255,255,255,0.7)" />
                    <span className="text-white/70 text-xs">{appointment.date}</span>
                  </div>
                </div>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <span className="text-white font-black text-xs">{appointment.queue}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 px-5 py-5 pb-24 flex flex-col gap-6">
        {/* Services Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-base" style={{ color: '#1A1A2E' }}>Layanan Kami</h2>
            <button
              onClick={() => setState({ screen: 'booking' })}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: '#E91E8C' }}
            >
              Lihat semua <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {SERVICES.map((service, i) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleServiceClick(service)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: service.color + '20' }}
                >
                  <span style={{ color: service.color }}>
                    {SERVICE_ICONS[service.id] ?? <Plus size={20} />}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: '#374151' }}>
                  {service.name}
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Doctors horizontal scroll */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-base" style={{ color: '#1A1A2E' }}>Dokter Rekomendasi</h2>
            <button
              onClick={() => setState({ screen: 'doctors' })}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: '#E91E8C' }}
            >
              Lihat semua <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {DOCTORS.map((doctor, i) => (
              <motion.button
                key={doctor.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setState({ screen: 'booking-doctor', selectedDoctor: doctor })}
                className="flex-shrink-0 w-40 rounded-2xl p-3 text-left active:scale-95 transition-all"
                style={{
                  background: 'white',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-xl mb-2.5 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E91E8C20, #FF6BB520)' }}
                >
                  <span className="text-2xl font-black" style={{ color: '#E91E8C' }}>
                    {doctor.name.split(' ')[1]?.[0] ?? 'D'}
                  </span>
                </div>
                <p className="text-xs font-bold leading-tight mb-0.5" style={{ color: '#1A1A2E' }}>
                  {doctor.name}
                </p>
                <p className="text-[10px] mb-2 leading-tight" style={{ color: '#6B7280' }}>
                  {doctor.specialty}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={10} fill="#F59E0B" color="#F59E0B" />
                    <span className="text-[10px] font-semibold" style={{ color: '#374151' }}>
                      {doctor.rating}
                    </span>
                  </div>
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                    style={{
                      background: doctor.available ? '#D1FAE5' : '#FEE2E2',
                      color: doctor.available ? '#065F46' : '#991B1B',
                    }}
                  >
                    {doctor.available ? 'Tersedia' : 'Tidak Tersedia'}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Promos horizontal scroll */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-base" style={{ color: '#1A1A2E' }}>Promo Terkini</h2>
            <button
              onClick={() => setState({ screen: 'promos' })}
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: '#E91E8C' }}
            >
              Lihat semua <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {PROMOTIONS.map((promo, i) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex-shrink-0 w-56 rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              >
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{ background: promo.color }}
                >
                  <span className="text-white font-black text-sm">{promo.title}</span>
                  <span
                    className="text-xs font-black rounded-full px-2 py-1"
                    style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}
                  >
                    -{promo.discount}%
                  </span>
                </div>
                <div className="px-4 py-3" style={{ background: promo.bgColor }}>
                  <p className="text-xs leading-snug mb-2" style={{ color: '#374151' }}>
                    {promo.description}
                  </p>
                  <p className="text-[10px]" style={{ color: '#9CA3AF' }}>
                    Berlaku s/d {promo.validUntil}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
