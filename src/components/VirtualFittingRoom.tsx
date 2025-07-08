
import React, { useState } from 'react';
import { ZoomIn, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VirtualMirror } from './VirtualMirror';
import { FittingControls } from './FittingControls';
import { OutfitDetails } from './OutfitDetails';
import { FitAnalysis } from './FitAnalysis';
import { ActionButtons } from './ActionButtons';

interface VirtualFittingRoomProps {
  userPhoto: string | null;
  selectedOutfit: any;
  onSaveFavorite: (outfit: any) => void;
}

export const VirtualFittingRoom: React.FC<VirtualFittingRoomProps> = ({
  userPhoto,
  selectedOutfit,
  onSaveFavorite
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(selectedOutfit?.colors?.[0] || 'white');

  const handleRotate = () => {
    setRotationAngle(prev => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleSaveFavorite = () => {
    if (selectedOutfit) {
      onSaveFavorite({
        ...selectedOutfit,
        size: selectedSize,
        color: selectedColor,
        savedAt: new Date().toISOString()
      });
    }
  };

  if (!userPhoto) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <ZoomIn className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Photo First</h3>
                <p className="text-gray-600">Please upload your photo to start the virtual fitting experience</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedOutfit) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Outfit to Try</h3>
                <p className="text-gray-600">Browse the wardrobe and select an item to see how it looks on you</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Virtual Fitting Room</h2>
        <p className="text-lg text-gray-600">See how you look in {selectedOutfit.name}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Virtual Mirror */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ZoomIn className="w-5 h-5 text-blue-600" />
                  Virtual Mirror
                </CardTitle>
                <FittingControls
                  zoomLevel={zoomLevel}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onRotate={handleRotate}
                  onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <VirtualMirror
                userPhoto={userPhoto}
                selectedOutfit={selectedOutfit}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                zoomLevel={zoomLevel}
                rotationAngle={rotationAngle}
              />
            </CardContent>
          </Card>
        </div>

        {/* Outfit Details & Controls */}
        <div className="space-y-6">
          {/* Outfit Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedOutfit.name}</span>
                <Button variant="ghost" size="sm" onClick={handleSaveFavorite}>
                  <Heart className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OutfitDetails
                selectedOutfit={selectedOutfit}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeSelect={setSelectedSize}
                onColorSelect={setSelectedColor}
                onSaveFavorite={handleSaveFavorite}
              />
            </CardContent>
          </Card>

          {/* Fit Analysis */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Fit Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <FitAnalysis selectedSize={selectedSize} />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <ActionButtons selectedOutfit={selectedOutfit} />
        </div>
      </div>
    </div>
  );
};
