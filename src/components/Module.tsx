import * as Collapsible from "@radix-ui/react-collapsible";

import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";

import { useStore } from "../zustand";

interface IModule {
  moduleIndex: number;
  title: string;
  lessonsAmount: number;
}
export function Module({ title, lessonsAmount, moduleIndex }: IModule) {
  const { course, currentLessonIndex, currentModuleIndex, play } = useStore();

  const lessons = course?.modules[moduleIndex].lessons;

  function isCurrent(lessonIndex: number, moduleIndex: number) {
    return (
      lessonIndex === currentLessonIndex && moduleIndex === currentModuleIndex
    );
  }

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex items-center w-full gap-3 p-4 bg-zinc-800">
        <div className="flex items-center justify-center w-10 h-10 text-xs rounded-full bg-zinc-950">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{lessonsAmount} aulas</span>
        </div>
        <ChevronDown className="w-4 h-4 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => (
            <Lesson
              key={lesson.title}
              title={lesson.title}
              duration={lesson.duration}
              onPlay={() =>
                play({
                  lessonIndex,
                  moduleIndex,
                })
              }
              isCurrent={isCurrent(lessonIndex, moduleIndex)}
            />
          ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
