import { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export function Nav({ theme, toggleTheme }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }} aria-label="Main navigation">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>
            H<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            The Headlines Today
          </span>
        </div>

        {/* Desktop right side */}
        <div className="ht-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="https://lab.suhailtaj.cloud" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'}>
            Lab
          </a>
          <a href="https://suhailtaj.cloud" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'}>
            Portfolio
          </a>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '34px', height: '34px',
            border: '1px solid var(--border)', borderRadius: '8px',
            background: 'transparent', color: 'var(--text-muted)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="ht-mobile-btn"
          onClick={() => setMobileOpen(o => !o)}
          style={{ display: 'none', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          padding: '1rem 1.5rem',
        }}>
          {[
            { label: 'Lab', href: 'https://lab.suhailtaj.cloud' },
            { label: 'Portfolio', href: 'https://suhailtaj.cloud' },
          ].map(item => (
            <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{
              display: 'block', padding: '0.75rem 0',
              fontSize: '1rem', color: 'var(--text-secondary)', textDecoration: 'none',
            }}>
              {item.label}
            </a>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.5rem', paddingTop: '1rem' }}>
            <button onClick={() => { toggleTheme(); setMobileOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              background: 'transparent', border: 'none',
              color: 'var(--text-secondary)', cursor: 'pointer',
              fontSize: '1rem', padding: 0,
            }}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .ht-desktop-nav { display: none !important; }
          .ht-mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
