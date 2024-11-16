import React from 'react';
import { Dribbble } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-green-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dribbble className="h-8 w-8" />
            <span className="text-2xl font-bold">ProLeague</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-green-400 transition">About</a>
            <a href="#" className="hover:text-green-400 transition">Contact</a>
            <a href="#" className="hover:text-green-400 transition">Privacy</a>
            <a href="#" className="hover:text-green-400 transition">Terms</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2024 ProLeague. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}