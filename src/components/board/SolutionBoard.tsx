import React from 'react';
import { Info } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  alignedGoal: string;
  justification: string;
  priority: 'High' | 'Medium' | 'Low';
}

function FeatureCard({ title, alignedGoal, justification, priority }: FeatureCardProps) {
  const priorityColors = {
    High: 'border-red-200',
    Medium: 'border-yellow-200',
    Low: 'border-green-200'
  };

  const priorityBadgeColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  };

  return (
    <div className={`border-l-4 ${priorityColors[priority]} bg-white rounded-lg p-4 shadow-sm`}>
      <div className="flex items-start gap-2 mb-2">
        <Info className="h-5 w-5 text-gray-400 mt-1" />
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">Aligned Goal: {alignedGoal}</p>
          <p className="text-sm text-gray-600 mt-1">Justification: {justification}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <span className={`text-xs px-2 py-1 rounded ${priorityBadgeColors[priority]}`}>
          {priority}
        </span>
      </div>
    </div>
  );
}

export function SolutionBoard() {
  return (
    <div className="bg-white rounded-lg p-6 h-full">
      <h2 className="text-xl font-semibold mb-6">Solution Board</h2>
      
      <p className="text-gray-600 mb-6">
        Your goals and ideas shape the foundation of your product. Our system analyzes them to extract key features, align them with your strategy, and prioritize what matters most. See a clear roadmap with justifications, ensuring you build the right product—step by step.
      </p>

      <button className="w-full bg-gray-900 text-white py-3 rounded-lg mb-6 hover:bg-gray-800">
        Analyse
      </button>

      <div className="space-y-4">
        <FeatureCard
          title="Feature: Dietary Preferences Filter – Users can filter based on allergies and diet types"
          alignedGoal="Personalization to attract more users"
          justification="Matches product strategy to be AI-driven & user-centric"
          priority="High"
        />
        <FeatureCard
          title="Feature: Dietary Preferences Filter – Users can filter based on allergies and diet types"
          alignedGoal="Personalization to attract more users"
          justification="Matches product strategy to be AI-driven & user-centric"
          priority="Medium"
        />
        <FeatureCard
          title="Feature: Dietary Preferences Filter – Users can filter based on allergies and diet types"
          alignedGoal="Personalization to attract more users"
          justification="Matches product strategy to be AI-driven & user-centric"
          priority="Low"
        />
      </div>

      <button className="text-blue-600 hover:text-blue-700 text-sm mt-4">
        Explore features
      </button>
    </div>
  );
}