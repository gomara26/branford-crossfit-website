"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import Cookies from "js-cookie";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded password
    if (password === "BCF123!") {
      Cookies.set("adminAuth", "true", { expires: 1 }); // Expires in 1 day
      router.push("/admin");
    } else {
      setError("Invalid password");
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

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-md mx-auto bg-[#1a1a1a] rounded-2xl p-8 border border-[#FF8C00]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 text-red-500 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-[#FF8C00]/20 rounded-lg focus:outline-none focus:border-[#FF8C00] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF8C00] text-white py-3 rounded-lg font-medium hover:bg-[#FF8C00]/90 transition-colors"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
} 