
import React from 'react';
import { RotateCcw, Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FittingControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onToggleFullscreen: () => void;
}

export const FittingControls: React.FC<FittingControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onRotate,
  onToggleFullscreen
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={onZoomOut}>
        <ZoomOut className="w-4 h-4" />
      </Button>
      <span className="text-sm text-gray-600 min-w-12">{zoomLevel}%</span>
      <Button variant="outline" size="sm" onClick={onZoomIn}>
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={onRotate}>
        <RotateCcw className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={onToggleFullscreen}>
        <Maximize className="w-4 h-4" />
      </Button>
    </div>
  );
};
