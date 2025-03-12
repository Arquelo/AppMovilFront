import { openDB } from "idb";

const DB_NAME = "NotasRapidasDB";
const DB_VERSION = 1;
const TABLES = ["MENU", "INDEX_NOTE", "INDEX_GROUP", "INDEX_TYPE", "INDEX_POKEMON", "PROCESOS_PENDIENTES"];

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("PROCESOS_PENDIENTES")) {
                db.createObjectStore("PROCESOS_PENDIENTES", { keyPath: "id", autoIncrement: true });
            }
        },
    });
};


// Guardar datos de cualquier tabla en IndexedDB
export const saveTableData = async (tableName, data) => {
    const db = await initDB();
    if (!TABLES.includes(tableName)) {
        console.error(`Tabla "${tableName}" no permitida.`);
        return;
    }

    const tx = db.transaction(tableName, "readwrite");
    await tx.objectStore(tableName).put(data, "data");
    await tx.done;
};

export const getTableData = async (tableName) => {
    const db = await initDB();
    if (!TABLES.includes(tableName)) {
        console.error(`Tabla "${tableName}" no permitida.`);
        return null;
    }

    return db.transaction(tableName).objectStore(tableName).get("data");
};

export const syncDataWhenOnline = async (syncFunction) => {
    if (navigator.onLine) {
        console.log("🌍 Conexión en línea, sincronizando...");
        await syncFunction(); // Llamar la función de sincronización
    } else {
        console.log("Sin conexión, datos almacenados localmente.");
        window.addEventListener("online", async () => {
            console.log("🔄 Internet restaurado, sincronizando...");
            await syncFunction();
        });
    }
};



export const savePendingProcess = async (operation, url, payload) => {
    const db = await initDB();
    const tx = db.transaction("PROCESOS_PENDIENTES", "readwrite");
    const store = tx.objectStore("PROCESOS_PENDIENTES");

    await store.add({ operation, url, payload, timestamp: Date.now() });

    await tx.done;
};

// Sincronizar procesos pendientes cuando vuelve la conexión
export const syncPendingProcesses = async (api) => {
    const db = await initDB();
    const tx = db.transaction("PROCESOS_PENDIENTES", "readonly");
    const pendingRequests = await tx.objectStore("PROCESOS_PENDIENTES").getAll();
    // Procesar solicitudes pendientes
    if (pendingRequests.length > 0) {
        for (const request of pendingRequests) {
            try {
                if (request.operation === "POST") {
                    await api.post(request.url, request.payload);
                } else if (request.operation === "DELETE") {
                    await api.delete(request.url);
                }
            } catch (error) {
                console.error("Error al procesar solicitud pendiente:", error);
                return;
            }
        }
        //Eliminar las solicitudes procesadas
        const clearTx = db.transaction("PROCESOS_PENDIENTES", "readwrite");
        await clearTx.objectStore("PROCESOS_PENDIENTES").clear();
        await clearTx.done;
    }
};