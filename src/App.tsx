import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./Experience.tsx";
import { Ui } from "./Ui.tsx";
import { Environment } from "@react-three/drei";

function ErrorButton() {
  return (
    <button
      className="fixed z-100 top-[50%] bg-red-700 left-[50%] w-fit hover:cursor-pointer p-10 border-1"
      onClick={() => {
        throw new Error("This is your first error!");
      }}
    >
      Break the world
    </button>
  );
}

function App() {
  return (
    <>
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <Experience />
        <Environment preset="city" />
      </Canvas>
      <Ui />

      <ErrorButton />
    </>
  );
}

export default App;
