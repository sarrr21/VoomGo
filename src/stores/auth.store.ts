import { create } from "zustand";

type AuthUser = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  status?: string;
} | null;

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  user: AuthUser;
  isAuthenticated: boolean;
  hydrated: boolean;
  setAuth: (tokens: { accessToken: string; refreshToken: string }, user: NonNullable<AuthUser>) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  hydrate: () => void;
};

const ACCESS_TOKEN_KEY = "vg_access_token";
const REFRESH_TOKEN_KEY = "vg_refresh_token";
const USER_KEY = "vg_auth_user";
const USER_ID_KEY = "vg_auth_user_id";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  userId: null,
  user: null,
  isAuthenticated: false,
  hydrated: false,
  setAuth: ({ accessToken, refreshToken }, user) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(USER_ID_KEY, user._id);
    set({ accessToken, refreshToken, userId: user._id, user, isAuthenticated: true, hydrated: true });
  },
  setAccessToken: (token) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    set({ accessToken: token, isAuthenticated: true });
  },
  clearAuth: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_ID_KEY);
    set({ accessToken: null, refreshToken: null, userId: null, user: null, isAuthenticated: false, hydrated: true });
  },
  hydrate: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const rawUser = localStorage.getItem(USER_KEY);
    const userId = localStorage.getItem(USER_ID_KEY);
    if (token && refreshToken && rawUser && userId) {
      try {
        const user = JSON.parse(rawUser);
        set({ accessToken: token, refreshToken, userId, user, isAuthenticated: true, hydrated: true });
      } catch {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(USER_ID_KEY);
        set({ hydrated: true });
      }
    } else {
      set({ hydrated: true });
    }
  },
}));


