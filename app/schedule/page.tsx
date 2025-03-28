"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import Script from "next/script";

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
}

function QuickActionCard({ title, description, href }: QuickActionCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.a>
  );
}

export default function Schedule() {
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

      {/* Schedule Section */}
      <section className="py-16">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-8 text-center"
            variants={itemVariants}
          >
            CLASS SCHEDULE
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-[#FF8C00] mx-auto mb-12"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          {/* Schedule View Options */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
            variants={itemVariants}
          >
            <a 
              href="https://nationathletics.wodify.com/OnlineSalesPortal/ViewSchedule.aspx?IsMobile=False&LocationId=6954&OnlineMembershipId=104578"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF8C00] text-white font-semibold rounded-lg hover:bg-[#FF8C00]/90 transition-colors duration-300"
            >
              Book Drop-In
            </a>
            <a 
              href="https://nationathletics.wodify.com/OnlineSalesPortal/ViewSchedule.aspx?IsMobile=True&LocationId=6954&OnlineMembershipId=104579"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#FF8C00] text-[#FF8C00] font-semibold rounded-lg hover:bg-[#FF8C00] hover:text-white transition-all duration-300"
            >
              Book Free Trial
            </a>
          </motion.div>

          {/* Wodify Schedule Widget */}
          <motion.div 
            className="bg-[#1a1a1a] rounded-2xl p-4 sm:p-8 border border-[#FF8C00]/20 relative"
            variants={itemVariants}
          >
            <button
              onClick={() => {
                // Check if it's a mobile device
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                
                if (isMobile) {
                  // Open in new tab for mobile
                  window.open("https://app.wodify.com/Public/ClassCalendarEntry.aspx?TenantKey=IYy8McVct0&Location_Id=6954&Program_Id=51601,52327,52328,52329,52330,52331,52332,52333,52334,52351,58506,61828,68888,73831,77289&wmode=opaque", "_blank");
                } else {
                  // Use fullscreen for desktop
                  const iframe = document.querySelector('iframe');
                  if (iframe) {
                    if (document.fullscreenElement) {
                      document.exitFullscreen();
                    } else {
                      if (iframe.requestFullscreen) {
                        iframe.requestFullscreen();
                      } else if ((iframe as any).webkitRequestFullscreen) {
                        (iframe as any).webkitRequestFullscreen();
                      } else if ((iframe as any).mozRequestFullScreen) {
                        (iframe as any).mozRequestFullScreen();
                      } else if ((iframe as any).msRequestFullscreen) {
                        (iframe as any).msRequestFullscreen();
                      }
                    }
                  }
                }
              }}
              className="absolute top-4 right-4 z-10 bg-[#FF8C00] text-white p-2 rounded-lg hover:bg-[#FF8C00]/90 transition-colors duration-300"
              aria-label="Toggle fullscreen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
            <div className="aspect-[4/3] w-full">
              <iframe
                src="https://app.wodify.com/Public/ClassCalendarEntry.aspx?TenantKey=IYy8McVct0&Location_Id=6954&Program_Id=51601,52327,52328,52329,52330,52331,52332,52333,52334,52351,58506,61828,68888,73831,77289&wmode=opaque"
                className="w-full h-full rounded-lg"
                title="Branford CrossFit Schedule"
                frameBorder="0"
                scrolling="yes"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
} 