import { OrbitControls } from "@react-three/drei"; // prettier-ignore
import { Environment } from "@react-three/drei";
import { Model } from "./components/R3F/Model.tsx";
import { useDecalsStore } from "./stores/useDecalsStore.ts";
import { Suspense } from "react";
import { ModelFallback } from "./components/R3F/ModelFallback.tsx";
import { useFilter } from "./hooks/useFilter.ts";
import { LightsAndShadows } from "./components/R3F/LightsAndShadows.tsx";
import { PostProcessing } from "./components/R3F/PostProcessing.tsx";

export default function Experience() {
  const isDecalPlacing = useDecalsStore((state) => state.isDecalPlacing);

  return (
    <>
      {!isDecalPlacing && <OrbitControls />}
      <Environment preset="city" backgroundBlurriness={10} />
      {/* <PostProcessing /> */}

      <group>
        <LightsAndShadows />
        <Suspense fallback={<ModelFallback />}>
          <Model />
        </Suspense>
      </group>
    </>
  );
}
