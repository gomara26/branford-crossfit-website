"use client";

import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoCloudUpload, IoClose, IoMove } from "react-icons/io5";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageUploadProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  onRemove?: () => void;
  className?: string;
}

export function ImageUpload({ name, value, onChange, onRemove, className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [isCropping, setIsCropping] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [previewUrl, setPreviewUrl] = useState(value);

  const handleImageChange = (newUrl: string) => {
    setPreviewUrl(newUrl);
    onChange?.(newUrl); // Use optional chaining
  };

  const handleRemove = () => {
    setPreviewUrl("");
    onChange?.(""); // Use optional chaining
    onRemove?.();
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit. Please choose a smaller image.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Upload to your API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      handleImageChange(data.url);
      // Automatically show crop interface after successful upload
      setIsCropping(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to upload image. Please try again.";
      setError(errorMessage);
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  }, [handleImageChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"]
    },
    maxFiles: 1,
    multiple: false
  });

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    
    // Check if image is too small
    const minImageSize = 200; // Minimum image size in pixels
    if (width < minImageSize || height < minImageSize) {
      setError("Image is too small. Please use a larger image (at least 200x200 pixels).");
      return;
    }
    
    // Use maximum allowed size (1000px) or image size if smaller
    const maxSize = 1000;
    const size = Math.min(width, height, maxSize);
    
    // Center the crop
    const x = (width - size) / 2;
    const y = (height - size) / 2;
    
    // Set up initial crop
    const newCrop: Crop = {
      unit: "px",
      x,
      y,
      width: size,
      height: size
    };
    
    setCrop(newCrop);
  }, []);

  const getCroppedImg = useCallback(async (image: HTMLImageElement, crop: PixelCrop) => {
    const canvas = document.createElement("canvas");
    
    // Calculate proper scaling while maintaining aspect ratio
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const scale = Math.min(scaleX, scaleY);

    // Use scaled dimensions
    canvas.width = Math.floor(crop.width * scale);
    canvas.height = Math.floor(crop.height * scale);
    
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    // Set rendering quality
    ctx.imageSmoothingQuality = 'high';
    ctx.imageSmoothingEnabled = true;

    // Draw the cropped image with proper scaling
    ctx.drawImage(
      image,
      crop.x * scale,
      crop.y * scale,
      crop.width * scale,
      crop.height * scale,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Convert to blob with proper quality
    return new Promise<string>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error("Canvas is empty");
          }
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        },
        "image/jpeg",
        0.95  // Increased quality to prevent artifacts
      );
    });
  }, []);

  const validateCrop = useCallback((crop: PixelCrop) => {
    // Ensure crop dimensions are reasonable
    const minSize = 50; // Minimum size in pixels
    const maxSize = 2000; // Maximum size in pixels
    
    // If crop is too small, adjust it
    if (crop.width < minSize || crop.height < minSize) {
      return {
        ...crop,
        width: Math.max(crop.width, minSize),
        height: Math.max(crop.height, minSize)
      };
    }
    
    // If crop is too large, adjust it
    if (crop.width > maxSize || crop.height > maxSize) {
      const scale = Math.min(maxSize / crop.width, maxSize / crop.height);
      return {
        ...crop,
        width: crop.width * scale,
        height: crop.height * scale
      };
    }
    
    return crop;
  }, []);

  const handleCropComplete = async () => {
    if (!imgRef.current || !crop) return;

    try {
      // Validate and adjust crop if needed
      const validatedCrop = validateCrop(crop as PixelCrop);
      const croppedImageUrl = await getCroppedImg(imgRef.current, validatedCrop);
      handleImageChange(croppedImageUrl);
      setIsCropping(false);
    } catch (e) {
      console.error("Error cropping image:", e);
      setError("Failed to crop image");
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="hidden"
        name={name}
        value={previewUrl || ""}
      />
      {previewUrl ? (
        <div className="relative group">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={previewUrl}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              {onRemove && (
                <button
                  onClick={handleRemove}
                  className="p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsCropping(true)}
                className="p-2 bg-[#FF8C00] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <IoMove className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div {...getRootProps()}>
          <motion.div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-colors duration-200
              ${isDragActive ? "border-[#FF8C00] bg-[#FF8C00]/5" : "border-[#FF8C00]/20 hover:border-[#FF8C00]"}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <IoCloudUpload className="w-12 h-12 text-[#FF8C00]" />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
                </p>
                <p className="text-sm text-gray-400">
                  or click to select a file
                </p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {isCropping && previewUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Adjust Image</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCropping(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropComplete}
                  className="px-4 py-2 bg-[#FF8C00] text-white rounded-lg hover:bg-[#FF8C00]/90 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="relative">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={1}
                className="max-h-[60vh] [--ReactCrop-border-color:rgba(255,140,0,0.5)] [--ReactCrop-selection-background-color:rgba(255,140,0,0.15)] [--ReactCrop-crop-area-border-color:#FF8C00]"
                minWidth={200}
                minHeight={200}
                maxWidth={1000}
                maxHeight={1000}
                keepSelection
                ruleOfThirds
              >
                <img
                  ref={imgRef}
                  src={previewUrl}
                  alt="Crop me"
                  onLoad={onImageLoad}
                  className="max-w-full"
                  style={{ 
                    maxHeight: "60vh",
                    width: "auto",
                    objectFit: "contain",
                    transform: "none"
                  }}
                />
              </ReactCrop>
            </div>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="text-center text-[#FF8C00]">
          Uploading...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
          <p className="font-medium">Upload Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
} 