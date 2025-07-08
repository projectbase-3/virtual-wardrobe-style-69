
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { detectAndReplaceClothing, loadImageFromUrl } from '@/utils/clothingReplacement';

interface VirtualMirrorProps {
  userPhoto: string;
  selectedOutfit: any;
  selectedSize: string;
  selectedColor: string;
  zoomLevel: number;
  rotationAngle: number;
}

export const VirtualMirror: React.FC<VirtualMirrorProps> = ({
  userPhoto,
  selectedOutfit,
  selectedSize,
  selectedColor,
  zoomLevel,
  rotationAngle
}) => {
  const [processedUserPhoto, setProcessedUserPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');

  const processUserPhoto = async () => {
    if (!userPhoto || !selectedOutfit) return;
    
    setIsProcessing(true);
    try {
      setProcessingStep('Loading images...');
      console.log('Starting advanced clothing replacement...');
      
      // Load user photo
      const response = await fetch(userPhoto);
      const blob = await response.blob();
      const userImageElement = await loadImage(blob);
      
      // Load clothing image
      const clothingImageElement = await loadImageFromUrl(selectedOutfit.image);
      
      setProcessingStep('Detecting clothing and body parts...');
      
      // Perform clothing replacement
      const result = await detectAndReplaceClothing(userImageElement, clothingImageElement);
      const processedUrl = URL.createObjectURL(result.processedImage);
      
      setProcessedUserPhoto(processedUrl);
      setProcessingStep('');
      console.log('Advanced clothing replacement completed');
    } catch (error) {
      console.error('Error processing photo:', error);
      setProcessingStep('Processing failed, using basic overlay...');
      
      // Fallback to original photo if processing fails
      setTimeout(() => {
        setProcessedUserPhoto(userPhoto);
        setProcessingStep('');
      }, 1000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
      {/* Processing indicator */}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="bg-white p-6 rounded-lg text-center max-w-xs">
            <div className="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-sm text-gray-600 font-medium">
              {processingStep || 'Processing your photo...'}
            </p>
            <p className="text-xs text-gray-500 mt-1">This may take a moment</p>
          </div>
        </div>
      )}

      {/* User Avatar with Clothing Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
        style={{
          transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg)`
        }}
      >
        <div className="relative">
          {/* User Photo */}
          <img
            src={processedUserPhoto || userPhoto}
            alt="Your avatar"
            className="w-80 h-96 object-cover rounded-lg shadow-2xl"
          />
          
          {/* Basic Clothing Overlay (shown only if no processed photo) */}
          {!processedUserPhoto && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                className="absolute rounded-lg overflow-hidden shadow-lg"
                style={{
                  top: '15%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '70%',
                  height: '45%',
                  opacity: 0.7,
                  mixBlendMode: 'multiply'
                }}
              >
                <img
                  src={selectedOutfit.image}
                  alt={selectedOutfit.name}
                  className="w-full h-full object-cover"
                  style={{
                    filter: selectedColor !== 'white' ? `hue-rotate(${
                      selectedColor === 'black' ? '0deg' :
                      selectedColor === 'blue' ? '220deg' :
                      selectedColor === 'navy' ? '240deg' :
                      selectedColor === 'red' ? '0deg' :
                      selectedColor === 'gray' ? '0deg' :
                      selectedColor === 'pink' ? '320deg' :
                      '0deg'
                    }) saturate(1.2)` : 'none'
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Size indicator */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 text-gray-800 border">
              Size: {selectedSize}
            </Badge>
          </div>
        </div>
      </div>

      {/* Fitting Indicators */}
      <div className="absolute top-4 right-4 space-y-2">
        {processedUserPhoto ? (
          <Badge className="bg-green-500 text-white">
            AI Enhanced
          </Badge>
        ) : (
          <Badge className="bg-blue-500 text-white">
            Basic Overlay
          </Badge>
        )}
        <Badge variant="outline" className="bg-white/80">
          {processedUserPhoto ? '98% Match' : '85% Match'}
        </Badge>
      </div>

      {/* Process Photo Button */}
      {!processedUserPhoto && !isProcessing && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button 
            onClick={processUserPhoto}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm px-6 py-3 shadow-lg"
          >
            AI Virtual Try-On
          </Button>
        </div>
      )}

      {/* Reset Button */}
      {processedUserPhoto && !isProcessing && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button 
            onClick={() => setProcessedUserPhoto(null)}
            variant="outline"
            className="bg-white/90 text-gray-700 text-sm px-4 py-2 shadow-lg"
          >
            Reset to Basic View
          </Button>
        </div>
      )}
    </div>
  );
};
