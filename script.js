$(document).ready(function() {
    // Função para carregar as tarefas
    function loadTasks() {
      $.ajax({
        url: 'load_tasks.php',
        type: 'GET',
        success: function(response) {
          // Limpar a lista de tarefas
          $('#task-list').empty();
            console.log(response)
          // Adicionar cada tarefa à lista
          response.forEach(function(task) {
            var listItem = $('<li>').text(task.descricao);
            $('#tasks').append(listItem);
          });
        }
      });
    }
  
    // Chamar a função de carregar tarefas quando a página é carregada
    loadTasks();
  });
  