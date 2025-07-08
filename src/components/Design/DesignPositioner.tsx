
import React, { useState } from 'react';
import { Move, RotateCw, Maximize, Minimize } from 'lucide-react';
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
}

export const DesignPositioner: React.FC<DesignPositionerProps> = ({
  placement,
  onPlacementChange,
  designArea
}) => {
  const handlePositionChange = (axis: 'x' | 'y', value: number[]) => {
    onPlacementChange({
      ...placement,
      [axis]: value[0] / 100 // Convert from 0-100 to -1 to 1
    });
  };

  const handleScaleChange = (value: number[]) => {
    onPlacementChange({
      ...placement,
      scale: value[0] / 100 // Convert from 0-100 to 0-2
    });
  };

  const handleRotationChange = (value: number[]) => {
    onPlacementChange({
      ...placement,
      rotation: (value[0] / 100) * Math.PI * 2 // Convert to radians
    });
  };

  const resetPosition = () => {
    onPlacementChange({
      x: 0,
      y: 0.2,
      scale: 1,
      rotation: 0
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Move className="w-4 h-4" />
          Position Design - {designArea.charAt(0).toUpperCase() + designArea.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Horizontal Position */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Horizontal</label>
          <Slider
            value={[placement.x * 100]}
            onValueChange={(value) => handlePositionChange('x', value)}
            min={-50}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        {/* Vertical Position */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Vertical</label>
          <Slider
            value={[placement.y * 100]}
            onValueChange={(value) => handlePositionChange('y', value)}
            min={-50}
            max={80}
            step={1}
            className="w-full"
          />
        </div>

        {/* Scale */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Size</label>
          <Slider
            value={[placement.scale * 100]}
            onValueChange={handleScaleChange}
            min={20}
            max={200}
            step={5}
            className="w-full"
          />
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
