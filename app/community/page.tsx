"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { FaUsers, FaCalendarAlt, FaTrophy, FaStar } from "react-icons/fa";

export default function Community() {
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
            NATION
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-[#FF8C00] mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          </motion.div>
      </section>

      {/* Community Features Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Supportive Environment Card */}
            <motion.div 
              className="relative bg-black/50 rounded-2xl p-8 border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF8C00] to-transparent" />
              <FaUsers className="text-[#FF8C00] text-4xl mb-6" />
              <h3 className="text-2xl font-bold mb-4">SUPPORTIVE ENVIRONMENT</h3>
              <p className="text-gray-300">
                Walk into any class and you'll find members cheering each other on, coaches providing personalized attention, and a genuine atmosphere of camaraderie. We celebrate each other's victories and support each other through challenges.
              </p>
            </motion.div>

            {/* Community Events Card */}
            <motion.div 
              className="relative bg-black/50 rounded-2xl p-8 border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF8C00] to-transparent" />
              <FaCalendarAlt className="text-[#FF8C00] text-4xl mb-6" />
              <h3 className="text-2xl font-bold mb-4">COMMUNITY EVENTS</h3>
              <p className="text-gray-300">
                From friendly in-house competitions to social gatherings, beach workouts, and charity fundraisers, we create opportunities to connect beyond the daily WOD. Our events strengthen bonds and create lasting memories.
              </p>
            </motion.div>

            {/* Shared Achievements Card */}
            <motion.div 
              className="relative bg-black/50 rounded-2xl p-8 border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF8C00] to-transparent" />
              <FaTrophy className="text-[#FF8C00] text-4xl mb-6" />
              <h3 className="text-2xl font-bold mb-4">SHARED ACHIEVEMENTS</h3>
              <p className="text-gray-300">
                Every PR (personal record) is celebrated, whether it's your first pull-up or a competition win. We believe in acknowledging progress at every level and inspiring each other to reach new heights.
              </p>
            </motion.div>

            {/* Inclusive Atmosphere Card */}
            <motion.div 
              className="relative bg-black/50 rounded-2xl p-8 border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF8C00] to-transparent" />
              <FaStar className="text-[#FF8C00] text-4xl mb-6" />
              <h3 className="text-2xl font-bold mb-4">INCLUSIVE ATMOSPHERE</h3>
              <p className="text-gray-300">
                No matter your fitness level, age, or background, you belong here. Our community embraces diversity and creates a welcoming space where everyone can thrive and feel valued on their fitness journey.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Member Spotlights Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-8 text-center"
            variants={itemVariants}
          >
            MEMBER SPOTLIGHTS
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#FF8C00] mx-auto mb-16"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sarah J. Card */}
            <motion.div 
              className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-square relative">
                <Image
                  src="/images/member-sarah.jpg"
                  alt="Sarah J."
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">SARAH J.</h3>
                <p className="text-[#FF8C00] mb-4">Member since 2019</p>
                <p className="text-gray-300 mb-6">
                  "I never thought I could do a pull-up, let alone compete in a CrossFit competition. The coaches and community at Branford CrossFit helped me discover strength I never knew I had."
                </p>
                <div className="pt-6 border-t border-[#FF8C00]/20">
                  <p className="text-sm text-gray-400">Recent achievement:</p>
                  <p className="text-[#FF8C00]">First muscle-up</p>
                </div>
              </div>
            </motion.div>

            {/* Mike T. Card */}
            <motion.div 
              className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-square relative">
                <Image
                  src="/images/member-mike.jpg"
                  alt="Mike T."
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">MIKE T.</h3>
                <p className="text-[#FF8C00] mb-4">Member since 2021</p>
                <p className="text-gray-300 mb-6">
                  "After years of traditional gym workouts, I was looking for something more challenging. What I found was not just a better workout, but a community that pushes me to be better every day."
                </p>
                <div className="pt-6 border-t border-[#FF8C00]/20">
                  <p className="text-sm text-gray-400">Recent achievement:</p>
                  <p className="text-[#FF8C00]">300lb back squat</p>
                </div>
              </div>
            </motion.div>

            {/* Lisa M. Card */}
            <motion.div 
              className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-square relative">
                <Image
                  src="/images/member-lisa.jpg"
                  alt="Lisa M."
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">LISA M.</h3>
                <p className="text-[#FF8C00] mb-4">Member since 2018</p>
                <p className="text-gray-300 mb-6">
                  "As a mom of three, I needed something that would fit my schedule and give me results. Branford CrossFit has become my second home and the members are like extended family."
                </p>
                <div className="pt-6 border-t border-[#FF8C00]/20">
                  <p className="text-sm text-gray-400">Recent achievement:</p>
                  <p className="text-[#FF8C00]">Completed first RX competition</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-black">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-8 text-center"
            variants={itemVariants}
          >
            UPCOMING EVENTS
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#FF8C00] mx-auto mb-16"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Community Day Event */}
            <motion.div 
              className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-video relative">
                <Image
                  src="/images/hockey-event.jpg"
                  alt="QU Women's Hockey Game"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#FF8C00] text-white px-4 py-2 rounded-lg font-bold">
                  JAN 25
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">COMMUNITY DAY: QU WOMEN'S HOCKEY GAME</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-2">
                    <div className="w-24 font-medium">Time:</div>
                    <div>3PM</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-24 font-medium">Location:</div>
                    <div>M&T Bank Arena (Hamden, CT)</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-24 font-medium">Cost:</div>
                    <div>$10</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-24 font-medium">Who:</div>
                    <div>Members, Family & Friends</div>
                  </div>
                </div>
                <p className="mt-6 text-gray-300">
                  Join us with Coach AJ, Sammy, and Wrenley to cheer on Amanda & the QU Women's Hockey team as they take on Brown! Following the game we will head over to Haven Beer Company for food & drinks.
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <div className="text-sm text-gray-400">Sign up with promo code: <span className="text-[#FF8C00] font-medium">BCF</span></div>
                  <a 
                    href="https://gobobcats.evenue.net/promotions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Member Appreciation Event */}
            <motion.div 
              className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#FF8C00]/20 hover:border-[#FF8C00]/40 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-video relative">
                <Image
                  src="/images/member-appreciation.jpg"
                  alt="Member Appreciation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#FF8C00] text-white px-4 py-2 rounded-lg font-bold">
                  FEB 1-29
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">MEMBER APPRECIATION MONTH</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-2">
                    <div className="w-24 font-medium">When:</div>
                    <div>Entire month of February</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-24 font-medium">Who:</div>
                    <div>All BCF Members</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-24 font-medium">Location:</div>
                    <div>Branford CrossFit</div>
                  </div>
                </div>
                <p className="mt-6 text-gray-300">
                  During the month of January we are showing appreciation to our members by offering a raffle. Any member with an attendance of 16 classes or more will be entered to win this raffle.
                </p>
                <div className="mt-6">
                  <div className="text-[#FF8C00] font-medium">Raffle details coming soon!</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-16 text-center"
            variants={itemVariants}
          >
            LIFE AT BRANFORD CROSSFIT
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={`/images/community${index}.jpg`}
                  alt={`Community Image ${index}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
} 