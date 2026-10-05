import { useState, useMemo } from 'react';
import { 
  Bell, Calendar, MapPin, MessageCircle, ExternalLink, Clock, AlertCircle 
} from 'lucide-react';
import callsData from '@/data/calls.json';
import institute from '@/data/institute.json';
import type { Announcement } from '@/types/database.types';
import { formatDate } from '@/utils/formatters';

const calls = callsData as Announcement[];

type CategoryFilter = 'all' | 'convocatoria_estudiantes' | 'convocatoria_docente' | 'evento_academico';

const CATEGORY_LABELS: Record<string, string> = {
  convocatoria_estudiantes: 'Admisión Estudiantil',
  convocatoria_docente: 'Convocatoria Docente / Inv.',
  evento_academico: 'Evento & Seminario',
  noticia: 'Noticia Institucional',
};

export default function ConvocatoriasPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [onlyActive, setOnlyActive] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Announcement | null>(null);

  const filteredCalls = useMemo(() => {
    return calls.filter((c) => {
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const matchesStatus = onlyActive ? c.status === 'vigente' : true;
      return matchesCategory && matchesStatus;
    });
  }, [selectedCategory, onlyActive]);

  const activeCount = calls.filter((c) => c.status === 'vigente').length;

  return (
    <main className="bg-surface-50 pb-20">
      {/* ═══ CABECERA INSTITUCIONAL ═══ */}
      <section className="relative overflow-hidden bg-primary-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${institute.logos.hero_background})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-900/90 to-primary-950" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 px-3 py-1 text-xs font-semibold text-gold-300 ring-1 ring-gold-400/30">
              <Bell size={14} />
              Convocatorias y Avisos Académicos
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Convocatorias y Eventos del IILP
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Conoce los procesos abiertos de admisión a programas de postgrado, convocatorias a claustro docente, becas de investigación y seminarios de lingüística organizados por la UMSA.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {activeCount} Convocatorias Vigentes
              </span>
              <span className="text-xs text-slate-400">
                Actualizado periódicamente por la secretaría de postgrado
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FILTROS Y CONTROLES ═══ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="flex flex-col gap-4 rounded-xl border border-surface-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Pestañas de categoría */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'convocatoria_estudiantes', label: 'Admisiones' },
              { id: 'convocatoria_docente', label: 'Docentes & Becas' },
              { id: 'evento_academico', label: 'Eventos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                className={`rounded-lg px-3.5 py-1.5 font-display text-xs font-semibold transition ${
                  selectedCategory === tab.id
                    ? 'bg-primary-900 text-white shadow-sm'
                    : 'bg-surface-100 text-gray-700 hover:bg-surface-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Toggle Solo Vigentes */}
          <label className="flex cursor-pointer items-center gap-2 self-start text-xs font-medium text-gray-700 sm:self-auto">
            <input
              type="checkbox"
              checked={onlyActive}
              onChange={(e) => setOnlyActive(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            Mostrar solo convocatorias vigentes
          </label>
        </div>
      </section>

      {/* ═══ LISTADO DE CONVOCATORIAS ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {filteredCalls.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-surface-300 bg-white p-12 text-center">
            <AlertCircle size={40} className="mx-auto text-gray-400" />
            <h3 className="mt-3 font-display text-base font-bold text-gray-800">
              No se encontraron convocatorias con los filtros seleccionados
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Prueba cambiando la categoría o desmarcando la opción de "solo vigentes".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCalls.map((item) => {
              const isVigente = item.status === 'vigente';

              return (
                <article
                  key={item.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-surface-200 bg-white p-6 shadow-sm transition hover:border-primary-300 hover:shadow-md"
                >
                  <div>
                    {/* Badges superiores */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-primary-100 px-2.5 py-0.5 font-display text-2xs font-bold text-primary-800">
                        {CATEGORY_LABELS[item.category] || 'Convocatoria'}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-2xs font-semibold ${
                          isVigente
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                            : 'bg-gray-100 text-gray-600 ring-1 ring-gray-300'
                        }`}
                      >
                        {isVigente && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                        {isVigente ? 'Vigente' : 'Cerrada'}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="mt-4 font-display text-lg font-bold leading-snug text-primary-950">
                      {item.title}
                    </h3>

                    {/* Resumen */}
                    <p className="mt-2 text-xs leading-relaxed text-gray-600 line-clamp-3">
                      {item.summary}
                    </p>

                    {/* Metadatos */}
                    <div className="mt-4 space-y-1.5 border-t border-surface-100 pt-3 text-2xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-gray-400" />
                        <span>Publicado: {formatDate(item.published_date)}</span>
                      </div>
                      {item.closing_date && (
                        <div className="flex items-center gap-1.5 font-medium text-primary-800">
                          <Clock size={13} className="text-gold-600" />
                          <span>Cierre: {formatDate(item.closing_date)}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-gray-400" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-surface-100">
                    <button
                      onClick={() => setSelectedCall(item)}
                      className="btn-secondary w-full text-xs"
                    >
                      Ver Detalles Completos
                    </button>
                    {item.action_url && (
                      <a
                        href={item.action_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full text-xs"
                      >
                        {item.action_url.includes('wa.me') ? (
                          <MessageCircle size={14} />
                        ) : (
                          <ExternalLink size={14} />
                        )}
                        {item.action_label || 'Más Información'}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══ MODAL DE DETALLE ═══ */}
      {selectedCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-surface-200 pb-4">
              <span className="rounded-full bg-primary-100 px-3 py-1 font-display text-xs font-bold text-primary-800">
                {CATEGORY_LABELS[selectedCall.category] || 'Convocatoria'}
              </span>
              <button
                onClick={() => setSelectedCall(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-surface-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <h2 className="mt-4 font-display text-2xl font-bold text-primary-950">
              {selectedCall.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Publicación: {formatDate(selectedCall.published_date)}
              </span>
              {selectedCall.closing_date && (
                <span className="flex items-center gap-1 font-semibold text-primary-800">
                  <Clock size={14} className="text-gold-600" />
                  Cierre de postulaciones: {formatDate(selectedCall.closing_date)}
                </span>
              )}
            </div>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
              <p>{selectedCall.content}</p>
              {selectedCall.location && (
                <div className="rounded-lg bg-surface-100 p-3 text-xs text-gray-600 flex items-center gap-2">
                  <MapPin size={16} className="text-primary-600 shrink-0" />
                  <span><strong>Lugar / Sede:</strong> {selectedCall.location}</span>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-surface-200 pt-4">
              <button
                onClick={() => setSelectedCall(null)}
                className="btn-secondary text-xs"
              >
                Cerrar
              </button>
              {selectedCall.action_url && (
                <a
                  href={selectedCall.action_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs"
                >
                  {selectedCall.action_url.includes('wa.me') ? (
                    <MessageCircle size={14} />
                  ) : (
                    <ExternalLink size={14} />
                  )}
                  {selectedCall.action_label || 'Contactar'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
