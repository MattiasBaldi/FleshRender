import { ToneMappingMode, KernelSize } from "postprocessing";
import {
  ToneMapping,
  EffectComposer,
  Bloom,
  Autofocus,
} from "@react-three/postprocessing";
import { useControls } from "leva";

export function PostProcessing() {
  const controls = useControls("postprocessing", {
    ToneMapping: {
      options: ToneMappingMode,
      value: ToneMappingMode.ACES_FILMIC,
    },
  });

  return (
    <EffectComposer>
      {/* <Bloom></Bloom> */}

      <ToneMapping mode={controls.ToneMapping} />
    </EffectComposer>
  );
}
