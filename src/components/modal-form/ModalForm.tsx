"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./ModalForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircleX } from "lucide-react";
import { Input } from "../ui/input";

import toast from "react-hot-toast";
import { mutationForm } from "@/api/mutation";
import { formsQuery } from "@/api/queries";
import { InputsForm } from "@/interfaces";
import { Textarea } from "../ui/textarea";

interface Props {
  active: boolean;
  onClose: () => void;
}

const schema = yup
  .object({
    name: yup.string().required("Nombre es requerido"),
    lastname: yup.string().required("Apellido es requerido"),
    email: yup
      .string()
      .email("Correo electrónico no válido")
      .required("Correo electrónico es requerido")
      .matches(
        /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{1,})$/,
        "Correo electrónico no válido"
      ),
    phone: yup
      .string()
      .required("Teléfono es requerido")
      .matches(/^\d+$/, "El número de teléfono debe contener solo dígitos")
      .test(
        "len",
        "El número de teléfono debe tener entre 7 y 10 dígitos",
        (val) => (val ? val.length > 6 && val.length < 11 : false)
      ),
    message: yup
      .string()
      .required("Mensaje es requerido")
      .min(24, "El mensaje debe tener al menos 24 caracteres"),
  })
  .required();

const ModalForm = ({ active, onClose }: Props) => {
  const { mutateAsync, isLoading } = mutationForm();
  const { refetch } = formsQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsForm>({ resolver: yupResolver<InputsForm>(schema) });

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    try {
      await mutateAsync(data);
      reset();
      refetch();
      onClose();
      toast.success("mensaje creado exitosamente");
    } catch (error: any) {
      toast.error("Error inesperado");
    }
  };

  return (
    active && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes["form-modal"]} onClick={handleFormClick}>
            <CircleX
              className="absolute right-5 cursor-pointer"
              onClick={() => {
                onClose(), reset();
              }}
            />
            <h1 className="mb-2 font-bold">Formulario</h1>
            <div className="flex flex-col gap-1">
              <label id="name" className="text-sm">
                Nombre
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Yosip"
                {...register("name")}
              />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.name?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label id="lastname" className="text-sm">
                Apellidos
              </label>
              <Input
                id="lastname"
                type="text"
                placeholder="Parrado"
                {...register("lastname")}
              />

              <p className="text-left text-xs text-red-600 mt-1">
                {errors.lastname?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label id="email" className="text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="mikeparrado@gmail.com"
                {...register("email")}
              />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.email?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label id="phone" className="text-sm">
                Teléfono
              </label>
              <Input
                id="phone"
                type="number"
                placeholder="3204372376"
                {...register("phone")}
              />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.phone?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label id="message" className="text-sm">
                Mensaje
              </label>
              <Textarea id="message" {...register("message")} />

              <p className="text-left text-xs text-red-600 mt-1">
                {errors.message?.message}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className={classes["button-modal"]}
                disabled={isLoading}
              >
                {isLoading ? <div className="spiner" /> : "Crear formulario"}
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  );
};

export default ModalForm;
