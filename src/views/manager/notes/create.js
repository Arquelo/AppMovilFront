import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import ReturnMenuComponent from "../../../components/ReturnMenuComponent";

const Dashboard = ({ onNoteAdded }) => {
  const [types, setTypes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Obtener los tipos y grupos al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/note/create"); 
        setTypes(response.data.types);
        setGroups(response.data.groups);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/note", {
        description,
        start_date: startDate,
        end_date: endDate,
        type_id: selectedType,
        group_id: selectedGroup,
      });

      alert("Nota creada correctamente");

      // Limpiar campos después de guardar
      setDescription("");
      setStartDate("");
      setEndDate("");
      setSelectedType("");
      setSelectedGroup("");

      if (onNoteAdded) {
        onNoteAdded();
      }

      // Recargar datos después de agregar una nueva nota
      const response = await api.get("/note/create");
      setTypes(response.data.types);
      setGroups(response.data.groups);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al crear la nota");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
      <h1 className="text-white mt-2">Crear nueva "Nota"</h1>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="row mb-3">
          <div className="col-6">
            <label className="form-label text-white">Fecha de inicio</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="col-6">
            <label className="form-label text-white">Fecha de fin</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="col-6">
            <label className="form-label text-white">Tipo</label>
            <select
              className="form-select mb-3"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              required
            >
              <option value="">Seleccione un tipo</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label className="form-label text-white">Grupo</label>
            <select
              className="form-select mb-3"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              required
            >
              <option value="">Seleccione un Grupo</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label text-white">Descripción</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
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
