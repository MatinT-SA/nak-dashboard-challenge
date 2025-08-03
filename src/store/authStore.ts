import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("loggedIn"),
  login: () => {
    localStorage.setItem("loggedIn", "true");
    set({ isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem("loggedIn");
    set({ isLoggedIn: false });
  },
}));
