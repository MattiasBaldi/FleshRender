import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./Experience.tsx";

function App() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <Experience />
    </Canvas>
  );
}

export default App;
