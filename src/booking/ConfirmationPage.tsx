import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { BookingTheme } from "./theme";
import type { Service, Master } from "./types";

interface Props {
  theme: BookingTheme;
  service: Service;
  master: Master;
  date: string;
  time: string;
  onSubmit: (name: string, phone: string) => void;
  onBack: () => void;
}

export default function ConfirmationPage({ theme: t, service, master, date, time, onSubmit, onBack }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onSubmit(name.trim(), phone.trim());
    setDone(true);
  };

  const fmtDate = date.split("-").reverse().join(".");

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${t.accentBg}`}
          >
            <Check className={`w-10 h-10 ${t.accent}`} />
          </motion.div>

          <h2 className={`text-2xl font-bold mb-2 ${t.text}`}>Подтверждено! ✨</h2>
          <p className={`text-sm ${t.muted} mb-3`}>
            {service.name} · {fmtDate} в {time}
          </p>
          <p className={`text-sm ${t.muted} mb-6`}>
            Мастер: {master.name}
          </p>

          <div className={`${t.accentBg} ${t.text} rounded-2xl px-5 py-4 text-sm mb-8`}>
            🔔 Вам придет напоминание за 2 часа до записи
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-3 py-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1"
      >
        <button onClick={onBack} className={`text-sm mb-4 ${t.muted}`}>← Назад</button>

        <h2 className={`text-xl font-bold mb-5 ${t.text}`}>Подтверждение</h2>

        {/* Summary */}
        <div className={`${t.card} ${t.border} border rounded-2xl p-5 mb-6 space-y-3 shadow-sm`}>
          <Row label="Услуга" value={service.name} icon={service.iconUrl} theme={t} />
          <Row label="Стоимость" value={`${service.price}₽`} theme={t} />
          <Row label="Мастер" value={master.name} theme={t} />
          <Row label="Дата" value={fmtDate} theme={t} />
          <Row label="Время" value={time} theme={t} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            maxLength={40}
            className={`w-full px-6 py-5 rounded-2xl border text-lg outline-none transition-all ${t.card} ${t.border} ${t.text} placeholder:${t.muted}`}
            required
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Номер телефона"
            type="tel"
            maxLength={20}
            className={`w-full px-6 py-5 rounded-2xl border text-lg outline-none transition-all ${t.card} ${t.border} ${t.text} placeholder:${t.muted}`}
            required
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!name.trim() || !phone.trim()}
            className={`w-full mt-auto py-5 rounded-2xl font-semibold text-base tracking-wide ${t.btnBg} ${t.btnText} disabled:opacity-40`}
          >
            Записаться
          </motion.button>
        </form>

      </motion.div>
    </div>
  );
}

function Row({ label, value, icon, theme: t }: { label: string; value: string; icon?: string; theme: BookingTheme }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs ${t.muted}`}>{label}</span>
      <span className={`text-sm font-medium ${t.text} flex items-center gap-1.5`}>
        {icon && <img src={icon} alt="" className="w-4 h-4 rounded object-cover" />}
        {value}
      </span>
    </div>
  );
}
