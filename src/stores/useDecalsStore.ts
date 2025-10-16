import { create } from "zustand";

export type DecalsStore = {
  isDecalPlacing: boolean;
  scaleFactor: number;

  setIsDecalPlacing: (isActive: boolean) => void;
  setScaleFactor: (scaleFactor: number) => void;
};

export const useDecalsStore = create<DecalsStore>((set) => ({
  isDecalPlacing: false,
  scaleFactor: 1.0,

  setIsDecalPlacing: (isDecalPlacing: boolean) => {
    set({ isDecalPlacing: isDecalPlacing });
  },

  setScaleFactor: (scaleFactor: number) => {
    set({ scaleFactor: scaleFactor });
  },
}));
