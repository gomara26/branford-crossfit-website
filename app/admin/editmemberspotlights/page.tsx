"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ImageUpload } from "@/components/ui/image-upload";
import { SuccessModal } from "@/components/ui/success-modal";

interface MemberSpotlight {
  name: string;
  memberSince: string;
  quote: string;
  recentAchievement: string;
  image: string;
}

export default function EditMemberSpotlights() {
  const [spotlights, setSpotlights] = useState<MemberSpotlight[]>([]);
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

    // Load spotlights from localStorage
    const savedSpotlights = localStorage.getItem("memberSpotlights");
    if (savedSpotlights) {
      setSpotlights(JSON.parse(savedSpotlights));
    }
    setIsLoading(false);
  }, [router]);

  const saveSpotlights = () => {
    localStorage.setItem("memberSpotlights", JSON.stringify(spotlights));
    setSuccessMessage("Member spotlights saved successfully!");
    setShowSuccess(true);
  };

  const addSpotlight = () => {
    const newSpotlight: MemberSpotlight = {
      name: "New Member",
      memberSince: "2024",
      quote: "Add a quote here",
      recentAchievement: "Add an achievement here",
      image: ""
    };
    setSpotlights([...spotlights, newSpotlight]);
  };

  const removeSpotlight = (index: number) => {
    if (spotlights.length > 1) {
      const newSpotlights = spotlights.filter((_, i) => i !== index);
      setSpotlights(newSpotlights);
    } else {
      setSuccessMessage("You must have at least one spotlight");
      setShowSuccess(true);
    }
  };

  const updateSpotlight = (index: number, field: keyof MemberSpotlight, value: string) => {
    const newSpotlights = [...spotlights];
    newSpotlights[index] = { ...newSpotlights[index], [field]: value };
    setSpotlights(newSpotlights);
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
          EDIT MEMBER SPOTLIGHTS
        </motion.h1>

        <div className="space-y-8">
          {spotlights.map((spotlight, index) => (
            <motion.div
              key={index}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-[#FF8C00]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Spotlight {index + 1}</h2>
                <button
                  onClick={() => removeSpotlight(index)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={spotlight.name}
                    onChange={(e) => updateSpotlight(index, "name", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Member Since</label>
                  <input
                    type="text"
                    value={spotlight.memberSince}
                    onChange={(e) => updateSpotlight(index, "memberSince", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Quote</label>
                  <textarea
                    value={spotlight.quote}
                    onChange={(e) => updateSpotlight(index, "quote", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Recent Achievement</label>
                  <input
                    type="text"
                    value={spotlight.recentAchievement}
                    onChange={(e) => updateSpotlight(index, "recentAchievement", e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <ImageUpload
                    value={spotlight.image}
                    onChange={(value) => updateSpotlight(index, "image", value)}
                    onRemove={() => updateSpotlight(index, "image", "")}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={addSpotlight}
            className="bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors"
          >
            Add Spotlight
          </button>
          <button
            onClick={saveSpotlights}
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