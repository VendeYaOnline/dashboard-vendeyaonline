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
import ModalSuscription from "../modal-suscription/ModalSuscription";
import { SubscriptionResponse } from "@/interfaces";
import Link from "next/link";
import { useSubscription } from "@/hooks/useSubscription";
import ModalDeleteSubscription from "../modal-delete-subscription/ModalDeleteSubscription";

interface Pros {
  headers: string[];
  data: SubscriptionResponse[];
  type: "subscriptions" | "cancellations";
  textButton: string;
  totalResult: number;
}

export default function TableSuscription({
  data,
  type,
  headers,
  textButton,
  totalResult,
}: Pros) {
  const itemsPerPage = totalResult;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [openModalDelete, setOpenModalDetele] = useState(false);
  const idElement = useRef(0);
  const { setSubscription } = useSubscription();
  const [openModal, setOpenModal] = useState(false);

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
  const currentInvoices = data.slice(
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
        <ModalSuscription active={openModal} onClose={onClose} type={type} />
        <ModalDeleteSubscription
          type={type}
          active={openModalDelete}
          onClose={onCloseDelete}
          idElement={idElement.current}
        />
        {data.length ? (
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
              {currentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.price}</TableCell>
                  <TableCell>{invoice.type}</TableCell>
                  <TableCell>{invoice.quantityProducts || 0}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell className="text-base flex">
                    <Link
                      href={
                        type === "subscriptions"
                          ? `/details-subscription/${invoice.id}`
                          : `/details-cancellations/${invoice.id}`
                      }
                    >
                      <Pencil
                        size={18}
                        className="cursor-pointer text-[#3752ec]"
                        onClick={() => setSubscription(invoice)}
                      />
                    </Link>

                    <Trash2
                      size={18}
                      className="cursor-pointer text-[#f7304a] ml-5"
                      onClick={() => {
                        setOpenModalDetele(true),
                          (idElement.current = invoice.id);
                      }}
                    />
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
