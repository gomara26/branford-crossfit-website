"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";

interface Coach {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
}

export default function Coaches() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCoaches = localStorage.getItem("coaches");
    if (savedCoaches) {
      setCoaches(JSON.parse(savedCoaches));
    }
    setIsLoading(false);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div 
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="text-7xl sm:text-8xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#FF8C00]"
            variants={itemVariants}
          >
            COACHES
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-[#FF8C00] mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>
      </section>

      {/* Coaches Grid */}
      <section className="py-20">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {isLoading ? (
            <div className="text-center text-xl">Loading coaches...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coaches.map((coach, index) => (
                <motion.div
                  key={coach.id}
                  className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={coach.image || "/images/placeholder.jpg"}
                      alt={coach.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{coach.name}</h3>
                    <p className="text-[#FF8C00] mb-4">{coach.role}</p>
                    <p className="text-gray-300 mb-6">{coach.bio}</p>
                    {coach.specialties.length > 0 && (
                      <div className="pt-6 border-t border-[#FF8C00]/20">
                        <p className="text-sm text-gray-400 mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {coach.specialties.map((specialty, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-[#FF8C00]/20 text-[#FF8C00] rounded-full text-sm"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
} 