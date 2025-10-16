import { useControls } from "leva";
import type { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events.d.ts";
import { useFilter } from "../../hooks/useFilter.ts";
import { useEffect } from "react";
import { CustomDecal } from "./CustomDecal.tsx";
import { useGLTF } from "@react-three/drei";
import { useDecal } from "../../hooks/useDecal.ts";

export enum Models {
  male = "male",
  female = "female",
}

export function Model() {
  const { nodes } = useGLTF("./src/assets/models/models.glb");

  const controls = useControls("mesh", {
    showMesh: true,
    Models: { options: Models, value: Models.male },
  });

  // Decals
  const decalControls = useControls("decals", {
    scaleFactor: { value: 0.05, min: 0, max: 1, step: 0.01 },
  });

  // Decal
  const {
    isDecalPlacing,
    decalPosition,
    decalRotation,
    decalScale,
    setDecalPosition,
    setDecalScale,
    handlePointerDown,
    handlePointerEnter,
    handlePointerOut,
  } = useDecal({ scaleFactor: decalControls.scaleFactor });

  // Filter
  const { filter, setFilter } = useFilter();

  // Update filter
  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      decal: {
        ...prev.decal,
        scale: decalScale,
        position: decalPosition,
      },
    }));
  }, [setFilter, decalPosition, decalScale]);

  return (
    <>
      {/* model */}
      {controls.showMesh && (
        <mesh
          onPointerEnter={handlePointerEnter}
          onPointerOut={handlePointerOut}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => {handlePointerDown(e)}} // prettier-ignore
          geometry={nodes[controls.Models].geometry}
          material={nodes[controls.Models].material}
        >
          <CustomDecal
            scale={filter.decal.scale}
            position={filter.decal.position}
          />
        </mesh>
      )}
    </>
  );
}
