import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true, // cookies (access + refresh)
});

let isRefreshing = false; // flag to keep track of an ongoin refresh-token api call, prevents multiple ref calls at the same time
/**
 * Array of pending requests, strores reqs that failed while refresh is in progress.
 * {
 *  resolve: Func,
 *  reject: Func,
 * }
 */
let failedQueue = [];

const processQueue = (error) => {
  // loop over all pending requests
  failedQueue.forEach((p) => {
    // if refresh failed: reject all waiting requests
    if (error) p.reject(error);
    // Allow waiting requests to retry
    else p.resolve();
  });
  failedQueue = []; // clear queue after processing, prevents memory leaks
};

/**
 * axios interceptors take two funcs as cb -> a success handler and an async error handler
 * (response) => response, // do nothing, pass successful responses through untouched
 * async (error) => {} // Run every failed request, this is where token refresh happens
 */
api.interceptors.response.use(
  (response) => response, // do nothing, pass
  async (error) => {
    /**
     * error.config contains ->
     * URL, Method, Headers, Body
     * save it to retry later
     */
    const originalRequest = error.config; // capture the failed request

    const isAccessTokenExpired = error.response?.status === 401 && error.response?.data?.message === "ACCESS_TOKEN_EXPIRED"; // detect access token expiry

    // guard infinite retry loops, without this, if refresh fails, retry trigger interceptors again, INF loop, with, each req retries only once
    if (isAccessTokenExpired && !originalRequest._retry) {
      // mark as already retried
      originalRequest._retry = true;

      // If refresh already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        // Refresh tokens
        await api.post("/auth/refresh-token");

        // Retry all queued requests
        processQueue(null);

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // Refresh failed → logout
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    // if not an expiry error, handle it normally
    return Promise.reject(error);
  }
);

export default api;
