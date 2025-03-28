"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

export default function Contact() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: `${formData.fname} ${formData.lname}`,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }
      );

      setStatus('success');
      setFormData({ fname: '', lname: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

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
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          CONTACT & INFO
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-900/50 p-8 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#FF8C00]">Contact Information</h2>
            <div className="space-y-4">
              <p className="text-lg">
                <span className="text-[#FF8C00]">Address:</span><br />
                131 Commercial Pkwy Building 3<br />
                Branford, CT, 06405<br />
                United States
              </p>
              <p className="text-lg">
                <span className="text-[#FF8C00]">Phone:</span><br />
                <a href="tel:203-208-1825" className="hover:text-[#FF8C00] transition-colors">
                  203-208-1825
                </a>
              </p>
              <p className="text-lg">
                <span className="text-[#FF8C00]">Email:</span><br />
                <a href="mailto:info@branfordcrossfit.com" className="hover:text-[#FF8C00] transition-colors">
                  info@branfordcrossfit.com
                </a>
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-[#FF8C00]">Hours</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>Monday</div><div>5am-7:30pm</div>
                  <div>Tuesday</div><div>5am-7:30pm</div>
                  <div>Wednesday</div><div>5am-7:30pm</div>
                  <div>Thursday</div><div>5am-7:30pm</div>
                  <div>Friday</div><div>5am-6:30pm</div>
                  <div>Saturday</div><div>8am-10:30am</div>
                  <div>Sunday</div><div>8am-11am</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-[400px] md:h-full min-h-[400px] relative rounded-lg overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.638011609811!2d-72.81893492412927!3d41.33931659912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d3c147e3c507%3A0x67f84d2e2c4d8f4f!2s131%20Commercial%20Pkwy%20Building%203%2C%20Branford%2C%20CT%2006405!5e0!3m2!1sen!2sus!4v1709595844150!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-zinc-900/50 p-8 rounded-lg max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#FF8C00]">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={(e) => setFormData({...formData, fname: e.target.value})}
                  required
                  className="w-full bg-black border border-zinc-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#FF8C00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={(e) => setFormData({...formData, lname: e.target.value})}
                  required
                  className="w-full bg-black border border-zinc-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#FF8C00]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full bg-black border border-zinc-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                className="w-full bg-black border border-zinc-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#FF8C00]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows={4}
                className="w-full bg-black border border-zinc-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#FF8C00]"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`w-full bg-[#FF8C00] text-black font-bold py-3 px-6 rounded-md hover:bg-[#FF8C00]/90 transition-colors ${
                status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 