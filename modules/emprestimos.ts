import { atualizarLivro, buscarLivrosPorId } from "./livros.ts";
import type { Livro } from "../src/generated/prisma/client.ts";
import { prisma } from "../src/prisma.ts";

export async function emprestarLivro( livroId: number, clienteId: number){
    const livro = await buscarLivrosPorId(livroId);

    if(!livro) {
        throw new Error("Livro não encontrado");
    }

    const disponivel = livro.quantidadeTotal - livro.quantidadeEmprestada;
    if(disponivel <= 0) {
        throw new Error("Livro sem exemplares disponíveis para empréstimo");
    }

    const emprestimo = await prisma.emprestimos.create({
        data: { livroId: livroId, clienteId: clienteId }
    });

    await atualizarLivro(livroId, {
        quantidadeEmprestada: livro.quantidadeEmprestada + 1,
    });

    return emprestimo
}

export async function devolverLivro(livroId: number, clienteId: number) {
    const emprestimo = await prisma.emprestimos.findFirst({ 
        where: {
            livroId: livroId, 
            clienteId: clienteId, 
            dataDevolucao: null
        }
    });

    if(!emprestimo) {
        throw new Error("Não há empréstimo em aberto desse cliente para esse livro");
    }

    const emprestimoAtualizado = await prisma.emprestimos.update({
        where: { id: emprestimo.id },
        data: {dataDevolucao: new Date()}
    })

    const livro = await buscarLivrosPorId(livroId);

    if(livro) {
        await atualizarLivro(livroId, {
            quantidadeEmprestada: livro.quantidadeEmprestada - 1,
        });
    }

    return emprestimoAtualizado;
}