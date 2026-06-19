import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { BookingTheme } from "./theme";
import { TIME_SLOTS } from "./types";

interface Props {
  theme: BookingTheme;
  onSelect: (date: string, time: string) => void;
  onBack: () => void;
}

function getWeekDays() {
  const days: { date: string; label: string; full: string }[] = [];
  const now = new Date();
  const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    days.push({
      date: `${y}-${m}-${day}`,
      label: i === 0 ? "Сегодня" : weekdays[d.getDay()],
      full: `${day}.${m}`,
    });
  }
  return days;
}

function generateSlots(date: string) {
  return TIME_SLOTS.map((time) => {
    // Pseudo-random but deterministic: seed from date+time
    const hash = date + time;
    let h = 0;
    for (let i = 0; i < hash.length; i++) h = (h * 31 + hash.charCodeAt(i)) | 0;
    const busy = Math.abs(h) % 10 < 3; // ~30% busy
    return { time, available: !busy };
  });
}

export default function CalendarPage({ theme: t, onSelect, onBack }: Props) {
  const weekDays = useMemo(() => getWeekDays(), []);
  const [selDay, setSelDay] = useStateLocal(0);
  const [selTime, setSelTime] = useStateLocal<string | null>(null);

  const day = weekDays[selDay];
  const slots = useMemo(() => (day ? generateSlots(day.date) : []), [selDay]);

  return (
    <div className="flex flex-col min-h-screen px-3 py-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1"
      >
        <button onClick={onBack} className={`text-sm mb-4 ${t.muted}`}>← Назад</button>

        <h2 className={`text-xl font-bold mb-4 ${t.text}`}>Выберите дату и время</h2>

        {/* Days */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
          {weekDays.map((d, i) => {
            const isSel = selDay === i;
            return (
              <button
                key={d.date}
                onClick={() => { setSelDay(i); setSelTime(null); }}
                className={`flex-shrink-0 px-4 py-3 rounded-2xl text-center border transition-all min-w-[68px] ${
                  isSel
                    ? `${t.btnBg} ${t.btnText} border-transparent`
                    : `${t.card} ${t.border} ${t.text}`
                }`}
              >
                <div className="text-[10px] font-medium">{d.label}</div>
                <div className="text-sm font-bold mt-0.5">{d.full}</div>
              </button>
            );
          })}
        </div>

        {/* Time slots */}
        {day && (
          <motion.div
            key={day.date}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5"
          >
            <h3 className={`text-xs font-semibold ${t.muted} mb-3 uppercase tracking-wider`}>
              {day.date}
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {slots.map((s) => {
                const isSel = selTime === s.time;
                const disabled = !s.available;
                return (
                  <button
                    key={s.time}
                    disabled={disabled}
                    onClick={() => setSelTime(s.time)}
                    className={`py-3 rounded-2xl border text-sm font-medium transition-all ${
                      disabled
                        ? `${t.accentBg} ${t.muted} line-through opacity-60`
                        : isSel
                          ? `${t.btnBg} ${t.btnText} border-transparent`
                          : `${t.card} ${t.border} ${t.text}`
                    }`}
                  >
                    {s.time}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Confirm */}
        {selTime && day && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(day.date, selTime)}
            className={`w-full mt-auto py-5 rounded-2xl font-semibold text-base tracking-wide ${t.btnBg} ${t.btnText}`}
          >
            Далее
          </motion.button>
        )}

      </motion.div>
    </div>
  );
}

function useStateLocal<T>(initial: T): [T, (v: T) => void] {
  const [v, setV] = useState(initial);
  return [v, setV];
}
