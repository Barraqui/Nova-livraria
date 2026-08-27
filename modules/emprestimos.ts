import { atualizarLivro, buscarLivrosPorId } from "./livros.ts";
import type { Livro } from "./types.ts";

export async function emprestarLivro(id: number): Promise<Livro[]> {
    const livro = await buscarLivrosPorId(id);

    if(!livro) {
        throw new Error("Livro não encontrado");
    }

    if(livro.quantidade <= 0) {
        throw new Error("Livro sem exemplares disponíveis para empréstimo");
    }

    const novaQuantidade = livro.quantidade - 1;
    const status = novaQuantidade > 0 ? "disponivel" : "sem estoque";

    const livrosAtualizados = await atualizarLivro(id, {
        quantidade: novaQuantidade,
        status: status,
    });

    return livrosAtualizados
}

export async function devolverLivro(id: number): Promise<Livro[]> {
    const livro = await buscarLivrosPorId(id);
    if(!livro) {
        throw new Error("Livro não encontrado");
    }
    
    const novaQuantidade = livro.quantidade + 1;

    const livrosAtualizados = await atualizarLivro(id, {
        quantidade: novaQuantidade,
        status: "disponivel"
    });
    
    return livrosAtualizados;
}