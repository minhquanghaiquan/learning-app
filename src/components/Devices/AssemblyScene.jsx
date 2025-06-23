import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DraggablePart from "./DraggablePart";

export default function AssemblyScene({ parts = [] }) {
  const orbitRef = useRef();

  return (
    <div style={{ width: "100%", height: 500, background: "#f8fafc", borderRadius: 20 }}>
      <Canvas camera={{ position: [2, 2, 4], fov: 45 }}>
        {/* Ánh sáng & sàn nếu cần */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        {/* Render các part */}
        {parts.map((p, idx) => (
          <DraggablePart
            key={p.id || idx}
            name={p.name}
            modelUrl={p.url}
            position={p.init}
            target={p.target}
            onSnap={p.onSnap}
            orbitRef={orbitRef} // truyền thêm ref vào part!
          />
        ))}
        <OrbitControls ref={orbitRef} />
      </Canvas>
    </div>
  );
}
