
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface FitAnalysisProps {
  selectedSize: string;
}

export const FitAnalysis: React.FC<FitAnalysisProps> = ({ selectedSize }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Chest Fit</span>
          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Length</span>
          <Badge className="bg-green-100 text-green-800">Perfect</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Shoulders</span>
          <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Overall</span>
          <Badge className="bg-green-100 text-green-800">95% Match</Badge>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <p className="text-sm text-gray-600 mb-2">Size Recommendation:</p>
        <p className="text-sm font-medium text-gray-900">
          Based on your measurements, size {selectedSize} is perfect for you!
        </p>
      </div>
    </div>
  );
};
