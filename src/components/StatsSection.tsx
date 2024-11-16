import React from 'react';
import { Trophy, Calendar, Star, Users } from 'lucide-react';

export function StatsSection() {
  const stats = [
    { icon: Trophy, value: '20+', label: 'Tournaments' },
    { icon: Calendar, value: '150+', label: 'Matches' },
    { icon: Star, value: '50+', label: 'Teams' },
    { icon: Users, value: '1M+', label: 'Fans' },
  ];

  return (
    <section className="bg-white/5 backdrop-blur-lg py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">{value}</h3>
              <p className="text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}