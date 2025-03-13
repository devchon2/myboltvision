import { create } from 'zustand';

export const useUserStore = create<{
  user: any;
  setUser: (user: any) => void;
}>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
