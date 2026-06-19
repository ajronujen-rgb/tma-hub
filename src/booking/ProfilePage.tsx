import { motion } from "motion/react";
import { Share2, Phone } from "lucide-react";
import type { BookingTheme } from "./theme";
import { REWARD_VISIT_COUNT } from "./types";

interface Props {
  theme: BookingTheme;
  name: string;
  visitCount: number;
  favoriteMaster: string;
}

export default function ProfilePage({ theme: t, name, visitCount, favoriteMaster }: Props) {
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("Ссылка скопирована: " + url);
    } catch {
      prompt("Скопируйте ссылку:", url);
    }
  };

  const badges: { emoji: string; label: string; unlocked: boolean }[] = [
    { emoji: "🎖️", label: "Клиент", unlocked: visitCount >= 1 },
    { emoji: "🏅", label: "Постоянный", unlocked: visitCount >= 3 },
    { emoji: "🏆", label: `Вип (${REWARD_VISIT_COUNT} визитов)`, unlocked: visitCount >= 5 },
  ];

  return (
    <div className="flex flex-col min-h-screen px-3 py-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1 gap-5"
      >
        {/* Avatar */}
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full ${t.accentBg} flex items-center justify-center mx-auto mb-3`}>
            <img src="/images/booking/logo.webp" alt="BeautyStudio" className="w-12 h-12" />
          </div>
          <h2 className={`text-xl font-bold ${t.text}`}>{name}</h2>
        </div>

        {/* Stats */}
        <div className={`${t.card} ${t.border} border rounded-2xl p-5 shadow-sm`}>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className={`text-2xl font-bold ${t.accent}`}>{visitCount}</div>
              <div className={`text-[10px] ${t.muted} mt-0.5`}>Визитов</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${t.accent}`}>{favoriteMaster}</div>
              <div className={`text-[10px] ${t.muted} mt-0.5`}>Любимый мастер</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className={`${t.card} ${t.border} border rounded-2xl p-5 shadow-sm`}>
          <h3 className={`text-xs font-semibold ${t.muted} uppercase tracking-wider mb-3`}>Достижения</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b.label}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border ${
                  b.unlocked
                    ? `${t.accentBg} ${t.text} ${t.border}`
                    : `${t.card} ${t.muted} opacity-40`
                }`}
              >
                {b.emoji} {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href="tg://resolve?domain=BeautyStudioBot"
            className={`flex items-center justify-center gap-3 w-full py-6 rounded-2xl font-semibold text-base ${t.btnBg} ${t.btnText}`}
          >
            <Phone className="w-5 h-5" /> Связаться с салоном
          </a>
          <button
            onClick={handleShare}
            className={`flex items-center justify-center gap-3 w-full py-6 rounded-2xl font-semibold text-base ${t.card} ${t.border} border ${t.text}`}
          >
            <Share2 className="w-5 h-5" /> Поделиться
          </button>
        </div>

      </motion.div>
    </div>
  );
}
