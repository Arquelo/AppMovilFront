import React, { useEffect, useState } from "react";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { api, saveTableData, getTableData, useNavigate, DataTable, customStyles, paginationOptions, ReturnMenuComponent, FontAwesomeIcon } from "../../../global";

const MyDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const TABLE_NAME = "INDEX_TYPE";
    const navigate = useNavigate();
    const handleCreateTypeBtn = () => { navigate("/type/create"); };

    const fetchData = async () => {
        try {
            const response = await api.get(`/type`);
            if (response?.data?.data && Array.isArray(response.data.data)) {
                setData(response.data.data);
                await saveTableData(TABLE_NAME, response.data.data);
            } else {
                throw new Error("Datos de API no válidos.");
            }
        } catch (error) {
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
        { name: "ID", selector: (row) => row.id, sortable: true, },
        { name: "Nombre", selector: (row) => row.type, sortable: true, },
        {
            name: "Acciones",
            cell: (row) => (
                <div className="d-flex">
                    <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/type/edit/${row.id}`)}>
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
