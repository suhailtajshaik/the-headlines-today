import { useState, useEffect } from 'react'

export function Footer() {
  const [visitors, setVisitors] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://analytics.suhailtaj.cloud/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site: 'headlines', referrer: document.referrer || null }),
    }).catch(() => {})

    fetch('https://analytics.suhailtaj.cloud/api/count/headlines')
      .then(r => r.json())
      .then(d => setVisitors(d.count))
      .catch(() => {})
  }, [])

  return (
    <footer className="footer">
      <p>
        <a href="https://suhailtaj.cloud">suhailtaj.cloud</a>
        {' '}·{' '}AI-curated by Maxwell · © {new Date().getFullYear()}
      </p>
      {visitors !== null && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
          👁 {visitors.toLocaleString()} {visitors === 1 ? 'visitor' : 'visitors'}
        </p>
      )}
    </footer>
  )
}
