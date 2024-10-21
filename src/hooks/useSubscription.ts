import { Subscription, User } from "@/interfaces";
import { create } from "zustand";

interface Props {
  subscription?: Subscription;
  setSubscription: (state: Subscription) => void;
}

export const useSubscription = create<Props>((set) => ({
  subscription: undefined,
  setSubscription: (subscription) => set({ subscription }),
}));
