import { atualizarLivro, buscarLivrosPorId } from "./livros.js";

export async function emprestarLivro(id) {
    const livro = await buscarLivrosPorId(id);

    if(!livro) {
        throw new Error("Livro não encontrado");
    }

    if(livro.quantidade <= 0) {
        throw new Error("Livro sem exemplares disponíveis para empréstimo");
    }

    const novaQuantidade = livro.quantidade - 1;
    const disponivel = novaQuantidade > 0;

    const livrosAtualizados = await atualizarLivro(id, {
        quantidade: novaQuantidade,
        disponivel: disponivel
    });

    return livrosAtualizados
}

export async function devolverLivro(id) {
    const livro = await buscarLivrosPorId(id);
    if(!livro) {
        throw new Error("Livro não encontrado");
    }
    
    const novaQuantidade = livro.quantidade + 1;
    const disponivel = novaQuantidade > 0;

    const livrosAtualizados = await atualizarLivro(id, {
        quantidade: novaQuantidade,
        disponivel: disponivel
    });
    
    return livrosAtualizados;
}