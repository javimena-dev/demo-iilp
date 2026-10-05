import type { Faculty, ProgramFacultyRelation } from '@/types/database.types';
import { User } from 'lucide-react';

interface Props {
  faculty: Faculty[];
  relations: ProgramFacultyRelation[];
}

export default function FacultyGrid({ faculty, relations }: Props) {
  // Ordenar por el campo order_display
  const sorted = [...relations].sort((a, b) => a.order_display - b.order_display);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sorted.map((rel) => {
        const member = faculty.find((f) => f.id === rel.faculty_id);
        if (!member) return null;

        return (
          <div
            key={member.id}
            className="flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-4 transition-shadow hover:shadow-md"
          >
            {/* Avatar */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-500">
              {member.photo_url ? (
                <img src={member.photo_url} alt={member.full_name} className="h-full w-full rounded-xl object-cover" />
              ) : (
                <User size={24} />
              )}
            </div>

            {/* Info */}
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-primary-900">
                {member.degree_abbrev} {member.full_name}
              </p>
              <p className="mt-0.5 text-2xs font-medium text-gold-600">
                {rel.role_in_program}
              </p>
              <p className="mt-1 text-2xs leading-relaxed text-gray-500 line-clamp-2">
                {member.specialty}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
