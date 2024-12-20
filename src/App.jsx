import { Canvas, useThree, useFrame } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Leva, useControls } from "leva";
import Experenice from "./Experenice";
import Background from "./components/Background";

function App() {
  return (
    <>
      <Leva />
      <Canvas>
        {/* <ambientLight intensity={3} /> */}
        {/* <pointLight position={[10, 10, 10]} intensity={1000} /> */}
        <OrbitControls />
        <Background />
        <Experenice />
        <color attach="background" args={["#000"]} />
      </Canvas>
    </>
  );
}

export default App;
