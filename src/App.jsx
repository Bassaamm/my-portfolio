import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { Leva } from "leva";
import Experenice from "./Experenice";
import Background from "./components/Background";
import { Loader } from "@react-three/drei";
import { isMobile, isTablet } from "react-device-detect";

function App() {
  if (isMobile || isTablet) {
    window.location.href = "http://192.168.100.6:5174";
  }
  return (
    <>
      <Leva />
      <Canvas>
        {/* <ambientLight intensity={1} /> */}
        <Background />
        <Experenice />
        <color attach="background" args={["#000"]} />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
