import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';
import HTTPUtil from '../lib/httputil';
import { useBoardContext } from '../lib/BoardContext';

function UpdateBoardModal({onClose}) {
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [collaboratorOptions, setCollaboratorOptions] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { boardID, boardName, boardDescription, ownerName, canEdit, collaborators } = useBoardContext();
    

  

  useEffect(() => {
    const fetchCollaborators = async () => {
      setLoading(true);
      setError('');

      try {
        const eligible_contributors_url = import.meta.env.VITE_BACKEND_BASE_URL + import.meta.env.VITE_ELIGILE_CONTRIBUTORS;
        let data = await HTTPUtil.request(eligible_contributors_url, "POST")
        if (data.status) {
          const formatted = data.data.map((item: { name: string; email: string }) => ({
            value: item.email,
            label: `${item.name} | ${item.email}`,
          }));
          setCollaboratorOptions(formatted);

          var selCollab = collaborators
            .filter((item: { name: string; email: string, owner:boolean }) => item.owner != true)
            .map((item: { name: string; email: string }) => ({
              value: item.email,
              label: `${item.name} | ${item.email}`,
            }));
          setSelectedCollaborators(selCollab)
          
          setName(boardName)
          setDesc(boardDescription)

        } else {
          setError(data.messages?.[0] || 'Failed to fetch collaborators');
        }
      } catch (err) {
        setError('An unexpected error occurred while fetching collaborators');
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, []);


  const handleUpdateBoard = async () => {
    if (!boardName.trim()) return;

    const collaborators = selectedCollaborators.map((c: any) => c.value);
    setLoading(true);
    setError('');

    try {
      const create_board_url = import.meta.env.VITE_BACKEND_BASE_URL + import.meta.env.VITE_UPDATE_BOARD_API;
      let body = JSON.stringify({
        board_id : boardID,
        name: boardName,
        description: boardDescription,
        collaborators,
      })
      let data = await HTTPUtil.request(create_board_url, "POST", body)
      console.log(data)  
      if (data.status) {
        onClose();
      } else {
        setError(data.messages?.[0] || 'Failed to create board');
      }
    } catch (err) {
      setError('An error occurred while creating the board');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 z-10"
      >
        <h2 className="text-xl font-semibold mb-4">Update Board</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="boardName" className="block text-sm font-medium text-gray-700 mb-1">
              Board Name
            </label>
            <input
              id="boardName"
              type="text"
              readOnly={!canEdit}
              disabled={loading || !canEdit}
              placeholder="Enter board name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              readOnly={!canEdit}
              disabled={loading || !canEdit}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collaborators (Board Owner: {ownerName})
            </label>
            <Select
              isMulti
              options={collaboratorOptions}
              value={selectedCollaborators}
              onChange={setSelectedCollaborators}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select collaborators..."
              isDisabled={loading || !canEdit}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          {canEdit &&
          <button
            disabled={!boardName.trim() || loading}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            onClick={handleUpdateBoard}
          >
            Update Board
          </button>
          }
        </div>
      </motion.div>
    </div>
  );
}

export default UpdateBoardModal;
