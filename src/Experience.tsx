import { Decal, useTexture, OrbitControls } from "@react-three/drei"; // prettier-ignore
import { useControls } from "leva";
import { useDecal } from "./hooks/useDecal.ts";
import { useTextureStore } from "./stores/useTextureStore.ts";
import type { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events.d.ts";

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
  const image = useTextureStore((state) => state.texture);
  const texture = useTexture(image);

  //  Decal stuff
  const controls = useControls("decal", {
    scale: {
      value: { x: 1, y: 2, z: 3 },
      min: 0,
      max: 10,
      step: 0.1,
    },
    scaleFactor: { value: 0.05, min: 0, max: 1, step: 0.01 },
    show: true,
    debug: false,
    Primitives: { options: Primitives, value: Primitives.Cube },
  });

  const {
    isPlacingDecal,
    decalPosition,
    decalRotation,
    decalScale,
    handlePointerDown,
    handlePointerEnter,
    handlePointerOut,
  } = useDecal({ scaleFactor: controls.scaleFactor });

  return (
    <>
      {!isPlacingDecal ? <OrbitControls /> : null}
      <mesh
        onPointerEnter={handlePointerEnter}
        onPointerOut={handlePointerOut}
        onPointerDown={(e: ThreeEvent<PointerEvent>) => handlePointerDown(e)} /* prettier-ignore */
      >
        {geometryMap[controls.Primitives as Primitives]}
        <meshBasicMaterial />

        {isPlacingDecal || controls.show ? (
          <Decal
            scale={decalScale}
            position={[decalPosition.x, decalPosition.y, decalPosition.z]}
            rotation={[decalRotation.x, decalRotation.y, decalRotation.z]}
            debug={controls.debug}
          >
            <meshStandardMaterial
              map={texture}
              transparent={true}
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </Decal>
        ) : null}
      </mesh>
    </>
  );
}
