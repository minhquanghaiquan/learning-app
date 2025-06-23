import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DraggablePart from "./DraggablePart";
import vrs631s from "./data/vrs631s"; // Đường dẫn phải đúng file dữ liệu của bạn

export default function AssemblyScene() {
  const orbitRef = useRef();
  const [resetKey, setResetKey] = useState(0);

  // LẤY RA MẢNG LINH KIỆN TỪ OBJECT
  const models3d = vrs631s.models3d || []; // An toàn nếu chưa có models3d

  return (
    <div>
      <button onClick={() => setResetKey(k => k + 1)} style={{marginBottom: 10}}>Reset</button>
      <div style={{ width: "100%", height: 500, background: "#f8fafc", borderRadius: 20 }}>
        <Canvas camera={{ position: [2, 2, 4], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          {models3d.map((part, idx) => (
            <DraggablePart
              key={part.id || idx}
              name={part.name}
              modelUrl={part.url}
              position={part.init}
              target={part.target}
              scale={part.scale || 1}
              orbitRef={orbitRef}
              enabled={true}
              resetKey={resetKey}
            />
          ))}
          <OrbitControls ref={orbitRef} />
        </Canvas>
      </div>
    </div>
  );
}
