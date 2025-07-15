
import React, { useState, useRef, useEffect } from 'react';
import { Shirt, Heart, Palette, Plus, Upload, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/hooks/use-toast';

interface ShirtModel {
  id: string;
  name: string;
  type: string;
  colors: string[];
  price: number;
  image: string;
  model_url?: string;
  model_type?: string;
  is_3d_model?: boolean;
}

interface ShirtCollection3DProps {
  onShirtSelect: (shirt: ShirtModel) => void;
  userDesign?: string;
}

const defaultShirtModels: ShirtModel[] = [
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
    image: 'https://images.unsplash.com/photo-1583743814966-8936f4ea2?w=400&h=400&fit=crop&auto=format'
  }
];

export const ShirtCollection3D: React.FC<ShirtCollection3DProps> = ({
  onShirtSelect,
  userDesign
}) => {
  const [shirtModels, setShirtModels] = useState<ShirtModel[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [is3DDialogOpen, setIs3DDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newShirt, setNewShirt] = useState({
    name: '',
    type: '',
    colors: ['#ffffff', '#000000'],
    price: 0,
    image: '',
    modelFile: null as File | null,
    modelUrl: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelFileInputRef = useRef<HTMLInputElement>(null);

  // Load shirts from Supabase on component mount
  useEffect(() => {
    const loadShirts = async () => {
      try {
        // First load default shirts if none exist in database
        const { data: existingShirts, error: fetchError } = await supabase
          .from('shirt_designs')
          .select('*')
          .order('created_at', { ascending: true });

        if (fetchError) {
          console.error('Error fetching shirts:', fetchError);
          setShirtModels(defaultShirtModels);
          return;
        }

        if (existingShirts && existingShirts.length > 0) {
          // Convert database format to component format
          const convertedShirts: ShirtModel[] = existingShirts.map(shirt => ({
            id: shirt.id,
            name: shirt.name,
            type: shirt.type,
            colors: shirt.colors || ['#ffffff', '#000000'],
            price: shirt.price,
            image: shirt.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format',
            model_url: shirt.model_url,
            model_type: shirt.model_type,
            is_3d_model: shirt.is_3d_model
          }));
          setShirtModels(convertedShirts);
        } else {
          // No shirts in database, insert defaults
          const { error: insertError } = await supabase
            .from('shirt_designs')
            .insert(defaultShirtModels.map(shirt => ({
              id: shirt.id,
              name: shirt.name,
              type: shirt.type,
              colors: shirt.colors,
              price: shirt.price,
              image_url: shirt.image
            })));

          if (insertError) {
            console.error('Error inserting default shirts:', insertError);
          }
          setShirtModels(defaultShirtModels);
        }
      } catch (error) {
        console.error('Error loading shirts:', error);
        setShirtModels(defaultShirtModels);
      } finally {
        setLoading(false);
      }
    };

    loadShirts();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setNewShirt({ ...newShirt, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const open3DFileDialog = () => {
    modelFileInputRef.current?.click();
  };

  const handle3DModelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
      try {
        // Upload file to Supabase storage
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('3d-models')
          .upload(fileName, file);

        if (error) {
          console.error('Error uploading 3D model:', error);
          toast({
            title: "Error",
            description: "Failed to upload 3D model. Please try again.",
            variant: "destructive",
          });
          return;
        }

        // Get public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from('3d-models')
          .getPublicUrl(fileName);

        setNewShirt({ 
          ...newShirt, 
          modelFile: file,
          modelUrl: urlData.publicUrl
        });

        toast({
          title: "Success",
          description: "3D model uploaded successfully!",
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Error",
          description: "Failed to upload 3D model. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a .glb or .gltf file.",
        variant: "destructive",
      });
    }
  };

  const handleAddShirt = async () => {
    if (newShirt.name && newShirt.type && newShirt.price > 0) {
      try {
        // Save to Supabase
        const { data, error } = await supabase
          .from('shirt_designs')
          .insert({
            name: newShirt.name,
            type: newShirt.type,
            colors: newShirt.colors,
            price: newShirt.price,
            image_url: newShirt.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format',
            model_url: newShirt.modelUrl || null,
            model_type: newShirt.modelUrl ? '3d' : '2d',
            is_3d_model: !!newShirt.modelUrl
          })
          .select()
          .single();

        if (error) {
          console.error('Error saving shirt:', error);
          toast({
            title: "Error",
            description: "Failed to save shirt design. Please try again.",
            variant: "destructive",
          });
          return;
        }

        // Convert database format to component format
        const newShirtModel: ShirtModel = {
          id: data.id,
          name: data.name,
          type: data.type,
          colors: data.colors || ['#ffffff', '#000000'],
          price: data.price,
          image: data.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format',
          model_url: data.model_url,
          model_type: data.model_type,
          is_3d_model: data.is_3d_model
        };
        
        setShirtModels([...shirtModels, newShirtModel]);
        setNewShirt({ name: '', type: '', colors: ['#ffffff', '#000000'], price: 0, image: '', modelFile: null, modelUrl: '' });
        setIsDialogOpen(false);
        
        toast({
          title: "Success",
          description: "Shirt design added to gallery!",
        });
      } catch (error) {
        console.error('Error adding shirt:', error);
        toast({
          title: "Error",
          description: "Failed to add shirt design. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAdd3DShirt = async () => {
    try {
      // Create a 3D shirt entry with default values
      const { data, error } = await supabase
        .from('shirt_designs')
        .insert({
          name: 'Custom 3D Shirt',
          type: '3D Model',
          colors: ['#ffffff', '#000000', '#3b82f6'],
          price: 2999,
          image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format'
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving 3D shirt:', error);
        toast({
          title: "Error",
          description: "Failed to create 3D shirt. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const new3DShirt: ShirtModel = {
        id: data.id,
        name: data.name,
        type: data.type,
        colors: data.colors || ['#ffffff', '#000000'],
        price: data.price,
        image: data.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&auto=format',
        model_url: data.model_url,
        model_type: data.model_type,
        is_3d_model: data.is_3d_model
      };
      
      setShirtModels([...shirtModels, new3DShirt]);
      setIs3DDialogOpen(false);
      
      // Automatically select the new 3D shirt for customization
      onShirtSelect(new3DShirt);
      
      toast({
        title: "Success",
        description: "3D shirt created and ready for customization!",
      });
    } catch (error) {
      console.error('Error adding 3D shirt:', error);
      toast({
        title: "Error",
        description: "Failed to create 3D shirt. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Shirt Model</h2>
        <p className="text-lg text-gray-600">
          Select from our collection of 3D shirt models to customize with your design
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Shirt Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Shirt Type</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newShirt.name}
                  onChange={(e) => setNewShirt({ ...newShirt, name: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Premium Hoodie"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  value={newShirt.type}
                  onChange={(e) => setNewShirt({ ...newShirt, type: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., Hoodie"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (₹)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newShirt.price}
                  onChange={(e) => setNewShirt({ ...newShirt, price: parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                  placeholder="e.g., 2500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3 space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={openFileDialog}
                    className="w-full gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </Button>
                  {newShirt.image && (
                    <div className="relative">
                      <img
                        src={newShirt.image}
                        alt="Preview"
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setNewShirt({ ...newShirt, image: '' })}
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
              
              {/* 3D Model Upload Section */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model" className="text-right">
                  3D Model
                </Label>
                <div className="col-span-3 space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={open3DFileDialog}
                    className="w-full gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload 3D Model (.glb/.gltf)
                  </Button>
                  {newShirt.modelFile && (
                    <div className="relative p-2 bg-gray-50 rounded border">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-600">
                          {newShirt.modelFile.name}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewShirt({ ...newShirt, modelFile: null })}
                          className="h-6 w-6 p-0 ml-auto"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  )}
                  <input
                    ref={modelFileInputRef}
                    type="file"
                    accept=".glb,.gltf"
                    onChange={handle3DModelUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500">
                    Upload .glb or .gltf files for 3D shirt models
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddShirt}>
                Add Shirt
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shirtModels.map((shirt) => (
          <Card key={shirt.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {shirt.name}
                    {shirt.is_3d_model && (
                      <Box className="w-4 h-4 text-purple-600" />
                    )}
                  </CardTitle>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">
                      {shirt.type}
                    </Badge>
                    {shirt.is_3d_model && (
                      <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                        3D Model
                      </Badge>
                    )}
                  </div>
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

      {/* Add 3D Shirt Option at Bottom */}
      <div className="flex justify-center mt-8">
        <Dialog open={is3DDialogOpen} onOpenChange={setIs3DDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-4 text-lg"
            >
              <Box className="w-6 h-6" />
              Create 3D Shirt
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create 3D Shirt Model</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Box className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Ready to Create Your 3D Shirt?</h3>
                  <p className="text-gray-600 mt-2">
                    This will create a customizable 3D shirt model that you can view and modify in our 3D editor.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900">Features included:</h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• 360° rotation view</li>
                    <li>• Real-time design preview</li>
                    <li>• Multiple color options</li>
                    <li>• Custom texture mapping</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIs3DDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAdd3DShirt}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Create 3D Shirt
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
