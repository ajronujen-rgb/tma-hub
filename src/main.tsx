import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import BookingApp from './booking/BookingApp.tsx';
import MenuApp from './menu/MenuApp.tsx';
import HabitsApp from './habits/HabitsApp.tsx';

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
      <MenuApp />
    </StrictMode>,
  );
} else if (path.startsWith('/habits')) {
  createRoot(rootElement).render(
    <StrictMode>
      <HabitsApp />
    </StrictMode>,
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
