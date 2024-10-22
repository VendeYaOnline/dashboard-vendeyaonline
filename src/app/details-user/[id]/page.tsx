"use client";

import { useUser } from "@/hooks/useUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mutationUpdatedUser } from "@/api/mutation";
import { Inputs } from "@/interfaces";
import { ArrowLeft } from "lucide-react";

const schema = yup
  .object({
    username: yup.string().required("Campo obligatorio"),
    email: yup.string().required("Campo obligatorio"),
    password: yup.string(),
    lastname: yup.string().required("Campo obligatorio"),
    phone: yup.string().required("Campo obligatorio"),
    department: yup.string().required("Campo obligatorio"),
    city: yup.string().required("Campo obligatorio"),
  })
  .required();

const DetailsUser = () => {
  const { user } = useUser();
  const [disabled, setDisabled] = useState(true);
  const { mutateAsync, isLoading } = mutationUpdatedUser();
  const params = useParams();
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver<Inputs>(schema) });

  const fillFields = (user: Inputs) => {
    setValue("username", user.username);
    setValue("lastname", user.lastname);
    setValue("department", user.department);
    setValue("city", user.city);
    setValue("email", user.email);
    setValue("phone", user.phone);
  };

  useEffect(() => {
    if (user) {
      fillFields(user);
    } else {
      navigate.push("/users");
    }
  }, [user]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setDisabled(true);
      await mutateAsync({
        id: params.id as string,
        user: data,
      });
      toast.success("Usuario actualizado");
      setTimeout(() => {
        navigate.push("/users");
      }, 1300);
    } catch (error) {
      console.log("error-password", error);
    }
  };

  return (
    user && (
      <div>
        <Link href="/users">
          <Button variant="outline">
            <ArrowLeft size={18} className="mr-1" />
            Atras
          </Button>
        </Link>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <div className="w-full flex gap-3 flex-col">
              <div className="mt-5 flex flex-col gap-2">
                <label className="text-slate-500">Username</label>
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  disabled={disabled}
                />
                <p className="text-left text-xs text-red-600 mt-1">
                  {errors.username?.message}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-2">
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
            </div>

            <div className="w-full flex gap-3 flex-col">
              <div className="mt-5 flex flex-col gap-2">
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
              <div className="mt-5 flex flex-col gap-2">
                <label className="text-slate-500">Contraseña</label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  disabled={disabled}
                />
                <p className="text-left text-xs text-red-600 mt-1">
                  {errors.password?.message}
                </p>
              </div>
            </div>

            <div className="w-full flex gap-3 flex-col">
              <div className="mt-5 flex flex-col gap-2">
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
              <div className="mt-5 flex flex-col gap-2">
                <label className="text-slate-500">Departamento</label>
                <Input
                  id="department"
                  type="text"
                  {...register("department")}
                  disabled={disabled}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <label className="text-slate-600 ">Ciudad</label>
            <Input
              id="city"
              type="text"
              placeholder="Bogotá"
              {...register("city")}
              disabled={disabled}
            />

            <p className="text-left text-xs text-red-600 mt-1">
              {errors.city?.message}
            </p>
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

export default DetailsUser;
