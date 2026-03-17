import { Headphones, FileText } from 'lucide-react';
import type { NewsEdition } from '../types/news';

interface HeroProps {
  edition: NewsEdition | null;
  selectedDate: string;
}

export function Hero({ edition, selectedDate }: HeroProps) {
  const parts = selectedDate ? selectedDate.split('-') : [];
  const [y, m, d] = parts.length === 3 ? parts : ['', '', ''];
  const archivePath = y ? `/archive/${y}/${m}/${d}` : '#';
  const categories = edition
    ? [...new Set(edition.articles.map(a => a.section))]
    : [];

  const listenBtnWidth = '220px';

  return (
    <section style={{
      paddingTop: '120px',
      paddingBottom: '56px',
      paddingLeft: '24px',
      paddingRight: '24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201, 169, 98, 0.07) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0%',
        right: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Tag badge */}
        <span style={{
          display: 'inline-block',
          color: '#c9a962',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          border: '1px solid rgba(201, 169, 98, 0.3)',
          background: 'rgba(201, 169, 98, 0.08)',
          padding: '0.4rem 1rem',
          borderRadius: '4px',
          marginBottom: '1.5rem',
        }}>
          AI-Curated Daily Briefing
        </span>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: '0.75rem',
        }}>
          The Headlines Today
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
          {edition?.label || selectedDate}
        </p>

        {edition && (
          <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '2rem' }}>
            {edition.articles.length} stories across {categories.length} categories
          </p>
        )}

        {!edition && <div style={{ marginBottom: '2rem' }} />}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>

          {/* Listen button */}
          <a
            href={`${archivePath}/headlines-today.mp3`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#c9a962',
              color: '#0c1222',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              width: listenBtnWidth,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
          >
            <Headphones size={16} />
            Listen to Today's Briefing
          </a>

          {/* Download PDF */}
          <a
            href={`${archivePath}/headlines-today.pdf`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: '1px solid #c9a962',
              color: '#c9a962',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              background: 'transparent',
              transition: 'background 0.2s',
              width: listenBtnWidth,
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,169,98,0.08)'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'}
          >
            <FileText size={16} />
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
