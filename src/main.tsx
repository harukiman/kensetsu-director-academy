import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import { ProgressProvider } from './hooks/ProgressContext.tsx'
import './index.css'

// GitHub Pages のサブパス配信でもリロード/深リンクが 404 にならないよう
// HashRouter を採用（URL は /#/... 形式）。
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </HashRouter>
  </StrictMode>,
)
