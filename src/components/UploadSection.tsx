
import React, { useState, useRef } from 'react';
import { Camera, Upload, User, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UploadSectionProps {
  onPhotoUpload: (photo: string) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onPhotoUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedPhoto(result);
        setTimeout(() => {
          setIsProcessing(false);
          onPhotoUpload(result);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Your Virtual Wardrobe
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your photo to start trying on clothes virtually. See how different outfits look on you before you buy!
        </p>
      </div>

      {/* Upload Area */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Camera className="w-6 h-6 text-blue-600" />
            Upload Your Photo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!uploadedPhoto ? (
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drag and drop your photo here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse your files
                  </p>
                  <Button onClick={openFileDialog} className="gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Choose Photo
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
              <div className="relative">
                <img
                  src={uploadedPhoto}
                  alt="Uploaded photo"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-gray-900 font-medium">Processing your photo...</span>
                    </div>
                  </div>
                )}
              </div>
              
              {!isProcessing && (
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 font-medium">Photo uploaded successfully!</span>
                  </div>
                  <p className="text-gray-600">
                    You can now browse the wardrobe and try on different outfits.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUploadedPhoto(null);
                      setIsProcessing(false);
                    }}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Different Photo
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Full Body Photo</h3>
            <p className="text-sm text-gray-600">
              Take a full-body photo in a neutral pose for the best virtual fitting experience
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Good Lighting</h3>
            <p className="text-sm text-gray-600">
              Ensure good lighting and a plain background for accurate virtual fitting
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-md">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Privacy Protected</h3>
            <p className="text-sm text-gray-600">
              Your photos are processed securely and are never shared with third parties
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
