import { useCallback, useEffect, useState } from "react";
import type { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events.d.ts";

export type MousePosition = {
  x: number;
  y: number;
};

export type DecalVector = {
  x: number;
  y: number;
  z: number;
};

export enum CursorStyle {
  pointer = "pointer",
  grabbing = "grabbing",
  auto = "auto",
}

export type UseDecalProps = {
  scaleFactor: number;
};

// Correcting rotation
// const ray
// const normal
// const camera

export function useDecal({ scaleFactor }: UseDecalProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({x: 0, y: 0 }); // prettier-ignore
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>(CursorStyle.auto);
  const [isPointerOver, setIsPointerOver] = useState<boolean>(false);

  // decal
  const [isPlacingDecal, setIsPlacingDecal] = useState<boolean>(false);
  const [decalCenter, setDecalCenter] = useState<number>(0);
  const [decalScale, setDecalScale] = useState<number>(1);
  const [decalPosition, setDecalPosition] = useState<DecalVector>({x: 0, y: 0, z: 0}) // prettier-ignore
  const [decalRotation, setDecalRotation] = useState<DecalVector>({x: 0, y: 0, z: 0}) // prettier-ignore

  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      setDecalCenter(Math.abs(e.clientX) + Math.abs(e.clientY));
      setIsPlacingDecal(true);
      setDecalPosition(e.point);
      if (isPlacingDecal) setDecalRotation(e.ray.direction);
      setCursorStyle(CursorStyle.grabbing);
    },
    [isPlacingDecal]
  );

  const handlePointerEnter = useCallback(() => {
    setIsPointerOver(true);
    if (!isPlacingDecal) setCursorStyle(CursorStyle.pointer);
  }, [isPlacingDecal]);

  const handlePointerOut = useCallback(() => {
    setIsPointerOver(false);
    if (!isPlacingDecal) setCursorStyle(CursorStyle.auto);
  }, [isPlacingDecal]);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsPlacingDecal(false);
      if (isPointerOver) {
        setCursorStyle(CursorStyle.pointer);
      } else {
        setCursorStyle(CursorStyle.auto);
      }
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
  }, [handlePointerOut, handlePointerEnter, isPointerOver]);

  //   Decal Scale
  useEffect(() => {
    if (isPlacingDecal) 
      setDecalScale( Math.abs((mousePosition.x) + Math.abs(mousePosition.y) - decalCenter) * scaleFactor); // prettier-ignore
  }, [isPlacingDecal, mousePosition, decalCenter, scaleFactor]);

  //   Cursor style
  useEffect(() => {
    document.body.style.cursor = cursorStyle;
    return () => { document.body.style.cursor = cursorStyle} // prettier-ignore
  }, [cursorStyle]);

  return {
    isPlacingDecal,
    decalPosition,
    decalRotation,
    decalScale,
    handlePointerDown,
    handlePointerEnter,
    handlePointerOut,
  };
}
