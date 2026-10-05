import { Clock, Monitor, Calendar, CreditCard, BookOpen, GraduationCap } from 'lucide-react';
import type { Program } from '@/types/database.types';
import { PROGRAM_TYPE_LABELS, PROGRAM_STATUS_LABELS, PROGRAM_STATUS_COLORS } from '@/types/database.types';
import { formatBOB, formatDuration, formatDate, formatHours } from '@/utils/formatters';

interface Props {
  program: Program;
}

export default function FastFacts({ program }: Props) {
  const facts = [
    { icon: Monitor, label: 'Modalidad', value: program.modality },
    { icon: Clock, label: 'Duración', value: formatDuration(program.duration_months) },
    { icon: BookOpen, label: 'Carga Académica', value: formatHours(program.academic_hours) },
    ...(program.credits ? [{ icon: GraduationCap, label: 'Créditos', value: `${program.credits} créditos` }] : []),
    { icon: CreditCard, label: 'Inversión', value: formatBOB(program.investment_bob) },
    { icon: Calendar, label: 'Inicio', value: formatDate(program.start_date) },
  ];

  return (
    <section className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
      {/* Encabezado */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-primary-100 px-2.5 py-1 text-2xs font-bold uppercase tracking-wider text-primary-700">
          {PROGRAM_TYPE_LABELS[program.type]}
        </span>
        <span className={`rounded-md border px-2.5 py-1 text-2xs font-semibold ${PROGRAM_STATUS_COLORS[program.status]}`}>
          {PROGRAM_STATUS_LABELS[program.status]}
        </span>
        <span className="text-2xs text-gray-400">{program.version}</span>
      </div>

      {/* Grid de datos */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              <fact.icon size={18} />
            </div>
            <div>
              <p className="text-2xs font-medium uppercase tracking-wide text-gray-400">{fact.label}</p>
              <p className="font-display text-sm font-bold text-primary-900 tabular-nums">{fact.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Horario */}
      <div className="mt-5 rounded-lg bg-surface-50 px-4 py-3">
        <p className="text-2xs font-medium uppercase tracking-wide text-gray-400">Horario</p>
        <p className="mt-0.5 text-sm text-gray-700">{program.schedule}</p>
      </div>
    </section>
  );
}
