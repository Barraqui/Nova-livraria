import * as readlinePromises from "node:readline/promises";
import { acaoAtualizarLivro, acaoBuscarPorCategoria, acaoBuscarPorId, acaoBuscarPorTitulo, acaoCadastrarNovoLivro, acaoDevolverLivro, acaoEmprestarLivro, acaoListar, acaoRemoverLivro } from "./modules/acoes.ts";

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let continuar = true;

while (continuar) {
  const opcao = await rl.question(
    "\nO que deseja fazer?\n" +
      "1 - Listar todos os livros\n" +
      "2 - Buscar livro por ID\n" +
      "3 - Buscar livro por categoria\n" +
      "4 - Buscar livro por título\n" +
      "5 - Cadastrar novo livro\n" +
      "6 - Atualizar livro\n" +
      "7 - Remover livro\n" +
      "8 - Emprestar livro\n" +
      "9 - Devolver livro\n" +
      "0 - Sair\n> ",
  );

  try {
    switch (opcao) {
      case "1":
        await acaoListar();
        break;
      case "2":
        await acaoBuscarPorId(rl);
        break;
      case "3":
        await acaoBuscarPorCategoria(rl);
        break;
      case "4":
        await acaoBuscarPorTitulo(rl);
        break;
      case "5":
        await acaoCadastrarNovoLivro(rl);
        break;
      case "6":
        await acaoAtualizarLivro(rl);
        break;
      case "7":
        await acaoRemoverLivro(rl);
        break;
      case "8":
        await acaoEmprestarLivro(rl);
        break;
      case "9":
        await acaoDevolverLivro(rl);
        break;
      case "0":
        continuar = false;
        break;
      default:
        console.log("Opção inválida");
    }

    if (opcao !== "0") {
      await rl.question("\nPressione Enter para continuar...");
    }
  } catch (erro) {
    console.log("Erro:", erro instanceof Error ? erro.message : erro);
    await rl.question("\nPressione Enter para continuar...");
  }
}

rl.close();
