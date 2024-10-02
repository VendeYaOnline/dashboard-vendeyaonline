"use client";

import { TableSuscription } from "@/components";
import { invoices } from "@/utils";

export default function Home() {
  const headers = ["ID", "FECHA", "PRECIO", "TIPO"];
  return (
    <div>
      <TableSuscription
        data={invoices}
        headers={headers}
        textButton="Crear suscripción"
        totalResult={10}
      />
    </div>
  );
}
