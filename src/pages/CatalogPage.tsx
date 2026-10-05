import { useMemo, useState } from 'react';
import type { ProgramType } from '@/types/database.types';
import programsData from '@/data/programs.json';
import type { Program } from '@/types/database.types';
import ProgramCard from '@/components/catalog/ProgramCard';
import FilterTabs from '@/components/catalog/FilterTabs';
import SearchBar from '@/components/catalog/SearchBar';
import { GraduationCap } from 'lucide-react';

const programs = programsData as Program[];

export default function CatalogPage() {
  const [activeType, setActiveType] = useState<ProgramType | 'all'>('all');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    programs.forEach((p) => {
      map[p.type] = (map[p.type] ?? 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    let list = programs;
    if (activeType !== 'all') {
      list = list.filter((p) => p.type === activeType);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.modality.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeType, search]);

  return (
    <main className="min-h-screen bg-surface-50">
      {/* Cabecera */}
      <section className="bg-primary-800 py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <div className="flex items-center gap-3 text-gold-400">
            <GraduationCap size={28} />
            <span className="text-2xs font-bold uppercase tracking-widest">Formación de Postgrado</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Catálogo de Programas
          </h1>
          <p className="mt-2 max-w-2xl text-base text-white/70">
            Programas vigentes y próximas convocatorias del Instituto de Investigaciones Lingüísticas y Postgrado.
          </p>
        </div>
      </section>

      {/* Filtros y búsqueda */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="-mt-6 rounded-2xl border border-surface-200 bg-white p-5 shadow-lg shadow-primary-500/5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <FilterTabs active={activeType} onChange={setActiveType} counts={counts} />
            <div className="w-full sm:max-w-xs">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Grid de programas centrado */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        {filtered.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {filtered.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <GraduationCap size={48} className="mx-auto text-surface-300" />
            <p className="mt-4 font-display text-lg font-semibold text-gray-500">
              No se encontraron programas
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Intenta modificar los filtros o la búsqueda.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
