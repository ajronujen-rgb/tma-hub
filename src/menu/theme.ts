import type { MenuTheme } from "./types";

const dark: MenuTheme = {
  bg: "bg-[#121212]",
  card: "bg-[#1E1E1E]",
  text: "text-[#F5F5F5]",
  muted: "text-[#888]",
  accent: "text-[#D4A574]",
  accentBg: "bg-[#D4A574]",
  border: "border-[#2A2A2A]",
  btnBg: "bg-[#D4A574]",
  btnText: "text-[#121212]",
  success: "text-[#4ADE80]",
  error: "text-[#EF4444]",
};

const light: MenuTheme = {
  bg: "bg-[#FFF8F0]",
  card: "bg-white",
  text: "text-[#1A1A1A]",
  muted: "text-[#999]",
  accent: "text-[#C77D43]",
  accentBg: "bg-[#C77D43]",
  border: "border-[#E8DDD0]",
  btnBg: "bg-[#C77D43]",
  btnText: "text-white",
  success: "text-[#22C55E]",
  error: "text-[#EF4444]",
};

export function getMenuTheme(darkMode: boolean): MenuTheme {
  return darkMode ? dark : light;
}
