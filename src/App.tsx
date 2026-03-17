import { useState, useMemo, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useNews } from './hooks/useNews';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { DatePicker } from './components/DatePicker';
import { CategoryFilter } from './components/CategoryFilter';
import { ArticleGrid } from './components/ArticleGrid';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';
import { X } from 'lucide-react';
import type { Article } from './types/news';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { edition, editions, selectedDate, setSelectedDate, loading, error } = useNews();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedArticle, setExpandedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedArticle(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero edition={edition} selectedDate={selectedDate} />
      <DatePicker editions={editions} selectedDate={selectedDate} onSelect={(d) => { setSelectedDate(d); setCategoryFilter('all'); }} />
      {selectedDate && <AudioPlayer selectedDate={selectedDate} />}

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
