import type { MenuTheme } from "./types";

const dark: MenuTheme = {
  bg: "bg-[#0D0D0D]",
  card: "bg-[#161616]",
  text: "text-[#EDEDED]",
  muted: "text-[#777]",
  accent: "text-[#D4A574]",
  accentBg: "bg-[#D4A574]",
  border: "border-[#222]",
  btnBg: "bg-[#D4A574]",
  btnText: "text-[#0D0D0D]",
  success: "text-[#4ADE80]",
  error: "text-[#EF4444]",
};

export function getMenuTheme(): MenuTheme {
  return dark;
}
