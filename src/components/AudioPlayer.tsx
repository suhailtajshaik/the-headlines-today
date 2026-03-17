import { useState } from 'react';

interface AudioPlayerProps {
  selectedDate: string;
}

export function AudioPlayer({ selectedDate }: AudioPlayerProps) {
  const [audioError, setAudioError] = useState(false);
  const [y, m, d] = selectedDate.split('-');
  const src = `/archive/${y}/${m}/${d}/headlines-today.mp3`;

  if (audioError) {
    return (
      <div className="audio-player">
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Audio not available for this edition.
        </p>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <audio controls preload="none" src={src} onError={() => setAudioError(true)}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
