import type { MenuItem, MenuTheme, CartItem } from "./types";

interface Props {
  item: MenuItem;
  theme: MenuTheme;
  cart: CartItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function DishCard({ item, theme: t, cart, onAdd, onRemove }: Props) {
  const inCart = cart.find((c) => c.itemId === item.id);
  const qty = inCart?.quantity ?? 0;

  return (
    <div className={`${t.card} ${t.border} border rounded-2xl p-4 flex flex-col shadow-sm`}>
      {/* Placeholder image */}
      <div className={`w-full aspect-square rounded-xl ${t.border} border-2 border-dashed flex items-center justify-center mb-3 ${t.bg}`}>
        <span className="text-4xl">{item.emoji}</span>
      </div>

      {/* Popular badge */}
      {item.popular && (
        <div className={`absolute top-6 right-6 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5`}>
          ⭐ Топ
        </div>
      )}

      {/* Info */}
      <h3 className={`text-sm font-semibold ${t.text} leading-snug mb-1`}>{item.name}</h3>
      <p className={`text-[11px] ${t.muted} leading-relaxed mb-3 line-clamp-2`}>{item.description}</p>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-auto">
        <span className={`text-base font-bold ${t.accent}`}>{item.price}₽</span>

        {qty === 0 ? (
          <button
            onClick={() => onAdd(item.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold ${t.btnBg} ${t.btnText}`}
          >
            +
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onRemove(item.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-bold ${t.card} ${t.border} border ${t.text}`}
            >
              −
            </button>
            <span className={`text-sm font-bold ${t.text} min-w-[16px] text-center`}>{qty}</span>
            <button
              onClick={() => onAdd(item.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-bold ${t.btnBg} ${t.btnText}`}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
