
import React, { useState } from 'react';
import { RotateCcw, Palette, Download, ShoppingCart, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShirtViewer360 } from '../3D/ShirtViewer360';
import { DesignUploader } from '../Design/DesignUploader';
import { DesignPositioner } from '../Design/DesignPositioner';

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
      setFrontDesign(design);
      console.log('Front design state updated:', design ? 'Design set' : 'Design cleared');
    } else {
      setBackDesign(design);
      console.log('Back design state updated:', design ? 'Design set' : 'Design cleared');
    }
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

  // Debug current state
  console.log('ShirtCustomizer render state:', {
    frontDesign: frontDesign ? 'has design' : 'no design',
    backDesign: backDesign ? 'has design' : 'no design',
    showBack,
    selectedColor,
    frontDesignType: typeof frontDesign,
    backDesignType: typeof backDesign
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Design Your {selectedShirt.name}</h2>
        <p className="text-lg text-gray-600">Upload your designs and position them perfectly</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Design Tools */}
        <div className="lg:col-span-1 space-y-4">
          <DesignUploader
            onDesignUpload={handleDesignUpload}
            frontDesign={frontDesign}
            backDesign={backDesign}
          />
          
          {/* Design Positioning */}
          {(frontDesign || backDesign) && (
            <DesignPositioner
              placement={showBack ? backPlacement : frontPlacement}
              onPlacementChange={showBack ? setBackPlacement : setFrontPlacement}
              designArea={showBack ? 'back' : 'front'}
            />
          )}
        </div>

        {/* Center - 3D Viewer */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  3D Preview
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={showBack ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowBack(!showBack)}
                    className="gap-2"
                  >
                    {showBack ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showBack ? 'Show Front' : 'Show Back'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAutoRotate(!autoRotate)}
                  >
                    {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ShirtViewer360
                shirtColor={selectedColor}
                frontDesign={frontDesign}
                backDesign={backDesign}
                frontPlacement={frontPlacement}
                backPlacement={backPlacement}
                showBack={showBack}
                autoRotate={autoRotate}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Customization Options */}
        <div className="lg:col-span-1 space-y-4">
          {/* Shirt Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">{selectedShirt.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold text-gray-900">
                ₹{selectedShirt.price}
              </div>
              
              {/* Color Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Shirt Color</label>
                <div className="flex gap-2 flex-wrap">
                  {selectedShirt.colors.map((color: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Design Previews */}
              {(frontDesign || backDesign) && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Your Designs</label>
                  <div className="flex gap-2">
                    {frontDesign && (
                      <div className="text-center">
                        <img
                          src={frontDesign}
                          alt="Front design"
                          className="w-12 h-12 object-contain bg-white rounded border"
                        />
                        <span className="text-xs text-gray-600">Front</span>
                      </div>
                    )}
                    {backDesign && (
                      <div className="text-center">
                        <img
                          src={backDesign}
                          alt="Back design"
                          className="w-12 h-12 object-contain bg-white rounded border"
                        />
                        <span className="text-xs text-gray-600">Back</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleSaveDesign}
              className="w-full gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Download className="w-4 h-4" />
              Save Design
            </Button>
            <Button 
              className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <ShoppingCart className="w-4 h-4" />
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
