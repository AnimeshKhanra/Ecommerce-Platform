import { create } from "zustand";
import api from "@/lib/axios";
import {
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth.types";


interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;

  setToken: (token: string) => void;

  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,

  setToken: (token) => set({ token }),

  login: async (data) => {
    set({ loading: true });

    try {
      const res = await api.post("/auth/login", data);

      set({
        user: res.data.user,
        token: res.data.accessToken,
      });
    } finally {
      set({ loading: false });
    }
  },

  register: async (data) => {
    set({ loading: true });

    try {
      await api.post("/auth/register", data);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    set({
      user: null,
      token: null,
    });
  },
  
}));