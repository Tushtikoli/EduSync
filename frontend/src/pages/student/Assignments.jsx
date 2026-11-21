import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../services/api'

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/assignments/?department=BSc IT&semester=5')
      .then(res => setAssignments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const getDaysLeft = (deadline) => {
    const diff = new Date(deadline) - new Date()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const getUrgencyColor = (days) => {
    if (days <= 0) return '#ef4444'
    if (days <= 2) return '#ef4444'
    if (days <= 5) return '#f59e0b'
    return '#10b981'
  }

  return (
    <DashboardLayout role="student">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{
            fontSize: '1.75rem', fontWeight: '800',
            color: '#1e293b', letterSpacing: '-0.02em'
          }}>
            Assignments 📋
          </h1>
          <p style={{color: '#94a3b8', marginTop: '0.25rem'}}>
            Track and submit your assignments
          </p>
        </div>

        {loading ? (
          <div style={{textAlign: 'center', padding: '4rem'}}>
            <p style={{color: '#94a3b8'}}>Loading assignments...</p>
          </div>
        ) : assignments.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem',
            background: 'white', borderRadius: '20px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <p style={{fontSize: '3rem'}}>✅</p>
            <p style={{color: '#1e293b', fontWeight: '600', marginTop: '1rem'}}>All caught up!</p>
            <p style={{color: '#94a3b8', marginTop: '0.5rem'}}>No pending assignments</p>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {assignments.map((a) => {
              const daysLeft = getDaysLeft(a.deadline)
              const urgencyColor = getUrgencyColor(daysLeft)
              return (
                <div key={a.id} style={{
                  background: 'white', borderRadius: '20px', padding: '1.5rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #f1f5f9',
                  borderLeft: `5px solid ${urgencyColor}`,
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                    <div style={{flex: 1}}>
                      <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1e293b'}}>
                        {a.title}
                      </h3>
                      <p style={{fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem'}}>
                        {a.subject} · {a.teacher_name}
                      </p>
                    </div>
                    <span style={{
                      background: urgencyColor + '15',
                      color: urgencyColor,
                      borderRadius: '999px',
                      padding: '0.35rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                      marginLeft: '1rem',
                    }}>
                      {daysLeft <= 0 ? 'Overdue!' : daysLeft === 1 ? 'Due tomorrow!' : `${daysLeft} days left`}
                    </span>
                  </div>
                  {a.description && (
                    <p style={{
                      fontSize: '0.875rem', color: '#64748b',
                      background: '#f8fafc', borderRadius: '10px',
                      padding: '0.75rem', marginBottom: '0.75rem',
                      lineHeight: '1.6'
                    }}>
                      {a.description}
                    </p>
                  )}
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p style={{fontSize: '0.8rem', color: '#94a3b8'}}>
                      📅 Due: {new Date(a.deadline).toLocaleDateString('en-IN', {
                        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                    <button style={{
                      background: '#2563eb', color: 'white',
                      border: 'none', borderRadius: '10px',
                      padding: '0.5rem 1.25rem',
                      fontSize: '0.875rem', fontWeight: '600',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                    onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
                    >
                      Submit Assignment
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}