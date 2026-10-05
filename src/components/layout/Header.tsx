import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { buildGenericWhatsAppLink } from '@/utils/whatsapp';
import institute from '@/data/institute.json';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/programas', label: 'Programas' },
  { to: '/rilta', label: 'Revista RILTA' },
  { to: '/convocatorias', label: 'Convocatorias' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-surface-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={institute.logos.iilp}
            alt={`Logo ${institute.acronym}`}
            className="h-10 w-auto sm:h-12"
          />
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight text-primary-800">
              {institute.acronym}
            </p>
            <p className="text-2xs text-gray-500">{institute.university}</p>
          </div>
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 font-body text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-surface-100 hover:text-primary-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA de escritorio */}
        <a
          href={buildGenericWhatsAppLink(institute.main_whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary hidden text-sm lg:inline-flex"
        >
          <MessageCircle size={16} />
          Solicitar Información
        </a>

        {/* Hamburguesa móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-gray-700 transition-colors hover:bg-surface-100 lg:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navegación móvil */}
      {open && (
        <nav className="border-t border-surface-200 bg-white px-4 py-4 lg:hidden animate-fade-in">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-4 py-3 font-body text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-surface-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={buildGenericWhatsAppLink(institute.main_whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3 text-sm"
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={16} />
              Solicitar Información
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
