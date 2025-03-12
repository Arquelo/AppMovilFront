import React, { useEffect, useState } from "react";
import { api, saveTableData, getTableData, useNavigate, DataTable, customStyles, paginationOptions } from "../global";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const TABLE_NAME = "MENU";
  const navigate = useNavigate();
  const handlemenuManager = () => { navigate("/menuManager"); };

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

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "5%" },
    { name: "Descripción", selector: (row) => row.description, sortable: true },
    { name: "Grupo", selector: (row) => row.group.title, sortable: true, width: "15%" },
    {
      name: "Color",
      selector: (row) => row.group.color,
      sortable: true,
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.group.color,
            width: "100%",
            height: "20px",
            borderRadius: "20px",
          }}
        ></div>
      ),
      width: "10%",
    },
    { name: "Tipo", selector: (row) => row.type.type, sortable: true, width: "15%" },
    { name: "Fecha de inicio", selector: (row) => row.start_date, sortable: true, width: "10%" },
    { name: "Fecha de fin", selector: (row) => row.end_date, sortable: true, width: "10%" },
  ];

  return (
    <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
      <h1 className="text-white mt-2">Bienvenido a Notas Rápidas</h1>
      <div className="container mt-4">
        <button onClick={handlemenuManager} className="btn btn-success px-4 py-2 mb-4">
          Administrar
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
