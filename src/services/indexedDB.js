import { openDB } from "idb";

const DB_NAME = "NotasRapidasDB";
const DB_VERSION = 100000; 

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
        },
    });
};

// 🔥 Guardar datos de cualquier tabla en IndexedDB
export const saveTableData = async (tableName, data) => {
    const db = await initDB();

    // 🔹 Si la tabla no existe, créala dinámicamente
    if (!db.objectStoreNames.contains(tableName)) {
        db.close();
        const newDb = await openDB(DB_NAME, DB_VERSION + 1, {
            upgrade(newDb) {
                if (!newDb.objectStoreNames.contains(tableName)) {
                    newDb.createObjectStore(tableName);
                }
            },
        });
        return saveTableData(tableName, data);
    }

    const tx = db.transaction(tableName, "readwrite");
    await tx.objectStore(tableName).put(data, "data");
    await tx.done;
};

// 🔥 Obtener datos de cualquier tabla desde IndexedDB
export const getTableData = async (tableName) => {
    const db = await initDB();
    if (!db.objectStoreNames.contains(tableName)) {
        return null; // Si la tabla no existe, devuelve null
    }
    return db.transaction(tableName).objectStore(tableName).get("data");
};
