import { Headphones, FileText } from 'lucide-react';
import type { NewsEdition } from '../types/news';

interface HeroProps {
  edition: NewsEdition | null;
  selectedDate: string;
}

export function Hero({ edition, selectedDate }: HeroProps) {
  const [y, m, d] = selectedDate.split('-');
  const archivePath = `/archive/${y}/${m}/${d}`;
  const categories = edition
    ? [...new Set(edition.articles.map(a => a.section))]
    : [];

  return (
    <section className="hero">
      <div className="hero-tag">AI-Curated Daily Briefing</div>
      <h1>The Headlines Today</h1>
      <p className="hero-date">{edition?.label || selectedDate}</p>
      {edition && (
        <p className="hero-stats">
          {edition.articles.length} stories across {categories.length} categories
        </p>
      )}
      <div className="hero-actions">
        <a href={`${archivePath}/headlines-today.mp3`} className="btn btn-accent" target="_blank" rel="noreferrer">
          <Headphones size={16} />
          Listen to Today's Briefing
        </a>
        <a href={`${archivePath}/headlines-today.pdf`} className="btn" target="_blank" rel="noreferrer">
          <FileText size={16} />
          Download PDF
        </a>
      </div>
    </section>
  );
}
