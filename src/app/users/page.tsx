"use client";

import { userQuery } from "@/api/queries";
import TableUsers from "@/components/table-users/Table";
import React from "react";

const Users = () => {
  const headers = ["ID", "USUARIO", "EMAIL", "CELULAR", "DETALLES"];
  const { data, isLoading } = userQuery();

  return (
    <section>
      {isLoading ? (
        <h1>Cargando</h1>
      ) : (
        <TableUsers
          data={data}
          headers={headers}
          textButton="Crear usuario"
          totalResult={10}
        />
      )}
    </section>
  );
};

export default Users;
