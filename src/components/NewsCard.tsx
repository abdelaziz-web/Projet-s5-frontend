import React from 'react';
import { ChevronRight } from 'lucide-react';

interface NewsCardProps {
  imageUrl: string;
  title: string;
  excerpt: string;
}

export function NewsCard({ imageUrl, title, excerpt }: NewsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{excerpt}</p>
        <button className="text-green-400 hover:text-green-300 flex items-center">
          Read More <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
}