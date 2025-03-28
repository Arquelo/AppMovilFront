import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw , faNoteSticky, faUsers, faListUl } from "@fortawesome/free-solid-svg-icons"; 
import {ReturnMenuComponent, useNavigate} from "../../global";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleIndexType = () => { navigate("/type/index"); };
    const handleIndexGroup = () => { navigate("/group/index"); };
    const handleIndexNote = () => { navigate("/note/index"); };
    const handleViewPokemons = () => { navigate("/pokemon/index"); };

    return (
        <div className="d-flex flex-column align-items-center justify-content-start w-100 vh-100 background text-center">
            <div className="row">
                    <h1 class="text-white mt-2">Administrador</h1>
                <div className="col-md-3 col-3 col-sm-12 mt-3">
                    <button onClick={handleIndexNote} className="btn btn-success w-100">
                        <FontAwesomeIcon icon={faNoteSticky} className="fa-3x mb-3 mt-3" />
                        <p>Administar Notas</p>
                    </button>
                </div>
                <div className="col-md-3 col-3 col-sm-12 mt-3">
                    <button onClick={handleIndexGroup} className="btn btn-success w-100">
                        <FontAwesomeIcon icon={faUsers} className="fa-3x mb-3 mt-3" />
                        <p>Administar Grupos</p>
                    </button>
                </div>
                <div className="col-md-3 col-3 col-sm-12 mt-3">
                    <button onClick={handleIndexType} className="btn btn-success w-100">
                        <FontAwesomeIcon icon={faListUl} className="fa-3x mb-3 mt-3" />
                        <p>Administar Tipos</p>
                    </button>
                </div>
                <div className="col-md-3 col-3 col-sm-12 mt-3">
                    <button onClick={handleViewPokemons} className="btn btn-success w-100 mb-3">
                        <FontAwesomeIcon icon={faPaw} className="fa-3x mb-3 mt-3" />
                        <p>Ver Pokemones</p>
                    </button>
                </div>
                <div className="col-md-12 col-12 col-sm-12 mt-3">
                    <ReturnMenuComponent />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
