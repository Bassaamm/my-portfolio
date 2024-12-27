import { useControls } from "leva";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { Model } from "../My-prot-model2";

const Light = () => {
  const c = useControls("pointLight", {
    poisitionX: { value: 0.22, step: 0.01 },
    poisitionY: { value: 1.3, step: 0.1 },
    poisitionZ: { value: 1.45, step: 0.1 },
  });

  return (
    <pointLight
      args={[`white`, 0, 0]}
      position={[c.poisitionX, c.poisitionY, c.poisitionZ]}
      intensity={5}
    />
  );
};

export default function Experenice() {
  const c = useControls("camera", {
    poisitionX: { value: 1.84, step: 0.01 },
    poisitionY: { value: 1.3, step: 0.1 },
    poisitionZ: { value: 1.5, step: 0.1 },
    rotationX: { value: -0.8, step: 0.1 },
    rotationY: { value: 1.4, step: 0.1 },
    rotationZ: { value: 0.8, step: 0.1 },
  });
  const cameraRef = useRef();
  const modelRef = useRef();

  console.log(modelRef);

  useFrame(() => {
    cameraRef.current.position.set(c.poisitionX, c.poisitionY, c.poisitionZ);
    cameraRef.current.rotation.set(c.rotationX, c.rotationY, c.rotationZ);
  });

  return (
    <>
      <Model ref={modelRef} />
      <Light />
      <PerspectiveCamera makeDefault ref={cameraRef} />
    </>
  );
}
