<?php
include 'db_connection.php';

// Obtém o ID da tarefa a ser excluída do parâmetro POST
$taskId = $_POST['taskId'];

// Query para excluir a tarefa
$sql = "DELETE FROM tarefas WHERE id = '$taskId'";

// Executa a query de exclusão
if ($conn->query($sql) === TRUE) {
  $response = array('success' => true);
} else {
  $response = array('success' => false);
}

// Retorna a resposta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
