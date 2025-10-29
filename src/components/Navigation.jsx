import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-darker border-b border-primary/30 glow-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-12 h-12 rounded-full border-2 border-primary/40 overflow-hidden flex-shrink-0 shadow-md shadow-primary/20 bg-white/5 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Sanjay Consultancy Logo" 
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span style={{ display: 'none' }} className="text-lg font-bold text-primary">SC</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="gradient-text font-bold text-lg leading-none">Sanjay Consultancy</span>
              <span className="text-xs text-gray-400">Passport & Visa Solutions</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-primary transition">Home</Link>
            <Link to="/register" className="text-gray-300 hover:text-primary transition">Register</Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/admin/dashboard" className="text-gray-300 hover:text-primary transition">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/admin/register" className="text-gray-300 hover:text-primary transition text-sm">
                  Admin Register
                </Link>
                <Link to="/admin/login" className="bg-primary text-darker px-4 py-2 rounded font-semibold hover:bg-blue-400 transition text-sm">
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
