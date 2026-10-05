import { Phone } from 'lucide-react';
import institute from '@/data/institute.json';

/** Franja institucional superior — estilo Posgrado UPEA */
export default function TopBar() {
  return (
    <div className="bg-primary-900 text-white/90 text-2xs sm:text-xs">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-1.5 sm:px-6">
        {/* Jerarquía institucional */}
        <p className="truncate font-body">
          <span className="hidden sm:inline">{institute.university} · </span>
          <span className="hidden md:inline">{institute.faculty} · </span>
          <span>{institute.acronym}</span>
        </p>

        {/* Teléfono rápido */}
        <a
          href={`tel:${institute.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-1.5 font-medium transition-colors hover:text-gold-400"
        >
          <Phone size={12} />
          <span className="hidden sm:inline">{institute.phone}</span>
        </a>
      </div>
    </div>
  );
}
