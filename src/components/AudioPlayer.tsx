interface AudioPlayerProps {
  selectedDate: string;
}

export function AudioPlayer({ selectedDate }: AudioPlayerProps) {
  const [y, m, d] = selectedDate.split('-');
  const src = `/archive/${y}/${m}/${d}/headlines-today.mp3`;

  return (
    <div className="audio-player">
      <audio controls preload="none" src={src}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
