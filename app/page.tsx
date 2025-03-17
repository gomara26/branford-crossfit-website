"use client";

import { Dumbbell } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section with Dynamic Nav */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 py-4" : "bg-transparent py-6"
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Branford CrossFit"
              className="h-12 w-auto"
            />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Home</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Programs</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Schedule</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">About</a>
            <a href="#" className="hover:text-[#FF8C00] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="/hero-background.png"
            alt="CrossFit Training"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              TRANSFORM YOUR LIFE
              <span className="block text-[#FF8C00]">ONE REP AT A TIME</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Join Branford CrossFit and become part of a community dedicated to helping you achieve your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#"
                className="bg-[#FF8C00] text-white px-8 py-3 rounded text-center font-semibold hover:bg-[#e67e00] transition-colors"
              >
                Free Trial
              </a>
              <a 
                href="#"
                className="border-2 border-[#FF8C00] text-[#FF8C00] px-8 py-3 rounded text-center font-semibold hover:bg-[#FF8C00] hover:text-white transition-colors"
              >
                Drop In
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-8 rounded transform hover:-translate-y-2 transition-transform">
              <h3 className="text-2xl font-bold mb-4 text-[#FF8C00]">Expert Coaching</h3>
              <p className="text-gray-300">Our certified coaches provide personalized attention to help you achieve your fitness goals safely and effectively.</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-8 rounded transform hover:-translate-y-2 transition-transform">
              <h3 className="text-2xl font-bold mb-4 text-[#FF8C00]">Community</h3>
              <p className="text-gray-300">Join a supportive community of like-minded individuals who will motivate and inspire you every step of the way.</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FF8C00]/20 p-8 rounded transform hover:-translate-y-2 transition-transform">
              <h3 className="text-2xl font-bold mb-4 text-[#FF8C00]">Results</h3>
              <p className="text-gray-300">Whether your goal is strength, endurance, or overall fitness, our proven methods will help you succeed.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}