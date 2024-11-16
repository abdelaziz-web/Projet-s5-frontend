// src/components/MatchCard.tsx
interface MatchCardProps {
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
    home: number | null;
    away: number | null;
  };
  status: {
    long: string;
    short: string;
  };
}

export function MatchCard({ league, teams, goals, status }: MatchCardProps) {
  return (
    <div className="bg-green-800/30 rounded-lg p-6 hover:bg-green-800/40 transition-all">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          {league.logo && (
            <img src={league.logo} alt={league.name} className="w-6 h-6" />
          )}
          <span className="text-green-300 text-sm">{league.name}</span>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${
          status.short === 'LIVE' 
            ? 'bg-red-500/20 text-red-300' 
            : 'bg-green-500/20 text-green-300'
        }`}>
          {status.short}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {teams.home.logo && (
            <img 
              src={teams.home.logo} 
              alt={teams.home.name} 
              className="w-8 h-8"
            />
          )}
          <span className="text-white font-medium">{teams.home.name}</span>
        </div>

        <div className="px-4 py-2 bg-green-800/30 rounded-lg">
          <span className="text-white font-bold">
            {goals.home ?? 0} - {goals.away ?? 0}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-white font-medium">{teams.away.name}</span>
          {teams.away.logo && (
            <img 
              src={teams.away.logo} 
              alt={teams.away.name} 
              className="w-8 h-8"
            />
          )}
        </div>
      </div>
    </div>
  );
}