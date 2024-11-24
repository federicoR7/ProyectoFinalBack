import axios from "axios";

const api = axios.create({
  baseURL: 'https://proyectofinalback-cvd9.onrender.com/api'
})

export default api;