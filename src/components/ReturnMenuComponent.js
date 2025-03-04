import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ReturnMenuComponent = ({ text = "Volver", className = "btn btn-secondary" }) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate(-1); 
    };

    return (
        <button className={className} onClick={handleClick}>
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> {text}
    </button>
    );
};

export default ReturnMenuComponent;
