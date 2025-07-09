
import React from 'react';
import * as THREE from 'three';

interface TextureLoadingState {
  front: 'loading' | 'loaded' | 'error' | 'idle';
  back: 'loading' | 'loaded' | 'error' | 'idle';
}

interface DebugIndicatorsProps {
  frontTexture: THREE.Texture | null;
  backTexture: THREE.Texture | null;
  showBack: boolean;
  textureLoadingState: TextureLoadingState;
}

export const DebugIndicators: React.FC<DebugIndicatorsProps> = ({
  frontTexture,
  backTexture,
  showBack,
  textureLoadingState
}) => {
  return (
    <>
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
    </>
  );
};
