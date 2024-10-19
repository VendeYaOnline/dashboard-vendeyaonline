"use client";

import TableSuscription from "@/components/table-suscription/Table";
import { invoices } from "@/utils";

export default function Home() {
  const headers = ["ID", "FECHA", "PRECIO", "TIPO"];

  return (
    <TableSuscription
      data={invoices}
      headers={headers}
      textButton="Crear suscripción"
      totalResult={10}
    />
  );
}
