import { OrbitControls } from "@react-three/drei"; // prettier-ignore
import { Model } from "./components/R3F/Model.tsx";
import { Suspense } from "react";
import { ModelFallback } from "./components/R3F/ModelFallback.tsx";
import { useFilter } from "./hooks/useFilter.ts";
import { PostProcessing } from "./components/R3F/PostProcessing.tsx";
import { Stage } from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  const { filter } = useFilter();

  const controls = useControls("Stage", {
    shadowType: { value: "contact", options: ["contact", "accumulative"] },
    shadowOpacity: { value: 0.6, min: 0, max: 1 },
    shadowBlur: { value: 3, min: 0, max: 10 },
    environment: {
      value: "sunset",
      options: ["sunset", "studio", "city", "dawn", "night", "forest"],
    },
    intensity: { value: 2, min: 0, max: 10 },
    preset: {
      value: "rembrandt",
      options: ["soft", "rembrandt", "portrait", "upfront"],
    },
    adjustCamera: { value: 1, min: 0, max: 10 },
    colorBlend: { value: 2, min: 0, max: 10 },
    color: { value: "grey" },
  });

  return (
    <>
      {!filter.isDecalPlacing && <OrbitControls />}

      {/* <Environment
        preset="studio"
        backgroundBlurriness={10}
        environmentIntensity={0.8}
      /> */}
      <PostProcessing />
      {/* <LightsAndShadows /> */}

      <Stage
        shadows={{
          type: controls.shadowType,
          opacity: controls.shadowOpacity,
          blur: controls.shadowBlur,
          colorBlend: controls.colorBlend,
          color: controls.color,
        }}
        adjustCamera={controls.adjustCamera}
        environment={controls.environment}
        intensity={controls.intensity}
        preset={controls.preset}
      >
        <Suspense fallback={<ModelFallback />}>
          <Model />
        </Suspense>
      </Stage>
    </>
  );
}
