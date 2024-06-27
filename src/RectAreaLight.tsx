import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

interface RectAreaLightProps {
  width: number;
  height: number;
  intensity: number;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  needHelper?: boolean;
  lookAt?: [number, number, number];
}

export default function RectAreaLight({
  width,
  height,
  intensity,
  color,
  position,
  rotation,
  lookAt = [0, 0, 0],
  needHelper = false,
}: RectAreaLightProps) {
  const lightRef = useRef<any>();
  if (needHelper) useHelper(lightRef, RectAreaLightHelper, color);
  lightRef.current?.lookAt(...lookAt);
  return (
    <rectAreaLight
      ref={lightRef}
      width={width}
      height={height}
      intensity={intensity}
      color={color}
      position={position}
      rotation={rotation}
    />
  );
}
