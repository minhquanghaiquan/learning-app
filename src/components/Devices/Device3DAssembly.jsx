import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// Bóng target vị trí lắp đúng
function TargetIndicator({ position, active }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color={active ? "#36c" : "#ff9800"} transparent opacity={active ? 0.4 : 0.2} />
    </mesh>
  );
}

// Bộ phận có thể drag, snap vào target
function DraggablePart({ modelUrl, name, position, target, onSnap, snapRadius = 0.4 }) {
  const ref = useRef();
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState(position);
  const [hovered, setHovered] = useState(false);
  const [snapped, setSnapped] = useState(false);

  // Drag logic rất đơn giản, nếu gần target thì snap
  const onPointerDown = (e) => {
    e.stopPropagation();
    setDragging(true);
    document.body.style.cursor = "grabbing";
  };
  const onPointerUp = (e) => {
    setDragging(false);
    document.body.style.cursor = "";
    // Snap nếu vào gần target
    const d = ref.current.position.distanceTo(new THREE.Vector3(...target));
    if (d < snapRadius) {
      setPos(target);
      setSnapped(true);
      onSnap(name);
    }
  };
  const onPointerMove = (e) => {
    if (!dragging || snapped) return;
    // Đưa mesh theo chuột, dùng unproject
    const ndc = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
    const vector = new THREE.Vector3(ndc.x, ndc.y, 0.5);
    vector.unproject(e.view.camera);
    setPos([vector.x, vector.y, vector.z]);
  };

  return (
    <>
      <mesh
        ref={ref}
        position={pos}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
        scale={snapped ? 1.1 : 1}
        // Animate sáng khi hover hoặc snap
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={snapped ? "#41db6a" : hovered ? "#1976d2" : "#aaa"} />
        {/* Tooltip */}
        {hovered && (
          <Html center distanceFactor={8}>
            <div style={{
              background: "#222",
              color: "#fff",
              padding: "4px 12px",
              borderRadius: 8,
              fontSize: 14,
              opacity: 0.85
            }}>{name}</div>
          </Html>
        )}
      </mesh>
    </>
  );
}

// Sân chơi, quản lý trạng thái drag-drop + reset
export default function Device3DAssembly() {
  // Giả lập dữ liệu part
  const parts = [
    { name: "Ăng-ten", position: [-3, 0, 0], target: [-1, 0, 0] },
    { name: "Bộ nguồn", position: [3, 0, 0], target: [1, 0, 0] },
    { name: "Thân máy", position: [0, 0, -3], target: [0, 0, 0] }
  ];

  // State để reset
  const [snapped, setSnapped] = useState({});
  const [resetFlag, setResetFlag] = useState(false);

  function handleSnap(name) {
    setSnapped((prev) => ({ ...prev, [name]: true }));
  }
  function handleReset() {
    setSnapped({});
    setResetFlag((v) => !v);
  }

  return (
    <div style={{ width: "100%", height: 600, position: "relative", background: "#f8fafc", borderRadius: 16 }}>
      <Canvas shadows camera={{ position: [0, 3, 7], fov: 60 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        {/* Sàn */}
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[12, 0.2, 8]} />
          <meshStandardMaterial color="#eee" />
        </mesh>
        {/* Target bóng mờ */}
        {parts.map((p, i) => (
          <TargetIndicator key={p.name} position={p.target} active={!!snapped[p.name]} />
        ))}
        {/* Drag part */}
        {parts.map((p, i) => (
          <DraggablePart
            key={p.name}
            name={p.name}
            position={p.position}
            target={p.target}
            onSnap={handleSnap}
            snapRadius={0.7}
            resetFlag={resetFlag}
          />
        ))}
        <OrbitControls enabled={true} />
      </Canvas>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button onClick={handleReset} style={{
          background: "#fff",
          border: "1px solid #ddd",
          padding: "6px 24px",
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: "0 1px 5px #0001"
        }}>Reset vị trí</button>
        <div style={{ color: "#1a56db", marginTop: 6, fontWeight: 600 }}>
          {`Đã lắp đúng ${Object.values(snapped).filter(Boolean).length}/${parts.length} bộ phận`}
        </div>
      </div>
    </div>
  );
}
