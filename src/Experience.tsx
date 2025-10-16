import { OrbitControls } from "@react-three/drei"; // prettier-ignore
import { useControls } from "leva";
import { useDecal } from "./hooks/useDecal.ts";
import type { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events.d.ts";
import DebugLaser from "./components/DebugLaser.tsx";
import { useFilter } from "./hooks/useFilter.ts";
import { useEffect } from "react";
import { CustomDecal } from "./components/CustomDecal.tsx";
import { useDebugLaser } from "./hooks/useDebugLaser.ts";
import { useGLTF } from "@react-three/drei";

enum Primitives {
  Cube,
  Sphere,
  Cylinder,
  Cone,
  Torus,
  Plane,
  Dodecahedron,
  Icosahedron,
  Octahedron,
  Tetrahedron,
  Capsule,
}

const geometryMap = {
  [Primitives.Cube]: <boxGeometry />,
  [Primitives.Sphere]: <sphereGeometry />,
  [Primitives.Cylinder]: <cylinderGeometry />,
  [Primitives.Cone]: <coneGeometry />,
  [Primitives.Torus]: <torusGeometry />,
  [Primitives.Plane]: <planeGeometry />,
  [Primitives.Dodecahedron]: <dodecahedronGeometry />,
  [Primitives.Icosahedron]: <icosahedronGeometry />,
  [Primitives.Octahedron]: <octahedronGeometry />,
  [Primitives.Tetrahedron]: <tetrahedronGeometry />,
  [Primitives.Capsule]: <capsuleGeometry />,
};

export default function Experience() {
  //  Controls
  const controls = useControls("mesh", {
    scaleFactor: { value: 0.05, min: 0, max: 1, step: 0.01 },
    showMesh: true,
    Primitives: { options: Primitives, value: Primitives.Cube },
  });

  // Decal
  const {
    isPlacingDecal,
    decalPosition,
    decalRotation,
    decalScale,
    setDecalPosition,
    setDecalScale,
    handlePointerDown,
    handlePointerEnter,
    handlePointerOut,
  } = useDecal({ scaleFactor: controls.scaleFactor });

  // Debug laser
  const {rayOrigin, setRayOrigin, rayDirection, setRayDirection} = useDebugLaser() // prettier-ignore

  // Filter
  const { filter, setFilter } = useFilter();

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
      {isPlacingDecal ? (
        <DebugLaser
          rayOrigin={[rayOrigin.x, rayOrigin.y, rayOrigin.z]}
          rayDirection={[rayDirection.x, rayDirection.y, rayDirection.z]}
        />
      ) : (
        <OrbitControls />
      )}

      {controls.showMesh ? (
        <mesh
          onPointerEnter={handlePointerEnter}
          onPointerOut={handlePointerOut}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => {
          handlePointerDown(e);
          setRayDirection(e.ray.direction);
          setRayOrigin(e.ray.origin);
      }} /* prettier-ignore */
        >
          {geometryMap[controls.Primitives as Primitives]}
          <meshBasicMaterial />
          <CustomDecal
            scale={filter.decal.scale}
            position={filter.decal.position}
          />
        </mesh>
      ) : null}
    </>
  );
}
