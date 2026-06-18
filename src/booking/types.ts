export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  durationMinutes: number;
  emoji: string;
  iconUrl: string;
}

export interface Master {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  masterId: string;
  masterName: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface BookingState {
  bookings: Booking[];
  visitedCount: number;
  rewardShown: boolean;
}

export type Screen =
  | "main"
  | "calendar"
  | "confirm"
  | "mybookings"
  | "profile";

export const SERVICES: Service[] = [
  { id: "haircut", name: "Стрижка", price: 1200, duration: "1 ч", durationMinutes: 60, emoji: "💇", iconUrl: "/images/booking/service-haircut.webp" },
  { id: "manicure", name: "Маникюр", price: 2000, duration: "1.5 ч", durationMinutes: 90, emoji: "💅", iconUrl: "/images/booking/service-manicure.webp" },
  { id: "dyeing", name: "Покраска", price: 3500, duration: "2 ч", durationMinutes: 120, emoji: "🎨", iconUrl: "/images/booking/service-dyeing.webp" },
  { id: "facial", name: "Чистка лица", price: 2500, duration: "1.5 ч", durationMinutes: 90, emoji: "✨", iconUrl: "/images/booking/service-facial.webp" },
  { id: "styling", name: "Укладка", price: 1500, duration: "45 мин", durationMinutes: 45, emoji: "💁", iconUrl: "/images/booking/service-styling.webp" },
];

export const MASTERS: Master[] = [
  { id: "anna", name: "Анна", imageUrl: "/images/booking/master-anna.webp" },
  { id: "ekaterina", name: "Екатерина", imageUrl: "/images/booking/master-ekaterina.webp" },
];

export const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00",
];

export const STORAGE_KEY = "beauty_booking";
export const REWARD_VISIT_COUNT = 5;
export const REWARD_DISCOUNT = 15;
