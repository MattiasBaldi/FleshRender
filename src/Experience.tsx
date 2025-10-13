import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  useTexture,
  Text,
  RenderTexture,
  OrbitControls,
} from "@react-three/drei";
import { useControls } from "leva";

const exampleTexture =
  "https://threejs.org/examples/textures/uv_grid_opengl.jpg";

export default function Experience() {
  const controls = useControls({
    scale: { value: 1, min: 0, max: 100, step: 0.01 },
    position: { value: [0, 0, 0], min: -5, max: 5, step: 0.01 },
    rotation: { value: [0, 0, 0], min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  const texture = useTexture(exampleTexture);
  const decalMesh = useRef(null);

  console.log(decalMesh);

  type MousePosition = {
    x: number;
    y: number;
  };

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const [isPlacingDecal, setIsPlacingDecal] = useState<boolean>(false);
  const [decalCenter, setDecalCenter] = useState<number>(0);
  const [decalScale, setDecalScale] = useState<number>(1);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsPlacingDecal(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isPlacingDecal) {
      document.body.style.cursor = "grabbing";
      setDecalScale(
        Math.abs(mousePosition.x) + Math.abs(mousePosition.y) - decalCenter
      );
      console.log(isPlacingDecal);
      console.log(decalScale);
      console.log(mousePosition);
    }
    if (!isPlacingDecal) document.body.style.cursor = "auto";
  }, [isPlacingDecal, decalScale, mousePosition, decalCenter]);

  return (
    <>
      {!isPlacingDecal ? <OrbitControls /> : null}
      <mesh
        ref={decalMesh}
        onPointerOver={() => {
          console.log("Hovered!");
          document.body.style.cursor = "pointer";
        }}
        onPointerDown={(e: React.PointerEvent) => {
          setDecalCenter(Math.abs(e.clientX) + Math.abs(e.clientY));
          setIsPlacingDecal(true);
        }}
        onPointerUp={() => setIsPlacingDecal(false)}
      >
        <sphereGeometry />
        <meshBasicMaterial />

        {isPlacingDecal ? (
          <Decal
            scale={decalScale}
            position={controls.position}
            rotation={controls.rotation}
            debug
          >
            <meshBasicMaterial
              map={texture}
              polygonOffset
              polygonOffsetFactor={-1} // The material should take precedence over the original
            />
          </Decal>
        ) : null}
      </mesh>
    </>
  );
}
