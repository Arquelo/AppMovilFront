import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import api from "../../../services/api";
import ReturnMenuComponent from "../../../components/ReturnMenuComponent";

const MyDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Función para obtener los datos desde la API
    const fetchData = () => {
        api.get("/type")
            .then((response) => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Función para eliminar un tipo
    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este tipo?")) {
            api.delete(`/type/${id}`)
                .then(() => {
                    alert("Tipo eliminado correctamente");
                    fetchData();
                })
                .catch((error) => {
                    console.error("Error al eliminar:", error);
                });
        }
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Nombre",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                    Eliminar
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const handleCreateTypeBtn = () => {
        navigate("/type/create");
    };

    return (
        <div className="background">
            <div className="container mt-4">
                <h2 className="text-white">Lista de Notas</h2>
                <ReturnMenuComponent />
                <button onClick={handleCreateTypeBtn} className="btn btn-success me-2">
                    Crear Nota
                </button>
                <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    striped
                />
            </div>
        </div>
    );
};

export default MyDataTable;
