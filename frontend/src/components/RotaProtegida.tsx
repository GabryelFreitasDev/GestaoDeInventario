import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import validateToken from "@/utils/validateToken";

export function RotaProtegida() {
  const [estaAutenticado, setEstaAutenticado] = useState<boolean | null>(null);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      const valido = await validateToken();
      setEstaAutenticado(valido);
    };

    verificarAutenticacao(); 
  }, []);

  if (estaAutenticado === null) {
    return <p>Carregando...</p>;
  }

  if (!estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; 
}
