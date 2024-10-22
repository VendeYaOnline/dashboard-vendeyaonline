"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMutationUpdatedForm } from "@/api/mutation";
import { ArrowLeft } from "lucide-react";
import { useForms } from "@/hooks/useForm";
import { Textarea } from "@/components/ui/textarea";
import { InputsForm } from "@/interfaces";

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

const DetailsForm = () => {
  const { form } = useForms();
  const [disabled, setDisabled] = useState(true);
  const { mutateAsync, isLoading } = useMutationUpdatedForm();
  const { id } = useParams();
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputsForm>({ resolver: yupResolver<InputsForm>(schema) });

  const fillFields = (form: InputsForm) => {
    setValue("name", form.name);
    setValue("lastname", form.lastname);
    setValue("email", form.email);
    setValue("phone", form.phone);
    setValue("message", form.message);
  };

  useEffect(() => {
    if (form) {
      fillFields(form);
    } else {
      navigate.push("/users");
    }
  }, [form]);

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    try {
      setDisabled(true);
      await mutateAsync({ id: id as string, form: data });
      toast.success("Mensaje actualizado");
      setTimeout(() => {
        navigate.push("/form");
      }, 1300);
    } catch (error) {
      console.log("error-form", error);
    }
  };

  return (
    form && (
      <div>
        <Link href="/form">
          <Button variant="outline">
            <ArrowLeft size={18} className="mr-1" />
            Atras
          </Button>
        </Link>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 justify-between">
            <div className="w-full flex gap-3 flex-col">
              <div className="mt-5 flex flex-col gap-2">
                <label className="text-slate-500">Nombre</label>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  disabled={disabled}
                />
                <p className="text-left text-xs text-red-600 mt-1">
                  {errors.name?.message}
                </p>
              </div>
              <div className="flex gap-3 flex-col">
                <div className="mt-5 flex flex-col gap-2">
                  <label className="text-slate-500">Mensaje</label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    disabled={disabled}
                  />
                </div>

                <p className="text-left text-xs text-red-600 mt-1">
                  {errors.message?.message}
                </p>
              </div>
            </div>

            <div className="mt-5 flex w-full flex-col gap-2">
              <label className="text-slate-500">Apellidos</label>
              <Input
                id="lastname"
                type="text"
                {...register("lastname")}
                disabled={disabled}
              />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.lastname?.message}
              </p>
            </div>

            <div className="mt-5 flex w-full gap-3 flex-col">
              <label className="text-slate-500">Teléfono</label>
              <Input
                id="phone"
                type="number"
                {...register("phone")}
                disabled={disabled}
              />

              <p className="text-left text-xs text-red-600 mt-1">
                {errors.phone?.message}
              </p>
            </div>

            <div className="w-full mt-5 flex flex-col gap-2">
              <label className="text-slate-500">Email</label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled={disabled}
              />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.email?.message}
              </p>
            </div>
          </div>

          <div>
            {disabled && (
              <Button
                onClick={() => setDisabled(false)}
                disabled={isLoading}
                type="button"
                className="mt-5 w-[300px] font-light p-5"
              >
                {isLoading ? "Cargando..." : "Editar campos"}
              </Button>
            )}

            {!disabled && (
              <div className="flex gap-4 items-center mt-5">
                <Button type="submit" className="w-[300px] font-light p-5">
                  Guardar campos
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  className="p-5"
                  onClick={() => setDisabled(true)}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    )
  );
};

export default DetailsForm;
