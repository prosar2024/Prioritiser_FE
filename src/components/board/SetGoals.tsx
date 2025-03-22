import React, { useState } from 'react';
import { MoreHorizontal, HelpCircle, Save } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useBoardStore } from '../../lib/store';

const questions = [
  { text: 'What specific area of the product do you manage?', example: 'Example: "I manage the checkout experience for our e-commerce platform."' },
  { text: 'How does your area align with the company\'s broader goals?', example: 'Example: "Improving checkout conversion directly impacts revenue growth."' },
  { text: 'What are the key problems you are trying to solve?', example: 'Example: "Many users abandon their cart due to complicated payment steps."' },
  { text: 'What are your primary KPIs?', example: 'Example: "Checkout completion rate and time taken to complete a purchase."' },
  { text: 'What are your top priorities for the next quarter/year?', example: 'Example: "Introduce one-click checkout and support more payment options."' },
  { text: 'What dependencies do you have on other teams/products?', example: 'Example: "We rely on the payments team for new integrations and the design team for UI improvements."' },
  { text: 'What are the biggest challenges/roadblocks in execution?', example: 'Example: "Legal approval for new payment methods is slow, delaying feature rollout."' },
  { text: 'What constraints do you face?', example: 'Example: "We need to maintain a simple UI while ensuring security compliance."' },
  { text: 'How do you define success for your product area?', example: 'Example: "A 15% increase in completed checkouts and fewer support tickets on payment issues."' },
  { text: 'What tools/processes do you use to track progress & alignment?', example: 'Example: "We use Jira for tracking, and monthly syncs with cross-functional teams."' }
];

export function SetGoals() {
  const { boardId } = useParams();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const { saveGoals } = useBoardStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!boardId) return;
    setIsSaving(true);
    saveGoals(boardId, answers);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="bg-white rounded-lg p-6 h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Set Goals</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Every product manager operates within a larger ecosystem. Understanding how your area contributes to the overall company vision is key to building impactful solutions. Share details about your scope of work on a day to day basis.
      </p>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-medium">{question.text}</span>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </div>
            <textarea
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={question.example}
              rows={3}
              value={answers[index] || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, [index]: e.target.value }))}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Goals'}
        </button>
      </div>

      <p className="text-gray-600 italic mt-6">
        That is it for now. Thanks you so much. We know you better now :)
      </p>
    </div>
  );
}