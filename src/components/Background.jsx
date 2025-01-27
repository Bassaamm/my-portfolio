import { Environment } from "@react-three/drei";
export default function Background() {
  return (
    <>
      <Environment preset="sunset" resolution={64} />
    </>
  );
}
