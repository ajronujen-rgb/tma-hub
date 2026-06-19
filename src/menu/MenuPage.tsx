import { useRef } from "react";
import { motion } from "motion/react";
import type { MenuTheme } from "./types";
import { CATEGORIES } from "./data";

interface Props {
  theme: MenuTheme;
  cartCount: number;
  onSelectCategory: (id: string) => void;
}

export default function MenuPage({ theme: t, cartCount, onSelectCategory }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen px-3 py-6">
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
            <h1 className={`text-3xl font-bold ${t.text}`}>
              TableCafe
            </h1>
          </div>
          <p className={`text-sm ${t.muted}`}>
            Добро пожаловать! Столик <span className={`font-semibold ${t.accent}`}>#7</span>
          </p>
        </div>

        {/* Categories carousel */}
        <div className="mb-5">
          <h2 className={`text-sm font-semibold ${t.text} mb-3`}>Категории</h2>
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-none pb-1"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center gap-2 min-w-[88px] snap-start"
              >
                <div className={`w-20 h-20 rounded-2xl ${t.card} ${t.border} border-2 flex items-center justify-center shadow-sm transition-transform active:scale-95`}>
                  <img
                    src={cat.iconUrl}
                    alt={cat.name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      const emojis: Record<string, string> = {
                        breakfast: "🥞", salads: "🥗", hot: "🍝", drinks: "☕", desserts: "🍰",
                      };
                      (e.target as HTMLImageElement).outerHTML = `<span class="text-3xl">${emojis[cat.id] ?? "🍽️"}</span>`;
                    }}
                  />
                </div>
                <span className={`text-xs font-medium ${t.text}`}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick info */}
        <div className={`${t.card} ${t.border} border rounded-2xl p-5 text-center`}>
          <p className={`text-sm ${t.muted} mb-2`}>
            🍽️ Выберите категорию, чтобы открыть меню
          </p>
          {cartCount > 0 && (
            <p className={`text-xs ${t.accent} font-medium`}>
              В корзине {cartCount} {cartCount === 1 ? "позиция" : cartCount < 5 ? "позиции" : "позиций"}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
