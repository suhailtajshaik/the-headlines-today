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
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
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
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="/" style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            H<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <span style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            letterSpacing: '0.01em',
          }}>
            The Headlines Today
          </span>
        </div>

        {/* Right side — links then toggle last */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a
            href="https://lab.suhailtaj.cloud"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'}
          >
            Lab
          </a>
          <a
            href="https://suhailtaj.cloud"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'}
          >
            Portfolio
          </a>
          {/* Theme toggle — always last */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
