import { create } from "zustand";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  error: string | null;
  login: (userName: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    userName: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isLoggedIn: !!localStorage.getItem("token"),
  error: null,

  login: async (userName, password) => {
    try {
      set({ error: null });
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();
      const token = data.access_token;

      localStorage.setItem("token", token);
      set({ token, isLoggedIn: true, error: null });
    } catch (error: any) {
      set({ error: error.message || "Login failed" });
    }
  },

  register: async (firstName, lastName, userName, password) => {
    try {
      set({ error: null });

      const fullUrl = "/api/users/register";

      const body = JSON.stringify({
        firstName,
        lastName,
        userName,
        password,
      });

      const res = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const rawText = await res.text();

      if (!res.ok) {
        throw new Error(rawText || "Registration failed");
      }

      set({ error: null });
    } catch (error: any) {
      set({ error: error.message || "Registration failed" });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isLoggedIn: false, error: null });
  },
}));
