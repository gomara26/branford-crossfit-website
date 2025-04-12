"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoAdd, IoTrash } from "react-icons/io5";
import { ImageUpload } from "@/components/ui/image-upload";
import { SuccessModal } from "@/components/ui/success-modal";

interface Coach {
  id: number;
  name: string;
  role: string;
  bio: string[];
  certifications: string[];
  achievements: string[];
  image: string;
}

const defaultCoaches: Coach[] = [
  {
    id: 1,
    name: "Coach Name",
    role: "Head Coach",
    bio: ["Coach bio paragraph 1", "Coach bio paragraph 2"],
    certifications: ["CrossFit Level 1", "CrossFit Level 2"],
    achievements: ["Achievement 1", "Achievement 2"],
    image: "/images/placeholder.jpg"
  }
];

export default function EditCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const savedCoaches = localStorage.getItem("coaches");
    if (savedCoaches) {
      setCoaches(JSON.parse(savedCoaches));
    } else {
      setCoaches(defaultCoaches);
      localStorage.setItem("coaches", JSON.stringify(defaultCoaches));
    }
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem("coaches", JSON.stringify(coaches));
      setSuccessMessage("Coaches saved successfully!");
      setShowSuccess(true);
    } catch (error) {
      setSuccessMessage("Error saving coaches");
      setShowSuccess(true);
    }
    setIsSaving(false);
  };

  const addCoach = () => {
    const newCoach: Coach = {
      id: coaches.length + 1,
      name: "New Coach",
      role: "Coach",
      bio: ["New coach bio paragraph"],
      certifications: [],
      achievements: [],
      image: ""
    };
    setCoaches([...coaches, newCoach]);
  };

  const removeCoach = (index: number) => {
    if (coaches.length > 1) {
      const newCoaches = coaches.filter((_, i) => i !== index);
      setCoaches(newCoaches);
    } else {
      setSuccessMessage("You must have at least one coach");
      setShowSuccess(true);
    }
  };

  const updateCoach = (index: number, field: keyof Coach, value: any) => {
    const newCoaches = [...coaches];
    newCoaches[index] = {
      ...newCoaches[index],
      [field]: value
    };
    setCoaches(newCoaches);
  };

  const addBioParagraph = (index: number) => {
    const newCoaches = [...coaches];
    newCoaches[index].bio.push("");
    setCoaches(newCoaches);
  };

  const removeBioParagraph = (coachIndex: number, paragraphIndex: number) => {
    const newCoaches = [...coaches];
    newCoaches[coachIndex].bio = newCoaches[coachIndex].bio.filter((_, i) => i !== paragraphIndex);
    setCoaches(newCoaches);
  };

  const updateBioParagraph = (coachIndex: number, paragraphIndex: number, value: string) => {
    const newCoaches = [...coaches];
    newCoaches[coachIndex].bio[paragraphIndex] = value;
    setCoaches(newCoaches);
  };

  const addCertification = (index: number) => {
    const newCoaches = [...coaches];
    newCoaches[index].certifications.push("");
    setCoaches(newCoaches);
  };

  const removeCertification = (coachIndex: number, certificationIndex: number) => {
    const newCoaches = [...coaches];
    newCoaches[coachIndex].certifications = newCoaches[coachIndex].certifications.filter((_, i) => i !== certificationIndex);
    setCoaches(newCoaches);
  };

  const updateCertification = (coachIndex: number, certificationIndex: number, value: string) => {
    const newCoaches = [...coaches];
    newCoaches[coachIndex].certifications[certificationIndex] = value;
    setCoaches(newCoaches);
  };

  const addAchievement = (index: number) => {
    const newCoaches = [...coaches];
    newCoaches[index].achievements.push("");
    setCoaches(newCoaches);
  };

  const removeAchievement = (coachIndex: number, achievementIndex: number) => {
    const newCoaches = [...coaches];
    newCoaches[coachIndex].achievements = newCoaches[coachIndex].achievements.filter((_, i) => i !== achievementIndex);
    setCoaches(newCoaches);
  };

  const updateAchievement = (coachIndex: number, achievementIndex: number, value: string) => {
    const newCoaches = [...coaches];
    newCoaches[coachIndex].achievements[achievementIndex] = value;
    setCoaches(newCoaches);
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
          EDIT COACHES
        </motion.h1>

        <div className="grid grid-cols-1 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-[#FF8C00]/20 relative"
            >
              <button
                onClick={() => removeCoach(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors"
                title="Remove coach"
              >
                <IoTrash className="text-xl" />
              </button>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={coach.name}
                    onChange={(e) => updateCoach(index, "name", e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={coach.role}
                    onChange={(e) => updateCoach(index, "role", e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Bio Paragraphs
                  </label>
                  <div className="space-y-2">
                    {coach.bio.map((paragraph, paragraphIndex) => (
                      <div key={paragraphIndex} className="flex gap-2">
                        <textarea
                          value={paragraph}
                          onChange={(e) => updateBioParagraph(index, paragraphIndex, e.target.value)}
                          rows={3}
                          className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF8C00]"
                          placeholder="Enter bio paragraph"
                        />
                        <button
                          onClick={() => removeBioParagraph(index, paragraphIndex)}
                          className="px-3 py-2 text-red-500 hover:text-red-400 transition-colors"
                        >
                          <IoTrash className="text-xl" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addBioParagraph(index)}
                      className="text-[#FF8C00] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <IoAdd className="text-xl" />
                      Add Bio Paragraph
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Image
                  </label>
                  <ImageUpload
                    name={`coach-image-${index}`}
                    value={coach.image}
                    onChange={(value) => updateCoach(index, "image", value)}
                    onRemove={() => updateCoach(index, "image", "")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Certifications
                  </label>
                  <div className="space-y-2">
                    {coach.certifications.map((certification, certificationIndex) => (
                      <div key={certificationIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={certification}
                          onChange={(e) => updateCertification(index, certificationIndex, e.target.value)}
                          className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF8C00]"
                          placeholder="Enter certification"
                        />
                        <button
                          onClick={() => removeCertification(index, certificationIndex)}
                          className="px-3 py-2 text-red-500 hover:text-red-400 transition-colors"
                        >
                          <IoTrash className="text-xl" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addCertification(index)}
                      className="text-[#FF8C00] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <IoAdd className="text-xl" />
                      Add Certification
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Achievements
                  </label>
                  <div className="space-y-2">
                    {coach.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateAchievement(index, achievementIndex, e.target.value)}
                          className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF8C00]"
                          placeholder="Enter achievement"
                        />
                        <button
                          onClick={() => removeAchievement(index, achievementIndex)}
                          className="px-3 py-2 text-red-500 hover:text-red-400 transition-colors"
                        >
                          <IoTrash className="text-xl" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addAchievement(index)}
                      className="text-[#FF8C00] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <IoAdd className="text-xl" />
                      Add Achievement
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={addCoach}
            className="bg-[#FF8C00] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#FF8C00]/90 transition-colors flex items-center gap-2"
          >
            <IoAdd className="text-xl" />
            Add Coach
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