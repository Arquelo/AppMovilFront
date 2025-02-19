import React, { useState } from "react";
import api from "../../../services/api";
import ReturnMenuComponent from "../../../components/ReturnMenuComponent";

const Dashboard = ({ onGroupAdded }) => {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/group", { title , color });
            alert("Grupo creado correctamente");

            setTitle("");
            setColor("");

            if (onGroupAdded) {
                onGroupAdded();
            }
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al crear el grupo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
            <h1 className="text-white mt-2">Crear nuevo "Grupo"</h1>
            <form onSubmit={handleSubmit}>
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
                <ReturnMenuComponent />
                <button type="submit" className="btn btn-primary ms-2" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </div>
    );
};

export default Dashboard;
