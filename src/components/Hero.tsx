import React from 'react';
import { Navbar } from './Navbar';

export function Hero() {
  return (
    <header className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80"
          alt="Football stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32">
        <h1 className="text-5xl font-bold text-white mb-6">Experience the Beautiful Game</h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">Follow your favorite teams, stay updated with live scores, and never miss a moment of football action.</p>
        <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition">
          View Latest Matches
        </button>
      </div>
    </header>
  );
}