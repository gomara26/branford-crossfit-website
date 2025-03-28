"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { programs } from "./programsData";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

function FlipCard({ program, index }: { program: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showClickMe, setShowClickMe] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [distanceFromCenter, setDistanceFromCenter] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  useEffect(() => {
    let isActive = true;

    const showIndicator = () => {
      if (isActive && !hasBeenClicked && !isFlipped) {
        setShowClickMe(true);
        setTimeout(() => {
          if (isActive && !hasBeenClicked) {
            setShowClickMe(false);
          }
        }, 1000);
      }
    };

    // Show initial indicator after 3 seconds
    const initialTimeout = setTimeout(showIndicator, 3000);

    // Set up repeating indicator
    const intervalId = setInterval(showIndicator, 4000);

    return () => {
      isActive = false;
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasBeenClicked, isFlipped]);

  useEffect(() => {
    const updateScale = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const centerY = windowHeight / 2;
      const elementCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(centerY - elementCenterY);
      const maxDistance = windowHeight / 2;
      const normalizedDistance = 1 - Math.min(distance / maxDistance, 1);
      setDistanceFromCenter(normalizedDistance);
    };

    window.addEventListener('scroll', updateScale);
    updateScale();
    return () => window.removeEventListener('scroll', updateScale);
  }, []);

  const scale = useSpring(1 + (distanceFromCenter * 0.1), {
    stiffness: 100,
    damping: 30
  });

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setShowClickMe(false);
    setHasBeenClicked(true);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ scale }}
      className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <AnimatePresence>
        {!isFlipped ? (
          <motion.div
            key="front"
            className="absolute inset-0"
            initial={false}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -90 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-full w-full rounded-xl overflow-hidden">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <h2 className="text-3xl font-bold text-white text-center">{program.title}</h2>
              </div>
              <AnimatePresence>
                {showClickMe && !hasBeenClicked && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      y: {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute bottom-4 left-0 right-0 flex justify-center"
                  >
                    <div className="bg-[#FF8C00] text-black px-4 py-2 rounded-full text-sm font-semibold">
                      Click me!
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="absolute inset-0 bg-zinc-900/95 rounded-xl p-6 overflow-y-auto"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">{program.title}</h2>
              <p className="text-gray-300 mb-6 flex-grow">{program.description}</p>
              
              <div>
                <h3 className="text-sm font-semibold text-[#FF8C00] mb-2">IDEAL FOR</h3>
                <ul className="list-disc list-inside text-sm text-gray-300">
                  {program.idealFor.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <Link 
                href={`/programs/${program.slug}`}
                className="mt-6 block text-center bg-[#FF8C00] text-black py-2 rounded-lg font-semibold hover:bg-[#FF8C00]/90 transition-colors"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-safe">
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

      <div className="container mx-auto px-4 py-20">
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          OUR PROGRAMS
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          className="h-1 bg-[#FF8C00] mx-auto mb-16"
        />

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <FlipCard key={program.slug} program={program} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
} 