"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ImageUpload } from "@/components/ui/image-upload";
import { SuccessModal } from "@/components/ui/success-modal";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export default function EditLifeAtBranford() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = Cookies.get("adminAuth");
    if (!adminAuth || adminAuth !== "true") {
      router.push("/admin/login");
      return;
    }

    // Load images from localStorage
    const savedImages = localStorage.getItem("galleryImages");
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
    setIsLoading(false);
  }, [router]);

  const saveImages = () => {
    localStorage.setItem("galleryImages", JSON.stringify(images));
    setSuccessMessage("Images saved successfully!");
    setShowSuccess(true);
  };

  const addImage = () => {
    const newImage: GalleryImage = {
      id: images.length + 1,
      src: "",
      alt: `Life at Branford ${images.length + 1}`
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

  const updateImage = (index: number, field: keyof GalleryImage, value: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
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
          href="/admin"
          className="inline-flex items-center text-[#FF8C00] hover:text-white transition-colors duration-300 group"
        >
          <IoArrowBack className="mr-2 text-xl group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-lg font-medium">Back to Admin</span>
        </Link>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          EDIT LIFE AT BRANFORD
        </motion.h1>

        <div className="space-y-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-[#FF8C00]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Image {index + 1}</h2>
                <button
                  onClick={() => removeImage(index)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => updateImage(index, "alt", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <ImageUpload
                    value={image.src}
                    onChange={(value) => updateImage(index, "src", value)}
                    onRemove={() => updateImage(index, "src", "")}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={addImage}
            className="bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors"
          >
            Add Image
          </button>
          <button
            onClick={saveImages}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <SuccessModal
        message={successMessage}
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  );
} 