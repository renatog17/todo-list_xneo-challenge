$(document).ready(function () {
    //READ cRud
    function loadTasks() {
        $.ajax({
            url: 'load_tasks.php',
            type: 'GET',
            success: function (response) {
                $('#tasks').empty();
                response.forEach(function (task) {
                    //var listItem = $('<li>').text(task.descricao + ' ' + task.prazo + ' ' + task.prioridade)
                    
                    var listItem = $('<div>')
                    listItem.addClass('task')

                    var descricaoDiv = $('<div>').text(task.descricao)
                    descricaoDiv.addClass('descricao')
                    listItem.append(descricaoDiv)
                    // Cria uma div para o prazo da tarefa
                    var prazoDiv = $('<div>').text(task.prazo)
                    prazoDiv.addClass('prazo') // Adiciona a classe 'prazo' à div
                    listItem.append(prazoDiv) // Adiciona a div de prazo à div principal

                    // Cria uma div para a prioridade da tarefa
                    var prioridadeDiv = $('<div>').text(task.prioridade)
                    prioridadeDiv.addClass('prioridade') // Adiciona a classe 'prioridade' à div
                    listItem.append(prioridadeDiv)

                    
                    var deleteIcon = $('<img>').attr('src', 'imgs/lixeira.png').addClass('delete-icon');
                    var editIcon = $('<img>').attr('src', 'imgs/edit.png').addClass('edit-icon');
                    listItem.attr('data-task-id', task.id);
                    listItem.attr('data-task-descricao', task.descricao);
                    listItem.attr('data-task-prazo', task.prazo);
                    listItem.attr('data-task-prioridade', task.prioridade)
                    $('#tasks').append(listItem);
                    listItem.append(editIcon)
                    listItem.append(deleteIcon);
                });
            }
        });
    }
    loadTasks();
    //CREATE Crud
    $('#task-form').submit(function (e) {
        e.preventDefault();
        var form = $(this);

        var descricao = $('#descricao').val();
        var prazo = $('#prazo').val();
        var prioridade = $('#prioridade').val();

        var taskData = {
            descricao: descricao,
            prazo: prazo,
            prioridade: prioridade
        };

        $.ajax({
            url: 'create_task.php',
            type: 'POST',
            data: taskData,
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    $('#task-id').val('');
                    $('#descricao').val('');
                    $('#prazo').val('');
                    $('#prioridade').val('');
                    $('#form').hide();
                    $('#btn_send').hide();
                    loadTasks();
                } else {
                    alert('Erro ao criar tarefa. Por favor, tente novamente.');
                }
            },
            error: function () {
                alert('Erro ao comunicar com o servidor. Por favor, tente novamente.');
            }
        });
    });

    //DELETE cruD
    $(document).on('click', '.delete-icon', function () {
        var listItem = $(this).closest('.task');
        var taskId = listItem.data('task-id');
        // Confirmar exclusão da tarefa
        if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
            $.ajax({
                url: 'delete_task.php',
                type: 'POST',
                data: { taskId: taskId },
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        listItem.remove(); // Remover o elemento <li> correspondente da lista
                    } else {
                        alert('Erro ao excluir tarefa. Por favor, tente novamente.');
                    }
                },
                error: function () {
                    alert('Erro ao comunicar com o servidor. Por favor, tente novamente.');
                }
            });
        }
    });
    // UPDATE crUd
    //Carregar os dados primeiro
    $(document).on('click', '.edit-icon', function (e) {
        e.preventDefault();
        var listItem = $(this).closest('li');
        //var descricao = listItem.find('.task-descricao').text();
        var id = listItem.data('task-id');
        var descricao = listItem.data('task-descricao');
        var prazo = listItem.data('task-prazo');
        var prioridade = listItem.data('task-prioridade');

        $('#task-id').val(id)
        $('#descricao').val(descricao);
        $('#prazo').val(prazo);
        $('#prioridade').val(prioridade);

        $('#form').show();
        $('#update').show();
        const title_form = $('#title_form');
        title_form.text('Editar tarefa');
        /* var descricaoUpdate = $('#descricao').val();
         var prazoUpdate = $('#prazo').val();
         var prioridadeUpdate = $('#prioridade').val();
         console.log(id)
         var taskData = {
             taskId: id,
             descricao: descricaoUpdate,
             prazo: prazoUpdate,
             prioridade: prioridadeUpdate
         };
         console.log(taskData)*/

    });

    //danger

    $(document).on('click', '#update', function (e) {

        e.preventDefault();
        // Obtém os dados atualizados do formulário
        var id = $('#task-id').val()
        var descricao = $('#descricao').val();
        var prazo = $('#prazo').val();
        var prioridade = $('#prioridade').val();

        // Cria um objeto com os dados atualizados da tarefa
        var taskData = {
            taskId: id,
            descricao: descricao,
            prazo: prazo,
            prioridade: prioridade
        };
        console.log('aqui')
        console.log(taskData)
        // Envie a requisição Ajax para atualizar a tarefa
        $.ajax({
            url: 'update_task.php',
            type: 'POST',
            data: taskData,
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    // Atualizar a lista de tarefas após a atualização bem-sucedida

                    // Ocultar o formulário de edição

                    // Limpar os campos do formulário
                    $('#task-id').val('');
                    $('#descricao').val('');
                    $('#prazo').val('');
                    $('#prioridade').val('');
                    $('#form').hide();
                    $('#update').hide();
                    loadTasks();
                } else {
                    alert('Erro ao atualizar as informações. Por favor, tente novamente.');
                }
            },
            error: function () {
                alert('Erro ao comunicar com o servidor. Por favor, tente novamente.');
            }
        });
    });
    //danger
});

