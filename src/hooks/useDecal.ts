import { useCallback, useEffect, useState } from "react";
import type { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events.d.ts";
import { useFilter } from "./useFilter";

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
  const { filter } = useFilter();

  const [mousePosition, setMousePosition] = useState<MousePosition>({x: 0, y: 0 }); // prettier-ignore
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>(CursorStyle.auto);
  const [isPointerOver, setIsPointerOver] = useState<boolean>(false);

  // decal
  const [isDecalPlacing, setIsDecalPlacing] = useState<boolean>(false);
  const [decalCenter, setDecalCenter] = useState<number>(0);
  const [decalScale, setDecalScale] = useState<number>(filter.decal.scale);
  const [decalPosition, setDecalPosition] = useState<DecalVector>(filter.decal.position) // prettier-ignore
  const [decalRotation, setDecalRotation] = useState<DecalVector>({x: 0, y: 0, z: 0}) // prettier-ignore

  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      console.log("object", e);
      setDecalCenter(Math.abs(e.clientX) + Math.abs(e.clientY));
      setIsDecalPlacing(true);
      setDecalPosition(e.point);
      if (isDecalPlacing && e.normal) setDecalRotation(e.normal);

      setCursorStyle(CursorStyle.grabbing);
    },
    [isDecalPlacing]
  );

  const handlePointerEnter = useCallback(() => {
    setIsPointerOver(true);
    if (!isDecalPlacing) setCursorStyle(CursorStyle.pointer);
  }, [isDecalPlacing]);

  const handlePointerOut = useCallback(() => {
    setIsPointerOver(false);
    if (!isDecalPlacing) setCursorStyle(CursorStyle.auto);
  }, [isDecalPlacing]);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDecalPlacing(false);
      if (isPointerOver) {
        setCursorStyle(CursorStyle.pointer);
      } else {
        setCursorStyle(CursorStyle.auto);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDecalPlacing) setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDecalPlacing, handlePointerOut, handlePointerEnter, isPointerOver]);

  //   Decal Scale
  useEffect(() => {
    if (isDecalPlacing) 
      setDecalScale( Math.abs((mousePosition.x) + Math.abs(mousePosition.y) - decalCenter) * scaleFactor); // prettier-ignore
  }, [isDecalPlacing, mousePosition, decalCenter, scaleFactor]);

  //   Cursor style
  useEffect(() => {
    document.body.style.cursor = cursorStyle;
    return () => { document.body.style.cursor = cursorStyle} // prettier-ignore
  }, [cursorStyle]);

  return {
    isDecalPlacing,
    decalPosition,
    decalRotation,
    decalScale,
    setDecalScale,
    setDecalPosition,
    handlePointerDown,
    handlePointerEnter,
    handlePointerOut,
  };
}
