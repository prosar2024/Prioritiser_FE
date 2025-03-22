import { useState } from 'react';
import { motion } from 'framer-motion';

function CreateBoardModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (name: string, description: string) => void }) {
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Board</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="boardName" className="block text-sm font-medium text-gray-700 mb-1">
              Board Name
            </label>
            <input
              id="boardName"
              type="text"
              placeholder="Enter board name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="boardDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="boardDescription"
              placeholder="Enter board description"
              value={boardDescription}
              onChange={(e) => setBoardDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (boardName.trim()) {
                onSubmit(boardName, boardDescription);
              }
            }}
            disabled={!boardName.trim()}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            Create Board
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateBoardModal;