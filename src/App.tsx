import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import RectAreaLightWithHelper from "./RectAreaLightWithHelper";
export default function App() {
  const gltf = useGLTF("./models/portifoloScene.glb");
  const rectLightRef = useRef<any>();

  return (
    <Canvas
      camera={{
        position: [15, 9, 25],
        fov: 40,
      }}
    >
      <ambientLight intensity={0.5} />
      <primitive object={gltf.scene} />
      <RectAreaLightWithHelper />
      <OrbitControls />
    </Canvas>
  );
}
