"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { FaUsers, FaCalendarAlt, FaTrophy, FaStar } from "react-icons/fa";
import { useEvents } from "@/hooks/useEvents";
import { useMemberSpotlights } from "@/hooks/useMemberSpotlights";
import { useGallery } from "@/hooks/useGallery";
import { ArrowLeft, Users, Calendar, Trophy, Star } from "lucide-react";

export default function CommunityPage() {
  const { spotlights, isLoading: spotlightsLoading, error: spotlightsError } = useMemberSpotlights();
  const { events, isLoading: eventsLoading, error: eventsError } = useEvents();
  const { images, isLoading: galleryLoading, error: galleryError } = useGallery();

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
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    }
  };

  const cardHoverVariants = {
    hover: { 
      y: -5, 
      boxShadow: "0 10px 30px -15px rgba(255, 140, 0, 0.3)",
      borderColor: "rgba(255, 140, 0, 0.5)", 
      transition: { duration: 0.3 } 
    }
  };

  if (spotlightsLoading || eventsLoading || galleryLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-[#FF8C00] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-[#FF8C00]/50 animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  if (spotlightsError || eventsError || galleryError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center max-w-md p-8 bg-[#1a1a1a] rounded-lg border border-red-500/30">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-zinc-400">
            {spotlightsError || eventsError || galleryError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero section - removing image background */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a1a1a] to-black">
          {/* Subtle animated overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.15),transparent_70%)]"></div>
        </div>
        
        {/* Back to Home Link */}
        <motion.div 
          className="absolute top-8 left-8 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="flex items-center text-[#FF8C00] hover:text-white transition-colors group">
            <IoArrowBack className="mr-2 text-xl group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </motion.div>
        
        <motion.div 
          className="relative z-10 text-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-7xl md:text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#FF8C00]"
          >
            NATION
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-[#FF8C00] mx-auto mt-2"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>
      </div>

      {/* Community Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-24">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Supportive Environment */}
          <motion.div 
            className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-colors shadow-xl shadow-black/50"
            variants={itemVariants}
            whileHover={cardHoverVariants.hover}
          >
            <div className="p-3 bg-[#FF8C00]/10 rounded-lg w-fit mb-6">
              <FaUsers className="h-8 w-8 text-[#FF8C00]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">SUPPORTIVE ENVIRONMENT</h2>
            <p className="text-gray-300 leading-relaxed">
              Walk into any class and you'll find members cheering each other on, 
              coaches providing personalized attention, and a genuine atmosphere 
              of camaraderie. We celebrate each other's victories and support each 
              other through challenges.
            </p>
          </motion.div>

          {/* Community Events */}
          <motion.div 
            className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-colors shadow-xl shadow-black/50"
            variants={itemVariants}
            whileHover={cardHoverVariants.hover}
          >
            <div className="p-3 bg-[#FF8C00]/10 rounded-lg w-fit mb-6">
              <FaCalendarAlt className="h-8 w-8 text-[#FF8C00]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">COMMUNITY EVENTS</h2>
            <p className="text-gray-300 leading-relaxed">
              From friendly in-house competitions to social gatherings, beach 
              workouts, and charity fundraisers, we create opportunities to connect 
              beyond the daily WOD. Our events strengthen bonds and create lasting 
              memories.
            </p>
          </motion.div>

          {/* Shared Achievements */}
          <motion.div 
            className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-colors shadow-xl shadow-black/50"
            variants={itemVariants}
            whileHover={cardHoverVariants.hover}
          >
            <div className="p-3 bg-[#FF8C00]/10 rounded-lg w-fit mb-6">
              <FaTrophy className="h-8 w-8 text-[#FF8C00]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">SHARED ACHIEVEMENTS</h2>
            <p className="text-gray-300 leading-relaxed">
              Every PR (personal record) is celebrated, whether it's your first pull-up 
              or a competition win. We believe in acknowledging progress at every 
              level and inspiring each other to reach new heights.
            </p>
          </motion.div>

          {/* Inclusive Atmosphere */}
          <motion.div 
            className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-colors shadow-xl shadow-black/50"
            variants={itemVariants}
            whileHover={cardHoverVariants.hover}
          >
            <div className="p-3 bg-[#FF8C00]/10 rounded-lg w-fit mb-6">
              <FaStar className="h-8 w-8 text-[#FF8C00]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">INCLUSIVE ATMOSPHERE</h2>
            <p className="text-gray-300 leading-relaxed">
              No matter your fitness level, age, or background, you belong here. Our 
              community embraces diversity and creates a welcoming space where 
              everyone can thrive and feel valued on their fitness journey.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Member Spotlights Section */}
      <motion.div 
        className="py-20 md:py-24 px-4 relative bg-black"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="relative z-10">
          <motion.h2 
            variants={itemVariants} 
            className="text-5xl md:text-6xl font-bold text-center mb-4"
          >
            MEMBER SPOTLIGHTS
          </motion.h2>
          <motion.div
            className="w-16 h-1 bg-[#FF8C00] mx-auto mb-16"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {spotlights?.map((member, index) => (
              <motion.div 
                key={member.id}
                variants={itemVariants}
                className="bg-[#111111] rounded-lg overflow-hidden border border-[#222222] group max-w-md mx-auto w-full"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 2}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="text-[#FF8C00] mb-4">Member since {member.memberSince}</p>
                  <p className="text-gray-300 mb-4">"{member.quote}"</p>
                  <div className="border-t border-[#333333] mt-4 pt-4">
                    <p className="text-gray-500 uppercase text-sm">Recent achievement:</p>
                    <p className="text-[#FF8C00]">{member.recentAchievement}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Upcoming Events Section */}
      <motion.div 
        className="py-20 md:py-24 px-4 bg-black relative"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="relative z-10">
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-center mb-4"
          >
            UPCOMING EVENTS
          </motion.h2>
          <motion.div
            className="w-16 h-1 bg-[#FF8C00] mx-auto mb-16"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map((event, index) => (
              <motion.div 
                key={event.id}
                variants={itemVariants}
                className="bg-[#111111] rounded-lg overflow-hidden border border-[#222222] h-full flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  {event.image && (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 bg-[#FF8C00] text-black font-bold px-4 py-2">
                    {(() => {
                      try {
                        const dateObj = new Date(event.date);
                        // Check if it's a valid date
                        if (isNaN(dateObj.getTime())) {
                          return "TBD"; // Return placeholder for invalid dates
                        }
                        return dateObj.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        }).toUpperCase();
                      } catch (e) {
                        return "TBD"; // Fallback for any date parsing errors
                      }
                    })()}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <span className="text-[#FF8C00] font-medium w-24">Time:</span>
                      <span className="text-gray-300">{event.time}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="text-[#FF8C00] font-medium w-24">Location:</span>
                      <span className="text-gray-300">{event.location}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="text-[#FF8C00] font-medium w-24">Cost:</span>
                      <span className="text-gray-300">{event.cost}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="text-[#FF8C00] font-medium w-24">Who:</span>
                      <span className="text-gray-300">{event.who}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 flex-1">{event.description}</p>
                  
                  {event.promoCode && (
                    <div className="mt-3 p-2 bg-[#222222] rounded border border-[#FF8C00]/20">
                      <span className="text-sm text-gray-400">Promo Code: </span>
                      <span className="text-[#FF8C00] font-medium">{event.promoCode}</span>
                    </div>
                  )}
                  
                  {event.registrationLink && (
                    <Link 
                      href={event.registrationLink} 
                      className="mt-4 inline-flex items-center text-[#FF8C00] hover:text-white font-medium"
                    >
                      Register now →
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Life at Branford CrossFit Section */}
      <motion.div 
        className="py-20 md:py-24 px-4 relative"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,140,0,0.1),transparent_70%)]"></div>
        
        <div className="relative z-10">
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-center mb-6"
          >
            LIFE AT BRANFORD CROSSFIT
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#FF8C00] mx-auto mb-16"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {images?.map((image, index) => (
              <motion.div 
                key={image.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="aspect-square relative rounded-2xl overflow-hidden group shadow-xl shadow-black/30"
              >
                <Image
                  src={image.url}
                  alt={image.caption || "CrossFit gallery image"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium">{image.caption}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 