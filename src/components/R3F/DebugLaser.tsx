import { useMemo } from "react";
import * as THREE from "three";

type Props = {
  rayOrigin: [number, number, number];
  rayDirection: [number, number, number];
  point?: [number, number, number];
};

export default function DebugLaser(props: Props) {
  console.log("laser!", props);

  const quaternion = useMemo(() => {
    const dir = new THREE.Vector3(...props.rayDirection).normalize();
    const up = new THREE.Vector3(0, 1, 0); // Cylinder default
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
    return q;
  }, [props.rayDirection]);

  return (
    <>
      <mesh
        position={props.rayOrigin}
        quaternion={[quaternion.x, quaternion.y, quaternion.z, quaternion.w]}
        // scale={camera.position.length() * 2}
        scale={[0.05, 10, 0.05]} // Thin, long cylinder
      >
        <cylinderGeometry />
        <meshBasicMaterial color="red" />
      </mesh>

      {props.point ? (
        <mesh>
          <sphereGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
      ) : null}
    </>
  );
}
