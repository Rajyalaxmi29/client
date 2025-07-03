import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f0] via-[#e0e7fa] to-[#f8e1f4] transition-colors flex flex-col">
      {/* Hero Section (Image Left, Text Right) */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-6xl mx-auto gap-12">
        <div className="flex-1 flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fashion AI preview"
            className="w-80 h-96 object-cover rounded-3xl shadow-xl border-4 border-white"
          />
        </div>
        <div className="flex-1 md:pl-12">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
            Your Private AI Fashion Assistant
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            StyleSense helps you find your best look with privacy-first AI analysis and creative tools.
          </p>
          <p className="mb-6 text-lg text-gray-700">
            Upload your outfit, get instant AI-powered feedback, discover your best colors, and build your wardrobe with confidence.<br />
            StyleSense helps you find your unique look—privately and securely.
          </p>
          <a href="/upload" className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-8 py-3 rounded-full font-semibold shadow hover:from-pink-500 hover:to-blue-500 transition">
            Get Started
          </a>
        </div>
      </section>

      {/* Upload Section (Text Left, Image Right) */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center py-16 px-8 gap-12">
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Upload Outfit"
            className="w-80 h-80 object-cover rounded-2xl shadow-lg border-4 border-white"
          />
        </div>
        <div className="flex-1 md:pr-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            Upload Your Outfit & Skin Tone
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Easily upload your outfit and (optionally) your hand for skin tone detection. All uploads are private.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            Snap and upload your outfit and (optionally) your hand for skin tone detection.<br />
            <span className="font-semibold">Only you</span> can see your images. No one else has access.
          </p>
        </div>
      </section>

      {/* AI Analysis Section (Image Left, Text Right) */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center py-16 px-8 gap-12">
        <div className="flex-1 flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_vector-1705526270279-0a529cfb31ab?w=352&dpr=2&h=367&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
            alt="AI Analysis"
            className="w-80 h-80 object-cover rounded-2xl shadow-lg border-4 border-white "
          />
        </div>
        <div className="flex-1 md:pl-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            AI-Powered Feedback
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Instantly receive outfit ratings, color palette suggestions, and celebration animations—personalized for you.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            Instantly get outfit ratings, celebration animations, and color palette suggestions tailored to your mood and skin tone.<br />
            Our AI explains why each palette works for you.
          </p>
        </div>
      </section>

      {/* Dashboard Section (Text Left, Image Right) */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center py-16 px-8 gap-12">
        <div className="flex-1 flex justify-center">
          <img
            src="https://media.istockphoto.com/id/2185596989/vector/casual-men-fashion-clothes-set-comfort-outfits-of-young-man-collection-in-wardrobe.jpg?s=612x612&w=0&k=20&c=Z_RE662zn2ptiTe6P9pFguIynKm1imXvg_W0qKPZ3Rw="
            alt="Dashboard"
            className="w-80 h-80 object-cover rounded-2xl shadow-lg border-4 border-white"
          />
        </div>
        <div className="flex-1 md:pr-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            Your Style Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Track your style progress, plan outfits in a calendar, save your favorite looks and palettes, and manage your private style journal.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            Save your favorite outfits, color palettes, and ratings. Log in to track your style journey and revisit your best looks anytime.
          </p>
        </div>
      </section>

      {/* Privacy & Contact Footer */}
      <footer className="bg-[#f8e1f4] py-10 text-center mt-12">
        <div className="max-w-2xl mx-auto mb-4">
          <p className="text-gray-700 text-lg font-semibold mb-2">
            🔒 <span className="font-bold">Your privacy matters:</span> Your uploaded photos are <span className="font-bold">100% private</span>. Only you can access or delete them anytime. No one else will ever see your images.
          </p>
          <p className="text-gray-600 text-base">
            For questions or support, contact us at: <a href="mailto:support@stylesense.com" className="text-pink-600 underline">support@stylesense.com</a>
          </p>
        </div>
        <div className="text-gray-500 text-sm mt-4">
          &copy; {new Date().getFullYear()} StyleSense. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
