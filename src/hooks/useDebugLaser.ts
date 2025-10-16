import { useState } from "react";
import type { DecalVector } from "./useDecal";

export function useDebugLaser() {
  // Debug laser
  const [rayOrigin, setRayOrigin] = useState<DecalVector>({ x: 0, y: 0, z: 0 }); /* prettier-ignore */
  const [rayDirection, setRayDirection] = useState<DecalVector>({ x: 0, y: 0, z: 0 }); /* prettier-ignore */

  return { rayOrigin, setRayOrigin, rayDirection, setRayDirection };
}
