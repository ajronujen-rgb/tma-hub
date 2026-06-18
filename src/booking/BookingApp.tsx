import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import MainPage from "./MainPage";
import CalendarPage from "./CalendarPage";
import ConfirmationPage from "./ConfirmationPage";
import MyBookingsPage from "./MyBookingsPage";
import ProfilePage from "./ProfilePage";
import Navigation from "./Navigation";
import { useBookingState } from "./useBookingState";
import { useTelegram } from "./useTelegram";
import { useBookingTheme } from "./theme";
import type { Screen, Service, Master } from "./types";

export default function BookingApp() {
  const { theme: tgTheme, setBackVisible } = useTelegram();
  const {
    state, futureBookings, pastBookings, favoriteMaster,
    shouldShowReward, addBooking, cancelBooking, dismissReward,
    setClientInfo, getClientInfo,
  } = useBookingState();

  const [screen, setScreen] = useState<Screen>("main");
  const [service, setService] = useState<Service | null>(null);
  const [master, setMaster] = useState<Master | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useCallback((s: Screen) => {
    setScreen(s);
    setBackVisible(s !== "main");
  }, [setBackVisible]);

  // Reset back button when screen changes
  useEffect(() => {
    setBackVisible(screen !== "main");
  }, [screen, setBackVisible]);

  const t = useBookingTheme(tgTheme.isDark);
  const client = getClientInfo();

  // Confirmation from MainPage: service + master chosen
  const handleServiceMaster = (svc: Service, mstr: Master) => {
    setService(svc);
    setMaster(mstr);
    navigate("calendar");
  };

  // Calendar: date + time chosen
  const handleDateTime = (d: string, tm: string) => {
    setDate(d);
    setTime(tm);
    navigate("confirm");
  };

  // Confirmation: submit booking
  const handleConfirm = (name: string, phone: string) => {
    if (!service || !master) return;
    setClientInfo(name, phone);
    addBooking({
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      masterId: master.id,
      masterName: master.name,
      date,
      time,
      clientName: name,
      clientPhone: phone,
    });
  };

  return (
    <div className={`${t.bg} ${t.text} min-h-screen font-sans pb-20 transition-colors duration-300 relative ${tgTheme.isDark ? 'dark' : ''}`}>
      <div className="booking-bg" />
      <div className="relative z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
        >
          {screen === "main" && (
            <MainPage theme={t} onSelect={handleServiceMaster} />
          )}
          {screen === "calendar" && (
            <CalendarPage
              theme={t}
              onSelect={handleDateTime}
              onBack={() => navigate("main")}
            />
          )}
          {screen === "confirm" && service && master && (
            <ConfirmationPage
              theme={t}
              service={service}
              master={master}
              date={date}
              time={time}
              onSubmit={handleConfirm}
              onBack={() => navigate("calendar")}
            />
          )}
          {screen === "mybookings" && (
            <MyBookingsPage
              theme={t}
              future={futureBookings}
              past={pastBookings}
              showReward={shouldShowReward}
              onCancel={cancelBooking}
              onDismissReward={dismissReward}
            />
          )}
          {screen === "profile" && (
            <ProfilePage
              theme={t}
              name={client.name}
              visitCount={state.visitedCount}
              favoriteMaster={favoriteMaster}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <Navigation current={screen} onNavigate={navigate} theme={t} />
      </div>
    </div>
  );
}
