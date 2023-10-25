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
}// Função para gerar um ID único
function gerarId() {
    return Math.floor(Math.random() * 1000000);
}

// Função para salvar as tarefas no armazenamento local em uma coluna específica
function salvarTarefas(coluna) {
    const tarefas = document.querySelectorAll(`#listaDeTarefas${coluna} .tarefa`);
    const tarefasData = Array.from(tarefas).map(tarefa => ({
        id: tarefa.getAttribute("data-task-id"),
        nome: tarefa.querySelector('h3').textContent,
        descricao: tarefa.querySelector('textarea').value
    }));
    localStorage.setItem(`tarefas${coluna}`, JSON.stringify(tarefasData));
}

// Função para adicionar uma tarefa em uma coluna específica
function adicionarTarefa(coluna) {
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
        var nomeElement = document.createElement("h3");
        nomeElement.className= "cabeçalho"
        nomeElement.textContent = taskName;
        taskElement.appendChild(nomeElement);

        var descricaoElement = document.createElement("textarea");
        descricaoElement.className = "tarefa-textarea";
        descricaoElement.placeholder = "Descrição da tarefa";
        taskElement.appendChild(descricaoElement);

        var excluirButton = document.createElement("button");
        excluirButton.className = "excluir-button";
        excluirButton.textContent = "Excluir";
        excluirButton.addEventListener("click", function () {
            if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
                taskElement.remove();
                salvarTarefas(coluna);
            }
        });
        taskElement.appendChild(excluirButton);

        document.getElementById(`listaDeTarefas${coluna}`).appendChild(taskElement);

        document.getElementById(`taskName${coluna}`).value = '';

        // Salvar tarefas na coluna no armazenamento local após adicionar
        salvarTarefas(coluna);
    }
}

// Adicionar um ouvinte de eventos para o campo de descrição em cada coluna
for (let coluna = 1; coluna <= 3; coluna++) {
    document.getElementById(`listaDeTarefas${coluna}`).addEventListener("input", function (event) {
        if (event.target && event.target.matches(".tarefa-textarea")) {
            salvarTarefas(coluna);
        }
    });
}

// Função para carregar tarefas salvas no armazenamento local em uma coluna específica
function carregarTarefasSalvas(coluna) {
    const tarefasData = JSON.parse(localStorage.getItem(`tarefas${coluna}`)) || [];
    tarefasData.forEach(tarefa => {
        var taskElement = document.createElement("div");
        taskElement.className = "tarefa";
        taskElement.setAttribute("data-task-id", tarefa.id);
        taskElement.draggable = true;
        taskElement.ondragstart = function (event) {
            event.dataTransfer.setData("text/plain", event.target.getAttribute("data-task-id"));
        };

        var nomeElement = document.createElement("h3");
        nomeElement.textContent = tarefa.nome;
        taskElement.appendChild(nomeElement);

        var descricaoElement = document.createElement("textarea");
        descricaoElement.className = "tarefa-textarea";
        descricaoElement.placeholder = "Descrição da tarefa";
        descricaoElement.value = tarefa.descricao;
        taskElement.appendChild(descricaoElement);

        var excluirButton = document.createElement("button");
        excluirButton.className = "excluir-button";
        excluirButton.textContent = "Excluir";
        excluirButton.addEventListener("click", function () {
            if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
                taskElement.remove();
                salvarTarefas(coluna);
            }
        });
        taskElement.appendChild(excluirButton);

        document.getElementById(`listaDeTarefas${coluna}`).appendChild(taskElement);
    });
}

// Carregar tarefas salvas em cada coluna ao carregar a página
for (let coluna = 1; coluna <= 3; coluna++) {
    carregarTarefasSalvas(coluna);
}

// Função para permitir soltar tarefas
function permitirSoltar(event) {
    event.preventDefault();
}

// Função para soltar uma tarefa em uma coluna
function soltarTarefa(event, coluna) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    var tarefa = document.querySelector(`.tarefa[data-task-id="${data}"]`);
    if (tarefa) {
        var colunaAnterior = tarefa.parentElement.id.match(/\d+/)[0];
        tarefa.querySelector(".excluir-button").remove();
        tarefa.ondragstart = null;
        document.getElementById(`listaDeTarefas${coluna}`).appendChild(tarefa);
        salvarTarefas(coluna);
        salvarTarefas(colunaAnterior);
        var excluirButton = document.createElement("button");
        excluirButton.className = "excluir-button";
        excluirButton.textContent = "Excluir";
        excluirButton.addEventListener("click", function () {
            if (confirm("Tem certeza de que deseja excluir esta tarefa?")) {
                tarefa.remove();
                salvarTarefas(coluna);
            }
        });
        tarefa.appendChild(excluirButton);
    }
}


// Função para mostrar as opções de cores
function mostrarOpcoesCores() {
    var opcoesCores = document.getElementById("opcoesCores");
    if (opcoesCores.style.display === "block") {
        opcoesCores.style.display = "none";
    } else {
        opcoesCores.style.display = "block";
    }
}

// Função para mudar a cor de fundo
function mudarCorFundo(cor) {
    document.body.style.backgroundColor = cor;
    // Salvar a cor de fundo no armazenamento local
    localStorage.setItem("corFundo", cor);
}


/*----*/

// Função para mostrar a caixa de texto do nome da coluna
function mostrarCaixaTexto(coluna) {
    var nomeColunaInput = document.getElementById(`nomeColuna${coluna}`);
    var botaoEditar = document.querySelector(`#coluna${coluna} button[onclick="mostrarCaixaTexto(${coluna})"]`);
    nomeColunaInput.style.display = 'block';
    botaoEditar.style.display = 'none';
}

// Função para ocultar a caixa de texto do nome da coluna
function ocultarCaixaTexto(coluna) {
    var nomeColunaInput = document.getElementById(`nomeColuna${coluna}`);
    var botaoEditar = document.querySelector(`#coluna${coluna} button[onclick="mostrarCaixaTexto(${coluna})"]`);
    nomeColunaInput.style.display = 'none';
    botaoEditar.style.display = 'block';
    // Salvar o nome da coluna no armazenamento local
    localStorage.setItem(`nomeColuna${coluna}`, nomeColunaInput.value);
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