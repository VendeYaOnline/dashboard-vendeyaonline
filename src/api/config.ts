import axios from "axios";

export const axiosConfig = axios.create({
  baseURL:
    "https://service-backend-vendeyaonline-production.up.railway.app/api",
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token_vendeyaonline");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
