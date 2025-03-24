import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreateBoardModal from '../../components/CreateBoardModal';
import BoardCard from '../../components/BoardCard';
import { useAppContextData } from '../../lib/AppContext';
import HTTPUtil from '../../lib/httputil';

function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fetchedBoards, setFetchedBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOwnOnly, setShowOwnOnly] = useState(false);
  const { email, token } = useAppContextData();

  function formatDate(dateStr : string) {
    const date = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return `${n}th`;
      switch (n % 10) {
        case 1: return `${n}st`;
        case 2: return `${n}nd`;
        case 3: return `${n}rd`;
        default: return `${n}th`;
      }
    };

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    const formatted = `${year} ${month}, ${getOrdinal(day)}; ${hours}:${minutes} ${ampm}`;
    return formatted;
  }

  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      try {
        const url = import.meta.env.VITE_BACKEND_BASE_URL + import.meta.env.VITE_LOAD_BOARDS_URL;
        const data = await HTTPUtil.request(url, 'GET');
        if (data.status) {
          const formatted = data.data.map((board: any) => ({
            id: board.board_id,
            name: board.name,
            description: board.description,
            collaborators: board.collaborators,
            created_on: formatDate(board.created_on),
            is_owner: board.is_owner,
            owner_name: board.owner_name
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

  // ✅ Combine filters
  const filteredBoards = fetchedBoards.filter(board =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!showOwnOnly || board.is_owner === true)
  );

  return (
    <React.Fragment>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex flex-1 items-center gap-4 w-full md:max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search from the board"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm border border-gray-200">
              <input
                type="checkbox"
                checked={showOwnOnly}
                onChange={() => setShowOwnOnly(prev => !prev)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Show Owned</span>
            </label>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-2">
            {filteredBoards.map(board => (
              <BoardCard
                key={board.id}
                name={board.name}
                description={board.description}
                is_owner={board.is_owner}
                owner_name={board.owner_name}
                created_on={board.created_on}
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
          {showModal && (<CreateBoardModal onClose={() => setShowModal(false)} />
          )}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
