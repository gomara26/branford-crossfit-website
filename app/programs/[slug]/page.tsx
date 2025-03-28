"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useParams } from "next/navigation";
import { programs } from "../programsData";
import { Program } from "../types";
import Image from "next/image";

export default function ProgramPage() {
  const { slug } = useParams();
  const program = programs.find((p: Program) => p.slug === slug);

  if (!program) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Program Not Found</h1>
          <Link href="/programs" className="text-[#FF8C00] hover:text-white transition-colors">
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <Link href="/programs" className="fixed top-4 left-4 text-white/80 hover:text-[#FF8C00] transition-colors">
        <IoArrowBack size={24} />
      </Link>

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
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">{program.description}</p>

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
          </div>
        </motion.div>
      </div>
    </div>
  );
} 