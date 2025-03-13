import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // 👈 Asegúrate de que apunta al backend
});

export const fetcher = async (url: string) => {
  console.log(`🔍 Intentando obtener datos de: ${api.defaults.baseURL}${url}`);
  try {
    const response = await api.get(url);
    console.log("✅ Respuesta recibida:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en la petición:", error);
    throw error;
  }
};
