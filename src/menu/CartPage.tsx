import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { MenuTheme, CartItem } from "./types";
import { getItem } from "./data";

interface Props {
  theme: MenuTheme;
  cart: CartItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onSubmit: (comment: string) => void;
  onClear: () => void;
}

export default function CartPage({ theme: t, cart, onAdd, onRemove, onSubmit, onClear }: Props) {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number }[]>([]);

  const total = cart.reduce((s, c) => {
    const item = getItem(c.itemId);
    return s + (item?.price ?? 0) * c.quantity;
  }, 0);

  const handleSubmit = useCallback(() => {
    if (cart.length === 0 || sending) return;
    setSending(true);

    // Confetti burst
    const pieces = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 300 - 150,
      y: Math.random() * -400 - 50,
    }));
    setConfetti(pieces);

    setTimeout(() => {
      setDone(true);
      setConfetti([]);
      setTimeout(() => {
        onSubmit(comment);
      }, 600);
    }, 3000);
  }, [cart, comment, sending, onSubmit]);

  if (done) return null;

  return (
    <div className="flex flex-col min-h-screen px-3 py-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1"
      >
        <h2 className={`text-xl font-bold mb-5 ${t.text}`}>Корзина</h2>

        {cart.length === 0 ? (
          <div className={`flex flex-col items-center justify-center flex-1 ${t.muted}`}>
            <span className="text-5xl mb-4">🛒</span>
            <p className="text-sm">Корзина пуста</p>
            <p className="text-xs mt-1 opacity-60">Добавьте блюда из меню</p>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex flex-col gap-3 flex-1">
              {cart.map((c) => {
                const item = getItem(c.itemId);
                if (!item) return null;
                return (
                  <div key={c.itemId} className={`flex items-center gap-3 ${t.card} ${t.border} border rounded-2xl p-4`}>
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${t.text}`}>{item.name}</div>
                      <div className={`text-xs ${t.muted}`}>{item.price}₽ × {c.quantity}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemove(c.itemId)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${t.card} ${t.border} border ${t.muted}`}
                      >
                        −
                      </button>
                      <span className={`text-sm font-bold ${t.text} min-w-[14px] text-center`}>{c.quantity}</span>
                      <button
                        onClick={() => onAdd(c.itemId)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${t.btnBg} ${t.btnText}`}
                      >
                        +
                      </button>
                    </div>
                    <span className={`text-sm font-semibold ${t.text} w-16 text-right`}>
                      {item.price * c.quantity}₽
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Comment */}
            <div className="mt-4">
              <button
                onClick={() => setShowComment(!showComment)}
                className={`flex items-center gap-1 text-xs font-medium ${t.muted} mb-2`}
              >
                {showComment ? "▲" : "▼"} Комментарий к заказу
              </button>
              <AnimatePresence>
                {showComment && (
                  <motion.textarea
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 80, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Без лука, острее пожалуйста"
                    className={`w-full p-4 rounded-2xl border text-sm resize-none outline-none transition-all ${t.card} ${t.border} ${t.text} placeholder:${t.muted}`}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Total */}
            <div className={`flex items-center justify-between mt-5 pt-4 ${t.border} border-t`}>
              <span className={`text-sm ${t.muted}`}>Итого</span>
              <span className={`text-2xl font-bold ${t.text}`}>{total}₽</span>
            </div>

            {/* Submit */}
            <motion.button
              onClick={handleSubmit}
              disabled={sending}
              className={`w-full mt-5 py-6 rounded-2xl font-semibold text-base tracking-wide relative overflow-hidden ${t.btnBg} ${t.btnText} disabled:opacity-50`}
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Отправка...
                </span>
              ) : (
                "Отправить заказ"
              )}
            </motion.button>

            {/* Clear */}
            <button
              onClick={onClear}
              className={`text-xs ${t.muted} text-center w-full mt-3 underline underline-offset-2`}
            >
              Очистить корзину
            </button>
          </>
        )}
      </motion.div>

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: p.x, y: p.y, scale: 0.3, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 z-50 text-2xl pointer-events-none"
          >
            {["🎉", "⭐", "✨", "🎊", "💫", "🌟"][p.id % 6]}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
