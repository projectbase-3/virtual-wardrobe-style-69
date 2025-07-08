
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OutfitDetailsProps {
  selectedOutfit: any;
  selectedSize: string;
  selectedColor: string;
  onSizeSelect: (size: string) => void;
  onColorSelect: (color: string) => void;
  onSaveFavorite: () => void;
}

export const OutfitDetails: React.FC<OutfitDetailsProps> = ({
  selectedOutfit,
  selectedSize,
  selectedColor,
  onSizeSelect,
  onColorSelect,
  onSaveFavorite
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">₹{selectedOutfit.price}</span>
        <Badge variant="secondary" className="capitalize">
          {selectedOutfit.category}
        </Badge>
      </div>
      
      <p className="text-gray-600">{selectedOutfit.description}</p>

      {/* Size Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Size</label>
        <div className="flex gap-2 flex-wrap">
          {selectedOutfit.sizes?.map((size: string) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              size="sm"
              onClick={() => onSizeSelect(size)}
              className="min-w-12"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Color</label>
        <div className="flex gap-2 flex-wrap">
          {selectedOutfit.colors?.map((color: string) => (
            <button
              key={color}
              onClick={() => onColorSelect(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor === color ? 'border-blue-500 border-4' : 'border-gray-300'
              } ${
                color === 'white' ? 'bg-white' :
                color === 'black' ? 'bg-black' :
                color === 'gray' ? 'bg-gray-400' :
                color === 'blue' ? 'bg-blue-500' :
                color === 'navy' ? 'bg-blue-900' :
                color === 'red' ? 'bg-red-500' :
                color === 'green' ? 'bg-green-500' :
                color === 'pink' ? 'bg-pink-500' :
                color === 'light blue' ? 'bg-blue-300' :
                'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
