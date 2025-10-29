import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api/client';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!credentials.username || !credentials.password) {
      setError('Username and password are required');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login with:', { username: credentials.username });
      const response = await authAPI.login(credentials.username, credentials.password);
      console.log('Login response:', response.data);
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.admin) {
          localStorage.setItem('admin', JSON.stringify(response.data.admin));
        }
        navigate('/admin/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-darker flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-darker/50 border border-primary/30 rounded-lg p-8 glow-effect">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-8">
            <span className="text-3xl font-bold text-darker">SC</span>
          </div>

          <h1 className="text-3xl font-bold gradient-text mb-2 text-center">Admin Login</h1>
          <p className="text-gray-400 text-center mb-8">Access your admin dashboard</p>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="w-full bg-dark border border-primary/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full bg-dark border border-primary/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-darker py-3 rounded font-semibold hover:bg-blue-400 transition disabled:opacity-50 mt-6"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/admin/register" className="text-primary hover:text-blue-400 font-semibold">
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded text-sm text-gray-300">
            <p className="font-semibold mb-2">ℹ️ First Time?</p>
            <p>Create an admin account by clicking "Register here" above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
