
import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextCreator } from './TextCreator';
import { ArtCreator } from './ArtCreator';
import { DesignDropZone } from './DesignDropZone';
import { DesignPreview } from './DesignPreview';
import { QuickToolsSection } from './QuickToolsSection';

interface DesignUploaderProps {
  onDesignUpload: (design: string, type: 'front' | 'back') => void;
  frontDesign?: string | null;
  backDesign?: string | null;
  onActiveDesignSideChange?: (side: 'front' | 'back') => void;
  onShowPositioner?: () => void;
}

export const DesignUploader: React.FC<DesignUploaderProps> = ({ 
  onDesignUpload, 
  frontDesign,
  backDesign,
  onActiveDesignSideChange,
  onShowPositioner
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [activeArea, setActiveArea] = useState<'front' | 'back'>('front');
  const [showTextCreator, setShowTextCreator] = useState(false);
  const [showArtCreator, setShowArtCreator] = useState(false);

  const handleAreaChange = (value: string) => {
    const area = value as 'front' | 'back';
    setActiveArea(area);
    onActiveDesignSideChange?.(area);
  };

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

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log('File uploaded for:', activeArea, 'Size:', result.length);
        onDesignUpload(result, activeArea);
        
        // Auto-switch to position design section after upload
        setTimeout(() => {
          onShowPositioner?.();
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextCreated = (textImage: string) => {
    console.log('Text created for:', activeArea, 'Size:', textImage.length);
    onDesignUpload(textImage, activeArea);
    setShowTextCreator(false);
    
    // Auto-switch to position design section after creating text
    setTimeout(() => {
      onShowPositioner?.();
    }, 500);
  };

  const handleArtCreated = (artImage: string) => {
    console.log('Art created for:', activeArea, 'Size:', artImage.length);
    onDesignUpload(artImage, activeArea);
    setShowArtCreator(false);
    
    // Auto-switch to position design section after creating art
    setTimeout(() => {
      onShowPositioner?.();
    }, 500);
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
        <Tabs value={activeArea} onValueChange={handleAreaChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="front" className="gap-2">
              Front {frontDesign && <span className="text-green-500">✓</span>}
            </TabsTrigger>
            <TabsTrigger value="back" className="gap-2">
              Back {backDesign && <span className="text-green-500">✓</span>}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeArea} className="space-y-4 mt-4">
            {currentDesign ? (
              <DesignPreview design={currentDesign} activeArea={activeArea} />
            ) : (
              <DesignDropZone
                dragActive={dragActive}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onFileSelect={handleFile}
                hasDesign={!!currentDesign}
                activeArea={activeArea}
              />
            )}
          </TabsContent>
        </Tabs>

        <QuickToolsSection
          activeArea={activeArea}
          onShowTextCreator={() => setShowTextCreator(true)}
          onShowArtCreator={() => setShowArtCreator(true)}
        />
      </CardContent>
    </Card>
  );
};
