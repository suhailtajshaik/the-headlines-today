import type { IndexEntry } from '../types/news';

interface DatePickerProps {
  editions: IndexEntry[];
  selectedDate: string;
  onSelect: (date: string) => void;
}

export function DatePicker({ editions, selectedDate, onSelect }: DatePickerProps) {
  const recent = editions.slice(0, 7);

  if (recent.length === 0) return null;

  return (
    <div className="date-picker">
      {recent.map(ed => {
        const short = formatShort(ed.date);
        return (
          <button
            key={ed.date}
            className={`date-pill${ed.date === selectedDate ? ' active' : ''}`}
            onClick={() => onSelect(ed.date)}
          >
            {short}
          </button>
        );
      })}
    </div>
  );
}

function formatShort(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
