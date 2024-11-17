import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dribbble, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4">
      <Link to="/" className="flex items-center space-x-2 text-white">
        <Dribbble className="h-8 w-8" />
        <span className="text-2xl font-bold">ProLeague</span>
      </Link>
      
      <div className="flex items-center space-x-6">
        <div className="flex space-x-6 text-white">
          <Link to="#" className="hover:text-green-400 transition">Matches</Link>
          <Link to="#" className="hover:text-green-400 transition">Teams</Link>
          <Link to="#" className="hover:text-green-400 transition">News</Link>
          <Link to="#" className="hover:text-green-400 transition">Statistics</Link>
        </div>

        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white">{user.firstName}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-white hover:text-green-400 transition"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-green-400 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}