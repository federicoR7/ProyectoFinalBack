import axios from "axios";

const api = axios.create({
  baseURL: 'https://proyectofinalback-q34r.onrender.com/api',
  // withCredentials: true,
})

export default api;


// https://proyectofinalback-cvd9.onrender.com/api