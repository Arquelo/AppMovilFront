import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import api from "../../../services/api";
import ReturnMenuComponent from "../../../components/ReturnMenuComponent";

const MyDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Función para obtener los datos desde la API o localStorage
    const fetchData = () => {
        api.get("/group")
            .then((response) => {
                setData(response.data.data);
                localStorage.setItem("groupData", JSON.stringify(response.data.data)); // Guardar en localStorage
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
                const storedData = localStorage.getItem("groupData");
                if (storedData) {
                    setData(JSON.parse(storedData)); // Cargar desde localStorage si hay datos guardados
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        const storedData = localStorage.getItem("groupData");
        if (storedData) {
            setData(JSON.parse(storedData));
        }
        fetchData();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este grupo?")) {
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

    const customStyles = {
        tableWrapper: {
            style: {
                borderRadius: "10px 10px 0px 0px",
                overflow: "hidden",
            },
        },
        headCells: {
            style: {
                backgroundColor: "#001b80",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
            },
        },
        rows: {
            style: {
                "&:nth-of-type(odd)": {
                    backgroundColor: "#cce5ff",
                },
                "&:nth-of-type(even)": {
                    backgroundColor: "#99c2ff",
                },
            },
        },
        pagination: {
            style: {
                backgroundColor: "#001b80",
                color: "white",
                fontWeight: "bold",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
            },
        },
    };

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    const handleCreateTypeBtn = () => { navigate("/group/create"); };

    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
            <div className="container mt-4">
                <h2 className="text-white">Lista de Grupos</h2>
                <div className="mb-3 mt-3">
                    <ReturnMenuComponent />
                    <button onClick={handleCreateTypeBtn} className="btn btn-success ms-2 me-2">
                        Crear Grupo
                    </button>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    striped
                    paginationComponentOptions={paginationOptions}
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
};

export default MyDataTable;
