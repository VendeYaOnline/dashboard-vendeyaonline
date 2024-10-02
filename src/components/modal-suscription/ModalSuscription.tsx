"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./ModalSuscription.module.css";
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
import toast from "react-hot-toast/headless";

type Inputs = {
  price: string;
  type: string;
  date: Date;
  client: string;
};

interface Props {
  active: boolean;
  onClose: () => void;
}

const schema = yup
  .object({
    price: yup.string().required("Campo obligatorio"),
    type: yup.string().required("Campo obligatorio"),
    date: yup.date().required("Campo obligatorio"),
    client: yup.string().required("Campo obligatorio"),
  })
  .required();

const ModalSuscription = ({ active, onClose }: Props) => {
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
            <h1 className="mb-2 font-bold">Sucripción</h1>
            <div className="flex flex-col gap-1">
              <label id="price" className="text-sm">
                Precio
              </label>
              <Input
                id="price"
                type="number"
                placeholder="$0"
                {...register("price")}
              />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.price?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label id="type" className="text-sm">
                Tipo
              </label>
              <Select onValueChange={(value) => setValue("type", value)}>
                <SelectTrigger className="focus:ring-1 focus:ring-indigo-600 p-5">
                  {watch("type") ? (
                    <SelectValue />
                  ) : (
                    <span className="text-[#9ca3af]">Selecciona el tipo</span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="text-left text-xs text-red-600 mt-1">
                {errors.type?.message && !watch("type") && errors.type?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label id="client" className="text-sm">
                Cliente
              </label>
              <Select onValueChange={(value) => setValue("client", value)}>
                <SelectTrigger className="focus:ring-1 focus:ring-indigo-600 p-5">
                  {watch("client") ? (
                    <SelectValue />
                  ) : (
                    <span className="text-[#9ca3af]">
                      Selecciona un cliente
                    </span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="text-left text-xs text-red-600 mt-1">
                {errors.client?.message &&
                  !watch("client") &&
                  errors.client?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label id="date" className="text-sm">
                Fecha
              </label>
              <DatePicker setValue={setValue} />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.date?.message && !watch("date") && errors.date?.message}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className={classes["button-modal"]}
                disabled={loading}
              >
                {loading ? <div className="spiner" /> : "Crear sucripción"}
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  );
};

export default ModalSuscription;
