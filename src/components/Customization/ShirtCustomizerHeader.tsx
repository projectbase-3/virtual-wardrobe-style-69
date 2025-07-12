
import React from 'react';

interface ShirtCustomizerHeaderProps {
  shirtName: string;
}

export const ShirtCustomizerHeader: React.FC<ShirtCustomizerHeaderProps> = ({ 
  shirtName 
}) => {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold text-gray-900">Design Your {shirtName}</h2>
      <p className="text-lg text-gray-600">Upload your designs and position them perfectly</p>
    </div>
  );
};
