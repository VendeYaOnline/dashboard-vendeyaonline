"use client";

import { useState } from "react";
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
import { FileText } from "lucide-react";
import { invoices } from "@/utils";
import Modal from "../modal/Modal";

interface Pros {
  headers: string[];
  data: any[];
  textButton: string;
  totalResult: number;
}

export default function Table({
  data,
  headers,
  textButton,
  totalResult,
}: Pros) {
  const itemsPerPage = totalResult;
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const [openModal, setOpenModal] = useState(false);

  const onClose = () => {
    setOpenModal(false);
  };

  const onOpen = () => {
    setOpenModal(true);
  };

  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar las facturas según la página actual
  const currentInvoices = invoices.slice(
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
        <Modal active={openModal} onClose={onClose} />
        {data.length ? (
          <TableUi>
            <TableCaption>{renderPagination()}</TableCaption>
            <TableHeader>
              <TableRow>
                {headers.map((header,index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentInvoices.map((invoice: any) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/*             <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-3xl font-bold">
                  Total
                </TableCell>
                <TableCell className="text-3xl font-bold text-right">
                  $2,500.00
                </TableCell>
              </TableRow>
            </TableFooter> */}
          </TableUi>
        ) : (
          <div className="p-10 m-auto h-[300px]  text-center flex justify-center items-center gap-4 flex-col">
            <FileText size={100} color="#4f46e5" />
            <h1 className="text-xl">No se encontró contenido</h1>
          </div>
        )}
      </Card>
    </>
  );
}
