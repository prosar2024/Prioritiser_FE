import React, { useState } from 'react';
import { Plus, X, MessageSquare, Save } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useBoardStore } from '../../lib/store';

const categories = [
  'Customer Review',
  'Social Media',
  'Own Idea',
  'Emails',
  'Team Brainstorm',
  'Market Research',
  'Pain Points',
  'Others',
  'Performance Issues'
];

export function Warehouse() {
  const { boardId } = useParams();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { saveWarehouseItem } = useBoardStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!boardId || !newItemText.trim()) return;
    
    setIsSaving(true);
    saveWarehouseItem(boardId, {
      id: crypto.randomUUID(),
      text: newItemText.trim(),
      categories: selectedCategories
    });
    
    // Reset form
    setTimeout(() => {
      setNewItemText('');
      setSelectedCategories([]);
      setIsAddingItem(false);
      setIsSaving(false);
    }, 1000);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 h-full">
      <h2 className="text-xl font-semibold mb-6">Warehouse</h2>
      
      <p className="text-gray-600 mb-6">
        No need to organize—just throw in any idea, feedback, or data point that might be useful later. The system will help make sense of it.
      </p>

      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <MessageSquare className="h-5 w-5 text-gray-500 mt-1" />
          <p className="text-gray-600 text-sm">Example: Multiple users reported difficulty in setting up their profiles</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCategories.includes(category)
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {isAddingItem ? (
        <div className="relative border rounded-lg p-4">
          <button
            onClick={() => {
              setIsAddingItem(false);
              setNewItemText('');
              setSelectedCategories([]);
            }}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
          <textarea
            className="w-full h-24 resize-none border-none focus:ring-0 text-sm mb-4"
            placeholder="What can you add here?
• Customer feedback from social media, emails, reviews
• Internal discussions and ideas
• Competitor insights and trends
• Market discussions with VCs
• Any data points that could influence product improvements"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingItem(true)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add to list</span>
        </button>
      )}

      <div className="mt-6 space-y-4">
        <div className="bg-gray-800 rounded-lg p-4 text-white">
          <p className="mb-2">People love our UI but complain about load time</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">Pain Points</span>
            <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">Customer Review</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-white">
          <p className="mb-2">Most of the test users are saying this business needs a mobile app.</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">Customer Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}