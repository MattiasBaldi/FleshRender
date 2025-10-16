import React from "react";
import { useDecal } from "../hooks/useDecal.ts";
import { Decal, useTexture, OrbitControls } from "@react-three/drei"; // prettier-ignore
import { useUiStore } from "../stores/useUiStore.ts";
import { useControls } from "leva";
import type { DecalVector } from "../hooks/useDecal.ts";

export type DecalProps = {
  scale?: DecalVector | number;
  rotation?: DecalVector;
  position?: DecalVector;
};

export function CustomDecal(props: DecalProps) {
  const image = useUiStore((state) => state.texture);
  const texture = useTexture(image);

  const controls = useControls("decal", {
    scale: {
      value: { x: 1, y: 1, z: 1 },
      min: 0,
      max: 10,
      step: 0.1,
    },
    rotation: {
      value: { x: 1, y: 1, z: 1 },
      min: 0,
      max: 360,
      step: 10,
    },
    showDecal: true,
    debug: false,
  });

  return (
    <Decal
      scale={props.scale}
      position={[props.position.x, props.position.y, props.position.z]}
      rotation={[controls.rotation.x, controls.rotation.y, controls.rotation.z]}
      debug={controls.debug}
    >
      <meshStandardMaterial
        map={texture}
        transparent={true}
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </Decal>
  );
}
