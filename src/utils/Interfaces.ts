export interface Usuario {
    id: number;
    nome: string;
    email: string;
    tipo: string;
}

export interface Preventiva {
    nome: string;
    kilometragem_percorrida: number;
    irregularidades_encontradas: number;
    irregularidades_corrigidas: number;
    descricao: string;
    userId: number;
    usuario?: Usuario[];
}

export interface Foto {
    url: string,
    tipo: string,
    preventiva_id: number,
    userId: number,
    userTipo?: string
}
