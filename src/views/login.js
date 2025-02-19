import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/general.css";
import logo from "../images/logo.jpg";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/inicio");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 vh-100 background">
      <img src={logo} alt="Logo" className="mb-3" style={{ maxWidth: "25vw" }} />
      <div className="row w-100 d-flex justify-content-center">
        <div className="col-4 col-md-4 col-sm-12 d-flex flex-column align-items-center">
          <h2 className="mb-4 text-white">Iniciar Sesión</h2>
          <input type="text" placeholder="Usuario" className="form-control mb-3" />
          <input type="password" placeholder="Contraseña" className="form-control mb-3" />
          <button onClick={handleLogin} className="btn btn-success px-4 py-2">
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
