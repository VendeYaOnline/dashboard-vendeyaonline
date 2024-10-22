import { create } from "zustand";

type Form = {
  name: string;
  email: string;
  lastname: string;
  phone: string;
  message: string;
};

interface Props {
  form?: Form;
  setForm: (state: Form) => void;
}

export const useForms = create<Props>((set) => ({
  form: undefined,
  setForm: (form) => set({ form }),
}));
