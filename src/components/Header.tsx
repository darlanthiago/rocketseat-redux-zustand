import { useCurrentLessonAndModule, useStore } from "../zustand";

export function Header() {
  const { isLoading } = useStore();
  const { currentLesson, currentModule } = useCurrentLessonAndModule();

  return (
    <div className="flex flex-col gap-1">
      {isLoading ? (
        <h1 className="text-2xl font-bold">Carregando...</h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
          <span className="text-sm text-zinc-400">{currentModule?.title}</span>
        </>
      )}
    </div>
  );
}
