import React, { useState } from "react";
import { sendDataToLaravel, productStoreRoute } from "./components/routes";

function App() {
  const [responseMessage, setResponseMessage] = useState("");
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <h1>Prueba de conexión Laravel + React</h1>
      <button onClick={() => sendDataToLaravel(setResponseMessage)}>
        Enviar Dato
      </button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default App;
