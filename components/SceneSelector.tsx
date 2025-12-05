import React from 'react';
import { Scene } from '../types';
import { Map } from 'lucide-react';

interface SceneSelectorProps {
  scenes: Scene[];
  currentSceneId: string;
  onSceneSelect: (id: string) => void;
}

export const SceneSelector: React.FC<SceneSelectorProps> = ({ scenes, currentSceneId, onSceneSelect }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
      <div className="flex items-center gap-2 mb-2 text-white/80 text-xs uppercase tracking-wider font-bold ml-1">
        <Map size={14} />
        <span>Select Location</span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-4 snap-x scrollbar-hide">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => onSceneSelect(scene.id)}
            className={`
              snap-start flex-shrink-0 relative group rounded-xl overflow-hidden 
              w-32 h-20 sm:w-40 sm:h-24 transition-all duration-300 border-2
              ${currentSceneId === scene.id 
                ? 'border-yellow-500 scale-105 shadow-lg shadow-yellow-500/20' 
                : 'border-transparent opacity-80 hover:opacity-100 hover:border-white/30'
              }
            `}
          >
            {/* Image Thumbnail - Using the panorama itself as thumbnail for simplicity, though heavy. 
                In prod, use real thumbnails. */}
            <img 
              src={scene.panorama} 
              alt={scene.name} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Label Overlay */}
            <div className={`
              absolute inset-0 flex items-center justify-center p-2 text-center
              bg-black/40 hover:bg-black/30 transition-colors
              ${currentSceneId === scene.id ? 'bg-black/20' : ''}
            `}>
              <span className="text-white text-xs sm:text-sm font-medium drop-shadow-md">
                {scene.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};