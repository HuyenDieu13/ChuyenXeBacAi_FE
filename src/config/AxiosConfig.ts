// import axios from "axios";
// import Cookies from "js-cookie";

// const httpClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const PUBLIC_AUTH_PATHS = [
//   "/Auth/login",
//   "/Auth/register",
//   "/Auth/refresh",
//   "/Auth/send-otp",
//   "/Auth/verify-otp",
// ];

// // ======================
// // REQUEST INTERCEPTOR
// // ======================
// httpClient.interceptors.request.use((config) => {
//   const url = config.url || "";

//   const isPublicAuthApi = PUBLIC_AUTH_PATHS.some((path) =>
//     url.includes(path)
//   );

//   if (isPublicAuthApi) {
//     delete config.headers.Authorization;
//     return config;
//   }

//   const token = Cookies.get("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // ======================
// // RESPONSE INTERCEPTOR
// // ======================
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     error ? prom.reject(error) : prom.resolve(token);
//   });
//   failedQueue = [];
// };

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config as any;
//     const url = originalRequest?.url || "";

//     const isPublicAuthApi = PUBLIC_AUTH_PATHS.some((path) =>
//       url.includes(path)
//     );

//     if (isPublicAuthApi) {
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return httpClient(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // TODO: refresh token sau
//       } catch (err) {
//         processQueue(err, null);
//         Cookies.remove("accessToken");
//         window.location.href = "/login";
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default httpClient;
// libs/httpClient.ts
import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token từ localStorage
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("role");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default httpClient;
