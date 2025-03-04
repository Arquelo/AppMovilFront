import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/general.css";
import logo from "../images/logo.jpg";
import google from "../images/google.png";
import enter from "../images/enter.png";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => { navigate("/inicio"); };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      console.log("Token de Firebase:", token);
      const { data } = await api.post("/login-google", { token });

      localStorage.setItem("authToken", data.authToken);
      navigate("/inicio");

    } catch (error) {
      console.error("Error en la autenticación:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 vh-100 background">
      <img src={logo} alt="Logo" className="mb-3" style={{ maxWidth: "25vw" }} />
      <div className="row w-100 d-flex justify-content-center">
        <div className="col-4 col-md-4 col-sm-12 d-flex flex-column align-items-center">
          <h2 className="mb-4 text-white">Iniciar Sesión</h2>
          <input type="text" placeholder="Usuario" className="form-control mb-3" /> 
          <input type="password" placeholder="Contraseña" className="form-control mb-3" />
          <button onClick={handleLogin} className="btn btn-success px-4 py-2"> <img src={enter} alt="google" className="mb-3 mt-3 me-3" style={{ maxWidth: "1.5vw" }} />
            Ingresar
          </button>
          <button onClick={handleGoogleLogin} className="btn btn-danger px-4 py-2 mt-2">  <img src={google} alt="google" className="mb-3 mt-3 me-3" style={{ maxWidth: "1.5vw" }} />
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
