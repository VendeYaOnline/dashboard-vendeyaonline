"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./ModalSuscription.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircleX } from "lucide-react";
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
import {
  useCancellationsQuery,
  useSubscriptionsQuery,
  useUserQuery,
} from "@/api/queries";
import {
  useMutationCancellations,
  useMutationSubscription,
} from "@/api/mutation";
import { formatDateText } from "@/utils";
import { InputsSubscription } from "@/interfaces";

interface Props {
  active: boolean;
  type: "subscriptions" | "cancellations";
  onClose: () => void;
}

const schema = yup
  .object({
    price: yup.string().required("Campo obligatorio"),
    quantityProducts: yup.string().required("Campo obligatorio"),
    type: yup.string().required("Campo obligatorio"),
    date: yup.date().required("Campo obligatorio"),
    client: yup.string().required("Campo obligatorio"),
    status: yup.string().required("Campo obligatorio"),
  })
  .required();

const ModalSuscription = ({ active, onClose, type }: Props) => {
  const { data } = useUserQuery();

  // Llamar a ambos hooks para cumplir con la regla de los hooks
  const subscriptionsQuery = useSubscriptionsQuery();
  const cancellationsQuery = useCancellationsQuery();

  // Elegir el que necesitas según el tipo
  const { refetch } =
    type === "subscriptions" ? subscriptionsQuery : cancellationsQuery;

  const mutationSubscription = useMutationSubscription();
  const mutationCancellations = useMutationCancellations();

  // Elegir la mutación según el tipo
  const { mutateAsync, isLoading } =
    type === "subscriptions" ? mutationSubscription : mutationCancellations;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InputsSubscription>({
    resolver: yupResolver<InputsSubscription>(schema),
  });

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<InputsSubscription> = async (data) => {
    try {
      await mutateAsync({
        ...data,
        price: Number(data.price),
        quantityProducts: Number(data.quantityProducts),
        client: Number(data.client),
        date: formatDateText(data.date),
        subscriptionId: "0",
      });
      refetch();
      reset();
      toast.success("Suscripción creada exitosamente");
      onClose();
    } catch (error: any) {
      const { message } = error.response.data;
      if (message === "The user already has an active subscription") {
        toast.error("El cliente ya tiene una suscripción");
      } else {
        toast.error("Error inesperado");
      }
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
            <h1 className="mb-2 font-bold">
              {type === "subscriptions" ? "Sucripción" : "Cancelación"}{" "}
            </h1>
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
                <SelectTrigger className="focus:ring-1 focus:ring-blue-600 p-5">
                  {watch("type") ? (
                    <SelectValue />
                  ) : (
                    <span className="text-[#9ca3af]">Selecciona el tipo</span>
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

              <p className="text-left text-xs text-red-600 mt-1">
                {errors.type?.message && !watch("type") && errors.type?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label id="status" className="text-sm">
                Estado
              </label>
              <Select onValueChange={(value) => setValue("status", value)}>
                <SelectTrigger className="focus:ring-1 focus:ring-blue-600 p-5">
                  {watch("status") ? (
                    <SelectValue />
                  ) : (
                    <span className="text-[#9ca3af]">Selecciona un estado</span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pause">Pausa</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="text-left text-xs text-red-600 mt-1">
                {errors.type?.message && !watch("type") && errors.type?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label id="quantityProducts" className="text-sm">
                Cantidad de productos
              </label>
              <Input
                id="quantityProducts"
                type="number"
                placeholder="100"
                {...register("quantityProducts")}
              />
              <p className="text-left text-xs text-red-600 mt-1">
                {errors.price?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label id="client" className="text-sm">
                Cliente
              </label>
              <Select onValueChange={(value) => setValue("client", value)}>
                <SelectTrigger className="focus:ring-1 focus:ring-blue-600 p-5">
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
                    {data?.map((client) => (
                      <SelectItem key={client.id} value={client.id + ""}>
                        {client.username + " - " + client.lastname}
                      </SelectItem>
                    ))}
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
                disabled={isLoading}
              >
                {isLoading ? <div className="spiner" /> : "Crear sucripción"}
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  );
};

export default ModalSuscription;
