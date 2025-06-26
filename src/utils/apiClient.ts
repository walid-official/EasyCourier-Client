import axios from 'axios';
import { storeToken, getToken, logout } from './auth';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
});

// Add token to request headers
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 errors (unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token request (must send cookie)
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URI}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshResponse.data?.token;
        if (newToken) {
          storeToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest); // retry original request
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        logout(); // Remove token and redirect
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
