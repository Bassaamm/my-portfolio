import { monitor, useControls } from "leva";
import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, PerspectiveCamera, useHelper } from "@react-three/drei";
import { Model } from "../My-prot-model2";
import { Table } from "./components/models/Table";
import { Kayn } from "./components/models/Kayn";
import { Lamp } from "./components/models/Lamp";
import { Notepad } from "./components/models/Note";
import { Linkedin } from "./components/models/Linkedin";
import { Github } from "./components/models/Github";
import Background from "./components/Background";
import { Monitor } from "./components/models/Monitor";
import { Chair } from "./components/models/Chair";
import { Plant } from "./components/models/Plant";
import { useSpring, animated, config } from "@react-spring/three";
import { Euler, Quaternion, Vector3 } from "three";
import { CameraHelper } from "three";
import { motion } from "motion/react";
import "./App.css";

const Light = ({ intensity = 1 }) => {
  const light = useRef();
  const c = useControls("pointLight", {
    poisitionX: { value: 0.22, step: 0.01 },
    poisitionY: { value: 1.3, step: 0.1 },
    poisitionZ: { value: 1.45, step: 0.1 },
  });

  return (
    <pointLight
      ref={light}
      args={[`white`, 0, 0]}
      position={[c.poisitionX, c.poisitionY, c.poisitionZ]}
      intensity={intensity}
    />
  );
};

export default function Experenice() {
  const c = useControls("camera", {
    poisitionX: { value: 1.41, step: 0.01 },
    poisitionY: { value: 1.1, step: 0.01 },
    poisitionZ: { value: 1.4, step: 0.01 },
    rotationX: { value: -0.8, step: 0.01 },
    rotationY: { value: 1.3, step: 0.01 },
    rotationZ: { value: 0.8, step: 0.01 },
  });
  const cameraRef = useRef();
  const [isMonitorClicked, setIsMonitorClicked] = useState(false);
  const monitor = useControls("monitor", {
    poisitionX: { value: 0.09, step: 0.001 },
    poisitionY: { value: 0.99, step: 0.001 },
    poisitionZ: { value: 0.59, step: 0.001 },
  });
  // useFrame(() => {
  //   if (cameraRef.current) {
  //     if (isMonitorClicked) {
  //       // Interpolate position
  //       cameraRef.current.position.lerp({ x: 0.4, y: 0.97, z: 0.6 }, 0.02);

  //       // Set rotation using Euler angles
  //       const targetRotation = new Euler(-0.81, 1.56, 0.8); // Your desired rotation
  //       cameraRef.current.quaternion.slerp(
  //         new Quaternion().setFromEuler(targetRotation),
  //         0.1 // Interpolation factor
  //       );
  //     }
  //   }
  // });
  // useHelper(cameraRef, CameraHelper);

  const handleMonitorClick = () => {
    setIsMonitorClicked((prev) => !prev);
    console.log("Monitor clicked:", isMonitorClicked);
  };
  console.log(isMonitorClicked);
  return (
    <>
      <Table />
      <Kayn />
      <Light intensity={isMonitorClicked === true ? 5 : 2} />
      <Lamp />
      <Linkedin />
      <Github />
      <Notepad />
      <Monitor onClick={handleMonitorClick} />
      <Chair />
      {isMonitorClicked ? (
        <Html
          transform
          position={[
            monitor.poisitionX,
            monitor.poisitionY,
            monitor.poisitionZ,
          ]}
          rotation={[0, Math.PI / 2, 0]}
          wrapperClass="htmlScreen"
          distanceFactor={1.17}
        >
          <main onClick={handleMonitorClick}>
            <div>Hello wrold !</div>
          </main>
        </Html>
      ) : (
        <Html
          transform
          position={[
            monitor.poisitionX,
            monitor.poisitionY,
            monitor.poisitionZ,
          ]}
          rotation={[0, Math.PI / 2, 0]}
          wrapperClass="htmlOffScreen"
          distanceFactor={1.17}
        >
          <main onClick={handleMonitorClick}>
            <div>
              <motion.div
                animate={{ rotate: 360, transition: { duration: 1 } }}
              >
                Click me to run
              </motion.div>
            </div>
          </main>
        </Html>
      )}
      <Plant />
      <AnimatedCamera isMonitorClicked={isMonitorClicked} />

      <PerspectiveCamera
        makeDefault
        position={[c.poisitionX, c.poisitionY, c.poisitionZ]}
        rotation={[1, 2, 3]}
        fov={75}
      />
    </>
  );
}

const AnimatedCamera = ({ isMonitorClicked }) => {
  const { camera, gl } = useThree();

  const { position, rotation } = useSpring({
    position: isMonitorClicked ? [0.4, 0.97, 0.6] : [1.41, 1.1, 1.4],
    rotation: isMonitorClicked ? [-0.81, 1.56, 0.8] : [-0.8, 1.3, 0.8],
    config: config.molasses,
  });

  useFrame(() => {
    camera.position.set(...position.get());
    camera.quaternion.setFromEuler(new Euler(...rotation.get()));
  });

  return null;
};
