import React, { useEffect, useState } from "react";
import api from "../services/api";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { saveTableData, getTableData  } from "../services/indexedDB"

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const TABLE_NAME = "note"; 

  const navigate = useNavigate();
  const handlemenuManager = () => { navigate("/menuManager"); };

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
      api.post(`/note/completed/${id}`)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: '5%',
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Grupo",
      selector: (row) => row.group.title,
      sortable: true,
      width: '15%',
    },
    {
      name: "Color",
      selector: (row) => row.group.color,
      sortable: true,
      cell: (row) => (
        <div style={{ backgroundColor: row.group.color, width: '100%', height: '20px', borderRadius: '20px' }}></div>
      ),
      width: '10%',
    },
    {
      name: "Tipo",
      selector: (row) => row.type.type,
      sortable: true,
      width: '15%',
    },
    {
      name: "Fecha de inicio",
      selector: (row) => row.start_date,
      sortable: true,
      width: '10%',
    },
    {
      name: "Fecha de fin",
      selector: (row) => row.end_date,
      sortable: true,
      width: '10%',
    },
    // {
    //   name: "Acciones",
    //   cell: (row) => (
    //     <button className="btn btn-success btn-sm" onClick={() => handleDelete(row.id)}>
    //       Completar 
    //     </button>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
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


  return (
    <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
      <h1 class="text-white mt-2">Bienvenido a Notas Rapidas </h1>
      <div className="container mt-4">
        <button onClick={handlemenuManager} className="btn btn-success px-4 py-2 mb-4">
          Administar
        </button>
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

export default Dashboard;
