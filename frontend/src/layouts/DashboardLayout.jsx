import Sidebar from '../components/Sidebar'
import '../styles/design-system.css'

export default function DashboardLayout({ children, role }) {
  return (
    <div style={{display: 'flex', minHeight: '100vh', background: 'var(--color-bg)'}}>
      <Sidebar role={role} />
      <main style={{
        marginLeft: '240px',
        flex: 1,
        padding: '2rem',
        minHeight: '100vh',
        background: 'var(--color-bg)',
      }}>
        {children}
      </main>
    </div>
  )
}