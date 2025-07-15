
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { ShirtModel3D } from './ShirtModel3D';

interface DesignPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface ShirtViewer360Props {
  shirtColor: string;
  frontDesign?: string | null;
  backDesign?: string | null;
  frontPlacement?: DesignPlacement;
  backPlacement?: DesignPlacement;
  showBack?: boolean;
  autoRotate?: boolean;
  selectedShirt?: any;
}

const LoadingFallback = () => (
  <div className="w-full h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
    <div className="text-center space-y-2">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      <div className="text-gray-600 font-medium">Loading 3D Model...</div>
    </div>
  </div>
);

export const ShirtViewer360: React.FC<ShirtViewer360Props> = ({
  shirtColor,
  frontDesign,
  backDesign,
  frontPlacement,
  backPlacement,
  showBack = false,
  autoRotate = false,
  selectedShirt
}) => {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} />
        
        {/* Environment */}
        <Environment preset="studio" />
        
        {/* 3D Shirt Model */}
        <Suspense fallback={null}>
          <ShirtModel3D 
            color={shirtColor}
            frontDesign={frontDesign || undefined}
            backDesign={backDesign || undefined}
            frontPlacement={frontPlacement}
            backPlacement={backPlacement}
            showBack={showBack}
            autoRotate={autoRotate}
            is3DModel={selectedShirt?.is_3d_model}
            modelUrl={selectedShirt?.model_url}
          />
        </Suspense>
        
        {/* Enhanced Camera Controls */}
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};
