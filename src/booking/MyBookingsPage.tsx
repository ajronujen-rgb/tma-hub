import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { BookingTheme } from "./theme";
import type { Booking } from "./types";
import { REWARD_VISIT_COUNT, REWARD_DISCOUNT } from "./types";

interface Props {
  theme: BookingTheme;
  future: Booking[];
  past: Booking[];
  showReward: boolean;
  onCancel: (id: string) => void;
  onDismissReward: () => void;
}

export default function MyBookingsPage({
  theme: t, future, past, showReward, onCancel, onDismissReward,
}: Props) {
  const [tab, setTab] = useLocalState<"future" | "past">("future");

  return (
    <div className="flex flex-col min-h-screen px-5 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <h2 className={`text-xl font-bold mb-1 ${t.text}`}>Мои записи</h2>

        {/* Tabs */}
        <div className={`flex gap-1 ${t.accentBg} rounded-2xl p-1 mb-5 mt-3`}>
          <button
            onClick={() => setTab("future")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              tab === "future" ? `${t.card} ${t.text} shadow-sm` : t.muted
            }`}
          >
            Предстоящие ({future.length})
          </button>
          <button
            onClick={() => setTab("past")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              tab === "past" ? `${t.card} ${t.text} shadow-sm` : t.muted
            }`}
          >
            История ({past.length})
          </button>
        </div>

        {/* 5th visit reward */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`${t.btnBg} ${t.btnText} rounded-2xl p-5 mb-5 text-center relative`}
            >
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-base font-bold mb-1">Поздравляем!</h3>
              <p className="text-sm opacity-90 mb-3">
                {REWARD_VISIT_COUNT}-я запись! Скидка {REWARD_DISCOUNT}% на следующую услугу
              </p>
              <div className={`inline-block px-4 py-1.5 rounded-full ${t.card} text-xs font-semibold`}>
                🎖️ Постоянный клиент
              </div>
              <button
                onClick={onDismissReward}
                className="absolute top-3 right-3 text-sm opacity-70"
              >✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List */}
        <div className="flex flex-col gap-3">
          {(tab === "future" ? future : past).length === 0 && (
            <p className={`text-sm ${t.muted} text-center py-10`}>
              {tab === "future" ? "Нет предстоящих записей" : "История пуста"}
            </p>
          )}
          {(tab === "future" ? future : past).map((b) => (
            <motion.div
              key={b.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`${t.card} ${t.border} border rounded-2xl p-4 shadow-sm`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className={`text-sm font-semibold ${t.text}`}>{b.serviceName}</h4>
                  <p className={`text-xs ${t.muted} mt-0.5`}>
                    {b.date.split("-").reverse().join(".")} · {b.time} · {b.masterName}
                  </p>
                </div>
                <Badge status={b.status} theme={t} />
              </div>
              {b.status === "confirmed" && (
                <button
                  onClick={() => onCancel(b.id)}
                  className={`text-xs font-medium ${t.error} mt-2`}
                >
                  Отменить запись
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="h-8" />
      </motion.div>
    </div>
  );
}

function Badge({ status, theme: t }: { status: Booking["status"]; theme: BookingTheme }) {
  const map: Record<string, { label: string; cls: string }> = {
    confirmed: { label: "Подтверждено", cls: `${t.success}` },
    completed: { label: "Выполнено", cls: t.muted },
    cancelled: { label: "Отменено", cls: t.error },
  };
  const { label, cls } = map[status];
  return <span className={`text-[10px] font-semibold ${cls}`}>{label}</span>;
}

function useLocalState<T>(initial: T): [T, (v: T) => void] {
  const [v, setV] = useState(initial);
  return [v, setV];
}
