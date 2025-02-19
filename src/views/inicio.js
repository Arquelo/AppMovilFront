import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const handlemenuManager = () => {
    navigate("/menuManager");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
      <h1 class="text-white mt-2">Bienvenido a Notas Rapidas </h1>
      <button onClick={handlemenuManager} className="btn btn-success px-4 py-2">
        Administar 
      </button>
    </div>
  );
};

export default Dashboard;
