export type StatusLivro = "disponivel" | "sem estoque";

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  quantidadeTotal: number;
  quantidadeEmprestada: number,
  ativo: boolean;
}