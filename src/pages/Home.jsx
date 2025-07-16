import React from 'react';
import { FiArrowRight, FiUpload, FiAward, FiCalendar, FiSmile, FiLock } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.1.0&auto=format&fit=crop&w=1350&q=80')] bg-cover opacity-20"></div>
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-24 max-w-6xl mx-auto gap-12 relative z-10">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-6 text-white">
              Your Private <span className="text-[#FFD700]">AI Fashion</span> Stylist
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              Discover your perfect look with AI-powered analysis, <span className="text-[#FFD700]">100% private</span>. 
              Get instant feedback on colors, fits, and styles tailored just for you.
            </p>
            <div className="flex gap-4">
              <a 
                href="/upload" 
                className="bg-[#FFD700] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#E6C200] transition flex items-center gap-2"
              >
                Try Now <FiArrowRight />
              </a>
              <a 
                href="#features" 
                className="border border-[#FFD700] text-[#FFD700] px-6 py-3 rounded-full hover:bg-[#FFD700]/10 transition"
              >
                Explore Features
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.1.0&auto=format&fit=crop&w=687&q=80"
              alt="Fashion AI Preview"
              className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-[#FFD700]/30"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          <span className="text-[#FFD700]">AI-Powered</span> Style Revolution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: Virtual Try-On */}
          <div className="bg-[#2D2D2D] p-6 rounded-xl hover:border hover:border-[#FFD700]/50 transition group">
            <div className="bg-[#FFD700] w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiUpload className="text-black text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Virtual Try-On</h3>
            <p className="text-gray-400 mb-4">
              See how clothes look on you in <span className="text-[#FFD700]">real-time AR</span> before buying.
            </p>
            <span className="text-xs bg-[#FFD700]/10 text-[#FFD700] px-3 py-1 rounded-full">Coming Soon</span>
          </div>

          {/* Feature 2: Smart Closet */}
          <div className="bg-[#2D2D2D] p-6 rounded-xl hover:border hover:border-[#FFD700]/50 transition">
            <div className="bg-[#FFD700] w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiAward className="text-black text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Smart Closet</h3>
            <p className="text-gray-400 mb-4">
              Upload your wardrobe for <span className="text-[#FFD700]">AI-generated outfit combos</span>.
            </p>
            <span className="text-xs bg-[#FFD700]/10 text-[#FFD700] px-3 py-1 rounded-full">Beta</span>
          </div>

          {/* Feature 3: Style Calendar */}
          <div className="bg-[#2D2D2D] p-6 rounded-xl hover:border hover:border-[#FFD700]/50 transition">
            <div className="bg-[#FFD700] w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiCalendar className="text-black text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Style Calendar</h3>
            <p className="text-gray-400 mb-4">
              Plan outfits by <span className="text-[#FFD700]">weather, mood, and events</span>.
            </p>
          </div>
        </div>
      </section>

      {/* AI Analysis Section */}
      <section className="py-16 px-8 max-w-6xl mx-auto bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] rounded-2xl my-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.1.0&auto=format&fit=crop&w=687&q=80"
              alt="AI Analysis"
              className="rounded-2xl shadow-xl border-4 border-[#FFD700]/20"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-white">
              <span className="text-[#FFD700]">Instant</span> AI Feedback
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiSmile className="text-[#FFD700] mt-1" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Mood-Based Suggestions:</span> Get outfits matching your energy.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <FiLock className="text-[#FFD700] mt-1" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Private Skin Tone Analysis:</span> Upload your hand for personalized palettes.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-white text-lg mb-6">
            Ready to transform your style? <span className="text-[#FFD700]">Join 50,000+ users</span> who trust StyleSense.
          </p>
          <a 
            href="/signup" 
            className="bg-[#FFD700] text-black px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-[#E6C200] transition"
          >
            Start Free Trial <FiArrowRight />
          </a>
          <div className="mt-8 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} StyleSense. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}