import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PartModel({
  url,
  initPosition = [0, 0, 0],
  targetPosition = [0, 0, 0],
  snapDistance = 0.7,
  canDrag = true,
  onSnap = () => {},
  ...props
}) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  const [dragging, setDragging] = useState(false);
  const [snapped, setSnapped] = useState(false);

  // Xử lý kéo thả đơn giản bằng chuột
  useFrame(({ mouse, camera }) => {
    if (dragging && !snapped && canDrag) {
      // Lấy vị trí chuột trên plane 3D
      const vector = new THREE.Vector3(
        (mouse.x * camera.aspect) * 5,
        0,
        (mouse.y) * 5
      );
      ref.current.position.x = vector.x;
      ref.current.position.z = vector.z;

      // Kiểm tra snap
      const dist = new THREE.Vector3(
        ...targetPosition
      ).distanceTo(ref.current.position);
      if (dist < snapDistance) {
        ref.current.position.set(...targetPosition);
        setSnapped(true);
        setDragging(false);
        onSnap();
      }
    }
  });

  // Chỉ cho phép kéo khi chưa snap
  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (!snapped && canDrag) setDragging(true);
  };
  const handlePointerUp = () => {
    setDragging(false);
  };

  return (
    <primitive
      object={scene}
      ref={ref}
      position={initPosition}
      scale={0.6}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...props}
      style={{ cursor: dragging ? "grabbing" : "grab" }}
    />
  );
}
