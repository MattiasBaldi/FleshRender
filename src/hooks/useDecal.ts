import { useState, useEffect, useCallback } from "react";
import { type NuqsFilter } from "./useFilter";
import { type ThreeEvent } from "@react-three/fiber";

export type PointerPosition = {
  x: number;
  y: number;
};

export enum CursorStyle {
  pointer = "pointer",
  grabbing = "grabbing",
  auto = "auto",
}

export type UseDecalProps = {
  filter: NuqsFilter;
  setFilter: (filter: NuqsFilter | ((prev: NuqsFilter) => NuqsFilter)) => void;
};

export function useDecal({ filter, setFilter }: UseDecalProps) {
  // cursor
  const [pointerPosition, setPointerPosition] = useState<PointerPosition>({x: 0, y: 0 }); // prettier-ignore
  const [decalOrigin, setDecalOrigin] = useState<PointerPosition>({ x: 0, y: 0 }); // prettier-ignore
  const [isPointerOver, setIsPointerOver] = useState<boolean>(false);

  // cursor styling
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>(CursorStyle.auto);

  // All logic happens here
  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      setFilter((prev) => ({
        ...prev,
        isDecalPlacing: true,
        decals: prev.decals.map((decal, i) =>
          i === Number(prev.activeDecal)
            ? { ...decal, position: e.point, rotation: e.normal }
            : decal
        ),
      }));
      setCursorStyle(CursorStyle.grabbing);
      setDecalOrigin({ x: Math.abs(e.clientX), y: Math.abs(e.clientY) });
    },
    [setCursorStyle, setFilter]
  );

  // Change isDecalPlacing
  const handlePointerEnter = useCallback(() => {
    setIsPointerOver(true);
    if (!filter.isDecalPlacing) setCursorStyle(CursorStyle.pointer);
  }, [filter.isDecalPlacing]);

  // Change isDecalPlacing
  const handlePointerOut = useCallback(() => {
    setIsPointerOver(false);
    if (!filter.isDecalPlacing) setCursorStyle(CursorStyle.auto);
  }, [filter.isDecalPlacing]);

  // Event Listener
  const handlePointerUp = useCallback(() => {
    setFilter((prev) => ({ ...prev, isDecalPlacing: false }));
    if (isPointerOver) {
      setCursorStyle(CursorStyle.pointer);
    } else {
      setCursorStyle(CursorStyle.auto);
    }
  }, [isPointerOver, setFilter, setCursorStyle]);

  // Event Listener
  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (filter.isDecalPlacing)
        setPointerPosition({ x: e.clientX, y: e.clientY });
    },
    [filter.isDecalPlacing, setPointerPosition]
  );

  // Attach eventListeners
  useEffect(() => {
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("mousemove", handlePointerMove);

    return () => {
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, [handlePointerUp, handlePointerMove]);

  // Cursor style
  useEffect(() => {
    document.body.style.cursor = cursorStyle;
    return () => { document.body.style.cursor = cursorStyle} // prettier-ignore
  }, [cursorStyle]);

  // Scale decal
  useEffect(() => {
    if (!filter.isDecalPlacing) return;
    setFilter((prev) => {
      const activeIdx = Number(prev.activeDecal);
      return {
        ...prev,
        decals: prev.decals.map((decal, i) =>
          i === activeIdx
            ? {
                ...decal,
                scale: // prettier-ignore
                  (Math.abs(pointerPosition.x) + Math.abs(pointerPosition.y) 
                  - (decalOrigin.x + decalOrigin.y)) 
                  * prev.scaleFactor,
              }
            : decal
        ),
      };
    });
  }, [setFilter, pointerPosition, filter.isDecalPlacing, decalOrigin]);

  useEffect(() => {
    console.log(filter.isDecalPlacing);
  }, [filter]);

  return { handlePointerDown, handlePointerEnter, handlePointerOut };
}
