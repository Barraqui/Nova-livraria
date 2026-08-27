import { readFile, writeFile } from "fs/promises";
import type { Livro } from "./types.ts";

export async function carregarLivros(): Promise<Livro[]> {
    const texto = await readFile("./Json/livros.json", "utf-8");
    return JSON.parse(texto);
}

export function gerarNovoId(livros: Livro[]): number {
    const maiorId = livros.reduce((acc, livro) => Math.max(acc, livro.id), 0);
    return maiorId + 1;
}

export async function salvarLivros(livros: Livro[]): Promise<void> {
    await writeFile("./Json/livros.json", JSON.stringify(livros, null, 2));
}

