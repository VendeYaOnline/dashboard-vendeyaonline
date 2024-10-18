"use client";

import { Button } from "../ui";
import classes from "./ModalDelete.module.css";
import { CircleX } from "lucide-react";

interface Props {
  active: boolean;
  onClose: () => void;
}

const ModalDelete = ({ active, onClose }: Props) => {
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
          <Button>Si, eliminar</Button>
        </div>
      </section>
    )
  );
};

export default ModalDelete;
