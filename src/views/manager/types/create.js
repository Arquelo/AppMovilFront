import React, { useState } from "react";
import api from "../../../services/api";
import ReturnMenuComponent from "../../../components/ReturnMenuComponent";

const Dashboard = ({ onTypeAdded }) => {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/type", { type });
      alert("Tipo creado correctamente");

      setType("");

      if (onTypeAdded) {
        onTypeAdded();
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al crear el tipo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
      <h1 className="text-white mt-2">Crear nuevo "Tipo"</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <ReturnMenuComponent />
        <button type="submit" className="btn btn-primary ms-2" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
