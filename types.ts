export interface Scene {
  id: string;
  name: string;
  panorama: string;
  hfov: number;
  minHfov: number;
  maxHfov: number;
}

export interface PannellumViewer {
  loadScene: (sceneId: string) => void;
  getScene: () => string;
  destroy: () => void;
  on: (event: string, callback: () => void) => void;
}

// Extend Window interface to include Pannellum since it's loaded via CDN
declare global {
  interface Window {
    pannellum: {
      viewer: (id: string, config: any) => PannellumViewer;
    };
  }
}