import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getMenuTheme } from "./theme";
import { loadCart, saveCart, clearCart, saveOrder } from "./storage";
import { getItem } from "./data";
import type { CartItem, Order } from "./types";
import Navigation from "./Navigation";
import type { Tab } from "./Navigation";
import MenuPage from "./MenuPage";
import CategoryPage from "./CategoryPage";
import CartPage from "./CartPage";
import OrderStatusPage from "./OrderStatusPage";
import MyOrdersPage from "./MyOrdersPage";
import ProfilePage from "./ProfilePage";

/* ---------- dark mode ---------- */
function detectDark(): boolean {
  try {
    // Telegram Mini App provides its own color scheme
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.colorScheme) return tg.colorScheme === "dark";
    if (tg?.themeParams?.bg_color) {
      // If background is dark-ish (hex < 128 avg), use dark mode
      const c = parseInt(tg.themeParams.bg_color.replace("#", ""), 16);
      return ((c >> 16) & 0xff) + ((c >> 8) & 0xff) + (c & 0xff) < 384;
    }
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    return mql.matches;
  } catch {
    return true;
  }
}

export default function MenuApp() {
  const [darkMode] = useState(() => detectDark());
  const t = getMenuTheme(darkMode);

  /* routing */
  const [tab, setTab] = useState<Tab>("menu");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  /* cart */
  const [cart, setCart] = useState<CartItem[]>(() => loadCart());
  const [cartToast, setCartToast] = useState<string | null>(null);

  useEffect(() => { saveCart(cart); }, [cart]);

  const addToCart = useCallback((id: string) => {
    setCart((prev) => {
      const found = prev.find((c) => c.itemId === id);
      if (found) return prev.map((c) => c.itemId === id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { itemId: id, quantity: 1 }];
    });
    const item = getItem(id);
    setCartToast(item?.name ?? "Добавлено");
    setTimeout(() => setCartToast(null), 1500);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const found = prev.find((c) => c.itemId === id);
      if (!found) return prev;
      if (found.quantity <= 1) return prev.filter((c) => c.itemId !== id);
      return prev.map((c) => c.itemId === id ? { ...c, quantity: c.quantity - 1 } : c);
    });
  }, []);

  /** Очистить корзину и вернуться в меню */
  const clearCartItems = useCallback(() => {
    setCart([]);
    clearCart();
  }, []);

  /** Отправить заказ */
  const submitOrder = useCallback((comment: string) => {
    const items = cart.map((c) => {
      const item = getItem(c.itemId);
      return { itemId: c.itemId, name: item?.name ?? "?", quantity: c.quantity, price: item?.price ?? 0 };
    });
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items,
      comment,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    saveOrder(order);
    setActiveOrder(order);
    setCart([]);
    clearCart();
    setTab("menu");
  }, [cart]);

  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  /* ---------- screens ---------- */
  if (activeOrder) {
    return (
      <div className={`${t.bg} min-h-screen`}>
        <OrderStatusPage
          order={activeOrder}
          theme={t}
          onClose={() => { setActiveOrder(null); setTab("orders"); }}
        />
      </div>
    );
  }

  return (
    <div className={`${t.bg} min-h-screen pb-20 relative`}>
      {/* Background image — full visibility */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: "url('/images/tableorder/bg.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black/70" />
      <div className="relative z-10">
      {/* Cart toast */}
      <AnimatePresence>
        {cartToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 ${t.btnBg} ${t.btnText} px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg`}
          >
            {cartToast} +1
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait">
        {tab === "menu" && !activeCategory && (
          <MenuPage
            key="menu"
            theme={t}
            cartCount={cartCount}
            onSelectCategory={(id) => setActiveCategory(id)}
          />
        )}
        {tab === "menu" && activeCategory && (
          <CategoryPage
            key={`cat-${activeCategory}`}
            theme={t}
            categoryId={activeCategory}
            cart={cart}
            onAdd={addToCart}
            onRemove={removeFromCart}
            onBack={() => setActiveCategory(null)}
          />
        )}
        {tab === "cart" && (
          <CartPage
            key="cart"
            theme={t}
            cart={cart}
            onAdd={addToCart}
            onRemove={removeFromCart}
            onSubmit={submitOrder}
            onClear={clearCartItems}
          />
        )}
        {tab === "orders" && (
          <MyOrdersPage
            key="orders"
            theme={t}
            onRepeat={(items) => {
              const existing = [...cart];
              items.forEach((i) => {
                const found = existing.find((e) => e.itemId === i.itemId);
                if (found) found.quantity += i.quantity;
                else existing.push({ itemId: i.itemId, quantity: i.quantity });
              });
              setCart(existing);
              setTab("cart");
            }}
          />
        )}
        {tab === "profile" && (
          <ProfilePage
            key="profile"
            theme={t}
          />
        )}
      </AnimatePresence>

      <Navigation current={tab} cartCount={cartCount} onTab={setTab} theme={t} />
    </div>
    </div>
  );
}
