import api from "./services/api";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./routes/appRoutes";
import { saveTableData, getTableData, savePendingProcess, syncPendingProcesses } from "./services/indexedDB";
import DataTable from "react-data-table-component";
import ReturnMenuComponent from "./components/ReturnMenuComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const customStyles = {
    tableWrapper: { style: { borderRadius: "10px 10px 0px 0px", overflow: "hidden" } },
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
            "&:nth-of-type(odd)": { backgroundColor: "#cce5ff" },
            "&:nth-of-type(even)": { backgroundColor: "#99c2ff" },
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

export {
    api,
    Swal, 
    useNavigate, 
    AppRoutes, 
    saveTableData, 
    getTableData, 
    savePendingProcess, 
    syncPendingProcesses, 
    DataTable, 
    customStyles, 
    paginationOptions, 
    ReturnMenuComponent, 
    FontAwesomeIcon
};
