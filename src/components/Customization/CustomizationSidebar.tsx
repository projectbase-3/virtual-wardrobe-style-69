
import React from 'react';
import { DesignUploader } from '../Design/DesignUploader';
import { DesignPositioner } from '../Design/DesignPositioner';

interface DesignPlacement {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface CustomizationSidebarProps {
  showPositioner: boolean;
  frontDesign: string | null;
  backDesign: string | null;
  activeDesignSide: 'front' | 'back';
  frontPlacement: DesignPlacement;
  backPlacement: DesignPlacement;
  onDesignUpload: (design: string, type: 'front' | 'back') => void;
  onActiveDesignSideChange: (side: 'front' | 'back') => void;
  onShowPositioner: () => void;
  onBackToUploader: () => void;
  onPlacementChange: (placement: DesignPlacement) => void;
}

export const CustomizationSidebar: React.FC<CustomizationSidebarProps> = ({
  showPositioner,
  frontDesign,
  backDesign,
  activeDesignSide,
  frontPlacement,
  backPlacement,
  onDesignUpload,
  onActiveDesignSideChange,
  onShowPositioner,
  onBackToUploader,
  onPlacementChange
}) => {
  const getCurrentPlacement = () => {
    return activeDesignSide === 'front' ? frontPlacement : backPlacement;
  };

  return (
    <div className="space-y-4">
      {!showPositioner ? (
        <DesignUploader
          onDesignUpload={onDesignUpload}
          frontDesign={frontDesign}
          backDesign={backDesign}
          onActiveDesignSideChange={onActiveDesignSideChange}
          onShowPositioner={onShowPositioner}
        />
      ) : (
        <DesignPositioner
          placement={getCurrentPlacement()}
          onPlacementChange={onPlacementChange}
          designArea={activeDesignSide}
          onBackToUploader={onBackToUploader}
        />
      )}
    </div>
  );
};
