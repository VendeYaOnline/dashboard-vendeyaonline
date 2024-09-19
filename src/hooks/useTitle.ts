import { create } from "zustand";

interface Props {
  title: string;
  setTitle: (state: string) => void;
}

export const useTitle = create<Props>((set) => ({
  title: "",
  setTitle: (state) => set({ title: state }),
}));
