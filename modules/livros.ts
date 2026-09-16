import type { Livro, StatusLivro } from "./types.ts";
import { prisma } from "../src/prisma.ts"

export async function listarLivros() {
  return await prisma.livro.findMany();
}

export async function buscarLivrosPorId(id: number) {
    return await prisma.livro.findUnique({ where: {id: id}});
}

export async function buscarLivrosPorCategoria(categoria: string){
    return await prisma.livro.findMany({where: {categoria: categoria}});
}

export async function cadastrarLivro(dados: {titulo: string; autor: string; categoria: string; quantidadeTotal: number;}) {
    return await prisma.livro.create({ data: dados })
}

export async function atualizarLivro(id: number, dadosNovos: {
    titulo?: string;
    autor?: string;
    categoria?: string;
    quantidadeTotal?: number;
}) {
    return await prisma.livro.update({where: { id: id }, data: dadosNovos});
}

export async function removerLivro(id: number) {
    return await prisma.livro.delete({
        where: { id: id},
    });
}

export async function buscarLivrosPorTitulo(titulo: string) {
    return await prisma.livro.findMany({ where: {titulo: {contains: titulo, mode: "insensitive"}}});
}

export function calcularStatus(livro: Livro): StatusLivro {
    const disponivel = livro.quantidadeTotal - livro.quantidadeEmprestada;
    return disponivel > 0 ? "disponivel" : "sem estoque";
}