import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, ReturnMenuComponent } from "../../../global";

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    api.get(`/group/${id}`)
      .then((response) => {
        if (response.data) {
          setTitle(response.data.title);
          setColor(response.data.color);
        }
      })
      .catch((error) => console.error("Error al cargar datos:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/group/${id}`, { title, color }, { headers: { "X-Session-ID": sessionId }, });
      alert("Grupo actualizado correctamente");
      navigate("/group/index");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el tipo");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
      <h1 className="text-white mt-2">Editar "Grupo"</h1>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label className="form-label text-white">Titulo</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Color</label>
          <input
            type="color"
            className="form-control"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
      <div className="mt-3">
        <ReturnMenuComponent />
      </div>
    </div>
  );
};

export default Dashboard;
