$(document).ready(function () {
    //READ cRud
    function loadTasks() {
        $.ajax({
            url: 'load_tasks.php',
            type: 'GET',
            success: function (response) {
                $('#tasks').empty();
                response.forEach(function (task) {
                    var listItem = $('<li>').text(task.id+' '+task.descricao + ' ' + task.prazo + ' ' + task.prioridade);
                    var deleteIcon = $('<img>').attr('src', 'imgs/lixeira.png').addClass('delete-icon');
                    listItem.attr('data-task-id', task.id);
                    $('#tasks').append(listItem);
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

    //DELETE cruD
    $(document).on('click', '.delete-icon', function () {
        var listItem = $(this).closest('li');
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

});

