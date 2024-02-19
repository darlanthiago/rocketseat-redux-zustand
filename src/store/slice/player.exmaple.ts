import { describe, expect, it } from "vitest";

import { next, play, playerSlice } from "./player";

const exampleState = {
  course: {
    modules: [
      {
        id: "1",
        title: "Iniciando com React",
        lessons: [
          { id: "unfHrB2sGGM", title: "CSS Modules", duration: "13:45" },
          {
            id: "tR8j8NkQ29k",
            title: "Estilização do Post",
            duration: "10:05",
          },
        ],
      },
      {
        id: "2",
        title: "Estrutura da aplicação",
        lessons: [
          {
            id: "gE48FQXRZ_o",
            title: "Componente: Comment",
            duration: "13:45",
          },
          {
            id: "h5JA3wfuW1k",
            title: "Interações no JSX",
            duration: "06:33",
          },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
};

describe("player slice", () => {
  it("should be able to play", () => {
    const state = playerSlice.reducer(
      exampleState,
      play({
        lessonIndex: 1,
        moduleIndex: 2,
      })
    );

    expect(state.currentModuleIndex).toEqual(2);
    expect(state.currentLessonIndex).toEqual(1);
  });

  it("should be able to play next video automatically", () => {
    const state = playerSlice.reducer(exampleState, next());
    expect(state.currentModuleIndex).toEqual(0);
    expect(state.currentLessonIndex).toEqual(1);
  });

  it("should be able to the next module automatically", () => {
    const state = playerSlice.reducer(
      {
        ...exampleState,
        currentLessonIndex: 1,
      },
      next()
    );
    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(0);
  });

  it("should not update the current module and lesson index if there is no next lesson available", () => {
    const state = playerSlice.reducer(
      {
        ...exampleState,
        currentLessonIndex: 1,
        currentModuleIndex: 1,
      },
      next()
    );
    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(1);
  });
});
