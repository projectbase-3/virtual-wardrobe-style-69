
import React, { useState } from 'react';
import { Shirt, Filter, Grid, List, Heart, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ClothingCollectionProps {
  onOutfitSelect: (outfit: any) => void;
  userPhoto: string | null;
}

export const ClothingCollection: React.FC<ClothingCollectionProps> = ({
  onOutfitSelect,
  userPhoto
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  // Mock clothing data with actual image URLs
  const clothingItems = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      category: 'tshirt',
      price: 899,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      description: 'Premium cotton basic white tee',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['white', 'black', 'gray', 'navy']
    },
    {
      id: 2,
      name: 'Blue Denim Shirt',
      category: 'shirt',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
      description: 'Casual denim button-down shirt',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['blue', 'black', 'white']
    },
    {
      id: 3,
      name: 'Graphic Print Tee',
      category: 'tshirt',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4dta?w=400&h=400&fit=crop',
      description: 'Trendy graphic printed t-shirt',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'white', 'gray']
    },
    {
      id: 4,
      name: 'Formal White Shirt',
      category: 'shirt',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
      description: 'Crisp formal white dress shirt',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['white', 'light blue', 'pink']
    },
    {
      id: 5,
      name: 'Striped Polo Shirt',
      category: 'shirt',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
      description: 'Classic striped polo shirt',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['navy', 'white', 'red']
    },
    {
      id: 6,
      name: 'Vintage Band Tee',
      category: 'tshirt',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1503341338740-0c7c1e0e4e49?w=400&h=400&fit=crop',
      description: 'Retro vintage band t-shirt',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['black', 'gray', 'white']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', count: clothingItems.length },
    { id: 'tshirt', name: 'T-Shirts', count: clothingItems.filter(item => item.category === 'tshirt').length },
    { id: 'shirt', name: 'Shirts', count: clothingItems.filter(item => item.category === 'shirt').length }
  ];

  const filteredItems = activeCategory === 'all' 
    ? clothingItems 
    : clothingItems.filter(item => item.category === activeCategory);

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleTryOn = (item: any) => {
    onOutfitSelect(item);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Your Virtual Wardrobe</h2>
        <p className="text-lg text-gray-600">Explore our curated collection of premium clothing</p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="gap-2"
            >
              <Shirt className="w-4 h-4" />
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Clothing Grid */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredItems.map(item => (
          <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    className="flex-1 gap-2 bg-white/90 text-gray-900 hover:bg-white"
                    onClick={() => handleTryOn(item)}
                  >
                    <Eye className="w-4 h-4" />
                    Try On
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {item.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                  <div className="flex gap-1">
                    {item.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full border ${
                          color === 'white' ? 'bg-white border-gray-300' :
                          color === 'black' ? 'bg-black' :
                          color === 'gray' ? 'bg-gray-400' :
                          color === 'blue' ? 'bg-blue-500' :
                          color === 'navy' ? 'bg-blue-900' :
                          color === 'red' ? 'bg-red-500' :
                          color === 'light blue' ? 'bg-blue-300' :
                          color === 'pink' ? 'bg-pink-300' :
                          'bg-gray-300'
                        }`}
                      />
                    ))}
                    {item.colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{item.colors.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex gap-1">
                    {item.sizes.slice(0, 4).map(size => (
                      <Badge key={size} variant="outline" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" className="gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!userPhoto && (
        <Card className="bg-blue-50/80 backdrop-blur-sm border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Ready to Try On?</h3>
                <p className="text-blue-700">Upload your photo first to see how these clothes look on you!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
