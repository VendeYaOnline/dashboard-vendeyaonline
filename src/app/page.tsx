"use client";

import { Table } from "@/components";
import { invoices } from "@/utils";

export default function Home() {
  const headers = ["ID", "FECHA", "PRECIO", "TIPO"];
  return (
    <div>
      <Table
        data={invoices}
        headers={headers}
        textButton="Crear suscripción"
        totalResult={10}
      />
    </div>
  );
}
