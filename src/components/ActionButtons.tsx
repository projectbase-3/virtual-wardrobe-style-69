
import React from 'react';
import { Share2, Download, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  selectedOutfit: any;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ selectedOutfit }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="gap-2">
        <Share2 className="w-4 h-4" />
        Share Look
      </Button>
      <Button variant="outline" className="gap-2">
        <Download className="w-4 h-4" />
        Save Image
      </Button>
      <Button className="col-span-2 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
        <ShoppingCart className="w-4 h-4" />
        Add to Cart - ₹{selectedOutfit.price}
      </Button>
    </div>
  );
};
