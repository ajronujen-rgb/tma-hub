import type { MenuTheme } from "./types";

export type Tab = "menu" | "cart" | "orders" | "profile";

interface Props {
  current: Tab;
  cartCount: number;
  onTab: (tab: Tab) => void;
  theme: MenuTheme;
}

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: "menu", label: "Меню", icon: "🍽️" },
  { key: "cart", label: "Корзина", icon: "🛒" },
  { key: "orders", label: "Заказы", icon: "📋" },
  { key: "profile", label: "Профиль", icon: "👤" },
];

export default function Navigation({ current, cartCount, onTab, theme: t }: Props) {
  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 pb-safe ${t.card} ${t.border} border-t shadow-lg`}>
      <div className="flex items-center justify-around w-full px-2 py-2">
        {tabs.map((tab) => {
          const isActive = current === tab.key;
          const isCart = tab.key === "cart";
          return (
            <button
              key={tab.key}
              onClick={() => onTab(tab.key)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                isActive ? `${t.accentBg}/15` : ""
              }`}
            >
              <div className="relative">
                <span className="text-xl">{tab.icon}</span>
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? t.accent : t.muted}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
