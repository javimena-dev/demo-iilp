import { useState } from 'react';
import { BookOpen, ExternalLink, Download, FileText, CheckCircle, Send, Globe, ChevronRight } from 'lucide-react';
import publicationsData from '@/data/publications.json';
import institute from '@/data/institute.json';
import type { Publication } from '@/types/database.types';

const publications = publicationsData as Publication[];

export default function RiltaPage() {
  const [selectedLang, setSelectedLang] = useState<Record<string, 'es' | 'en'>>({});

  const toggleLang = (id: string, lang: 'es' | 'en') => {
    setSelectedLang((prev) => ({ ...prev, [id]: lang }));
  };

  return (
    <main className="bg-surface-50 pb-20">
      {/* ═══ CABECERA INSTITUCIONAL RILTA ═══ */}
      <section className="relative overflow-hidden bg-primary-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${institute.logos.hero_background})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-900/90 to-primary-950" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/20 px-3 py-1 text-xs font-semibold text-gold-300 ring-1 ring-gold-400/30">
              <BookOpen size={14} />
              Órgano Oficial de Publicación Científica
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Revista de Investigaciones en Lingüística Teórica y Aplicada (RILTA)
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Publicación científica arbitrada del Instituto de Investigaciones Lingüísticas y Postgrado de la Universidad Mayor de San Andrés, dedicada a la difusión del conocimiento en lingüística andina, lenguas originarias, sociolingüística y lingüística aplicada.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <strong>ISSN en trámite</strong>
              </span>
              <span className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <strong>Periodicidad:</strong> Semestral
              </span>
              <span className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <strong>Arbitraje:</strong> Doble ciego por pares
              </span>
              <span className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <strong>Acceso:</strong> Abierto (Open Access)
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://ojs.umsa.bo/ojs/index.php/rilta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Portal OJS UMSA
                <ExternalLink size={16} />
              </a>
              <a
                href="#normas-autores"
                className="btn-secondary border-white/20 text-white hover:bg-white/10 text-sm"
              >
                Normas para Autores
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATÁLOGO DE VOLÚMENES ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold text-primary-950 sm:text-3xl">
              Volúmenes y Números Publicados
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Consulte y descargue los artículos completos de la colección de RILTA.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
            {publications.length} volúmenes digitalizados
          </span>
        </div>

        <div className="space-y-8">
          {publications.map((pub) => {
            const currentLang = selectedLang[pub.id] || 'es';
            const abstractText = currentLang === 'es' ? pub.abstract_es : pub.abstract_en;

            return (
              <article
                key={pub.id}
                className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-8">
                  {/* Portada */}
                  <div className="lg:col-span-3">
                    <div className="group relative aspect-[3/4] w-full max-w-[220px] mx-auto overflow-hidden rounded-xl border border-surface-200 bg-surface-100 shadow-sm sm:max-w-none">
                      <img
                        src={pub.cover_image}
                        alt={`${pub.journal_name} - Vol. ${pub.volume}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback si la imagen externa falla
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary-950/80 p-4 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <BookOpen size={28} className="mb-2 text-gold-400" />
                        <span className="text-xs font-semibold">Volumen {pub.volume} ({pub.year})</span>
                      </div>
                    </div>
                  </div>

                  {/* Datos del volumen */}
                  <div className="flex flex-col justify-between lg:col-span-9">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary-100 px-3 py-1 font-display text-xs font-bold text-primary-800">
                          Vol. {pub.volume}, N° {pub.issue} ({pub.year})
                        </span>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-2xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                          Arbitrado
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-xl font-bold text-primary-900 sm:text-2xl">
                        {pub.title}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Publicado por: {pub.authors.join(', ')} • IILP UMSA
                      </p>

                      {/* Selector de idioma del resumen */}
                      <div className="mt-4 flex items-center gap-2 border-b border-surface-200 pb-2">
                        <span className="text-xs font-medium text-gray-500">Resumen / Abstract:</span>
                        <div className="inline-flex rounded-lg bg-surface-100 p-0.5">
                          <button
                            onClick={() => toggleLang(pub.id, 'es')}
                            className={`rounded-md px-2.5 py-1 text-2xs font-semibold transition ${
                              currentLang === 'es'
                                ? 'bg-white text-primary-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            Español
                          </button>
                          <button
                            onClick={() => toggleLang(pub.id, 'en')}
                            className={`rounded-md px-2.5 py-1 text-2xs font-semibold transition ${
                              currentLang === 'en'
                                ? 'bg-white text-primary-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            English
                          </button>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-gray-600">
                        {abstractText}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-surface-100">
                      <a
                        href={pub.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs"
                      >
                        <Download size={14} />
                        Descargar Volumen Completo (PDF)
                      </a>
                      {pub.ojs_url && (
                        <a
                          href={pub.ojs_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-xs"
                        >
                          <Globe size={14} />
                          Ver en Repositorio OJS
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ═══ NORMAS PARA AUTORES ═══ */}
      <section id="normas-autores" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <span className="text-2xs font-bold uppercase tracking-wider text-primary-600">
              Guía de Publicación
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-primary-950 sm:text-3xl">
              Normas Editoriales para Autores
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              La Revista RILTA recibe artículos científicos originales e inéditos resultantes de proyectos de investigación en las áreas de lingüística, educación bilingüe y ciencias del lenguaje.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-surface-200 bg-surface-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <FileText size={20} />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900">
                1. Estructura del Manuscrito
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Extensión entre 6.000 y 9.000 palabras, incluyendo título, resumen en español e inglés, palabras clave, introducción, metodología, resultados, discusión y referencias según norma APA 7ma edición.
              </p>
            </div>

            <div className="rounded-xl border border-surface-200 bg-surface-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <CheckCircle size={20} />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900">
                2. Evaluación por Pares
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Todos los manuscritos son evaluados bajo el sistema de arbitraje doble ciego por al menos dos dictaminadores externos especializados en el área temática.
              </p>
            </div>

            <div className="rounded-xl border border-surface-200 bg-surface-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                <Send size={20} />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-primary-900">
                3. Envío de Manuscritos
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Los trabajos deben remitirse en formato digital (.docx) a través del portal OJS de la UMSA o directamente al correo oficial de la dirección editorial: <strong className="text-primary-800">iilp@umsa.bo</strong>.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-primary-50 p-5 border border-primary-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-sm font-bold text-primary-950">
                ¿Interesado en postular un artículo para el Volumen 11?
              </h4>
              <p className="text-xs text-primary-700">
                La recepción de artículos para la edición 2027 se encuentra abierta. Consulte plazos con el comité.
              </p>
            </div>
            <a
              href={`mailto:${institute.email}?subject=Postulación%20de%20artículo%20RILTA%20Volumen%2011`}
              className="btn-primary text-xs shrink-0"
            >
              Contactar al Comité Editorial
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
