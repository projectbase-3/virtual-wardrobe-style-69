
import React, { useState } from 'react';
import { Palette, Shirt, Heart } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Header } from '@/components/Navigation/Header';
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
      {/* Header with Navigation */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="shirts" className="space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Choose Your Shirt</h2>
              <p className="text-lg text-gray-600">Select from our premium collection</p>
            </div>
            <ShirtCollection3D onShirtSelect={handleShirtSelect} />
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            <ShirtCustomizer 
              selectedShirt={selectedShirt}
              onSaveDesign={handleSaveDesign}
            />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Your Saved Designs</h2>
              <p className="text-lg text-gray-600">View and manage your favorite creations</p>
            </div>
            <FavoriteOutfits favorites={savedDesigns} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
              <p className="text-lg text-gray-600">Manage your account and preferences</p>
            </div>
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
