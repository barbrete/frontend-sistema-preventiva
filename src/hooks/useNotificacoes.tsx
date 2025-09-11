import { useState, useEffect } from 'react';

interface Notificacao {
  id: string;
  mensagem: string;
  timestamp: Date;
  tipo: 'info' | 'success' | 'warning' | 'error';
}

export const useNotificacoes = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  useEffect(() => {
    const carregarNotificacoes = () => {
      const agora = new Date();
      
      setNotificacoes([
        {
          id: '1',
          mensagem: '🔧 Sistema atualizado com melhorias na interface',
          timestamp: new Date('2024-09-11T14:30:00'),
          tipo: 'info'
        },
        {
          id: '2', 
          mensagem: '🐛 Bug corrigido: Agora é possível acessar seu próprio perfil',
          timestamp: new Date('2024-09-11T14:30:00'), 
          tipo: 'success'
        },
        {
          id: '3',
          mensagem: '✨ Nova funcionalidade: Edição e exclusão de preventivas',
          timestamp: new Date('2024-09-11T14:30:00'),
          tipo: 'success'
        },
        {
          id: '4',
          mensagem: '✨ Dica: Acesse pelo computador para melhor experiência. O layout para celular está em desenvolvimento e será lançado em breve!',          
          timestamp: new Date('2024-09-11T14:30:00'),
          tipo: 'info'
        }
      ]);
    };

    carregarNotificacoes();
  }, []);

  return { notificacoes };
};