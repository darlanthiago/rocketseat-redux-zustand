/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { api } from "../lib/axios";

export interface Course {
  id: number;
  modules: Module[];
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
}

type IPlay = {
  lessonIndex: number;
  moduleIndex: number;
};

export interface IPlayer {
  course: Course | null;
  currentLessonIndex: number;
  currentModuleIndex: number;
  isLoading: boolean;
  play: (payload: IPlay) => void;
  next: () => void;
  load: (courseId: number) => Promise<void>;
}

const useStore = create<IPlayer>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: false,
    play: (props: IPlay) => {
      set({
        currentLessonIndex: props.lessonIndex,
        currentModuleIndex: props.moduleIndex,
      });
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get();

      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        });
        return;
      }

      const nextModuleIndex = currentModuleIndex + 1;
      const nextModule = course?.modules[nextModuleIndex];

      if (nextModule) {
        set({
          currentModuleIndex: nextModuleIndex,
          currentLessonIndex: 0,
        });
        return;
      }

      if (!nextLesson && !nextModule) {
        return;
      }
    },
    load: async (courseId: number) => {
      set({ isLoading: true });

      await api
        .get(`/courses/${courseId}`)
        .then((response) => {
          set({
            course: response.data,
            currentLessonIndex: 0,
            currentModuleIndex: 0,
            isLoading: false,
          });
        })
        .catch((_err) => {
          set({
            course: null,
            currentLessonIndex: 0,
            currentModuleIndex: 0,
            isLoading: false,
          });
        });
    },
  };
});

export const useCurrentLessonAndModule = () => {
  return useStore((state) => {
    const { currentLessonIndex, currentModuleIndex } = state;

    const currentLesson =
      state.course?.modules[currentModuleIndex].lessons[currentLessonIndex];

    const currentModule = state.course?.modules[currentModuleIndex];

    return { currentLesson, currentModule };
  });
};

export { useStore };
