
import React from 'react';
import { Sparkles } from 'lucide-react';

interface DesignPreviewProps {
  design: string;
  activeArea: 'front' | 'back';
}

export const DesignPreview: React.FC<DesignPreviewProps> = ({
  design,
  activeArea
}) => {
  return (
    <div className="space-y-3">
      <img
        src={design}
        alt={`${activeArea} design`}
        className="w-20 h-20 object-contain mx-auto rounded-lg shadow-lg bg-white p-2"
      />
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-green-500" />
        <span className="text-green-700 font-medium text-sm">
          {activeArea.charAt(0).toUpperCase() + activeArea.slice(1)} design uploaded!
        </span>
      </div>
    </div>
  );
};
