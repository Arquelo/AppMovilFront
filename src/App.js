import React, { createContext, useContext, useEffect } from "react";
import { api, Swal, useNavigate, AppRoutes } from "./global";

const GlobalContext = createContext({ api, Swal, useNavigate });
export const useGlobal = () => useContext(GlobalContext);

const sendNotification = (title, message) => {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, {
          body: message,
          icon: "/favicon.ico", 
          vibrate: [200, 100, 200], 
        });
      }
    });
  }
};

const App = () => {
  useEffect(() => {
    // Evento para detectar reconexión a Internet
    const handleOnline = () => {
      sendNotification("Conexión restablecida", "Estás de nuevo en línea");
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ api, Swal, useNavigate }}>
      <AppRoutes />
    </GlobalContext.Provider>
  );
};

export default App;
