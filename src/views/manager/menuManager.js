import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnMenuComponent from "../../components/ReturnMenuComponent";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleIndexType = () => { navigate("/type/index"); };
    const handleIndexGroup = () => { navigate("/group/index"); };
    const handleIndexNote = () => { navigate("/note/index"); };

    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
            <h1 class="text-white mt-2">Administrador</h1>
            <button onClick={handleIndexNote} className="btn btn-success px-4 py-2 w-25">
                Administar Notas
            </button>
            <button onClick={handleIndexGroup} className="btn btn-success px-4 py-2 w-25">
                Administar Grupos
            </button>
            <button onClick={handleIndexType} className="btn btn-success px-4 py-2 w-25">
                Administar Tipos
            </button>
            <ReturnMenuComponent />
        </div>
    );
};

export default Dashboard;
