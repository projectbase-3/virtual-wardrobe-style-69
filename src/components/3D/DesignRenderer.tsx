
import React from 'react';
import * as THREE from 'three';

interface DesignPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface DesignRendererProps {
  frontTexture: THREE.Texture | null;
  backTexture: THREE.Texture | null;
  frontPlacement: DesignPlacement;
  backPlacement: DesignPlacement;
  showBack: boolean;
}

export const DesignRenderer: React.FC<DesignRendererProps> = ({
  frontTexture,
  backTexture,
  frontPlacement,
  backPlacement,
  showBack
}) => {
  console.log('DesignRenderer render:', {
    frontTexture: !!frontTexture,
    backTexture: !!backTexture,
    showBack,
    frontPlacement,
    backPlacement
  });

  return (
    <>
      {/* Front design - positioned like back design */}
      {frontTexture && (
        <mesh 
          position={[-frontPlacement.x, frontPlacement.y, 0.21]}
          rotation={[0, Math.PI, frontPlacement.rotation]}
          scale={[frontPlacement.scale, frontPlacement.scale, 1]}
          renderOrder={2}
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
      
      {/* Back design - always show when available */}
      {backTexture && (
        <mesh 
          position={[-backPlacement.x, backPlacement.y, -0.21]}
          rotation={[0, Math.PI, backPlacement.rotation]}
          scale={[backPlacement.scale, backPlacement.scale, 1]}
          renderOrder={2}
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
    </>
  );
};
