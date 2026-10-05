import type { ProgramType } from '@/types/database.types';

const TABS: { key: ProgramType | 'all'; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'maestria', label: 'Maestrías' },
  { key: 'diplomado', label: 'Diplomados' },
  { key: 'especialidad', label: 'Especialidades' },
  { key: 'doctorado', label: 'Doctorados' },
];

interface Props {
  active: ProgramType | 'all';
  onChange: (type: ProgramType | 'all') => void;
  counts: Record<string, number>;
}

export default function FilterTabs({ active, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => {
        const count = tab.key === 'all'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[tab.key] ?? 0);
        const isActive = active === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'bg-surface-100 text-gray-600 hover:bg-surface-200 hover:text-primary-700'
            }`}
            aria-pressed={isActive}
          >
            {tab.label}
            <span className={`rounded-full px-1.5 py-0.5 text-2xs font-bold tabular-nums ${
              isActive ? 'bg-white/20 text-white' : 'bg-surface-200 text-gray-500'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
