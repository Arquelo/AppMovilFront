import React, { useEffect, useState } from "react";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { api, saveTableData, getTableData, useNavigate, DataTable, customStyles, paginationOptions, ReturnMenuComponent, FontAwesomeIcon } from "../../../global";

const MyDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const TABLE_NAME = "INDEX_NOTE";
    const navigate = useNavigate();
    const handleCreateNoteBtn = () => { navigate("/note/create"); };

    // Obtener datos de la API o IndexedDB
    const fetchData = async () => {
        try {
            const response = await api.get(`/note`);
            if (response?.data?.data && Array.isArray(response.data.data)) {
                setData(response.data.data);
                await saveTableData(TABLE_NAME, response.data.data);
            } else {
                throw new Error("Datos de API no válidos.");
            }
        } catch (error) {
            console.error(`Error obteniendo ${TABLE_NAME}, cargando desde IndexedDB:`, error);
            const cachedData = await getTableData(TABLE_NAME);
            if (cachedData && Array.isArray(cachedData)) {
                setData(cachedData);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const syncOnReconnect = () => { fetchData(); };
        window.addEventListener("online", syncOnReconnect);
        return () => { window.removeEventListener("online", syncOnReconnect); };
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este tipo?")) {
            api.delete(`/note/${id}`)
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
        { name: "ID", selector: (row) => row.id, sortable: true, width: '5%', },
        { name: "Descripción", selector: (row) => row.description, sortable: true, },
        { name: "Grupo", selector: (row) => row.group.title, sortable: true, width: '15%', },
        {
            name: "Color",
            selector: (row) => row.group.color,
            sortable: true,
            cell: (row) => (
                <div style={{ backgroundColor: row.group.color, width: '100%', height: '20px', borderRadius: '20px' }}></div>
            ),
            width: '10%',
        },
        { name: "Tipo", selector: (row) => row.type.type, sortable: true, width: '15%', },
        { name: "Fecha de inicio", selector: (row) => row.start_date, sortable: true, width: '10%', },
        { name: "Fecha de fin", selector: (row) => row.end_date, sortable: true, width: '10%', },
        {
            name: "Acciones",
            cell: (row) => (
                <div className="d-flex">
                    <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/note/edit/${row.id}`)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];


    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
            <div className="container mt-4">
                <h2 className="text-white">Lista de Notas</h2>
                <div className="mb-3 mt-3">
                    <ReturnMenuComponent />
                    <button onClick={handleCreateNoteBtn} className="btn btn-success ms-2 me-2">
                        Crear Nota
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
