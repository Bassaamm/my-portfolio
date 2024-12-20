import { Environment, Sphere } from "@react-three/drei";
import { Gradient, Depth, LayerMaterial } from "lamina";
import * as THREE from "three";
export default function Background() {
  return (
    <>
      {/* <Environment preset="studio" />
      <Sphere args={[100, 100, 100]} rotation-y={Math.PI / 2}>
        <LayerMaterial
          lighting="physical"
          transmission={1}
          side={THREE.BackSide}
        >
          <Depth
            colorA="d9d9d9"
            colorB="white"
            alpha={0.5}
            mode="multiply"
            near={0}
            far={2}
            origin={[1, 1, 1]}
          />
        </LayerMaterial>
      </Sphere> */}
    </>
  );
}
