import { useState, useRef, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../services/api'

const subjects = ['General', 'Data Structures', 'Web Technology', 'Database Management', 'Software Engineering', 'Python', 'Java']

export default function AiTutor() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am Sync, your AI study buddy! 👋 Ask me anything about your subjects and I will explain it in simple language. What would you like to learn today?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState('General')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    const currentMessages = [...messages]
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const history = currentMessages.slice(1).map(m => ({
        role: m.role,
        content: m.content
      }))

      const res = await api.post('/ai/tutor', {
        message: input,
        subject: subject,
        conversation_history: history
      })

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.response
      }])
    } catch (err) {
      console.log('AI ERROR FULL:', JSON.stringify(err.response?.data))
      console.log('AI ERROR MSG:', err.message)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${err.response?.data?.detail || err.message}`
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <DashboardLayout role="student">
      <div style={{maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column'}}>

        <div style={{marginBottom: '1.5rem'}}>
          <h1 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1e293b', letterSpacing: '-0.02em'}}>
            AI Study Buddy 🤖
          </h1>
          <p style={{color: '#94a3b8', marginTop: '0.25rem'}}>Ask Sync anything about your syllabus</p>
        </div>

        <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap'}}>
          {subjects.map(s => (
            <button key={s} onClick={() => setSubject(s)} style={{
              padding: '0.4rem 1rem', borderRadius: '999px', border: 'none',
              cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem',
              background: subject === s ? '#2563eb' : '#f1f5f9',
              color: subject === s ? 'white' : '#64748b',
              transition: 'all 0.2s',
            }}>
              {s}
            </button>
          ))}
        </div>

        <div style={{
          flex: 1, background: 'white', borderRadius: '20px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{
            flex: 1, overflowY: 'auto', padding: '1.5rem',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb, #0891b2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', marginRight: '0.75rem', flexShrink: 0,
                  }}>
                    🤖
                  </div>
                )}
                <div style={{
                  maxWidth: '70%',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #2563eb, #0891b2)'
                    : '#f8fafc',
                  color: msg.role === 'user' ? 'white' : '#1e293b',
                  borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  padding: '0.875rem 1.125rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb, #0891b2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  🤖
                </div>
                <div style={{
                  background: '#f8fafc', borderRadius: '20px 20px 20px 4px',
                  padding: '0.875rem 1.125rem',
                }}>
                  <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Sync is thinking... ✨</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #f1f5f9',
            display: 'flex', gap: '0.75rem', alignItems: 'flex-end',
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Sync anything... (Press Enter to send)"
              rows={1}
              style={{
                flex: 1, border: '2px solid #e2e8f0', borderRadius: '14px',
                padding: '0.75rem 1rem', fontSize: '0.9rem', outline: 'none',
                resize: 'none', fontFamily: 'inherit', lineHeight: '1.5',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#2563eb'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? '#e2e8f0' : 'linear-gradient(135deg, #2563eb, #0891b2)',
                color: loading || !input.trim() ? '#94a3b8' : 'white',
                border: 'none', borderRadius: '14px',
                padding: '0.75rem 1.5rem', fontWeight: '700',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem', transition: 'all 0.2s',
              }}
            >
              Send 🚀
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}