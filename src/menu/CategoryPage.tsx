import { motion } from "motion/react";
import type { MenuTheme, CartItem } from "./types";
import { CATEGORIES, getDishesByCategory } from "./data";
import DishCard from "./DishCard";

interface Props {
  theme: MenuTheme;
  categoryId: string;
  cart: CartItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
}

export default function CategoryPage({ theme: t, categoryId, cart, onAdd, onRemove, onBack }: Props) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const dishes = getDishesByCategory(categoryId);

  return (
    <div className="flex flex-col min-h-screen px-3 py-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col flex-1"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack} className={`text-lg ${t.muted} hover:${t.text}`}>←</button>
          <h2 className={`text-xl font-bold ${t.text}`}>{cat?.name ?? "Меню"}</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {dishes.map((item) => (
            <div key={item.id} className="relative">
              <DishCard
                item={item}
                theme={t}
                cart={cart}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
