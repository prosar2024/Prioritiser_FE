import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Chrome, Microscope as Microsoft } from 'lucide-react';
import { useAppContextData } from './AppContext';

function Login() {
  const { setEmail, setToken, setName } = useAppContextData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageType, setMessageType] = useState('text-blue-500 text-sm mb-4');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const msg = params.get('msg');
    const msg_type = params.get('type');

    if (email) setUsername(email);
    if (msg) setErrorMessage(msg);
    if (msg_type)
      setMessageType(
        msg_type === 'error'
          ? 'text-red-500 text-sm mb-4'
          : 'text-blue-500 text-sm mb-4'
      );
  }, [location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const url = import.meta.env.VITE_BACKEND_BASE_URL.concat(
        import.meta.env.VITE_TOKEN_URL
      );
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.status) {
        setErrorMessage('');
        setToken(data.data.token)
        setEmail(data.data.email)
        setName(data.data.name)
        navigate('/home');
      } else {
        setMessageType('text-red-500 text-sm mb-4')
        setErrorMessage(data.messages[0] || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Backdrop Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">prosar.</h1>
          <p className="text-sm text-gray-500">Prioritise Smarter</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {errorMessage && (
            <center>
              <p className={messageType}>{errorMessage}</p>
            </center>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="w-full bg-white text-gray-900 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Sign Up
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Chrome className="w-5 h-5 text-gray-700" />
                <span className="ml-2">Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Microsoft className="w-5 h-5 text-gray-700" />
                <span className="ml-2">Microsoft</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
