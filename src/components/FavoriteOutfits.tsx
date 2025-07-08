
import React, { useState } from 'react';
import { Heart, Share2, ShoppingCart, Eye, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FavoriteOutfitsProps {
  favorites: any[];
}

export const FavoriteOutfits: React.FC<FavoriteOutfitsProps> = ({ favorites }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Favorites' },
    { id: 'tshirt', name: 'T-Shirts' },
    { id: 'shirt', name: 'Shirts' }
  ];

  const filteredFavorites = selectedCategory === 'all' 
    ? favorites 
    : favorites.filter(item => item.category === selectedCategory);

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
                <p className="text-gray-600">Start exploring the wardrobe and save your favorite outfits!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Your Favorite Outfits</h2>
        <p className="text-lg text-gray-600">Your saved looks and favorite combinations</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFavorites.map(favorite => (
          <Card key={favorite.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={favorite.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'}
                  alt={favorite.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="flex-1 gap-2 bg-white/90 text-gray-900 hover:bg-white">
                    <Eye className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{favorite.name}</h3>
                    <p className="text-sm text-gray-600">
                      Saved on {new Date(favorite.savedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {favorite.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">₹{favorite.price}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Size: {favorite.size}</Badge>
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        favorite.color === 'white' ? 'bg-white border-gray-300' :
                        favorite.color === 'black' ? 'bg-black' :
                        favorite.color === 'gray' ? 'bg-gray-400' :
                        favorite.color === 'blue' ? 'bg-blue-500' :
                        favorite.color === 'navy' ? 'bg-blue-900' :
                        favorite.color === 'red' ? 'bg-red-500' :
                        'bg-gray-300'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
