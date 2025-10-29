import { useState, useEffect } from 'react';
import { usersAPI } from '../api/client';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') || 'http://localhost:5000';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await usersAPI.search(searchQuery);
      setUsers(response.data.users);
      setSelectedUser(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleDownloadCV = async (userId) => {
    try {
      const response = await usersAPI.downloadCV(userId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `CV-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError('Failed to download CV');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-darker py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-8 text-center">Admin Dashboard</h1>

        {/* Search Section */}
        <div className="bg-darker/50 border border-primary/30 rounded-lg p-8 glow-effect mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Search by name or mobile number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-dark border border-primary/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-darker px-8 py-3 rounded font-semibold hover:bg-blue-400 transition disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-900/30 border border-red-500 text-red-300 p-4 rounded">
              {error}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Users List */}
          <div className="md:col-span-1">
            <div className="bg-darker/50 border border-primary/30 rounded-lg p-6 glow-effect">
              <h2 className="text-xl font-bold text-primary mb-4">
                Results ({users.length})
              </h2>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {users.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No users found</p>
                ) : (
                  users.map(user => (
                    <button
                      key={user._id}
                      onClick={() => handleViewDetails(user)}
                      className={`w-full text-left p-3 rounded transition ${
                        selectedUser?._id === user._id
                          ? 'bg-primary/30 border border-primary'
                          : 'bg-dark/50 border border-primary/20 hover:border-primary'
                      }`}
                    >
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.mobileNumber}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="md:col-span-2">
            {selectedUser ? (
              <div className="bg-darker/50 border border-primary/30 rounded-lg p-8 glow-effect">
                <h2 className="text-2xl font-bold text-primary mb-6">User Details</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {selectedUser.photo && (
                    <div className="md:col-span-2">
                      <p className="text-gray-400 text-sm mb-2">Photo</p>
                      <img
                        src={usersAPI.getPhoto(selectedUser._id)}
                        alt={selectedUser.name}
                        className="w-32 h-32 rounded-lg object-cover border-2 border-primary shadow-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div style={{ display: 'none' }} className="w-32 h-32 rounded-lg bg-primary/20 border-2 border-primary flex items-center justify-center">
                        <span className="text-primary font-bold text-2xl">
                          {selectedUser.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white font-semibold">{selectedUser.name}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Passport Number</p>
                    <p className="text-white font-semibold">{selectedUser.passportNumber}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Date of Birth</p>
                    <p className="text-white font-semibold">
                      {new Date(selectedUser.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Designation</p>
                    <p className="text-white font-semibold">{selectedUser.designation}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">PP Type</p>
                    <p className="text-white font-semibold">{selectedUser.ppType}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Mobile Number</p>
                    <p className="text-white font-semibold">{selectedUser.mobileNumber}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Village/Town</p>
                    <p className="text-white font-semibold">{selectedUser.villageTown}</p>
                  </div>

                  {selectedUser.remark && (
                    <div>
                      <p className="text-gray-400 text-sm">Remark</p>
                      <p className="text-white font-semibold">{selectedUser.remark}</p>
                    </div>
                  )}
                </div>

                {selectedUser.cv && (
                  <button
                    onClick={() => handleDownloadCV(selectedUser._id)}
                    className="w-full bg-primary text-darker py-3 rounded font-semibold hover:bg-blue-400 transition"
                  >
                    📥 Download CV
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-darker/50 border border-primary/30 rounded-lg p-8 glow-effect text-center text-gray-400">
                <p>Select a user to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
