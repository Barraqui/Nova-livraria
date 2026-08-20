import { carregarLivros, gerarNovoId, salvarLivros } from "./funcoes_internas.js";
import { validarLivro } from "./validacao.js";

export async function listarLivros() {
  return await carregarLivros();
}

export async function buscarLivrosPorId(id) {
    const livrosCarregados = await carregarLivros();
    const livroEncontrado = livrosCarregados.find((livro) => livro.id === id);
    return livroEncontrado;
}

export async function buscarLivrosPorCategoria(categoria) {
    const livrosCarregados = await carregarLivros();
    const livrosEncontrado = livrosCarregados.filter((livro) => livro.categoria === categoria);
    return livrosEncontrado;
}

export async function cadastrarLivro(livro) {
    validarLivro(livro);
    
    const livrosCarregados = await carregarLivros();
    const novoId = gerarNovoId(livrosCarregados);
    const novoLivro = 
    {
        id: novoId, 
        titulo: livro.titulo,
        autor: livro.autor,
        categoria: livro.categoria, 
        quantidade: livro.quantidade, 
        disponivel: livro.disponivel 
    }
    await salvarLivros([...livrosCarregados, novoLivro]);
    return novoLivro;
}

export async function atualizarLivro(id, dadosNovos) {
    const livrosCarregados = await carregarLivros();
    
    const livrosAtualizados = livrosCarregados.map((livro) => {
        if(livro.id === id) {
            return {...livro, ... dadosNovos};
        }
        return livro;
    });
    await salvarLivros(livrosAtualizados);
    return livrosAtualizados;
}

export async function removerLivro(id) {
    const livrosCarregados = await carregarLivros();

    const livrosRestantes = livrosCarregados.filter((livro) => livro.id !== id);

    await salvarLivros(livrosRestantes);
    return livrosRestantes;
}

export async function buscarLivrosPorTitulo(titulo) {
    const livrosCarregados = await carregarLivros();
    const livrosEncontrados = livrosCarregados.filter((livro) =>
        livro.titulo.toLowerCase().includes(titulo.toLowerCase())
    );

    return livrosEncontrados;
}