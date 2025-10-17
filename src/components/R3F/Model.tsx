import { useControls } from "leva";
import type { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events.d.ts";
import { useFilter } from "../../hooks/useFilter.ts";
import { CustomDecal } from "./CustomDecal.tsx";
import { useGLTF } from "@react-three/drei";
import { useDecal } from "../../hooks/useDecal.ts";

export enum Models {
  male = "male",
  female = "female",
}

export function Model() {
  // Model
  const { nodes } = useGLTF("./src/assets/models/models.glb");
  const controls = useControls("mesh", {
    showMesh: true,
    Models: { options: Models, value: Models.male },
  });

  // Filter
  const { filter, setFilter } = useFilter();
  const { handlePointerDown, handlePointerEnter, handlePointerOut } = useDecal({filter, setFilter}); // prettier-ignore

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
          {filter.decals &&
            filter.decals.map((decal) => (
              <CustomDecal
                key={decal.id}
                scale={decal.scale}
                position={decal.position}
              />
            ))}
        </mesh>
      )}
    </>
  );
}
