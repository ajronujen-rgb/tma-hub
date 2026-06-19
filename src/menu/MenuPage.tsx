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
    <div className="flex flex-col h-dvh px-3 pt-5 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1 min-h-0"
      >
        {/* Header — compact */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/images/tableorder/logo.webp"
            alt="TableCafe"
            className="w-10 h-10 rounded-xl"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="flex-1">
            <h1 className={`text-xl font-bold ${t.text}`}>TableCafe</h1>
            <p className={`text-xs ${t.muted}`}>
              Столик <span className={`font-semibold ${t.accent}`}>#7</span>
            </p>
          </div>
          {cartCount > 0 && (
            <div className={`${t.accentBg} ${t.btnText} text-xs font-bold px-3 py-1.5 rounded-full`}>
              🛒 {cartCount}
            </div>
          )}
        </div>

        {/* Categories — 2 rows filling all remaining height */}
        <div className="flex flex-col gap-3 flex-1 min-h-0">
          {/* Row 1: 3 equal columns */}
          <div className="flex gap-3 flex-1 min-h-0">
            {CATEGORIES.slice(0, 3).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 ${t.card} ${t.border} shadow-sm transition-transform active:scale-95 p-2`}
              >
                <img
                  src={cat.iconUrl}
                  alt={cat.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).outerHTML = `<span style="font-size:2.8rem">${EMOJIS[cat.id] ?? FALLBACK}</span>`;
                  }}
                />
                <span className={`text-sm font-bold ${t.text}`}>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Row 2: 2 centered columns */}
          <div className="flex gap-3 flex-1 min-h-0">
            {CATEGORIES.slice(3).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 ${t.card} ${t.border} shadow-sm transition-transform active:scale-95 p-2`}
              >
                <img
                  src={cat.iconUrl}
                  alt={cat.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).outerHTML = `<span style="font-size:2.8rem">${EMOJIS[cat.id] ?? FALLBACK}</span>`;
                  }}
                />
                <span className={`text-sm font-bold ${t.text}`}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
