export interface User {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}