export function salvarAcesso() {
  const opcoes = { timeZone: "America/Sao_Paulo" };
  const agora = new Date().toLocaleString("pt-br", opcoes);
  localStorage.setItem("ultimaVisita", agora);
}

export function getUltimaVisita(): string | null {
  return localStorage.getItem("ultimaVisita");
}
