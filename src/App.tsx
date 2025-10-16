import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import { Ui } from "./components/UI/Ui.tsx";
import { Environment } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas
        className="webgl"
        gl={{ preserveDrawingBuffer: true }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Experience />
        <Environment preset="city" />
      </Canvas>
      <Ui />
    </>
  );
}

export default App;
