import { carregarLivros, gerarNovoId, salvarLivros } from "./funcoes_internas.ts";
import { validarLivro } from "./validacao.ts";
import type { Livro } from "./types.ts";

export async function listarLivros(): Promise<Livro[]> {
  return await carregarLivros();
}

export async function buscarLivrosPorId(id: number): Promise<Livro | undefined> {
    const livrosCarregados = await carregarLivros();
    const livroEncontrado = livrosCarregados.find((livro) => livro.id === id);
    return livroEncontrado;
}

export async function buscarLivrosPorCategoria(categoria: string): Promise<Livro[]> {
    const livrosCarregados = await carregarLivros();
    const livrosEncontrado = livrosCarregados.filter((livro) => livro.categoria === categoria);
    return livrosEncontrado;
}

export async function cadastrarLivro(livro: Livro): Promise<Livro> {
    validarLivro(livro);
    
    const livrosCarregados = await carregarLivros();
    const novoId = gerarNovoId(livrosCarregados);
    const novoLivro = 
    {
        id: novoId, 
        titulo: livro.titulo,
        autor: livro.autor,
        categoria: livro.categoria, 
        quantidade: livro.quantidade, 
        status: livro.status,
        ativo: livro.quantidade > 0
    }
    await salvarLivros([...livrosCarregados, novoLivro]);
    return novoLivro;
}

export async function atualizarLivro(id: number, dadosNovos: Partial<Livro>): Promise<Livro[]> {
    const livrosCarregados = await carregarLivros();
    
    const livrosAtualizados = livrosCarregados.map((livro) => {
        if(livro.id === id) {
            return {...livro, ... dadosNovos};
        }
        return livro;
    });
    await salvarLivros(livrosAtualizados);
    return livrosAtualizados;
}

export async function removerLivro(id: number): Promise<Livro[]> {
    const livrosCarregados = await carregarLivros();

    const livrosRestantes = livrosCarregados.filter((livro) => livro.id !== id);

    await salvarLivros(livrosRestantes);
    return livrosRestantes;
}

export async function buscarLivrosPorTitulo(titulo: string): Promise<Livro[]> {
    const livrosCarregados = await carregarLivros();
    const livrosEncontrados = livrosCarregados.filter((livro) =>
        livro.titulo.toLowerCase().includes(titulo.toLowerCase())
    );

    return livrosEncontrados;
}