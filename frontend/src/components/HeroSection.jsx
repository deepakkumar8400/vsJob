import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-6">
      {/* Animated Header */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-2xl"
      >
        No.1 Job Hunt Platform 🚀
      </motion.h2>

      {/* Glassmorphism Effect Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 px-8 py-4 text-2xl md:text-3xl font-semibold bg-white/20 backdrop-blur-md text-white rounded-2xl shadow-lg border border-white/30"
      >
        Search, Apply & Land Your Dream Job 💼
      </motion.div>

      {/* Subtext with Glow Effect */}
      <p className="mt-4 text-lg md:text-xl italic opacity-80 text-white/90 animate-pulse">
        Your future starts here. Take the first step today! ✨
      </p>

      {/* Search Bar with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex w-full md:w-[50%] mt-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 items-center shadow-lg"
      >
        <Search className="text-white ml-3" />
        <input
          type="text"
          placeholder="Find your dream job..."
          className="w-full bg-transparent text-white placeholder-white px-3 outline-none"
        />
        <button className="bg-yellow-300 text-black px-4 py-2 rounded-full ml-2 hover:bg-yellow-400 transition">
          Search
        </button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
