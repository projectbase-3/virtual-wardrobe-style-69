
import React, { useState, useRef } from 'react';
import { Shapes, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ArtCreatorProps {
  onArtCreated: (artImage: string) => void;
  onClose: () => void;
}

export const ArtCreator: React.FC<ArtCreatorProps> = ({ onArtCreated, onClose }) => {
  const [shape, setShape] = useState('circle');
  const [fillColor, setFillColor] = useState('#3b82f6');
  const [strokeColor, setStrokeColor] = useState('#1e40af');
  const [strokeWidth, setStrokeWidth] = useState('2');
  const [size, setSize] = useState('200');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateArtImage = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasSize = parseInt(size);
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set styles
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = parseInt(strokeWidth);

    const center = canvasSize / 2;
    const radius = (canvasSize - parseInt(strokeWidth) * 2) / 2.5;

    // Draw shapes
    switch (shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, 2 * Math.PI);
        ctx.fill();
        if (parseInt(strokeWidth) > 0) ctx.stroke();
        break;
      
      case 'square':
        const squareSize = radius * 1.5;
        const x = center - squareSize / 2;
        const y = center - squareSize / 2;
        ctx.fillRect(x, y, squareSize, squareSize);
        if (parseInt(strokeWidth) > 0) ctx.strokeRect(x, y, squareSize, squareSize);
        break;
      
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(center, center - radius);
        ctx.lineTo(center - radius * 0.866, center + radius * 0.5);
        ctx.lineTo(center + radius * 0.866, center + radius * 0.5);
        ctx.closePath();
        ctx.fill();
        if (parseInt(strokeWidth) > 0) ctx.stroke();
        break;
      
      case 'star':
        drawStar(ctx, center, center, 5, radius, radius * 0.5);
        ctx.fill();
        if (parseInt(strokeWidth) > 0) ctx.stroke();
        break;
      
      case 'heart':
        drawHeart(ctx, center, center, radius);
        ctx.fill();
        if (parseInt(strokeWidth) > 0) ctx.stroke();
        break;
    }

    // Convert to data URL
    const dataURL = canvas.toDataURL('image/png');
    onArtCreated(dataURL);
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Shapes className="w-5 h-5" />
            Create Art Design
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Shape Selection */}
        <div className="space-y-2">
          <Label>Shape</Label>
          <Select value={shape} onValueChange={setShape}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="triangle">Triangle</SelectItem>
              <SelectItem value="star">Star</SelectItem>
              <SelectItem value="heart">Heart</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label>Size</Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100">Small (100px)</SelectItem>
              <SelectItem value="200">Medium (200px)</SelectItem>
              <SelectItem value="300">Large (300px)</SelectItem>
              <SelectItem value="400">Extra Large (400px)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Fill Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="w-10 h-10 rounded border"
              />
              <input
                type="text"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Stroke Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="w-10 h-10 rounded border"
              />
              <input
                type="text"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stroke Width */}
        <div className="space-y-2">
          <Label>Stroke Width</Label>
          <Select value={strokeWidth} onValueChange={setStrokeWidth}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No Stroke</SelectItem>
              <SelectItem value="1">1px</SelectItem>
              <SelectItem value="2">2px</SelectItem>
              <SelectItem value="4">4px</SelectItem>
              <SelectItem value="8">8px</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="border rounded p-4 bg-gray-50 text-center min-h-[100px] flex items-center justify-center">
            <div className="text-sm text-gray-600">
              {shape.charAt(0).toUpperCase() + shape.slice(1)} - {size}px
            </div>
          </div>
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={generateArtImage} className="flex-1 gap-2">
            <Save className="w-4 h-4" />
            Create Art
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
