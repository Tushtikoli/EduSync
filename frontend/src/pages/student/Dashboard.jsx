import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../services/api'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getGreetingEmoji() {
  const hour = new Date().getHours()
  if (hour < 12) return '🌸'
  if (hour < 17) return '✨'
  return '🌙'
}

export default function StudentDashboard() {
  const name = localStorage.getItem('full_name') || 'Student'
  const firstName = name.split(' ')[0]
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
  const [announcements, setAnnouncements] = useState([])
  const [classes, setClasses] = useState([])
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [timetableLoading, setTimetableLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 100)
    api.get('/announcements/').then(res => setAnnouncements(res.data)).catch(console.error).finally(() => setLoading(false))
    api.get('/timetable/today?department=BSc IT&semester=5').then(res => setClasses(res.data)).catch(console.error).finally(() => setTimetableLoading(false))
    api.get('/assignments/?department=BSc IT&semester=5').then(res => setAssignments(res.data)).catch(console.error)
  }, [])

  return (
    <DashboardLayout role="student">
      <style>{`
        @keyframes float-bubble {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          33% { transform: translateY(-20px) rotate(5deg); opacity: 0.9; }
          66% { transform: translateY(-10px) rotate(-3deg); opacity: 0.75; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        @keyframes peach-glow {
          0%, 100% { box-shadow: 0 8px 30px rgba(255,140,105,0.3); }
          50% { box-shadow: 0 8px 50px rgba(255,140,105,0.5), 0 0 80px rgba(255,180,100,0.2); }
        }
        @keyframes lavender-glow {
          0%, 100% { box-shadow: 0 4px 20px rgba(155,142,196,0.2); }
          50% { box-shadow: 0 4px 30px rgba(155,142,196,0.4); }
        }
        @keyframes bounce-dot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }
        .stat-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .stat-card:hover {
          transform: translateY(-8px) scale(1.03) !important;
        }
        .class-row {
          transition: all 0.25s ease !important;
        }
        .class-row:hover {
          transform: translateX(6px) !important;
          background: rgba(255,140,105,0.1) !important;
        }
        .announce-card {
          transition: all 0.25s ease !important;
        }
        .announce-card:hover {
          transform: translateY(-3px) scale(1.01) !important;
          box-shadow: 0 8px 25px rgba(155,142,196,0.25) !important;
        }
        .assign-card {
          transition: all 0.25s ease !important;
        }
        .assign-card:hover {
          transform: translateX(6px) !important;
        }
      `}</style>

      <div style={{maxWidth: '1200px', margin: '0 auto', position: 'relative'}}>

        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'fixed',
            left: `${[10,25,70,85,15,60,40,90][i]}%`,
            top: `${[20,60,15,70,40,30,80,50][i]}%`,
            width: `${[20,30,15,25,18,22,28,16][i]}px`,
            height: `${[20,30,15,25,18,22,28,16][i]}px`,
            borderRadius: '50%',
            background: ['rgba(255,140,105,0.3)','rgba(155,142,196,0.3)','rgba(255,179,153,0.4)','rgba(176,196,222,0.5)','rgba(255,140,105,0.2)','rgba(155,142,196,0.2)','rgba(255,220,180,0.4)','rgba(200,220,240,0.4)'][i],
            animation: `float-bubble ${[6,8,7,9,5,8,6,7][i]}s ease-in-out ${[0,1,2,0.5,1.5,2.5,1,3][i]}s infinite`,
            pointerEvents: 'none', zIndex: 0,
            backdropFilter: 'blur(2px)',
          }} />
        ))}

        <div style={{
          position: 'relative', zIndex: 1,
          borderRadius: '28px', padding: '2.5rem',
          marginBottom: '2rem', overflow: 'hidden',
          background: 'linear-gradient(135deg, #ff8c69 0%, #ffb347 40%, #ffd5b8 70%, #e8d5f5 100%)',
          boxShadow: '0 8px 40px rgba(255,140,105,0.4), 0 0 0 1px rgba(255,255,255,0.3)',
          animation: mounted ? 'slide-up 0.7s ease forwards, peach-glow 4s ease-in-out 1s infinite' : 'none',
        }}>
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            animation: 'float-bubble 8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', left: '30%',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            animation: 'float-bubble 6s ease-in-out 1s infinite',
          }} />
          <div style={{
            position: 'absolute', top: '20px', right: '200px',
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'rgba(155,142,196,0.2)',
            animation: 'float-bubble 7s ease-in-out 2s infinite',
          }} />

          <div style={{position: 'relative', zIndex: 2}}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.3)', borderRadius: '999px',
              padding: '0.4rem 1.2rem', marginBottom: '1.25rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.5)',
            }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#fff',
                animation: 'bounce-dot 1.5s ease-in-out infinite',
              }} />
              <span style={{color: 'white', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.05em'}}>
                SMART CAMPUS OS
              </span>
            </div>

            <h1 style={{
              fontSize: '2.5rem', fontWeight: '900',
              color: 'white', letterSpacing: '-0.03em',
              marginBottom: '0.5rem',
              textShadow: '0 2px 20px rgba(255,100,50,0.3)',
            }}>
              {getGreeting()}, {firstName}! {getGreetingEmoji()}
            </h1>
            <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '1rem', marginBottom: '2rem'}}>
              {today}
            </p>

            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              {[
                { label: 'Classes Today', value: timetableLoading ? '...' : `${classes.length}`, emoji: '🎓' },
                { label: 'Assignments Due', value: `${assignments.length}`, emoji: '📋' },
                { label: 'Attendance', value: '78%', emoji: '📊' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '20px', padding: '1rem 1.5rem',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  border: '1px solid rgba(255,255,255,0.5)',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  animation: `pop-in 0.5s ease ${i * 0.15 + 0.3}s both`,
                  boxShadow: '0 4px 15px rgba(255,100,50,0.1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.06) translateY(-3px)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.45)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
                }}
                >
                  <span style={{fontSize: '2rem'}}>{item.emoji}</span>
                  <div>
                    <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', fontWeight: '600'}}>{item.label}</p>
                    <p style={{color: 'white', fontWeight: '900', fontSize: '1.75rem', lineHeight: 1}}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem', marginBottom: '2rem', position: 'relative', zIndex: 1,
        }}>
          {[
            { label: 'Overall Attendance', value: '78%', sub: 'Need 75% minimum', color: '#ff8c69', icon: '🔥', delay: '0.1s', bg: 'linear-gradient(135deg, #fff5f0, #ffe8dc)' },
            { label: 'Pending Assignments', value: `${assignments.length}`, sub: 'Submit on time!', color: '#9b8ec4', icon: '⚡', delay: '0.2s', bg: 'linear-gradient(135deg, #f5f0ff, #ede5ff)' },
            { label: 'Subjects', value: '6', sub: 'This semester', color: '#ff8c69', icon: '🚀', delay: '0.3s', bg: 'linear-gradient(135deg, #fff5f0, #ffe8dc)' },
            { label: 'Study Streak', value: '5 days', sub: 'You are on fire! 🔥', color: '#9b8ec4', icon: '💫', delay: '0.4s', bg: 'linear-gradient(135deg, #f5f0ff, #ede5ff)' },
          ].map((card, i) => (
            <div key={i} className="stat-card" style={{
              background: card.bg,
              borderRadius: '22px', padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 4px 20px rgba(176,196,222,0.3)',
              cursor: 'pointer', position: 'relative', overflow: 'hidden',
              animation: `slide-up 0.5s ease ${card.delay} both`,
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '80px', height: '80px', borderRadius: '50%',
                background: `${card.color}15`,
              }} />
              <div style={{
                position: 'absolute', bottom: '-10px', left: '-10px',
                width: '50px', height: '50px', borderRadius: '50%',
                background: `${card.color}10`,
              }} />
              <div style={{fontSize: '2.25rem', marginBottom: '0.75rem'}}>{card.icon}</div>
              <p style={{
                fontSize: '0.7rem', color: '#8898aa', marginBottom: '0.4rem',
                fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em'
              }}>
                {card.label}
              </p>
              <p style={{
                fontSize: '1.875rem', fontWeight: '900', color: card.color, lineHeight: 1,
              }}>
                {card.value}
              </p>
              <p style={{fontSize: '0.7rem', color: '#8898aa', marginTop: '0.4rem'}}>{card.sub}</p>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
                background: `linear-gradient(90deg, ${card.color}, ${card.color}50, transparent)`,
                borderRadius: '0 0 22px 22px',
              }} />
            </div>
          ))}
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1}}>
          <TodayTimetable classes={classes} loading={timetableLoading} />
          <AttendanceCard />
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', position: 'relative', zIndex: 1}}>
          <AssignmentsList assignments={assignments} />
          <RecentAnnouncements announcements={announcements} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  )
}

