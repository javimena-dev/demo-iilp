import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle } from 'lucide-react';
import type { Program } from '@/types/database.types';
import { PROGRAM_TYPE_LABELS, PROGRAM_STATUS_LABELS, PROGRAM_STATUS_COLORS } from '@/types/database.types';
import { formatBOB, formatDuration } from '@/utils/formatters';
import { buildWhatsAppLink } from '@/utils/whatsapp';

interface Props {
  program: Program;
}

export default function ProgramCard({ program }: Props) {
  return (
    <article className="group relative flex w-full max-w-[285px] sm:max-w-[290px] flex-col overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm transition-all card-program-hover">
      {/* Imagen 4:3 con badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-100">
        <img
          src={program.cover_image}
          alt={program.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-transparent to-transparent" />

        {/* Tipo de programa */}
        <span className="absolute left-2.5 top-2.5 rounded bg-primary-900/90 px-2 py-0.5 text-2xs font-bold uppercase tracking-wider text-white shadow-sm">
          {PROGRAM_TYPE_LABELS[program.type]}
        </span>

        {/* Estado de convocatoria */}
        <span className={`absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-2xs font-bold backdrop-blur-md shadow-sm ${PROGRAM_STATUS_COLORS[program.status]}`}>
          {program.status === 'open' && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
          )}
          {PROGRAM_STATUS_LABELS[program.status]}
        </span>

        {/* Versión sobre la imagen */}
        <span className="absolute bottom-2 left-2.5 rounded bg-black/50 px-2 py-0.5 text-2xs font-semibold text-white/95 backdrop-blur-sm">
          {program.version}
        </span>
      </div>

      {/* Contenido centrado y alargado */}
      <div className="flex flex-1 flex-col p-4 text-center">
        <h3 className="font-display text-xs sm:text-sm font-extrabold uppercase leading-snug tracking-tight text-primary-950 transition-colors group-hover:text-primary-700 min-h-[2.5rem] flex items-center justify-center">
          {program.title}
        </h3>

        <div className="mt-2 space-y-0.5 text-2xs text-gray-500">
          <p className="font-semibold text-gray-700">{program.version.toUpperCase()}</p>
          <p>{program.modality} · {formatDuration(program.duration_months)}</p>
          <p>{program.academic_hours} Horas Académicas</p>
        </div>

        <div className="mt-3 border-t border-surface-100 pt-2.5">
          <span className="font-display text-base font-extrabold text-primary-800 tabular-nums">
            {formatBOB(program.investment_bob)}
          </span>
          <p className="text-2xs text-gray-400">
            {program.installments_count} cuotas mensuales
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Acciones */}
        <div className="mt-4 flex flex-col gap-2">
          <Link
            to={`/programas/${program.slug}`}
            className="btn-primary group/btn flex w-full items-center justify-center gap-1.5 py-2 text-xs font-bold shadow-sm"
          >
            <BookOpen size={14} />
            Ver Programa
          </Link>
          <a
            href={buildWhatsAppLink(program.title, program.version, program.contact_whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex w-full items-center justify-center gap-1.5 py-2 text-xs font-bold shadow-sm hover:shadow-emerald-600/30"
          >
            <MessageCircle size={14} />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

