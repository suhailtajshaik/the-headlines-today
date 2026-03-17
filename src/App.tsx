import { useState, useMemo, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useNews } from './hooks/useNews';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { DatePicker } from './components/DatePicker';
import { CategoryFilter } from './components/CategoryFilter';
import { ArticleGrid } from './components/ArticleGrid';
import { Footer } from './components/Footer';
import { X } from 'lucide-react';
import type { Article } from './types/news';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { edition, editions, selectedDate, setSelectedDate, loading, error } = useNews();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedArticle, setExpandedArticle] = useState<Article | null>(null);
  const [showAudio, setShowAudio] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedArticle(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Reset audio when date changes
  useEffect(() => {
    setShowAudio(false);
    setAudioError(false);
  }, [selectedDate]);

  const categories = useMemo(() => {
    if (!edition) return [];
    return [...new Set(edition.articles.map(a => a.section))];
  }, [edition]);

  const filteredArticles = useMemo(() => {
    if (!edition) return [];
    if (categoryFilter === 'all') return edition.articles;
    return edition.articles.filter(a => a.section === categoryFilter);
  }, [edition, categoryFilter]);

  const badgeClass = (section: string) => {
    const map: Record<string, string> = {
      'World News': 'badge-world',
      'AI & Tech': 'badge-ai',
      'India': 'badge-india',
      'Hyderabad': 'badge-hyderabad',
      'Hot Topics & Viral': 'badge-hot',
      'Business & Startups': 'badge-business',
    };
    return map[section] || 'badge-world';
  };

  const [y, m, d] = selectedDate ? selectedDate.split('-') : ['', '', ''];
  const audioSrc = y ? `/archive/${y}/${m}/${d}/headlines-today.mp3` : '';

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />

      {/* Grid background — Hero + DatePicker + Audio player */}
      <div style={{
        background: '#0c1222',
        backgroundImage: `
          linear-gradient(rgba(201, 169, 98, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201, 169, 98, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        position: 'relative',
        paddingBottom: showAudio ? '48px' : '32px',
      }}>
        <Hero
          edition={edition}
          selectedDate={selectedDate}
          showAudio={showAudio}
          onToggleAudio={() => { setShowAudio(true); setAudioError(false); }}
        />
        <DatePicker
          editions={editions}
          selectedDate={selectedDate}
          onSelect={(d) => { setSelectedDate(d); setCategoryFilter('all'); }}
        />

        {/* Inline audio player — below date pills, inside grid */}
        {showAudio && (
          <div style={{
            maxWidth: '520px',
            margin: '24px auto 0',
            padding: '0 24px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '50px',
              padding: '10px 16px',
            }}>
              {audioError ? (
                <span style={{ color: '#64748b', fontSize: '0.85rem', flex: 1, textAlign: 'center' }}>
                  Audio not available for this edition.
                </span>
              ) : (
                <audio
                  controls
                  autoPlay
                  preload="auto"
                  src={audioSrc}
                  onError={() => setAudioError(true)}
                  style={{ flex: 1, height: '36px', minWidth: 0 }}
                />
              )}
              <button
                onClick={() => { setShowAudio(false); setAudioError(false); }}
                aria-label="Close player"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#c9a962'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#64748b'}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading edition...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <CategoryFilter categories={categories} selected={categoryFilter} onSelect={setCategoryFilter} />
          <ArticleGrid articles={filteredArticles} onSelect={setExpandedArticle} />
        </>
      )}

      <Footer />

      {expandedArticle && (
        <div className="article-expanded" onClick={() => setExpandedArticle(null)}>
          <div className="article-expanded-content" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setExpandedArticle(null)}>
              <X size={16} />
            </button>
            <span className={`article-badge expanded-badge ${badgeClass(expandedArticle.section)}`}>
              {expandedArticle.sectionEmoji} {expandedArticle.section}
            </span>
            <h2>{expandedArticle.headline}</h2>
            <p className="body-text">{expandedArticle.body}</p>
            {expandedArticle.kicker && (
              <p className="kicker">{expandedArticle.kicker}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