function SoftCard({ children, color = '#ff8c69', style = {} }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px', padding: '1.5rem',
      border: '1px solid rgba(255,255,255,0.9)',
      boxShadow: '0 4px 24px rgba(176,196,222,0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
      position: 'relative', overflow: 'hidden',
      ...style
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${color}, ${color}80, transparent)`,
        borderRadius: '24px 24px 0 0',
      }} />
      {children}
    </div>
  )
}

function WaveLoader() {
  return (
    <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
      {[0,1,2,3,4].map(i => (
        <div key={i} style={{
          width: '6px', height: '28px', borderRadius: '999px',
          background: 'linear-gradient(180deg, #ff8c69, #9b8ec4)',
          animation: `wave 1s ease-in-out ${i * 0.12}s infinite`,
          boxShadow: '0 2px 8px rgba(255,140,105,0.3)',
        }} />
      ))}
    </div>
  )
}

function TodayTimetable({ classes, loading }) {
  const subjectColors = ['#ff8c69', '#9b8ec4', '#ffb347', '#7ec8c8', '#ff8c69', '#9b8ec4']

  return (
    <SoftCard color="#ff8c69">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <h2 style={{fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <span style={{fontSize: '1.25rem'}}>📅</span> Today's Classes
        </h2>
        <span style={{
          fontSize: '0.8rem', fontWeight: '800', color: 'white',
          background: 'linear-gradient(135deg, #ff8c69, #ffb347)',
          padding: '0.3rem 0.875rem', borderRadius: '999px',
          boxShadow: '0 4px 12px rgba(255,140,105,0.4)',
        }}>
          {classes.length} classes
        </span>
      </div>

      {loading ? <WaveLoader /> : classes.length === 0 ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <div style={{fontSize: '3rem', marginBottom: '0.5rem', animation: 'float-bubble 3s ease-in-out infinite'}}>🎉</div>
          <p style={{color: '#4a5568', fontWeight: '600'}}>No classes today!</p>
          <p style={{color: '#8898aa', fontSize: '0.8rem', marginTop: '0.25rem'}}>Enjoy your day! ☀️</p>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          {classes.map((c, i) => (
            <div key={c.id} className="class-row" style={{
              display: 'flex', gap: '1rem', alignItems: 'center',
              padding: '0.875rem 1rem', borderRadius: '16px',
              background: `${subjectColors[i % subjectColors.length]}08`,
              borderLeft: `4px solid ${subjectColors[i % subjectColors.length]}`,
              cursor: 'pointer',
              border: `1px solid ${subjectColors[i % subjectColors.length]}20`,
              borderLeftWidth: '4px',
            }}>
              <div style={{
                background: `${subjectColors[i % subjectColors.length]}15`,
                borderRadius: '12px', padding: '0.5rem 0.75rem',
                minWidth: '72px', textAlign: 'center',
                border: `1px solid ${subjectColors[i % subjectColors.length]}25`,
              }}>
                <p style={{fontSize: '0.75rem', fontWeight: '800', color: subjectColors[i % subjectColors.length]}}>
                  {c.start_time}
                </p>
              </div>
              <div style={{flex: 1}}>
                <p style={{fontWeight: '700', fontSize: '0.9rem', color: '#1a1a2e'}}>{c.subject}</p>
                <p style={{fontSize: '0.75rem', color: '#8898aa', marginTop: '0.1rem'}}>
                  {c.teacher_name} · {c.room}
                </p>
              </div>
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: subjectColors[i % subjectColors.length],
                boxShadow: `0 0 8px ${subjectColors[i % subjectColors.length]}`,
                animation: 'bounce-dot 2s ease-in-out infinite',
              }} />
            </div>
          ))}
        </div>
      )}
    </SoftCard>
  )
}

function AttendanceCard() {
  const attendance = 78
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (attendance / 100) * circumference
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimated(true), 600)
  }, [])

  return (
    <SoftCard color="#9b8ec4">
      <h2 style={{fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem'}}>
        <span style={{fontSize: '1.25rem'}}>📊</span> Attendance
      </h2>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem', position: 'relative'}}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '110px', height: '110px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155,142,196,0.15), transparent)',
          animation: 'float-bubble 4s ease-in-out infinite',
        }} />
        <svg width="140" height="140" style={{
          transform: 'rotate(-90deg)',
          filter: 'drop-shadow(0 4px 12px rgba(255,140,105,0.3))',
        }}>
          <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(176,196,222,0.3)" strokeWidth="12" />
          <circle cx="70" cy="70" r="54" fill="none"
            stroke="url(#peach-lavender)" strokeWidth="12" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? strokeDashoffset : circumference}
            style={{transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)'}}
          />
          <defs>
            <linearGradient id="peach-lavender" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff8c69" />
              <stop offset="50%" stopColor="#ffb347" />
              <stop offset="100%" stopColor="#9b8ec4" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{marginTop: '-90px', textAlign: 'center', zIndex: 1}}>
          <p style={{
            fontSize: '2rem', fontWeight: '900', color: '#ff8c69',
          }}>{attendance}%</p>
          <p style={{fontSize: '0.7rem', color: '#8898aa'}}>Overall</p>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {[
          { subject: 'Data Structures', percent: 85, color: '#ff8c69' },
          { subject: 'Web Technology', percent: 72, color: '#9b8ec4' },
          { subject: 'Database Mgmt', percent: 90, color: '#ffb347' },
          { subject: 'Software Engg', percent: 65, color: '#ff8c69' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem'}}>
              <p style={{fontSize: '0.75rem', color: '#4a5568', fontWeight: '600'}}>{s.subject}</p>
              <p style={{fontSize: '0.75rem', fontWeight: '800', color: s.color}}>{s.percent}%</p>
            </div>
            <div style={{background: 'rgba(176,196,222,0.2)', borderRadius: '999px', height: '7px', overflow: 'hidden'}}>
              <div style={{
                width: animated ? `${s.percent}%` : '0%',
                height: '100%',
                background: `linear-gradient(90deg, ${s.color}, ${s.color}80)`,
                borderRadius: '999px',
                boxShadow: `0 2px 8px ${s.color}50`,
                transition: `width 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </SoftCard>
  )
}

