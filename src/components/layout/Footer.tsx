import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook } from 'lucide-react';
import institute from '@/data/institute.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white/80">
      {/* Contenido principal */}
      <div className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Identidad */}
          <div className="lg:col-span-1">
            <img
              src={institute.logos.iilp}
              alt={`Logo ${institute.acronym}`}
              className="mb-4 h-14 w-auto brightness-0 invert"
            />
            <p className="font-display text-sm font-bold text-white">
              {institute.name}
            </p>
            <p className="mt-1 text-2xs text-white/50">
              {institute.university}
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              {institute.mission.slice(0, 150)}…
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gold-400">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="transition-colors hover:text-gold-400">Inicio</Link></li>
              <li><Link to="/programas" className="transition-colors hover:text-gold-400">Programas</Link></li>
              <li><Link to="/rilta" className="transition-colors hover:text-gold-400">Revista RILTA</Link></li>
              <li><Link to="/convocatorias" className="transition-colors hover:text-gold-400">Convocatorias</Link></li>
              <li><Link to="/contacto" className="transition-colors hover:text-gold-400">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gold-400">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span>{institute.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-gold-400" />
                <a href={`tel:${institute.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-gold-400">
                  {institute.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-gold-400" />
                <a href={`mailto:${institute.email}`} className="transition-colors hover:text-gold-400">
                  {institute.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span>{institute.office_hours}</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Logos institucionales */}
          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gold-400">
              Respaldo Institucional
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <img src={institute.logos.umsa} alt="UMSA" className="h-14 w-auto rounded bg-white/10 p-1.5" />
              <img src={institute.logos.faculty} alt="Facultad" className="h-14 w-auto rounded bg-white/10 p-1.5" />
              <img src={institute.logos.career} alt="Lingüística" className="h-14 w-auto rounded bg-white/10 p-1.5" />
            </div>
            {/* Redes sociales */}
            <div className="mt-6 flex items-center gap-3">
              {institute.social_links.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold-400 hover:text-primary-900"
                  aria-label={social.platform}
                >
                  {social.icon === 'facebook' ? <Facebook size={16} /> : <Phone size={16} />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6">
          <p className="text-center text-2xs text-white/40">
            © {currentYear} {institute.acronym} — {institute.university}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
