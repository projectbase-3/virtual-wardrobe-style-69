
import React, { useState } from 'react';
import { Palette, Shirt, RotateCcw, Heart, ShoppingBag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DesignUploader } from '@/components/Design/DesignUploader';
import { ShirtCollection3D } from '@/components/3D/ShirtCollection3D';
import { ShirtCustomizer } from '@/components/Customization/ShirtCustomizer';
import { FavoriteOutfits } from '@/components/FavoriteOutfits';
import { UserProfile } from '@/components/UserProfile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('shirts');
  const [selectedShirt, setSelectedShirt] = useState<any>(null);
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);

  const handleShirtSelect = (shirt: any) => {
    setSelectedShirt(shirt);
    setActiveTab('customize');
  };

  const handleSaveDesign = (design: any) => {
    setSavedDesigns(prev => [...prev, { ...design, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Custom Shirt Designer
                </h1>
                <p className="text-sm text-gray-600">Professional 3D Design Studio</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <ShoppingBag className="w-4 h-4" />
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="shirts" className="gap-2">
              <Shirt className="w-4 h-4" />
              Select Shirt
            </TabsTrigger>
            <TabsTrigger value="customize" className="gap-2">
              <Palette className="w-4 h-4" />
              Design & Customize
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="w-4 h-4" />
              Saved Designs
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Shirt className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shirts" className="space-y-6">
            <ShirtCollection3D onShirtSelect={handleShirtSelect} />
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            <ShirtCustomizer 
              selectedShirt={selectedShirt}
              onSaveDesign={handleSaveDesign}
            />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <FavoriteOutfits favorites={savedDesigns} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Custom Shirt Designer - Professional 3D Design Platform</p>
            <p className="text-sm">Upload your designs and see them come to life on realistic 3D shirt models</p>
            <p className="text-xs mt-2 text-gray-500">All prices are in Indian Rupees (₹)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
