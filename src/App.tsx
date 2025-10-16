import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import { Ui } from "./components/UI/Ui.tsx";

function App() {
  return (
    <>
      <Canvas
        className="webgl"
        gl={{ preserveDrawingBuffer: true }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Experience />
      </Canvas>
      <Ui />
    </>
  );
}

export default App;
