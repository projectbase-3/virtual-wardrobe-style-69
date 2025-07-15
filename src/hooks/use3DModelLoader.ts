import { useGLTF } from '@react-three/drei';
import { useState, useCallback } from 'react';

interface Use3DModelLoaderResult {
  model: any;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const use3DModelLoader = (modelUrl?: string): Use3DModelLoaderResult => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  let model = null;
  
  try {
    if (modelUrl) {
      setIsLoading(true);
      const gltf = useGLTF(modelUrl);
      model = gltf;
      setIsLoading(false);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to load 3D model');
    setIsLoading(false);
  }

  return {
    model,
    isLoading,
    error,
    clearError
  };
};