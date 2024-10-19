"use client";

import { subscriptionsQuery } from "@/api/queries";
import TableSuscription from "@/components/table-suscription/Table";

export default function Home() {
  const headers = ["ID", "FECHA", "PRECIO", "TIPO", "CLIENTE"];
  const { data, isLoading } = subscriptionsQuery();
  return isLoading ? (
    <h1>Cargando</h1>
  ) : (
    <TableSuscription
      data={data || []}
      headers={headers}
      textButton="Crear suscripción"
      totalResult={10}
    />
  );
}
