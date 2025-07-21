export function salvarHorario(chave: string) {
  const opcoes = { timeZone: "America/Sao_Paulo" };
  const agora = new Date().toLocaleString("pt-br", opcoes);
  localStorage.setItem(chave, agora);
}

export function getHorario(chave: string): string | null {
  return localStorage.getItem(chave);
}