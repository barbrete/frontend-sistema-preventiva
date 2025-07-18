export interface Usuario {
    id: number;
    nome: string;
    email: string;
    tipo: string;
}

interface Tecnico {
  id: number;
  name: string;
  email: string;
  tipo: string;
  ativo: boolean;
}

export interface Preventiva {
  id: number;
  nome: string;
  kilometragem_percorrida: number;
  irregularidades_encontradas: number;
  irregularidades_corrigidas: number;
  descricao: string;
  user_id: number;
  usuario?: Usuario;
  fotos?: Foto[];
  created_at: string;
  updated_at: string;
}

export interface Foto {
    url: string,
    tipo: string,
    preventiva_id: number,
    userId: number,
    userTipo?: string
}
