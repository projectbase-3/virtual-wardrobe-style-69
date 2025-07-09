
import { useState, useEffect } from 'react';
import * as THREE from 'three';

interface TextureLoadingState {
  front: 'loading' | 'loaded' | 'error' | 'idle';
  back: 'loading' | 'loaded' | 'error' | 'idle';
}

export const useTextureLoader = (frontDesign?: string, backDesign?: string) => {
  const [frontTexture, setFrontTexture] = useState<THREE.Texture | null>(null);
  const [backTexture, setBackTexture] = useState<THREE.Texture | null>(null);
  const [textureLoadingState, setTextureLoadingState] = useState<TextureLoadingState>({
    front: 'idle',
    back: 'idle'
  });

  // Load front texture
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
          texture.flipY = false; // Set to false to prevent upside down images
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

  // Load back texture
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
          texture.flipY = false; // Set to false to prevent upside down images
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

  return {
    frontTexture,
    backTexture,
    textureLoadingState
  };
};
