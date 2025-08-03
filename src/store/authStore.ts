import { create } from "zustand";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  error: string | null;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isLoggedIn: !!localStorage.getItem("token"),
  error: null,

  login: async (username, password) => {
    try {
      set({ error: null }); // clear previous error
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, password }),
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

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isLoggedIn: false, error: null });
  },
}));
