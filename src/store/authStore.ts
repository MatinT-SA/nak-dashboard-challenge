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
      console.log("1. Full request URL:", fullUrl);

      // Changed userName to username here
      const body = JSON.stringify({
        firstName,
        lastName,
        userName,
        password,
      });
      console.log("2. Request body:", body);

      const res = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      console.log("3. Status code:", res.status);

      const rawText = await res.text(); // Use text to avoid JSON parse crash
      console.log("4. Raw response text:", rawText);

      if (!res.ok) {
        throw new Error(rawText || "Registration failed");
      }

      set({ error: null });
    } catch (error: any) {
      console.log("5. Caught error:", error.message);
      set({ error: error.message || "Registration failed" });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isLoggedIn: false, error: null });
  },
}));
