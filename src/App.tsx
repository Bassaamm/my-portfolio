import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import RectAreaLight from "./RectAreaLight";
import { useRef, useState, useEffect } from "react";
import { Tween, Easing } from "@tweenjs/tween.js";

function CameraControls({ targetPosition }) {
  const { camera } = useThree();
  const [currentTween, setCurrentTween] = useState(null);

  useEffect(() => {
    if (targetPosition && camera) {
      if (currentTween) {
        currentTween.stop();
      }

      const tween = new Tween(camera.position)
        .to(targetPosition, 1000)
        .easing(Easing.Quadratic.Out)
        .onUpdate(() => {
          camera.updateProjectionMatrix();
        })
        .start();

      setCurrentTween(tween);
    }
  }, [targetPosition, camera]);

  useFrame(() => {
    if (currentTween) {
      currentTween.update();
    }
  });

  return null;
}

function CameraButtons({
  setTargetPosition,
  mainCamera,
  laptopCamera,
  tvCamera,
}) {
  return (
    <div className="camera-buttons">
      <button onClick={() => setTargetPosition(mainCamera.current.position)}>
        Main Camera
      </button>
      <button onClick={() => setTargetPosition(laptopCamera.current.position)}>
        Laptop Camera
      </button>
      <button onClick={() => setTargetPosition(tvCamera.current.position)}>
        TV Camera
      </button>
    </div>
  );
}

export default function App() {
  const gltf = useGLTF("./models/portifoloScene.glb");
  const mainCamera = useRef(null);
  const laptopCamera = useRef(null);
  const tvCamera = useRef(null);
  const [targetPosition, setTargetPosition] = useState(null);

  useEffect(() => {
    if (mainCamera.current) {
      setTargetPosition(mainCamera.current.position);
    }
  }, [mainCamera]);

  return (
    <>
      <Canvas
        camera={{
          position: [60, 60, 90],
        }}
      >
        <PerspectiveCamera ref={mainCamera} position={[60, 60, 90]} />
        <PerspectiveCamera ref={laptopCamera} position={[10, 10, 10]} />
        <PerspectiveCamera ref={tvCamera} position={[20, 20, 20]} />
        <RectAreaLight
          width={0.8}
          height={0.5}
          intensity={20}
          needHelper={true}
          color={"white"}
          position={[-0.05, 2.09, 3.05]}
          rotation={[-10, -6.8, 0.1]}
        />
        <ambientLight intensity={0.5} />
        <Html
          distanceFactor={2.8}
          wrapperClass="htmlScreen"
          transform
          position={[-46.7, 19.1, 17.66]}
          rotation={[-0.5, -0.15, -0.09]}
        >
          <div className="text-white text-5xl">Hello World</div>
        </Html>
        <group position={[0, 0, 40]}>
          <primitive object={gltf.scene} />
        </group>
        <RectAreaLight
          width={25}
          height={18}
          needHelper={true}
          intensity={30}
          color={"white"}
          position={[-50, 20, -55]}
          rotation={[Math.PI, 0, 0]}
        />
        <OrbitControls />
        <CameraControls targetPosition={targetPosition} />
      </Canvas>
      <CameraButtons
        setTargetPosition={setTargetPosition}
        mainCamera={mainCamera}
        laptopCamera={laptopCamera}
        tvCamera={tvCamera}
      />
    </>
  );
}
