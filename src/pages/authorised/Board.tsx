import { useState } from 'react';
import { SetGoals } from '../../components/board/SetGoals';
import { Warehouse } from '../../components/board/Warehouse';
import { SolutionBoard } from '../../components/board/SolutionBoard';
import { Pencil } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import UpdateBoardModal from '../../components/UpdateBoardModal';
import { useBoardContext } from '../../lib/BoardContext';

function Board() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { boardName } = useBoardContext();

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{boardName}</h1>
            <button
              onClick={() => setShowUpdateModal(true)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Pencil className="h-4 w-4 text-gray-500" />
            </button>
            
        </div>
      </div>

      <div className="flex-1">
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SetGoals />
          <Warehouse />
          <SolutionBoard />
        </div>
      </div>

      <AnimatePresence>
        {showUpdateModal && (<UpdateBoardModal onClose={() => setShowUpdateModal(false)} />) }
      </AnimatePresence>
      
    </div>
  );
}

export default Board;
