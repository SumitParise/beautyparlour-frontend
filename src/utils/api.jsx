// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7055/api", // your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
