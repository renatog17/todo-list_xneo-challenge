$(document).ready(function () {
    function loadTasks() {
        $.ajax({
            url: 'crud_php/load_tasks.php',
            type: 'GET',
            success: function (response) {
                $('#tasks').empty()
                response.forEach(function (task) {
                    
                    var listItem = $('<div>')
                    listItem.addClass('task')
                    var contentDiv = $('<div>')

                    var descricaoDiv = $('<div>').text(task.descricao)
                    descricaoDiv.addClass('descricao')
                    contentDiv.append(descricaoDiv)
            
                    var prazoDiv = $('<div>').text('Prazo: '+task.prazo)
                    prazoDiv.addClass('prazo') 
                    contentDiv.append(prazoDiv)

                    var prioridadeDiv = $('<div>').text('Prioridade: '+task.prioridade)
                    prioridadeDiv.addClass('prioridade') 
                    contentDiv.append(prioridadeDiv)
                    contentDiv.addClass('content')

                    listItem.append(contentDiv)
                    var deleteIcon = $('<img>').attr('src', 'imgs/lixeira.png').addClass('delete-icon')
                    var editIcon = $('<img>').attr('src', 'imgs/edit.png').addClass('edit-icon')
                    listItem.attr('data-task-id', task.id)
                    listItem.attr('data-task-descricao', task.descricao)
                    listItem.attr('data-task-prazo', task.prazo)
                    listItem.attr('data-task-prioridade', task.prioridade)
                    $('#tasks').append(listItem)
                    listItem.append(editIcon)
                    listItem.append(deleteIcon)
                })
            }
        })
    }
    loadTasks()
    
    $('#task-form').submit(function (e) {
        e.preventDefault()
        var form = $(this)

        var descricao = $('#descricao').val()
        var prazo = $('#prazo').val()
        var prioridade = $('#prioridade').val()

        var taskData = {
            descricao: descricao,
            prazo: prazo,
            prioridade: prioridade
        }

        $.ajax({
            url: 'crud_php/create_task.php',
            type: 'POST',
            data: taskData,
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    $('#task-id').val('')
                    $('#descricao').val('')
                    $('#prazo').val('')
                    $('#prioridade').val('')
                    $('#form').hide()
                    $('#btn_send').hide()
                    loadTasks()
                } else {
                    alert('Erro ao criar tarefa. Por favor, tente novamente.')
                }
            },
            error: function () {
                alert('Erro ao comunicar com o servidor. Por favor, tente novamente.')
            }
        })
    })

    
    $(document).on('click', '.delete-icon', function () {
        var listItem = $(this).closest('.task')
        var taskId = listItem.data('task-id')
        if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
            $.ajax({
                url: 'crud_php/delete_task.php',
                type: 'POST',
                data: { taskId: taskId },
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        listItem.remove()
                    } else {
                        alert('Erro ao excluir tarefa. Por favor, tente novamente.')
                    }
                },
                error: function () {
                    alert('Erro ao comunicar com o servidor. Por favor, tente novamente.')
                }
            })
        }
    })
    
    
    $(document).on('click', '.edit-icon', function (e) {
        e.preventDefault()
        var listItem = $(this).closest('.task')
        var id = listItem.data('task-id')
        var descricao = listItem.data('task-descricao')
        var prazo = listItem.data('task-prazo')
        var prioridade = listItem.data('task-prioridade')

        $('#task-id').val(id)
        $('#descricao').val(descricao)
        $('#prazo').val(prazo)
        $('#prioridade').val(prioridade)
        $('#send').hide()
        $('#form').show()
        $('#update').show()
        const title_form = $('#title_form')
        title_form.text('Editar tarefa')
    })


    $(document).on('click', '#update', function (e) {

        e.preventDefault()
        var id = $('#task-id').val()
        var descricao = $('#descricao').val()
        var prazo = $('#prazo').val()
        var prioridade = $('#prioridade').val()

       
        var taskData = {
            taskId: id,
            descricao: descricao,
            prazo: prazo,
            prioridade: prioridade
        }
        console.log('aqui')
        console.log(taskData)
        $.ajax({
            url: 'crud_php/update_task.php',
            type: 'POST',
            data: taskData,
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    
                    $('#task-id').val('')
                    $('#descricao').val('')
                    $('#prazo').val('')
                    $('#prioridade').val('')
                    $('#form').hide()
                    $('#update').hide()
                    loadTasks()
                } else {
                    alert('Erro ao atualizar as informações. Por favor, tente novamente.')
                }
            },
            error: function () {
                alert('Erro ao comunicar com o servidor. Por favor, tente novamente.')
            }
        })
    })
})

