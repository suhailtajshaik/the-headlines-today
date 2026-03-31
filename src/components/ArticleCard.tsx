import type { Article } from '../types/news';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

const BADGE_MAP: Record<string, string> = {
  'World News': 'badge-world',
  'AI & Tech': 'badge-ai',
  'India': 'badge-india',
  'Hyderabad': 'badge-hyderabad',
  'Hot Topics & Viral': 'badge-hot',
  'Business & Startups': 'badge-business',
};

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  const badgeClass = BADGE_MAP[article.section] || 'badge-world';

  return (
    <article className="article-card" onClick={onClick}>
      <span className={`article-badge ${badgeClass}`}>
        {article.sectionEmoji} {article.section}
      </span>
      <h3>{article.headline}</h3>
      <p className="summary">{article.lede}</p>
      <div className="article-meta">
        <span>{article.readTime}</span>
        <span className="read-more">Read more &rarr;</span>
      </div>
    </article>
  );
}
