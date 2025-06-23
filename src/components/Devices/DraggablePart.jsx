import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import * as THREE from "three";
import ModelGLB from "./ModelGLB";

export default function DraggablePart({
  name,
  modelUrl,
  position,
  target,
  scale = 1,
  orbitRef,
  enabled = true,
  resetKey = 0,
}) {
  const meshRef = useRef();
  const dragControlsRef = useRef();
  const { camera, gl } = useThree();

  const safePosition = Array.isArray(position) && position.length === 3 ? position : [0, 0, 0];
  const safeTarget = Array.isArray(target) && target.length === 3 ? target : [0, 0, 0];

  // Kiểm tra hiện tại có đang ở target không
  const isAtTarget = () => {
    if (!meshRef.current) return false;
    const pos = meshRef.current.position;
    const targetVec = new THREE.Vector3(...safeTarget);
    return pos.distanceTo(targetVec) < 0.05;
  };

  // Animate về target khi chuột phải
  const animateToTarget = () => {
    if (isAtTarget()) {
      meshRef.current.position.set(...safeTarget);
      return;
    }
    const interval = setInterval(() => {
      if (!meshRef.current) return clearInterval(interval);
      const pos = meshRef.current.position;
      const targetVec = new THREE.Vector3(...safeTarget);
      const dist = pos.distanceTo(targetVec);
      if (dist < 0.05) {
        meshRef.current.position.set(...safeTarget);
        clearInterval(interval);
        return;
      }
      pos.lerp(targetVec, 0.25);
    }, 16);
  };

  // Chuột phải: animate về target nếu enabled
  const handlePointerDown = (e) => {
    if (e.button === 2 && enabled) {
      e.stopPropagation();
      animateToTarget();
    }
  };

  // DragControls: luôn kéo thả tự do
  useEffect(() => {
    if (!meshRef.current) return;
    if (!dragControlsRef.current) {
      dragControlsRef.current = new DragControls([meshRef.current], camera, gl.domElement);

      dragControlsRef.current.addEventListener("dragstart", () => {
        gl.domElement.style.cursor = "grabbing";
        if (orbitRef && orbitRef.current) orbitRef.current.enabled = false;
      });

      dragControlsRef.current.addEventListener("dragend", () => {
        gl.domElement.style.cursor = "pointer";
        if (orbitRef && orbitRef.current) orbitRef.current.enabled = true;
      });
    }

    dragControlsRef.current.activate();

    return () => {
      if (dragControlsRef.current) dragControlsRef.current.dispose();
    };
  }, [camera, gl, orbitRef, enabled, safeTarget]);

  // Reset về vị trí init khi resetKey thay đổi
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...safePosition);
    }
  }, [resetKey, safePosition]);

  // Đảm bảo reset về init nếu enabled=false (tùy yêu cầu workflow)
  useEffect(() => {
    if (!enabled && meshRef.current) {
      meshRef.current.position.set(...safePosition);
    }
  }, [enabled, safePosition]);

  return (
    <group
      ref={meshRef}
      scale={scale}
      onPointerDown={handlePointerDown}
    >
      {modelUrl ? (
        <ModelGLB url={modelUrl} scale={1} />
      ) : (
        <mesh>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={"#aaa"} />
        </mesh>
      )}
    </group>
  );
}
