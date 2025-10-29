import { useState } from 'react';
import { usersAPI } from '../api/client';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    passportNumber: '',
    dateOfBirth: '',
    designation: '',
    ppType: '',
    mobileNumber: '',
    villageTown: '',
    remark: '',
  });

  const [files, setFiles] = useState({ photo: null, cv: null });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles(prev => ({ ...prev, [name]: fileList[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      if (files.photo) data.append('photo', files.photo);
      if (files.cv) data.append('cv', files.cv);

      await usersAPI.register(data);
      setMessage('✅ Registration successful!');
      setFormData({
        name: '',
        passportNumber: '',
        dateOfBirth: '',
        designation: '',
        ppType: '',
        mobileNumber: '',
        villageTown: '',
        remark: '',
      });
      setFiles({ photo: null, cv: null });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-darker py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-darker/50 border border-primary/30 rounded-lg p-8 glow-effect">
          <h1 className="text-3xl font-bold gradient-text mb-8 text-center">User Registration</h1>

          {message && (
            <div className="bg-green-900/30 border border-green-500 text-green-300 p-4 rounded mb-6">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-dark border border-primary/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                name="passportNumber"
                placeholder="Passport Number"
                value={formData.passportNumber}
                onChange={handleChange}
                required
                className="bg-dark border border-primary/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="bg-dark border border-primary/30 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="bg-dark border border-primary/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="ppType"
                placeholder="PP Type"
                value={formData.ppType}
                onChange={handleChange}
                required
                className="bg-dark border border-primary/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="bg-dark border border-primary/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <input
              type="text"
              name="villageTown"
              placeholder="Village/Town"
              value={formData.villageTown}
              onChange={handleChange}
              required
              className="w-full bg-dark border border-primary/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />

            <textarea
              name="remark"
              placeholder="Remark (Optional)"
              value={formData.remark}
              onChange={handleChange}
              rows="3"
              className="w-full bg-dark border border-primary/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Photo (JPG/PNG)</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="w-full bg-dark border border-primary/30 rounded px-4 py-2 text-white file:bg-primary file:text-darker file:border-0 file:rounded file:px-3 file:py-1 file:font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">CV (PDF/DOC)</label>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full bg-dark border border-primary/30 rounded px-4 py-2 text-white file:bg-primary file:text-darker file:border-0 file:rounded file:px-3 file:py-1 file:font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-darker py-3 rounded font-semibold hover:bg-blue-400 transition disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
