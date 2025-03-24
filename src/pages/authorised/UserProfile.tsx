import { useAppContextData } from '../../lib/AppContext';
import { useState } from 'react';
import { Pencil } from 'lucide-react';

export function UserProfile() {
  const { name, email } = useAppContextData();

  const [formData, setFormData] = useState({
    name: name || '',
    email: email || '',
    password: '',
    otp: '',
    roles: ''
  });

  const [editField, setEditField] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpSend = () => {
    // Send OTP API call here
    setOtpSent(true);
    console.log("OTP sent to:", formData.email);
  };

  const handleSave = () => {
    setEditField(null);
    setOtpSent(false);
    console.log("Saved Data:", formData);
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8 w-full mx-auto">
        <h1 className="text-2xl font-semibold mb-6">{name}'s Profile</h1>

        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <div className="flex items-center gap-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFieldChange}
            readOnly={editField !== 'name'}
            className={`w-full lg:w-1/2 border px-4 py-2 rounded-md focus:outline-none focus:ring ${
              editField === 'name'
                ? 'border-gray-400'
                : 'bg-gray-100 cursor-not-allowed'
            }`}
          />
            <button onClick={() => setEditField('name')}>
              <Pencil className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              readOnly={editField !== 'email'}
              className={`w-full lg:w-1/2 border px-4 py-2 rounded-md focus:outline-none focus:ring ${
                editField === 'email'
                  ? 'border-gray-400'
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
            />
            <button onClick={() => setEditField('email')}>
              <Pencil className="h-4 w-4 text-gray-500" />
            </button>
            {editField === 'email' && (
              <button
                onClick={handleOtpSend}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Send OTP
              </button>
            )}
          </div>
          {editField === 'email' && otpSent && (
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleFieldChange}
              placeholder="Enter OTP"
              className="w-full lg:w-1/2 border px-4 py-2 rounded-md focus:outline-none focus:ring border-gray-400"
            />
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="flex items-center gap-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFieldChange}
              readOnly={editField !== 'password'}
              className={`w-full lg:w-1/2 border px-4 py-2 rounded-md focus:outline-none focus:ring ${
                editField === 'password'
                  ? 'border-gray-400'
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
            />
            <button onClick={() => setEditField('password')}>
              <Pencil className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Roles and Responsibilities Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Roles and Responsibilities
          </label>
          <div className="flex items-start gap-2">
            <textarea
              name="roles"
              value={formData.roles}
              onChange={handleFieldChange}
              readOnly={editField !== 'roles'}
              rows={6}
              className={`w-full lg:w-1/2 border px-4 py-2 rounded-md focus:outline-none focus:ring ${
                editField === 'roles'
                  ? 'border-gray-400'
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
            />
            <button 
              onClick={() => setEditField('roles')}
              className="mt-2"
            >
              <Pencil className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Save Button */}
        {editField && (
          <div className="justify-end gap-2 mt-4">
            <button
              onClick={handleSave}
              className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              onClick={() => {
                setEditField(null);
                setFormData(prev => ({ ...prev, otp: '' }));
              }}
              className="text-sm bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

    </div>
  );
}