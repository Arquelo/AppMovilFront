import React, { useState } from "react";
import "../styles/general.css";
import logo from "../images/logo.jpg";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useGlobal } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { api, Swal } = useGlobal();
  const navigate = useNavigate();

  console.log(useGlobal());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });

      if (!response.status == 200) {
        Swal.fire({
          title: "Error",
          text: response.error,
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      navigate("/inicio");
      setEmail("");
      setPassword("");

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al realizar la solicitud",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const { data } = await api.post("/login-google", { token }, { withCredentials: true });
      console.log(data); 
      localStorage.setItem("sessionId", data.session_id);
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
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100">
            <input type="email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Usuario"
              name="email" />
            <input type="password" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Contraseña"
              name="password" />
            <button className="btn btn-success px-4 py-2">
              Ingresar
            </button>
          </form>
          <button onClick={handleGoogleLogin} className="btn btn-danger px-4 py-2 mt-2">
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
