import { motion } from 'framer-motion';

function BoardCard({ board, onClick }: { board: { id: string; name: string; description: string; createdAt: Date }; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="aspect-square bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col"
    >
      <h3 className="text-lg font-semibold mb-2">{board.name}</h3>
      <p className="text-sm text-gray-600 flex-1 line-clamp-4">{board.description}</p>
      
      <p className="text-sm text-gray-500 mt-4">
        Created {new Date(board.createdAt).toLocaleDateString()}
      </p>
    </motion.div>
  );
}


export default BoardCard;