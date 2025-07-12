
import React from 'react';
import { Type, Shapes } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickToolsSectionProps {
  activeArea: 'front' | 'back';
  onShowTextCreator: () => void;
  onShowArtCreator: () => void;
}

export const QuickToolsSection: React.FC<QuickToolsSectionProps> = ({
  activeArea,
  onShowTextCreator,
  onShowArtCreator
}) => {
  return (
    <div className="border-t pt-4 space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Quick Tools</h4>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={onShowTextCreator}
        >
          <Type className="w-3 h-3" />
          Add Text
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={onShowArtCreator}
        >
          <Shapes className="w-3 h-3" />
          Add Art
        </Button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Adding to: {activeArea.charAt(0).toUpperCase() + activeArea.slice(1)} side
      </p>
    </div>
  );
};
