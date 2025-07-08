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
  const [textureLoadingState, setTextureLoadingState] = useState<{
    front: 'loading' | 'loaded' | 'error' | 'idle';
    back: 'loading' | 'loaded' | 'error' | 'idle';
  }>({ front: 'idle', back: 'idle' });

  // Load front texture with proper orientation
  useEffect(() => {
    console.log('Front design changed:', frontDesign);
    
    if (frontDesign && typeof frontDesign === 'string' && frontDesign.trim() !== '') {
      setTextureLoadingState(prev => ({ ...prev, front: 'loading' }));
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
          texture.flipY = true; // Fix upside down issue
          texture.needsUpdate = true;
          setFrontTexture(texture);
          setTextureLoadingState(prev => ({ ...prev, front: 'loaded' }));
        },
        (progress) => {
          console.log('Front texture loading progress:', progress);
        },
        (error) => {
          console.error('Error loading front texture:', error);
          setFrontTexture(null);
          setTextureLoadingState(prev => ({ ...prev, front: 'error' }));
        }
      );
    } else {
      console.log('Clearing front texture');
      setFrontTexture(null);
      setTextureLoadingState(prev => ({ ...prev, front: 'idle' }));
    }
  }, [frontDesign]);

  // Load back texture with proper orientation
  useEffect(() => {
    console.log('Back design changed:', backDesign);
    
    if (backDesign && typeof backDesign === 'string' && backDesign.trim() !== '') {
      setTextureLoadingState(prev => ({ ...prev, back: 'loading' }));
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
          texture.flipY = true; // Fix upside down issue
          texture.needsUpdate = true;
          setBackTexture(texture);
          setTextureLoadingState(prev => ({ ...prev, back: 'loaded' }));
        },
        (progress) => {
          console.log('Back texture loading progress:', progress);
        },
        (error) => {
          console.error('Error loading back texture:', error);
          setBackTexture(null);
          setTextureLoadingState(prev => ({ ...prev, back: 'error' }));
        }
      );
    } else {
      console.log('Clearing back texture');
      setBackTexture(null);
      setTextureLoadingState(prev => ({ ...prev, back: 'idle' }));
    }
  }, [backDesign]);

  useFrame(() => {
    if (shirtRef.current && autoRotate) {
      shirtRef.current.rotation.y += rotationSpeed;
    }
  });

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

  const shirtGeometry = createTShirtGeometry();

  useEffect(() => {
    if (shirtRef.current) {
      shirtRef.current.rotation.y = showBack ? Math.PI : 0;
    }
  }, [showBack]);

  console.log('ShirtModel3D render state:', {
    frontTexture: !!frontTexture,
    backTexture: !!backTexture,
    showBack,
    frontDesign: !!frontDesign,
    backDesign: !!backDesign,
    textureLoadingState,
    frontPlacement,
    backPlacement
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
      
      {/* Front design - with proper scaling */}
      {frontTexture && !showBack && (
        <mesh 
          position={[frontPlacement.x, frontPlacement.y, 0.15]}
          rotation={[0, 0, frontPlacement.rotation]}
          scale={[frontPlacement.scale, frontPlacement.scale, 1]}
          renderOrder={1}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial 
            transparent 
            opacity={0.95}
            map={frontTexture}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      )}
      
      {/* Back design - with proper scaling */}
      {backTexture && showBack && (
        <mesh 
          position={[-backPlacement.x, backPlacement.y, -0.15]}
          rotation={[0, Math.PI, -backPlacement.rotation]}
          scale={[backPlacement.scale, backPlacement.scale, 1]}
          renderOrder={1}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial 
            transparent 
            opacity={0.95}
            map={backTexture}
            alphaTest={0.1}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      )}
      
      {/* Visual indicator when design is applied */}
      {(frontTexture && !showBack) && (
        <mesh position={[0, -1.8, 0.2]}>
          <planeGeometry args={[0.5, 0.1]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.8} />
        </mesh>
      )}
      
      {(backTexture && showBack) && (
        <mesh position={[0, -1.8, -0.2]}>
          <planeGeometry args={[0.5, 0.1]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.8} />
        </mesh>
      )}
      
      {/* Debug indicator when textures are loading */}
      {(textureLoadingState.front === 'loading' || textureLoadingState.back === 'loading') && (
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[0.3, 0.1]} />
          <meshBasicMaterial color="yellow" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
};
