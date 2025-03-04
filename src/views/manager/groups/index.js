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
        api.get("/group")
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
            api.delete(`/groups/${id}`)
                .then(() => {
                    alert("Grupo eliminado correctamente");
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
            sortable: true, width: '25%',
        },
        {
            name: "Grupo",
            selector: (row) => row.title,
            sortable: true, width: '25%',
        },
        {
            name: "Color",
            selector: (row) => row.color,
            sortable: true,
            cell: (row) => (
                <div style={{ backgroundColor: row.color, width: '100%', height: '20px', borderRadius: '20px' }}></div>
            ),
            width: '25%',
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
            button: true, width: '25%',
        },
    ];

    const handleCreateTypeBtn = () => { navigate("/group/create"); };

    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
            <div className="container mt-4">
                <h2 className="text-white">Lista de Grupos</h2>
                <ReturnMenuComponent />
                <button onClick={handleCreateTypeBtn} className="btn btn-success me-2">
                    Crear Grupo
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
