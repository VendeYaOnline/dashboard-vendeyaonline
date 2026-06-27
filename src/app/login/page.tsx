"use client";

import { useMutationLoginUser } from "@/api/mutation";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "/public/logo.svg";
import { Lock, Mail } from "lucide-react";

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
        }, 1500);
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
    <div className="absolute inset-0 flex min-h-full bg-slate-50">
      {/* Panel izquierdo decorativo */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-600/20 rounded-full filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-2xl" />
        </div>

        <div className="relative text-center text-white max-w-xs">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20 shadow-2xl">
            <Image src={Logo} width={44} height={44} alt="logo" />
          </div>
          <h1 className="text-3xl font-bold mb-3 tracking-tight">
            VendeYaOnline
          </h1>
          <p className="text-indigo-300 text-base leading-relaxed">
            Panel de administración para gestionar suscripciones, usuarios y más
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { label: "Suscripciones", icon: "💳" },
              { label: "Usuarios", icon: "👥" },
              { label: "Formularios", icon: "📋" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/8 rounded-2xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs text-indigo-300 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Logo móvil */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Image src={Logo} width={24} height={24} alt="logo" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              VendeYaOnline
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 fade-in">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Bienvenido
              </h2>
              <p className="text-slate-500 mt-1.5 text-sm">
                Ingresa tus credenciales para acceder al panel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="correo@ejemplo.com"
                    className="pl-10 h-11 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 text-slate-800"
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  <Input
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="••••••••"
                    className="pl-10 h-11 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 text-slate-800"
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                  />
                </div>
              </div>

              {isError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                  Por favor completa todos los campos antes de continuar
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spiner" />
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
