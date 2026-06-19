import { useMemo } from "react";
import { motion } from "motion/react";
import type { MenuTheme } from "./types";
import { loadOrders } from "./storage";
import { CATEGORIES, DISHES } from "./data";

interface Props {
  theme: MenuTheme;
}

export default function ProfilePage({ theme: t }: Props) {
  const orders = useMemo(() => loadOrders(), []);
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  /* Favorite category */
  const favCategory = useMemo(() => {
    const count = new Map<string, number>();
    orders.forEach((o) =>
      o.items.forEach((i) => {
        const dish = DISHES.find((d) => d.id === i.itemId);
        if (dish) count.set(dish.categoryId, (count.get(dish.categoryId) ?? 0) + i.quantity);
      })
    );
    const top = [...count.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    return top ? CATEGORIES.find((c) => c.id === top)?.name : "—";
  }, [orders]);

  return (
    <div className="flex flex-col min-h-screen px-3 py-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1"
      >
        {/* Avatar */}
        <div className="text-center mb-6">
          <div className={`w-20 h-20 rounded-full ${t.accentBg} flex items-center justify-center mx-auto mb-3`}>
            <span className="text-3xl">👤</span>
          </div>
          <h2 className={`text-xl font-bold ${t.text}`}>Гость</h2>
          <p className={`text-xs ${t.muted} mt-0.5`}>Постоянный посетитель</p>
        </div>

        {/* Stats */}
        <div className={`${t.card} ${t.border} border rounded-2xl p-5 shadow-sm mb-4`}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className={`text-2xl font-bold ${t.accent}`}>{totalOrders}</div>
              <div className={`text-[10px] ${t.muted} mt-0.5`}>Всего заказов</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${t.accent}`}>{deliveredOrders}</div>
              <div className={`text-[10px] ${t.muted} mt-0.5`}>Доставлено</div>
            </div>
            <div>
              <div className={`text-lg font-bold ${t.accent}`}>{favCategory}</div>
              <div className={`text-[10px] ${t.muted} mt-0.5`}>Любимое</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className={`${t.card} ${t.border} border rounded-2xl p-5 shadow-sm mb-4`}>
          <h3 className={`text-xs font-semibold ${t.muted} uppercase tracking-wider mb-2`}>Контакты</h3>
          <p className={`text-xs ${t.muted} mb-3`}>
            Столик #7 · TableCafe
          </p>
          <a
            href="tg://resolve?domain=TableCafeBot"
            className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-sm ${t.btnBg} ${t.btnText}`}
          >
            💬 Связаться с рестораном
          </a>
        </div>

        {/* Info */}
        <div className={`${t.card} ${t.border} border rounded-2xl p-5 shadow-sm`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <p className={`text-xs font-medium ${t.text}`}>Telegram Mini App</p>
              <p className={`text-[10px] ${t.muted} mt-0.5`}>Демо-проект · v1.0</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
