export function salvarAcesso() {
  const agora = new Date().toISOString();
  localStorage.setItem("ultimaVisita", agora);
}

export function getUltimaVisita(): string | null {
  return localStorage.getItem("ultimaVisita");
}