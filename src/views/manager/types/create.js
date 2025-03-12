import React, { useState, useEffect } from "react";
import { api, savePendingProcess, syncPendingProcesses, ReturnMenuComponent } from "../../../global";

const Dashboard = ({ onTypeAdded }) => {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    const syncOnReconnect = () => { syncPendingProcesses(api); };
    window.addEventListener("online", syncOnReconnect);
    return () => { window.removeEventListener("online", syncOnReconnect); };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (navigator.onLine) {
      try {
        await api.post("/type", { type }, { headers: { "X-Session-ID": sessionId }, });

        alert("Tipo creado correctamente");
      } catch (error) {
        console.error("Error al guardar:", error);
        alert("Error al crear el tipo");
      }
    } else {
      await savePendingProcess("POST", "/type", { type });
    }

    setType("");
    if (onTypeAdded) { onTypeAdded(); }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
      <h1 className="text-white mt-2">Crear nuevo "Tipo"</h1>
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
        <ReturnMenuComponent />
        <button type="submit" className="btn btn-primary ms-2" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
