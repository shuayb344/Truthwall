import { create } from "zustand"
import { persist } from "zustand/middleware";
import type { User } from "../types/index";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
      set({ user, token, isAuthenticated: true });
     },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
        updateUser: (updates) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
          })),
      }),
      {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 
export default useAuthStore;