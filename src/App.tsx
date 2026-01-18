import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import { Ui } from "./components/UI/Ui.tsx";
import { Perf } from "r3f-perf";
import { Leva } from "leva";
import { useState } from "react";

function App() {
  const [background, setBackground] = useState<string>("grey");

  return (
    <>
      <Canvas
        shadows
        className="webgl"
        gl={{ preserveDrawingBuffer: true }}
        style={{
          width: "100vw",
          height: "100vh",
          background: background,
        }}
      >
        <Experience setBackground={setBackground} />
        <Perf position="bottom-right" />
      </Canvas>
      <Ui />
      <Leva collapsed={true} />
    </>
  );
}

export default App;
