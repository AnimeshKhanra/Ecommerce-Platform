// import { create } from 'zustand';
// import api from '@/lib/axios';
// import { LoginPayload, RegisterPayload, User } from '@/types/auth.types';

// interface AuthState {
//   storeUser: User | null;
//   token: string | null;
//   loading: boolean;

//   setToken: (token: string) => void;
//   login: (data: LoginPayload) => Promise<void>;
//   register: (data: RegisterPayload) => Promise<void>;
//   logout: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   storeUser: null,
//   token: null,
//   loading: false,

//   setToken: (token) => set({ token }),

//   login: async (data) => {
//     set({ loading: true });

//     try {
//       const res = await api.post('/auth/login', data);
//       // console.log(typeof res.data.data.user);
//       // console.log(res.data.data.user);
//       // console.log(JSON.stringify(res.data.data.user));
//       set({
//         storeUser: res.data.data.user || null, // Ensure backend passes user data if needed
//         token: res.data.data.accessToken,
//       });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   register: async (data) => {
//     set({ loading: true });

//     try {
//       await api.post('/auth/register', data);
//     } finally {
//       set({ loading: false });
//     }
//   },

//   logout: async () => {
//     try {
//       await api.post('/auth/logout');
//     } catch {}

//     set({
//       storeUser: null,
//       token: null,
//     });
//   },
// }));


import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/axios";
import {
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth.types";

interface AuthState {
  storeUser: User | null;
  token: string | null;
  loading: boolean;

  setToken: (token: string) => void;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      storeUser: null,
      token: null,
      loading: false,

      setToken: (token) => {
        set({ token });
      },

      login: async (data) => {
        set({ loading: true });

        try {
          const res = await api.post("/auth/login", data);

          set({
            storeUser: res.data.data.user || null,
            token: res.data.data.accessToken || null,
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
        } catch {
          // Even if the backend logout fails,
          // clear the local authentication state.
        }

        set({
          storeUser: null,
          token: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);