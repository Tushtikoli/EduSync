import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'student'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authAPI.register(formData)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{width: '100%', maxWidth: '420px'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: 'white'}}>
            EduSync
          </h1>
          <p style={{color: '#93c5fd', marginTop: '0.25rem'}}>
            AI-Powered Education Platform
          </p>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '1rem',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '1.5rem'
          }}>
            Create account
          </h2>
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.2)',
              border: '1px solid rgba(239,68,68,0.5)',
              color: '#fca5a5',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '1rem'}}>
              <label style={{
                color: '#bfdbfe',
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.25rem'
              }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                placeholder="Your full name"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{marginBottom: '1rem'}}>
              <label style={{
                color: '#bfdbfe',
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.25rem'
              }}>
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{marginBottom: '1rem'}}>
              <label style={{
                color: '#bfdbfe',
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.25rem'
              }}>
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="........"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{marginBottom: '1.5rem'}}>
              <label style={{
                color: '#bfdbfe',
                fontSize: '0.875rem',
                display: 'block',
                marginBottom: '0.25rem'
              }}>
                I am a
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                style={{
                  width: '100%',
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: '#2563eb',
                color: 'white',
                fontWeight: '600',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p style={{
            textAlign: 'center',
            color: '#93c5fd',
            fontSize: '0.875rem',
            marginTop: '1.5rem'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{color: '#60a5fa', fontWeight: '500'}}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}