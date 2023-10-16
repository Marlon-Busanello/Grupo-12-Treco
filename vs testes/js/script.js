/*função mudar de cor  */
    function mostrarOpcoes() {
            var opcoesDiv = document.getElementById("opcoes");
            if (opcoesDiv.style.display === "none") {
                opcoesDiv.style.display = "flex";
            } else {
                opcoesDiv.style.display = "none";
            }
        }

        function mudarCor(cor) {
            document.body.style.backgroundColor = cor;
            var opcoesDiv = document.getElementById("opcoes");
            opcoesDiv.style.display = "none";
        }

/* Função adicionar tarefa */

function adicionarTarefa(listaId, taskNameId, novaTarefaId) {
    
    var taskName = document.getElementById(taskNameId).value;
    var taskDescription = '';
    var taskElement = document.createElement("div");
    taskElement.className = "tarefa";
    var nomeElement = document.createElement("h3");
    nomeElement.textContent = taskName;
    taskElement.appendChild(nomeElement);
    var descricaoElement = document.createElement("textarea");
    descricaoElement.placeholder = "Descrição da tarefa";
    taskElement.appendChild(descricaoElement);
    document.getElementById(listaId).appendChild(taskElement);
    document.getElementById(taskNameId).value = '';
    document.getElementById(novaTarefaId).style.display = "none";
}

function mostrarFormulario(novaTarefaId) {
    document.getElementById(novaTarefaId).style.display = "block";
}

document.getElementById("Add-Tarefa-Fazer").addEventListener("click", function () {
    mostrarFormulario("Nova-Tarefa-Fazer");
});

document.getElementById("Add-Tarefa-Fazendo").addEventListener("click", function () {
    mostrarFormulario("Nova-Tarefa-Fazendo");
});

document.getElementById("Add-Tarefa-Concluido").addEventListener("click", function () {
    mostrarFormulario("Novas-Tarefas_Concluida");
});