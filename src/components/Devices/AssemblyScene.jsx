import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import DraggablePart from "./DraggablePart";
import React, { useState } from "react";

export default function AssemblyScene({ parts }) {
  const [snapCount, setSnapCount] = useState(0);

  return (
    <div style={{ width: "100%", height: 500 }}>
      <Canvas camera={{ position: [0, 5, 12], fov: 60 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        {/* Sàn */}
        <mesh position={[0, -1.5, 0]} receiveShadow>
          <boxGeometry args={[12, 0.1, 7]} />
          <meshStandardMaterial color="#bbb" />
        </mesh>
        {/* Snap targets (visualized) */}
        {parts.map((p, idx) => (
          <mesh key={idx} position={p.target}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#ffcc80" opacity={0.5} transparent />
          </mesh>
        ))}
        {/* Drag parts */}
        {parts.map((p, idx) => (
          <DraggablePart
            key={idx}
            name={p.name}
            modelUrl={p.url}
            position={p.init}
            target={p.target}
            onSnap={() => setSnapCount((c) => c + 1)}
          />
        ))}
        <OrbitControls />
      </Canvas>
      <div style={{ textAlign: "center", marginTop: 10, fontWeight: 600, color: "#2367d1" }}>
        Đã lắp đúng {snapCount}/{parts.length} bộ phận
      </div>
    </div>
  );
}
