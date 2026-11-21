import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import StudentDashboard from './pages/student/Dashboard'
import StudentAssignments from './pages/student/Assignments'
import StudentTimetable from './pages/student/Timetable'
import TeacherDashboard from './pages/teacher/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/student/timetable" element={<StudentTimetable />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}