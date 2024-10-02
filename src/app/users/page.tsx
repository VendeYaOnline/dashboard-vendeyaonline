import { TableUsers } from "@/components";
import { clients } from "@/utils";
import React from "react";

const Users = () => {
  const headers = ["ID", "USUARIO", "EMAIL", "CELULAR", "DETALLES"];
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
