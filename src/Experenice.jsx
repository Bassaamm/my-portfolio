import { useControls } from "leva";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Table } from "./components/models/Table";
import { Kayn } from "./components/models/Kayn";
import { Lamp } from "./components/models/Lamp";
import { Notepad } from "./components/models/Note";
import { Linkedin } from "./components/models/Linkedin";
import { Github } from "./components/models/Github";
import { Monitor } from "./components/models/Monitor";
import { Chair } from "./components/models/Chair";
import { useSpring, config } from "@react-spring/three";
import { Euler } from "three";
import { motion } from "motion/react";
import "./App.css";
import { Light } from "./components/models/Light";
import { isMobile, isTablet, isDesktop } from "react-device-detect";

export default function Experenice() {
  const camera = useControls("camera", {
    poisitionX: { value: 1.41, step: 0.01 },
    poisitionY: { value: 1.28, step: 0.01 },
    poisitionZ: { value: 1.4, step: 0.01 },
    rotationX: { value: -0.8, step: 0.01 },
    rotationY: { value: 1.3, step: 0.01 },
    rotationZ: { value: 0.8, step: 0.01 },
  });

  const cameraRef = useRef();
  const getActiveHtmlPosition = () => {
    if (isMobile) {
      return [0.1, 1.32, 0.59];
    } else if (isTablet) {
      return [0.08, 0.98, 0.59];
    } else if (isDesktop) {
      return [0.087, 0.985, 0.59];
    }
    return [0.087, 0.985, 0.59];
  };
  const getInactiveHtmlPosition = () => {
    if (isMobile) {
      return [0.25, 1.32, 0.59];
    } else if (isTablet) {
      return [0.08, 0.98, 0.59];
    } else if (isDesktop) {
      return [0.087, 0.985, 0.59];
    }
    return [0.087, 0.985, 0.59];
  };

  const { intensity } = useSpring({
    intensity: 5,
    from: { intensity: 3 },
    config: { duration: 3000 },
  });
  console.log(intensity);
  const [isMonitorClicked, setIsMonitorClicked] = useState(false);
  const monitor = useControls("monitor", {
    poisitionX: { value: getActiveHtmlPosition()[0], step: 0.0001 },
    poisitionY: { value: getActiveHtmlPosition()[1], step: 0.0001 },
    poisitionZ: { value: getActiveHtmlPosition()[2], step: 0.0001 },
  });

  const handleMonitorClick = (e) => {
    setIsMonitorClicked((prev) => !prev);
    console.log("Monitor clicked:", isMonitorClicked);
  };
  const handleMonitorLeave = (e) => {
    setIsMonitorClicked((prev) => !prev);
    console.log("Monitor lefts:", isMonitorClicked);
  };

  const controlsRef = useRef();

  useFrame(() => {
    if (controlsRef.current) {
      const { target, object } = controlsRef.current;

      console.log("Camera Position:", object.position);
      console.log("Target Position:", target);
      console.log("rotation :", object.rotation);
    }
  });

  return (
    <>
      <Table />
      <Kayn />
      {/* <OrbitControls /> */}
      <Light
        intensity={isMonitorClicked === true ? 0.5 : 0.8}
        position={[0.22, 1.3, 1.45]}
      />
      <Light
        intensity={isMonitorClicked === true ? 0.5 : 1}
        position={[0.22, 1.3, 2]}
      />
      {isMonitorClicked ? (
        <Light intensity={0.5} position={[0.34, 1.2, 0.6]} />
      ) : null}
      <Lamp />
      <Linkedin />
      <Github />
      {/* <Background /> */}
      <Notepad />
      <Monitor />
      <Chair />
      {isMonitorClicked ? (
        <Html
          transform
          position={getActiveHtmlPosition()}
          rotation={[0, Math.PI / 2, 0]}
          wrapperClass="htmlScreen"
          distanceFactor={1.17}
          scale={0.2}
          occlude
        >
          <iframe
            onPointerLeave={handleMonitorLeave}
            onClick={handleMonitorLeave}
            src="http://192.168.100.6:5174"
          />
        </Html>
      ) : (
        <Html
          transform
          position={getInactiveHtmlPosition()}
          rotation={[0, Math.PI / 2, 0]}
          wrapperClass="htmlOffScreen"
          distanceFactor={1.17}
          occlude
        >
          <main
            onClick={handleMonitorClick}
            onPointerEnter={handleMonitorClick}
          >
            <div>
              <motion.div
                animate={{ rotate: 360, transition: { duration: 1 } }}
              >
                Hover to run
              </motion.div>
            </div>
          </main>
        </Html>
      )}
      <AnimatedCamera isMonitorClicked={isMonitorClicked} monitor={camera} />{" "}
      <PerspectiveCamera
        position={[camera.poisitionX, camera.poisitionY, camera.poisitionZ]}
        makeDefault
        rotation={[camera.rotationX, camera.rotationY, camera.rotationZ]}
        fov={isMobile ? 120 : 75}
      />
    </>
  );
}

const AnimatedCamera = ({ isMonitorClicked, monitor }) => {
  const { camera } = useThree();

  const { position, rotation } = useSpring({
    position: isMonitorClicked
      ? [isDesktop ? 0.42 : 0.5, 0.98, isDesktop ? 0.57 : 0.59]
      : [monitor.poisitionX, monitor.poisitionY, monitor.poisitionZ],

    rotation: isMonitorClicked
      ? [0.39, 1.57, -0.39]
      : [monitor.rotationX, monitor.rotationY, monitor.rotationZ],
    config: config.molasses,
  });

  useFrame(() => {
    camera.position.set(...position.get());
    camera.quaternion.setFromEuler(new Euler(...rotation.get()));
  });

  return null;
};
