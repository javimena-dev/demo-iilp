import { useState } from 'react';
import { 
  Building2, MapPin, Phone, Mail, Clock, MessageCircle, 
  Users, Award, Compass, ExternalLink
} from 'lucide-react';
import institute from '@/data/institute.json';
import programsData from '@/data/programs.json';
import type { Program } from '@/types/database.types';

const programs = programsData as Program[];

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    programa: programs[0]?.title || '',
    consulta: '',
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = 
      `¡Hola! Me comunico desde el portal web del IILP - UMSA.\n\n` +
      `👤 *Nombre:* ${formData.nombre || 'Interesado'}\n` +
      `📞 *Teléfono:* ${formData.telefono || 'No especificado'}\n` +
      `📧 *Email:* ${formData.email || 'No especificado'}\n` +
      `📌 *Programa de Interés:* ${formData.programa}\n\n` +
      `💬 *Consulta:* ${formData.consulta || 'Quisiera información sobre requisitos, cronograma y modalidad.'}`;

    const url = `https://wa.me/${institute.main_whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

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
              <Building2 size={14} />
              Identidad Institucional y Contacto
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Instituto de Investigaciones Lingüísticas y Postgrado
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Unidad académica de excelencia dependiente de la Carrera de Lingüística e Idiomas y la Facultad de Humanidades y Ciencias de la Educación de la Universidad Mayor de San Andrés.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-gold-400" />
                La Paz, Bolivia
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-gold-400" />
                {institute.office_hours}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MISIÓN, VISIÓN Y AUTORIDADES ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Misión y Visión */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2 text-primary-700">
                <Compass size={20} />
                <h2 className="font-display text-lg font-bold">Misión Institucional</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {institute.mission}
              </p>

              <div className="mt-6 border-t border-surface-200 pt-6">
                <div className="flex items-center gap-2 text-primary-700">
                  <Award size={20} />
                  <h2 className="font-display text-lg font-bold">Visión y Compromiso Académico</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {institute.vision}
                </p>
              </div>

              <div className="mt-6 border-t border-surface-200 pt-6">
                <h3 className="font-display text-sm font-bold text-gray-900">
                  Objetivos Estratégicos
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  {institute.objectives}
                </p>
              </div>
            </div>

            {/* Autoridades */}
            <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2 text-primary-700">
                <Users size={20} />
                <h2 className="font-display text-lg font-bold">Autoridades del Instituto</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {institute.authorities.map((auth, i) => (
                  <div key={i} className="flex items-center gap-3.5 rounded-xl border border-surface-200 bg-surface-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 font-display text-sm font-bold text-primary-800">
                      {auth.name.replace(/^(Dr\.|M\.Sc\.|Lic\.)\s*/, '').charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-primary-950">
                        {auth.name}
                      </h4>
                      <p className="text-2xs text-gray-500">{auth.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de Contacto Directo */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-primary-200 bg-white p-6 shadow-md sm:p-8">
              <div className="flex items-center gap-2 text-primary-800">
                <MessageCircle size={20} className="text-emerald-600" />
                <h2 className="font-display text-lg font-bold">Consulta y Atención Rápida</h2>
              </div>
              <p className="mt-1 text-xs text-gray-600">
                Envía tus datos y consulta directamente al equipo de postgrado del IILP vía WhatsApp.
              </p>

              <form onSubmit={handleWhatsAppSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-2xs font-semibold uppercase tracking-wider text-gray-700">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Lic. Andrea Condori"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-surface-300 px-3.5 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-2xs font-semibold uppercase tracking-wider text-gray-700">
                    Número de WhatsApp / Celular
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 71234567"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-surface-300 px-3.5 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-2xs font-semibold uppercase tracking-wider text-gray-700">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-surface-300 px-3.5 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-2xs font-semibold uppercase tracking-wider text-gray-700">
                    Programa de postgrado
                  </label>
                  <select
                    value={formData.programa}
                    onChange={(e) => setFormData({ ...formData, programa: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-surface-300 px-3.5 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={`${p.title} (${p.version})`}>
                        {p.title} — {p.version}
                      </option>
                    ))}
                    <option value="Consulta general o investigación">Consulta general / Revista RILTA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-2xs font-semibold uppercase tracking-wider text-gray-700">
                    Mensaje o consulta
                  </label>
                  <textarea
                    rows={3}
                    placeholder="¿Tienes dudas sobre requisitos, cuotas o modalidad?"
                    value={formData.consulta}
                    onChange={(e) => setFormData({ ...formData, consulta: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-surface-300 px-3.5 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-whatsapp w-full justify-center text-sm shadow-md"
                >
                  <MessageCircle size={16} />
                  Enviar Consulta por WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ UBICACIÓN FÍSICA Y MAPA INTERACTIVO ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Información de oficina */}
            <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-primary-600">
                  Sede Académica
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-primary-950 sm:text-2xl">
                  Casa Marcelo Quiroga Santa Cruz — UMSA
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  El IILP funciona en las instalaciones históricas de la Casa Marcelo Quiroga Santa Cruz, predio patrimonial de la Universidad Mayor de San Andrés ubicado en la zona de Sopocachi.
                </p>

                <div className="mt-6 space-y-3.5 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-primary-600 shrink-0 mt-0.5" />
                    <span><strong>Dirección:</strong> {institute.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-primary-600 shrink-0" />
                    <span><strong>Teléfono fijo:</strong> {institute.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MessageCircle size={16} className="text-emerald-600 shrink-0" />
                    <span><strong>WhatsApp Postgrado:</strong> +{institute.main_whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-primary-600 shrink-0" />
                    <span><strong>Correo electrónico:</strong> {institute.email}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock size={16} className="text-primary-600 shrink-0 mt-0.5" />
                    <span><strong>Horario de atención:</strong> {institute.office_hours}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-200 flex flex-wrap gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(institute.address + ' Casa Marcelo Quiroga Santa Cruz UMSA')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs"
                >
                  <ExternalLink size={14} />
                  Abrir en Google Maps
                </a>
              </div>
            </div>

            {/* Iframe Mapa */}
            <div className="h-80 lg:col-span-7 lg:h-auto min-h-[340px] bg-surface-100">
              <iframe
                title="Ubicación IILP - Casa Marcelo Quiroga Santa Cruz UMSA"
                src={institute.map_embed_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
