"use client";

import { useCancellationsQuery } from "@/api/queries";
import TableSuscription from "@/components/table-suscription/Table";

function TableSkeleton() {
  return (
    <div className="fade-in">
      <div className="skeleton h-10 w-52 mb-4" />
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <div className="skeleton h-8 w-full" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-12 w-full opacity-70" />
        ))}
      </div>
    </div>
  );
}

export default function Cancellations() {
  const headers = ["ID", "FECHA", "PRECIO", "TIPO", "CLIENTE", "ACCIONES"];
  const { data, isLoading } = useCancellationsQuery();

  return isLoading ? (
    <TableSkeleton />
  ) : (
    <TableSuscription
      type="cancellations"
      data={data || []}
      headers={headers}
      textButton="Crear cancelación"
      totalResult={10}
    />
  );
}
