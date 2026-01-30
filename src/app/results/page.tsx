
import { Suspense } from "react";
import ResultsClient from '@/components/ResultsClient'

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="px-4 py-8">Cargando resultados...</div>}>
      <ResultsClient />
    </Suspense>
  );
}
