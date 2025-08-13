import { http } from "./http";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
  };
};

export async function login(data: LoginRequest) {
  const res = await http.post<LoginResponse>("/auth/admin/login", data);
  return res.data;
}

export async function logout(payload: { userId: string }) {
  const res = await http.post("/auth/logout", payload);
  return res.data;
}

export async function refreshToken(payload: { refreshToken: string; userId: string }) {
  const res = await http.post<{ success: boolean; data: { accessToken: string; tokenType: string; expiresIn: number } }>(
    "/auth/refresh-token",
    payload,
  );
  return res.data;
}



