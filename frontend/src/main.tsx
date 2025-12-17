import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { App } from './App'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { PlannerPage } from './pages/PlannerPage'
import { StaffPage } from './pages/StaffPage'
import { Provider } from 'react-redux'
import { store } from './store'
import { Navbar } from './components/navbar/Navbar'
import { history } from './history'
import { ProjectsPage } from './pages/ProjectsPage'
import { UsersPage } from './pages/UsersPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ store }>
      <HistoryRouter history={history}>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Routes>
      </HistoryRouter>
    </Provider>
  </StrictMode>,
)
