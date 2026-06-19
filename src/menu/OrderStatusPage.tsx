import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { MenuTheme, Order, OrderStatus } from "./types";

interface Props {
  order: Order;
  theme: MenuTheme;
  onClose: () => void;
}

const STEPS: { key: OrderStatus; label: string; icon: string }[] = [
  { key: "pending", label: "Заказ принят", icon: "✅" },
  { key: "preparing", label: "Готовится", icon: "⏳" },
  { key: "delivering", label: "Несут", icon: "🚀" },
  { key: "delivered", label: "Доставлен", icon: "✅" },
];

const DELAYS: Record<number, number> = {
  0: 5000,
  1: 10000,
  2: 15000,
};

export default function OrderStatusPage({ order, theme: t, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [waiterToast, setWaiterToast] = useState(false);

  useEffect(() => {
    if (currentStep >= STEPS.length - 1) return;
    const delay = DELAYS[currentStep] ?? 5000;
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), delay);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const progress = ((currentStep) / (STEPS.length - 1)) * 100;

  return (
    <div className="flex flex-col min-h-screen px-3 py-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1 items-center justify-center"
      >
        {/* Order id */}
        <p className={`text-xs ${t.muted} mb-6`}>Заказ {order.id}</p>

        {/* Stepper */}
        <div className="w-full max-w-xs mx-auto mb-8">
          {STEPS.map((step, i) => {
            const active = i <= currentStep;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.key} className="flex items-start gap-4 mb-2 last:mb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-sm transition-all ${
                      active ? `${t.btnBg} ${t.btnText}` : `${t.card} ${t.border} border ${t.muted}`
                    }`}
                  >
                    {step.icon}
                  </div>
                  {!isLast && (
                    <div
                      className={`w-0.5 h-8 mt-1 transition-all ${
                        i < currentStep ? t.btnBg : t.border
                      }`}
                      style={{ backgroundColor: i < currentStep ? "#D4A574" : undefined }}
                    />
                  )}
                </div>
                <div className="pt-1.5">
                  <p className={`text-sm font-medium ${active ? t.text : t.muted}`}>{step.label}</p>
                  {i === currentStep && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-[10px] ${t.accent} mt-0.5`}
                    >
                      {i === 0 ? "Ожидайте" : i === 1 ? "Готовим" : i === 2 ? "Уже в пути" : "Приятного аппетита!"}
                    </motion.p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className={`w-full max-w-xs h-1.5 ${t.card} rounded-full overflow-hidden mb-8`}>
          <motion.div
            className={`h-full ${t.btnBg} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Waiter button */}
        <button
          onClick={() => {
            setWaiterToast(true);
            setTimeout(() => setWaiterToast(false), 2500);
          }}
          className={`px-8 py-4 rounded-2xl font-semibold text-sm border-2 ${t.border} ${t.text} ${t.card} mb-4`}
        >
          🔔 Позвать официанта
        </button>

        <AnimatePresence>
          {waiterToast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`${t.btnBg} ${t.btnText} px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg`}
            >
              Официант скоро подойдёт
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep === STEPS.length - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onClose}
            className={`w-full max-w-xs mt-8 py-5 rounded-2xl font-semibold text-base ${t.btnBg} ${t.btnText}`}
          >
            Вернуться в меню
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
