import { createClient } from "@liveblocks/client"; // Correct import for createClient
import { useUndo as liveblocksUseUndo, useRedo, createRoomContext, LiveList } from "@liveblocks/react"; 
import { useState } from "react";


const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

// Define Liveblocks types for your application
declare global {
  interface Liveblocks {
    Presence: {
      cursor: { x: number; y: number }; // Example for cursor tracking
    };

    Storage: {
      animals: LiveList<string>; // Example of a list of animals
    };

    UserMeta: {
      id: string;
      info: {
        name: string; // User's name
        avatar: string; // User's avatar URL
      };
    };

    RoomEvent: {
      type: "PLAY" | "REACTION"; 
      emoji?: "🔥"; // Example of a reaction
    };

    ThreadMetadata: {
      x: number; // Example for thread coordinates
      y: number;
    };

    RoomInfo: {
      title: string; // Room title
      url: string; // Room URL
    };
  }
}

export const useCustomUndo = () => { // Rename your custom hook
  const [history, setHistory] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const setState = (newState: any) => {
    const updatedHistory = [...history.slice(0, currentIndex + 1), newState];
    setHistory(updatedHistory);
    setCurrentIndex(currentIndex + 1);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentState = history[currentIndex] || null;

  return {
    setState,
    undo,
    redo,
    currentState,
  };
};

export {}; // Keep this export to maintain the module scope
