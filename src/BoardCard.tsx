import { motion } from 'framer-motion';
import { User, Users } from 'lucide-react';

function BoardCard({ name, description, is_owner, owner_name, created_on }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="aspect-square bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col"
    >
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-600 flex-1 line-clamp-4">{description}</p>

      <p className="text-sm mt-2 flex items-center gap-2">
        Owner: {owner_name}
        {is_owner ? (
          <User className="h-4 w-4 text-green-600" />
        ) : (
          <Users className="h-4 w-4 text-red-600" />
        )}
      </p>

      <p className="text-sm text-gray-500 mt-4">
        {created_on}
      </p>
    </motion.div>
  );
}

export default BoardCard;
