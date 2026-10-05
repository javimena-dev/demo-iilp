import { useState } from 'react';
import { ChevronDown, Clock, BookOpen } from 'lucide-react';
import type { Module } from '@/types/database.types';

interface Props {
  modules: Module[];
}

export default function SyllabusAccordion({ modules }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {modules.map((mod) => {
        const isOpen = openId === mod.id;
        return (
          <div
            key={mod.id}
            className={`rounded-xl border transition-colors duration-200 ${
              isOpen ? 'border-primary-200 bg-primary-50/50' : 'border-surface-200 bg-white'
            }`}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : mod.id)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              {/* Número de módulo */}
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold tabular-nums transition-colors ${
                isOpen ? 'bg-primary-500 text-white' : 'bg-surface-100 text-gray-500'
              }`}>
                {String(mod.module_number).padStart(2, '0')}
              </span>

              {/* Título y meta */}
              <div className="flex-1 min-w-0">
                <p className={`font-display text-sm font-semibold transition-colors ${
                  isOpen ? 'text-primary-800' : 'text-gray-800'
                }`}>
                  {mod.title}
                </p>
                <div className="mt-0.5 flex items-center gap-3 text-2xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={11} /> {mod.hours} hrs</span>
                  {mod.credits && <span className="flex items-center gap-1"><BookOpen size={11} /> {mod.credits} créd.</span>}
                  <span>{mod.code}</span>
                </div>
              </div>

              {/* Chevron */}
              <ChevronDown
                size={18}
                className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Contenido desplegable */}
            {isOpen && (
              <div className="border-t border-primary-100 px-5 py-4 animate-fade-in">
                <p className="text-sm leading-relaxed text-gray-600">{mod.description}</p>
                {mod.topics.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {mod.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
