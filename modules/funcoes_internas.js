import { readFile, writeFile } from "fs/promises";

export async function carregarLivros() {
    const texto = await readFile("./Json/livros.json", "utf-8");
    return JSON.parse(texto);
}

export function gerarNovoId(livros) {
    const maiorId = livros.reduce((acc, livro) => Math.max(acc, livro.id), 0);
    return maiorId + 1;
}

export async function salvarLivros(livros) {
    await writeFile("./Json/livros.json", JSON.stringify(livros, null, 2));
}

