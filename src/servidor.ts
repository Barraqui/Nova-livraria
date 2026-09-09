import express from "express";
import { atualizarLivro, buscarLivrosPorId, cadastrarLivro, listarLivros, removerLivro } from "../modules/livros.ts";
import { devolverLivro, emprestarLivro } from "../modules/emprestimos.ts";
const app = express();

app.use(express.json());

app.get("/livros", async (requisicao, resposta) => {
    const livros = await listarLivros();
    resposta.json(livros);
});

app.get("/livros/:id", async (requisicao, resposta) => {
    const id = Number(requisicao.params.id);
    const livro = await buscarLivrosPorId(id);

    if(!livro) {
        resposta.status(404).json({erro: "Livro não encontrado"});
        return;
    }

    resposta.json(livro);
});

app.post("/livros", async (requisicao, resposta) => {
    const dadosDoLivro = requisicao.body;

    try {
        const livroCriado = await cadastrarLivro(dadosDoLivro);
        resposta.status(201).json(livroCriado);
    } catch (erro) {
        resposta.status(400).json({ erro: erro instanceof Error ? erro.message : "Erro ao cadastrar"});
    }
});

app.delete("/livros/:id", async (requisicao, resposta) => {
    const id = Number(requisicao.params.id);

    const livro = await buscarLivrosPorId(id);
        if(!livro) {
        resposta.status(404).json({erro: "Livro não encontrado"});
        return;
    }

    await removerLivro(id);
    resposta.status(200).json({mensagem: "livro deletado com sucesso"});
});

app.put("/livros/:id", async (requisicao, resposta) => {
    const id = Number(requisicao.params.id);
    const dadosLivro = requisicao.body;

    const livro = await buscarLivrosPorId(id);
    if(!livro) {
        resposta.status(404).json({erro: "Livro não encontrado"});
        return;
    }
    
    try {
        const livroAtualizar = await atualizarLivro(id, dadosLivro);
        resposta.status(200).json(livroAtualizar);
    } catch (erro) {
        resposta.status(400).json({ erro: erro instanceof Error ? erro.message : "Erro ao atualizar"});
    }
});

app.post("/livros/:id/emprestimo", async (requisicao, resposta) => {
    const id = Number(requisicao.params.id);

    try {
        const livroEmprestado = await emprestarLivro(id);
        resposta.status(200).json(livroEmprestado);
    } catch (erro) {
        resposta.status(400).json({ erro: erro instanceof Error ? erro.message : "Erro ao emprestar"})
    }
});

app.post("/livros/:id/devolucao", async (requisicao, resposta) => {
    const id = Number(requisicao.params.id);

    try {
        const livroDevolucao = await devolverLivro(id);
        resposta.status(200).json(livroDevolucao);
    } catch (erro) {
        resposta.status(400).json({ erro: erro instanceof Error ? erro.message : "Erro ao devolver o livro"});
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});