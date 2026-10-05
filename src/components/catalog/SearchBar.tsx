import { Search, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar programa por nombre, modalidad o área…"
        className="w-full rounded-xl border border-surface-200 bg-white py-3 pl-11 pr-10 text-sm
                   text-gray-900 placeholder:text-gray-400
                   transition-shadow duration-200
                   focus:border-primary-300 focus:shadow-md focus:shadow-primary-500/5 focus:outline-none"
        aria-label="Buscar programa"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 transition-colors hover:bg-surface-100 hover:text-gray-600"
          aria-label="Limpiar búsqueda"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
