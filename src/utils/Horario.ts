export function salvarHorario(chave: string) {
  const opcoes = { timeZone: "America/Sao_Paulo" };
  const agora = new Date().toLocaleString("pt-br", opcoes);
  if (typeof window !== "undefined") {
    localStorage.setItem(chave, agora);
  }
}

export function getHorario(chave: string): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(chave);
  }
  return null;
}
