import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default function RectAreaLightWithHelper() {
  const lightRef = useRef<any>();

  //   useHelper(lightRef, RectAreaLightHelper, "#fff"); // Adds the helper to the light

  return (
    <rectAreaLight
      ref={lightRef}
      width={4.2}
      height={2.2}
      intensity={40}
      color={"white"}
      position={[-0.2, 2.2, -5.8]}
      rotation-x={Math.PI}
    />
  );
}
