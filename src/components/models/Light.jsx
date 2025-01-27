import { useControls } from "leva";

export function Light({ intensity = 1, position }) {
  const c = useControls("pointLight", {
    poisitionX: { value: position[0], step: 0.01 },
    poisitionY: { value: position[1], step: 0.1 },
    poisitionZ: { value: position[2], step: 0.1 },
  });

  return (
    <pointLight
      args={[`white`, 0, 0]}
      position={position}
      intensity={intensity}
    />
  );
}
