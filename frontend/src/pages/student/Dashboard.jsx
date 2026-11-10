import DashboardLayout from '../../layouts/DashboardLayout'

export default function StudentDashboard() {
  const name = localStorage.getItem('full_name') || 'Student'
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <DashboardLayout role="student">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>

        <div style={{marginBottom: '2rem'}}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em'
          }}>
            Good morning, {name.split(' ')[0]} 👋
          </h1>
          <p style={{color: 'var(--color-text-secondary)', marginTop: '0.25rem'}}>
            {today}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <StatCard label="Attendance" value="78%" status="warning" />
          <StatCard label="Assignments Due" value="3" status="danger" />
          <StatCard label="Subjects" value="6" status="normal" />
          <StatCard label="This Week" value="12 classes" status="normal" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem'
        }}>
          <TodayTimetable />
          <RecentAnnouncements />
        </div>

      </div>
    </DashboardLayout>
  )
}

function StatCard({ label, value, status }) {
  const colors = {
    normal: 'var(--color-accent)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-danger)',
    success: 'var(--color-success)',
  }

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--color-border)',
    }}>
      <p style={{
        fontSize: '0.8rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {label}
      </p>
      <p style={{
        fontSize: '1.75rem',
        fontWeight: '700',
        color: colors[status] || colors.normal
      }}>
        {value}
      </p>
    </div>
  )
}

function TodayTimetable() {
  const classes = [
    { time: '9:00 AM', subject: 'Data Structures', teacher: 'Prof. Sharma', room: 'Lab 2' },
    { time: '11:00 AM', subject: 'Web Technology', teacher: 'Prof. Mehta', room: 'Room 301' },
    { time: '1:00 PM', subject: 'Database Management', teacher: 'Prof. Joshi', room: 'Room 205' },
    { time: '3:00 PM', subject: 'Software Engineering', teacher: 'Prof. Khan', room: 'Room 102' },
  ]

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-md)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--color-border)',
    }}>
      <h2 style={{
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '1.25rem',
        color: 'var(--color-text-primary)'
      }}>
        Today's Classes
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {classes.map((c, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg)',
          }}>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              minWidth: '60px',
              paddingTop: '2px'
            }}>
              {c.time}
            </span>
            <div>
              <p style={{
                fontWeight: '500',
                fontSize: '0.875rem',
                color: 'var(--color-text-primary)'
              }}>
                {c.subject}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-secondary)'
              }}>
                {c.teacher} · {c.room}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentAnnouncements() {
  const announcements = [
    { title: 'Internal Exam Schedule Released', time: '2 hours ago', tag: 'Exam' },
    { title: 'Holiday on 15th November', time: '1 day ago', tag: 'Holiday' },
    { title: 'Assignment submission deadline extended', time: '2 days ago', tag: 'Assignment' },
    { title: 'Workshop on AI — Register Now', time: '3 days ago', tag: 'Event' },
  ]

  const tagColors = {
    Exam: '#dc2626',
    Holiday: '#16a34a',
    Assignment: '#d97706',
    Event: '#2563eb',
  }

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-md)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--color-border)',
    }}>
      <h2 style={{
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '1.25rem',
        color: 'var(--color-text-primary)'
      }}>
        Announcements
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {announcements.map((a, i) => (
          <div key={i} style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg)',
            borderLeft: `3px solid ${tagColors[a.tag]}`,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--color-text-primary)'
              }}>
                {a.title}
              </p>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '999px',
                background: tagColors[a.tag] + '20',
                color: tagColors[a.tag],
                fontWeight: '500',
                whiteSpace: 'nowrap'
              }}>
                {a.tag}
              </span>
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              marginTop: '0.25rem'
            }}>
              {a.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}