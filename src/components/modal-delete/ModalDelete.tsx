"use client";

import { useMutationDeleteUser } from "@/api/mutation";
import { Button } from "../ui";
import classes from "./ModalDelete.module.css";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import { useUserQuery } from "@/api/queries";

interface Props {
  active: boolean;
  onClose: () => void;
  idElement: number;
}

const ModalDelete = ({ active, onClose, idElement }: Props) => {
  const { mutateAsync, isLoading } = useMutationDeleteUser();
  const { refetch } = useUserQuery();

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    try {
      await mutateAsync(idElement);
      refetch();
      toast.success("Elemento eliminado");
      onClose();
    } catch (error) {
      toast.error("Usuario no encontrado");
    }
  };

  return (
    active && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <div className={classes["form-modal"]} onClick={handleFormClick}>
          <CircleX
            className="absolute right-5 cursor-pointer"
            onClick={() => {
              onClose();
            }}
          />
          <h1 className="mb-2 font-bold">Eliminar elemento</h1>
          <p>¿Deseas eliminar este elemento?</p>
          <Button onClick={handleSubmit} className="h-13 text-base">
            {isLoading ? <div className="spiner" /> : "Si, eliminar"}
          </Button>
        </div>
      </section>
    )
  );
};

export default ModalDelete;
