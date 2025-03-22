import { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface IdeaNodeProps {
  text: string;
  angle: number;
  radius: number;
  centerX: number;
  centerY: number;
  size?: number;
  isGoal?: boolean;
  variant?: 'dark' | 'light';
  onSelect?: () => void;
  isSelected?: boolean;
  connections?: Array<{ id: string; strength: number }>;
  description?: string;
}

interface IdeaDetailsProps {
  idea: {
    text: string;
    description: string;
    relatedGoals: string[];
    impact: string;
    effort: string;
  };
  onClose: () => void;
}

function IdeaDetails({ idea, onClose }: IdeaDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        <h3 className="text-xl font-semibold mb-4">{idea.text}</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
            <p className="text-gray-600">{idea.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Related Goals</h4>
            <div className="flex flex-wrap gap-2">
              {idea.relatedGoals.map((goal, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Impact</h4>
              <p className="text-gray-600">{idea.impact}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Effort</h4>
              <p className="text-gray-600">{idea.effort}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IdeaNode({ 
  text, 
  angle, 
  radius, 
  centerX, 
  centerY, 
  size = 100, 
  isGoal, 
  variant = 'dark',
  onSelect,
  isSelected,
  connections = [],
  description = ''
}: IdeaNodeProps) {
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  return (
    <>
      {connections.map(({ id, strength }, index) => (
        <svg
          key={`${text}-${id}-${index}`}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: strength,
              strokeWidth: strength * 3
            }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            x1={x + size / 2}
            y1={y + size / 2}
            x2={centerX}
            y2={centerY}
            stroke={variant === 'dark' ? '#1a1a1a' : '#d1d5db'}
            strokeDasharray="5,5"
          />
        </svg>
      ))}
      <motion.div
        className={cn(
          'absolute rounded-full flex items-center justify-center cursor-pointer transition-all',
          isGoal ? 'bg-white bg-opacity-10' : variant === 'dark' ? 'bg-gray-900' : 'bg-gray-300',
          isGoal ? 'text-lg' : 'text-sm',
          isSelected && !isGoal && 'ring-2 ring-blue-500 scale-110'
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          x: x - size / 2,
          y: y - size / 2,
          zIndex: isGoal ? 10 : 1,
        }}
        whileHover={{ scale: 1.1 }}
        onClick={onSelect}
        title={description}
      >
        <span className={cn(
          'font-medium text-center px-2',
          isGoal ? 'text-gray-800' : 'text-white'
        )}>
          {text}
        </span>
      </motion.div>
    </>
  );
}

export function IdeaHub() {
  const [showConnections, setShowConnections] = useState(false);
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([]);
  const [selectedIdeaDetails, setSelectedIdeaDetails] = useState<any>(null);

  const goal1Center = { x: window.innerWidth * 0.3, y: window.innerHeight * 0.5 };
  const goal2Center = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.5 };
  const radius = 200;

  const ideas = {
    'idea-1.1': {
      text: 'Idea 1.1',
      description: 'Implement AI-driven personalization for user recommendations',
      relatedGoals: ['Goal 1', 'Goal 2'],
      impact: 'High - Could increase user engagement by 40%',
      effort: 'Medium - 2-3 months development time'
    },
    'idea-1.2': {
      text: 'Idea 1.2',
      description: 'Add real-time collaboration features',
      relatedGoals: ['Goal 1'],
      impact: 'Medium - Better team productivity',
      effort: 'High - Requires significant backend work'
    }
    // Add more ideas as needed
  };

  const toggleIdea = (ideaId: string) => {
    setSelectedIdeas(prev => 
      prev.includes(ideaId) ? prev.filter(i => i !== ideaId) : [...prev, ideaId]
    );
  };

  const showIdeaDetails = (ideaId: string) => {
    setSelectedIdeaDetails(ideas[ideaId]);
  };

  const toggleConnections = () => {
    setShowConnections(prev => !prev);
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="h-16 bg-gray-300 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6" />
          <span className="font-semibold">IdeaHub</span>
        </div>
        <button 
          className={cn(
            "px-4 py-2 rounded-md text-sm transition-colors",
            showConnections 
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-900 text-white hover:bg-gray-800"
          )}
          onClick={toggleConnections}
        >
          {showConnections ? 'Hide Relations' : 'Find relations across the board'}
        </button>
      </div>

      <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
        {/* Goal 1 cluster */}
        <IdeaNode 
          text="Goal 1: Improve User Experience" 
          angle={0} 
          radius={0} 
          centerX={goal1Center.x} 
          centerY={goal1Center.y} 
          size={150} 
          isGoal 
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <IdeaNode
            key={`idea-1-${i + 1}`}
            text={`Idea 1.${i + 1}`}
            angle={(i * Math.PI * 2) / 6}
            radius={radius}
            centerX={goal1Center.x}
            centerY={goal1Center.y}
            onSelect={() => {
              toggleIdea(`idea-1.${i + 1}`);
              showIdeaDetails(`idea-1.${i + 1}`);
            }}
            isSelected={selectedIdeas.includes(`1.${i + 1}`)}
            connections={showConnections ? [
              { id: 'goal1', strength: 0.8 },
              { id: 'goal2', strength: 0.4 }
            ] : []}
          />
        ))}

        {/* Goal 2 cluster */}
        <IdeaNode 
          text="Goal 2: Increase Revenue" 
          angle={0} 
          radius={0} 
          centerX={goal2Center.x} 
          centerY={goal2Center.y} 
          size={150} 
          isGoal 
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <IdeaNode
            key={`idea-2-${i + 1}`}
            text={`Idea 2.${i + 1}`}
            angle={(i * Math.PI * 2) / 6}
            radius={radius}
            centerX={goal2Center.x}
            centerY={goal2Center.y}
            variant="light"
            onSelect={() => {
              toggleIdea(`idea-2.${i + 1}`);
              showIdeaDetails(`idea-2.${i + 1}`);
            }}
            isSelected={selectedIdeas.includes(`2.${i + 1}`)}
            connections={showConnections ? [
              { id: 'goal1', strength: 0.3 },
              { id: 'goal2', strength: 0.9 }
            ] : []}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedIdeaDetails && (
          <IdeaDetails
            idea={selectedIdeaDetails}
            onClose={() => setSelectedIdeaDetails(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}