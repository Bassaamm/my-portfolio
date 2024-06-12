import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const gltf = useGLTF("/Couch.glb");
  const aoMap = useLoader(
    THREE.TextureLoader,
    "/textures/Fabric035_2K_AmbientOcclusion.jpg"
  );
  const colorMap = useLoader(
    THREE.TextureLoader,
    "/textures/Fabric035_2K_Color.jpg"
  );
  const displacementMap = useLoader(
    THREE.TextureLoader,
    "/textures/Fabric035_2K_Displacement.jpg"
  );
  const normalMap = useLoader(
    THREE.TextureLoader,
    "/textures/Fabric035_2K_Normal.jpg"
  );
  const roughnessMap = useLoader(
    THREE.TextureLoader,
    "/textures/Fabric035_2K_Roughness.jpg"
  );

  gltf.scene.traverse((o) => {
    console.log(o);
    if (o.name === "Cube010_1")
      // @ts-ignore
      o.material.map = useLoader(
        THREE.TextureLoader,
        "/textures/Fabric_013_Base_Color.jpg"
      );
    if (o.name === "Cube010_2")
      // @ts-ignore
      o.material.map = useLoader(
        THREE.TextureLoader,
        "/textures/Fabric040_2K_Color.jpg"
      );
    if (o.name === "Cube010_3")
      // @ts-ignore
      o.material.map = useLoader(
        THREE.TextureLoader,
        "/textures/Fabric038_2K_Color.jpg"
      );
    if (o.name === "Cube010_4")
      // @ts-ignore
      o.material.map = useLoader(
        THREE.TextureLoader,
        "/textures/Fabric035_2K_Color.jpg"
      );
    // @ts-ignore
    if (o.isMesh) {
      // @ts-ignore
      o.material.aoMap = aoMap;
      // @ts-ignore
      // o.material.map = colorMap;
      // @ts-ignore
      // o.material.displacementMap = displacementMap;
      // @ts-ignore
      o.material.normalMap = normalMap;
      // @ts-ignore
      o.material.roughnessMap = roughnessMap;
    }
  });

  return <primitive object={gltf.scene} />;
}

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.4} />
      <directionalLight intensity={1} position={[0, 0, 5]} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
