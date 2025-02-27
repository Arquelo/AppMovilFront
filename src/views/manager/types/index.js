import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import api from "../../../services/api";
import { saveTableData, getTableData  } from "../../../services/indexedDB"
import ReturnMenuComponent from "../../../components/ReturnMenuComponent";

const MyDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const TABLE_NAME = "type"; 

    const navigate = useNavigate();

    // Función para obtener los datos desde la API
    const fetchData = async () => {
        try {
            const response = await api.get(`/${TABLE_NAME}`); 
            setData(response.data.data);
            saveTableData(TABLE_NAME, response.data.data); 
            setLoading(false);
        } catch (error) {
            console.error(`Error obteniendo ${TABLE_NAME}, cargando desde IndexedDB:`, error);
            const cachedData = await getTableData(TABLE_NAME); 
            if (cachedData) {
                setData(cachedData);
            }
            setLoading(false);
        }
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

    const handleCreateTypeBtn = () => { navigate("/type/create"); };

    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
            <div className="container mt-4">
                <h2 className="text-white">Lista de Tipos</h2>
                <div className="mb-3 mt-3">
                    <ReturnMenuComponent />
                    <button onClick={handleCreateTypeBtn} className="btn btn-success ms-2 me-2">
                        Crear Tipo
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
