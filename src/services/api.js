import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:8000/api",
  baseURL: "https://www.produccion.shop/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiPokemon = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
