// src/services/footballApi.ts
const API_KEY = '9e1146e8521eb5ca3cd75257ff7d80fa';
const BASE_URL = 'https://v3.football.api-sports.io';

interface Fixture {
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

export async function fetchMatches() {
  try {
    const response = await fetch(`${BASE_URL}/fixtures?live=all`, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }

    const data = await response.json();
    return data.response as Fixture[];
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
}