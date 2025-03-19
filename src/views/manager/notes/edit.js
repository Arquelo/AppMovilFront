import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, ReturnMenuComponent } from "../../../global";

const Dashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [types, setTypes] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const sessionId = localStorage.getItem("sessionId");

    useEffect(() => {
        if (id) {
            api.get(`/note/${id}`, { headers: { "X-Session-ID": sessionId } })
                .then((response) => {
                    if (response.data.data) {
                        setDescription(response.data.data.description);
                        setStartDate(response.data.data.start_date);
                        setEndDate(response.data.data.end_date);
                        setSelectedType(response.data.data.type_id);
                        setSelectedGroup(response.data.data.group_id);
                    }
                })
                .catch((error) => console.error("Error al cargar datos:", error));
        }
    }, [id, sessionId]);

    useEffect(() => {
        api.get("/type", { headers: { "X-Session-ID": sessionId } })
            .then((response) => setTypes(response.data.data))
            .catch((error) => console.error("Error al cargar tipos:", error));

        api.get("/group", { headers: { "X-Session-ID": sessionId } })
            .then((response) => setGroups(response.data.data))
            .catch((error) => console.error("Error al cargar grupos:", error));
    }, [sessionId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/note/${id}`,
                {
                    description,
                    start_date: startDate,
                    end_date: endDate,
                    type_id: selectedType,
                    group_id: selectedGroup
                },
                { headers: { "X-Session-ID": sessionId } }
            );
            alert("Nota actualizada correctamente");
            navigate("/note/index");
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al actualizar la nota");
        }

        setLoading(false);
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
            <h1 className="text-white mt-2">Editar Nota</h1>
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
                                <option key={t.id} value={t.id}> {t.type} </option>
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
