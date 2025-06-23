import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import ModelGLB from "./ModelGLB";

function Ghost({ target, visible }) {
  return (
    <mesh position={target} visible={visible}>
      <sphereGeometry args={[0.3, 24, 24]} />
      <meshStandardMaterial color="#2acfff" opacity={0.3} transparent />
    </mesh>
  );
}

export default function DraggablePart({
  name,
  modelUrl,
  position,
  target,
  snapRadius = 0.6,
  scale = 1,
  onSnap,
  orbitRef,      // <-- Nhận ref truyền từ trên xuống
}) {
  const meshRef = useRef();
  const dragControlsRef = useRef();
  const { camera, gl } = useThree();

  // Đảm bảo giá trị mặc định hợp lệ
  const safePosition = Array.isArray(position) && position.length === 3 ? position : [0, 0, 0];
  const safeTarget = Array.isArray(target) && target.length === 3 ? target : [0, 0, 0];

  const [snapped, setSnapped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ghostVisible, setGhostVisible] = useState(false);

  // Set vị trí part khi mount hoặc reset snap
  useEffect(() => {
    if (meshRef.current && !snapped) {
      meshRef.current.position.set(...safePosition);
    }
  }, [safePosition, snapped]);

  useEffect(() => {
    if (!meshRef.current) return;

    if (!dragControlsRef.current) {
      dragControlsRef.current = new DragControls([meshRef.current], camera, gl.domElement);

      dragControlsRef.current.addEventListener("hoveron", () => setHovered(true));
      dragControlsRef.current.addEventListener("hoveroff", () => setHovered(false));
      dragControlsRef.current.addEventListener("dragstart", () => {
        setGhostVisible(true);
        gl.domElement.style.cursor = "grabbing";
        // Disable OrbitControls khi bắt đầu kéo part
        if (orbitRef && orbitRef.current) orbitRef.current.enabled = false;
      });

      dragControlsRef.current.addEventListener("dragend", () => {
        gl.domElement.style.cursor = "pointer";
        // Enable lại OrbitControls khi thả part
        if (orbitRef && orbitRef.current) orbitRef.current.enabled = true;
        // Kiểm tra snap
        const dist = meshRef.current.position.distanceTo(new THREE.Vector3(...safeTarget));
        if (dist < snapRadius) {
          meshRef.current.position.set(...safeTarget);
          setSnapped(true);
          setGhostVisible(false);
          onSnap && onSnap();
        } else {
          setGhostVisible(false);
        }
      });

      dragControlsRef.current.addEventListener("drag", () => {
        if (snapped) {
          meshRef.current.position.set(...safeTarget);
          return;
        }
        const dist = meshRef.current.position.distanceTo(new THREE.Vector3(...safeTarget));
        setGhostVisible(dist < snapRadius * 2);
      });
    }

    // Disable/enable drag khi đã snap
    if (snapped && dragControlsRef.current) {
      dragControlsRef.current.deactivate();
    } else if (!snapped && dragControlsRef.current) {
      dragControlsRef.current.activate();
    }

    return () => {
      if (dragControlsRef.current) dragControlsRef.current.dispose();
    };
  }, [camera, gl, safeTarget, snapped, orbitRef]);

  return (
    <group ref={meshRef} scale={scale}>
      {modelUrl ? (
        <ModelGLB url={modelUrl} scale={1} />
      ) : (
        <mesh>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={snapped ? "#41db6a" : hovered ? "#1976d2" : "#aaa"} />
        </mesh>
      )}
      {hovered && !snapped && (
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
      <Ghost target={safeTarget} visible={ghostVisible && !snapped} />
    </group>
  );
}
