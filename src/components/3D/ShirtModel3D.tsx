
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';

interface DesignPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface ShirtModel3DProps {
  color: string;
  frontDesign?: string;
  backDesign?: string;
  frontPlacement?: DesignPlacement;
  backPlacement?: DesignPlacement;
  showBack?: boolean;
  rotationSpeed?: number;
  autoRotate?: boolean;
}

export const ShirtModel3D: React.FC<ShirtModel3DProps> = ({
  color = '#ffffff',
  frontDesign,
  backDesign,
  frontPlacement = { x: 0, y: 0.2, scale: 1, rotation: 0 },
  backPlacement = { x: 0, y: 0.2, scale: 1, rotation: 0 },
  showBack = false,
  rotationSpeed = 0.01,
  autoRotate = false
}) => {
  const shirtRef = useRef<Group>(null);
  const [frontTexture, setFrontTexture] = useState<THREE.Texture | null>(null);
  const [backTexture, setBackTexture] = useState<THREE.Texture | null>(null);

  // Load front texture
  useEffect(() => {
    console.log('Front design value:', frontDesign);
    console.log('Front design type:', typeof frontDesign);
    
    if (frontDesign && typeof frontDesign === 'string' && frontDesign.trim() !== '') {
      console.log('Loading front texture from:', frontDesign);
      const loader = new THREE.TextureLoader();
      
      loader.load(
        frontDesign,
        (texture) => {
          console.log('Front texture loaded successfully');
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.flipY = false;
          setFrontTexture(texture);
        },
        (progress) => {
          console.log('Front texture loading progress:', progress);
        },
        (error) => {
          console.error('Error loading front texture:', error);
          setFrontTexture(null);
        }
      );
    } else {
      console.log('No valid front design provided, clearing texture');
      setFrontTexture(null);
    }
  }, [frontDesign]);

  // Load back texture
  useEffect(() => {
    console.log('Back design value:', backDesign);
    console.log('Back design type:', typeof backDesign);
    
    if (backDesign && typeof backDesign === 'string' && backDesign.trim() !== '') {
      console.log('Loading back texture from:', backDesign);
      const loader = new THREE.TextureLoader();
      
      loader.load(
        backDesign,
        (texture) => {
          console.log('Back texture loaded successfully');
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.flipY = false;
          setBackTexture(texture);
        },
        (progress) => {
          console.log('Back texture loading progress:', progress);
        },
        (error) => {
          console.error('Error loading back texture:', error);
          setBackTexture(null);
        }
      );
    } else {
      console.log('No valid back design provided, clearing texture');
      setBackTexture(null);
    }
  }, [backDesign]);

  useFrame(() => {
    if (shirtRef.current && autoRotate) {
      shirtRef.current.rotation.y += rotationSpeed;
    }
  });

  // Create realistic t-shirt shape
  const createTShirtGeometry = () => {
    const shape = new THREE.Shape();
    
    // T-shirt outline (simplified but more realistic)
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

  const shirtGeometry = createTShirtGeometry();

  useEffect(() => {
    if (shirtRef.current) {
      shirtRef.current.rotation.y = showBack ? Math.PI : 0;
    }
  }, [showBack]);

  console.log('Rendering ShirtModel3D:', {
    frontTexture: !!frontTexture,
    backTexture: !!backTexture,
    showBack,
    frontDesign: frontDesign ? 'has design' : 'no design',
    backDesign: backDesign ? 'has design' : 'no design'
  });

  return (
    <group ref={shirtRef} position={[0, 0, 0]}>
      {/* Main T-shirt body */}
      <mesh position={[0, 0, 0]}>
        <primitive object={shirtGeometry} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Front design */}
      {frontTexture && !showBack && (
        <mesh 
          position={[frontPlacement.x, frontPlacement.y, 0.08]}
          rotation={[0, 0, frontPlacement.rotation]}
          scale={[frontPlacement.scale * 0.8, frontPlacement.scale * 0.8, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial 
            transparent 
            opacity={1}
            map={frontTexture}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
      
      {/* Back design */}
      {backTexture && showBack && (
        <mesh 
          position={[backPlacement.x, backPlacement.y, -0.08]}
          rotation={[0, Math.PI, backPlacement.rotation]}
          scale={[backPlacement.scale * 0.8, backPlacement.scale * 0.8, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial 
            transparent 
            opacity={1}
            map={backTexture}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
};
