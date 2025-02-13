import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../views/login";
import Inicio from "../views/inicio";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
