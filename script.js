$(document).ready(function () {
    // Função para carregar as tarefas
    function loadTasks() {
        $.ajax({
            url: 'load_tasks.php',
            type: 'GET',
            success: function (response) {
                // Limpar a lista de tarefas
                $('#task-list').empty();
                console.log('carregando lista')
                console.log(response)
                // Adicionar cada tarefa à lista
                response.forEach(function (task) {
                    var listItem = $('<li>').text(task.descricao + ' ' + task.prazo + ' ' + task.prioridade);
                    $('#tasks').append(listItem);
                });
            }
        });
    }
    // Chamar a função de carregar tarefas quando a página é carregada
    loadTasks();
});

$(document).ready(function () {
    // Manipulador de envio do formulário
    $('#task-form').submit(function (e) {
        e.preventDefault(); // Impede o envio normal do formulário
        var form = $(this);

        // Obtém os valores dos campos do formulário
        var descricao = $('#descricao').val();
        var prazo = $('#prazo').val();
        var prioridade = $('#prioridade').val();

        // Cria um objeto com os dados da tarefa
        var taskData = {
            descricao: descricao,
            prazo: prazo,
            prioridade: prioridade
        };

        // Envia a requisição Ajax para o arquivo create_task.php
        $.ajax({
            url: 'create_task.php',
            type: 'POST',
            data: taskData,
            dataType: 'json', // Trata a resposta como JSON
            success: function (response) {
                // Processa a resposta do servidor
                if (response.success) {
                    alert('Tarefa criada com sucesso!');
                    // Limpa os campos do formulário
                    $('#descricao').val('');
                    $('#prazo').val('');
                    $('#prioridade').val('');
                    // Atualiza a lista de tarefas
                    $('#form').hide();
                    loadTask();
                } else {
                    alert('Erro ao criar tarefa. Por favor, tente novamente.');
                }
            },
            error: function () {
                alert('Erro ao comunicar com o servidor. Por favor, tente novamente.');
            }
        });
    });
});