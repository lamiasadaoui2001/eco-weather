// StarsBackground.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const StarsBackground = () => {
  return (
    <Canvas
      gl={{ alpha: true }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // derrière tout
        pointerEvents: "none" // pour que le clic passe à travers
      }}
      camera={{ position: [0, 0, 15] }}
    >
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        fade
        saturation={0}
      />
    </Canvas>
  );
};

export default StarsBackground;
