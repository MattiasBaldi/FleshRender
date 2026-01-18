import { useControls } from "leva";
import type { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events.d.ts";
import { useFilter } from "../../hooks/useFilter.ts";
import { CustomDecal } from "./CustomDecal.tsx";
import { useGLTF } from "@react-three/drei";
import { useDecal } from "../../hooks/useDecal.ts";
import * as THREE from "three";

export const enum Models {
  MaleLocomotion = "male_locomotion",
  MaleDynamic = "male_dynamic",
  MaleRest = "male_rest",
  FemaleLocomotion = "female_locomotion",
  FemaleDynamic = "female_dynamic",
  FemaleRest = "female_rest",
}

export function Model() {
  const controls = useControls(
    "mesh",
    {
      showMesh: true,
      scale: { value: 1, min: 0.1, max: 10, step: 0.1 },
      receieveShadow: true,
      castShadow: true,
      models: { options: Models, value: Models.MaleRest },
    },
    { collapsed: false }
  );

  // Model
  const model  = useGLTF(`./src/assets/models/${controls.models}.glb`); // prettier-ignore
  const mesh = model.scene.getObjectByName(controls.models) as THREE.SkinnedMesh; // prettier-ignore

  // Filter
  const { filter, setFilter } = useFilter();
  const { handlePointerDown, handlePointerEnter, handlePointerOut } = useDecal({filter, setFilter}); // prettier-ignore

  return (
    <>
      {/* model */}
      {controls.showMesh && (
        <group>
          <mesh
            rotation={[(90 * Math.PI) / 180, 0, 0]}
            scale={controls.scale}
            receiveShadow={controls.receieveShadow}
            castShadow={controls.castShadow}
            onPointerEnter={handlePointerEnter}
            onPointerOut={handlePointerOut}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {handlePointerDown(e)}} // prettier-ignore
            geometry={mesh.geometry}
            material={mesh.material}
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
        </group>
      )}
    </>
  );
}
