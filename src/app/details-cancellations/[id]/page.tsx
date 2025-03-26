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
import { useMutationCancellationsSubscription } from "@/api/mutation";
import { ArrowLeft } from "lucide-react";
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

const CancellationsSubscription = () => {
  const { subscription } = useSubscription();
  const [disabled, setDisabled] = useState(true);
  const { mutateAsync, isLoading } = useMutationCancellationsSubscription();
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
      navigate.push("/cancellations");
    }
  }, [subscription, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setDisabled(true);
      await mutateAsync({
        id: params.id as string,
        subscription: {
          ...data,
          date: formatDateText(data.date),
          price: Number(data.price),
          quantityProducts: Number(data.quantityProducts),
        },
      });
      toast.success("Cancelación actualizada");
      setTimeout(() => {
        navigate.push("/cancellations");
      }, 1300);
    } catch (error) {
      console.log("error-password", error);
    }
  };

  return (
    subscription && (
      <div>
        <Link href="/cancellations">
          <Button variant="outline">
            <ArrowLeft size={18} className="mr-1" />
            Atras
          </Button>
        </Link>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <div className="w-full flex gap-3 flex-col">
              <div className="mt-5 flex flex-col gap-2">
                <label id="price" className="text-sm">
                  Precio
                </label>
                <Input
                  id="price"
                  type="number"
                  placeholder="$0"
                  disabled={disabled}
                  {...register("price")}
                />
                <p className="text-left text-xs text-red-600 mt-1">
                  {errors.price?.message}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <label id="type" className="text-sm">
                    Tipo
                  </label>
                  <Select
                    onValueChange={(value) => setValue("type", value)}
                    disabled={disabled}
                  >
                    <SelectTrigger className="focus:ring-1 focus:ring-blue-600 p-5">
                      {watch("type") ? (
                        <span>{watch("type")}</span>
                      ) : (
                        <span className="text-[#9ca3af]">
                          Selecciona el tipo
                        </span>
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
                <div className="flex flex-col gap-2 w-full">
                  <label id="status" className="text-sm">
                    Estado
                  </label>
                  <Select
                    onValueChange={(value) => setValue("status", value)}
                    disabled={disabled}
                  >
                    <SelectTrigger className="focus:ring-1 focus:ring-blue-600 p-5">
                      {watch("status") ? (
                        <span>{watch("status")}</span>
                      ) : (
                        <span className="text-[#9ca3af]">
                          Selecciona un estado
                        </span>
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
            </div>
            <div className="w-full flex gap-3 flex-col">
              <div className="mt-5 flex flex-col gap-2">
                <label id="date" className="text-sm">
                  Fecha
                </label>
                <DatePicker
                  value={watch("date")}
                  setValue={setValue}
                  disabled={disabled}
                />
                <p className="text-left text-xs text-red-600 mt-1">
                  {errors.date?.message &&
                    !watch("date") &&
                    errors.date?.message}
                </p>
              </div>
            </div>

            <div className="w-full flex gap-3 flex-col">
              <div className="mt-5 flex flex-col gap-2">
                <label id="quantityProducts" className="text-sm">
                  Cantidad de productos
                </label>
                <Input
                  id="quantityProducts"
                  type="number"
                  placeholder="100"
                  disabled={disabled}
                  {...register("quantityProducts")}
                />
                <p className="text-left text-xs text-red-600 mt-1">
                  {errors.quantityProducts?.message}
                </p>
              </div>
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

export default CancellationsSubscription;
