"use client";

import { useCancellationsQuery } from "@/api/queries";
import TableSuscription from "@/components/table-suscription/Table";

export default function Home() {
  const headers = ["ID", "FECHA", "PRECIO", "TIPO", "CLIENTE", "ACCIONES"];
  const { data, isLoading } = useCancellationsQuery();
  return isLoading ? (
    <h1>Cargando</h1>
  ) : (
    <TableSuscription
      type="cancellations"
      data={data || []}
      headers={headers}
      textButton="Crear una cancelación"
      totalResult={10}
    />
  );
}
