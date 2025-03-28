"use client";

import { Dumbbell, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const videoRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let player: any;
    
    (window as any).onYouTubeIframeAPIReady = () => {
      player = new (window as any).YT.Player('youtube-player', {
        videoId: 'YSDDbcfM4uI',
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          mute: 0
        },
        events: {
          onReady: (event: any) => {
            // Video is ready to play
          }
        }
      });
    };

    // Setup Intersection Observer for video
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVideoVisible(entry.isIntersecting);
          if (entry.isIntersecting && player?.playVideo) {
            player.playVideo();
          } else if (!entry.isIntersecting && player?.pauseVideo) {
            player.pauseVideo();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-safe pb-safe">
      {/* Hero Section with Dynamic Nav */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 py-2 md:py-4" : "bg-transparent py-3 md:py-6"
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/images/logo.png" 
              alt="Branford CrossFit"
              className="h-8 md:h-12 w-auto"
            />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Home</a>
            <Link href="/programs" className="hover:text-[#FF8C00] transition-colors">Programs</Link>
            <div className="relative group">
              <a href="/about" className="hover:text-[#FF8C00] transition-colors">
                About
              </a>
              <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-black border border-[#FF8C00]/20 rounded-md shadow-lg">
                <a href="/community" className="block px-4 py-2 text-white hover:text-[#FF8C00] hover:bg-[#1a1a1a] transition-colors">
                  Community
                </a>
                <a href="/about#coaches" className="block px-4 py-2 text-white hover:text-[#FF8C00] hover:bg-[#1a1a1a] transition-colors">
                  Coaching
                </a>
              </div>
            </div>
            <Link href="/contact" className="hover:text-[#FF8C00] transition-colors">Contact</Link>
          </div>
          <div className="md:hidden">
            <button 
              className="text-white p-2 focus:outline-none" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-t border-[#FF8C00]/20">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-white hover:text-[#FF8C00] transition-colors py-2 text-lg">Home</a>
                <Link href="/programs" className="text-white hover:text-[#FF8C00] transition-colors py-2 text-lg">Programs</Link>
                <div className="space-y-2">
                  <div className="text-white py-2 text-lg">About</div>
                  <div className="pl-4 space-y-2">
                    <a href="/community" className="text-white hover:text-[#FF8C00] transition-colors py-2 text-lg block">Community</a>
                    <a href="/about#coaches" className="text-white hover:text-[#FF8C00] transition-colors py-2 text-lg block">Coaching</a>
                  </div>
                </div>
                <Link href="/contact" className="text-white hover:text-[#FF8C00] transition-colors py-2 text-lg">Contact</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen">
        <div className="absolute inset-0">
          {/* Dynamic background image based on screen size */}
          <Image 
            src={isMobile ? "/images/hero-background-mobile.JPG" : "/images/hero-background.png"}
            alt="CrossFit Training"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: isMobile ? 'center 30%' : 'center'
            }}
          />
          <div className="absolute inset-0 bg-black/70 md:bg-black/60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-[280px] sm:max-w-lg md:max-w-lg lg:max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 leading-tight">
              TRANSFORM YOUR LIFE
              <span className="block text-[#FF8C00]">ONE REP AT A TIME</span>
            </h1>
            <p className="text-sm sm:text-base md:text-xl mb-4 md:mb-8 text-gray-200">
              Join Branford CrossFit and become part of a community dedicated to helping you achieve your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="https://nationathletics.wodify.com/OnlineSalesPortal/ViewSchedule.aspx?IsMobile=True&LocationId=6954&OnlineMembershipId=104579"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#FF8C00] text-white font-semibold rounded-lg hover:bg-[#FF8C00]/90 transition-colors duration-300"
              >
                Free Trial
              </a>
              <a
                href="https://nationathletics.wodify.com/OnlineSalesPortal/ViewSchedule.aspx?IsMobile=False&LocationId=6954&OnlineMembershipId=104578"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#FF8C00] text-[#FF8C00] font-semibold rounded-lg hover:bg-[#FF8C00] hover:text-white transition-all duration-300"
              >
                Drop In
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Animations */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-5 sm:p-6 md:p-8 rounded transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#FF8C00]">Expert Coaching</h3>
              <p className="text-sm sm:text-base text-gray-300">Our certified coaches provide personalized attention to help you achieve your fitness goals safely and effectively.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-5 sm:p-6 md:p-8 rounded transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#FF8C00]">Community</h3>
              <p className="text-sm sm:text-base text-gray-300">Join a supportive community of like-minded individuals who will motivate and inspire you every step of the way.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-5 sm:p-6 md:p-8 rounded transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#FF8C00]">Results</h3>
              <p className="text-sm sm:text-base text-gray-300">Whether your goal is strength, endurance, or overall fitness, our proven methods will help you succeed.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <div ref={videoRef} className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <div 
              id="youtube-player"
              className="absolute inset-0 w-full h-full"
            />
            {!isVideoVisible && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button 
                  className="bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67e00] transition-colors"
                  onClick={() => {
                    const player = (window as any).player;
                    if (player?.playVideo) {
                      player.playVideo();
                    }
                  }}
                >
                  Play Video
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-black to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-[#FF8C00]"
            >
              Our Mission
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-8 sm:p-12 rounded-lg shadow-xl"
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed">
              We strive toinspire and challenge our community to be better every day, in and out of the gym. We want to help you develop healthier life styles, while creating better habits in order to achieve and maintain your goals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}