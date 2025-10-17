import { OrbitControls } from "@react-three/drei"; // prettier-ignore
import { Environment } from "@react-three/drei";
import { Model } from "./components/R3F/Model.tsx";
import { useDecalsStore } from "./stores/useDecalsStore.ts";
import { Suspense } from "react";
import { ModelFallback } from "./components/R3F/ModelFallback.tsx";
import { useFilter } from "./hooks/useFilter.ts";

export default function Experience() {
  const isDecalPlacing = useDecalsStore((state) => state.isDecalPlacing);

  const { filter, setFilter } = useFilter();

  return (
    <>
      <Environment preset="city" />
      {!filter.isDecalPlacing && <OrbitControls />}

      <Suspense fallback={<ModelFallback />}>
        <Model />
      </Suspense>
    </>
  );
}
