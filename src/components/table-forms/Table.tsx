"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table as TableUi,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Form } from "@/interfaces";
import Link from "next/link";
import { useForms } from "@/hooks/useForm";
import ModalDeleteForm from "../modal-delete-form/ModalDeleteForm";
import ModalForm from "../modal-form/ModalForm";

interface Pros {
  headers: string[];
  data: Form[];
  textButton: string;
  totalResult: number;
}

export default function TableForm({
  data,
  headers,
  textButton,
  totalResult,
}: Pros) {
  const itemsPerPage = totalResult;
  const { setForm } = useForms();
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const idElement = useRef(0);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPagination = () => {
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);
    const buttons = [];

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 text-sm rounded-lg font-medium transition-colors ${
            currentPage === i
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-1 py-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        {buttons}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-500">
          {data.length} formulario{data.length !== 1 ? "s" : ""}
        </p>
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-9 px-4 text-sm font-medium rounded-xl shadow-sm"
        >
          <Plus size={16} />
          {textButton}
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <ModalForm active={openModal} onClose={() => setOpenModal(false)} />
        <ModalDeleteForm
          active={openModalDelete}
          onClose={() => setOpenModalDelete(false)}
          idElement={idElement.current}
        />

        {data.length ? (
          <div className="overflow-x-auto">
            <TableUi>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b border-slate-200">
                  {headers.map((header, index) => (
                    <TableHead
                      key={index}
                      className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3.5 px-4 first:pl-6"
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors"
                  >
                    <TableCell className="font-mono text-xs text-slate-500 pl-6 py-3.5">
                      #{item.id}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-800 py-3.5">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-sm text-slate-700 py-3.5">
                      {item.lastname}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 py-3.5">
                      {item.email}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 py-3.5">
                      {item.phone}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500 py-3.5 max-w-[200px] truncate">
                      {item.message}
                    </TableCell>
                    <TableCell className="py-3.5 pr-6">
                      <div className="flex items-center gap-2">
                        <Link href={`/details-form/${item.id}`}>
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                            onClick={() => setForm(item)}
                          >
                            <Pencil size={15} />
                          </button>
                        </Link>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          onClick={() => {
                            setOpenModalDelete(true);
                            idElement.current = item.id;
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableUi>
            {totalPages > 1 && renderPagination()}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center">
              <FileText size={28} className="text-indigo-500" />
            </div>
            <div>
              <p className="text-slate-800 font-medium">Sin formularios</p>
              <p className="text-slate-500 text-sm mt-1">
                No se encontraron registros
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
