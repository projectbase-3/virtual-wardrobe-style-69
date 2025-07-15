import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface Custom3DModelProps {
  modelUrl: string;
  color?: string;
}

export const Custom3DModel: React.FC<Custom3DModelProps> = ({
  modelUrl,
  color = '#ffffff'
}) => {
  const groupRef = useRef<Group>(null);
  
  try {
    const { scene } = useGLTF(modelUrl);
    
    // Apply color to all meshes in the model
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.color.set(color);
        }
      });
    }

    return (
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    );
  } catch (error) {
    console.error('Failed to load 3D model:', error);
    // Fallback to basic geometry if model fails to load
    return (
      <mesh>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
};