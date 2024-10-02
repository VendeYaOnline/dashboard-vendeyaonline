"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./ModalUsers.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircleX } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/date";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,

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
    console.log("data", data);
    setLoading(true);
    try {
      reset();
      setLoading(false);
      toast.success(
        "Te hemos enviado un email con un enlace para restablecer tu contraseña"
      );
    } catch (error) {
      console.log("error-password", error);
      setLoading(false);
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
                disabled={loading}
              >
                {loading ? <div className="spiner" /> : "Crear usuario"}
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  );
};

export default ModalUsers;
