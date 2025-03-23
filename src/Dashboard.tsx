import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreateBoardModal from './CreateBoardModal';
import BoardCard from './BoardCard';
import { useAppContextData } from './AppContext';

function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fetchedBoards, setFetchedBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { email, name, token } = useAppContextData();

  const handleCreateBoard = (name: string, description: string) => {
    const newBoardId = crypto.randomUUID();
    setFetchedBoards(prev => [...prev, { id: newBoardId, name, description }]);
    setShowModal(false);
    navigate(`/board/${newBoardId}`);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      try {
        const url = import.meta.env.VITE_BACKEND_BASE_URL+import.meta.env.VITE_LOAD_BOARDS_URL
        const response = await fetch(url, {
          headers: {
            'email': email,
            'token': token,
          },
        });

        const data = await response.json();

        if (data.status) {
          const formatted = data.data.map((board: any, index: number) => ({
            id: index.toString(), // Use backend board_id here if available
            name: board.name,
            description: board.description,
            collaborators: board.collaborators,
            owner: board.owner,
          }));
          setFetchedBoards(formatted);
        } else {
          console.error(data.messages?.[0] || 'Failed to fetch boards');
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, [email, token]);

  return (
    <React.Fragment>
    
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search from the board"
              className="w-full pl-10 pr-4 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => navigate('/ideas')}
            className="text-blue-600 hover:text-blue-700 w-full md:w-auto text-center"
          >
            View in Idea Hub
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fetchedBoards.map(board => (
              <BoardCard
                key={board.id}
                board={board}
                onClick={() => navigate(`/board/${board.id}`)}
              />
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="aspect-square bg-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
            >
              <Plus className="h-8 w-8 text-gray-600" />
              <span className="text-gray-800 font-medium">Add Board</span>
            </motion.button>
          </div>
        )}

        <AnimatePresence>
          {showModal && (
            <CreateBoardModal
              onClose={() => setShowModal(false)}
              onSubmit={handleCreateBoard}
            />
          )}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
