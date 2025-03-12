import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ReturnMenuComponent from "../../../components/ReturnMenuComponent";
import { saveTableData, getTableData } from "../../../services/indexedDB";

const TABLE_NAME = "INDEX_POKEMON";

const MyDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔥 Función para obtener datos de la API o IndexedDB
    const fetchData = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const pokemonData = await response.json();

            // 🔹 Formatear los datos para la DataTable
            const formattedData = pokemonData.results.map((pokemon, index) => ({
                id: index + 1,
                name: pokemon.name,
                url: pokemon.url,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
            }));

            setData(formattedData);
            await saveTableData(TABLE_NAME, formattedData); // Guardar en IndexedDB
        } catch (error) {
            console.error(`⚠️ Error obteniendo ${TABLE_NAME}, cargando desde IndexedDB:`, error);
            setError("Error al cargar los datos. Inténtalo de nuevo más tarde.");
            const cachedData = await getTableData(TABLE_NAME);
            if (cachedData && Array.isArray(cachedData)) {
                setData(cachedData); // Cargar datos almacenados si hay error con la API
            }
        } finally {
            setLoading(false);
        }
    };

    // 🟢 Monitorear si hay conexión y actualizar datos cuando vuelva
    useEffect(() => {
        fetchData(); // Cargar datos al montar

        const syncOnReconnect = () => {
            console.log("🔄 Conexión restaurada, sincronizando...");
            fetchData();
        };

        window.addEventListener("online", syncOnReconnect);

        return () => {
            window.removeEventListener("online", syncOnReconnect);
        };
    }, []);

    // 📝 Columnas de la tabla
    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true },
        { name: "Nombre", selector: (row) => row.name, sortable: true },
        {
            name: "Imagen",
            cell: (row) => (
                <img src={row.image} alt={row.name} width="100" height="100" />
            ),
        },
    ];

    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 background text-center">
            <div className="container mt-4">
                <h2 className="text-white">Pokedex</h2>
                <ReturnMenuComponent />
                {error && <p style={{ color: "red" }}>{error}</p>}
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
