import { atualizarLivro, buscarLivrosPorId } from "./livros.ts";
import type { Livro } from "../src/generated/prisma/client.ts";

export async function emprestarLivro(id: number): Promise<Livro> {
    const livro = await buscarLivrosPorId(id);

    if(!livro) {
        throw new Error("Livro não encontrado");
    }

    const disponivel = livro.quantidadeTotal - livro.quantidadeEmprestada;
    if(disponivel <= 0) {
        throw new Error("Livro sem exemplares disponíveis para empréstimo");
    }

    const livrosAtualizados = await atualizarLivro(id, {
        quantidadeEmprestada: livro.quantidadeEmprestada + 1,
    });

    return livrosAtualizados
}

export async function devolverLivro(id: number): Promise<Livro> {
    const livro = await buscarLivrosPorId(id);
    if(!livro) {
        throw new Error("Livro não encontrado");
    }
    if(livro.quantidadeEmprestada <= 0) {
        throw new Error("Não há exemplares emprestados para devolver");
    }
    const livrosAtualizados = await atualizarLivro(id, {
        quantidadeEmprestada: livro.quantidadeEmprestada - 1,
    });
    
    return livrosAtualizados;
}