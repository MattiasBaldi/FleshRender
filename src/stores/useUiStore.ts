import { create } from "zustand";

export type UiStore = {
  texture: string;

  setTexture: (texture: string) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  texture: "https://threejs.org/examples/textures/uv_grid_opengl.jpg", // example texture

  setTexture: (texture: string) => {
    set({ texture: texture });
  },
}));
