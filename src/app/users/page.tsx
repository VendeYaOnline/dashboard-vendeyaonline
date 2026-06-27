"use client";

import { useUserQuery } from "@/api/queries";
import TableUsers from "@/components/table-users/Table";

function TableSkeleton() {
  return (
    <div className="fade-in">
      <div className="skeleton h-10 w-44 mb-4" />
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <div className="skeleton h-8 w-full" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-12 w-full opacity-70" />
        ))}
      </div>
    </div>
  );
}

export default function Users() {
  const headers = ["ID", "USUARIO", "EMAIL", "CELULAR", "ACCIONES"];
  const { data, isLoading } = useUserQuery();

  return isLoading ? (
    <TableSkeleton />
  ) : (
    <TableUsers
      data={data}
      headers={headers}
      textButton="Crear usuario"
      totalResult={10}
    />
  );
}
