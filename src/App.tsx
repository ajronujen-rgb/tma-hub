export default function App() {
  const apps = [
    { path: "/booking", emoji: "💎", name: "Запись к мастеру", desc: "Салон красоты", color: "bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100" },
    { path: "/menu", emoji: "🍽️", name: "Меню с заказом", desc: "Еда и напитки", color: "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100" },
    { path: "/habits", emoji: "📊", name: "Трекинг привычек", desc: "Прогресс и цели", color: "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-5">
        <div className="text-center mb-2">
          <div className="text-4xl mb-2">🧩</div>
          <h1 className="text-xl font-bold text-gray-800">tma-hub</h1>
          <p className="text-xs text-gray-400 mt-1">Telegram Mini Apps</p>
        </div>

        {apps.map((app) => (
          <a
            key={app.path}
            href={app.path}
            className={`flex items-center gap-4 p-5 rounded-2xl border shadow-sm transition-all ${app.color}`}
          >
            <span className="text-3xl">{app.emoji}</span>
            <div>
              <div className="font-semibold text-sm">{app.name}</div>
              <div className="text-xs opacity-60 mt-0.5">{app.desc}</div>
            </div>
            <span className="ml-auto text-lg opacity-40">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
