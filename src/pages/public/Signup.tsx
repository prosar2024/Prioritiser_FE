import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HTTPUtil from "../../lib/httputil";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage([]);
    setLoading(true);

    try {
      const url = import.meta.env.VITE_BACKEND_BASE_URL + import.meta.env.VITE_USER_REGISTRATION;
      const data = await HTTPUtil.request(url, 'POST', JSON.stringify(formData), false);
      if (data.status) {
        navigate("/login?email=" + data.data["email"]+"&type=success&msg=Account has been created, please verify your email to signin. ");
      } else {
        setErrorMessage(Array.isArray(data.messages) ? data.messages : [data.messages]);
      }
    } catch (error) {
      setErrorMessage(["Something went wrong. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Loading Backdrop */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full max-w-md z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">prosar.</h1>
          <p className="text-sm text-gray-500">Prioritise Smarter</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          {errorMessage.length > 0 && (
            <div className="text-red-500 text-sm text-center mb-4">
              {errorMessage.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-white text-gray-900 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
