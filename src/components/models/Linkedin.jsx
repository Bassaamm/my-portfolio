/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/linkedin.glb 
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Linkedin(props) {
  const { nodes, materials } = useGLTF("models/linkedin.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={0.092}>
        <group rotation={[0, 1.58, 0]} position={[5, 8.15, 16]} scale={0.843}>
          <mesh
            geometry={nodes.Object_4001.geometry}
            material={materials.glossy_linkedin}
            scale={0.682}
          />
          <mesh
            geometry={nodes.Object_5001.geometry}
            material={materials["glossy_putih.001"]}
            scale={0.682}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/linkedin.glb");