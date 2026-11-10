import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await authAPI.login(formData)
      const { access_token, role, full_name } = response.data
      localStorage.setItem('token', access_token)
      localStorage.setItem('role', role)
      localStorage.setItem('full_name', full_name)
      if (role === 'student') navigate('/student/dashboard')
      else if (role === 'teacher') navigate('/teacher/dashboard')
      else if (role === 'admin') navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  const bg = "min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4"
  const card = "bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
  const input = "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
  const btn = "w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors duration-200"

  return (
    <div className={bg}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">EduSync</h1>
          <p className="text-blue-300 mt-1">AI-Powered Education Platform</p>
        </div>
        <div className={card}>
          <h2 className="text-2xl font-semibold text-white mb-6">Welcome back</h2>
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-blue-200 mb-1 block">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={input}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-blue-200 mb-1 block">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={input}
                placeholder="........"
              />
            </div>
            <button type="submit" disabled={loading} className={btn}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-blue-300 text-sm mt-6">
            No account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-white font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}