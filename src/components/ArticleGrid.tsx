import type { Article } from '../types/news';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  onSelect: (article: Article) => void;
}

export function ArticleGrid({ articles, onSelect }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="loading-state">
        <p>No articles found for this filter.</p>
      </div>
    );
  }

  return (
    <div className="article-grid">
      {articles.map((article, i) => (
        <ArticleCard key={i} article={article} onClick={() => onSelect(article)} />
      ))}
    </div>
  );
}
