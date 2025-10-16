export type Vector = {
  x: number;
  y: number;
  z: number;
};

export const roundVec = (vec: Vector, digits = 5) => ({
  x: Number(vec.x.toFixed(digits)),
  y: Number(vec.y.toFixed(digits)),
  z: Number(vec.z.toFixed(digits)),
});
