import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-6 text-center">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />

      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Oops! Page not found.
      </h1>

      <p className="text-gray-600 text-lg max-w-xl mb-8">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/home')}
        className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-full transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
}
