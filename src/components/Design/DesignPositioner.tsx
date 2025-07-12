
import React from 'react';
import { Move, RotateCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface DesignPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface DesignPositionerProps {
  placement: DesignPlacement;
  onPlacementChange: (placement: DesignPlacement) => void;
  designArea: 'front' | 'back';
  onBackToUploader?: () => void;
}

export const DesignPositioner: React.FC<DesignPositionerProps> = ({
  placement,
  onPlacementChange,
  designArea,
  onBackToUploader
}) => {
  console.log('DesignPositioner render:', { placement, designArea });

  const handlePositionChange = (axis: 'x' | 'y', value: number[]) => {
    const newPlacement = {
      ...placement,
      [axis]: value[0] / 50 // Convert from -100 to 100 slider to -2 to 2 range
    };
    console.log(`${designArea} ${axis} position changed:`, newPlacement);
    onPlacementChange(newPlacement);
  };

  const handleScaleChange = (value: number[]) => {
    const newPlacement = {
      ...placement,
      scale: value[0] / 50 // Convert from 0-200 slider to 0-4 scale range
    };
    console.log(`${designArea} scale changed:`, newPlacement);
    onPlacementChange(newPlacement);
  };

  const handleRotationChange = (value: number[]) => {
    const newPlacement = {
      ...placement,
      rotation: (value[0] / 100) * Math.PI * 2 // Convert to radians
    };
    console.log(`${designArea} rotation changed:`, newPlacement);
    onPlacementChange(newPlacement);
  };

  const resetPosition = () => {
    const resetPlacement = {
      x: 0,
      y: 0.2,
      scale: 1,
      rotation: 0
    };
    console.log(`${designArea} position reset:`, resetPlacement);
    onPlacementChange(resetPlacement);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Move className="w-4 h-4" />
            Position Design - {designArea.charAt(0).toUpperCase() + designArea.slice(1)}
          </div>
          {onBackToUploader && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBackToUploader}
              className="gap-1 text-xs"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Upload
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Horizontal Position */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Horizontal Position</label>
          <Slider
            value={[placement.x * 50]}
            onValueChange={(value) => handlePositionChange('x', value)}
            min={-100}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 text-center">
            {placement.x.toFixed(2)}
          </div>
        </div>

        {/* Vertical Position */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Vertical Position</label>
          <Slider
            value={[placement.y * 50]}
            onValueChange={(value) => handlePositionChange('y', value)}
            min={-100}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 text-center">
            {placement.y.toFixed(2)}
          </div>
        </div>

        {/* Scale */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Size</label>
          <Slider
            value={[placement.scale * 50]}
            onValueChange={handleScaleChange}
            min={10}
            max={200}
            step={5}
            className="w-full"
          />
          <div className="text-xs text-gray-500 text-center">
            {(placement.scale * 100).toFixed(0)}%
          </div>
        </div>

        {/* Rotation */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Rotation</label>
          <Slider
            value={[(placement.rotation / (Math.PI * 2)) * 100]}
            onValueChange={handleRotationChange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 text-center">
            {Math.round((placement.rotation / Math.PI) * 180)}°
          </div>
        </div>

        {/* Reset Button */}
        <Button
          onClick={resetPosition}
          variant="outline"
          size="sm"
          className="w-full gap-2"
        >
          <RotateCw className="w-3 h-3" />
          Reset Position
        </Button>
      </CardContent>
    </Card>
  );
};
