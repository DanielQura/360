import React, { useState, useMemo } from 'react';
import { PanoramaViewer } from './components/PanoramaViewer';
import { SceneSelector } from './components/SceneSelector';
import { AIGuide } from './components/AIGuide';
import { SCENES } from './constants';
import { Info } from 'lucide-react';

const App: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState<string>(SCENES[0].id);

  const currentScene = useMemo(() => 
    SCENES.find(s => s.id === currentSceneId) || SCENES[0], 
    [currentSceneId]
  );

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden font-sans">
      
      {/* 360 Viewer Layer */}
      <PanoramaViewer currentSceneId={currentSceneId} />

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 z-10 p-6 pointer-events-none">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg tracking-tight">
          Jordan <span className="text-yellow-400">360°</span> Tour
        </h1>
        <p className="text-white/80 text-sm drop-shadow-md max-w-xs mt-1">
          Explore the hidden gems of Jordan with AI-powered insights.
        </p>
      </div>

      {/* AI Guide Layer */}
      <AIGuide currentScene={currentScene} />

      {/* Navigation Layer */}
      <SceneSelector 
        scenes={SCENES} 
        currentSceneId={currentSceneId} 
        onSceneSelect={setCurrentSceneId} 
      />

      {/* API Key Warning (Development Utility) */}
      {!process.env.API_KEY && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-red-600/90 text-white p-6 rounded-xl backdrop-blur-md max-w-md text-center shadow-2xl">
          <Info size={48} className="mx-auto mb-4 opacity-80" />
          <h2 className="text-xl font-bold mb-2">API Key Missing</h2>
          <p className="text-sm opacity-90">
            To enable the AI Guide features, please provide a valid Gemini API key in the environment variables.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;