import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBoardStore } from './lib/store';
import CreateBoardModal from './CreateBoardModal';
import BoardCard from './BoardCard';
import Footer from './Footer';



function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { boards, addBoard } = useBoardStore();

  const handleCreateBoard = (name: string, description: string) => {
    const newBoardId = crypto.randomUUID();
    addBoard(name, description, newBoardId);
    setShowModal(false);
    navigate(`/board/${newBoardId}`);
  };

  return (
    <React.Fragment>

      <div className="p-6">
        {/* <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm w-full md:w-auto">
                <span className="text-gray-700">Your role</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm w-full md:w-auto">
                <span className="text-gray-700 text-sm">Founder (Building a New Product or Startup)</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div> */}

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {boards.map(board => (
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