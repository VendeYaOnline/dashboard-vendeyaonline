"use client";

import { useMutationLoginUser } from "@/api/mutation";
import { Button, Card } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(false);
  const { mutateAsync, isLoading } = useMutationLoginUser();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (values.email && values.password) {
        const user = await mutateAsync(values);
        const { token } = user.data;
        localStorage.setItem("token_vendeyaonline", token);
        setIsError(false);
        setValues({ email: "", password: "" });
        toast.success("Acceso concedido");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setIsError(true);
      }
    } catch (e: any) {
      if (e.response?.data) {
        const { error } = e.response.data;
        if (error === "Incorrect password or email") {
          toast.error("Contraseña o correo electrónico incorrecto");
        }
      } else {
        toast.error("Error con el servidor");
      }
    }
  };

  return (
    <section className="p-3 absolute left-0 right-0 top-0 h-full bg-white flex justify-center items-center">
      <Card className="w-[500px] sm:max-w-full mt-5 p-5 relative">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold"> Iniciar sesión</h1>
          <div className="mt-10">
            <label className="text-slate-500">Correo electrónico</label>
            <Input
              type="text"
              name="email"
              value={values.email}
              placeholder="yosip@gmail.com"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="mt-5">
            <label className="text-slate-500">Contraseña</label>
            <Input
              type="password"
              name="password"
              value={values.password}
              placeholder="***"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          {isError && (
            <span className="text-xs text-red-700 mt-3 block">
              Llena todos los campos
            </span>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full bottom-5 text-lg mt-10 "
          >
            {isLoading ? <div className="spiner" /> : "Iniciar sesión"}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Login;
