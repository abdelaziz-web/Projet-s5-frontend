// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Hero } from '../components/Hero';
import { MatchCard } from '../components/MatchCard';
import { StatsSection } from '../components/StatsSection';
import { NewsCard } from '../components/NewsCard';
import { Footer } from '../components/Footer';
import { fetchMatches } from '../services/footballApi';

interface Match {
  league: {
    name: string;
    logo: string;
  };
  teams: {
    home: {
      name: string;
      logo: string;
    };
    away: {
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number;
    away: number;
  };
  fixture: {
    id: number;
    status: {
      long: string;
      short: string;
    };
  };
}

function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const matchesPerPage = 3;

  const news = [
    {
      imageUrl: 'https://www.barlamantoday.com/wp-content/uploads/2024/11/AFCON-Qualifier-Morocco-Dominate-Gabon-3-1.jpeg',
      title: 'Morocco Beats Gabon 5-1 to Stay Top of Group B in AFCON Qualifiers',
      excerpt: 'Morocco Beats Gabon 5-1 to Stay Top of Group B in AFCON Qualifiers...',
    },
    {
      imageUrl: 'https://image-service.onefootball.com/transform?w=840&h=630&dpr=2&image=https%3A%2F%2Ffilebucket.onefootball.com%2F2024%2F11%2F1731771923953-blob',
      title: 'What Messi called the referee in Argentina\'s shock Paraguay defeat',
      excerpt: 'World Cup and Copa America holders Argentina suffered a shock defeat at home against Paraguay on Thursday night....',
    },
    {
      imageUrl: 'https://image-service.onefootball.com/transform?w=840&h=630&dpr=2&image=https%3A%2F%2Ffilebucket.onefootball.com%2F2024%2F11%2F1731786813380-blob',
      title: 'Musiala scores another header to give Germany early lead against Bosnia',
      excerpt: 'Jamal Musiala might be better known for his tricky feet, but he is quicky becoming just as good with his head....',
    },
  ];

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMatches();
        setMatches(data || []);
      } catch (err) {
        setError('Failed to load matches');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();
    const interval = setInterval(loadMatches, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (matches.length > matchesPerPage && !isPaused) {
      const timer = setInterval(() => {
        setCurrentPage(prev => 
          prev === Math.ceil(matches.length / matchesPerPage) - 1 ? 0 : prev + 1
        );
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [matches.length, matchesPerPage, isPaused]);

  const totalPages = Math.ceil(matches.length / matchesPerPage);
  const visibleMatches = matches.slice(
    currentPage * matchesPerPage,
    (currentPage + 1) * matchesPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800">
      <Hero />

      <section 
        className="max-w-6xl mx-auto px-6 py-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Latest Matches</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setCurrentPage(prev => prev > 0 ? prev - 1 : prev);
                setIsPaused(true);
              }}
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${
                currentPage === 0 
                  ? 'text-green-600 cursor-not-allowed' 
                  : 'text-green-400 hover:text-green-300'
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => {
                setCurrentPage(prev => prev < totalPages - 1 ? prev + 1 : prev);
                setIsPaused(true);
              }}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-full ${
                currentPage === totalPages - 1 
                  ? 'text-green-600 cursor-not-allowed' 
                  : 'text-green-400 hover:text-green-300'
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-green-800/20 h-40 rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-8">{error}</div>
        ) : matches.length === 0 ? (
          <div className="text-white text-center py-8">No live matches available</div>
        ) : (
          <div className="relative overflow-hidden">
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentPage * 100}%)`,
                width: `${totalPages * 100}%`
              }}
            >
              {visibleMatches.map((match) => (
                <div key={match.fixture.id} className="bg-green-800/30 p-4 rounded-lg">
                  <div className="text-green-300 text-sm mb-2">{match.league.name}</div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {match.teams.home.logo && (
                          <img 
                            src={match.teams.home.logo} 
                            alt={match.teams.home.name} 
                            className="w-6 h-6"
                          />
                        )}
                        <span className="text-white">{match.teams.home.name}</span>
                      </div>
                      <span className="text-white font-bold">{match.goals.home}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {match.teams.away.logo && (
                          <img 
                            src={match.teams.away.logo} 
                            alt={match.teams.away.name} 
                            className="w-6 h-6"
                          />
                        )}
                        <span className="text-white">{match.teams.away.name}</span>
                      </div>
                      <span className="text-white font-bold">{match.goals.away}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-green-400">
                    {match.fixture.status.long}
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPage(index);
                      setIsPaused(true);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentPage === index 
                        ? 'bg-green-400 w-4' 
                        : 'bg-green-800 hover:bg-green-700'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <StatsSection />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Latest News</h2>
          <button className="text-green-400 hover:text-green-300 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;