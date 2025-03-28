"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoAdd, IoTrash } from "react-icons/io5";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const defaultImages: GalleryImage[] = [
  { id: 1, src: "/images/community1.jpg", alt: "Community Image 1" },
  { id: 2, src: "/images/community2.jpg", alt: "Community Image 2" },
  { id: 3, src: "/images/community3.jpg", alt: "Community Image 3" },
  { id: 4, src: "/images/community4.jpg", alt: "Community Image 4" },
  { id: 5, src: "/images/community5.jpg", alt: "Community Image 5" },
  { id: 6, src: "/images/community6.jpg", alt: "Community Image 6" }
];

export default function EditGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Initialize with default images if none exist
    const savedImages = localStorage.getItem("galleryImages");
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      setImages(defaultImages);
      localStorage.setItem("galleryImages", JSON.stringify(defaultImages));
    }
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem("galleryImages", JSON.stringify(images));
      setMessage("Gallery saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error saving gallery");
      setTimeout(() => setMessage(""), 3000);
    }
    setIsSaving(false);
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...images];
      newImages[index] = {
        ...newImages[index],
        src: reader.result as string
      };
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  const updateImageAlt = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = {
      ...newImages[index],
      alt: value
    };
    setImages(newImages);
  };

  const addImage = () => {
    const newImage: GalleryImage = {
      id: images.length + 1,
      src: "/images/placeholder.jpg",
      alt: `Community Image ${images.length + 1}`
    };
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    } else {
      setMessage("You must have at least one image");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-20 pb-safe">
      {/* Back Button */}
      <motion.div 
        className="container mx-auto px-4 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link 
          href="/"
          className="inline-flex items-center text-[#FF8C00] hover:text-white transition-colors duration-300 group"
        >
          <IoArrowBack className="mr-2 text-xl group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-lg font-medium">Back to Home</span>
        </Link>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          EDIT GALLERY
        </motion.h1>

        {message && (
          <div className="mb-8 p-4 rounded-lg bg-[#FF8C00]/20 text-[#FF8C00] text-center">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-[#FF8C00]/20 relative"
            >
              <button
                onClick={() => removeImage(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors"
                title="Remove image"
              >
                <IoTrash className="text-xl" />
              </button>

              <div className="space-y-4">
                <div className="relative aspect-square w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => updateImageAlt(index, e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Upload New Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(index, file);
                    }}
                    className="block w-full text-sm text-gray-300
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#FF8C00] file:text-white
                      hover:file:bg-[#FF8C00]/90"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={addImage}
            className="bg-[#FF8C00] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#FF8C00]/90 transition-colors flex items-center gap-2"
          >
            <IoAdd className="text-xl" />
            Add Image
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#FF8C00] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#FF8C00]/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </main>
  );
} 