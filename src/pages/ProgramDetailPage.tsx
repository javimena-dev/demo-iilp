import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight, Target, UserCheck, GraduationCap, Users, BookOpen,
  ClipboardList, CheckCircle2, MessageCircle, type LucideIcon
} from 'lucide-react';
import programsData from '@/data/programs.json';
import modulesData from '@/data/modules.json';
import facultyData from '@/data/faculty.json';
import programFacultyData from '@/data/program_faculty.json';
import type { Program, Module, Faculty, ProgramFacultyRelation } from '@/types/database.types';
import { PROGRAM_TYPE_LABELS } from '@/types/database.types';
import FastFacts from '@/components/program/FastFacts';
import SyllabusAccordion from '@/components/program/SyllabusAccordion';
import FacultyGrid from '@/components/program/FacultyGrid';
import StickyCTA from '@/components/program/StickyCTA';
import { buildWhatsAppLink } from '@/utils/whatsapp';

const programs = programsData as Program[];
const allModules = modulesData as Module[];
const allFaculty = facultyData as Faculty[];
const allRelations = programFacultyData as ProgramFacultyRelation[];

export default function ProgramDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-gray-800">Programa no encontrado</h1>
          <p className="mt-2 text-gray-500">El programa solicitado no existe o fue retirado.</p>
          <Link to="/programas" className="btn-primary mt-6 inline-flex text-sm">
            Ver Catálogo
          </Link>
        </div>
      </main>
    );
  }

  const modules = allModules
    .filter((m) => m.program_id === program.id)
    .sort((a, b) => a.module_number - b.module_number);
  const relations = allRelations.filter((r) => r.program_id === program.id);
  const faculty = allFaculty.filter((f) => relations.some((r) => r.faculty_id === f.id));

  return (
    <main className="min-h-screen bg-surface-50">
      {/* Hero del programa */}
      <section className="relative overflow-hidden bg-primary-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${program.banner_image})` }}
        />
        <div className="relative mx-auto max-w-8xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-2xs text-white/60" aria-label="Breadcrumb">
            <Link to="/" className="transition-colors hover:text-white">Inicio</Link>
            <ChevronRight size={12} />
            <Link to="/programas" className="transition-colors hover:text-white">Programas</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">{PROGRAM_TYPE_LABELS[program.type]}</span>
          </nav>

          <p className="font-display text-sm font-bold uppercase tracking-widest text-gold-400">
            {PROGRAM_TYPE_LABELS[program.type]} · {program.version}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {program.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {program.subtitle}
          </p>

          {/* CTA móvil */}
          <div className="mt-6 flex flex-wrap gap-3 lg:hidden">
            <a
              href={buildWhatsAppLink(program.title, program.version, program.contact_whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              <MessageCircle size={16} />
              Preinscribirme
            </a>
          </div>

          {/* Titulación */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
            <GraduationCap size={16} className="text-gold-400" />
            <p className="text-sm font-medium text-white">{program.degree_awarded}</p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="mx-auto max-w-8xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Columna principal (2/3) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Ficha rápida */}
            <FastFacts program={program} />

            {/* Presentación */}
            <Section icon={BookOpen} title="Presentación">
              <p className="text-sm leading-relaxed text-gray-600">{program.summary}</p>
            </Section>

            {/* Objetivo general */}
            <Section icon={Target} title="Objetivo General">
              <p className="text-sm leading-relaxed text-gray-600">{program.general_objective}</p>
            </Section>

            {/* Objetivos específicos */}
            {program.specific_objectives.length > 0 && (
              <Section icon={Target} title="Objetivos Específicos">
                <ul className="space-y-2">
                  {program.specific_objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Perfil de ingreso */}
            {program.applicant_profile.length > 0 && (
              <Section icon={UserCheck} title="Perfil de Ingreso">
                <ul className="space-y-2">
                  {program.applicant_profile.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Perfil de egreso */}
            {program.graduate_profile.length > 0 && (
              <Section icon={GraduationCap} title="Perfil de Egreso">
                <ul className="space-y-2">
                  {program.graduate_profile.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Plan de estudios */}
            {modules.length > 0 && (
              <Section icon={BookOpen} title={`Plan de Estudios — ${modules.length} Módulos`}>
                <SyllabusAccordion modules={modules} />
              </Section>
            )}

            {/* Claustro docente */}
            {faculty.length > 0 && (
              <Section icon={Users} title="Claustro Docente">
                <FacultyGrid faculty={faculty} relations={relations} />
              </Section>
            )}

            {/* Metodología */}
            <Section icon={BookOpen} title="Metodología">
              <p className="text-sm leading-relaxed text-gray-600">{program.methodology}</p>
            </Section>

            {/* Requisitos */}
            {program.requirements.length > 0 && (
              <Section icon={ClipboardList} title="Requisitos de Admisión">
                <ol className="space-y-2">
                  {program.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 font-display text-2xs font-bold text-primary-700 tabular-nums">
                        {i + 1}
                      </span>
                      {req}
                    </li>
                  ))}
                </ol>
              </Section>
            )}
          </div>

          {/* Columna lateral (1/3) — Sticky CTA */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <StickyCTA program={program} />
            </div>
          </aside>
        </div>
      </div>

      {/* CTA fijo móvil (bottom bar) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-200 bg-white/95 p-3 backdrop-blur-md lg:hidden">
        <a
          href={buildWhatsAppLink(program.title, program.version, program.contact_whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full text-sm"
        >
          <MessageCircle size={16} />
          Preinscribirme por WhatsApp
        </a>
      </div>
    </main>
  );
}

/* ── Componente auxiliar de sección ── */
function Section({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2.5">
        <Icon size={20} className="text-primary-500" />
        <h2 className="font-display text-lg font-bold text-primary-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}
