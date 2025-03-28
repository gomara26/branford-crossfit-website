"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoPeople, IoCalendar, IoImages, IoLogOut } from "react-icons/io5";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = Cookies.get("adminAuth");
    if (!adminAuth || adminAuth !== "true") {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    // Remove the admin authentication cookie
    Cookies.remove("adminAuth");
    // Redirect to login page
    router.push("/admin/login");
  };

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
      {/* Header with Back Button and Logout */}
      <motion.div 
        className="container mx-auto px-4 mb-8 flex justify-between items-center"
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

        <button
          onClick={handleLogout}
          className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors duration-300 group"
        >
          <IoLogOut className="mr-2 text-xl group-hover:translate-x-1 transition-transform duration-300" />
          <span className="text-lg font-medium">Logout</span>
        </button>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ADMIN DASHBOARD
        </motion.h1>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Member Spotlights Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#1a1a1a] rounded-lg p-8 border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#FF8C00]/20 p-3 rounded-lg">
                  <IoPeople className="text-3xl text-[#FF8C00]" />
                </div>
                <h2 className="text-2xl font-bold">Member Spotlights</h2>
              </div>
              <p className="text-gray-300 mb-6">
                Manage member spotlights, including their photos, quotes, and achievements.
              </p>
              <Link
                href="/admin/editmemberspotlights"
                className="inline-flex items-center justify-center bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors w-full"
              >
                Edit Spotlights
              </Link>
            </motion.div>

            {/* Upcoming Events Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#1a1a1a] rounded-lg p-8 border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#FF8C00]/20 p-3 rounded-lg">
                  <IoCalendar className="text-3xl text-[#FF8C00]" />
                </div>
                <h2 className="text-2xl font-bold">Upcoming Events</h2>
              </div>
              <p className="text-gray-300 mb-6">
                Add and manage upcoming events, including dates, details, and registration links.
              </p>
              <Link
                href="/admin/editupcomingevents"
                className="inline-flex items-center justify-center bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors w-full"
              >
                Edit Events
              </Link>
            </motion.div>

            {/* Life at Branford Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#1a1a1a] rounded-lg p-8 border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#FF8C00]/20 p-3 rounded-lg">
                  <IoImages className="text-3xl text-[#FF8C00]" />
                </div>
                <h2 className="text-2xl font-bold">Life at Branford</h2>
              </div>
              <p className="text-gray-300 mb-6">
                Manage the photo gallery showcasing life at Branford CrossFit.
              </p>
              <Link
                href="/admin/editlifeatbranford"
                className="inline-flex items-center justify-center bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors w-full"
              >
                Edit Gallery
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 