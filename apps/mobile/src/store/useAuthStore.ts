import { create } from 'zustand';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));