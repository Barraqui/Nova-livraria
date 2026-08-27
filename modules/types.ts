export type StatusLivro = "disponivel" | "emprestado" | "reservado" | "sem estoque";

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  quantidade: number;
  status: StatusLivro;
  ativo: boolean;
}