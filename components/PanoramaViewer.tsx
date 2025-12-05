import React, { useEffect, useRef } from 'react';
import { SCENES } from '../constants';
import { PannellumViewer } from '../types';

interface PanoramaViewerProps {
  currentSceneId: string;
}

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ currentSceneId }) => {
  const viewerRef = useRef<PannellumViewer | null>(null);
  const containerId = 'panorama-container';

  useEffect(() => {
    if (!window.pannellum) {
      console.error("Pannellum script not loaded");
      return;
    }

    // Construct scenes configuration object
    const scenesConfig: Record<string, any> = {};
    SCENES.forEach(scene => {
      scenesConfig[scene.id] = {
        type: "equirectangular",
        panorama: scene.panorama,
        hfov: scene.hfov,
        minHfov: scene.minHfov,
        maxHfov: scene.maxHfov,
      };
    });

    // Initialize viewer
    viewerRef.current = window.pannellum.viewer(containerId, {
      default: {
        firstScene: currentSceneId,
        autoLoad: true,
      },
      scenes: scenesConfig,
      showControls: false, // We will build our own or rely on simple mouse nav
      autoRotate: -2,
    });

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Handle scene changes programmatically
  useEffect(() => {
    if (viewerRef.current && viewerRef.current.getScene() !== currentSceneId) {
      viewerRef.current.loadScene(currentSceneId);
    }
  }, [currentSceneId]);

  return (
    <div 
      id={containerId} 
      className="w-full h-full absolute inset-0 z-0 bg-gray-800"
    />
  );
};