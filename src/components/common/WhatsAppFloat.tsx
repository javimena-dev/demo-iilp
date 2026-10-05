import { MessageCircle } from 'lucide-react';
import { buildGenericWhatsAppLink } from '@/utils/whatsapp';
import institute from '@/data/institute.json';

/** Botón flotante de WhatsApp — estilo Posgrado UPEA */
export default function WhatsAppFloat() {
  return (
    <a
      href={buildGenericWhatsAppLink(institute.main_whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center
                 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30
                 transition-all duration-200 hover:scale-110 hover:bg-emerald-700 hover:shadow-xl
                 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2
                 sm:h-[3.5rem] sm:w-auto sm:gap-2 sm:rounded-2xl sm:px-5"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} className="shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
