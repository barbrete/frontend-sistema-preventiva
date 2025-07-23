"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsuario } from "@/services/auth";
import LoadingOverlay from "@/components/Loading";

interface AuthProps {
  children: React.ReactNode;
  apenasAdmin?: boolean;
  apenasUsuario?: boolean;
}

export default function Auth({ children, apenasAdmin, apenasUsuario }: AuthProps) {
  const [status, setStatus] = useState<"loading" | "logged_out" | "admin" | "usuario">("loading");
  const router = useRouter();

     useEffect(() => {
    getUsuario()
      .then((res: any) => {
        if (!res || !res.usuario) {
          setStatus("logged_out");
          router.replace("/login");
        } else if (res.usuario.tipo === "ADMIN") {
          setStatus("admin");
        } else {
          setStatus("usuario");
          // Usuário comum é bloqueado se a página for apenas para admin
          if (apenasAdmin) {
            router.replace("/acesso_negado");
          }
        }
      })
      .catch(() => {
        setStatus("logged_out");
        router.replace("/login");
      });
  }, [apenasAdmin, apenasUsuario, router]);

  if (status === "loading") return <LoadingOverlay show={true} text="Carregando..." />;
  if (status === "logged_out") return null;


  return <>{children}</>;
}