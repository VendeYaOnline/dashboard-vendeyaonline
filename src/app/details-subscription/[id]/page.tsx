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
import { useMutationUpdatedSubscription } from "@/api/mutation";
import { ArrowLeft, Edit3, Save, X } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date";
import { Subscription } from "@/interfaces";
import { convertDate, formatDateText } from "@/utils";

type Inputs = {
  price: string;
  quantityProducts: string;
  type: string;
  status: string;
  date: Date;
};

const schema = yup
  .object({
    price: yup.string().required("Campo obligatorio"),
    quantityProducts: yup.string().required("Campo obligatorio"),
    type: yup.string().required("Campo obligatorio"),
    status: yup.string().required("Campo obligatorio"),
    date: yup.date().required("Campo obligatorio"),
  })
  .required();

const DetailsSubscription = () => {
  const { subscription } = useSubscription();
  const [disabled, setDisabled] = useState(true);
  const { mutateAsync, isLoading } = useMutationUpdatedSubscription();
  const params = useParams();
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver<Inputs>(schema) });

  const fillFields = (subscription: Subscription) => {
    setValue("price", subscription.price.toString());
    setValue("quantityProducts", subscription.quantityProducts.toString());
    setValue("type", subscription.type);
    setValue("status", subscription.status);
    setValue("date", new Date(convertDate(subscription.date)));
  };

  useEffect(() => {
    if (subscription) {
      fillFields(subscription);
    } else {
      navigate.push("/");
    }
  }, [subscription, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setDisabled(true);
      await mutateAsync({
        id: params.id as string,
        subscription: {
          ...data,
          quantityProducts: Number(data.quantityProducts),
          date: formatDateText(data.date),
          price: Number(data.price),
        },
      });
      toast.success("Suscripción actualizada");
      setTimeout(() => {
        navigate.push("/");
      }, 1300);
    } catch (error) {
      console.log("error-update", error);
    }
  };

  if (!subscription) return null;

  return (
    <div className="fade-in max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button
            variant="outline"
            className="gap-2 h-9 text-sm rounded-xl border-slate-200 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Atrás
          </Button>
        </Link>
        <span className="text-xs text-slate-400 font-mono">
          ID #{params.id}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Detalle de suscripción
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {disabled ? "Solo lectura" : "Modo edición"}
            </p>
          </div>
          {disabled && (
            <Button
              onClick={() => setDisabled(false)}
              type="button"
              className="gap-2 h-9 px-4 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              <Edit3 size={15} />
              Editar
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Precio */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Precio
              </label>
              <Input
                type="number"
                placeholder="$0"
                disabled={disabled}
                className="h-10 border-slate-200 focus:border-indigo-400 disabled:bg-slate-50 disabled:text-slate-500"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Cantidad de productos */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Cantidad de productos
              </label>
              <Input
                type="number"
                placeholder="0"
                disabled={disabled}
                className="h-10 border-slate-200 focus:border-indigo-400 disabled:bg-slate-50 disabled:text-slate-500"
                {...register("quantityProducts")}
              />
              {errors.quantityProducts && (
                <p className="text-xs text-red-500">
                  {errors.quantityProducts.message}
                </p>
              )}
            </div>

            {/* Fecha */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Fecha
              </label>
              <DatePicker
                value={watch("date")}
                setValue={setValue}
                disabled={disabled}
              />
              {errors.date && !watch("date") && (
                <p className="text-xs text-red-500">{errors.date.message}</p>
              )}
            </div>

            {/* Tipo */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Tipo</label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                disabled={disabled}
              >
                <SelectTrigger className="h-10 border-slate-200 focus:ring-1 focus:ring-indigo-400 disabled:bg-slate-50 disabled:text-slate-500">
                  {watch("type") ? (
                    <span>{watch("type")}</span>
                  ) : (
                    <span className="text-slate-400">Seleccionar tipo</span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Emprendedor">Emprendedor</SelectItem>
                    <SelectItem value="Crecimiento">Crecimiento</SelectItem>
                    <SelectItem value="Corporativo">Corporativo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Estado */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Estado
              </label>
              <Select
                onValueChange={(value) => setValue("status", value)}
                disabled={disabled}
              >
                <SelectTrigger className="h-10 border-slate-200 focus:ring-1 focus:ring-indigo-400 disabled:bg-slate-50 disabled:text-slate-500">
                  {watch("status") ? (
                    <span>{watch("status")}</span>
                  ) : (
                    <span className="text-slate-400">Seleccionar estado</span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pause">Pausa</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!disabled && (
            <div className="flex items-center gap-3 mt-8 pt-5 border-t border-slate-100">
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2 h-9 px-5 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                <Save size={15} />
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2 h-9 px-4 text-sm rounded-xl border-slate-200 hover:bg-slate-50"
                onClick={() => setDisabled(true)}
              >
                <X size={15} />
                Cancelar
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DetailsSubscription;
