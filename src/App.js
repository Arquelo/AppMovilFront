import React, { createContext, useContext, useEffect } from "react";
import { api, Swal, useNavigate, AppRoutes } from "./global";

const GlobalContext = createContext({ api, Swal, useNavigate });
export const useGlobal = () => useContext(GlobalContext);

const App = () => {
  
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Bienvenido", {
            body: "Iniciando la aplicación",
            icon: "/favicon.ico", 
            vibrate: [200, 100, 200], 
          });
        }
      });
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ api, Swal, useNavigate }}>
      <AppRoutes />;
    </GlobalContext.Provider>
  );
};

export default App;
