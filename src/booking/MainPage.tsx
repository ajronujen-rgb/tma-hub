import { useState } from "react";
import { motion } from "motion/react";
import type { BookingTheme } from "./theme";
import { SERVICES, MASTERS } from "./types";
import type { Service, Master } from "./types";

interface Props {
  theme: BookingTheme;
  onSelect: (service: Service, master: Master) => void;
}

export default function MainPage({ theme: t, onSelect }: Props) {
  const [selected, setSelected] = useState<Service | null>(null);
  const [master, setMaster] = useState<Master | null>(null);

  const handleNext = () => {
    if (selected && master) onSelect(selected, master);
  };

  return (
    <div className="flex flex-col min-h-screen px-5 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto flex flex-col gap-6"
      >
        {/* Header */}
        <div className="text-center">
          <div className="text-4xl mb-2">💎</div>
          <h1 className={`text-2xl font-bold ${t.text}`}>BeautyStudio</h1>
          <p className={`text-xs ${t.muted} mt-1`}>Запись к мастеру</p>
        </div>

        {/* Services */}
        <div>
          <h2 className={`text-sm font-semibold ${t.text} mb-3`}>Выберите услугу</h2>
          <div className="flex flex-col gap-2.5">
            {SERVICES.map((s) => {
              const isSel = selected?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => { setSelected(s); setMaster(null); }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                    isSel
                      ? `${t.btnBg} ${t.btnText} border-transparent`
                      : `${t.card} ${t.border} ${t.text}`
                  }`}
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${isSel ? t.btnText : t.text}`}>{s.name}</div>
                    <div className={`text-xs mt-0.5 ${isSel ? `${t.btnText}/70` : t.muted}`}>
                      {s.price}₽ · {s.duration}
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSel ? "border-white" : t.border
                  }`}>
                    {isSel && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masters */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <h2 className={`text-sm font-semibold ${t.text} mb-3`}>Выберите мастера</h2>
            <div className="flex gap-3">
              {MASTERS.map((m) => {
                const isSel = master?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMaster(m)}
                    className={`flex-1 p-4 rounded-2xl border text-center transition-all ${
                      isSel
                        ? `${t.btnBg} ${t.btnText} border-transparent`
                        : `${t.card} ${t.border} ${t.text}`
                    }`}
                  >
                    <div className="text-2xl mb-1">👩</div>
                    <div className="text-xs font-medium">{m.name}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Next */}
        {selected && master && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className={`w-full py-4 rounded-2xl font-semibold text-sm ${t.btnBg} ${t.btnText}`}
          >
            Выбрать время
          </motion.button>
        )}

        <div className="h-8" />
      </motion.div>
    </div>
  );
}
