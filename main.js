$(document).ready(function () {
    const btn_add = $('#btn-add');
    const form = $('#form');
    const btn_cancelar = $('#cancel_form');
  
    btn_cancelar.on('click', function (e) {
      e.preventDefault();
      form.hide();
    });
  
    btn_add.on('click', function (e) {
      e.preventDefault();
      form.show();
    });
  });
  