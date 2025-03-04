import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ReturnMenuComponent from "../../../components/ReturnMenuComponent";

const MyDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Para manejar errores

    const fetchData = async () => {  // Usando async/await
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100"); // Petición a la API de Pokémon (limit=100 para traer 100 pokemones)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Manejo de errores de la API
            }
            const pokemonData = await response.json();

            // Formatear los datos para la DataTable
            const formattedData = pokemonData.results.map((pokemon, index) => ({
                id: index + 1, // Puedes usar el índice como ID o buscar una forma más robusta si la API lo proporciona
                name: pokemon.name,
                url: pokemon.url, // Guardamos la URL para detalles
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png` // Ejemplo de imagen, ajusta según la API
            }));

            setData(formattedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error al cargar los datos. Inténtalo de nuevo más tarde."); // Mensaje de error al usuario
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Imagen", // Nueva columna para la imagen
            cell: (row) => (
                <img src={row.image} alt={row.name} width="250" /> // Ajusta el ancho según necesites
            ),
        },
    ];

    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 background text-center">
            <div className="container mt-4 ">
                <h2 className="text-white">USERS</h2>
                <ReturnMenuComponent />
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error */}
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