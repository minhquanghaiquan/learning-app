import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import ModelGLB from "./ModelGLB";

export default function DraggablePart({
  name,
  modelUrl,
  position,
  target,
  snapRadius = 0.6,
  scale = 1,
  onSnap,
}) {
  const meshRef = useRef();
  const [pos, setPos] = useState(position || [0, 0, 0]);
  const [snapped, setSnapped] = useState(false);
  const [hovered, setHovered] = useState(false);

  const onPointerDown = (e) => {
    e.stopPropagation();
    meshRef.current.userData.dragging = true;
    meshRef.current.userData.offset = [
      e.point.x - pos[0],
      e.point.y - pos[1],
      e.point.z - pos[2],
    ];
  };
  const onPointerMove = (e) => {
    if (meshRef.current.userData.dragging && !snapped) {
      setPos([
        e.point.x - meshRef.current.userData.offset[0],
        position[1], // lock y
        e.point.z - meshRef.current.userData.offset[2],
      ]);
    }
  };
  const onPointerUp = () => {
    meshRef.current.userData.dragging = false;
    // Check snap
    const dist = Math.sqrt(
      (pos[0] - target[0]) ** 2 +
      (pos[1] - target[1]) ** 2 +
      (pos[2] - target[2]) ** 2
    );
    if (dist < snapRadius) {
      setPos(target);
      setSnapped(true);
      onSnap && onSnap();
    }
  };

  return (
    <group
      ref={meshRef}
      position={pos}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale}
    >
      <ModelGLB url={modelUrl} />
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
    </group>
  );
}
