import { useEffect } from 'react'

export function Footer() {
  useEffect(() => {
    fetch('https://analytics.suhailtaj.cloud/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site: 'headlines', referrer: document.referrer || null }),
    }).catch(() => {})
  }, [])

  return (
    <footer className="footer">
      <p>
        <a href="https://suhailtaj.cloud">suhailtaj.cloud</a> &middot; AI-curated by Maxwell &middot; &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
