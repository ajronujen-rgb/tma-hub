import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// BookingApp — синхронный импорт (без лишнего запроса)
import BookingApp from './booking/BookingApp.tsx';

// Остальные — ленивая загрузка
const App = lazy(() => import('./App.tsx'));
const MenuApp = lazy(() => import('./menu/MenuApp.tsx'));
const HabitsApp = lazy(() => import('./habits/HabitsApp.tsx'));

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF8FA]">
      <div className="w-8 h-8 rounded-full border-2 border-[#C0607A] border-t-transparent animate-spin" />
    </div>
  );
}

const rootElement = document.getElementById('root')!;
const path = window.location.pathname;

if (path.startsWith('/booking')) {
  createRoot(rootElement).render(
    <StrictMode>
      <BookingApp />
    </StrictMode>,
  );
} else if (path.startsWith('/menu')) {
  createRoot(rootElement).render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <MenuApp />
      </Suspense>
    </StrictMode>,
  );
} else if (path.startsWith('/habits')) {
  createRoot(rootElement).render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <HabitsApp />
      </Suspense>
    </StrictMode>,
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </StrictMode>,
  );
}
