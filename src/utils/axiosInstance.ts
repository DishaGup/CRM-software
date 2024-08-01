// src/utils/axiosInstance.ts

import axios from 'axios';
import { getToken } from './JwtService';
import { base_url } from './variable';
const axiosInstance = axios.create({
  baseURL: base_url,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
