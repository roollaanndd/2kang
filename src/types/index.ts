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

export type MobileScreen =
  | 'onboarding'
  | 'login'
  | 'register'
  | 'home'
  | 'booking'
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
  | 'family';

export interface MobileState {
  screen: MobileScreen;
  user?: MobileUser;
  isLoggedIn: boolean;
  selectedService?: Service;
  selectedDoctor?: Doctor;
  selectedDate?: string;
  selectedTime?: string;
  currentQueue?: string;
  onboardingStep: number;
}
