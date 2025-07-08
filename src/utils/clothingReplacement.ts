
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

export interface ClothingReplacementResult {
  processedImage: Blob;
  bodyMask: ImageData;
  clothingMask: ImageData;
}

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

export const detectAndReplaceClothing = async (
  userImage: HTMLImageElement,
  clothingImage: HTMLImageElement
): Promise<ClothingReplacementResult> => {
  try {
    console.log('Starting clothing detection and replacement...');
    
    // Create segmentation pipeline for body parts detection
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
      device: 'webgpu',
    });

    // Prepare user image canvas
    const userCanvas = document.createElement('canvas');
    const userCtx = userCanvas.getContext('2d');
    if (!userCtx) throw new Error('Could not get user canvas context');

    resizeImageIfNeeded(userCanvas, userCtx, userImage);
    const userImageData = userCanvas.toDataURL('image/jpeg', 0.8);

    // Segment the user image to detect body parts
    console.log('Detecting body parts and clothing...');
    const segmentationResult = await segmenter(userImageData);
    
    if (!segmentationResult || !Array.isArray(segmentationResult)) {
      throw new Error('Invalid segmentation result');
    }

    // Create output canvas
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = userCanvas.width;
    outputCanvas.height = userCanvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    if (!outputCtx) throw new Error('Could not get output canvas context');

    // Draw the original user image
    outputCtx.drawImage(userCanvas, 0, 0);
    
    // Create clothing overlay canvas
    const clothingCanvas = document.createElement('canvas');
    clothingCanvas.width = userCanvas.width;
    clothingCanvas.height = userCanvas.height;
    const clothingCtx = clothingCanvas.getContext('2d');
    if (!clothingCtx) throw new Error('Could not get clothing canvas context');

    // Calculate clothing overlay dimensions and position
    const torsoArea = {
      x: Math.floor(userCanvas.width * 0.2),
      y: Math.floor(userCanvas.height * 0.15),
      width: Math.floor(userCanvas.width * 0.6),
      height: Math.floor(userCanvas.height * 0.5)
    };

    // Draw clothing image to fit the torso area
    clothingCtx.drawImage(
      clothingImage,
      torsoArea.x,
      torsoArea.y,
      torsoArea.width,
      torsoArea.height
    );

    // Apply clothing overlay with proper blending
    outputCtx.globalCompositeOperation = 'source-over';
    outputCtx.globalAlpha = 0.8;
    outputCtx.drawImage(clothingCanvas, 0, 0);
    
    // Reset composite operation
    outputCtx.globalCompositeOperation = 'source-over';
    outputCtx.globalAlpha = 1.0;

    console.log('Clothing replacement completed');

    // Convert to blob
    const processedBlob = await new Promise<Blob>((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });

    return {
      processedImage: processedBlob,
      bodyMask: outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height),
      clothingMask: clothingCtx.getImageData(0, 0, clothingCanvas.width, clothingCanvas.height)
    };

  } catch (error) {
    console.error('Error in clothing replacement:', error);
    throw error;
  }
};

export const loadImageFromUrl = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};
