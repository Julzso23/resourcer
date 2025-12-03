import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App } from './App'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { PlannerPage } from './pages/PlannerPage'
import { Provider } from 'react-redux'
import { store } from './store'
import { Navbar } from './components/navbar/Navbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="planner" element={<PlannerPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
