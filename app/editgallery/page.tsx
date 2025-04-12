"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoAdd, IoTrash } from "react-icons/io5";
import Image from "next/image";
import { ImageUpload } from "@/components/ui/image-upload";
import { SuccessModal } from "@/components/ui/success-modal";

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
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      setSuccessMessage("Gallery saved successfully!");
      setShowSuccess(true);
    } catch (error) {
      setSuccessMessage("Error saving gallery");
      setShowSuccess(true);
    }
    setIsSaving(false);
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
      src: "",
      alt: `Community Image ${images.length + 1}`
    };
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    } else {
      setSuccessMessage("You must have at least one image");
      setShowSuccess(true);
    }
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = {
      ...newImages[index],
      src: value
    };
    setImages(newImages);
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
                    Image
                  </label>
                  <ImageUpload
                    value={image.src}
                    onChange={(value) => updateImage(index, value)}
                    onRemove={() => updateImage(index, "")}
                    name={`gallery-image-${index}`}
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

      <SuccessModal
        message={successMessage}
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  );
} 