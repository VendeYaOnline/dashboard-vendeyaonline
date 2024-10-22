"use client";

import { formsQuery } from "@/api/queries";
import TableForm from "@/components/table-forms/Table";
import React from "react";

const Form = () => {
  const headers = ["ID", "NOMBRE", "APELLIDO", "EMAIL", "TELÉFONO", "MENSAJE"];
  const { data, isLoading } = formsQuery();
  return isLoading ? (
    <h1>Cargando</h1>
  ) : (
    <TableForm
      data={data || []}
      headers={headers}
      textButton="Crear formulario"
      totalResult={10}
    />
  );
};

export default Form;
