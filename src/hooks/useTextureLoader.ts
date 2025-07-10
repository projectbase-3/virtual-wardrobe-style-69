import { useState, useEffect } from 'react';
import * as THREE from 'three';

interface TextureLoadingState {
  front: 'loading' | 'loaded' | 'error' | 'idle';
  back: 'loading' | 'loaded' | 'error' | 'idle';
}

interface TextureInfo {
  texture: THREE.Texture;
  type: 'uploaded' | 'canvas';
}

export const useTextureLoader = (frontDesign?: string, backDesign?: string) => {
  const [frontTextureInfo, setFrontTextureInfo] = useState<TextureInfo | null>(null);
  const [backTextureInfo, setBackTextureInfo] = useState<TextureInfo | null>(null);
  const [textureLoadingState, setTextureLoadingState] = useState<TextureLoadingState>({
    front: 'idle',
    back: 'idle'
  });

  // Helper function to determine texture type
  const getTextureType = (dataUrl: string): 'uploaded' | 'canvas' => {
    // Canvas-generated images (from text/art creators) will have specific patterns
    return dataUrl.includes('data:image/png;base64') && dataUrl.length > 50000 ? 'canvas' : 'uploaded';
  };

  // Helper function to configure texture
  const configureTexture = (texture: THREE.Texture, type: 'uploaded' | 'canvas', side: 'front' | 'back') => {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    // Configure flipY to ensure correct orientation
    // Canvas textures (text/art) need to be flipped to display correctly
    // Uploaded images should display with their natural orientation
    texture.flipY = type === 'canvas';
    
    texture.needsUpdate = true;
    return texture;
  };

  // Load front texture
  useEffect(() => {
    console.log('Front design changed:', frontDesign);
    
    // Clean up previous texture
    if (frontTextureInfo?.texture) {
      frontTextureInfo.texture.dispose();
    }
    
    if (frontDesign && typeof frontDesign === 'string' && frontDesign.trim() !== '') {
      setTextureLoadingState(prev => ({ ...prev, front: 'loading' }));
      console.log('Loading front texture from:', frontDesign.substring(0, 50) + '...');
      
      const loader = new THREE.TextureLoader();
      const textureType = getTextureType(frontDesign);
      
      loader.load(
        frontDesign,
        (texture) => {
          console.log('Front texture loaded successfully, type:', textureType);
          const configuredTexture = configureTexture(texture, textureType, 'front');
          setFrontTextureInfo({ texture: configuredTexture, type: textureType });
          setTextureLoadingState(prev => ({ ...prev, front: 'loaded' }));
        },
        (progress) => {
          console.log('Front texture loading progress:', progress);
        },
        (error) => {
          console.error('Error loading front texture:', error);
          setFrontTextureInfo(null);
          setTextureLoadingState(prev => ({ ...prev, front: 'error' }));
        }
      );
    } else {
      console.log('Clearing front texture');
      setFrontTextureInfo(null);
      setTextureLoadingState(prev => ({ ...prev, front: 'idle' }));
    }
  }, [frontDesign]);

  // Load back texture
  useEffect(() => {
    console.log('Back design changed:', backDesign);
    
    // Clean up previous texture
    if (backTextureInfo?.texture) {
      backTextureInfo.texture.dispose();
    }
    
    if (backDesign && typeof backDesign === 'string' && backDesign.trim() !== '') {
      setTextureLoadingState(prev => ({ ...prev, back: 'loading' }));
      console.log('Loading back texture from:', backDesign.substring(0, 50) + '...');
      
      const loader = new THREE.TextureLoader();
      const textureType = getTextureType(backDesign);
      
      loader.load(
        backDesign,
        (texture) => {
          console.log('Back texture loaded successfully, type:', textureType);
          const configuredTexture = configureTexture(texture, textureType, 'back');
          setBackTextureInfo({ texture: configuredTexture, type: textureType });
          setTextureLoadingState(prev => ({ ...prev, back: 'loaded' }));
        },
        (progress) => {
          console.log('Back texture loading progress:', progress);
        },
        (error) => {
          console.error('Error loading back texture:', error);
          setBackTextureInfo(null);
          setTextureLoadingState(prev => ({ ...prev, back: 'error' }));
        }
      );
    } else {
      console.log('Clearing back texture');
      setBackTextureInfo(null);
      setTextureLoadingState(prev => ({ ...prev, back: 'idle' }));
    }
  }, [backDesign]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frontTextureInfo?.texture) {
        frontTextureInfo.texture.dispose();
      }
      if (backTextureInfo?.texture) {
        backTextureInfo.texture.dispose();
      }
    };
  }, []);

  return {
    frontTexture: frontTextureInfo?.texture || null,
    backTexture: backTextureInfo?.texture || null,
    frontTextureType: frontTextureInfo?.type || null,
    backTextureType: backTextureInfo?.type || null,
    textureLoadingState
  };
};
