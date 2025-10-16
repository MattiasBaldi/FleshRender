import { create } from "zustand";
import React from "react";

type UiStore = {
  texture: string;
  canvas: React.Ref<HTMLCanvasElement>;

  setTexture: (texture: string) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  texture: "https://threejs.org/examples/textures/uv_grid_opengl.jpg", // example texture
  canvas: null,

  setTexture: (texture: string) => {
    set({ texture: texture });
  },
}));
