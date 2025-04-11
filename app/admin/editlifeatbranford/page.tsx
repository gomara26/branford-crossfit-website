"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ImageUpload } from "@/components/ui/image-upload";
import { SuccessModal } from "@/components/ui/success-modal";
import { useGallery } from "@/hooks/useGallery";
import type { GalleryImage } from "@/types";

export default function EditLifeAtBranford() {
  const { 
    images, 
    isLoading, 
    error,
    createImage,
    updateImage: updateGalleryImage,
    deleteImage
  } = useGallery();
  
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
  }, [router]);

  const handleAddImage = async () => {
    try {
      await createImage({
        url: "",
        caption: `Life at Branford ${images.length + 1}`
      });
      setSuccessMessage("New image added successfully!");
      setShowSuccess(true);
    } catch (err) {
      setSuccessMessage(err instanceof Error ? err.message : "Failed to add image");
      setShowSuccess(true);
    }
  };

  const handleRemoveImage = async (id: string) => {
    if (images.length > 1) {
      try {
        await deleteImage(id);
        setSuccessMessage("Image removed successfully!");
        setShowSuccess(true);
      } catch (err) {
        setSuccessMessage(err instanceof Error ? err.message : "Failed to remove image");
        setShowSuccess(true);
      }
    } else {
      setSuccessMessage("You must have at least one image");
      setShowSuccess(true);
    }
  };

  const handleUpdateImage = async (id: string, field: keyof GalleryImage, value: string) => {
    try {
      await updateGalleryImage(id, { [field]: value });
    } catch (err) {
      setSuccessMessage(err instanceof Error ? err.message : "Failed to update image");
      setShowSuccess(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-[#FF8C00] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-[#FF8C00]/50 animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="text-white text-center max-w-md p-8 bg-[#1a1a1a] rounded-lg border border-red-500/30">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-zinc-400">{error}</p>
        </div>
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
              key={image.id}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-[#FF8C00]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Image {index + 1}</h2>
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Caption</label>
                  <input
                    type="text"
                    value={image.caption || ''}
                    onChange={(e) => handleUpdateImage(image.id, "caption", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <ImageUpload
                    name={`image-${image.id}`}
                    value={image.url}
                    onChange={(value) => handleUpdateImage(image.id, "url", value)}
                    onRemove={() => handleUpdateImage(image.id, "url", "")}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleAddImage}
            className="bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors"
          >
            Add Image
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