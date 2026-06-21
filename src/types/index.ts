export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyEn: string;
  photo: string;
  available: boolean;
  rating: number;
  reviewCount: number;
  experience: number;
  about: string;
  schedule: string[];
}

export interface Service {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  descriptionEn: string;
  duration: number;
  priceMin: number;
  priceMax: number;
  color: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  color: string;
  bgColor: string;
  service: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
  avatar: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  service: Service;
  doctor: Doctor;
  date: string;
  time: string;
  queue: string;
  status: 'waiting' | 'serving' | 'done' | 'cancelled';
  payment?: PaymentMethod;
  branch?: string;
}

export type PaymentMethod = 'cash' | 'card' | 'ewallet' | 'qris';
export type Language = 'id' | 'en';

export interface KioskState {
  language: Language;
  step: KioskStep;
  selectedService?: Service;
  selectedDoctor?: Doctor;
  selectedDate?: string;
  selectedTime?: string;
  patientName?: string;
  queueNumber?: string;
  paymentMethod?: PaymentMethod;
  queueType?: 'new' | 'checkin' | 'register';
}

export type KioskStep =
  | 'welcome'
  | 'language'
  | 'main-menu'
  | 'service-select'
  | 'doctor-select'
  | 'date-select'
  | 'time-select'
  | 'confirmation'
  | 'payment'
  | 'ticket'
  | 'queue-display'
  | 'checkin'
  | 'new-patient'
  | 'info-promo';

export interface MobileUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  medicalRecordNo: string;
  dob: string;
  gender: 'M' | 'F';
  photo: string;
}

export interface ClinicBranch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  /** Base64 data URL or remote URL. Null = show generated SVG illustration. */
  image: string | null;
  isActive: boolean;
}

export type MobileScreen =
  | 'onboarding'
  | 'login'
  | 'register'
  | 'otp'
  | 'create-pin'
  | 'forgot-password'
  | 'home'
  | 'booking'
  | 'booking-branch'
  | 'booking-doctor'
  | 'booking-schedule'
  | 'booking-confirm'
  | 'booking-payment'
  | 'queue'
  | 'profile'
  | 'medical'
  | 'notifications'
  | 'doctors'
  | 'promos'
  | 'history'
  | 'family'
  | 'loyalty'
  | 'dental-tracker'
  | 'insurance'
  | 'education'
  | 'telemedicine'
  | 'chat-detail'
  | 'video-call'
  | 'doctor-detail';

export interface MobileState {
  screen: MobileScreen;
  user?: MobileUser;
  isLoggedIn: boolean;
  selectedService?: Service;
  selectedBranch?: ClinicBranch;
  selectedDoctor?: Doctor;
  selectedDate?: string;
  selectedTime?: string;
  currentQueue?: string;
  onboardingStep: number;
  tcAccepted?: boolean;
  /** FDI tooth numbers the patient flagged as problematic during booking. */
  selectedTeeth?: number[];
  /** Doctor id currently open in chat-detail screen. */
  activeChatDoctorId?: string;
}
