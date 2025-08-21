//o back está retornando nome na rota get /auth/usuario e name nos outros gets
export interface Usuario {
    id: number;
    nome: string;
    email: string;
    tipo: string;
}

export interface Tecnico {
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
  usuario?: Tecnico;
  fotos?: Foto[];
  created_at: string;
  updated_at: string;
  tipo: string;
}

export interface Foto {
    id: number,
    url: string,
    tipo: string,
    preventiva_id: number,
    descricao?: string,
    user_id: number,
    userTipo?: string
}
