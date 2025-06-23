import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export default function ModelGLB({ url, scale = 1 }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} scale={scale} />;
}