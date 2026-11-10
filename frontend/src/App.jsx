import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import StudentDashboard from './pages/student/Dashboard'

function TeacherDashboard() {
  const name = localStorage.getItem('full_name')
  return (
    <div style={{minHeight:'100vh',background:'#1c1c1a',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <h1 style={{fontSize:'2rem',fontWeight:'bold',color:'white'}}>Welcome, {name}!</h1>
        <p style={{color:'#a3a3a0',marginTop:'0.5rem'}}>Teacher Dashboard — Coming Soon</p>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const name = localStorage.getItem('full_name')
  return (
    <div style={{minHeight:'100vh',background:'#1c1c1a',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <h1 style={{fontSize:'2rem',fontWeight:'bold',color:'white'}}>Welcome, {name}!</h1>
        <p style={{color:'#a3a3a0',marginTop:'0.5rem'}}>Admin Dashboard — Coming Soon</p>
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