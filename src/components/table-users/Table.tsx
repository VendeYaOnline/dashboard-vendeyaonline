"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table as TableUi,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Pencil, Trash2 } from "lucide-react";
import { User } from "@/interfaces";
import ModalUsers from "../modal-users/ModalUsers";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import ModalDelete from "../modal-delete/ModalDelete";

interface Pros {
  headers: string[];
  data?: User[];
  textButton: string;
  totalResult: number;
}

export default function TableUsers({
  data,
  headers,
  textButton,
  totalResult,
}: Pros) {
  const itemsPerPage = totalResult;
  const totalPages = Math.ceil((data || []).length / itemsPerPage);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDetele] = useState(false);
  const idElement = useRef(0);
  const { setUser } = useUser();

  const onClose = () => {
    setOpenModal(false);
  };

  const onCloseDelete = () => {
    setOpenModalDetele(false);
  };

  const onOpen = () => {
    setOpenModal(true);
  };

  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar las facturas según la página actual
  const currentInvoices = (data || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Función para cambiar de página
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  // Renderizado del paginador
  const renderPagination = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return (
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr;
        </Button>

        {buttons}
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          &rarr;
        </Button>
      </div>
    );
  };
  return (
    <>
      <Button className="mb-4" onClick={onOpen}>
        {textButton}
      </Button>
      <Card className="p-5">
        <ModalUsers active={openModal} onClose={onClose} />
        <ModalDelete
          active={openModalDelete}
          onClose={onCloseDelete}
          idElement={idElement.current}
        />
        {data && data.length ? (
          <TableUi>
            <TableCaption>{renderPagination()}</TableCaption>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentInvoices.map((invoice: User) => (
                <TableRow key={invoice.id}>
                  <TableCell className="text-base">{invoice.id}</TableCell>
                  <TableCell className="text-base">
                    {invoice.username}
                  </TableCell>
                  <TableCell className="text-base">{invoice.email}</TableCell>
                  <TableCell className="text-base">{invoice.phone}</TableCell>
                  <TableCell className="text-base flex">
                    <Link href={`/details-user/${invoice.id}`}>
                      <Pencil
                        size={18}
                        className="cursor-pointer text-[#3752ec]"
                        onClick={() => setUser(invoice)}
                      />
                    </Link>

                    {invoice.email !== "colinparrado@gmail.com" && (
                      <Trash2
                        size={18}
                        className="cursor-pointer text-[#f7304a] ml-5"
                        onClick={() => {
                          setOpenModalDetele(true),
                            (idElement.current = invoice.id);
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableUi>
        ) : (
          <div className="p-10 m-auto h-[300px]  text-center flex justify-center items-center gap-4 flex-col">
            <FileText size={100} color="#3752ec" />
            <h1 className="text-xl">No se encontró contenido</h1>
          </div>
        )}
      </Card>
    </>
  );
}
