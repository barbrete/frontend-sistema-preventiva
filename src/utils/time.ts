export const formatarTempoRelativo = (timestamp: Date): string => {
  const agora = new Date();
  const diferenca = agora.getTime() - timestamp.getTime();
  
  const minutos = Math.floor(diferenca / (1000 * 60));
  const horas = Math.floor(diferenca / (1000 * 60 * 60));
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  
  if (minutos < 1) return 'Agora mesmo';
  if (minutos < 60) return `Há ${minutos} minuto${minutos > 1 ? 's' : ''}`;
  if (horas < 24) return `Há ${horas} hora${horas > 1 ? 's' : ''}`;
  if (dias < 7) return `Há ${dias} dia${dias > 1 ? 's' : ''}`;
  
  // Para mais de uma semana, mostrar data formatada
  return timestamp.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatarDataCompleta = (timestamp: Date): string => {
  return timestamp.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};