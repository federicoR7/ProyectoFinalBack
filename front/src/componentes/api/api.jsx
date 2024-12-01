import axios from "axios";

const api = axios.create({
  baseURL: 'https://proyectofinalback-q34r.onrender.com/api',
})

export default api;
