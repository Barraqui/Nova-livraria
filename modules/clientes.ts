import { prisma } from "../src/prisma.ts";

export async function listarClientes() {
    return await prisma.cliente.findMany();
}

export async function criarCliente(dados: {nome: string; email: string; telefone: string; endereco: string;}) {
    return await prisma.cliente.create({data: dados});
}