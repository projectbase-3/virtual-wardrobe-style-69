
import React from 'react';
import * as THREE from 'three';

interface TShirtGeometryProps {
  color: string;
}

const createTShirtGeometry = () => {
  const shape = new THREE.Shape();
  
  // T-shirt outline (more detailed and realistic)
  shape.moveTo(-1, -1.5);
  shape.lineTo(-1, 0.5);
  shape.lineTo(-1.5, 0.5);
  shape.lineTo(-1.5, 1);
  shape.lineTo(-0.8, 1);
  shape.lineTo(-0.8, 1.2);
  shape.lineTo(0.8, 1.2);
  shape.lineTo(0.8, 1);
  shape.lineTo(1.5, 1);
  shape.lineTo(1.5, 0.5);
  shape.lineTo(1, 0.5);
  shape.lineTo(1, -1.5);
  shape.lineTo(-1, -1.5);
  
  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.02,
    bevelThickness: 0.02
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};

export const TShirtGeometry: React.FC<TShirtGeometryProps> = ({ color }) => {
  const shirtGeometry = createTShirtGeometry();

  return (
    <mesh position={[0, 0, 0]}>
      <primitive object={shirtGeometry} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
};
