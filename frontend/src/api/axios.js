import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Mock API base URL
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
