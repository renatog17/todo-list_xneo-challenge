$(document).ready(function () {
    function loadTasks() {
        $.ajax({
            url: 'load_tasks.php',
            type: 'GET',
            success: function (response) {
                $('#tasks').empty();
                response.forEach(function (task) {
                    var listItem = $('<li>').text(task.descricao + ' ' + task.prazo + ' ' + task.prioridade);
                    var deleteIcon = $('<img>').attr('src', 'imgs/lixeira.png').addClass('delete-icon');
                    $('#tasks').append(listItem);
                    listItem.append(deleteIcon);
                });
            }
        });
    }
    loadTasks();

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
                    $('#descricao').val('');
                    $('#prazo').val('');
                    $('#prioridade').val('');
                    $('#form').hide();
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

});