
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useTextureLoader } from '@/hooks/useTextureLoader';
import { TShirtGeometry } from './TShirtGeometry';
import { DesignRenderer } from './DesignRenderer';
import { DebugIndicators } from './DebugIndicators';
import { Custom3DModel } from './Custom3DModel';

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
  is3DModel?: boolean;
  modelUrl?: string;
}

export const ShirtModel3D: React.FC<ShirtModel3DProps> = ({
  color = '#ffffff',
  frontDesign,
  backDesign,
  frontPlacement = { x: 0, y: 0.2, scale: 1.2, rotation: 0 },
  backPlacement = { x: 0, y: 0.2, scale: 1.2, rotation: 0 },
  showBack = false,
  rotationSpeed = 0.01,
  autoRotate = false,
  is3DModel = false,
  modelUrl
}) => {
  const shirtRef = useRef<Group>(null);
  const { frontTexture, backTexture, frontTextureType, backTextureType, textureLoadingState } = useTextureLoader(frontDesign, backDesign);

  useFrame(() => {
    if (shirtRef.current && autoRotate) {
      shirtRef.current.rotation.y += rotationSpeed;
    }
  });

  useEffect(() => {
    if (shirtRef.current) {
      shirtRef.current.rotation.y = showBack ? Math.PI : 0;
    }
  }, [showBack]);

  console.log('ShirtModel3D render state:', {
    frontTexture: !!frontTexture,
    backTexture: !!backTexture,
    frontTextureType,
    backTextureType,
    showBack,
    frontDesign: !!frontDesign,
    backDesign: !!backDesign,
    textureLoadingState,
    frontPlacement,
    backPlacement
  });

  return (
    <group ref={shirtRef} position={[0, 0, 0]}>
      {/* Main T-shirt body - use custom 3D model if available, otherwise default geometry */}
      {is3DModel && modelUrl ? (
        <Custom3DModel modelUrl={modelUrl} color={color} />
      ) : (
        <TShirtGeometry color={color} />
      )}
      
      {/* Design rendering - only for default geometry for now */}
      {!is3DModel && (
        <DesignRenderer
          frontTexture={frontTexture}
          backTexture={backTexture}
          frontPlacement={frontPlacement}
          backPlacement={backPlacement}
          showBack={showBack}
        />
      )}
      
      {/* Debug indicators */}
      <DebugIndicators
        frontTexture={frontTexture}
        backTexture={backTexture}
        showBack={showBack}
        textureLoadingState={textureLoadingState}
      />
    </group>
  );
};
