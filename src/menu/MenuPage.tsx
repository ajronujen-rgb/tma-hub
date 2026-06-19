import { motion } from "motion/react";
import type { MenuTheme } from "./types";
import { CATEGORIES } from "./data";

interface Props {
  theme: MenuTheme;
  cartCount: number;
  onSelectCategory: (id: string) => void;
}

const EMOJIS: Record<string, string> = {
  breakfast: "🥞", salads: "🥗", hot: "🍝", drinks: "☕", desserts: "🍰",
};
const FALLBACK = "🍽️";

export default function MenuPage({ theme: t, cartCount, onSelectCategory }: Props) {
  return (
    <div className="flex flex-col min-h-screen px-3 pt-6 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="/images/tableorder/logo.webp"
              alt="TableCafe"
              className="w-14 h-14 rounded-2xl"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <h1 className={`text-3xl font-bold ${t.text}`}>TableCafe</h1>
          </div>
          <p className={`text-sm ${t.muted}`}>
            Добро пожаловать! Столик <span className={`font-semibold ${t.accent}`}>#7</span>
          </p>
        </div>

        {/* Categories — full-screen grid filling all space */}
        <div className="grid grid-rows-2 gap-3 flex-1">
          {/* Row 1: 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.slice(0, 3).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 ${t.card} ${t.border} shadow-sm transition-transform active:scale-95 h-full`}
              >
                <img
                  src={cat.iconUrl}
                  alt={cat.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).outerHTML = `<span style="font-size:2.2rem">${EMOJIS[cat.id] ?? FALLBACK}</span>`;
                  }}
                />
                <span className={`text-xs font-semibold ${t.text}`}>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Row 2: 2 centered columns */}
          <div className="flex gap-3 justify-center">
            {CATEGORIES.slice(3).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 ${t.card} ${t.border} shadow-sm transition-transform active:scale-95 h-full`}
                style={{ width: "calc(50% - 6px)" }}
              >
                <img
                  src={cat.iconUrl}
                  alt={cat.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).outerHTML = `<span style="font-size:2.2rem">${EMOJIS[cat.id] ?? FALLBACK}</span>`;
                  }}
                />
                <span className={`text-xs font-semibold ${t.text}`}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cart pill */}
        {cartCount > 0 && (
          <div className={`mt-4 py-3 px-5 rounded-full ${t.accentBg} ${t.btnText} text-sm font-semibold text-center shadow-sm`}>
            🛒 {cartCount} {cartCount === 1 ? "позиция" : cartCount < 5 ? "позиции" : "позиций"} в корзине
          </div>
        )}
      </motion.div>
    </div>
  );
}
