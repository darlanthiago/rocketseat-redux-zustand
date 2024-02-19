import ReactPlayer from "react-player";

import { Loader } from "lucide-react";
import { useCurrentLessonAndModule, useStore } from "../zustand";

export function VideoPlayer() {
  const { next, isLoading } = useStore();
  const { currentLesson } = useCurrentLessonAndModule();

  function handleNextVideo() {
    next();
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          onEnded={handleNextVideo}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}
