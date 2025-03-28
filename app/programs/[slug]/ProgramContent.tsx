"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import { Program } from "../types";

interface ProgramContentProps {
  program: Program;
}

export default function ProgramContent({ program }: ProgramContentProps) {
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
          href="/programs"
          className="inline-flex items-center text-[#FF8C00] hover:text-white transition-colors duration-300 group"
        >
          <IoArrowBack className="mr-2 text-xl group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-lg font-medium">Back to Programs</span>
        </Link>
      </motion.div>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Image */}
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">{program.title}</h1>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-lg text-gray-300">{program.description}</p>
          </div>

          {/* FAQ Section */}
          {program.faq && program.faq.length > 0 && (
            <div className="mt-12">
              {program.faq.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="mb-8"
                >
                  <h3 className="text-2xl font-bold mb-4 text-[#FF8C00]">{faq.question}</h3>
                  <p className="text-lg text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Ideal For Section */}
          <div className="bg-zinc-900/50 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">Who This Program is For</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {program.idealFor.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-[#FF8C00] text-black px-8 py-4 rounded-lg text-center font-semibold hover:bg-[#FF8C00]/90 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="https://nationathletics.wodify.com/OnlineSalesPortal/ViewSchedule.aspx?IsMobile=True&LocationId=6954&OnlineMembershipId=104579"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#FF8C00] text-[#FF8C00] px-8 py-4 rounded-lg text-center font-semibold hover:bg-[#FF8C00] hover:text-white transition-all duration-300"
            >
              Start Free Trial
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 