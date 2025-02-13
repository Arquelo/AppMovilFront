import api from "../services/api";

// Función genérica para enviar datos a Laravel
export const sendDataToLaravel = async (setResponseMessage) => {
    try {
        const response = await api.post("/test", { dato: "Hola desde React" });
        setResponseMessage(
            `${response.data.message} - Dato enviado: ${response.data.data}`
        );
    } catch (error) {
        setResponseMessage("❌ Error al conectar con Laravel");
        console.error(error);
    }
};

// Otras funciones de rutas pueden seguir un patrón similar
export const productStoreRoute = async (setResponseMessage) => {
    try {
        const response = await api.get("/api/products");
        setResponseMessage(`Productos cargados: ${JSON.stringify(response.data)}`);
    } catch (error) {
        setResponseMessage("❌ Error al cargar productos");
        console.error(error);
    }
};
