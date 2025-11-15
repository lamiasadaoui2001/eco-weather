import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Stars } from "@react-three/drei"; // pour les étoiles
import * as THREE from "three";

import earthTexture from "../../assets/earthmap1k.jpg";
import earthBump from "../../assets/earthbump1k.jpg"; // map de relief
import earthSpecular from "../../assets/earthspec1k.jpg"; // optionnel pour la brillance

const Earth = () => {
  const earthRef = useRef();
  const colorMap = useLoader(TextureLoader, earthTexture);
  const bumpMap = useLoader(TextureLoader, earthBump);
  const specMap = useLoader(TextureLoader, earthSpecular);

  useFrame(() => {
    earthRef.current.rotation.y += 0.0015; // rotation lente
  });

  return (
    <>
      {/* Globe terrestre */}
   <mesh ref={earthRef} rotation={[0.4, 0, 0]}>
  <sphereGeometry args={[9, 64, 64]} />
  <meshPhongMaterial
    map={colorMap}
    bumpMap={bumpMap}
    bumpScale={0.1} // relief subtil
    specularMap={specMap} // brillance des océans
    shininess={20} // contrôle la brillance
  />
</mesh>

      {/* Atmosphère légère */}
      <mesh>
        <sphereGeometry args={[9.4, 64, 64]} />
        <meshPhongMaterial
          color="#93c5fd"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

const HomePic = () => {
  return (
    <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
      <Canvas
        gl={{ alpha: true }}
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, -4, 15] }}
      >
        {/* Lumière ambiante et directionnelle */}
        <ambientLight intensity={0.2} />
        <directionalLight
          intensity={1.2}
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Globe */}
        <Earth />
        {/* Étoiles en arrière-plan */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          fade
          saturation={0}
        />
      </Canvas>
    </div>
  );
};

export default HomePic;
