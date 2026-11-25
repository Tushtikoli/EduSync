import { useNavigate, useLocation } from 'react-router-dom'

const menuItems = {
  student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: '⊞', color: '#ff8c69' },
    { label: 'Attendance', path: '/student/attendance', icon: '◉', color: '#9b8ec4' },
    { label: 'Timetable', path: '/student/timetable', icon: '▦', color: '#ff8c69' },
    { label: 'Assignments', path: '/student/assignments', icon: '✎', color: '#9b8ec4' },
    { label: 'Study Material', path: '/student/materials', icon: '◈', color: '#ff8c69' },
    { label: 'AI Tutor', path: '/student/ai-tutor', icon: '◆', color: '#9b8ec4' },
    { label: 'Community', path: '/student/community', icon: '◎', color: '#ff8c69' },
    { label: 'Messages', path: '/student/messages', icon: '◷', color: '#9b8ec4' },
  ],
  teacher: [
    { label: 'Dashboard', path: '/teacher/dashboard', icon: '⊞', color: '#ff8c69' },
    { label: 'Attendance', path: '/teacher/attendance', icon: '◉', color: '#9b8ec4' },
    { label: 'Timetable', path: '/teacher/timetable', icon: '▦', color: '#ff8c69' },
    { label: 'Assignments', path: '/teacher/assignments', icon: '✎', color: '#9b8ec4' },
    { label: 'Study Material', path: '/teacher/materials', icon: '◈', color: '#ff8c69' },
    { label: 'AI Assistant', path: '/teacher/ai-assistant', icon: '◆', color: '#9b8ec4' },
    { label: 'Community', path: '/teacher/community', icon: '◎', color: '#ff8c69' },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '⊞', color: '#ff8c69' },
    { label: 'Students', path: '/admin/students', icon: '◉', color: '#9b8ec4' },
    { label: 'Teachers', path: '/admin/teachers', icon: '▦', color: '#ff8c69' },
    { label: 'Departments', path: '/admin/departments', icon: '✎', color: '#9b8ec4' },
    { label: 'Timetable', path: '/admin/timetable', icon: '◈', color: '#ff8c69' },
    { label: 'Fees', path: '/admin/fees', icon: '◆', color: '#9b8ec4' },
    { label: 'Reports', path: '/admin/reports', icon: '◎', color: '#ff8c69' },
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
      width: '240px', minHeight: '100vh',
      background: 'linear-gradient(180deg, #c5daf0 0%, #b8d4f0 100%)',
      display: 'flex', flexDirection: 'column', padding: '1.5rem 0',
      position: 'fixed', left: 0, top: 0, bottom: 0,
      borderRight: '1px solid rgba(176,196,222,0.6)',
      boxShadow: '4px 0 20px rgba(176,196,222,0.3)',
    }}>
      <style>{`
        @keyframes logo-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes sidebar-in {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes peach-pulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(255,140,105,0.3); }
          50% { box-shadow: 0 4px 25px rgba(255,140,105,0.6); }
        }
      `}</style>

      <div style={{padding: '0 1.25rem', marginBottom: '2rem'}}>
        <div style={{
          background: 'linear-gradient(135deg, #ff8c69, #ffb347)',
          borderRadius: '18px', padding: '0.875rem 1.125rem',
          marginBottom: '0.5rem',
          animation: 'logo-float 3s ease-in-out infinite, peach-pulse 3s ease-in-out infinite',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(255,140,105,0.4)',
        }}>
          <h1 style={{
            color: 'white', fontSize: '1.25rem',
            fontWeight: '900', letterSpacing: '-0.02em',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
            EduSync ✦
          </h1>
        </div>
        <p style={{color: '#8898aa', fontSize: '0.7rem', paddingLeft: '0.25rem', letterSpacing: '0.08em'}}>
          SMART CAMPUS OS
        </p>
      </div>

      <nav style={{flex: 1, padding: '0 0.75rem'}}>
        {items.map((item, i) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: '0.75rem', padding: '0.75rem 0.875rem',
                borderRadius: '14px', border: 'none',
                cursor: 'pointer', marginBottom: '0.3rem',
                background: isActive
                  ? 'rgba(255,255,255,0.8)'
                  : 'transparent',
                color: isActive ? item.color : '#4a5568',
                fontSize: '0.875rem', fontWeight: isActive ? '700' : '500',
                textAlign: 'left', transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 4px 12px rgba(255,140,105,0.2)' : 'none',
                animation: `sidebar-in 0.4s ease ${i * 0.05}s both`,
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.5)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                  e.currentTarget.style.color = item.color
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.color = '#4a5568'
                }
              }}
            >
              <span style={{
                fontSize: '1rem', color: isActive ? item.color : '#8898aa',
              }}>
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <div style={{
                  marginLeft: 'auto', width: '6px', height: '6px',
                  borderRadius: '50%', background: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                }} />
              )}
            </button>
          )
        })}
      </nav>

      <div style={{
        padding: '1rem 1.25rem',
        borderTop: '1px solid rgba(176,196,222,0.4)',
        marginTop: 'auto',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '0.75rem', marginBottom: '0.875rem',
          padding: '0.75rem', borderRadius: '14px',
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.8)',
        }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff8c69, #9b8ec4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '0.9rem', fontWeight: '900',
            boxShadow: '0 4px 10px rgba(255,140,105,0.4)',
            flexShrink: 0,
          }}>
            {initial}
          </div>
          <div style={{overflow: 'hidden'}}>
            <p style={{
              color: '#1a1a2e', fontSize: '0.875rem', fontWeight: '700',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {name}
            </p>
            <p style={{color: '#8898aa', fontSize: '0.7rem', textTransform: 'capitalize'}}>
              {role}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '0.625rem',
            background: 'rgba(255,140,105,0.1)',
            border: '1px solid rgba(255,140,105,0.3)',
            borderRadius: '10px', color: '#ff8c69',
            fontSize: '0.875rem', cursor: 'pointer',
            transition: 'all 0.2s', fontWeight: '600',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,140,105,0.2)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,140,105,0.3)'
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,140,105,0.1)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}