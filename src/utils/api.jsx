// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://beautyparlourapi-f3a3beedh5fke2ge.centralindia-01.azurewebsites.net/api", // your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
