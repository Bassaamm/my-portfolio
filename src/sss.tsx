import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

function RectAreaLightWithHelper() {
  const lightRef = useRef<any>();

  useHelper(lightRef, RectAreaLightHelper, 0x00ff00); // Adds the helper to the light

  return (
    <rectAreaLight
      ref={lightRef}
      width={5}
      height={5}
      intensity={2}
      color={"white"}
      position={[0, 5, 0]}
    />
  );
}
