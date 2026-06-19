import { CalendarDays, Home, User, ClipboardList } from "lucide-react";
import type { BookingTheme } from "./theme";
import type { Screen } from "./types";

interface Props {
  current: Screen;
  onNavigate: (s: Screen) => void;
  theme: BookingTheme;
}

const tabs: { id: Screen; label: string; icon: typeof Home }[] = [
  { id: "main", label: "Услуги", icon: Home },
  { id: "calendar", label: "Дата", icon: CalendarDays },
  { id: "mybookings", label: "Записи", icon: ClipboardList },
  { id: "profile", label: "Профиль", icon: User },
];

export default function Navigation({ current, onNavigate, theme: t }: Props) {
  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 pb-safe ${t.card} ${t.border} border-t shadow-lg`}>
      <div className="flex items-center justify-around w-full px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = current === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-0 ${
                active ? t.navActive : ""
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? t.text : t.navInactive}`} />
              <span className={`text-[9px] font-medium tracking-tight ${active ? t.text : t.navInactive}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
