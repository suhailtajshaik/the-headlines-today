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
      <select
        className="date-dropdown"
        value={selectedDate}
        onChange={(e) => onSelect(e.target.value)}
      >
        {recent.map(ed => {
          const full = formatFull(ed.date);
          return (
            <option key={ed.date} value={ed.date}>
              {full}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function formatFull(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}
