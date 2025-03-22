import { SetGoals } from './components/board/SetGoals';
import { Warehouse } from './components/board/Warehouse';
import { SolutionBoard } from './components/board/SolutionBoard';
import { useState } from 'react';
import { Check, Pencil } from 'lucide-react';

function Board() {

  const [isEditing, setIsEditing] = useState(false);
  const [boardName, setBoardName] = useState('Sprint 4 - Dev Planning');

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 flex items-center gap-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={() => { setIsEditing(false) }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Check className="h-5 w-5 text-green-600" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{boardName}</h1>
            <button
              onClick={() => { setIsEditing(true) }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Pencil className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SetGoals />
          <Warehouse />
          <SolutionBoard />
        </div>
      </div>


    </div>
  );
}


export default Board;