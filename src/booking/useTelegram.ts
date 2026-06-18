import { useEffect, useState } from "react";
import { isTMA } from "@tma.js/sdk";

export interface TgTheme {
  isDark: boolean;
  isInTelegram: boolean;
}

export function useTelegram() {
  const [theme, setTheme] = useState<TgTheme>(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) return { isDark: tg.colorScheme === "dark", isInTelegram: true };
    return { isDark: false, isInTelegram: isTMA() };
  });

  const [backVisible, setBackVisible] = useState(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;
    tg.onEvent("themeChanged", () => setTheme({ isDark: tg.colorScheme === "dark", isInTelegram: true }));
    tg.ready();
    tg.expand();
    return () => tg.offEvent("themeChanged");
  }, []);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;
    if (backVisible) {
      tg.BackButton.show();
      const fn = () => window.history.back();
      tg.BackButton.onClick(fn);
      return () => tg.BackButton.offClick(fn);
    } else {
      tg.BackButton.hide();
    }
  }, [backVisible]);

  return { theme, setBackVisible };
}