function AssignmentsList({ assignments }) {
  const getDaysLeft = (deadline) => {
    const diff = new Date(deadline) - new Date()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <SoftCard color="#9b8ec4">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <h2 style={{fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <span style={{fontSize: '1.25rem'}}>📋</span> Assignments
        </h2>
        <span style={{
          fontSize: '0.8rem', fontWeight: '800', color: 'white',
          background: 'linear-gradient(135deg, #9b8ec4, #b8a8d4)',
          padding: '0.3rem 0.875rem', borderRadius: '999px',
          boxShadow: '0 4px 12px rgba(155,142,196,0.4)',
        }}>
          {assignments.length} due
        </span>
      </div>

      {assignments.length === 0 ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>✅</div>
          <p style={{color: '#4a5568', fontWeight: '600'}}>All caught up!</p>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          {assignments.map((a) => {
            const daysLeft = getDaysLeft(a.deadline)
            const urgentColor = daysLeft <= 2 ? '#ff8c69' : daysLeft <= 5 ? '#ffb347' : '#9b8ec4'
            return (
              <div key={a.id} className="assign-card" style={{
                padding: '1rem', borderRadius: '16px',
                background: `${urgentColor}08`,
                borderLeft: `4px solid ${urgentColor}`,
                border: `1px solid ${urgentColor}20`,
                borderLeftWidth: '4px',
                cursor: 'pointer',
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <div style={{flex: 1}}>
                    <p style={{fontWeight: '700', fontSize: '0.875rem', color: '#1a1a2e'}}>{a.title}</p>
                    <p style={{fontSize: '0.75rem', color: '#8898aa', marginTop: '0.2rem'}}>{a.subject} · {a.teacher_name}</p>
                  </div>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: '800', color: urgentColor,
                    background: `${urgentColor}15`, padding: '0.25rem 0.625rem',
                    borderRadius: '999px', whiteSpace: 'nowrap', marginLeft: '0.5rem',
                    border: `1px solid ${urgentColor}30`,
                  }}>
                    {daysLeft <= 0 ? '🚨 Overdue!' : daysLeft === 1 ? '⚡ Tomorrow!' : `${daysLeft}d left`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </SoftCard>
  )
}

function RecentAnnouncements({ announcements, loading }) {
  const tagStyles = {
    Exam: { color: '#ff8c69', emoji: '📝' },
    Holiday: { color: '#9b8ec4', emoji: '🎉' },
    Assignment: { color: '#ffb347', emoji: '📋' },
    Event: { color: '#7ec8c8', emoji: '🎪' },
    General: { color: '#8898aa', emoji: '📢' },
  }

  return (
    <SoftCard color="#ff8c69">
      <h2 style={{fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem'}}>
        <span style={{fontSize: '1.25rem'}}>📢</span> Announcements
      </h2>

      {loading ? <WaveLoader /> : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          {announcements.map((a) => {
            const style = tagStyles[a.tag] || tagStyles.General
            return (
              <div key={a.id} className="announce-card" style={{
                padding: '1rem', borderRadius: '16px',
                background: `${style.color}08`,
                border: `1px solid ${style.color}20`,
                borderLeft: `4px solid ${style.color}`,
                borderLeftWidth: '4px',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(176,196,222,0.1)',
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem'}}>
                  <span style={{fontSize: '1rem'}}>{style.emoji}</span>
                  <p style={{fontWeight: '700', fontSize: '0.875rem', color: '#1a1a2e'}}>{a.title}</p>
                </div>
                <p style={{fontSize: '0.75rem', color: '#8898aa', paddingLeft: '1.5rem'}}>{a.content}</p>
              </div>
            )
          })}
        </div>
      )}
    </SoftCard>
  )
}