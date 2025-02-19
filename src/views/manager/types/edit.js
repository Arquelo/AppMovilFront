import React from "react";

const Dashboard = () => {

  return (
    <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
     <h1 class="text-white mt-2">Administrador</h1>
     <button className="btn btn-success px-4 py-2 w-25">
        Administar Notas 
      </button>
      <button className="btn btn-success px-4 py-2 w-25">
        Administar Grupos 
      </button>
      <button className="btn btn-success px-4 py-2 w-25">
        Administar Tipos
      </button>
    </div>
  );
};

export default Dashboard;
