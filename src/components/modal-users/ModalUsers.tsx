"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./ModalUsers.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircleX } from "lucide-react";
import { Input } from "../ui/input";

import toast from "react-hot-toast";
import { mutationRegisterUser } from "@/api/mutation";
import { userQuery } from "@/api/queries";

type Inputs = {
  username: string;
  email: string;
  password: string;
  lastname: string;
  phone: string;
  department: string;
  city: string;
};

interface Props {
  active: boolean;
  onClose: () => void;
}

const schema = yup
  .object({
    username: yup.string().required("Campo obligatorio"),
    email: yup.string().required("Campo obligatorio"),
    password: yup.string().required("Campo obligatorio"),
    lastname: yup.string().required("Campo obligatorio"),
    phone: yup.string().required("Campo obligatorio"),
    department: yup.string().required("Campo obligatorio"),
    city: yup.string().required("Campo obligatorio"),
  })
  .required();

const ModalUsers = ({ active, onClose }: Props) => {
  const { mutateAsync, isLoading } = mutationRegisterUser();
  const { refetch } = userQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver<Inputs>(schema) });

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await mutateAsync(data);
      reset();
      refetch();
      onClose();
      toast.success("Usuario creado exitosamente");
    } catch (error) {
      console.log("error-password", error);
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
            <h1 className="mb-2 font-bold">Usuario</h1>
            <div className="flex flex-col gap-1">
              <label id="username" className="text-sm">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Yosip"
                {...register("username")}
              />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.username?.message}
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
              <label id="password" className="text-sm">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="***"
                {...register("password")}
              />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label id="phone" className="text-sm">
                Telefono
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
              <label id="department" className="text-sm">
                Departamento
              </label>
              <Input
                id="department"
                type="text"
                placeholder="Casanare"
                {...register("department")}
              />

              <p className="text-left text-xs text-red-600 mt-1">
                {errors.department?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label id="city" className="text-sm">
                Ciudad
              </label>
              <Input
                id="city"
                type="text"
                placeholder="Bogotá"
                {...register("city")}
              />

              <p className="text-left text-xs text-red-600 mt-1">
                {errors.city?.message}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className={classes["button-modal"]}
                disabled={isLoading}
              >
                {isLoading ? <div className="spiner" /> : "Crear usuario"}
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  );
};

export default ModalUsers;
