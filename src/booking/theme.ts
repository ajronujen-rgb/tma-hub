/**
 * BeautyBooking — розово-жемчужная тема
 */

export interface BookingTheme {
  bg: string;
  card: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  btnBg: string;
  btnBgHex: string;
  btnText: string;
  accentBg: string;
  success: string;
  error: string;
  navActive: string;
  navInactive: string;
}

export function useBookingTheme(isDark: boolean): BookingTheme {
  if (isDark) {
    return {
      bg: "bg-[#1A1417]",
      card: "bg-[#2A1E23]",
      border: "border-[#E8A0B4]/20",
      text: "text-[#FFF5F7]",
      muted: "text-[#E8A0B4]/55",
      accent: "text-[#E8A0B4]",
      btnBg: "bg-[#D4738E]",
      btnBgHex: "#D4738E",
      btnText: "text-[#1A1417]",
      accentBg: "bg-[#D4738E]/12",
      success: "text-[#A8D4B4]",
      error: "text-[#E06060]",
      navActive: "bg-[#D4738E]/18",
      navInactive: "text-[#E8A0B4]/35",
    };
  }
  return {
    bg: "bg-[#FFF8FA]",
    card: "bg-white",
    border: "border-[#C0607A]/15",
    text: "text-[#3D1A24]",
    muted: "text-[#A0506A]/50",
    accent: "text-[#C0607A]",
    btnBg: "bg-[#C0607A]",
    btnBgHex: "#C0607A",
    btnText: "text-[#FFF8FA]",
    accentBg: "bg-[#C0607A]/10",
    success: "text-[#4A8A5A]",
    error: "text-[#D04040]",
    navActive: "bg-[#C0607A]/14",
    navInactive: "text-[#C0607A]/35",
  };
}
