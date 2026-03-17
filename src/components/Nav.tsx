import { Sun, Moon } from 'lucide-react';

interface NavProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export function Nav({ theme, toggleTheme }: NavProps) {
  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-left">
        <a href="https://suhailtaj.cloud" className="nav-logo">S.</a>
        <span className="nav-title">The Headlines Today</span>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a href="https://lab.suhailtaj.cloud" className="nav-link">Lab</a>
      </div>
    </nav>
  );
}
