import { Sun, Moon } from 'lucide-react';

interface NavProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export function Nav({ theme, toggleTheme }: NavProps) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(12, 18, 34, 0.9)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1e293b',
    }} aria-label="Main navigation">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo — matches lab/portfolio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="/" style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#fff',
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            H<span style={{ color: '#c9a962' }}>.</span>
          </a>
          <span style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#64748b',
            letterSpacing: '0.01em',
          }}>
            The Headlines Today
          </span>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              background: 'transparent',
              color: '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#c9a962';
              (e.currentTarget as HTMLButtonElement).style.color = '#c9a962';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#1e293b';
              (e.currentTarget as HTMLButtonElement).style.color = '#64748b';
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="https://lab.suhailtaj.cloud"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#94a3b8',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c9a962'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'}
          >
            Lab
          </a>
          <a
            href="https://suhailtaj.cloud"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#94a3b8',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c9a962'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'}
          >
            Portfolio
          </a>
        </div>
      </div>
    </nav>
  );
}
