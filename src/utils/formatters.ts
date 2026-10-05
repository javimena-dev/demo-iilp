/**
 * Formatea un valor numérico como moneda boliviana.
 */
export function formatBOB(amount: number): string {
  return new Intl.NumberFormat('es-BO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' Bs.';
}

/**
 * Formatea una fecha ISO a formato legible en español.
 */
export function formatDate(iso: string): string {
  const date = new Date(iso + 'T12:00:00');
  return date.toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Formatea duración en meses.
 */
export function formatDuration(months: number): string {
  if (months >= 12) {
    const years = Math.floor(months / 12);
    const remaining = months % 12;
    return remaining > 0
      ? `${years} año${years > 1 ? 's' : ''} y ${remaining} mes${remaining > 1 ? 'es' : ''}`
      : `${years} año${years > 1 ? 's' : ''}`;
  }
  return `${months} mes${months > 1 ? 'es' : ''}`;
}

/**
 * Formatea horas académicas.
 */
export function formatHours(hours: number): string {
  return new Intl.NumberFormat('es-BO').format(hours) + ' hrs.';
}
