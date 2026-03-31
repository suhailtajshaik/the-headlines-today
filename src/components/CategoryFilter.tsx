interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <button
        className={`category-btn${selected === 'all' ? ' active' : ''}`}
        onClick={() => onSelect('all')}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-btn${selected === cat ? ' active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
