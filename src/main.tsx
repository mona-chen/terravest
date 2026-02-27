import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import InvestmentCriteria from './pages/InvestmentCriteria.tsx'
import Leadership from './pages/Leadership.tsx'
import CaseStudies from './pages/CaseStudies.tsx'
import News from './pages/News.tsx'
import Careers from './pages/Careers.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/investment-criteria" element={<InvestmentCriteria />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/news" element={<News />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
