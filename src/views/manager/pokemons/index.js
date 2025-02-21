import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import apiPokemon from "../../../services/api";
import ReturnMenuComponent from "../../../components/ReturnMenuComponent";

const MyDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchData = () => {
        apiPokemon.get()
            .then((response) => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
                setLoading(false);
            });
    };

    useEffect(() => { fetchData(); }, []);

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
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <div className="background">
            <div className="container mt-4">
                <h2 className="text-white">Pokedex</h2>
                <ReturnMenuComponent />
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
