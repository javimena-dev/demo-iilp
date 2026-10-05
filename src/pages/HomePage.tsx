import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Users, MessageSquare, MessageCircle, type LucideIcon } from 'lucide-react';
import institute from '@/data/institute.json';
import programsData from '@/data/programs.json';
import publicationsData from '@/data/publications.json';
import type { Program, Publication } from '@/types/database.types';
import { PROGRAM_TYPE_LABELS, PROGRAM_STATUS_LABELS, PROGRAM_STATUS_COLORS } from '@/types/database.types';
import { formatBOB, formatDuration } from '@/utils/formatters';
import { buildWhatsAppLink, buildGenericWhatsAppLink } from '@/utils/whatsapp';

const programs = programsData as Program[];
const publications = publicationsData as Publication[];
const featured = programs;

const RESEARCH_ICON_MAP: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  'graduation-cap': GraduationCap,
  'users': Users,
  'message-square': MessageSquare,
};

export default function HomePage() {
  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-primary-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 transition-opacity duration-700"
          style={{ backgroundImage: `url(${institute.logos.hero_background})` }}
        />
        {/* Gradiente asimétrico para garantizar máxima visibilidad de la imagen y 100% legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/60 to-primary-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-primary-950/25" />

        <div className="relative mx-auto max-w-8xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <img src={institute.logos.iilp} alt="IILP" className="h-12 w-auto brightness-0 invert sm:h-16" />
              <div className="h-10 w-px bg-white/20" />
              <p className="text-2xs font-bold uppercase tracking-widest text-gold-400">
                {institute.university}
              </p>
            </div>

            <h1 className="mt-6 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Postgrados e Investigación Lingüística de Referencia Nacional
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              {institute.mission}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/programas" className="btn-primary text-sm shadow-lg shadow-gold-500/20 hover:scale-[1.02]">
                Explorar Programas
                <ArrowRight size={16} />
              </Link>
              <Link to="/rilta" className="btn-secondary border-white/40 text-white hover:bg-white/10 hover:border-white/70 text-sm">
                <BookOpen size={16} />
                Ver Revista RILTA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CIFRAS DE RESPALDO ═══ */}
      <section className="border-b border-surface-200 bg-white">
        <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: '30+', label: 'Años de trayectoria' },
              { value: '10', label: 'Volúmenes de RILTA publicados' },
              { value: '5', label: 'Docentes con grado doctoral' },
              { value: '500+', label: 'Profesionales formados' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-extrabold text-primary-700 tabular-nums sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-2xs font-medium text-gray-500 sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMAS DESTACADOS ═══ */}
      <section className="bg-surface-50 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Encabezado centrado al estilo de la referencia */}
          <div className="mx-auto max-w-2xl text-center mb-10">
            <div className="mx-auto mb-2 h-1 w-12 rounded-full bg-primary-600" />
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              El IILP — UMSA te ofrece programas de postgrado con titulación oficial:
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-primary-950 sm:text-3xl lg:text-4xl">
              Oferta Académica de Postgrados
            </h2>
          </div>

          {/* Grilla centrada con cards alargados y compactos */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {featured.map((program, idx) => {
              const bounceClass = idx === 0 
                ? 'animate-gentle-bounce' 
                : idx === 1 
                  ? 'animate-gentle-bounce-delayed-1' 
                  : 'animate-gentle-bounce-delayed-2';

              return (
                <article
                  key={program.id}
                  className={`group relative flex w-full max-w-[285px] sm:max-w-[290px] flex-col overflow-hidden rounded-xl border border-surface-200 bg-white shadow-sm transition-all card-program-hover ${bounceClass}`}
                >
                  {/* Imagen 4:3 con badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-100">
                    <img
                      src={program.cover_image}
                      alt={program.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-transparent to-transparent" />
                    
                    <span className="absolute left-2.5 top-2.5 rounded bg-primary-900/90 px-2 py-0.5 text-2xs font-bold uppercase tracking-wider text-white shadow-sm">
                      {PROGRAM_TYPE_LABELS[program.type]}
                    </span>

                    <span className={`absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-2xs font-bold backdrop-blur-md shadow-sm ${PROGRAM_STATUS_COLORS[program.status]}`}>
                      {program.status === 'open' && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                      )}
                      {PROGRAM_STATUS_LABELS[program.status]}
                    </span>

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

                    <div className="flex-1" />

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
            })}
          </div>

          <div className="mt-10 text-center">
            <Link to="/programas" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary-700 hover:text-primary-900 transition-colors">
              Explorar catálogo completo de programas y convocatorias
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ LÍNEAS DE INVESTIGACIÓN ═══ */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <p className="text-2xs font-bold uppercase tracking-widest text-gold-500">Investigación Científica</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-primary-900 sm:text-3xl">
            Líneas de Investigación
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {institute.research_lines.map((line) => {
              const IconComp = RESEARCH_ICON_MAP[line.icon] || BookOpen;
              return (
                <div key={line.id} className="rounded-xl border border-surface-200 p-5 transition-shadow hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
                    <IconComp size={20} className="" />
                  </div>
                  <h3 className="mt-3 font-display text-sm font-bold text-primary-900">{line.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{line.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ RILTA SHOWCASE ═══ */}
      <section className="bg-primary-800 py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <p className="text-2xs font-bold uppercase tracking-widest text-gold-400">Publicación Científica</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Revista RILTA
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/60">
            Revista de Investigaciones en Lingüística Teórica y Aplicada — publicación científica del IILP.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {publications.map((pub) => (
              <a
                key={pub.id}
                href={pub.ojs_url || pub.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl bg-white/5 transition-colors hover:bg-white/10"
              >
                <img src={pub.cover_image} alt={pub.title} className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="p-4">
                  <p className="font-display text-sm font-bold text-white">Vol. {pub.volume} — {pub.year}</p>
                  <p className="mt-1 text-2xs text-white/50">{pub.title}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/rilta" className="btn-primary text-sm">
              Ver todos los volúmenes
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ QUIÉNES SOMOS (Breve) ═══ */}
      <section className="bg-surface-50 py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-2xs font-bold uppercase tracking-widest text-gold-500">{institute.acronym}</p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-primary-900 sm:text-3xl">
                {institute.name}
              </h2>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-display text-sm font-bold text-primary-800">Misión</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{institute.mission}</p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-primary-800">Visión</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{institute.vision}</p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-primary-800">Objetivos</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{institute.objectives}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6">
              <img src={institute.logos.umsa} alt="UMSA" className="h-24 w-auto rounded-lg bg-white p-3 shadow-sm" />
              <img src={institute.logos.faculty} alt="Facultad" className="h-24 w-auto rounded-lg bg-white p-3 shadow-sm" />
              <img src={institute.logos.career} alt="Lingüística" className="h-24 w-auto rounded-lg bg-white p-3 shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="bg-gold-400 py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-extrabold text-primary-900 sm:text-3xl">
            ¿Listo para avanzar en tu carrera académica?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-primary-800/70">
            Contáctanos por WhatsApp y un asesor te guiará con toda la información que necesitas.
          </p>
          <a
            href={buildGenericWhatsAppLink(institute.main_whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-900 px-8 py-4 font-display text-sm font-bold text-white transition-all hover:bg-primary-800 hover:shadow-lg"
          >
            <MessageCircle size={18} />
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
