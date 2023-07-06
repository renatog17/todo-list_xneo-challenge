$(document).ready(function () {
    const btn_add = $('#btn-add');
    const form = $('#form');
    const btn_send = $('#send');
    const btn_cancelar = $('#cancel_form');
    const btn_update = $('#update');
    const title_form = $('#title_form');

    btn_cancelar.on('click', function (e) {
        e.preventDefault();
        $('#descricao').val('');
        $('#prazo').val('');
        $('#prioridade').val('');
        btn_send.hide();
        btn_update.hide();
        form.hide();
    });

    btn_add.on('click', function (e) {
        e.preventDefault();
        title_form.text('Nova tarefa');
        form.show();
        btn_send.show();
    });
});
