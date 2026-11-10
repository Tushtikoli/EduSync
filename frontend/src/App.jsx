import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function StudentDashboard() {
  const name = localStorage.getItem('full_name')
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Welcome, {name}!</h1>
        <p className="text-blue-300 mt-2">Student Dashboard - Coming Soon</p>
      </div>
    </div>
  )
}

function TeacherDashboard() {
  const name = localStorage.getItem('full_name')
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Welcome, {name}!</h1>
        <p className="text-blue-300 mt-2">Teacher Dashboard - Coming Soon</p>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const name = localStorage.getItem('full_name')
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Welcome, {name}!</h1>
        <p className="text-blue-300 mt-2">Admin Dashboard - Coming Soon</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}