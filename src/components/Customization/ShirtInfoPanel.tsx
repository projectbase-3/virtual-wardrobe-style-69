
import React from 'react';
import { Download, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DesignPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface ShirtInfoPanelProps {
  selectedShirt: any;
  selectedColor: string;
  frontDesign: string | null;
  backDesign: string | null;
  activeDesignSide: 'front' | 'back';
  showBack: boolean;
  showPositioner: boolean;
  onColorChange: (color: string) => void;
  onActiveDesignSideChange: (side: 'front' | 'back') => void;
  onSaveDesign: () => void;
}

export const ShirtInfoPanel: React.FC<ShirtInfoPanelProps> = ({
  selectedShirt,
  selectedColor,
  frontDesign,
  backDesign,
  activeDesignSide,
  showBack,
  showPositioner,
  onColorChange,
  onActiveDesignSideChange,
  onSaveDesign
}) => {
  return (
    <div className="space-y-4">
      {/* Shirt Information */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">{selectedShirt.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold text-gray-900">
            ₹{selectedShirt.price?.toLocaleString('en-IN')}
          </div>
          
          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Shirt Color</label>
            <div className="flex gap-2 flex-wrap">
              {selectedShirt.colors.map((color: string, index: number) => (
                <button
                  key={index}
                  onClick={() => onColorChange(color)}
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

          {/* Active Design Side Selector */}
          {(frontDesign || backDesign) && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Edit Design</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={activeDesignSide === 'front' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onActiveDesignSideChange('front')}
                  disabled={!frontDesign}
                  className="gap-2"
                >
                  Front {frontDesign && '✓'}
                </Button>
                <Button
                  variant={activeDesignSide === 'back' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onActiveDesignSideChange('back')}
                  disabled={!backDesign}
                  className="gap-2"
                >
                  Back {backDesign && '✓'}
                </Button>
              </div>
            </div>
          )}

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

          {/* Debug Info */}
          {(frontDesign || backDesign) && (
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              <p>Debug: Front {frontDesign ? '✓' : '✗'}, Back {backDesign ? '✓' : '✗'}</p>
              <p>View: {showBack ? 'Back' : 'Front'}</p>
              <p>Editing: {activeDesignSide}</p>
              <p>Mode: {showPositioner ? 'Position' : 'Upload'}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onSaveDesign}
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
  );
};
