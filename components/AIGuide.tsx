import React, { useEffect, useState } from 'react';
import { getSceneDescription } from '../services/geminiService';
import { Scene } from '../types';
import { Sparkles, X, RotateCw, MapPin } from 'lucide-react';

interface AIGuideProps {
  currentScene: Scene;
}

export const AIGuide: React.FC<AIGuideProps> = ({ currentScene }) => {
  const [info, setInfo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      setInfo("");
      setIsOpen(true);
      
      const description = await getSceneDescription(currentScene.name);
      setInfo(description);
      setLoading(false);
    };

    fetchInfo();
  }, [currentScene]);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white/20 transition-all shadow-lg animate-fade-in"
      >
        <Sparkles size={24} className="text-yellow-400" />
      </button>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-20 w-80 max-w-[90vw]">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl text-white">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <Sparkles size={18} />
            <span>AI Tour Guide</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-300 border-b border-white/10 pb-2">
          <MapPin size={14} />
          <span className="font-medium tracking-wide">{currentScene.name}</span>
        </div>

        <div className="min-h-[60px] text-sm leading-relaxed text-gray-100">
          {loading ? (
            <div className="flex items-center gap-2 text-gray-400 animate-pulse">
              <RotateCw size={16} className="animate-spin" />
              <span>Consulting the archives...</span>
            </div>
          ) : (
            <p className="animate-fade-in">{info}</p>
          )}
        </div>
      </div>
    </div>
  );
};