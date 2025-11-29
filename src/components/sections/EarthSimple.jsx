import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

import earthTexture from "../../assets/8k_earth_daymap.jpg";

const Earth = () => {
  const earthRef = useRef();
  const colorMap = useLoader(TextureLoader, earthTexture);
  
  // Rotation initiale
  const initialRotationY = -1.5;
  const initialRotationX = 0.4;

  // Rotation douce
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0025;
    }
  });

  return (
    <mesh 
      ref={earthRef}
      rotation={[initialRotationX, initialRotationY, 0]}
    >
      <sphereGeometry args={[6, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

const EarthSimple = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        marginBottom: "1px",
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10] }}
        gl={{ alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.4}
        />

        <Earth />
      </Canvas>
    </div>
  );
};

export default EarthSimple;
