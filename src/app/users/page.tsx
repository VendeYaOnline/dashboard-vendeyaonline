"use client";

import { userQuery } from "@/api/queries";
import TableUsers from "@/components/table-users/Table";
import { clients } from "@/utils";
import React from "react";

const Users = () => {
  const headers = ["ID", "USUARIO", "EMAIL", "CELULAR", "DETALLES"];
  const { data, isLoading } = userQuery();
  console.log("data", data);

  return (
    <section>
      <TableUsers
        data={clients}
        headers={headers}
        textButton="Crear usuario"
        totalResult={10}
      />
    </section>
  );
};

export default Users;
