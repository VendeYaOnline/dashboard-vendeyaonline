"use client";

import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import classes from "./Modal.module.css";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Inputs = {
  email: string;
};

interface Props {
  active: boolean;
  onClose: () => void;
}

const Modal = ({ active, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    /*     try {
      await changePassword(data.email);
      reset();
      setLoading(false);
      toast.success(
        "Te hemos enviado un email con un enlace para restablecer tu contraseña"
      );
    } catch (error) {
      console.log("error-password", error);
      setLoading(false);
    } */
  };

  return (
    active && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <form>
          <div className={classes["form-modal"]} onClick={handleFormClick}>
            <CircleX
              className="absolute right-5 cursor-pointer"
              onClick={onClose}
            />
            <h1>Restablecer contraseña</h1>
            <p>
              Te enviaremos un email con un enlace para que puedas restablecer
              tu contraseña.
            </p>
            <input placeholder="Email" className={classes.input} />
            {/* <p className="text-xs text-red-700 mt-1">{errors.email?.message}</p> */}
            <div className="flex gap-2">
              <button className={classes["button-modal"]} disabled={loading}>
                {loading ? (
                  <div className="spiner" />
                ) : (
                  "Restablecer contraseña"
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  );
};

export default Modal;
