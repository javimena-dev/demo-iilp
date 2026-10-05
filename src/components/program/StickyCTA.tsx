import { MessageCircle, FileText, CreditCard } from 'lucide-react';
import type { Program } from '@/types/database.types';
import { formatBOB } from '@/utils/formatters';
import { buildWhatsAppLink } from '@/utils/whatsapp';

interface Props {
  program: Program;
}

/** Tarjeta lateral fija de conversión — estilo TECH */
export default function StickyCTA({ program }: Props) {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-lg shadow-primary-500/5">
      {/* Precio */}
      <div className="text-center">
        <p className="text-2xs font-medium uppercase tracking-wide text-gray-400">Inversión Total</p>
        <p className="mt-1 font-display text-3xl font-extrabold text-primary-900 tabular-nums">
          {formatBOB(program.investment_bob)}
        </p>
        {program.installments_count > 1 && (
          <p className="mt-1 text-sm text-gray-500">
            Hasta {program.installments_count} cuotas de{' '}
            <span className="font-semibold text-primary-700 tabular-nums">
              {formatBOB(Math.ceil(program.investment_bob / program.installments_count))}
            </span>
          </p>
        )}
        {program.registration_fee_bob > 0 && (
          <p className="mt-1 text-2xs text-gray-400">
            Matrícula: {formatBOB(program.registration_fee_bob)}
          </p>
        )}
      </div>

      {/* Separador */}
      <hr className="my-5 border-surface-200" />

      {/* CTA principal */}
      <a
        href={buildWhatsAppLink(program.title, program.version, program.contact_whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp w-full text-sm"
      >
        <MessageCircle size={18} />
        Preinscribirme por WhatsApp
      </a>

      {/* CTA secundario */}
      {program.brochure_pdf_url && (
        <a
          href={program.brochure_pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mt-3 w-full text-sm"
        >
          <FileText size={16} />
          Descargar Convocatoria
        </a>
      )}

      {/* Nota de facilidades */}
      <div className="mt-5 flex items-start gap-2 rounded-lg bg-gold-50 px-3 py-2.5">
        <CreditCard size={14} className="mt-0.5 shrink-0 text-gold-600" />
        <p className="text-2xs leading-relaxed text-gold-800">
          Facilidades de pago y descuentos institucionales disponibles. Consulte por WhatsApp.
        </p>
      </div>
    </div>
  );
}
