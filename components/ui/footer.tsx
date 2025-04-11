"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>131 Commercial Pkwy Building 3</p>
            <p>Branford, CT 06405</p>
            <p>United States</p>
            <p>Phone: (203) 208-1788</p>
            <p>Email: info@branfordcrossfit.com</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs" className="hover:text-[#FF8C00] transition-colors">Programs</Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-[#FF8C00] transition-colors">Schedule</Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-[#FF8C00] transition-colors">Packages</Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-[#FF8C00] transition-colors">Community</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF8C00] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>5:00 AM - 7:30 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span>8:00 AM - 12:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span>9:00 AM - 11:00 AM</span>
              </p>
            </div>
          </div>

          {/* Social & Affiliations */}
          <div className="space-y-8">
            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/BranfordCrossFit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF8C00]/20 p-3 rounded-full hover:bg-[#FF8C00] transition-colors"
                >
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/branford_crossfit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF8C00]/20 p-3 rounded-full hover:bg-[#FF8C00] transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Affiliate Logos */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Affiliations</h3>
              <div className="flex flex-col gap-4">
                <div className="relative h-10 w-full">
                  <Image
                    src="/images/crossfit-logo.jpg"
                    alt="CrossFit Affiliate"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative h-16 w-full">
                  <Image
                    src="/images/wehightliftinglogo.png"
                    alt="USA Weightlifting"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#FF8C00]/20 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Branford CrossFit. All rights reserved.</p>
          <div className="mt-4">
            <Link 
              href="/admin" 
              className="text-xs text-gray-500 hover:text-[#FF8C00] transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 