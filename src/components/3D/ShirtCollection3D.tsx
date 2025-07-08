
import React from 'react';
import { Shirt, Heart, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ShirtModel {
  id: string;
  name: string;
  type: string;
  colors: string[];
  price: number;
  image: string;
}

interface ShirtCollection3DProps {
  onShirtSelect: (shirt: ShirtModel) => void;
  userDesign?: string;
}

const shirtModels: ShirtModel[] = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    type: 'Crew Neck',
    colors: ['#ffffff', '#000000', '#3b82f6', '#ef4444', '#10b981'],
    price: 1659,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format'
  },
  {
    id: '2',
    name: 'V-Neck Tee',
    type: 'V-Neck',
    colors: ['#ffffff', '#6b7280', '#8b5cf6', '#f59e0b'],
    price: 1909,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&auto=format'
  },
  {
    id: '3',
    name: 'Long Sleeve',
    type: 'Long Sleeve',
    colors: ['#ffffff', '#000000', '#1f2937', '#7c3aed'],
    price: 2324,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop&auto=format'
  },
  {
    id: '4',
    name: 'Premium Polo',
    type: 'Polo Shirt',
    colors: ['#ffffff', '#1e40af', '#059669', '#dc2626'],
    price: 2904,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&auto=format'
  },
  {
    id: '5',
    name: 'Cozy Hoodie',
    type: 'Hoodie',
    colors: ['#6b7280', '#000000', '#1f2937', '#7c2d12'],
    price: 4154,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&auto=format'
  },
  {
    id: '6',
    name: 'Tank Top',
    type: 'Tank Top',
    colors: ['#ffffff', '#000000', '#f59e0b', '#ef4444'],
    price: 1410,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4ea2?w=400&h=400&fit=crop&auto=format'
  }
];

export const ShirtCollection3D: React.FC<ShirtCollection3DProps> = ({
  onShirtSelect,
  userDesign
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Shirt Model</h2>
        <p className="text-lg text-gray-600">
          Select from our collection of 3D shirt models to customize with your design
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shirtModels.map((shirt) => (
          <Card key={shirt.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{shirt.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {shirt.type}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Shirt Preview */}
              <div className="aspect-square bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={shirt.image} 
                  alt={shirt.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center">
                  <Shirt className="w-20 h-20 text-gray-400" />
                </div>
              </div>
              
              {/* Color Options */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Available Colors</p>
                <div className="flex gap-2">
                  {shirt.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Price and Action */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-2xl font-bold text-gray-900">₹{shirt.price.toLocaleString('en-IN')}</span>
                <Button 
                  onClick={() => onShirtSelect(shirt)}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Palette className="w-4 h-4" />
                  Customize
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!userDesign && (
        <div className="text-center p-8 bg-blue-50 rounded-lg">
          <p className="text-blue-700 font-medium">
            💡 Tip: Upload your design first to see it applied to these shirt models!
          </p>
        </div>
      )}
    </div>
  );
};
