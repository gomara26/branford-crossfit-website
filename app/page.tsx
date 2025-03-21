"use client";

import { Dumbbell, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Programs</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Schedule</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">About</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Contact</a>
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
                <a href="#" className="text-white hover:text-[#FF8C00] transition-colors py-2 text-lg">Programs</a>
                <a href="#" className="text-white hover:text-[#FF8C00] transition-colors py-2 text-lg">Schedule</a>
                <a href="#" className="text-white hover:text-[#FF8C00] transition-colors py-2 text-lg">About</a>
                <a href="#" className="text-white hover:text-[#FF8C00] transition-colors py-2 text-lg">Contact</a>
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
          <div className="max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 leading-tight">
              TRANSFORM YOUR LIFE
              <span className="block text-[#FF8C00]">ONE REP AT A TIME</span>
            </h1>
            <p className="text-sm sm:text-base md:text-xl mb-4 md:mb-8 text-gray-200">
              Join Branford CrossFit and become part of a community dedicated to helping you achieve your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a 
                href="#"
                className="bg-[#FF8C00] text-white px-6 md:px-8 py-2.5 md:py-3 rounded text-center font-semibold hover:bg-[#e67e00] transition-colors text-sm md:text-base min-h-[44px] flex items-center justify-center"
              >
                Free Trial
              </a>
              <a 
                href="#"
                className="border-2 border-[#FF8C00] text-[#FF8C00] px-6 md:px-8 py-2.5 md:py-3 rounded text-center font-semibold hover:bg-[#FF8C00] hover:text-white transition-colors text-sm md:text-base min-h-[44px] flex items-center justify-center"
              >
                Drop In
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-5 sm:p-6 md:p-8 rounded transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#FF8C00]">Expert Coaching</h3>
              <p className="text-sm sm:text-base text-gray-300">Our certified coaches provide personalized attention to help you achieve your fitness goals safely and effectively.</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-5 sm:p-6 md:p-8 rounded transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#FF8C00]">Community</h3>
              <p className="text-sm sm:text-base text-gray-300">Join a supportive community of like-minded individuals who will motivate and inspire you every step of the way.</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-5 sm:p-6 md:p-8 rounded transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-transform">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#FF8C00]">Results</h3>
              <p className="text-sm sm:text-base text-gray-300">Whether your goal is strength, endurance, or overall fitness, our proven methods will help you succeed.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}