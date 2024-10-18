import { User } from "@/interfaces";
import { create } from "zustand";

interface Props {
  user?: User;
  setUser: (state: User) => void;
}

export const useUser = create<Props>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));
