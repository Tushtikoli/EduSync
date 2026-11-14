import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../services/api'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function StudentDashboard() {
  const name = localStorage.getItem('full_name') || 'Student'
  const firstName = name.split(' ')[0]
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
  const [announcements, setAnnouncements] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [timetableLoading, setTimetableLoading] = useState(true)

  useEffect(() => {
    api.get('/announcements/')
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))

    api.get('/timetable/today?department=BSc IT&semester=5')
      .then(res => setClasses(res.data))
      .catch(err => console.error(err))
      .finally(() => setTimetableLoading(false))
  }, [])

  return (
    <DashboardLayout role="student">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>

        <div style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)',
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
          <div style={{
            position: 'absolute', bottom: '-60px', right: '100px',
            width: '150px', height: '150px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
          }} />
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}>
            {getGreeting()}, {firstName}! 👋
          </h1>
          <p style={{color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem'}}>
            {today}
          </p>
          <div style={{
            display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap'
          }}>
            {[
              { label: 'Classes Today', value: timetableLoading ? '...' : `${classes.length}`, emoji: '📚' },
              { label: 'Assignments Due', value: '3', emoji: '📝' },
              { label: 'Attendance', value: '78%', emoji: '📊' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
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
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {[
            { label: 'Overall Attendance', value: '78%', sub: 'Need 75% minimum', color: '#f59e0b', bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', icon: '📈' },
            { label: 'Pending Assignments', value: '3', sub: 'Due this week', color: '#ef4444', bg: 'linear-gradient(135deg, #fee2e2, #fecaca)', icon: '📋' },
            { label: 'Subjects', value: '6', sub: 'This semester', color: '#8b5cf6', bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', icon: '📖' },
            { label: 'Study Streak', value: '5 days', sub: 'Keep it up!', color: '#10b981', bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', icon: '🔥' },
          ].map((card, i) => (
            <div key={i} style={{
              background: card.bg,
              borderRadius: '16px',
              padding: '1.25rem',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              cursor: 'pointer',
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
          <TodayTimetable classes={classes} loading={timetableLoading} />
          <AttendanceCard />
        </div>

        <RecentAnnouncements announcements={announcements} loading={loading} />

      </div>
    </DashboardLayout>
  )
}

function TodayTimetable({ classes, loading }) {
  const subjectColors = ['#6366f1', '#0891b2', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  if (loading) {
    return (
      <div style={{
        background: 'white', borderRadius: '20px', padding: '1.5rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px'
      }}>
        <p style={{color: '#94a3b8'}}>Loading timetable...</p>
      </div>
    )
  }

  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem'}}>
        <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b'}}>
          Today's Classes 📅
        </h2>
        <span style={{
          fontSize: '0.75rem', background: '#eff6ff', color: '#2563eb',
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
                <p style={{fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.1rem'}}>
                  {c.teacher_name} · {c.room}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AttendanceCard() {
  const attendance = 78
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (attendance / 100) * circumference

  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem'}}>
        Attendance Overview 📊
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem'}}>
        <svg width="130" height="130" style={{transform: 'rotate(-90deg)'}}>
          <circle cx="65" cy="65" r="54" fill="none" stroke="#f1f5f9" strokeWidth="10" />
          <circle cx="65" cy="65" r="54" fill="none" stroke="#f59e0b"
            strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div style={{marginTop: '-80px', textAlign: 'center', zIndex: 1}}>
          <p style={{fontSize: '1.75rem', fontWeight: '800', color: '#f59e0b'}}>{attendance}%</p>
          <p style={{fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.1rem'}}>Overall</p>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.625rem'}}>
        {[
          { subject: 'Data Structures', percent: 85, color: '#6366f1' },
          { subject: 'Web Technology', percent: 72, color: '#ef4444' },
          { subject: 'Database Mgmt', percent: 90, color: '#10b981' },
          { subject: 'Software Engg', percent: 65, color: '#ef4444' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
              <p style={{fontSize: '0.75rem', color: '#64748b', fontWeight: '500'}}>{s.subject}</p>
              <p style={{fontSize: '0.75rem', fontWeight: '700', color: s.color}}>{s.percent}%</p>
            </div>
            <div style={{background: '#f1f5f9', borderRadius: '999px', height: '6px'}}>
              <div style={{
                width: `${s.percent}%`, height: '100%',
                background: s.color, borderRadius: '999px',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentAnnouncements({ announcements, loading }) {
  const tagColors = {
    Exam: { bg: '#fee2e2', color: '#dc2626', emoji: '📝' },
    Holiday: { bg: '#dcfce7', color: '#16a34a', emoji: '🎉' },
    Assignment: { bg: '#fef3c7', color: '#d97706', emoji: '📋' },
    Event: { bg: '#eff6ff', color: '#2563eb', emoji: '🎪' },
    General: { bg: '#f1f5f9', color: '#475569', emoji: '📢' },
  }

  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem'}}>
        Latest Announcements 📢
      </h2>
      {loading ? (
        <p style={{color: '#94a3b8', textAlign: 'center', padding: '2rem'}}>Loading...</p>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem'}}>
          {announcements.map((a) => {
            const style = tagColors[a.tag] || tagColors.General
            return (
              <div key={a.id} style={{
                background: style.bg, borderRadius: '14px', padding: '1rem',
                cursor: 'pointer', border: `1px solid ${style.color}20`,
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>{style.emoji}</div>
                <p style={{fontWeight: '600', fontSize: '0.875rem', color: '#1e293b', marginBottom: '0.25rem'}}>
                  {a.title}
                </p>
                <p style={{fontSize: '0.75rem', color: '#64748b'}}>{a.content}</p>
                <span style={{
                  display: 'inline-block', marginTop: '0.5rem',
                  fontSize: '0.7rem', fontWeight: '700',
                  color: style.color, background: 'rgba(255,255,255,0.6)',
                  padding: '0.2rem 0.5rem', borderRadius: '999px',
                }}>
                  {a.tag}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}