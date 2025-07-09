
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Palette, Sparkles, Type, Shapes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextCreator } from './TextCreator';
import { ArtCreator } from './ArtCreator';

interface DesignUploaderProps {
  onDesignUpload: (design: string, type: 'front' | 'back') => void;
  frontDesign?: string | null;
  backDesign?: string | null;
}

export const DesignUploader: React.FC<DesignUploaderProps> = ({ 
  onDesignUpload, 
  frontDesign,
  backDesign 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [activeArea, setActiveArea] = useState<'front' | 'back'>('front');
  const [showTextCreator, setShowTextCreator] = useState(false);
  const [showArtCreator, setShowArtCreator] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onDesignUpload(result, activeArea);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleTextCreated = (textImage: string) => {
    onDesignUpload(textImage, activeArea);
    setShowTextCreator(false);
  };

  const handleArtCreated = (artImage: string) => {
    onDesignUpload(artImage, activeArea);
    setShowArtCreator(false);
  };

  const currentDesign = activeArea === 'front' ? frontDesign : backDesign;

  // Show text or art creator
  if (showTextCreator) {
    return (
      <TextCreator
        onTextCreated={handleTextCreated}
        onClose={() => setShowTextCreator(false)}
      />
    );
  }

  if (showArtCreator) {
    return (
      <ArtCreator
        onArtCreated={handleArtCreated}
        onClose={() => setShowArtCreator(false)}
      />
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-center justify-center">
          <Palette className="w-5 h-5 text-blue-600" />
          Design Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeArea} onValueChange={(value) => setActiveArea(value as 'front' | 'back')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="front">Front Design</TabsTrigger>
            <TabsTrigger value="back">Back Design</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeArea} className="space-y-4 mt-4">
            {!currentDesign ? (
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Add {activeArea} design
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm">
                      PNG, JPG, or SVG files work best
                    </p>
                    <Button onClick={openFileDialog} className="gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Upload Design
                    </Button>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <img
                    src={currentDesign}
                    alt={`${activeArea} design`}
                    className="w-24 h-24 object-contain mx-auto rounded-lg shadow-lg bg-white p-2"
                  />
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      <span className="text-green-700 font-medium text-sm">
                        {activeArea.charAt(0).toUpperCase() + activeArea.slice(1)} design uploaded!
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={openFileDialog}
                      className="gap-2"
                    >
                      <Upload className="w-3 h-3" />
                      Change Design
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Design Tools */}
        <div className="border-t pt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Quick Tools</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowTextCreator(true)}
            >
              <Type className="w-3 h-3" />
              Add Text
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowArtCreator(true)}
            >
              <Shapes className="w-3 h-3" />
              Add Art
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
