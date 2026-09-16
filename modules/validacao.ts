export function validarLivro(livro: { titulo: string; autor: string; categoria: string; quantidadeTotal: number; }): void {
    if(!livro.titulo || livro.titulo.trim() === "") {
        throw new Error("Título é obrigatório");
    }

    if(!livro.autor || livro.autor.trim() === "") {
        throw new Error("O autor é obrigatório");
    }

    if(!livro.categoria || livro.categoria.trim() === "") {
        throw new Error("A categoria é obrigatória");
    }

    if(livro.quantidadeTotal < 0) {
        throw new Error("A quantidade não pode ser negativa");
    }
}