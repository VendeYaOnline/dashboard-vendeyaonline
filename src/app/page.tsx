"use client";

import { useSubscriptionsQuery } from "@/api/queries";
import TableSuscription from "@/components/table-suscription/Table";

export default function Home() {
  const headers = [
    "ID",
    "FECHA",
    "PRECIO",
    "TIPO",
    "PRODUCTOS",
    "CLIENTE",
    "ACCIONES",
  ];
  const { data, isLoading } = useSubscriptionsQuery();
  return isLoading ? (
    <h1>Cargando</h1>
  ) : (
    <TableSuscription
      type="subscriptions"
      data={data || []}
      headers={headers}
      textButton="Crear suscripción"
      totalResult={10}
    />
  );
}
