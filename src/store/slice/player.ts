/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/redux";
import { fetchCourseById } from "./getCourse";

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
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: IPlayer = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  loading: "idle",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
    },
    play: (state, action: PayloadAction<IPlay>) => {
      state.currentLessonIndex = action.payload.lessonIndex;
      state.currentModuleIndex = action.payload.moduleIndex;
    },
    next: (state, _action: PayloadAction) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[
          nextLessonIndex
        ];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
        return;
      }

      const nextModuleIndex = state.currentModuleIndex + 1;
      const nextModule = state.course?.modules[nextModuleIndex];

      if (nextModule) {
        state.currentModuleIndex = nextModuleIndex;
        state.currentLessonIndex = 0;
        return;
      }

      if (!nextLesson && !nextModule) {
        return;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourseById.pending, (state, _action) => {
      state.loading = "pending";
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCourseById.fulfilled, (state, action) => {
      state.course = action.payload;
      state.loading = "succeeded";
    });
  },
});

export const useCurrentLessonAndModule = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    const currentLesson =
      state.player.course?.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ];

    const currentModule = state.player.course?.modules[currentModuleIndex];

    return { currentLesson, currentModule };
  });
};

export const useCourseLoading = () => {
  return useAppSelector(
    (state) =>
      !(
        state.player.loading === "succeeded" ||
        state.player.loading === "failed"
      )
  );
};

export const { play, next, start } = playerSlice.actions;
export { playerSlice };
