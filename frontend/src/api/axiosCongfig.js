// import axios from "axios";
// import { refreshToken } from "./auth";

// // Create instance
// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Attach token to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Handle expired token
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     if (err.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const newToken = await refreshToken();
//       if (newToken) {
//         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//         return api(originalRequest);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

// export default api;
