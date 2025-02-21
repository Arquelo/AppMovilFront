import React from "react";
import AppRoutes from "./routes/appRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import api from './services/api';
import { useNavigate } from "react-router-dom";

const App = () => {
  return <AppRoutes />;
};

export default App;