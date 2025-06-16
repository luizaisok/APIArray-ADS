let tarefas = [
    {id: 1, titulo: "Estudar Node.js", descricao: "Revisar conteúdo da aula", data: "2025-06-15", status: "pendente"},
    {id: 2, titulo: "Comprar pão", descricao: "Ir na padaria", data: "2025-06-16", status: "feito"}
];

function getTarefas() {
    return tarefas;
};

let ultimoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id : 0;

function insertTarefa(titulo, descricao, data, status) {
    if (titulo && descricao && data && status) {
        ultimoId++;
        const novaTarefa = { id: ultimoId, titulo, descricao, data, status };
        tarefas.push(novaTarefa);
        console.log("Tarefa inserida:", novaTarefa);
        return true;
    }
    console.error("Erro ao inserir tarefa. Faltou algum valor.");
    return false;
}

function updateTarefa(id, titulo, descricao, data, status) {
    const index = tarefas.findIndex(t => t.id == id);
    if (index !== -1) {
        tarefas[index] = {id, titulo, descricao, data, status};
        console.log("Tarefa atualizada:", tarefas[index]);
        return true;
    };
    console.error("Tarefa não encontrada para atualizar.");
    return false;
};

function deleteTarefa(id) {
    const index = tarefas.findIndex(t => t.id == id);
    if (index !== -1) {
        const removida = tarefas.splice(index, 1);
        console.log("Tarefa removida:", removida);
        return true;
    };
    console.error("Tarefa não encontrada para deletar.");
    return false;
};

function buscarTarefaPorId(id) {
    return tarefas.find(t => t.id == id);
};

module.exports = {getTarefas, insertTarefa, updateTarefa, deleteTarefa, buscarTarefaPorId};