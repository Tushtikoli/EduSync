import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../services/api'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function AdminDashboard() {
  const name = localStorage.getItem('full_name') || 'Admin'
  const firstName = name.split(' ')[0]
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
  const [announcements, setAnnouncements] = useState([])
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    api.get('/announcements/').then(res => setAnnouncements(res.data)).catch(console.error)
    api.get('/assignments/?department=BSc IT&semester=5').then(res => setAssignments(res.data)).catch(console.error)
  }, [])

  return (
    <DashboardLayout role="admin">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
          borderRadius: '20px', padding: '2rem 2.5rem',
          marginBottom: '2rem', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '200px', height: '200px',
            background: 'rgba(255,255,255,0.05)', borderRadius: '50%',
          }} />
          <h1 style={{
            fontSize: '1.875rem', fontWeight: '800',
            color: 'white', letterSpacing: '-0.02em', marginBottom: '0.5rem',
          }}>
            {getGreeting()}, {firstName}! 👑
          </h1>
          <p style={{color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem'}}>{today}</p>
          <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap'}}>
            {[
              { label: 'Total Students', value: '450', emoji: '👨‍🎓' },
              { label: 'Total Teachers', value: '32', emoji: '👨‍🏫' },
              { label: 'Departments', value: '6', emoji: '🏛️' },
              { label: 'Active Courses', value: '24', emoji: '📚' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)', borderRadius: '12px',
                padding: '0.75rem 1.25rem', display: 'flex',
                alignItems: 'center', gap: '0.75rem',
                border: '1px solid rgba(255,255,255,0.15)',
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
            { label: 'New Registrations', value: '12', sub: 'This week', color: '#2563eb', bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)', icon: '✨' },
            { label: 'Pending Approvals', value: '5', sub: 'Need action', color: '#f59e0b', bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', icon: '⏳' },
            { label: 'Active Assignments', value: `${assignments.length}`, sub: 'Across all classes', color: '#7c3aed', bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', icon: '📋' },
            { label: 'Announcements', value: `${announcements.length}`, sub: 'Currently active', color: '#10b981', bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', icon: '📢' },
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

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
          <DepartmentOverview />
          <QuickAdminActions />
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
          <RecentActivity />
          <SystemStatus announcements={announcements} assignments={assignments} />
        </div>
      </div>
    </DashboardLayout>
  )
}

function DepartmentOverview() {
  const departments = [
    { name: 'BSc IT', students: 120, teachers: 8, color: '#2563eb' },
    { name: 'BSc CS', students: 95, teachers: 7, color: '#7c3aed' },
    { name: 'BCA', students: 110, teachers: 6, color: '#0891b2' },
    { name: 'BSc Data Science', students: 75, teachers: 5, color: '#10b981' },
    { name: 'MCA', students: 50, teachers: 6, color: '#f59e0b' },
  ]
  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem'}}>
        Department Overview 🏛️
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {departments.map((d, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '0.75rem', borderRadius: '12px', background: '#f8fafc',
          }}>
            <div style={{width: '8px', height: '40px', background: d.color, borderRadius: '4px'}} />
            <div style={{flex: 1}}>
              <p style={{fontWeight: '600', fontSize: '0.875rem', color: '#1e293b'}}>{d.name}</p>
              <p style={{fontSize: '0.75rem', color: '#94a3b8'}}>{d.students} students · {d.teachers} teachers</p>
            </div>
            <div style={{
              background: d.color + '15', color: d.color,
              borderRadius: '999px', padding: '0.25rem 0.75rem',
              fontSize: '0.75rem', fontWeight: '600'
            }}>
              {d.students}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickAdminActions() {
  const actions = [
    { label: 'Add Student', emoji: '👨‍🎓', color: '#2563eb', bg: '#eff6ff' },
    { label: 'Add Teacher', emoji: '👨‍🏫', color: '#7c3aed', bg: '#f3e8ff' },
    { label: 'Make Announcement', emoji: '📢', color: '#0891b2', bg: '#cffafe' },
    { label: 'Manage Timetable', emoji: '📅', color: '#10b981', bg: '#d1fae5' },
    { label: 'Fee Management', emoji: '💰', color: '#f59e0b', bg: '#fef3c7' },
    { label: 'View Reports', emoji: '📊', color: '#ef4444', bg: '#fee2e2' },
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

function RecentActivity() {
  const activities = [
    { action: 'New student registered', name: 'Priya Sharma', time: '5 mins ago', emoji: '👤' },
    { action: 'Assignment posted', name: 'Prof. Mehta', time: '1 hour ago', emoji: '📋' },
    { action: 'Announcement created', name: 'Admin', time: '2 hours ago', emoji: '📢' },
    { action: 'Timetable updated', name: 'Admin', time: '3 hours ago', emoji: '📅' },
    { action: 'New teacher added', name: 'Prof. Khan', time: '1 day ago', emoji: '👨‍🏫' },
  ]
  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem'}}>
        Recent Activity 🕐
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {activities.map((a, i) => (
          <div key={i} style={{
            display: 'flex', gap: '0.75rem', alignItems: 'center',
            padding: '0.75rem', borderRadius: '12px', background: '#f8fafc',
          }}>
            <span style={{fontSize: '1.25rem'}}>{a.emoji}</span>
            <div style={{flex: 1}}>
              <p style={{fontSize: '0.875rem', fontWeight: '500', color: '#1e293b'}}>{a.action}</p>
              <p style={{fontSize: '0.75rem', color: '#94a3b8'}}>{a.name} · {a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SystemStatus({ announcements, assignments }) {
  const stats = [
    { label: 'Database', status: 'Healthy', color: '#10b981', emoji: '🟢' },
    { label: 'API Server', status: 'Running', color: '#10b981', emoji: '🟢' },
    { label: 'Active Announcements', status: `${announcements.length} active`, color: '#2563eb', emoji: '📢' },
    { label: 'Active Assignments', status: `${assignments.length} active`, color: '#7c3aed', emoji: '📋' },
    { label: 'Storage', status: '2.4 GB used', color: '#f59e0b', emoji: '💾' },
  ]
  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
    }}>
      <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem'}}>
        System Status 🖥️
      </h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {stats.map((s, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.75rem', borderRadius: '12px', background: '#f8fafc',
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
              <span style={{fontSize: '1rem'}}>{s.emoji}</span>
              <p style={{fontSize: '0.875rem', fontWeight: '500', color: '#1e293b'}}>{s.label}</p>
            </div>
            <span style={{
              fontSize: '0.75rem', fontWeight: '600', color: s.color,
              background: s.color + '15', padding: '0.2rem 0.75rem', borderRadius: '999px',
            }}>
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}