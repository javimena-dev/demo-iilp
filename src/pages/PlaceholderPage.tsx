export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-surface-50">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-primary-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">Esta sección se implementará en la Fase 4.</p>
      </div>
    </main>
  );
}
