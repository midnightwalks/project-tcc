// src/api/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Ganti dengan base URL backend-mu
  withCredentials: true, // untuk kirim cookie kalau dibutuhkan
});

export default instance;

