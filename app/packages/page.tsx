"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const mainPackages = [
  {
    name: "Unlimited CrossFit",
    price: "$149.99",
    period: "per month",
    description: "Most Popular Option",
    features: [
      "Unlimited CrossFit classes",
      "Open gym access",
      "Program tracking",
      "Nutrition guidance",
      "Community events"
    ],
    buttonText: "Start Now",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPortal/PaymentPlans.aspx?IsMobile=False&LocationId=6954&OnlineMembershipId=106444",
    highlight: true
  },
  {
    name: "Student CrossFit",
    price: "$120",
    period: "per month",
    description: "For active students",
    features: [
      "Unlimited CrossFit classes",
      "Open gym access",
      "Program tracking",
      "Student ID required",
      "Community events"
    ],
    buttonText: "Join Now",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954",
    highlight: false
  },
  {
    name: "10 Class Pass",
    price: "$185",
    period: "10 classes",
    description: "Flexible commitment",
    features: [
      "10 CrossFit classes",
      "Valid for 3 months",
      "Coach supervision",
      "Program tracking",
      "Open gym during classes"
    ],
    buttonText: "Get Started",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954",
    highlight: false
  }
];

const additionalPackages = [
  {
    name: "5 Class Punch Pass",
    price: "$87.50",
    period: "5 classes",
    access: "CrossFit, Open Gym",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "Drop In",
    price: "$20.00",
    period: "per class",
    access: "CrossFit, Open Gym",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "Personal Training",
    price: "Custom",
    period: "flexible",
    access: "1-on-1 Training",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "BCF Birthday Party",
    price: "$400.00",
    period: "1 class",
    access: "Youth Program",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "BCF Intro Program",
    price: "$149.00",
    period: "5 classes",
    access: "Intro Program",
    description: "Price includes remainder of first months membership after intro sessions are completed",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "Speed School",
    price: "$199.00",
    period: "8 classes",
    access: "Speed School",
    description: "Speed Kills. Win the offseason and become faster, more explosive and more agile in this 4 week speed school",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "Youth Program 10 Class Pass",
    price: "$150.00",
    period: "10 classes",
    access: "BC Sport, CrossFit, BC Sport/Middle School, Youth",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "Nation Barbell Club",
    price: "$35.00",
    period: "per month",
    access: "Barbell Club Access",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "BC Sport",
    price: "$150.00",
    period: "per month",
    access: "BC Sport, CrossFit, BC Sport/Middle School, Open Gym",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "Middle School BCF",
    price: "$120.00",
    period: "Unlimited",
    access: "BC Sport, CrossFit, BC Sport/Middle School",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "Nation Plan",
    price: "$35.00",
    period: "per month",
    access: "Nation Plan",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "Unlimited Membership + Nation Plan",
    price: "$175.00",
    period: "per month",
    access: "CrossFit, Nation Plan, Open Gym",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  },
  {
    name: "Week Pass",
    price: "$75.00",
    period: "7 days",
    access: "CrossFit, Open Gym",
    buttonLink: "https://nationathletics.wodify.com/OnlineSalesPage/Main?q=Memberships%7CLocationId%3D6954"
  }
];

export default function Packages() {
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

      {/* Main Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            MEMBERSHIP PACKAGES
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-[#FF8C00] mx-auto mb-12"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          {/* Main Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {mainPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative bg-[#1a1a1a] rounded-lg p-8 border ${
                  pkg.highlight ? 'border-[#FF8C00]' : 'border-gray-800'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#FF8C00] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-[#FF8C00] mb-1">{pkg.price}</div>
                  <div className="text-sm text-gray-400">{pkg.period}</div>
                  <p className="text-gray-400 mt-2">{pkg.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <FaCheck className="text-[#FF8C00] mr-3" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={pkg.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    pkg.highlight
                      ? 'bg-[#FF8C00] text-white hover:bg-[#FF8C00]/90'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {pkg.buttonText}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Additional Packages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Additional Packages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalPackages.map((pkg, index) => (
                <div
                  key={pkg.name}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 hover:border-[#FF8C00]/50 transition-colors cursor-pointer"
                  onClick={() => window.open(pkg.buttonLink, '_blank', 'noopener,noreferrer')}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{pkg.name}</h3>
                    <div className="text-[#FF8C00] font-bold">{pkg.price}</div>
                  </div>
                  <div className="text-sm text-gray-400">{pkg.period}</div>
                  <div className="text-sm text-gray-300 mt-2">{pkg.access}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 