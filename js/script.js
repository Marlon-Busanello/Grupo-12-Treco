

function mostrarOpcoesCores() { /*Botao de mostra paleta */
var opcoesCores = document.getElementById("opcoesCores");
var mostrarCores = document.getElementById("mostrarCores");
if (opcoesCores.style.display === "block") {
    opcoesCores.style.display = "none";
    mostrarCores.style.display = "block";
} else {
    opcoesCores.style.display = "block";
    mostrarCores.style.display = "none";
}
}


function mudarCorFundo(cor) { /*Salva cor de fundo */
document.body.style.backgroundColor = cor;
localStorage.setItem("corFundo", cor);
mostrarOpcoesCores();
}

function adicionarTarefa(coluna) { /*  Funcao para criar tarefas */
var taskName = document.getElementById(`taskName${coluna}`).value;

if (taskName) {
    var taskElement = document.createElement("div");
    taskElement.className = "tarefa";
    taskElement.draggable = true;
    taskElement.ondragstart = function (event) {
        event.dataTransfer.setData("text/plain", event.target.getAttribute("data-task-id"));
    };

    var taskId = gerarId();
    taskElement.setAttribute("data-task-id", taskId);

    
    var tituloDiv = document.createElement("nav"); 
    tituloDiv.className = "tituloTarefas";
    taskElement.appendChild(tituloDiv);

    var nomeElement = document.createElement("h3");
    nomeElement.textContent = taskName;
    tituloDiv.appendChild(nomeElement);

    var descricaoElement = document.createElement("textarea");
    descricaoElement.className = "tarefa-textarea";
    descricaoElement.placeholder = "Descrição da tarefa";
    taskElement.appendChild(descricaoElement);

    var excluirButton = document.createElement("button");
    excluirButton.className = "botaoExcluir";
    excluirButton.textContent = "x";
    excluirButton.addEventListener("click", function () {
        if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
            taskElement.remove();
            salvarTarefas(coluna);
        }
    });
    taskElement.appendChild(excluirButton);

    document.getElementById(`listaDeTarefas${coluna}`).appendChild(taskElement);

    document.getElementById(`taskName${coluna}`).value = '';

    
    salvarTarefas(coluna);
}
}

function gerarId() { /*Funcao para gerar o id  das tarefas  */
return Math.floor(Math.random() * 1000000);
}

function salvarTarefas(coluna) { /*Funcao para salva as tarefas em suas colunas  */
const tarefas = document.querySelectorAll(`#listaDeTarefas${coluna} .tarefa`);
const tarefasData = Array.from(tarefas).map(tarefa => ({
    id: tarefa.getAttribute("data-task-id"),
    nome: tarefa.querySelector('h3').textContent,
    descricao: tarefa.querySelector('textarea').value
}));
localStorage.setItem(`tarefas${coluna}`, JSON.stringify(tarefasData));
}

for (let coluna = 1; coluna <= 3; coluna++) { /* Funcao para dedectar acoes na caixa de descricao*/
document.getElementById(`listaDeTarefas${coluna}`).addEventListener("input", function (event) {
    if (event.target && event.target.matches(".tarefa-textarea")) {
        salvarTarefas(coluna);
    }
});
}


function carregarTarefasSalvas(coluna) { /* Funcao de carregar tarefas criadas anteriormente  */
const tarefasData = JSON.parse(localStorage.getItem(`tarefas${coluna}`)) || [];

// Verifique se as tarefas já foram carregadas para evitar duplicações
const listaDeTarefas = document.getElementById(`listaDeTarefas${coluna}`);
if (listaDeTarefas.childElementCount === 0) {
    tarefasData.forEach(tarefa => {
        var taskElement = document.createElement("div");
        taskElement.className = "tarefa";
        taskElement.setAttribute("data-task-id", tarefa.id);
        taskElement.draggable = true;
        taskElement.ondragstart = function (event) {
            event.dataTransfer.setData("text/plain", event.target.getAttribute("data-task-id"));
        };
        var tituloNav = document.createElement("nav");
        tituloNav.className = "tituloTarefas";
        taskElement.appendChild(tituloNav);

        var nomeElement = document.createElement("h3");
        nomeElement.textContent = tarefa.nome;
        tituloNav.appendChild(nomeElement);

        var descricaoElement = document.createElement("textarea");
        descricaoElement.className = "tarefa-textarea";
        descricaoElement.placeholder = "Descrição da tarefa";
        descricaoElement.value = tarefa.descricao;
        taskElement.appendChild(descricaoElement);

        var excluirButton = document.createElement("button");
        excluirButton.className = "botaoExcluir";
        excluirButton.textContent = "X";
        excluirButton.addEventListener("click", function () {
            if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
                taskElement.remove();
                salvarTarefas(coluna);
            }
        });
        taskElement.appendChild(excluirButton);

        listaDeTarefas.appendChild(taskElement);
    });
}

// Carregar a cor de fundo
const corFundo = localStorage.getItem("corFundo");
if (corFundo) {
    document.body.style.backgroundColor = corFundo;
}
}


window.addEventListener('load', function () { /*Chama carregar tarefas e carrega cor bg */
for (let coluna = 1; coluna <= 3; coluna++) {
    carregarTarefasSalvas(coluna);
}

// Carregar a cor de fundo
const corFundo = localStorage.getItem("corFundo");
if (corFundo) {
    document.body.style.backgroundColor = corFundo;
}

// Carregar a cor da tarefa
const corTarefa = localStorage.getItem("corTarefa");
if (corTarefa) {
    document.querySelectorAll(".titulo-tarefa").forEach(function (nav) {
        nav.style.backgroundColor = corTarefa;
    });
}
});


function permitirSoltar(event) {/* Funcao para mover tarefas */
event.preventDefault();
}


function soltarTarefa(event, coluna) { /* Funcao para larga tarefa  */
event.preventDefault();
var data = event.dataTransfer.getData("text/plain");
var tarefa = document.querySelector(`.tarefa[data-task-id="${data}"]`);
if (tarefa) {
    var colunaAnterior = tarefa.parentElement.id.match(/\d+/)[0];
    
    document.getElementById(`listaDeTarefas${coluna}`).appendChild(tarefa);
    salvarTarefas(coluna);
    salvarTarefas(colunaAnterior);
   
}
}



