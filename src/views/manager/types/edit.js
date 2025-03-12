import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, ReturnMenuComponent } from "../../../global";

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    api.get(`/type/${id}`)
      .then((response) => {
        if (response.data) {
          setType(response.data.type);
        }
      })
      .catch((error) => console.error("Error al cargar datos:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/type/${id}`, { type }, { headers: { "X-Session-ID": sessionId }, });
      alert("Tipo actualizado correctamente");
      navigate("/type/index");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el tipo");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
      <h1 className="text-white mt-2">Editar Tipo</h1>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label className="form-label mt-3 text-white">Tipo</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : "Actualizar"}
        </button>
      </form>
      <div className="mt-3">
        <ReturnMenuComponent />
      </div>
    </div>
  );
};

export default Dashboard;
