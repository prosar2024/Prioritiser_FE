import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-6">
      <br/><br/><br/><br/><br/><br/>
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Welcome to <span className="text-gray-400">Prosar Prioritiser</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl text-gray-300">
          The AI-based prioritizer tool that helps you focus on what truly matters. Let Prosar guide your day, tasks, and decisions.
        </p>
      </header>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-3 text-lg bg-gray-700 hover:bg-gray-600 rounded-full shadow-lg transition-all duration-300"
        >
          Get Started
        </button>
        <p className="text-sm text-gray-400">No signup required to explore</p>
      </div>

      <div className="mt-16 text-center max-w-3xl">
        <h2 className="text-3xl font-semibold mb-4">Why Prosar?</h2>
        <ul className="text-gray-400 space-y-2">
          <li>✅ AI-driven task analysis and ranking</li>
          <li>✅ Customisable priorities: work, personal, or both</li>
          <li>✅ Elegant, distraction-free interface</li>
          <li>✅ Available across all your devices</li>
        </ul>
      </div>

      <footer className="mt-auto py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Prosar. All rights reserved.
      </footer>
    </div>
  );
}