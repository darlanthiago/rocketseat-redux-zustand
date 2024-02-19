import { MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet";

import { Header } from "../components/Header";
import { VideoPlayer } from "../components/VideoPlayer";
import { Module } from "../components/Module";

import { useEffect } from "react";
import { useCurrentLessonAndModule, useStore } from "../zustand";

export function Player() {
  const { course, load } = useStore();
  const { currentLesson } = useCurrentLessonAndModule();

  useEffect(() => {
    load(1);
  }, [load]);

  return (
    <>
      <Helmet>
        <title>{currentLesson?.title}</title>
      </Helmet>
      <div className="flex items-center justify-center h-screen bg-zinc-950 text-zinc-50">
        <div className="flex w-[1100px] flex-col gap-6">
          <div className="flex items-center justify-between">
            <Header />
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white rounded bg-violet-500 hover:bg-violet-600">
              <MessageCircle className="w-4 h-4" />
              Deixar feedback
            </button>
          </div>
          <main className="relative flex overflow-hidden border rounded-lg shadow border-zinc-800 bg-zinc-900 pr-80">
            <div className="flex-1">
              <VideoPlayer />
            </div>
            <aside className="absolute top-0 bottom-0 right-0 overflow-y-scroll border-l divide-y-2 w-80 border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 divide-zinc-900">
              {course?.modules?.map((module, index) => (
                <Module
                  moduleIndex={index}
                  title={module.title}
                  lessonsAmount={module.lessons.length}
                  key={module.id}
                />
              ))}
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}
