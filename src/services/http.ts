import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "../stores/auth.store";

const baseURL =
  (typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL) ||
  "http://localhost:5000/api/v1";

export const http = axios.create({ baseURL, withCredentials: false });

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
const requestQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function onRefreshed(token: string) {
  requestQueue.forEach((p) => p.resolve(token));
  requestQueue.length = 0;
}

function onRefreshFailed(err: unknown) {
  requestQueue.forEach((p) => p.reject(err));
  requestQueue.length = 0;
}

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const url = originalRequest?.url || "";

    if (url.includes("/auth/admin/login") || url.includes("/auth/refresh-token") || url.includes("/auth/logout")) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, userId, clearAuth, setAccessToken } = useAuthStore.getState();
      if (!refreshToken || !userId) {
        clearAuth();
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = (async () => {
          try {
            const resp = await axios.post(
              `${baseURL}/auth/refresh-token`,
              { refreshToken, userId },
              { headers: { "Content-Type": "application/json" } },
            );
            const newToken = (resp.data?.data?.accessToken as string) || (resp.data?.accessToken as string);
            if (!newToken) throw new Error("No accessToken in refresh response");
            setAccessToken(newToken);
            onRefreshed(newToken);
            return newToken;
          } catch (err) {
            clearAuth();
            onRefreshFailed(err);
            throw err;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        })();
      }

      try {
        const token = await (refreshPromise as Promise<string>);
        return http({
          ...originalRequest,
          headers: { ...(originalRequest.headers || {}), Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export type ApiError = AxiosError<{ message?: string } | undefined>;


