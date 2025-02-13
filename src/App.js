import React from "react";
import AppRoutes from "./routes/appRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return <AppRoutes />;
};

export default App;



// import React, { useState } from "react";
// import { sendDataToLaravel, productStoreRoute } from "./routes/routes";

// function App() {
//   const [responseMessage, setResponseMessage] = useState("");
//   const [products, setProducts] = useState([]);

//   return (
//     <div className="App">
//       <h1>Prueba de conexión Laravel + React</h1>
//       <button onClick={() => sendDataToLaravel(setResponseMessage)}>
//         Enviar Dato
//       </button>
//       <p>{responseMessage}</p>
//     </div>
//   );
// }

// export default App;
