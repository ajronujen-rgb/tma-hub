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
  /* ——— Layout ———
     First 3 cats in a row, then 2 cats in a row centered */
  const row1 = CATEGORIES.slice(0, 3);
  const row2 = CATEGORIES.slice(3); // 2 items

  const renderCard = (cat: (typeof CATEGORIES)[0], index: number) => (
    <button
      key={cat.id}
      onClick={() => onSelectCategory(cat.id)}
      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 ${t.card} ${t.border} shadow-sm transition-transform active:scale-95`}
      style={{
        aspectRatio: index < 3 ? "1/1" : "1/1.2",
      }}
    >
      <img
        src={cat.iconUrl}
        alt={cat.name}
        className="w-11 h-11 object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).outerHTML = `<span style="font-size:2.5rem;line-height:1">${EMOJIS[cat.id] ?? FALLBACK}</span>`;
        }}
      />
      <span className={`text-sm font-semibold ${t.text}`}>{cat.name}</span>
    </button>
  );

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

        {/* Categories — full screen grid */}
        <div className="flex flex-col flex-1 gap-3">
          {/* Row 1: 3 items */}
          <div className="flex gap-3 flex-1">
            {row1.map((cat, i) => renderCard(cat, i))}
          </div>

          {/* Row 2: 2 items (centered) */}
          <div className="flex gap-3 flex-1">
            <div className="flex-1" /> {/* spacer */}
            {row2.map((cat, i) => (
              <div key={cat.id} className="flex-1 flex">
                {renderCard(cat, i + 3)}
              </div>
            ))}
            <div className="flex-1" /> {/* spacer */}
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
