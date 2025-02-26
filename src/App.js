import React, { createContext, useContext } from "react";
import AppRoutes from "./routes/appRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import api from './services/api';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GlobalContext = createContext({ api, Swal, useNavigate });
export const useGlobal = () => useContext(GlobalContext);

const App = () => {
  return (
    <GlobalContext.Provider value={{ api, Swal, useNavigate }}>
      <AppRoutes />;
    </GlobalContext.Provider>
  )
};

export default App;