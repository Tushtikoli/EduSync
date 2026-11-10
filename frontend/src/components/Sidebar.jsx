import { useNavigate, useLocation } from 'react-router-dom'

const menuItems = {
  student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: '⊞' },
    { label: 'Attendance', path: '/student/attendance', icon: '◉' },
    { label: 'Timetable', path: '/student/timetable', icon: '▦' },
    { label: 'Assignments', path: '/student/assignments', icon: '✎' },
    { label: 'Study Material', path: '/student/materials', icon: '◈' },
    { label: 'AI Tutor', path: '/student/ai-tutor', icon: '◆' },
    { label: 'Community', path: '/student/community', icon: '◎' },
    { label: 'Messages', path: '/student/messages', icon: '◷' },
  ],
  teacher: [
    { label: 'Dashboard', path: '/teacher/dashboard', icon: '⊞' },
    { label: 'Attendance', path: '/teacher/attendance', icon: '◉' },
    { label: 'Timetable', path: '/teacher/timetable', icon: '▦' },
    { label: 'Assignments', path: '/teacher/assignments', icon: '✎' },
    { label: 'Study Material', path: '/teacher/materials', icon: '◈' },
    { label: 'AI Assistant', path: '/teacher/ai-assistant', icon: '◆' },
    { label: 'Community', path: '/teacher/community', icon: '◎' },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '⊞' },
    { label: 'Students', path: '/admin/students', icon: '◉' },
    { label: 'Teachers', path: '/admin/teachers', icon: '▦' },
    { label: 'Departments', path: '/admin/departments', icon: '✎' },
    { label: 'Timetable', path: '/admin/timetable', icon: '◈' },
    { label: 'Fees', path: '/admin/fees', icon: '◆' },
    { label: 'Reports', path: '/admin/reports', icon: '◎' },
  ],
}

export default function Sidebar({ role }) {
  const navigate = useNavigate()
  const location = useLocation()
  const items = menuItems[role] || menuItems.student
  const name = localStorage.getItem('full_name') || 'User'
  const initial = name.charAt(0).toUpperCase()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      background: 'var(--color-sidebar-bg)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 0',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
    }}>
      <div style={{padding: '0 1.5rem', marginBottom: '2rem'}}>
        <h1 style={{
          color: '#ffffff',
          fontSize: '1.25rem',
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }}>
          EduSync
        </h1>
        <p style={{color: '#6b6b68', fontSize: '0.75rem', marginTop: '0.25rem'}}>
          Smart Campus OS
        </p>
      </div>

      <nav style={{flex: 1, padding: '0 0.75rem'}}>
        {items.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '0.25rem',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: isActive ? '#ffffff' : '#a3a3a0',
                fontSize: '0.875rem',
                fontWeight: isActive ? '500' : '400',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{fontSize: '1rem'}}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        marginTop: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            {initial}
          </div>
          <div>
            <p style={{
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {name}
            </p>
            <p style={{
              color: '#6b6b68',
              fontSize: '0.75rem',
              textTransform: 'capitalize'
            }}>
              {role}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '0.5rem',
            background: 'rgba(220,38,38,0.15)',
            border: '1px solid rgba(220,38,38,0.3)',
            borderRadius: 'var(--radius-sm)',
            color: '#f87171',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}