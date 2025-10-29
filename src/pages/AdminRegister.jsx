import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api/client';

export default function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await authAPI.register(
        formData.username,
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      setSuccess('✅ Admin registered successfully! Redirecting to login...');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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

          <h1 className="text-3xl font-bold gradient-text mb-2 text-center">Admin Register</h1>
          <p className="text-gray-400 text-center mb-8">Create your admin account</p>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900/30 border border-green-500 text-green-300 p-4 rounded mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username (min 3 characters)"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-dark border border-primary/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
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
                placeholder="Enter password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-dark border border-primary/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
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
              {loading ? 'Registering...' : 'Register as Admin'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/admin/login" className="text-primary hover:text-blue-400 font-semibold">
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded text-sm text-gray-300">
            <p className="font-semibold mb-2">📝 Registration Info:</p>
            <ul className="text-xs space-y-1">
              <li>✓ Username must be at least 3 characters</li>
              <li>✓ Email must be valid</li>
              <li>✓ Password must be at least 6 characters</li>
              <li>✓ Passwords must match</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
