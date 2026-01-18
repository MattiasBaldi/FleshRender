import { create } from "zustand";

export type DecalsStore = {
  isDecalPlacing: boolean;
  scaleFactor: number;
  activeDecalId: string;

  setIsDecalPlacing: (isDecalPlacing: boolean) => void;
  setScaleFactor: (scaleFactor: number) => void;
  setActiveDecalId: (activeDecalId: string) => void;
};

export const useDecalsStore = create<DecalsStore>((set) => ({
  // defaults
  isDecalPlacing: false,
  scaleFactor: 1.0,
  activeDecalId: "",

  // setters
  setIsDecalPlacing: (isDecalPlacing: boolean) => {
    set({ isDecalPlacing });
  },

  setScaleFactor: (scaleFactor: number) => {
    set({ scaleFactor });
  },

  setActiveDecalId: (activeDecalId: string) => {
    set({ activeDecalId });
  },
}));
