/**
 * Genera un enlace wa.me con mensaje contextual para un programa específico.
 */
export function buildWhatsAppLink(
  programTitle: string,
  version: string,
  phone: string = '59163240879',
): string {
  const message =
    `¡Hola! Vengo desde el portal web oficial del IILP - UMSA.\n\n` +
    `Estoy interesado(a) en recabar información detallada, requisitos y facilidades de pago para:\n` +
    `📌 *${programTitle}* (${version})\n\n` +
    `Agradezco me puedan orientar con el proceso de preinscripción.`;

  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}

/**
 * Genera un enlace wa.me genérico (sin programa específico).
 */
export function buildGenericWhatsAppLink(phone: string = '59163240879'): string {
  const message = `¡Hola! Quisiera más información sobre los programas de postgrado del IILP - UMSA.`;
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}
