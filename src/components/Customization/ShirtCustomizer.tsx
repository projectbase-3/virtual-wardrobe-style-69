
import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ShirtCustomizerHeader } from './ShirtCustomizerHeader';
import { ShirtViewer3DPanel } from './ShirtViewer3DPanel';
import { ShirtInfoPanel } from './ShirtInfoPanel';
import { CustomizationSidebar } from './CustomizationSidebar';

interface DesignPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface ShirtCustomizerProps {
  selectedShirt: any;
  onSaveDesign: (design: any) => void;
}

export const ShirtCustomizer: React.FC<ShirtCustomizerProps> = ({
  selectedShirt,
  onSaveDesign
}) => {
  const [selectedColor, setSelectedColor] = useState(selectedShirt?.colors?.[0] || '#ffffff');
  const [autoRotate, setAutoRotate] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [activeDesignSide, setActiveDesignSide] = useState<'front' | 'back'>('front');
  const [showPositioner, setShowPositioner] = useState(false);
  const [frontDesign, setFrontDesign] = useState<string | null>(null);
  const [backDesign, setBackDesign] = useState<string | null>(null);
  const [frontPlacement, setFrontPlacement] = useState<DesignPlacement>({
    x: 0,
    y: 0.2,
    scale: 1,
    rotation: 0
  });
  const [backPlacement, setBackPlacement] = useState<DesignPlacement>({
    x: 0,
    y: 0.2,
    scale: 1,
    rotation: 0
  });

  // Debug effect to track state changes
  useEffect(() => {
    console.log('ShirtCustomizer state update:', {
      frontDesign: frontDesign ? 'has design' : 'no design',
      backDesign: backDesign ? 'has design' : 'no design',
      showBack,
      activeDesignSide,
      selectedColor,
      showPositioner,
      frontDesignLength: frontDesign?.length,
      backDesignLength: backDesign?.length
    });
  }, [frontDesign, backDesign, showBack, activeDesignSide, selectedColor, showPositioner]);

  if (!selectedShirt) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Palette className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Shirt Model</h3>
                <p className="text-gray-600">Choose a shirt from our collection to start customizing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDesignUpload = (design: string, type: 'front' | 'back') => {
    console.log('ShirtCustomizer - Design uploaded:', {
      type,
      hasDesign: !!design,
      designLength: design?.length,
      designPreview: design?.substring(0, 50) + '...'
    });
    
    if (type === 'front') {
      console.log('Setting front design:', design ? 'Design data received' : 'No design data');
      setFrontDesign(design);
    } else {
      console.log('Setting back design:', design ? 'Design data received' : 'No design data');
      setBackDesign(design);
    }
    
    // Set the active design side to the uploaded design
    setActiveDesignSide(type);
    
    // Force a re-render by triggering state change
    setTimeout(() => {
      console.log('Post-upload state check:', {
        frontDesign: frontDesign ? 'has design' : 'no design',
        backDesign: backDesign ? 'has design' : 'no design'
      });
    }, 100);
  };

  const handleSaveDesign = () => {
    onSaveDesign({
      ...selectedShirt,
      customColor: selectedColor,
      frontDesign,
      backDesign,
      frontPlacement,
      backPlacement,
      savedAt: new Date().toISOString()
    });
  };

  const handlePlacementChange = (placement: DesignPlacement) => {
    if (activeDesignSide === 'front') {
      setFrontPlacement(placement);
    } else {
      setBackPlacement(placement);
    }
  };

  const handleToggleView = () => {
    console.log('Toggling view to:', !showBack ? 'back' : 'front');
    setShowBack(!showBack);
  };

  const handleToggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  const handleShowPositioner = () => {
    setShowPositioner(true);
  };

  const handleBackToUploader = () => {
    setShowPositioner(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ShirtCustomizerHeader shirtName={selectedShirt.name} />

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Design Tools */}
        <div className="lg:col-span-1">
          <CustomizationSidebar
            showPositioner={showPositioner}
            frontDesign={frontDesign}
            backDesign={backDesign}
            activeDesignSide={activeDesignSide}
            frontPlacement={frontPlacement}
            backPlacement={backPlacement}
            onDesignUpload={handleDesignUpload}
            onActiveDesignSideChange={setActiveDesignSide}
            onShowPositioner={handleShowPositioner}
            onBackToUploader={handleBackToUploader}
            onPlacementChange={handlePlacementChange}
          />
        </div>

        {/* Center - 3D Viewer */}
        <div className="lg:col-span-2">
          <ShirtViewer3DPanel
            selectedColor={selectedColor}
            frontDesign={frontDesign}
            backDesign={backDesign}
            frontPlacement={frontPlacement}
            backPlacement={backPlacement}
            showBack={showBack}
            autoRotate={autoRotate}
            onToggleView={handleToggleView}
            onToggleAutoRotate={handleToggleAutoRotate}
            selectedShirt={selectedShirt}
          />
        </div>

        {/* Right Sidebar - Customization Options */}
        <div className="lg:col-span-1">
          <ShirtInfoPanel
            selectedShirt={selectedShirt}
            selectedColor={selectedColor}
            frontDesign={frontDesign}
            backDesign={backDesign}
            activeDesignSide={activeDesignSide}
            showBack={showBack}
            showPositioner={showPositioner}
            onColorChange={setSelectedColor}
            onActiveDesignSideChange={setActiveDesignSide}
            onSaveDesign={handleSaveDesign}
          />
        </div>
      </div>
    </div>
  );
};
