import Cookies from "js-cookie";

export function getUserInfoFromCookie() {
  const userCookie = Cookies.get("usuario");
  if (!userCookie) return null;

  try {
    const decoded = decodeURIComponent(userCookie);
    const user = JSON.parse(decoded);    
    const { nome, email, tipo } = user;
    const hoje = new Date().toLocaleDateString("pt-BR");
    return { nome, email, tipo, hoje };
  } catch {
    return null;
  }
}