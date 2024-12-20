import { useControls } from "leva";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { Model } from "../My-prot-model";
import { PointLightHelper } from "three";

const Light = () => {
  const ref = useRef();
  useHelper(ref, PointLightHelper, 0.1);

  const c = useControls("pointLight", {
    poisitionX: { value: 0.22, step: 0.01 },
    poisitionY: { value: 1.3, step: 0.1 },
    poisitionZ: { value: 1.45, step: 0.1 },
  });

  return (
    <pointLight
      ref={ref}
      args={[`white`, 0, 0]}
      position={[c.poisitionX, c.poisitionY, c.poisitionZ]}
      intensity={5}
    />
  );
};

export default function Experenice() {
  const c = useControls("camera", {
    poisitionX: { value: 1.8, step: 0.01 },
    poisitionY: { value: 1.2, step: 0.1 },
    poisitionZ: { value: 1.2, step: 0.1 },
    rotationX: { value: -0.95, step: 0.1 },
    rotationY: { value: 1.5, step: 0.1 },
    rotationZ: { value: 0.97, step: 0.1 },
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
      <PerspectiveCamera ref={cameraRef} />
    </>
  );
}
