"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  const [uploadProgress, setUploadProgress] = useState(0);

  // Update previewUrl when value changes from parent
  useEffect(() => {
    if (value !== previewUrl) {
      setPreviewUrl(value);
    }
  }, [value]);

  const handleImageChange = useCallback((newUrl: string) => {
    setPreviewUrl(newUrl);
    onChange?.(newUrl);
  }, [onChange]);

  const handleRemove = useCallback(() => {
    setPreviewUrl("");
    onChange?.("");
    onRemove?.();
  }, [onChange, onRemove]);

  // Image compression before upload
  const compressImage = useCallback(async (file: File): Promise<File> => {
    // Simple check if it's already small enough
    if (file.size <= 1024 * 1024) {
      return file; // Skip compression for images under 1MB
    }

    return new Promise<File>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        // Create image element for processing
        const img = document.createElement('img') as HTMLImageElement;
        img.src = event.target?.result as string;
        img.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          const maxDimension = 1600; // Max width/height

          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          
          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }
          
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Canvas is empty"));
                return;
              }
              
              const newFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              
              resolve(newFile);
            },
            "image/jpeg",
            0.85 // Quality setting
          );
        };
        img.onerror = () => {
          reject(new Error("Error loading image"));
        };
      };
      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };
    });
  }, []);

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
    setUploadProgress(10);

    try {
      // Compress the image before uploading
      setUploadProgress(20);
      const compressedFile = await compressImage(file);
      setUploadProgress(40);
      
      // Create FormData
      const formData = new FormData();
      formData.append("file", compressedFile);
      setUploadProgress(50);

      // Upload to your API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      setUploadProgress(90);

      const data = await response.json();
      setUploadProgress(100);
      
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      handleImageChange(data.url);
      
      // Wait a moment before showing crop interface to ensure the image is loaded
      setTimeout(() => {
        setIsCropping(true);
      }, 300);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to upload image. Please try again.";
      setError(errorMessage);
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [handleImageChange, compressImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"]
    },
    maxFiles: 1,
    multiple: false,
    disabled: isUploading
  });

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    
    // Check if image is too small
    const minImageSize = 200;
    if (width < minImageSize || height < minImageSize) {
      setError("Image is too small. Please use a larger image (at least 200x200 pixels).");
      return;
    }
    
    // Calculate optimal crop dimensions based on image size
    const cropSize = Math.min(width, height, 800);
    
    // Center the crop
    const x = (width - cropSize) / 2;
    const y = (height - cropSize) / 2;
    
    setCrop({
      unit: "px",
      x,
      y,
      width: cropSize,
      height: cropSize
    });
  }, []);

  const getCroppedImg = useCallback(async (image: HTMLImageElement, crop: PixelCrop) => {
    const canvas = document.createElement("canvas");
    
    // Set canvas size to the crop dimensions
    canvas.width = crop.width;
    canvas.height = crop.height;
    
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    // Set rendering quality
    ctx.imageSmoothingQuality = 'high';
    
    // Draw the cropped portion of the image
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    // Convert to blob with reasonable quality to balance size and appearance
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
        0.85  // Lower quality for better performance
      );
    });
  }, []);

  const handleCropComplete = useCallback(async () => {
    if (!imgRef.current || !crop) return;

    try {
      const croppedImageUrl = await getCroppedImg(imgRef.current, crop as PixelCrop);
      handleImageChange(croppedImageUrl);
      setIsCropping(false);
    } catch (e) {
      console.error("Error cropping image:", e);
      setError("Failed to crop image");
    }
  }, [crop, getCroppedImg, handleImageChange]);

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
              width={400}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute top-2 right-2 flex gap-2">
              {onRemove && (
                <button
                  onClick={handleRemove}
                  type="button"
                  className="p-2 bg-red-500 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsCropping(true)}
                type="button"
                className="p-2 bg-[#FF8C00] text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Crop image"
              >
                <IoMove className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div {...getRootProps()}>
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-colors duration-200
              ${isDragActive ? "border-[#FF8C00] bg-[#FF8C00]/5" : "border-[#FF8C00]/20 hover:border-[#FF8C00]"}
              ${isUploading ? "opacity-50 pointer-events-none" : ""}
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
          </div>
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
                  type="button"
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropComplete}
                  type="button"
                  className="px-4 py-2 bg-[#FF8C00] text-white rounded-lg hover:bg-[#FF8C00]/90 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="overflow-auto max-h-[70vh]">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                className="mx-auto"
                minWidth={50}
                minHeight={50}
                keepSelection
              >
                <img
                  ref={imgRef}
                  src={previewUrl}
                  alt="Crop preview"
                  onLoad={onImageLoad}
                  className="max-w-full max-h-[60vh] mx-auto"
                  style={{ 
                    objectFit: "contain"
                  }}
                />
              </ReactCrop>
            </div>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="bg-[#1a1a1a] rounded-lg p-3 border border-[#FF8C00]/20 shadow-lg">
            <div className="text-center text-[#FF8C00] mb-2">Uploading...</div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-[#FF8C00] h-2.5 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20 mt-2">
          <p className="font-medium">Upload Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
} 