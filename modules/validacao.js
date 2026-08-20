export function validarLivro(livro) {
    if(!livro.titulo || livro.titulo.trim() === "") {
        throw new Error("Título é obrigatório");
    }

    if(!livro.autor || livro.autor.trim() === "") {
        throw new Error("O autor é obrigatório");
    }

    if(!livro.categoria || livro.categoria.trim() === "") {
        throw new Error("A categoria é obrigatória");
    }

    if(livro.quantidade < 0) {
        throw new Error("A quantidade não pode ser negativa");
    }
}