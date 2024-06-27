import { useFrame, useThree } from "@react-three/fiber";

export default function CameraController({
  targetPosition,
  targetRotation,
  controlsRef,
}: any) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.lerp(targetPosition, 0.1);
    camera.rotation.x += (targetRotation.x - camera.rotation.x) * 0.1;
    camera.rotation.y += (targetRotation.y - camera.rotation.y) * 0.1;
    camera.rotation.z += (targetRotation.z - camera.rotation.z) * 0.1;
    camera.updateProjectionMatrix();
  });
  return null;
}
