import { useMemo } from "react";
import { motion } from "motion/react";
import type { MenuTheme, OrderItem } from "./types";
import { loadOrders } from "./storage";
import { getItem } from "./data";

interface Props {
  theme: MenuTheme;
  onRepeat: (items: OrderItem[]) => void;
}

export default function MyOrdersPage({ theme: t, onRepeat }: Props) {
  const orders = useMemo(() => loadOrders(), []);

  /* Top 3 most ordered items */
  const favs = useMemo(() => {
    const count = new Map<string, number>();
    orders.forEach((o) => o.items.forEach((i) => count.set(i.itemId, (count.get(i.itemId) ?? 0) + i.quantity)));
    return [...count.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => getItem(id))
      .filter(Boolean)
      .slice(0, 3);
  }, [orders]);

  const statusLabel: Record<string, string> = {
    pending: "Принят",
    preparing: "Готовится",
    delivering: "Несут",
    delivered: "Доставлен",
  };

  return (
    <div className="flex flex-col min-h-screen px-3 py-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1"
      >
        <h2 className={`text-xl font-bold mb-5 ${t.text}`}>Мои заказы</h2>

        {/* Favorites */}
        {favs.length > 0 && (
          <div className="mb-6">
            <h3 className={`text-xs font-semibold ${t.muted} uppercase tracking-wider mb-3`}>
              ⭐ Избранное
            </h3>
            <div className="flex gap-2">
              {favs.map((item) => (
                <div key={item!.id} className={`flex items-center gap-2 ${t.card} ${t.border} border rounded-xl px-3 py-2`}>
                  <span className="text-lg">{item!.emoji}</span>
                  <span className={`text-xs font-medium ${t.text}`}>{item!.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders list */}
        {orders.length === 0 ? (
          <div className={`flex flex-col items-center justify-center flex-1 ${t.muted}`}>
            <span className="text-5xl mb-4">📋</span>
            <p className="text-sm">Нет заказов</p>
            <p className="text-xs mt-1 opacity-60">Ваши заказы появятся здесь</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div key={order.id} className={`${t.card} ${t.border} border rounded-2xl p-4 shadow-sm`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] ${t.muted}`}>
                    {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                  </span>
                  <span className={`text-[10px] font-semibold ${
                    order.status === "delivered" ? t.success : t.accent
                  }`}>
                    {statusLabel[order.status] ?? order.status}
                  </span>
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  {order.items.map((item) => (
                    <div key={item.itemId} className="flex items-center justify-between text-xs">
                      <span className={t.text}>
                        {item.name} <span className={t.muted}>×{item.quantity}</span>
                      </span>
                      <span className={`${t.muted}`}>{item.price * item.quantity}₽</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2A] border-opacity-50">
                  <span className={`text-sm font-bold ${t.text}`}>{order.total}₽</span>
                  <button
                    onClick={() => onRepeat(order.items)}
                    className={`text-xs font-medium ${t.accent} underline underline-offset-2`}
                  >
                    Повторить заказ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
