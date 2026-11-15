import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../services/api'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function TeacherDashboard() {
  const name = localStorage.getItem('full_name') || 'Teacher'
  const firstName = name.split(' ')[0]
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
  const [announcements, setAnnouncements] = useState([])
  const [assignments, setAssignments] = useState([])
  const [classes, setClasses] = useState([])

  useEffect(() => {
    api.get('/announcements/').then(res => setAnnouncements(res.data)).catch(console.error)
    api.get('/assignments/?department=BSc IT&semester=5').then(res => setAssignments(res.data)).catch(console.error)
    api.get('/timetable/today?department=BSc IT&semester=5').then(res => setClasses(res.data)).catch(console.error)
  }, [])

  return (
    <DashboardLayout role="teacher">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>

        <div style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
          borderRadius: '20px',
          padding: '2rem 2.5rem',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '200px', height: '200px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '50%',
          }} />
          <h1 style={{
            fontSize: '1.875rem', fontWeight: '800',
            color: 'white', letterSpacing: '-0.02em', marginBottom: '0.5rem',
          }}>
            {getGreeting()}, {firstName}! 👨‍🏫
          </h1>
          <p style={{color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem'}}>{today}</p>
          <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap'}}>
            {[
              { label: 'Classes Today', value: `${classes.length}`, emoji: '📚' },
              { label: 'Active Assignments', value: `${assignments.length}`, emoji: '📋' },
              { label: 'Announcements', value: `${announcements.length}`, emoji: '📢' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '0.75rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <span style={{fontSize: '1.5rem'}}>{item.emoji}</span>
                <div>
                  <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem'}}>{item.label}</p>
                  <p style={{color: 'white', fontWeight: '700', fontSize: '1.125rem'}}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem', marginBottom: '2rem',
        }}>
          {[
            { label: 'Subjects Teaching', value: '4', sub: 'This semester', color: '#7c3aed', bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', icon: '📖' },
            { label: 'Total Students', value: '120', sub: 'Across all classes', color: '#0891b2', bg: 'linear-gradient(135deg, #cffafe, #a5f3fc)', icon: '👨‍🎓' },
            { label: 'Pending Reviews', value: '8', sub: 'Submissions to check', color: '#f59e0b', bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', icon: '✏️' },
            { label: 'Avg Attendance', value: '76%', sub: 'Across subjects', color: '#10b981', bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', icon: '📊' },
          ].map((card, i) => (
            <div key={i} style={{
              background: card.bg, borderRadius: '16px', padding: '1.25rem',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{fontSize: '1.75rem', marginBottom: '0.5rem'}}>{card.icon}</div>
              <p style={{fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', fontWeight: '500'}}>{card.label}</p>
              <p style={{fontSize: '1.5rem', fontWeight: '800', color: card.color}}>{card.value}</p>
              <p style={{fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.25rem'}}>{card.sub}</p>
            </div>
          ))}
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
          <TodaySchedule classes={classes} />
          <QuickActions />
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
          <ActiveAssignments assignments={assignments} />
          <RecentAnnouncements announcements={announcements} />
        </div>

      </div>
    </DashboardLayout>
  )
}

function TodaySchedule({ classes }) {
  const subjectColors = ['#7c3aed', '#4f46e5', '#0891b2', '#10b981', '#f59e0b', '#ef4444']
  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem'}}>
        <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b'}}>Today's Schedule 📅</h2>
        <span style={{
          fontSize: '0.75rem', background: '#f3e8ff', color: '#7c3aed',
          padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: '600'
        }}>
          {classes.length} classes
        </span>
      </div>
      {classes.length === 0 ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <p style={{fontSize: '2rem'}}>🎉</p>
          <p style={{color: '#94a3b8', marginTop: '0.5rem'}}>No classes today!</p>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          {classes.map((c, i) => (
            <div key={c.id} style={{
              display: 'flex', gap: '1rem', alignItems: 'center',
              padding: '0.875rem', borderRadius: '12px', background: '#f8fafc',
              borderLeft: `4px solid ${subjectColors[i % subjectColors.length]}`,
            }}>
              <div style={{
                background: subjectColors[i % subjectColors.length] + '15',
                borderRadius: '8px', padding: '0.5rem 0.625rem',
                minWidth: '64px', textAlign: 'center',
              }}>
                <p style={{fontSize: '0.7rem', color: subjectColors[i % subjectColors.length], fontWeight: '700'}}>
                  {c.start_time}
                </p>
              </div>
              <div style={{flex: 1}}>
                <p style={{fontWeight: '600', fontSize: '0.875rem', color: '#1e293b'}}>{c.subject}</p>
                <p style={{fontSize: '0.75rem', color: '#94a3b8'}}>{c.room} · Sem {c.semester}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function QuickActions() {
  const actions = [
    { label: 'Post Assignment', emoji: '📋', color: '#7c3aed', bg: '#f3e8ff' },
    { label: 'Make Announcement', emoji: '📢', color: '#0891b2', bg: '#cffafe' },
    { label: 'Upload Notes', emoji: '📄', color: '#10b981', bg: '#d1fae5' },
    { label: 'Take Attendance', emoji: '✅', color: '#f59e0b', bg: '#fef3c7' },
    { label: 'View Submissions', emoji: '📥', color: '#ef4444', bg: '#fee2e2' },
    { label: 'Generate Question Paper', emoji: '🤖', color: '#6366f1', bg: '#ede9fe' },
  ]
  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem'}}>
        Quick Actions ⚡
      </h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem'}}>
        {actions.map((a, i) => (
          <button key={i} style={{
            background: a.bg, border: 'none', borderRadius: '12px',
            padding: '0.875rem', cursor: 'pointer', textAlign: 'left',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <p style={{fontSize: '1.25rem', marginBottom: '0.25rem'}}>{a.emoji}</p>
            <p style={{fontSize: '0.8rem', fontWeight: '600', color: a.color}}>{a.label}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function ActiveAssignments({ assignments }) {
  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem'}}>
        Active Assignments 📋
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {assignments.map((a) => (
          <div key={a.id} style={{
            padding: '0.875rem', borderRadius: '12px', background: '#f8fafc',
            borderLeft: '4px solid #7c3aed',
          }}>
            <p style={{fontWeight: '600', fontSize: '0.875rem', color: '#1e293b'}}>{a.title}</p>
            <p style={{fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.1rem'}}>
              {a.subject} · Due: {new Date(a.deadline).toLocaleDateString('en-IN')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentAnnouncements({ announcements }) {
  const tagColors = {
    Exam: '#dc2626', Holiday: '#16a34a',
    Assignment: '#d97706', Event: '#2563eb', General: '#475569',
  }
  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem'}}>
        Recent Announcements 📢
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {announcements.map((a) => (
          <div key={a.id} style={{
            padding: '0.875rem', borderRadius: '12px', background: '#f8fafc',
            borderLeft: `4px solid ${tagColors[a.tag] || '#475569'}`,
          }}>
            <p style={{fontWeight: '600', fontSize: '0.875rem', color: '#1e293b'}}>{a.title}</p>
            <p style={{fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.1rem'}}>{a.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}