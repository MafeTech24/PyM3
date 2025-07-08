import {
    getFirestore,
    collection,
    getDocs,
    query,
    where
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export const getProducts = async () => {
    const documentos = await getDocs(collection(db, "producto"));
    const productos = [];

    documentos.forEach((doc) => {
        productos.push({ ...doc.data(), id: doc.id })
    });
    
    return productos
}

export const getProductsByCategory = async (category) => {
    const q = query(collection(db, "producto"), where("category", "==", category))
    const documentos = await getDocs(q)
    const productos = []

    documentos.forEach((doc) => {
        productos.push({ ...doc.data(), id: doc.id })
    })
    return productos
}
