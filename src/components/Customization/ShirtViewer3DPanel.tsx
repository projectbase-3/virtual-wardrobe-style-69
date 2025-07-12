
import React from 'react';
import { RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShirtViewer360 } from '../3D/ShirtViewer360';

interface DesignPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface ShirtViewer3DPanelProps {
  selectedColor: string;
  frontDesign: string | null;
  backDesign: string | null;
  frontPlacement: DesignPlacement;
  backPlacement: DesignPlacement;
  showBack: boolean;
  autoRotate: boolean;
  onToggleView: () => void;
  onToggleAutoRotate: () => void;
}

export const ShirtViewer3DPanel: React.FC<ShirtViewer3DPanelProps> = ({
  selectedColor,
  frontDesign,
  backDesign,
  frontPlacement,
  backPlacement,
  showBack,
  autoRotate,
  onToggleView,
  onToggleAutoRotate
}) => {
  return (
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
              onClick={onToggleView}
              className="gap-2"
            >
              {showBack ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showBack ? 'Show Front' : 'Show Back'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleAutoRotate}
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
  );
};
