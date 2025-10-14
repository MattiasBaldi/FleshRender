import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./Experience.tsx";
import { Ui } from "./Ui.tsx";
import { Environment } from "@react-three/drei";

function ErrorButton({
  errorMessage,
  top,
}: {
  errorMessage: string;
  top: string;
}) {
  return (
    <button
      className="fixed z-100 bg-red-700 left-[50%] w-fit hover:cursor-pointer p-10 border-1"
      style={{ top: `${top}px` }}
      onClick={() => {
        throw new Error(errorMessage);
      }}
    >
      {errorMessage}
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

      <ErrorButton
        errorMessage="this is not being blocked by browsers"
        top="50"
      />
      <ErrorButton
        errorMessage="this is not being blocked by cloudflare"
        top="75"
      />
    </>
  );
}

export default App;
