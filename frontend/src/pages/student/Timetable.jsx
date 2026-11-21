import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../services/api'

export default function StudentTimetable() {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeDay, setActiveDay] = useState('Monday')
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const colors = ['#6366f1', '#0891b2', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  useEffect(() => {
    api.get('/timetable/week?department=BSc IT&semester=5')
      .then(res => setSlots(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const daySlots = slots.filter(s => s.day === activeDay)

  return (
    <DashboardLayout role="student">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1e293b', letterSpacing: '-0.02em'}}>
            Timetable 📅
          </h1>
          <p style={{color: '#94a3b8', marginTop: '0.25rem'}}>Weekly class schedule</p>
        </div>

        <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
          {days.map((day) => (
            <button key={day} onClick={() => setActiveDay(day)} style={{
              padding: '0.5rem 1.25rem', borderRadius: '999px', border: 'none',
              cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem',
              background: activeDay === day ? '#2563eb' : '#f1f5f9',
              color: activeDay === day ? 'white' : '#64748b',
              transition: 'all 0.2s',
            }}>
              {day}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{color: '#94a3b8', textAlign: 'center', padding: '2rem'}}>Loading...</p>
        ) : daySlots.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem', background: 'white',
            borderRadius: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <p style={{fontSize: '3rem'}}>🎉</p>
            <p style={{color: '#1e293b', fontWeight: '600', marginTop: '1rem'}}>No classes on {activeDay}!</p>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            {daySlots.map((c, i) => (
              <div key={c.id} style={{
                background: 'white', borderRadius: '16px', padding: '1.25rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                borderLeft: `5px solid ${colors[i % colors.length]}`,
                display: 'flex', alignItems: 'center', gap: '1.5rem',
              }}>
                <div style={{
                  background: colors[i % colors.length] + '15',
                  borderRadius: '12px', padding: '0.75rem 1rem',
                  minWidth: '80px', textAlign: 'center',
                }}>
                  <p style={{fontSize: '0.875rem', fontWeight: '700', color: colors[i % colors.length]}}>
                    {c.start_time}
                  </p>
                  <p style={{fontSize: '0.75rem', color: '#94a3b8'}}>{c.end_time}</p>
                </div>
                <div style={{flex: 1}}>
                  <p style={{fontWeight: '700', fontSize: '1rem', color: '#1e293b'}}>{c.subject}</p>
                  <p style={{fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem'}}>
                    {c.teacher_name} · {c.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}