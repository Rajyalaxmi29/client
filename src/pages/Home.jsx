import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-pink-100">
      <div className="bg-white/80 p-10 rounded-3xl shadow-lg max-w-xl text-center">
        <SparklesIcon className="w-16 h-16 mx-auto text-pink-400 mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">StyleSense</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your private AI fashion assistant. Upload your outfit, get instant feedback, and build your style confidence!
        </p>
        <a href="/upload" className="inline-block bg-pink-400 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-pink-500 transition">
          Get Started
        </a>
      </div>
    </section>
  );
}
