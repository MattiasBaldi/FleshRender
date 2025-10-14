import { create } from "zustand";

type TextureStore = {
  texture: string;
  setTexture: (texture: string) => void;
};

export const useTextureStore = create<TextureStore>((set) => ({
  texture: "https://threejs.org/examples/textures/uv_grid_opengl.jpg", // example texture
  setTexture: (texture: string) => {
    set({ texture: texture });
  },
}));
