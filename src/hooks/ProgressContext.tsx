import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  loadProgress,
  saveProgress,
  touchStudyDay,
  type ProgressState,
  type QuizResult,
} from '../lib/progress'

interface ProgressContextValue {
  state: ProgressState
  markRead: (chapterId: string) => void
  isRead: (chapterId: string) => boolean
  recordQuiz: (chapterId: string, result: QuizResult) => void
  setFlashcard: (cardId: string, level: 0 | 1 | 2) => void
  resetAll: () => void
}

const Ctx = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress())

  useEffect(() => {
    saveProgress(state)
  }, [state])

  const markRead = useCallback((chapterId: string) => {
    setState((prev) => {
      if (prev.readChapters.includes(chapterId)) return touchStudyDay(prev)
      return touchStudyDay({
        ...prev,
        readChapters: [...prev.readChapters, chapterId],
      })
    })
  }, [])

  const isRead = useCallback(
    (chapterId: string) => state.readChapters.includes(chapterId),
    [state.readChapters],
  )

  const recordQuiz = useCallback((chapterId: string, result: QuizResult) => {
    setState((prev) =>
      touchStudyDay({
        ...prev,
        quizResults: { ...prev.quizResults, [chapterId]: result },
      }),
    )
  }, [])

  const setFlashcard = useCallback((cardId: string, level: 0 | 1 | 2) => {
    setState((prev) =>
      touchStudyDay({
        ...prev,
        flashcards: { ...prev.flashcards, [cardId]: level },
      }),
    )
  }, [])

  const resetAll = useCallback(() => {
    setState({
      readChapters: [],
      quizResults: {},
      flashcards: {},
      studyDays: [],
    })
  }, [])

  const value = useMemo(
    () => ({ state, markRead, isRead, recordQuiz, setFlashcard, resetAll }),
    [state, markRead, isRead, recordQuiz, setFlashcard, resetAll],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useProgress(): ProgressContextValue {
  const v = useContext(Ctx)
  if (!v) throw new Error('useProgress must be used within ProgressProvider')
  return v
}
