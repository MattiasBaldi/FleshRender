import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import { Ui } from "./components/UI/Ui.tsx";
import { Perf } from "r3f-perf";
import { Leva } from "leva";

function App() {
  return (
    <>
      <Canvas
        shadows
        className="webgl"
        gl={{ preserveDrawingBuffer: true }}
        style={{
          width: "100vw",
          height: "100vh",
          background: "grey",
        }}
      >
        <Experience />
        <Perf position="bottom-right" />
      </Canvas>
      {/* <Ui /> */}
      <Leva collapsed={true} />
    </>
  );
}

export default App;
