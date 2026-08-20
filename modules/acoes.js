import { devolverLivro, emprestarLivro } from "./emprestimos.js";
import { atualizarLivro, buscarLivrosPorCategoria, buscarLivrosPorId, buscarLivrosPorTitulo, cadastrarLivro, listarLivros, removerLivro } from "./livros.js";

export async function acaoListar() {
    const livros = await listarLivros();
    console.log(livros);
}

export async function acaoBuscarPorId(rl) {
    const idDigitado = await rl.question("Digite o ID do livro\n");
    const id = Number(idDigitado);
    const livro = await buscarLivrosPorId(id);
    console.log(livro ?? "Livro não encontrado");
}

export async function acaoBuscarPorCategoria(rl) {
    const categoria = await rl.question("Digite a categoria\n");
    const livros = await buscarLivrosPorCategoria(categoria);
    if (livros.length > 0) {
      console.log(livros);
    } else {
      console.log("Nenhum livro encontrado com essa categoria");
    }   
}

export async function acaoBuscarPorTitulo(rl) {
    const titulo = await rl.question("Digite o título desejado\n");
    const livros = await buscarLivrosPorTitulo(titulo);
    console.log(livros ?? "Nenhum livro encontrado");
}

export async function acaoCadastrarNovoLivro(rl) {
    const titulo = await rl.question("Título: ");
    const autor = await rl.question("Autor: ");
    const categoria = await rl.question("Categoria: ");
    const quantidadeDigitada = await rl.question("Quantidade: ");
    const quantidade = Number(quantidadeDigitada);
    
    const novoLivro = {
        titulo,
        autor,
        categoria,
        quantidade,
        disponivel: quantidade > 0,
    };

    const livroCriado = await cadastrarLivro(novoLivro);
    console.log("Livro cadastrado: ", livroCriado);
}

export async function acaoAtualizarLivro(rl) {
   const idDigitado = await rl.question("Digite o ID do livro que deseja atualizar: ");
   const id = Number(idDigitado);

   const livro = await buscarLivrosPorId(id);
   if(!livro) {
    console.log("Livro não encontrado");    
    return;
   }

   console.log("Dados atuais", livro);
   console.log("Deixe em banco (Enter) para manter o valor atual.");

   const novoTitulo = await rl.question(`Título (${livro.titulo}): `);
   const novoAutor = await rl.question(`Autor (${livro.autor}): `);
   const novaCategoria = await rl.question(`Categoria (${livro.categoria}): `);
   const novaQuantidadeDigitada = await rl.question(`Quantidade (${livro.quantidade}): `);

   const dadosNovos = {};
   if(novoTitulo.trim() !== "") dadosNovos.titulo = novoTitulo;
   if(novoAutor.trim() !== "") dadosNovos.autor = novoAutor;
   if(novaCategoria.trim() !== "") dadosNovos.categoria = novaCategoria;
   if(novaQuantidadeDigitada.trim() !== "") dadosNovos.quantidade = Number(novaQuantidadeDigitada);

   const livrosAtualizados = await atualizarLivro(id, dadosNovos);
   console.log("Livro atualizado: ", livrosAtualizados);
}

export async function acaoRemoverLivro(rl) {
    const idDigitado = await rl.question("Informe o ID desejado: ");
    const id = Number(idDigitado);

    const livrosRestantes = await removerLivro(id);
    console.log("Livro removido. Livros restantes:", livrosRestantes);
}

export async function acaoEmprestarLivro(rl) {
    const idDigitado = await rl.question("Informe o ID do livro: ");
    const id = Number(idDigitado);

    const livrosAtualizados = await emprestarLivro(id);
    console.log("Empréstimo realizado:", livrosAtualizados);
}

export async function acaoDevolverLivro(rl) {
    const idDigitado = await rl.question("Informe o ID do livro: ");
    const id = Number(idDigitado);

    const livrosAtualizados = await devolverLivro(id);
    console.log("Devolução realizada:", livrosAtualizados);
}