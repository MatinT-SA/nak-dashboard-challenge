import { create } from "zustand";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  error: string | null;
  firstName: string | null;
  username: string | null;
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
  firstName: localStorage.getItem("firstName"),
  username: localStorage.getItem("username"),

  login: async (userName, password) => {
    try {
      set({ error: null });

      const res = await fetch("https://nak-interview.darkube.app/auth/login", {
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

      // Decode the JWT to extract the username
      const payload = JSON.parse(atob(token.split(".")[1])) as {
        username?: string;
        sub?: string;
      };

      const username = payload.username || null;

      localStorage.setItem("token", token);
      if (username) {
        localStorage.setItem("username", username);
      }

      set({
        token,
        isLoggedIn: true,
        error: null,
        firstName: null,
        username,
      });
    } catch (error: any) {
      set({ error: error.message || "Login failed" });
    }
  },

  register: async (firstName, lastName, userName, password) => {
    try {
      set({ error: null });

      const res = await fetch(
        "https://nak-interview.darkube.app/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, userName, password }),
        }
      );

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
    localStorage.removeItem("firstName");
    localStorage.removeItem("username");
    set({
      token: null,
      isLoggedIn: false,
      error: null,
      firstName: null,
      username: null,
    });
  },
}));
