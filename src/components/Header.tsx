"Use Client" 

import { getUserInfoFromCookie } from "@/utils/Cookies";

export default function Header() {
  const userInfo = getUserInfoFromCookie();

  if (!userInfo) return null;

  return (
    <div className="max-h-xl w-full mx-auto bg-gray-300 shadow-md p-6">
      <p>Bem Vindo {userInfo.nome}!</p>
      <p>Tipo: {userInfo.tipo}</p>
      <p>Data: {userInfo.hoje}</p>
    </div>
  );
}