import { useState, useCallback } from "react";
import type { Booking, BookingState } from "./types";
import { STORAGE_KEY } from "./types";

const defaultState: BookingState = {
  bookings: [],
  visitedCount: 0,
  rewardShown: false,
};

function load(): BookingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {}
  return defaultState;
}

function save(state: BookingState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useBookingState() {
  const [st, setSt] = useState<BookingState>(load);

  const persist = useCallback((next: BookingState) => {
    setSt(next);
    save(next);
  }, []);

  const addBooking = useCallback(
    (b: Omit<Booking, "id" | "status" | "createdAt">) => {
      const booking: Booking = {
        ...b,
        id: "bk_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      const next: BookingState = {
        ...st,
        bookings: [booking, ...st.bookings],
      };
      persist(next);
      return booking;
    },
    [st, persist]
  );

  const cancelBooking = useCallback(
    (id: string) => {
      const next: BookingState = {
        ...st,
        bookings: st.bookings.map((b) =>
          b.id === id ? { ...b, status: "cancelled" as const } : b
        ),
      };
      persist(next);
    },
    [st, persist]
  );

  const completeBooking = useCallback(
    (id: string) => {
      const next: BookingState = {
        ...st,
        bookings: st.bookings.map((b) =>
          b.id === id ? { ...b, status: "completed" as const } : b
        ),
        visitedCount: st.visitedCount + 1,
      };
      persist(next);
    },
    [st, persist]
  );

  const dismissReward = useCallback(() => {
    persist({ ...st, rewardShown: true });
  }, [st, persist]);

  const setClientInfo = useCallback(
    (name: string, phone: string) => {
      const raw = localStorage.getItem("beauty_client") || "{}";
      const prev = JSON.parse(raw);
      localStorage.setItem("beauty_client", JSON.stringify({ ...prev, name, phone }));
    },
    []
  );

  const getClientInfo = useCallback(() => {
    try {
      const raw = localStorage.getItem("beauty_client");
      if (raw) return JSON.parse(raw) as { name: string; phone: string };
    } catch {}
    return { name: "Гость", phone: "" };
  }, []);

  const futureBookings = st.bookings.filter((b) => b.status === "confirmed");
  const pastBookings = st.bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  const favoriteMaster = (() => {
    const counts: Record<string, { name: string; count: number }> = {};
    for (const b of st.bookings) {
      if (!counts[b.masterId]) counts[b.masterId] = { name: b.masterName, count: 0 };
      counts[b.masterId].count++;
    }
    let best = "—";
    let bestCount = 0;
    for (const key of Object.keys(counts)) {
      if (counts[key].count > bestCount) {
        best = counts[key].name;
        bestCount = counts[key].count;
      }
    }
    return best;
  })();

  const shouldShowReward = st.visitedCount >= REWARD_COUNT && !st.rewardShown;

  // Auto-complete past bookings (simple heuristic: different day)
  const today = new Date().toISOString().slice(0, 10);
  const needsUpdate = st.bookings.some(
    (b) => b.status === "confirmed" && b.date < today
  );
  if (needsUpdate) {
    const next: BookingState = {
      ...st,
      bookings: st.bookings.map((b) => {
        if (b.status === "confirmed" && b.date < today) {
          return { ...b, status: "completed" as const };
        }
        return b;
      }),
      visitedCount: st.bookings.filter(
        (b) => b.status === "completed" || (b.status === "confirmed" && b.date < today)
      ).length,
    };
    // Don't persist here — just compute for the render
    // Actually let's persist to avoid recomputing
    setTimeout(() => persist(next), 0);
  }

  return {
    state: st,
    futureBookings,
    pastBookings,
    favoriteMaster,
    shouldShowReward,
    addBooking,
    cancelBooking,
    completeBooking,
    dismissReward,
    setClientInfo,
    getClientInfo,
  };
}

const REWARD_COUNT = 5;
