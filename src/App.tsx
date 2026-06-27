import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './routes/HomePage'
import { ChapterPage } from './routes/ChapterPage'
import { QuizPage } from './routes/QuizPage'
import { ExamPage } from './routes/ExamPage'
import { GlossaryPage } from './routes/GlossaryPage'
import { FlashcardsPage } from './routes/FlashcardsPage'
import { DashboardPage } from './routes/DashboardPage'
import { RoadmapPage } from './routes/RoadmapPage'
import { ChecklistPage } from './routes/ChecklistPage'
import { SearchPage } from './routes/SearchPage'
import { NotFoundPage } from './routes/NotFoundPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chapter/:id" element={<ChapterPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
