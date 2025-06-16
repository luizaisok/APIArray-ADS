/*
[x] 1. Inicialização do Projeto NPM
[x] 2. Criar um novo projeto npm, configurar o package.json e instalar as dependências: express, body-parser, ejs.
[x] 3. Configuração Inicial do Express
[x] 4. Criar o servidor Express, configurar a porta, middlewares, body-parser e EJS.
[x] 5. Implementação do CRUD
[x] 6. Implementar as rotas GET, POST, PUT e DELETE para manipulação de uma entidade (a ser escolhida).
[x] 7. Utilizar um array em memória ou arquivos JSON para simular o banco de dados. => Array [x]
[x] 8. Estruturação em MVC
[x] 9. Dividir o projeto em pastas: models, views, controllers, e routes, organizando a lógica conforme o padrão.
[x] 10. Criação das Rotas HTML e da API REST
[x] 11. Criar páginas EJS para listar, criar, editar e excluir itens (interface).
[x] 12. Criar rotas REST (JSON) para as mesmas operações (API paralela).
*/

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { getTarefas, insertTarefa, updateTarefa, deleteTarefa, buscarTarefaPorId } = require("../models/DAO/tarefaDAO");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./src/views");

const methodOverride = require('method-override'); // Pro ??? suportar PUT e DELETE
app.use(methodOverride('_method'));

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Início e ledno

app.get("/", (req, res) => {
    res.send("Página inicial");
});

// READ
app.get("/tarefas", (req, res) => {
    const tarefas = getTarefas();
    res.render("listatarefas", { tarefasDoController: tarefas }); // tarefasDoController pode ser nomeado de qualquer coisa; é a chave.
});

// READ por API
app.get("/api/tarefas", (req, res) => {
    const tarefas = getTarefas();
    res.json({ tarefas });
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Criando

// Formulário - CREATE
app.get("/criartarefa", (req, res) => {
    res.render("formtarefa", { tarefa: {} });
});

// CREATE
app.post("/tarefa", (req, res) => {
    const {titulo, descricao, data, status} = req.body;
    const result = insertTarefa(titulo, descricao, data, status);
    if (result) {
        return res.send("Tarefa inserida com sucesso!");
    }
    return res.send("Erro ao inserir tarefa.");
});

// CREATE por API
app.post("/api/tarefa", (req, res) => {
    const { id, titulo, descricao, data, status } = req.body;
    const result = insertTarefa(Number(id), titulo, descricao, data, status);
    res.json({ success: result });
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Editando

// Formulário - UPDATE
app.get("/editartarefa/:id", (req, res) => {
    const tarefa = buscarTarefaPorId(req.params.id);
    res.render("formtarefa", { tarefa });
});

// UPDATE
app.put("/tarefa", (req, res) => {
    const { id, titulo, descricao, data, status } = req.body;
    const result = updateTarefa(Number(id), titulo, descricao, data, status);
    res.send(result ? "Tarefa atualizada com sucesso!" : "Erro ao atualizar tarefa.");
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Deletendo

// DELETE
app.delete("/tarefa/:id", (req, res) => {
    const result = deleteTarefa(req.params.id);
    res.send(result ? "Tarefa excluída com sucesso!" : "Erro ao excluir tarefa.");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
